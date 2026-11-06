import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { Prisma } from '../../generated/prisma/client.js';
import { ApproveFinishedGoodsDto } from '../dto/approve-finished-goods.dto.js';
import { RejectFinishedGoodsDto } from '../dto/reject-finished-goods.dto.js';

@Injectable()
export class FinishedGoodsApi {
  constructor(private readonly prisma: PrismaService) {}

  // Lấy danh sách phiếu thành phẩm theo trạng thái
  async getReceipts(status = 'PENDING') {
    // 1. Kiểm tra trạng thái
    const validStatus = ['PENDING', 'APPROVED', 'REJECTED', 'ALL'];

    if (!validStatus.includes(status)) {
      throw new BadRequestException('Trạng thái không hợp lệ');
    }

    // 2. Lấy dữ liệu từ PostgreSQL
    const receipts = await this.prisma.finishedGoodsReceipt.findMany({
      where: status === 'ALL' ? {} : { status },
      include: {
        productionOrder: {
          include: {
            bom: {
              include: { product: true },
            },
            branch: true,
          },
        },
        wasteRequest: true,
        movement: {
          include: { location: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    // 3. Trả kết quả
    return {
      message: 'Lấy danh sách phiếu thành phẩm thành công',
      data: receipts.map((item) => ({
        receiptCode: item.code,
        orderCode: item.productionOrder.code,
        productCode: item.productionOrder.bom.productCode,
        productName:
          item.productionOrder.bom.product?.name ||
          item.productionOrder.bom.productName ||
          item.productionOrder.bom.productCode,
        branchCode: item.productionOrder.branch.code,

        plannedQuantity: item.productionOrder.quantity.toString(),
        reportedQuantity: item.reportedQuantity.toString(),
        acceptedQuantity: item.acceptedQuantity?.toString() ?? null,
        rejectedQuantity: item.rejectedQuantity?.toString() ?? null,

        productionStatus: item.productionOrder.status,
        status: item.status,
        note: item.note,
        inspectionNote: item.inspectionNote,
        inspectedAt: item.inspectedAt,
        approvedAt: item.approvedAt,
        locationName: item.movement?.location?.name ?? null,
        wasteRequest: item.wasteRequest
          ? {
              code: item.wasteRequest.code,
              quantity: item.wasteRequest.quantity.toString(),
              reason: item.wasteRequest.reason,
              status: item.wasteRequest.status,
              decisionNote: item.wasteRequest.decisionNote,
            }
          : null,
        createdAt: item.createdAt,
      })),
    };
  }

  // Duyệt phiếu thành phẩm
  async approveReceipt(code: string, dto: ApproveFinishedGoodsDto) {
    try {
      return await this.prisma.$transaction(
        async (tx) => {
          // 1. Tìm phiếu và lệnh sản xuất
          const receipt = await tx.finishedGoodsReceipt.findUnique({
            where: { code: code.trim() },
            include: {
              productionOrder: { include: { bom: true } },
            },
          });

          if (!receipt) {
            throw new NotFoundException('Không tìm thấy phiếu thành phẩm');
          }

          const order = receipt.productionOrder;

          // 2. Kiểm tra trạng thái
          if (
            receipt.status !== 'PENDING' ||
            order.status !== 'WAITING_APPROVAL' ||
            order.materialStatus !== 'ISSUED'
          ) {
            throw new ConflictException('Phiếu chưa hợp lệ hoặc đã xử lý');
          }

          // 3. Kiểm tra số lượng thực tế
          const reported = receipt.reportedQuantity;
          const accepted = new Prisma.Decimal(dto.acceptedQuantity);

          if (
            reported.lte(0) ||
            reported.gt(order.quantity) ||
            accepted.lte(0) ||
            accepted.gt(reported)
          ) {
            throw new BadRequestException('Số lượng không hợp lệ');
          }

          const rejected = reported.minus(accepted);
          const shortfall = order.quantity.minus(reported);
          const reason = dto.reason?.trim() || null;

          if ((rejected.gt(0) || shortfall.gt(0)) && !reason) {
            throw new BadRequestException(
              'Phải ghi lý do khi số lượng bị chênh lệch',
            );
          }
          const wasteReason = dto.wasteReason?.trim();

          if (rejected.gt(0) && !wasteReason) {
            throw new BadRequestException(
              'Phải ghi lý do thành phẩm không đạt',
            );
          }

          // 4. Kiểm tra vị trí kho đúng chi nhánh
          const location = await tx.warehouseLocation.findFirst({
            where: {
              name: dto.locationName.trim(),
              branchId: order.branchId,
            },
          });

          if (!location) {
            throw new BadRequestException('Không tìm thấy vị trí kho');
          }

          // 5. Duyệt phiếu
          const updated = await tx.finishedGoodsReceipt.updateMany({
            where: { id: receipt.id, status: 'PENDING' },
            data: {
              status: 'APPROVED',
              acceptedQuantity: accepted,
              rejectedQuantity: rejected,
              inspectionNote: reason,
              inspectedAt: new Date(),
              approvedAt: new Date(),
            },
          });

          if (updated.count !== 1) {
            throw new ConflictException('Phiếu đã được xử lý');
          }

          // 6. Hoàn thành lệnh sản xuất
          const completed = await tx.productionOrder.updateMany({
            where: {
              id: order.id,
              status: 'WAITING_APPROVAL',
              materialStatus: 'ISSUED',
            },
            data: { status: 'COMPLETED' },
          });

          if (completed.count !== 1) {
            throw new ConflictException('Trạng thái lệnh đã thay đổi');
          }

          // 7. Cộng tồn thành phẩm
          const productCode = order.bom.productCode;

          const balance = await tx.finishedGoodsBalance.upsert({
            where: {
              productCode_locationId: {
                productCode,
                locationId: location.id,
              },
            },
            create: {
              productCode,
              locationId: location.id,
              quantity: accepted,
            },
            update: {
              quantity: { increment: accepted },
            },
          });

          // 8. Ghi lịch sử nhập kho
          await tx.finishedGoodsMovement.create({
            data: {
              receiptId: receipt.id,
              productCode,
              locationId: location.id,
              quantityBefore: balance.quantity.minus(accepted),
              quantityChange: accepted,
              quantityAfter: balance.quantity,
            },
          });

          // Tạo yêu cầu xử lý thành phẩm không đạt
          if (rejected.gt(0)) {
            await tx.wasteRequest.create({
              data: {
                code: `HH-${receipt.code}`,
                receiptId: receipt.id,
                quantity: rejected,
                reason: wasteReason!,
              },
            });
          }

          return {
            message: 'Duyệt nhập thành phẩm thành công',
            data: {
              receiptCode: receipt.code,
              orderCode: order.code,
              productCode,
              reportedQuantity: reported.toString(),
              acceptedQuantity: accepted.toString(),
              rejectedQuantity: rejected.toString(),
              productionShortfall: shortfall.toString(),
              totalStock: balance.quantity.toString(),
              receiptStatus: 'APPROVED',
              productionStatus: 'COMPLETED',
            },
          };
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          timeout: 15000,
        },
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        ['P2034', 'P2002'].includes(error.code)
      ) {
        throw new ConflictException('Giao dịch bị xung đột, hãy thử lại');
      }

      throw error;
    }
  }

  // Từ chối phiếu thành phẩm
  async rejectReceipt(code: string, dto: RejectFinishedGoodsDto) {
    const reason = dto.reason.trim();

    if (!reason) {
      throw new BadRequestException('Phải nhập lý do từ chối');
    }

    try {
      return await this.prisma.$transaction(
        async (tx) => {
          // 1. Tìm phiếu và lệnh
          const receipt = await tx.finishedGoodsReceipt.findUnique({
            where: { code: code.trim() },
            include: { productionOrder: true },
          });

          if (!receipt) {
            throw new NotFoundException('Không tìm thấy phiếu thành phẩm');
          }

          // 2. Kiểm tra trạng thái
          if (
            receipt.status !== 'PENDING' ||
            receipt.productionOrder.status !== 'WAITING_APPROVAL'
          ) {
            throw new ConflictException('Phiếu không thể từ chối');
          }

          // 3. Từ chối phiếu
          const updated = await tx.finishedGoodsReceipt.updateMany({
            where: { id: receipt.id, status: 'PENDING' },
            data: {
              status: 'REJECTED',
              inspectionNote: reason,
              inspectedAt: new Date(),
            },
          });

          if (updated.count !== 1) {
            throw new ConflictException('Phiếu đã được xử lý');
          }

          // 4. Trả lệnh về trạng thái xử lý
          const result = await tx.productionOrder.updateMany({
            where: {
              id: receipt.productionOrderId,
              status: 'WAITING_APPROVAL',
            },
            data: { status: 'IN_PROGRESS' },
          });

          if (result.count !== 1) {
            throw new ConflictException('Trạng thái lệnh đã thay đổi');
          }

          return {
            message: 'Từ chối phiếu thành phẩm thành công',
            data: {
              receiptCode: receipt.code,
              orderCode: receipt.productionOrder.code,
              receiptStatus: 'REJECTED',
              productionStatus: 'IN_PROGRESS',
              reason,
            },
          };
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2034'
      ) {
        throw new ConflictException('Giao dịch bị xung đột, hãy thử lại');
      }

      throw error;
    }
  }

  // Lấy tồn kho thành phẩm theo chi nhánh và sản phẩm
  async getInventory(branchCode: string, productCode?: string) {
    // 1. Kiểm tra chi nhánh
    if (!branchCode?.trim()) {
      throw new BadRequestException('Thiếu mã chi nhánh');
    }

    const branch = await this.prisma.branch.findUnique({
      where: { code: branchCode.trim() },
    });

    if (!branch) {
      throw new NotFoundException('Không tìm thấy chi nhánh');
    }

    // 2. Lấy tồn kho thành phẩm
    const balances = await this.prisma.finishedGoodsBalance.findMany({
      where: {
        location: { branchId: branch.id },
        ...(productCode?.trim()
          ? {
              productCode: {
                contains: productCode.trim(),
                mode: 'insensitive' as const,
              },
            }
          : {}),
      },
      include: { location: true },
      orderBy: { productCode: 'asc' },
      take: 200,
    });

    const products = await this.prisma.product.findMany({
      where: { code: { in: balances.map((item) => item.productCode) } },
      select: { code: true, name: true },
    });
    const productNames = new Map(
      products.map((item) => [item.code, item.name]),
    );

    // 3. Trả kết quả
    return {
      message: 'Lấy tồn kho thành phẩm thành công',
      data: {
        branchCode: branch.code,
        totalItems: balances.length,
        items: balances.map((item) => ({
          productCode: item.productCode,
          productName: productNames.get(item.productCode) ?? item.productCode,
          locationName: item.location.name,
          quantity: item.quantity.toString(),
        })),
      },
    };
  }

  // Lấy chi tiết tồn kho một thành phẩm theo chi nhánh
  async getInventoryDetail(productCode: string, branchCode: string) {
    // 1. Kiểm tra tham số
    if (!branchCode?.trim()) {
      throw new BadRequestException('Thiếu mã chi nhánh');
    }

    if (!productCode?.trim()) {
      throw new BadRequestException('Thiếu mã thành phẩm');
    }

    const branch = await this.prisma.branch.findUnique({
      where: { code: branchCode.trim() },
    });

    if (!branch) {
      throw new NotFoundException('Không tìm thấy chi nhánh');
    }

    const code = productCode.trim();

    // 2. Lấy thông tin thành phẩm
    const product = await this.prisma.product.findUnique({
      where: { code },
    });

    const balances = await this.prisma.finishedGoodsBalance.findMany({
      where: {
        productCode: code,
        location: { branchId: branch.id },
      },
      include: { location: true },
      orderBy: { location: { name: 'asc' } },
    });

    if (!product && !balances.length) {
      throw new NotFoundException('Không tìm thấy thành phẩm trong kho');
    }

    // 3. Lấy công thức đang áp dụng
    const activeBom = await this.prisma.bom.findFirst({
      where: { productCode: code, status: 'ACTIVE' },
      include: {
        details: { include: { material: true, unit: true } },
      },
      orderBy: { version: 'desc' },
    });

    // 4. Lấy lịch sử nhập kho gần đây của thành phẩm
    const movements = await this.prisma.finishedGoodsMovement.findMany({
      where: {
        productCode: code,
        location: { branchId: branch.id },
      },
      include: {
        receipt: { include: { productionOrder: true } },
        location: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const totalQuantity = balances.reduce(
      (sum, item) => sum.plus(item.quantity),
      new Prisma.Decimal(0),
    );

    // 5. Trả kết quả
    return {
      message: 'Lấy chi tiết tồn kho thành phẩm thành công',
      data: {
        productCode: code,
        productName: product?.name || code,
        category: product?.category ?? null,
        unit: product?.unit ?? 'phần',
        price: product?.price?.toString() ?? null,
        description: product?.description ?? null,
        productStatus: product?.status ?? null,
        branchCode: branch.code,
        totalQuantity: totalQuantity.toString(),
        balances: balances.map((item) => ({
          locationName: item.location.name,
          quantity: item.quantity.toString(),
        })),
        activeBom: activeBom
          ? {
              code: activeBom.code,
              version: activeBom.version,
              outputQuantity: activeBom.outputQuantity.toString(),
              totalMaterials: activeBom.details.length,
              details: activeBom.details.map((item) => ({
                materialCode: item.material.code,
                materialName: item.material.name,
                unitName: item.unit.name,
                quantity: item.quantity.toString(),
              })),
            }
          : null,
        movements: movements.map((item) => ({
          receiptCode: item.receipt.code,
          orderCode: item.receipt.productionOrder.code,
          locationName: item.location.name,
          quantityBefore: item.quantityBefore.toString(),
          quantityChange: item.quantityChange.toString(),
          quantityAfter: item.quantityAfter.toString(),
          inspectionNote: item.receipt.inspectionNote,
          approvedAt: item.receipt.approvedAt,
          createdAt: item.createdAt,
        })),
      },
    };
  }

  // Lấy chi tiết phiếu thành phẩm theo mã
  async getReceiptByCode(code: string) {
    // 1. Tìm phiếu thành phẩm
    const receipt = await this.prisma.finishedGoodsReceipt.findUnique({
      where: { code: code.trim() },
      include: {
        productionOrder: {
          include: {
            bom: {
              include: { product: true },
            },
            branch: true,
          },
        },
        movement: {
          include: { location: true },
        },
        wasteRequest: true,
      },
    });

    if (!receipt) {
      throw new NotFoundException('Không tìm thấy phiếu thành phẩm');
    }

    const order = receipt.productionOrder;
    const movement = receipt.movement;

    // 2. Trả chi tiết
    return {
      message: 'Lấy chi tiết phiếu thành phẩm thành công',
      data: {
        receiptCode: receipt.code,
        orderCode: order.code,
        productCode: order.bom.productCode,
        productName:
          order.bom.product?.name ||
          order.bom.productName ||
          order.bom.productCode,
        branchCode: order.branch.code,

        plannedQuantity: order.quantity.toString(),
        reportedQuantity: receipt.reportedQuantity.toString(),
        acceptedQuantity: receipt.acceptedQuantity?.toString() ?? null,
        rejectedQuantity: receipt.rejectedQuantity?.toString() ?? null,

        receiptStatus: receipt.status,
        status: receipt.status,
        productionStatus: order.status,

        employeeNote: receipt.note,
        note: receipt.note,
        inspectionNote: receipt.inspectionNote,
        inspectedAt: receipt.inspectedAt,
        approvedAt: receipt.approvedAt,
        createdAt: receipt.createdAt,
        locationName: movement?.location?.name ?? null,

        inventoryMovement: movement
          ? {
              locationName: movement.location.name,
              quantityBefore: movement.quantityBefore.toString(),
              quantityChange: movement.quantityChange.toString(),
              quantityAfter: movement.quantityAfter.toString(),
              createdAt: movement.createdAt,
            }
          : null,
        wasteRequest: receipt.wasteRequest
          ? {
              code: receipt.wasteRequest.code,
              quantity: receipt.wasteRequest.quantity.toString(),
              reason: receipt.wasteRequest.reason,
              status: receipt.wasteRequest.status,
              decisionNote: receipt.wasteRequest.decisionNote,
            }
          : null,
      },
    };
  }

  // Lấy lịch sử nhập thành phẩm
  async getFinishedGoodsMovements() {
    const movements = await this.prisma.finishedGoodsMovement.findMany({
      include: {
        receipt: {
          include: {
            productionOrder: {
              include: {
                bom: { include: { product: true } },
              },
            },
          },
        },
        location: { include: { branch: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });

    return {
      message: 'Lấy lịch sử nhập thành phẩm thành công',
      data: movements.map((item) => ({
        receiptCode: item.receipt.code,
        orderCode: item.receipt.productionOrder.code,
        productCode: item.productCode,
        productName:
          item.receipt.productionOrder.bom.product.name ||
          item.receipt.productionOrder.bom.productName ||
          item.productCode,
        branchCode: item.location.branch.code,
        locationName: item.location.name,
        quantityBefore: item.quantityBefore.toString(),
        quantityChange: item.quantityChange.toString(),
        quantityAfter: item.quantityAfter.toString(),
        receiptStatus: item.receipt.status,
        inspectionNote: item.receipt.inspectionNote,
        approvedAt: item.receipt.approvedAt,
        createdAt: item.createdAt,
      })),
    };
  }
}

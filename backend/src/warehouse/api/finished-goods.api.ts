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
    const validStatus = ['PENDING', 'APPROVED', 'REJECTED'];

    if (!validStatus.includes(status)) {
      throw new BadRequestException('Trạng thái không hợp lệ');
    }

    // 2. Lấy dữ liệu từ PostgreSQL
    const receipts = await this.prisma.finishedGoodsReceipt.findMany({
      where: { status },
      include: {
        productionOrder: {
          include: {
            bom: true,
            branch: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    // 3. Trả kết quả
    return {
      message: 'Lấy danh sách phiếu thành phẩm thành công',
      data: receipts.map((item) => ({
        receiptCode: item.code,
        orderCode: item.productionOrder.code,
        productCode: item.productionOrder.bom.productCode,
        branchCode: item.productionOrder.branch.code,

        plannedQuantity: item.productionOrder.quantity.toString(),
        reportedQuantity: item.reportedQuantity.toString(),
        acceptedQuantity: item.acceptedQuantity?.toString() ?? null,

        productionStatus: item.productionOrder.status,
        status: item.status,
        note: item.note,
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
      take: 100,
    });

    // 3. Trả kết quả
    return {
      message: 'Lấy tồn kho thành phẩm thành công',
      data: {
        branchCode: branch.code,
        totalItems: balances.length,
        items: balances.map((item) => ({
          productCode: item.productCode,
          locationName: item.location.name,
          quantity: item.quantity.toString(),
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
            bom: true,
            branch: true,
          },
        },
        movement: {
          include: { location: true },
        },
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
        branchCode: order.branch.code,

        plannedQuantity: order.quantity.toString(),
        reportedQuantity: receipt.reportedQuantity.toString(),
        acceptedQuantity: receipt.acceptedQuantity?.toString() ?? null,
        rejectedQuantity: receipt.rejectedQuantity?.toString() ?? null,

        receiptStatus: receipt.status,
        productionStatus: order.status,

        employeeNote: receipt.note,
        inspectionNote: receipt.inspectionNote,
        inspectedAt: receipt.inspectedAt,
        approvedAt: receipt.approvedAt,

        inventoryMovement: movement
          ? {
              locationName: movement.location.name,
              quantityBefore: movement.quantityBefore.toString(),
              quantityChange: movement.quantityChange.toString(),
              quantityAfter: movement.quantityAfter.toString(),
              createdAt: movement.createdAt,
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
            productionOrder: true,
          },
        },
        location: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return {
      message: 'Lấy lịch sử nhập thành phẩm thành công',
      data: movements.map((item) => ({
        receiptCode: item.receipt.code,
        orderCode: item.receipt.productionOrder.code,
        productCode: item.productCode,
        locationName: item.location.name,
        quantityBefore: item.quantityBefore.toString(),
        quantityChange: item.quantityChange.toString(),
        quantityAfter: item.quantityAfter.toString(),
        createdAt: item.createdAt,
      })),
    };
  }
}

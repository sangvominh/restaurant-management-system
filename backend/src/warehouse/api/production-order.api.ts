import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { Prisma } from '../../generated/prisma/client.js';
import { CreateProductionOrderDto } from '../dto/create-production-order.dto.js';
import { BomApi } from './bom.api.js';
import { AssignProductionOrderDto } from '../dto/assign-production-order.dto.js';

@Injectable()
export class ProductionOrderApi {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bomApi: BomApi,
  ) {}

  //Tạo lệnh sản xuất
  async createProductionOrder(dto: CreateProductionOrderDto) {
    // 1. Chuẩn hóa dữ liệu
    const code = dto.code.trim();
    const bomCode = dto.bomCode.trim();
    const branchCode = dto.branchCode.trim();

    if (!code || !bomCode || !branchCode) {
      throw new BadRequestException('Thông tin lệnh không hợp lệ');
    }

    // 2. Tìm công thức BOM
    const bom = await this.prisma.bom.findUnique({
      where: { code: bomCode },
      include: {
        _count: {
          select: { details: true },
        },
      },
    });

    if (!bom) {
      throw new NotFoundException('Không tìm thấy BOM');
    }

    if (
      bom.status !== 'ACTIVE' ||
      bom.outputQuantity.lte(0) ||
      bom._count.details === 0
    ) {
      throw new BadRequestException('Công thức BOM không hợp lệ');
    }

    // 3. Kiểm tra chi nhánh
    const branch = await this.prisma.branch.findUnique({
      where: { code: branchCode },
    });

    if (!branch) {
      throw new NotFoundException('Không tìm thấy chi nhánh');
    }

    // 4. Kiểm tra hình thức sản xuất
    if (!['MAKE_TO_STOCK', 'HYBRID'].includes(dto.productionMode)) {
      throw new BadRequestException('Chỉ hỗ trợ sản xuất theo mẻ');
    }

    // 5. Kiểm tra số lượng
    const quantity = new Prisma.Decimal(dto.quantity);

    if (quantity.lte(0)) {
      throw new BadRequestException('Số lượng sản xuất phải lớn hơn 0');
    }

    // 6. Tạo lệnh sản xuất
    try {
      const order = await this.prisma.productionOrder.create({
        data: {
          code,
          bom: {
            connect: { id: bom.id },
          },
          branch: {
            connect: { id: branch.id },
          },
          productionMode: dto.productionMode,
          quantity,
          note: dto.note?.trim() || null,
        },
      });

      // 7. Trả kết quả
      return {
        message: 'Tạo lệnh sản xuất thành công',
        data: {
          code: order.code,
          bomCode: bom.code,
          productCode: bom.productCode,
          branchCode: branch.code,
          productionMode: order.productionMode,
          quantity: order.quantity.toString(),
          status: order.status,
          materialStatus: order.materialStatus,
          note: order.note,
          createdAt: order.createdAt,
        },
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Mã lệnh sản xuất đã tồn tại');
      }

      throw error;
    }
  }
  // Lấy danh sách lệnh sản xuất
  async getProductionOrders(status?: string, code?: string) {
    // 1. Kiểm tra trạng thái
    const validStatus = [
      'NEW',
      'PENDING',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
      'WAITING_APPROVAL',
    ];

    if (status && !validStatus.includes(status)) {
      throw new BadRequestException('Trạng thái không hợp lệ');
    }

    // 2. Tạo điều kiện tìm kiếm
    const where: Prisma.ProductionOrderWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (code?.trim()) {
      where.code = {
        contains: code.trim(),
        mode: 'insensitive',
      };
    }

    // 3. Lấy danh sách lệnh sản xuất
    const orders = await this.prisma.productionOrder.findMany({
      where,
      include: {
        bom: true,
        branch: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    // 4. Trả kết quả
    return {
      message: 'Lấy danh sách lệnh sản xuất thành công',
      data: orders.map((order) => ({
        code: order.code,
        bomCode: order.bom.code,
        productCode: order.bom.productCode,
        branchCode: order.branch.code,
        branchName: order.branch.name,
        productionMode: order.productionMode,
        quantity: order.quantity.toString(),
        status: order.status,
        materialStatus: order.materialStatus,
        note: order.note,
        createdAt: order.createdAt,
      })),
    };
  }

  // Xem chi tiết lệnh sản xuất
  async getProductionOrderByCode(code: string) {
    // 1. Tìm lệnh sản xuất
    const order = await this.prisma.productionOrder.findUnique({
      where: { code: code.trim() },
      include: {
        branch: true,
        bom: {
          include: {
            details: {
              include: {
                material: true,
                unit: true,
              },
            },
          },
        },
      },
    });

    // 2. Kiểm tra lệnh có tồn tại không
    if (!order) {
      throw new NotFoundException('Không tìm thấy lệnh sản xuất');
    }

    // 3. Kiểm tra công thức BOM
    if (order.bom.outputQuantity.lte(0)) {
      throw new BadRequestException('Sản lượng BOM không hợp lệ');
    }

    // 4. Tính nhu cầu nguyên vật liệu
    const materials = order.bom.details.map((item) => {
      const required = item.quantity
        .mul(order.quantity)
        .div(order.bom.outputQuantity)
        .toDecimalPlaces(3, Prisma.Decimal.ROUND_UP);

      return {
        materialCode: item.material.code,
        materialName: item.material.name,
        unitName: item.unit.name,
        quantityPerBom: item.quantity.toString(),
        requiredQuantity: required.toString(),
      };
    });

    // 5. Trả kết quả
    return {
      message: 'Lấy chi tiết lệnh sản xuất thành công',
      data: {
        code: order.code,
        bomCode: order.bom.code,
        productCode: order.bom.productCode,
        branchCode: order.branch.code,
        branchName: order.branch.name,
        productionMode: order.productionMode,

        quantity: order.quantity.toString(),
        status: order.status,
        materialStatus: order.materialStatus,

        note: order.note,
        createdAt: order.createdAt,

        bomOutputQuantity: order.bom.outputQuantity.toString(),
        totalMaterials: materials.length,
        materials,
      },
    };
  }

  // Kiểm tra nguyên vật liệu theo lệnh sản xuất
  async checkProductionOrderMaterials(code: string) {
    // 1. Tìm lệnh sản xuất
    const order = await this.prisma.productionOrder.findUnique({
      where: { code: code.trim() },
      include: {
        bom: true,
        branch: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy lệnh sản xuất');
    }
    if (order.materialStatus === 'ISSUED') {
      throw new ConflictException(
        'Lệnh đã được cấp phát NVL, không thể kiểm tra lại',
      );
    }
    // 2. Kiểm tra trạng thái lệnh
    if (!['NEW', 'PENDING'].includes(order.status)) {
      throw new ConflictException(
        'Lệnh sản xuất không thể kiểm tra ở trạng thái hiện tại',
      );
    }

    // 3. Gọi lại API kiểm tra tồn kho BOM
    const result = await this.bomApi.checkBomStock({
      bomCode: order.bom.code,
      branchCode: order.branch.code,
      productionQuantity: order.quantity.toString(),
    });

    // 4. Xác định trạng thái nguyên vật liệu
    const materialStatus = result.data.canProduce ? 'ENOUGH' : 'SHORTAGE';

    // 5. Cập nhật trạng thái NVL trong Database
    const updated = await this.prisma.productionOrder.updateMany({
      where: {
        id: order.id,
        status: { in: ['NEW', 'PENDING'] },
        materialStatus: { not: 'ISSUED' },
      },
      data: {
        materialStatus,
      },
    });

    if (updated.count !== 1) {
      throw new ConflictException('Trạng thái lệnh đã thay đổi');
    }

    // 6. Trả kết quả
    return {
      message: 'Kiểm tra nguyên vật liệu thành công',
      data: {
        orderCode: order.code,
        bomCode: order.bom.code,
        productCode: order.bom.productCode,
        branchCode: order.branch.code,

        productionQuantity: order.quantity.toString(),
        status: order.status,
        materialStatus,
        canProduce: result.data.canProduce,

        materials: result.data.materials,
      },
    };
  }

  // Xác nhận kế hoạch sản xuất
  async confirmProductionOrder(code: string) {
    // 1. Tìm lệnh sản xuất
    const order = await this.prisma.productionOrder.findUnique({
      where: { code: code.trim() },
      include: {
        bom: true,
        branch: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy lệnh sản xuất');
    }

    // 2. Kiểm tra trạng thái
    if (order.status !== 'NEW') {
      throw new ConflictException('Chỉ được xác nhận lệnh sản xuất mới');
    }

    // 3. Kiểm tra hình thức sản xuất
    if (!['MAKE_TO_STOCK', 'HYBRID'].includes(order.productionMode)) {
      throw new BadRequestException('Lệnh không thuộc loại sản xuất theo mẻ');
    }

    // 4. Kiểm tra lại nguyên vật liệu
    const result = await this.bomApi.checkBomStock({
      bomCode: order.bom.code,
      branchCode: order.branch.code,
      productionQuantity: order.quantity.toString(),
    });

    // 5. Xác định tình trạng NVL
    const materialStatus = result.data.canProduce ? 'ENOUGH' : 'SHORTAGE';

    // 6. Xác nhận kế hoạch sản xuất
    const updated = await this.prisma.productionOrder.updateMany({
      where: {
        id: order.id,
        status: 'NEW',
      },
      data: {
        status: 'PENDING',
        materialStatus,
      },
    });

    if (updated.count !== 1) {
      throw new ConflictException('Lệnh đã được xử lý');
    }

    // 7. Trả kết quả
    return {
      message: 'Xác nhận kế hoạch sản xuất thành công',
      data: {
        orderCode: order.code,
        bomCode: order.bom.code,
        productCode: order.bom.productCode,
        branchCode: order.branch.code,
        productionMode: order.productionMode,

        quantity: order.quantity.toString(),
        status: 'PENDING',
        materialStatus,
        canProduce: result.data.canProduce,

        materials: result.data.materials,
      },
    };
  }

  // Cấp phát nguyên vật liệu cho lệnh sản xuất
  async issueProductionMaterials(code: string) {
    try {
      return await this.prisma.$transaction(
        async (tx) => {
          // 1. Tìm lệnh sản xuất và công thức BOM
          const order = await tx.productionOrder.findUnique({
            where: { code: code.trim() },
            include: {
              branch: true,
              bom: {
                include: {
                  details: {
                    include: {
                      material: {
                        include: { unit: true },
                      },
                      unit: true,
                    },
                  },
                },
              },
            },
          });

          if (!order) {
            throw new NotFoundException('Không tìm thấy lệnh sản xuất');
          }

          // 2. Kiểm tra trạng thái
          if (order.status !== 'PENDING') {
            throw new ConflictException('Lệnh chưa được xác nhận');
          }

          if (order.materialStatus !== 'ENOUGH') {
            throw new ConflictException('NVL chưa đủ hoặc đã được cấp phát');
          }

          if (!['MAKE_TO_STOCK', 'HYBRID'].includes(order.productionMode)) {
            throw new BadRequestException('Hình thức sản xuất không hợp lệ');
          }

          if (
            order.bom.status !== 'ACTIVE' ||
            order.bom.outputQuantity.lte(0) ||
            order.quantity.lte(0) ||
            order.bom.details.length === 0
          ) {
            throw new BadRequestException(
              'Công thức hoặc số lượng không hợp lệ',
            );
          }

          // 3. Đánh dấu cấp phát để chống thực hiện hai lần
          const updated = await tx.productionOrder.updateMany({
            where: {
              id: order.id,
              status: 'PENDING',
              materialStatus: 'ENOUGH',
            },
            data: {
              materialStatus: 'ISSUED',
            },
          });

          if (updated.count !== 1) {
            throw new ConflictException('Lệnh đã được cấp phát');
          }

          // 4. Chuẩn bị kiểm tra hạn sử dụng
          const formatter = new Intl.DateTimeFormat('sv-SE', {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });

          const today = formatter.format(new Date());

          const allocations: {
            materialCode: string;
            lotCode: string;
            locationName: string;
            quantity: string;
            unitName: string;
          }[] = [];

          // 5. Xử lý từng nguyên vật liệu trong BOM
          for (const item of order.bom.details) {
            const material = item.material;
            const unit = item.unit;

            if (
              material.status !== 'ACTIVE' ||
              material.unit.status !== 'ACTIVE' ||
              unit.status !== 'ACTIVE'
            ) {
              throw new BadRequestException(
                `Nguyên vật liệu không hoạt động: ${material.code}`,
              );
            }

            // Quy đổi về đơn vị tồn kho
            let factor = new Prisma.Decimal(1);

            if (item.unitId !== material.unitId) {
              if (
                unit.baseUnitId !== material.unitId ||
                unit.conversionFactor.lte(0)
              ) {
                throw new BadRequestException(
                  `Đơn vị tính không hợp lệ: ${material.code}`,
                );
              }

              factor = unit.conversionFactor;
            }

            // 6. Tính lượng NVL cần cấp phát
            const required = item.quantity
              .mul(factor)
              .mul(order.quantity)
              .div(order.bom.outputQuantity)
              .toDecimalPlaces(3, Prisma.Decimal.ROUND_UP);

            if (required.lte(0)) {
              throw new BadRequestException(
                `Số lượng NVL không hợp lệ: ${material.code}`,
              );
            }

            // 7. Lấy các lô và vị trí kho của chi nhánh
            const balances = await tx.materialBalance.findMany({
              where: {
                quantity: { gt: 0 },
                location: {
                  branchId: order.branchId,
                },
                materialLot: {
                  materialId: material.id,
                  status: 'ACTIVE',
                },
              },
              include: {
                materialLot: true,
                location: true,
              },
            });

            // Loại bỏ lô hết hạn
            const validBalances = balances.filter((balance) => {
              const expiry = balance.materialLot.expiryDate;

              return !expiry || formatter.format(expiry) >= today;
            });

            // 8. Ưu tiên lô hết hạn sớm nhất (FEFO)
            validBalances.sort((a, b) => {
              const dateA = a.materialLot.expiryDate?.getTime() ?? Infinity;
              const dateB = b.materialLot.expiryDate?.getTime() ?? Infinity;

              if (dateA !== dateB) {
                return dateA - dateB;
              }

              return a.materialLot.lotCode.localeCompare(b.materialLot.lotCode);
            });

            // 9. Kiểm tra tổng số lượng có thể xuất
            const available = validBalances.reduce(
              (sum, balance) => sum.plus(balance.quantity),
              new Prisma.Decimal(0),
            );

            if (available.lt(required)) {
              throw new BadRequestException(
                `Không đủ tồn kho ${material.code}: ` +
                  `cần ${required.toString()}, ` +
                  `hiện có ${available.toString()} ${material.unit.name}`,
              );
            }

            // 10. Trừ tồn theo từng lô
            let remaining = required;

            for (const balance of validBalances) {
              if (remaining.lte(0)) {
                break;
              }

              const used = balance.quantity.gte(remaining)
                ? remaining
                : balance.quantity;

              const result = await tx.materialBalance.updateMany({
                where: {
                  id: balance.id,
                  quantity: { gte: used },
                },
                data: {
                  quantity: { decrement: used },
                },
              });

              if (result.count !== 1) {
                throw new ConflictException(
                  'Tồn kho vừa thay đổi, vui lòng kiểm tra lại',
                );
              }

              // 11. Lấy tồn sau khi cấp phát
              const after = await tx.materialBalance.findUniqueOrThrow({
                where: { id: balance.id },
              });

              // 12. Ghi lịch sử cấp phát
              await tx.inventoryMovement.create({
                data: {
                  productionOrderId: order.id,
                  materialLotId: balance.materialLotId,
                  locationId: balance.locationId,
                  movementType: 'ISSUE',
                  quantityBefore: after.quantity.plus(used),
                  quantityChange: used.neg(),
                  quantityAfter: after.quantity,
                },
              });

              allocations.push({
                materialCode: material.code,
                lotCode: balance.materialLot.lotCode,
                locationName: balance.location.name,
                quantity: used.toString(),
                unitName: material.unit.name,
              });

              remaining = remaining.minus(used);
            }
          }

          // 13. Trả kết quả
          return {
            message: 'Cấp phát nguyên vật liệu thành công',
            data: {
              orderCode: order.code,
              branchCode: order.branch.code,
              status: 'PENDING',
              materialStatus: 'ISSUED',
              totalMovements: allocations.length,
              allocations,
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
        error.code === 'P2034'
      ) {
        throw new ConflictException(
          'Giao dịch kho bị xung đột, vui lòng thử lại',
        );
      }

      throw error;
    }
  }

  // Lấy lịch sử cấp phát nguyên vật liệu cho lệnh sản xuất
  async getMaterialMovements(code: string) {
    // 1. Tìm lệnh sản xuất
    const order = await this.prisma.productionOrder.findUnique({
      where: { code: code.trim() },
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy lệnh sản xuất');
    }

    // 2. Lấy lịch sử cấp phát NVL
    const movements = await this.prisma.inventoryMovement.findMany({
      where: {
        productionOrderId: order.id,
      },
      include: {
        materialLot: {
          include: {
            material: {
              include: { unit: true },
            },
          },
        },
        location: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // 3. Trả kết quả
    return {
      message: 'Lấy lịch sử NVL thành công',
      data: {
        orderCode: order.code,
        materialStatus: order.materialStatus,
        totalMovements: movements.length,

        movements: movements.map((item) => ({
          materialCode: item.materialLot.material.code,
          materialName: item.materialLot.material.name,
          lotCode: item.materialLot.lotCode,
          locationName: item.location.name,
          unitName: item.materialLot.material.unit.name,
          movementType: item.movementType,
          quantityBefore: item.quantityBefore.toString(),
          quantityChange: item.quantityChange.toString(),
          quantityAfter: item.quantityAfter.toString(),
          createdAt: item.createdAt,
        })),
      },
    };
  }

  // Hủy lệnh sản xuất
  async cancelProductionOrder(code: string) {
    // 1. Tìm lệnh sản xuất
    const order = await this.prisma.productionOrder.findUnique({
      where: { code: code.trim() },
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy lệnh sản xuất');
    }

    // 2. Kiểm tra trạng thái lệnh
    if (!['NEW', 'PENDING'].includes(order.status)) {
      throw new ConflictException('Lệnh không thể hủy');
    }

    // 3. Không cho hủy nếu đã cấp phát
    if (order.materialStatus === 'ISSUED') {
      throw new ConflictException(
        'Lệnh đã cấp phát NVL, không thể hủy trực tiếp',
      );
    }

    // 4. Kiểm tra lịch sử cấp phát
    const movementCount = await this.prisma.inventoryMovement.count({
      where: { productionOrderId: order.id },
    });

    if (movementCount > 0) {
      throw new ConflictException(
        'Lệnh đã có giao dịch kho, không thể hủy trực tiếp',
      );
    }

    // 5. Cập nhật trạng thái
    const result = await this.prisma.productionOrder.updateMany({
      where: {
        id: order.id,
        status: { in: ['NEW', 'PENDING'] },
        materialStatus: { not: 'ISSUED' },
      },
      data: {
        status: 'CANCELLED',
      },
    });

    if (result.count !== 1) {
      throw new ConflictException('Lệnh đã được xử lý');
    }

    // 6. Trả kết quả
    return {
      message: 'Hủy lệnh sản xuất thành công',
      data: {
        orderCode: order.code,
        status: 'CANCELLED',
        materialStatus: order.materialStatus,
      },
    };
  }

  // Lấy tiến độ lệnh sản xuất
  async getProductionOrderProgress(code: string) {
    // 1. Tìm lệnh sản xuất
    const order = await this.prisma.productionOrder.findUnique({
      where: { code: code.trim() },
      include: {
        bom: true,
        branch: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy lệnh sản xuất');
    }

    // 2. Xác định giai đoạn hiện tại
    let phase = 'WAITING_CONFIRMATION';

    if (order.status === 'CANCELLED') {
      phase = 'CANCELLED';
    } else if (order.status === 'COMPLETED') {
      phase = 'COMPLETED';
    } else if (order.status === 'IN_PROGRESS') {
      phase = 'PRODUCING';
    } else if (order.status === 'WAITING_APPROVAL') {
      phase = 'WAITING_APPROVAL';
    } else if (order.status === 'PENDING') {
      if (order.materialStatus === 'SHORTAGE') {
        phase = 'WAITING_MATERIALS';
      } else if (order.materialStatus === 'ISSUED') {
        phase = order.assignedEmployeeCode
          ? 'READY_TO_START'
          : 'WAITING_ASSIGNMENT';
      } else {
        phase = 'WAITING_ISSUE';
      }
    }

    // 3. Trả kết quả
    return {
      message: 'Lấy tiến độ sản xuất thành công',
      data: {
        orderCode: order.code,
        productCode: order.bom.productCode,
        branchCode: order.branch.code,
        quantity: order.quantity.toString(),

        status: order.status,
        materialStatus: order.materialStatus,
        phase,

        assignedEmployeeCode: order.assignedEmployeeCode,
        assignedAt: order.assignedAt,
        createdAt: order.createdAt,
      },
    };
  }

  // Giao lệnh sản xuất cho nhân viên
  async assignProductionOrder(code: string, dto: AssignProductionOrderDto) {
    // 1. Kiểm tra mã nhân viên
    const employeeCode = dto.employeeCode.trim();

    if (!employeeCode) {
      throw new BadRequestException('Mã nhân viên không hợp lệ');
    }

    // 2. Tìm lệnh sản xuất
    const order = await this.prisma.productionOrder.findUnique({
      where: { code: code.trim() },
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy lệnh sản xuất');
    }

    // 3. Kiểm tra trạng thái
    if (order.status !== 'PENDING') {
      throw new ConflictException('Lệnh chưa sẵn sàng để giao');
    }

    // 4. Kiểm tra nguyên vật liệu
    if (order.materialStatus !== 'ISSUED') {
      throw new ConflictException('Lệnh chưa được cấp phát nguyên vật liệu');
    }

    // 5. Kiểm tra đã giao việc chưa
    if (order.assignedEmployeeCode) {
      throw new ConflictException('Lệnh đã được giao cho nhân viên');
    }

    // 6. Giao lệnh
    const result = await this.prisma.productionOrder.updateMany({
      where: {
        id: order.id,
        status: 'PENDING',
        materialStatus: 'ISSUED',
        assignedEmployeeCode: null,
      },
      data: {
        assignedEmployeeCode: employeeCode,
        assignedAt: new Date(),
      },
    });

    if (result.count !== 1) {
      throw new ConflictException('Lệnh đã được xử lý');
    }

    // 7. Trả kết quả
    return {
      message: 'Giao lệnh sản xuất thành công',
      data: {
        orderCode: order.code,
        employeeCode,
        status: 'PENDING',
        materialStatus: 'ISSUED',
        phase: 'READY_TO_START',
      },
    };
  }

  // Bắt đầu sản xuất
  async startProductionOrder(code: string) {
    // 1. Tìm lệnh sản xuất
    const order = await this.prisma.productionOrder.findUnique({
      where: { code: code.trim() },
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy lệnh sản xuất');
    }

    // 2. Kiểm tra điều kiện bắt đầu
    if (
      order.status !== 'PENDING' ||
      order.materialStatus !== 'ISSUED' ||
      !order.assignedEmployeeCode
    ) {
      throw new ConflictException('Lệnh chưa đủ điều kiện bắt đầu sản xuất');
    }

    if (!['MAKE_TO_STOCK', 'HYBRID'].includes(order.productionMode)) {
      throw new BadRequestException('Hình thức sản xuất không hợp lệ');
    }

    // 3. Chuyển trạng thái
    const result = await this.prisma.productionOrder.updateMany({
      where: {
        id: order.id,
        status: 'PENDING',
        materialStatus: 'ISSUED',
        assignedEmployeeCode: { not: null },
      },
      data: {
        status: 'IN_PROGRESS',
      },
    });

    if (result.count !== 1) {
      throw new ConflictException('Lệnh đã được xử lý');
    }

    // 4. Trả kết quả
    return {
      message: 'Bắt đầu sản xuất thành công',
      data: {
        orderCode: order.code,
        employeeCode: order.assignedEmployeeCode,
        status: 'IN_PROGRESS',
        materialStatus: 'ISSUED',
      },
    };
  }
}

import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  CreateReceiptDto,
  CreateReceiptDetailDto,
} from '../dto/create-receipt.dto.js';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class ReceiptApi {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Hàm chính: Tạo phiếu nhập kho
  async createReceipt(dto: CreateReceiptDto) {
    try {
      return await this.prisma.$transaction(
        async (tx) => {
          // Kiểm tra thông tin chung
          await this.checkInfo(tx, dto);

          // Tạo phiếu nhập

          const { supplier, branch } = await this.checkInfo(tx, dto);

          const receipt = await tx.goodsReceipt.create({
            data: {
              receiptCode: dto.receiptCode,
              supplierId: supplier.id,
              branchId: branch.id,
              note: dto.note,
              status: 'POSTED',
              postedAt: new Date(),
            },
          });

          for (const item of dto.details) {
            await this.addMaterial(tx, receipt.id, branch.id, item);
          }

          return {
            message: 'Nhập kho thành công',
            data: {
              receiptId: receipt.id,
              receiptCode: receipt.receiptCode,
              status: receipt.status,
              totalItems: dto.details.length,
            },
          };
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    } catch (error) {
      const code =
        error && typeof error === 'object' && 'code' in error
          ? error.code
          : null;

      if (code === 'P2002') {
        throw new ConflictException(
          'Mã phiếu nhập đã tồn tại hoặc dữ liệu bị trùng',
        );
      }

      if (code === 'P2034') {
        throw new ConflictException(
          'Có giao dịch kho đồng thời, vui lòng thử lại',
        );
      }

      throw error;
    }
  }

  async getReceipts() {
    // Lấy danh sách phiếu nhập từ PostgreSQL
    const receipts = await this.prisma.goodsReceipt.findMany({
      include: {
        supplier: true,
        branch: true,
        _count: {
          select: {
            details: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    // Chỉ trả về thông tin cần hiển thị
    const data = receipts.map((receipt) => ({
      receiptCode: receipt.receiptCode,
      supplierCode: receipt.supplier.code,
      supplierName: receipt.supplier.name,
      branchCode: receipt.branch.code,
      branchName: receipt.branch.name,
      status: receipt.status,
      createdAt: receipt.createdAt,
      totalItems: receipt._count.details,
    }));

    return {
      message: 'Lấy danh sách phiếu nhập thành công',
      data,
    };
  }

  // 2. Kiểm tra nhà cung cấp và chi nhánh

  private async checkInfo(tx: Prisma.TransactionClient, dto: CreateReceiptDto) {
    // Tìm nhà cung cấp theo mã
    const supplier = await tx.supplier.findUnique({
      where: { code: dto.supplierCode },
    });

    if (!supplier || supplier.status !== 'ACTIVE') {
      throw new BadRequestException('Nhà cung cấp không hợp lệ');
    }

    // Tìm chi nhánh theo mã
    const branch = await tx.branch.findUnique({
      where: { code: dto.branchCode },
    });

    if (!branch || !branch.isActive) {
      throw new BadRequestException('Chi nhánh không hợp lệ');
    }

    return { supplier, branch };
  }

  // 3. Kiểm tra và nhập một dòng nguyên vật liệu

  private async addMaterial(
    tx: Prisma.TransactionClient,
    receiptId: string,
    branchId: string,
    item: CreateReceiptDetailDto,
  ) {
    // 1. Tìm nguyên vật liệu theo mã
    const material = await tx.material.findUnique({
      where: { code: item.materialCode },
    });

    if (!material || material.status !== 'ACTIVE') {
      throw new BadRequestException('NVL không hợp lệ');
    }

    // 2. Tìm lô theo mã NVL và mã lô
    const lot = await tx.materialLot.findUnique({
      where: {
        materialId_lotCode: {
          materialId: material.id,
          lotCode: item.lotCode,
        },
      },
    });

    if (!lot || lot.status !== 'ACTIVE') {
      throw new BadRequestException('Lô NVL không hợp lệ');
    }

    // 3. Tìm vị trí trong đúng chi nhánh
    const location = await tx.warehouseLocation.findUnique({
      where: {
        branchId_name: {
          branchId,
          name: item.locationName,
        },
      },
    });

    if (!location) {
      throw new BadRequestException('Vị trí kho không hợp lệ');
    }

    // 4. Tìm đơn vị tính theo tên
    const unit = await tx.unit.findUnique({
      where: { name: item.unitName },
    });

    if (!unit || unit.status !== 'ACTIVE') {
      throw new BadRequestException('Đơn vị tính không hợp lệ');
    }

    // 5. Quy đổi về đơn vị lưu tồn
    const quantity = new Prisma.Decimal(item.quantity);

    let stockQuantity = quantity;

    if (unit.id !== material.unitId) {
      if (unit.baseUnitId !== material.unitId) {
        throw new BadRequestException('Không thể quy đổi đơn vị tính');
      }

      stockQuantity = quantity.mul(unit.conversionFactor);
    }

    if (stockQuantity.lte(0) || stockQuantity.decimalPlaces() > 3) {
      throw new BadRequestException('Số lượng sau quy đổi không hợp lệ');
    }

    // 6. Lưu chi tiết phiếu nhập
    const detail = await tx.goodsReceiptDetail.create({
      data: {
        receiptId,
        materialId: material.id,
        materialLotId: lot.id,
        locationId: location.id,
        unitId: unit.id,
        quantity,
        unitPrice: new Prisma.Decimal(item.unitPrice),
      },
    });

    // 7. Cộng số lượng tồn kho
    const balance = await tx.materialBalance.upsert({
      where: {
        locationId_materialLotId: {
          locationId: location.id,
          materialLotId: lot.id,
        },
      },
      create: {
        locationId: location.id,
        materialLotId: lot.id,
        quantity: stockQuantity,
      },
      update: {
        quantity: { increment: stockQuantity },
      },
    });

    // 8. Ghi lịch sử giao dịch
    await tx.inventoryMovement.create({
      data: {
        receiptDetailId: detail.id,
        materialLotId: lot.id,
        locationId: location.id,
        movementType: 'RECEIPT',
        quantityBefore: balance.quantity.minus(stockQuantity),
        quantityChange: stockQuantity,
        quantityAfter: balance.quantity,
      },
    });
  }
//lấy chiet tiết phiếu nhập theo mã
  async getReceiptByCode(code: string) {
    // 1. Tìm phiếu nhập theo mã
    const receipt = await this.prisma.goodsReceipt.findUnique({
      where: { receiptCode: code },
      include: {
        supplier: true,
        branch: true,
        details: {
          include: {
            material: true,
            materialLot: true,
            location: true,
            unit: true,
          },
        },
      },
    });

    // 2. Kiểm tra phiếu có tồn tại không
    if (!receipt) {
      throw new NotFoundException('Không tìm thấy phiếu nhập');
    }

    // 3. Trả dữ liệu
    return {
      message: 'Lấy chi tiết phiếu nhập thành công',
      data: {
        receiptCode: receipt.receiptCode,
        supplierName: receipt.supplier.name,
        branchName: receipt.branch.name,
        status: receipt.status,
        createdAt: receipt.createdAt,
        note: receipt.note,

        details: receipt.details.map((item) => ({
          materialCode: item.material.code,
          materialName: item.material.name,
          lotCode: item.materialLot.lotCode,
          locationName: item.location.name,
          unitName: item.unit.name,
          quantity: item.quantity.toString(),
          unitPrice: item.unitPrice.toString(),
        })),
      },
    };
  }
}

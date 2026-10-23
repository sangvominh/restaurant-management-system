
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

@Injectable()
export class ReceiptApi {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Hàm chính: Tạo phiếu nhập kho
  async createReceipt(dto: CreateReceiptDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Kiểm tra thông tin chung
        await this.checkInfo(tx, dto);

        // Tạo phiếu nhập
        const receipt = await tx.goodsReceipt.create({
          data: {
            receiptCode: dto.receiptCode,
            supplierId: dto.supplierId,
            branchId: dto.branchId,
            note: dto.note,
            status: 'POSTED',
            postedAt: new Date(),
          },
        });

        // Nhập từng nguyên vật liệu
        for (const item of dto.details) {
          await this.addMaterial(
            tx,
            receipt.id,
            dto.branchId,
            item,
          );
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
      }, {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      });
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

  // 2. Kiểm tra nhà cung cấp và chi nhánh
  private async checkInfo(
    tx: Prisma.TransactionClient,
    dto: CreateReceiptDto,
  ) {
    const supplier = await tx.supplier.findUnique({
      where: { id: dto.supplierId },
    });

    if (!supplier || supplier.status !== 'ACTIVE') {
      throw new BadRequestException(
        'Nhà cung cấp không hợp lệ',
      );
    }

    const branch = await tx.branch.findUnique({
      where: { id: dto.branchId },
    });

    if (!branch || !branch.isActive) {
      throw new BadRequestException(
        'Chi nhánh không hợp lệ',
      );
    }
  }

  // 3. Kiểm tra và nhập một dòng nguyên vật liệu
  private async addMaterial(
    tx: Prisma.TransactionClient,
    receiptId: string,
    branchId: string,
    item: CreateReceiptDetailDto,
  ) {
    const material = await tx.material.findUnique({
      where: { id: item.materialId },
    });

    const lot = await tx.materialLot.findUnique({
      where: { id: item.materialLotId },
    });

    const location = await tx.warehouseLocation.findUnique({
      where: { id: item.locationId },
    });

    const unit = await tx.unit.findUnique({
      where: { id: item.unitId },
    });

    // Kiểm tra dữ liệu liên quan
    if (!material || material.status !== 'ACTIVE') {
      throw new BadRequestException('NVL không hợp lệ');
    }

    if (
      !lot ||
      lot.materialId !== material.id ||
      lot.status !== 'ACTIVE'
    ) {
      throw new BadRequestException('Lô NVL không hợp lệ');
    }

    if (!location || location.branchId !== branchId) {
      throw new BadRequestException('Vị trí kho không hợp lệ');
    }

    if (!unit || unit.status !== 'ACTIVE') {
      throw new BadRequestException('Đơn vị tính không hợp lệ');
    }

    // Quy đổi số lượng về đơn vị lưu kho
    const quantity = new Prisma.Decimal(item.quantity);

    let stockQuantity = quantity;

    if (item.unitId !== material.unitId) {
      if (unit.baseUnitId !== material.unitId) {
        throw new BadRequestException(
          'Không thể quy đổi đơn vị tính',
        );
      }

      stockQuantity = quantity.mul(unit.conversionFactor);
    }

    if (
      stockQuantity.lte(0) ||
      stockQuantity.decimalPlaces() > 3
    ) {
      throw new BadRequestException(
        'Số lượng sau quy đổi không hợp lệ',
      );
    }

    // Lưu chi tiết phiếu nhập
    const detail = await tx.goodsReceiptDetail.create({
      data: {
        receiptId,
        materialId: item.materialId,
        materialLotId: item.materialLotId,
        locationId: item.locationId,
        unitId: item.unitId,
        quantity,
        unitPrice: new Prisma.Decimal(item.unitPrice),
      },
    });

    // Cộng tồn kho
    const balance = await tx.materialBalance.upsert({
      where: {
        locationId_materialLotId: {
          locationId: item.locationId,
          materialLotId: item.materialLotId,
        },
      },
      create: {
        locationId: item.locationId,
        materialLotId: item.materialLotId,
        quantity: stockQuantity,
      },
      update: {
        quantity: { increment: stockQuantity },
      },
    });

    // Ghi lịch sử
    await tx.inventoryMovement.create({
      data: {
        receiptDetailId: detail.id,
        materialLotId: item.materialLotId,
        locationId: item.locationId,
        movementType: 'RECEIPT',
        quantityBefore: balance.quantity.minus(stockQuantity),
        quantityChange: stockQuantity,
        quantityAfter: balance.quantity,
      },
    });
  }
}

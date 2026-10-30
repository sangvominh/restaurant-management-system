import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

const inventoryInclude = {
  unit: true,
  category: true,
  lots: {
    include: {
      balances: {
        include: {
          location: {
            include: { branch: true },
          },
        },
      },
    },
  },
} satisfies Prisma.MaterialInclude;

type InventoryMaterial = Prisma.MaterialGetPayload<{
  include: typeof inventoryInclude;
}>;

@Injectable()
export class InventoryApi {
  constructor(private readonly prisma: PrismaService) {}

  async getInventory(branchCode?: string) {
    const branchId = await this.getBranchId(branchCode);
    const materials = await this.prisma.material.findMany({
      include: inventoryInclude,
      orderBy: { name: 'asc' },
    });
    const today = this.getToday();

    return {
      message: 'Lấy danh sách tồn kho thành công',
      data: materials.map((material) =>
        this.toInventoryItem(material, today, branchId),
      ),
    };
  }

  async getInventoryByCode(code: string, branchCode?: string) {
    const branchId = await this.getBranchId(branchCode);
    const material = await this.prisma.material.findUnique({
      where: { code: code.trim() },
      include: inventoryInclude,
    });

    if (!material) {
      throw new NotFoundException(
        `Không tìm thấy nguyên vật liệu có mã ${code}`,
      );
    }

    const today = this.getToday();
    const item = this.toInventoryItem(material, today, branchId);
    const lots = this.toLots(material, today, branchId);

    return {
      message: 'Lấy chi tiết tồn kho thành công',
      data: { ...item, lots },
    };
  }

  async getInventoryAlerts(branchCode?: string) {
    const inventory = await this.getInventory(branchCode);

    return {
      message: 'Lấy cảnh báo tồn kho thành công',
      data: inventory.data.filter(
        (item) => item.status === 'ACTIVE' && item.stockStatus === 'LOW_STOCK',
      ),
    };
  }

  async getInventoryMovements() {
    const movements = await this.prisma.inventoryMovement.findMany({
      include: {
        materialLot: {
          include: { material: true },
        },
        location: true,
        productionOrder: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return {
      message: 'Lấy lịch sử NVL thành công',
      data: movements.map((item) => ({
        materialCode: item.materialLot.material.code,
        lotCode: item.materialLot.lotCode,
        locationName: item.location.name,
        orderCode: item.productionOrder?.code ?? null,
        movementType: item.movementType,
        quantityBefore: item.quantityBefore.toString(),
        quantityChange: item.quantityChange.toString(),
        quantityAfter: item.quantityAfter.toString(),
        createdAt: item.createdAt,
      })),
    };
  }

  private async getBranchId(branchCode?: string) {
    const code = branchCode?.trim();

    if (!code) {
      return undefined;
    }

    const branch = await this.prisma.branch.findUnique({ where: { code } });

    if (!branch) {
      throw new NotFoundException(`Không tìm thấy chi nhánh ${code}`);
    }

    return branch.id;
  }

  private getToday() {
    return new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  }

  private toInventoryItem(
    material: InventoryMaterial,
    today: string,
    branchId?: string,
  ) {
    const totalStock = material.lots.reduce(
      (total, lot) =>
        total.plus(
          lot.balances
            .filter(
              (balance) => !branchId || balance.location.branchId === branchId,
            )
            .reduce(
              (sum, balance) => sum.plus(balance.quantity),
              new Prisma.Decimal(0),
            ),
        ),
      new Prisma.Decimal(0),
    );
    const availableStock =
      material.status === 'ACTIVE'
        ? material.lots.reduce((total, lot) => {
            if (!this.isLotAvailable(lot, today)) {
              return total;
            }

            return total.plus(
              lot.balances
                .filter(
                  (balance) =>
                    (!branchId || balance.location.branchId === branchId) &&
                    balance.quantity.gt(0),
                )
                .reduce(
                  (sum, balance) => sum.plus(balance.quantity),
                  new Prisma.Decimal(0),
                ),
            );
          }, new Prisma.Decimal(0))
        : new Prisma.Decimal(0);

    return {
      id: material.id,
      code: material.code,
      name: material.name,
      category: material.category.name,
      unit: material.unit.name,
      status: material.status,
      minStock: Number(material.minStock),
      totalStock: totalStock.toNumber(),
      availableStock: availableStock.toNumber(),
      stockStatus: availableStock.lte(material.minStock)
        ? 'LOW_STOCK'
        : 'AVAILABLE',
    };
  }

  private toLots(
    material: InventoryMaterial,
    today: string,
    branchId?: string,
  ) {
    return material.lots.map((lot) => {
      const balances = lot.balances.filter(
        (balance) => !branchId || balance.location.branchId === branchId,
      );
      const totalStock = balances.reduce(
        (sum, balance) => sum.plus(balance.quantity),
        new Prisma.Decimal(0),
      );
      const lotAvailable =
        material.status === 'ACTIVE' && this.isLotAvailable(lot, today);
      const availableStock = lotAvailable
        ? balances
            .filter((balance) => balance.quantity.gt(0))
            .reduce(
              (sum, balance) => sum.plus(balance.quantity),
              new Prisma.Decimal(0),
            )
        : new Prisma.Decimal(0);

      return {
        lotCode: lot.lotCode,
        expiryDate: lot.expiryDate,
        status: lot.status,
        isAvailable: lotAvailable,
        totalStock: totalStock.toNumber(),
        availableStock: availableStock.toNumber(),
        locations: balances.map((balance) => ({
          branchCode: balance.location.branch.code,
          branchName: balance.location.branch.name,
          locationName: balance.location.name,
          quantity: Number(balance.quantity),
          availableQuantity:
            lotAvailable && balance.quantity.gt(0)
              ? Number(balance.quantity)
              : 0,
        })),
      };
    });
  }

  private isLotAvailable(
    lot: InventoryMaterial['lots'][number],
    today: string,
  ) {
    const expiry = lot.expiryDate;

    return (
      lot.status === 'ACTIVE' &&
      (!expiry ||
        new Intl.DateTimeFormat('sv-SE', {
          timeZone: 'Asia/Ho_Chi_Minh',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(expiry) >= today)
    );
  }
}

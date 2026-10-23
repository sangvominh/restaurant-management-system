
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class InventoryApi {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getInventory() {
    const materials = await this.prisma.material.findMany({
      include: {
        unit: true,
        category: true,
        lots: {
          include: {
            balances: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const data = materials.map((material) => {
      const totalStock = material.lots.reduce(
        (total, lot) =>
          total +
          lot.balances.reduce(
            (sum, balance) => sum + Number(balance.quantity),
            0,
          ),
        0,
      );

      return {
        id: material.id,
        code: material.code,
        name: material.name,
        category: material.category.name,
        unit: material.unit.name,
        minStock: Number(material.minStock),
        totalStock,
        stockStatus:
          totalStock <= Number(material.minStock)
            ? 'LOW_STOCK'
            : 'AVAILABLE',
      };
    });

    return {
      message: 'Lấy danh sách tồn kho thành công',
      data,
    };
  }
}

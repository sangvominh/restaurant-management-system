import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
// API quản lý tồn kho

@Injectable()
export class InventoryApi {
  constructor(private readonly prisma: PrismaService) {}
  //Lấy danh sách tồn kho
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
          totalStock <= Number(material.minStock) ? 'LOW_STOCK' : 'AVAILABLE',
      };
    });

    return {
      message: 'Lấy danh sách tồn kho thành công',
      data,
    };
  }

  //Xem chi tiết tồn kho theo mã NVL

  async getInventoryByCode(code: string) {
    const material = await this.prisma.material.findUnique({
      where: { code },
      include: {
        unit: true,
        category: true,
        lots: {
          include: {
            balances: {
              include: {
                location: {
                  include: {
                    branch: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!material) {
      throw new NotFoundException(
        `Không tìm thấy nguyên vật liệu có mã ${code}`,
      );
    }

    const lots = material.lots.map((lot) => {
      const locations = lot.balances.map((balance) => ({
        branchName: balance.location.branch.name,
        locationName: balance.location.name,
        quantity: Number(balance.quantity),
      }));

      return {
        lotCode: lot.lotCode,
        expiryDate: lot.expiryDate,
        locations,
        totalStock: locations.reduce((sum, item) => sum + item.quantity, 0),
      };
    });

    const totalStock = lots.reduce((sum, lot) => sum + lot.totalStock, 0);

    return {
      message: 'Lấy chi tiết tồn kho thành công',
      data: {
        id: material.id,
        code: material.code,
        name: material.name,
        category: material.category.name,
        unit: material.unit.name,
        minStock: Number(material.minStock),
        totalStock,
        stockStatus:
          totalStock <= Number(material.minStock) ? 'LOW_STOCK' : 'AVAILABLE',
        lots,
      },
    };
  }
}

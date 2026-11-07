import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { isUsableLotExpiry } from '../lot-expiry.js';

const recipeInclude = { details: { include: { material: { include: { unit: true } }, unit: true } } } as const;
type Recipe = Prisma.BomGetPayload<{ include: typeof recipeInclude }>;
type Product = { code: string; name: string; unit: string; status: string };
export interface CapacityResult {
  productCode: string; productName: string; unit: string | null;
  maxQuantity: string | null; status: 'AVAILABLE' | 'SHORTAGE' | 'UNAVAILABLE'; reason: string | null;
}

export function calculateProductCapacity(recipe: Recipe, product: Product | undefined,
  stock: Map<string, Prisma.Decimal>, branchId: string): CapacityResult {
  const result: CapacityResult = {
    productCode: recipe.productCode, productName: product?.name ?? recipe.productName ?? recipe.productCode,
    unit: product?.unit ?? null, maxQuantity: null, status: 'UNAVAILABLE', reason: null,
  };
  const unavailable = (reason: string) => ({ ...result, reason });
  if (!product) return unavailable('Chưa có sản phẩm mã ' + recipe.productCode + ' trong danh mục. Cần Quản lý Nhà hàng bổ sung sản phẩm đúng mã và đơn vị tính.');
  if (product.status !== 'ACTIVE') return unavailable('Sản phẩm đã ngừng hoạt động.');
  if (recipe.outputQuantity.lte(0) || !recipe.details.length) return unavailable('Định mức chưa đầy đủ hoặc không hợp lệ.');
  let maximum: Prisma.Decimal | null = null;
  const missingMaterials: string[] = [];
  for (const line of recipe.details) {
    if (line.branchId && line.branchId !== branchId) return unavailable('Định mức chưa áp dụng cho kho đã chọn.');
    if (line.material.status !== 'ACTIVE' || line.material.unit.status !== 'ACTIVE' || line.unit.status !== 'ACTIVE')
      return unavailable('Có nguyên vật liệu hoặc đơn vị đã ngừng hoạt động.');
    let factor = new Prisma.Decimal(1);
    if (line.unitId !== line.material.unitId) {
      if (line.unit.baseUnitId !== line.material.unitId || line.unit.conversionFactor.lte(0))
        return unavailable('Đơn vị trong định mức chưa được quy đổi hợp lệ.');
      factor = line.unit.conversionFactor;
    }
    if (line.quantity.lte(0)) return unavailable('Định mức chưa đầy đủ hoặc không hợp lệ.');
    const available = stock.get(line.materialId) ?? new Prisma.Decimal(0);
    const possible = available.mul(recipe.outputQuantity).div(line.quantity.mul(factor));
    if (possible.lt(1)) missingMaterials.push(line.material.name);
    maximum = maximum === null ? possible : Prisma.Decimal.min(maximum, possible);
  }
  const quantity = maximum!.floor();
  return { ...result, maxQuantity: quantity.toFixed(0), status: quantity.gt(0) ? 'AVAILABLE' : 'SHORTAGE',
    reason: quantity.gt(0) ? null : [...new Set(missingMaterials)].join(', ') + ' thiếu. Đang chờ nhập kho.' };
}

@Injectable()
export class ProductionCapacityApi {
  constructor(private readonly prisma: PrismaService) {}
  async getCapacity(branchCode?: string) {
    const code = branchCode?.trim();
    if (!code) throw new BadRequestException('Cần xác định kho theo chi nhánh hợp lệ.');
    const now = new Date();
    return this.prisma.$transaction(async tx => {
      const branch = await tx.branch.findUnique({ where: { code } });
      if (!branch) throw new NotFoundException('Không tìm thấy chi nhánh.');
      if (!branch.isActive) throw new BadRequestException('Chi nhánh đã ngừng hoạt động.');
      const recipes = await tx.bom.findMany({ where: { status: 'ACTIVE' }, include: recipeInclude,
        orderBy: [{ productCode: 'asc' }, { version: 'desc' }] });
      const products = await tx.product.findMany({ where: { code: { in: [...new Set(recipes.map(row => row.productCode))] } },
        select: { code: true, name: true, unit: true, status: true } });
      const balances = await tx.materialBalance.findMany({
        where: { quantity: { gt: 0 }, location: { branchId: branch.id, locationType: { not: 'FINISHED_GOODS' } },
          materialLot: { status: 'ACTIVE', material: { status: 'ACTIVE', unit: { status: 'ACTIVE' } } } },
        select: { quantity: true, materialLot: { select: { materialId: true, expiryDate: true } } },
      });
      const stock = new Map<string, Prisma.Decimal>();
      for (const balance of balances) {
        if (!isUsableLotExpiry(balance.materialLot.expiryDate, now)) continue;
        const id = balance.materialLot.materialId;
        stock.set(id, (stock.get(id) ?? new Prisma.Decimal(0)).plus(balance.quantity));
      }
      const productMap = new Map(products.map(product => [product.code, product]));
      const latest = new Map<string, Recipe>();
      for (const recipe of recipes) if (!latest.has(recipe.productCode)) latest.set(recipe.productCode, recipe);
      return { message: 'Khả năng tạo sản phẩm từ tồn NVL', data: {
        branchCode: branch.code, branchName: branch.name, checkedAt: now,
        items: [...latest.values()].map(recipe => calculateProductCapacity(recipe, productMap.get(recipe.productCode), stock, branch.id)),
      } };
    }, { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead });
  }
}

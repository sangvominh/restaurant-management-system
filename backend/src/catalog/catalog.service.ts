import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
export type CatalogKind = 'units' | 'categories' | 'materials' | 'suppliers' | 'products';
export function kind(value: string): CatalogKind {
  if (!['units', 'categories', 'materials', 'suppliers', 'products'].includes(value)) throw new BadRequestException('Danh mục không hợp lệ');
  return value as CatalogKind;
}
function text(value: unknown, label: string, max = 200): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) throw new BadRequestException(`${label} không hợp lệ`);
  return value.trim();
}
function uuid(value: unknown) {
  const result = text(value, 'ID', 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(result)) throw new BadRequestException('ID không hợp lệ');
  return result;
}
function decimal(value: unknown, label: string, scale: number) {
  if ((typeof value !== 'string' && typeof value !== 'number') || !new RegExp(`^\\d{1,${18-scale}}(?:\\.\\d{1,${scale}})?$`).test(String(value)))
    throw new BadRequestException(`${label} phải không âm, tối đa ${scale} chữ số thập phân`);
  return new Prisma.Decimal(value);
}
@Injectable()
export class CatalogService {
  constructor(private readonly db: PrismaService) {}
  list(type: CatalogKind) {
    switch (type) {
      case 'units': return this.db.unit.findMany({ orderBy: { name: 'asc' } });
      case 'categories': return this.db.category.findMany({ orderBy: [{ objectType: 'asc' }, { name: 'asc' }] });
      case 'materials': return this.db.material.findMany({ include: { unit: true, category: true }, orderBy: { code: 'asc' } });
      case 'suppliers': return this.db.supplier.findMany({ orderBy: { code: 'asc' } });
      case 'products': return this.db.product.findMany({ include: { unit: true, category: true }, orderBy: { code: 'asc' } });
    }
  }
  async save(type: CatalogKind, input: unknown, itemId?: string) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new BadRequestException('Dữ liệu không hợp lệ');
    const b = input as Record<string, unknown>;
    if (itemId) uuid(itemId);
    const name = text(b.name, 'Tên');
    return this.db.$transaction(async tx => {
      if (type === 'units') {
        const data = { name, symbol: text(b.symbol, 'Ký hiệu', 20) };
        return itemId ? tx.unit.update({ where: { id: itemId }, data }) : tx.unit.create({ data });
      }
      if (type === 'categories') {
        const objectType = text(b.objectType, 'Loại đối tượng');
        if (!['MATERIAL', 'PRODUCT'].includes(objectType)) throw new BadRequestException('Loại đối tượng không hợp lệ');
        if (itemId) {
          const current = await tx.category.findUniqueOrThrow({ where: { id: itemId }, include: { _count: { select: { materials: true, products: true } } } });
          if (current.objectType !== objectType && current._count.materials + current._count.products > 0)
            throw new ConflictException('Phân loại đang được sử dụng, không thể đổi loại đối tượng');
        }
        return itemId ? tx.category.update({ where: { id: itemId }, data: { name, objectType } }) : tx.category.create({ data: { name, objectType } });
      }
      const code = text(b.code, 'Mã', 50);
      const status = b.status ?? 'ACTIVE';
      if (status !== 'ACTIVE' && status !== 'INACTIVE') throw new BadRequestException('Trạng thái không hợp lệ');
      if (type === 'suppliers') {
        const data = { code, name, status, phone: b.phone ? text(b.phone, 'Điện thoại', 20) : null, address: b.address ? text(b.address, 'Địa chỉ', 500) : null };
        return itemId ? tx.supplier.update({ where: { id: itemId }, data }) : tx.supplier.create({ data });
      }
      const unitId = uuid(b.unitId), categoryId = uuid(b.categoryId);
      await tx.unit.findUniqueOrThrow({ where: { id: unitId } });
      const category = await tx.category.findUniqueOrThrow({ where: { id: categoryId } });
      if (category.objectType !== (type === 'materials' ? 'MATERIAL' : 'PRODUCT')) throw new BadRequestException('Phân loại không phù hợp với danh mục này');
      if (type === 'materials') {
        if (itemId) {
          const current = await tx.material.findUniqueOrThrow({ where: { id: itemId }, include: { _count: { select: { lots: true, bomLines: true } } } });
          if (current.unitId !== unitId && current._count.lots + current._count.bomLines > 0) throw new ConflictException('NVL đã có lô hoặc BOM, không được đổi đơn vị cơ sở');
        }
        const data = { code, name, status, unitId, categoryId, minStock: decimal(b.minStock ?? '0', 'Tồn tối thiểu', 3) };
        return itemId ? tx.material.update({ where: { id: itemId }, data }) : tx.material.create({ data });
      }
      if (itemId) {
        const current = await tx.product.findUniqueOrThrow({ where: { id: itemId }, include: { _count: { select: { boms: true, saleLines: true, movements: true, wasteLines: true } } } });
        if (current.unitId !== unitId && Object.values(current._count).some(count => count > 0)) throw new ConflictException('Thành phẩm đã phát sinh nghiệp vụ, không được đổi đơn vị cơ sở');
      }
      const data = { code, name, status, unitId, categoryId, sellingPrice: decimal(b.sellingPrice, 'Giá bán', 2) };
      return itemId ? tx.product.update({ where: { id: itemId }, data }) : tx.product.create({ data });
    });
  }
  async remove(type: CatalogKind, itemId: string) {
    const where = { id: uuid(itemId) };
    switch (type) {
      case 'units': await this.db.unit.delete({ where }); break;
      case 'categories': await this.db.category.delete({ where }); break;
      case 'materials': await this.db.material.delete({ where }); break;
      case 'suppliers': await this.db.supplier.delete({ where }); break;
      case 'products': await this.db.product.delete({ where }); break;
    }
    return { message: 'Đã xóa bản ghi' };
  }
}

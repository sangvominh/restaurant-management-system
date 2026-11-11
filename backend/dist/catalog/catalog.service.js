var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { randomBytes } from 'node:crypto';
export function kind(value) {
    if (!['units', 'categories', 'materials', 'suppliers', 'products'].includes(value))
        throw new BadRequestException('Danh mục không hợp lệ');
    return value;
}
function text(value, label, max = 200) {
    if (typeof value !== 'string' || !value.trim() || value.trim().length > max)
        throw new BadRequestException(`${label} không hợp lệ`);
    return value.trim();
}
function uuid(value) {
    const result = text(value, 'ID', 36);
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(result))
        throw new BadRequestException('ID không hợp lệ');
    return result;
}
let CatalogService = class CatalogService {
    db;
    constructor(db) {
        this.db = db;
    }
    async presentation(type) {
        const rows = await this.list(type);
        return Promise.all(rows.map(async (row) => {
            const where = { id: row.id };
            const record = type === 'units' ? await this.db.unit.findUniqueOrThrow({ where, include: { _count: true } }) : type === 'categories' ? await this.db.category.findUniqueOrThrow({ where, include: { _count: true } }) : type === 'materials' ? await this.db.material.findUniqueOrThrow({ where, include: { _count: true } }) : type === 'suppliers' ? await this.db.supplier.findUniqueOrThrow({ where, include: { _count: true } }) : await this.db.product.findUniqueOrThrow({ where, include: { _count: true } });
            const canDelete = Object.values(record._count).every(n => n === 0);
            return { ...row, canDelete, canEdit: type !== 'units' || canDelete };
        }));
    }
    async list(type) {
        switch (type) {
            case 'units': return this.db.unit.findMany({ orderBy: { name: 'asc' } });
            case 'categories': return this.db.category.findMany({ orderBy: [{ objectType: 'asc' }, { name: 'asc' }] });
            case 'materials': return this.db.material.findMany({ include: { unit: true, category: true }, orderBy: { code: 'asc' } });
            case 'suppliers': return this.db.supplier.findMany({ orderBy: { code: 'asc' } });
            case 'products': {
                const products = await this.db.product.findMany({ include: { unit: true, category: true, boms: { where: { status: 'ACTIVE', effectiveAt: { lte: new Date() } }, orderBy: [{ effectiveAt: 'desc' }, { version: 'desc' }], take: 1, include: { lines: { include: { material: { include: { unit: true } } } } } } }, orderBy: { code: 'asc' } });
                return products.map(({ boms, ...p }) => ({ ...p, currentBom: boms[0] || null }));
            }
        }
    }
    async save(type, input, itemId) {
        if (!input || typeof input !== 'object' || Array.isArray(input))
            throw new BadRequestException('Dữ liệu không hợp lệ');
        const b = input;
        if (itemId)
            uuid(itemId);
        const name = text(b.name, 'Tên');
        return this.db.$transaction(async (tx) => {
            if (type === 'products')
                await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            if (type === 'units') {
                const data = { name, symbol: text(b.symbol, 'Ký hiệu', 20) };
                if (itemId) {
                    const current = await tx.unit.findUniqueOrThrow({ where: { id: itemId }, include: { _count: { select: { materials: true, products: true } } } });
                    if ((current.name !== data.name || current.symbol !== data.symbol) && current._count.materials + current._count.products > 0)
                        throw new ConflictException('Đơn vị đã được sử dụng, không được đổi tên hoặc ký hiệu');
                }
                return itemId ? tx.unit.update({ where: { id: itemId }, data }) : tx.unit.create({ data });
            }
            if (type === 'categories') {
                const objectType = text(b.objectType, 'Loại đối tượng');
                if (!['MATERIAL', 'PRODUCT'].includes(objectType))
                    throw new BadRequestException('Loại đối tượng không hợp lệ');
                if (itemId) {
                    const current = await tx.category.findUniqueOrThrow({ where: { id: itemId }, include: { _count: { select: { materials: true, products: true } } } });
                    if (current.objectType !== objectType && current._count.materials + current._count.products > 0)
                        throw new ConflictException('Phân loại đang được sử dụng, không thể đổi loại đối tượng');
                }
                return itemId ? tx.category.update({ where: { id: itemId }, data: { name, objectType } }) : tx.category.create({ data: { name, objectType } });
            }
            let code;
            if (!itemId && ['materials', 'suppliers', 'products'].includes(type)) {
                do {
                    code = `${type === 'materials' ? 'NVL' : type === 'suppliers' ? 'NCC' : 'TP'}-${randomBytes(6).toString('hex').toUpperCase()}`;
                } while (type === 'materials' ? await tx.material.findUnique({ where: { code } }) : type === 'suppliers' ? await tx.supplier.findUnique({ where: { code } }) : await tx.product.findUnique({ where: { code } }));
            }
            else
                code = text(b.code, 'Mã', 50);
            const status = b.status ?? 'ACTIVE';
            if (status !== 'ACTIVE' && status !== 'INACTIVE')
                throw new BadRequestException('Trạng thái không hợp lệ');
            if (type === 'suppliers') {
                if (itemId) {
                    const old = await tx.supplier.findUniqueOrThrow({ where: { id: itemId } });
                    if (old.code !== code || old.name !== name)
                        throw new ConflictException('Mã và tên nhà cung cấp không thay đổi sau khi tạo');
                }
                const data = { code, name, status, phone: b.phone ? text(b.phone, 'Điện thoại', 20) : null, address: b.address ? text(b.address, 'Địa chỉ', 500) : null };
                return itemId ? tx.supplier.update({ where: { id: itemId }, data }) : tx.supplier.create({ data });
            }
            const unitId = uuid(b.unitId), categoryId = uuid(b.categoryId);
            await tx.unit.findUniqueOrThrow({ where: { id: unitId } });
            const category = await tx.category.findUniqueOrThrow({ where: { id: categoryId } });
            if (category.objectType !== (type === 'materials' ? 'MATERIAL' : 'PRODUCT'))
                throw new BadRequestException('Phân loại không phù hợp với danh mục này');
            if (type === 'materials') {
                if (b.minStock !== undefined)
                    throw new BadRequestException('Điều chỉnh tồn tối thiểu tại màn hình Tồn nguyên liệu');
                if (itemId) {
                    const current = await tx.material.findUniqueOrThrow({ where: { id: itemId } });
                    if (current.code !== code || current.name !== name || current.unitId !== unitId)
                        throw new ConflictException('Mã, tên và đơn vị NVL không được thay đổi sau khi tạo. Hãy tạo nguyên liệu mới');
                    return tx.material.update({ where: { id: itemId }, data: { status, categoryId } });
                }
                return tx.material.create({ data: { code, name, status, unitId, categoryId } });
            }
            if (b.supplyType !== undefined && b.supplyType !== 'PRODUCED' && b.supplyType !== 'PURCHASED')
                throw new BadRequestException('Nguồn thành phẩm không hợp lệ');
            if (b.sellingPrice !== undefined)
                throw new BadRequestException('Giá bán chỉ được chỉnh tại Thiết lập bán hàng của web nhà hàng');
            if (itemId) {
                const current = await tx.product.findUniqueOrThrow({ where: { id: itemId } });
                if (current.code !== code || current.name !== name || current.unitId !== unitId || b.supplyType !== undefined && b.supplyType !== current.supplyType)
                    throw new ConflictException('Mã, tên, đơn vị và nguồn thành phẩm không thay đổi sau khi tạo. Tạo mặt hàng mới khi đổi nguồn');
                if (status === 'INACTIVE' && current.status === 'ACTIVE') {
                    const [orders, sales] = await Promise.all([
                        tx.productionOrder.count({ where: { bom: { productId: itemId }, status: { in: ['NEW', 'RECEIVED', 'IN_PROGRESS'] } } }),
                        tx.saleLine.count({ where: { productId: itemId, sale: { status: 'CONFIRMED' } } }),
                    ]);
                    if (orders || sales)
                        throw new ConflictException('Thành phẩm còn lệnh chế biến hoặc đơn bán đang xử lý. Hoàn tất/hủy nghiệp vụ trước khi ngừng sử dụng');
                }
                return tx.product.update({ where: { id: itemId }, data: { status, categoryId } });
            }
            const data = { code, name, status, unitId, categoryId, supplyType: b.supplyType === 'PURCHASED' ? 'PURCHASED' : 'PRODUCED', sellingPrice: new Prisma.Decimal(0) };
            return tx.product.create({ data });
        });
    }
    async remove(type, itemId) {
        const where = { id: uuid(itemId) };
        switch (type) {
            case 'units':
                await this.db.unit.delete({ where });
                break;
            case 'categories':
                await this.db.category.delete({ where });
                break;
            case 'materials':
                await this.db.material.delete({ where });
                break;
            case 'suppliers':
                await this.db.supplier.delete({ where });
                break;
            case 'products':
                await this.db.product.delete({ where });
                break;
        }
        return { message: 'Đã xóa bản ghi' };
    }
};
CatalogService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CatalogService);
export { CatalogService };
//# sourceMappingURL=catalog.service.js.map
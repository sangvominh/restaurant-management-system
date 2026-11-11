var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
const bomInclude = { product: { include: { unit: true } }, createdBy: true, lines: { include: { material: { include: { unit: true } } } } };
const orderInclude = { bom: { include: bomInclude }, assignedBy: true, assignedTo: true, replenishments: { include: { saleLine: { include: { sale: { include: { table: true } } } } } } };
function body(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw new BadRequestException('Dữ liệu không hợp lệ');
    return value;
}
function uuid(value) {
    if (typeof value !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value))
        throw new BadRequestException('ID không hợp lệ');
    return value;
}
function quantity(value) {
    if ((typeof value !== 'string' && typeof value !== 'number') || !/^\d{1,15}(\.\d{1,3})?$/.test(String(value)))
        throw new BadRequestException('Số lượng không hợp lệ (tối đa 3 số lẻ)');
    const result = new Prisma.Decimal(value);
    if (result.lte(0))
        throw new BadRequestException('Số lượng phải lớn hơn 0');
    return result;
}
function date(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d(?::\d\d(?:\.\d{3})?)?Z$/.test(value) || !Number.isFinite(Date.parse(value)))
        throw new BadRequestException('Ngày giờ không hợp lệ');
    return new Date(value);
}
const manager = (user) => user.permissions.some(p => ['*', 'production:manage'].includes(p));
let ProductionService = class ProductionService {
    db;
    constructor(db) {
        this.db = db;
    }
    async references() {
        const [products, materials, employees] = await Promise.all([
            this.db.product.findMany({ where: { status: 'ACTIVE', supplyType: 'PRODUCED' }, include: { unit: true }, orderBy: { code: 'asc' } }),
            this.db.material.findMany({ where: { status: 'ACTIVE' }, include: { unit: true }, orderBy: { code: 'asc' } }),
            this.db.employee.findMany({ where: { status: 'ACTIVE', account: { status: 'ACTIVE', role: { permissions: { some: { permission: { code: { in: ['*', 'production:perform'] } } } } } } }, select: { id: true, name: true, code: true }, orderBy: { name: 'asc' } }),
        ]);
        return { products, materials, employees };
    }
    boms() { return this.db.bom.findMany({ include: bomInclude, orderBy: [{ productId: 'asc' }, { version: 'desc' }] }); }
    async saveBom(input, user, existingId) {
        const b = body(input), productId = uuid(b.productId), outputQuantity = new Prisma.Decimal(1), effectiveAt = date(b.effectiveAt);
        if (b.outputQuantity !== undefined && !quantity(b.outputQuantity).eq(1))
            throw new BadRequestException('Công thức phải khai báo cho 1 đơn vị thành phẩm');
        if (!Array.isArray(b.lines) || b.lines.length < 1 || b.lines.length > 100)
            throw new BadRequestException('Cần 1–100 nguyên liệu');
        const lines = b.lines.map(item => { const l = body(item); return { materialId: uuid(l.materialId), quantity: quantity(l.quantity) }; });
        if (new Set(lines.map(l => l.materialId)).size !== lines.length)
            throw new BadRequestException('Nguyên liệu bị trùng');
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            const current = existingId ? await tx.bom.findUniqueOrThrow({ where: { id: uuid(existingId) } }) : null;
            if (current) {
                if (current.status !== 'DRAFT')
                    throw new ConflictException('Chỉ sửa BOM nháp; BOM đã áp dụng cần tạo phiên bản mới');
                if (current.productId !== productId)
                    throw new BadRequestException('Không đổi thành phẩm của công thức đã lưu; hãy tạo công thức mới');
            }
            const highest = current ? null : await tx.bom.aggregate({ where: { productId }, _max: { version: true } });
            const version = current?.version ?? (highest?._max.version ?? 0) + 1;
            if (version > 2147483647)
                throw new ConflictException('Đã đạt giới hạn phiên bản công thức');
            const product = await tx.product.findUniqueOrThrow({ where: { id: productId } });
            if (product.supplyType !== 'PRODUCED')
                throw new BadRequestException('Thành phẩm nhập trực tiếp không lập công thức/lệnh chế biến');
            if (product.status !== 'ACTIVE' || await tx.material.count({ where: { id: { in: lines.map(l => l.materialId) }, status: 'ACTIVE' } }) !== lines.length)
                throw new BadRequestException('Thành phẩm và nguyên liệu phải đang hoạt động');
            const data = { productId, version, outputQuantity, effectiveAt, lines: { create: lines } };
            if (existingId) {
                await tx.bomLine.deleteMany({ where: { bomId: existingId } });
                return tx.bom.update({ where: { id: existingId }, data, include: bomInclude });
            }
            return tx.bom.create({ data: { ...data, createdById: employee.id }, include: bomInclude });
        });
    }
    async bomAction(id, action) {
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const bom = await tx.bom.findUniqueOrThrow({ where: { id: uuid(id) }, include: bomInclude });
            if (bom.status !== 'DRAFT')
                throw new ConflictException('Chỉ thực hiện trên BOM nháp');
            if (action === 'delete') {
                await tx.bomLine.deleteMany({ where: { bomId: id } });
                return tx.bom.delete({ where: { id } });
            }
            if (bom.product.supplyType !== 'PRODUCED')
                throw new BadRequestException('Thành phẩm nhập trực tiếp không áp dụng công thức chế biến');
            if (!bom.lines.length || bom.product.status !== 'ACTIVE' || bom.lines.some(l => l.material.status !== 'ACTIVE'))
                throw new BadRequestException('BOM cần nguyên liệu và thành phẩm đang hoạt động');
            if (!bom.outputQuantity.eq(1))
                throw new BadRequestException('BOM nháp cũ cần sửa định mức về 1 đơn vị thành phẩm trước khi áp dụng');
            return tx.bom.update({ where: { id }, data: { status: 'ACTIVE' } });
        });
    }
    orders(user) {
        return this.db.productionOrder.findMany({ where: manager(user) || user.permissions.some(p => ['material:view', 'material:approve', 'production:inspect', 'waste:approve'].includes(p)) ? {} : { assignedTo: { accountId: user.id } }, include: orderInclude, orderBy: { assignedAt: 'desc' } });
    }
    async createOrder(input, user) {
        const b = body(input), productId = uuid(b.productId), assignedToId = uuid(b.assignedToId), amount = quantity(b.quantity), dueAt = b.dueAt ? date(b.dueAt) : null;
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            const bom = await tx.bom.findFirst({ where: { productId, status: 'ACTIVE', effectiveAt: { lte: new Date() } }, orderBy: [{ effectiveAt: 'desc' }, { version: 'desc' }], include: bomInclude });
            if (bom?.product.supplyType === 'PURCHASED')
                throw new BadRequestException('Thành phẩm nhập trực tiếp dùng phiếu nhập TP, không lập lệnh chế biến');
            if (!bom)
                throw new BadRequestException('Thành phẩm chưa có công thức được áp dụng và đến ngày hiệu lực');
            if (!bom.outputQuantity.eq(1))
                throw new BadRequestException('Công thức cũ có định mức khác 1 đơn vị; tạo phiên bản mới cho 1 đơn vị trước khi giao lệnh');
            if (b.expectedBomId !== undefined && uuid(b.expectedBomId) !== bom.id)
                throw new ConflictException('Công thức đang áp dụng đã thay đổi. Hãy tải lại trước khi giao lệnh');
            if (bom.status !== 'ACTIVE' || bom.effectiveAt > new Date() || bom.product.status !== 'ACTIVE' || !bom.lines.length || bom.lines.some(l => l.material.status !== 'ACTIVE'))
                throw new BadRequestException('BOM chưa có hiệu lực hoặc có thành phẩm/nguyên liệu ngừng hoạt động');
            if (dueAt && dueAt <= new Date())
                throw new BadRequestException('Hạn hoàn thành phải ở tương lai');
            const assignee = await tx.employee.findFirst({ where: { id: assignedToId, status: 'ACTIVE', account: { status: 'ACTIVE', role: { permissions: { some: { permission: { code: { in: ['*', 'production:perform'] } } } } } } } });
            if (!assignee)
                throw new BadRequestException('Người nhận cần tài khoản hoạt động và quyền thực hiện sản xuất');
            if (b.replenishmentId)
                throw new BadRequestException('Lập lệnh theo kế hoạch, không chế biến theo đơn khách');
            const order = await tx.productionOrder.create({ data: { bomId: bom.id, quantity: amount, assignedById: employee.id, assignedToId, dueAt }, include: orderInclude });
            return order;
        });
    }
    async orderAction(id, action, user) {
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const order = await tx.productionOrder.findUniqueOrThrow({ where: { id: uuid(id) }, include: { assignedTo: true } });
            if (action === 'receive') {
                if (order.assignedTo.accountId !== user.id)
                    throw new ForbiddenException('Chỉ người được giao mới được nhận lệnh');
                if (order.status !== 'NEW')
                    throw new ConflictException('Lệnh đã được nhận hoặc đã hủy');
                return tx.productionOrder.update({ where: { id }, data: { status: 'RECEIVED' } });
            }
            if (order.status !== 'NEW')
                throw new ConflictException('Chỉ hủy lệnh chưa được nhận');
            if (await tx.materialIssue.count({ where: { productionOrderId: id } }) || await tx.productionRun.count({ where: { productionOrderId: id } }))
                throw new ConflictException('Lệnh đã có phát sinh');
            return tx.productionOrder.update({ where: { id }, data: { status: 'CANCELLED' } });
        });
    }
};
ProductionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ProductionService);
export { ProductionService };
//# sourceMappingURL=production.service.js.map
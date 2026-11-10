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
import { productAvailability } from './product-availability.js';
const inc = { requestedBy: { select: { name: true } }, reviewedBy: { select: { name: true } }, lines: { include: { product: { include: { unit: true } } } } };
function body(v) { if (!v || typeof v !== 'object' || Array.isArray(v))
    throw new BadRequestException('Dữ liệu không hợp lệ'); return v; }
function id(v) { if (typeof v !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v))
    throw new BadRequestException('ID không hợp lệ'); return v; }
function qty(v) { if (!/^\d{1,15}(\.\d{1,3})?$/.test(String(v)))
    throw new BadRequestException('Số lượng không hợp lệ'); const q = new Prisma.Decimal(String(v)); if (q.lte(0))
    throw new BadRequestException('Số lượng phải dương'); return q; }
function reason(v) { if (typeof v !== 'string' || !v.trim() || v.length > 1000)
    throw new BadRequestException('Cần lý do, tối đa 1000 ký tự'); return v.trim(); }
const incoming = (kind) => ['NHAP_SAN_XUAT', 'HOAN_CUA_HANG'].includes(kind);
async function person(tx, u) { const p = await tx.employee.findUnique({ where: { accountId: u.id } }); if (!p || p.status !== 'ACTIVE')
    throw new ForbiddenException('Cần liên kết hồ sơ đang hoạt động'); return p; }
async function warehouse(tx, productId) { const moves = await tx.productMovement.findMany({ where: { productId } }); return moves.reduce((s, m) => incoming(m.movementType) ? s.plus(m.quantity) : s.minus(m.quantity), new Prisma.Decimal(0)); }
let StoreService = class StoreService {
    db;
    constructor(db) {
        this.db = db;
    }
    list() { return this.db.storeDispatch.findMany({ include: inc, orderBy: { requestedAt: 'desc' } }); }
    stock() {
        return this.db.$transaction(async (tx) => {
            const products = await tx.product.findMany({ include: { unit: true }, orderBy: { name: 'asc' } });
            return Promise.all(products.map(async (p) => { const stock = await warehouse(tx, p.id); const pending = await tx.storeDispatchLine.aggregate({ where: { productId: p.id, dispatch: { status: 'PENDING' } }, _sum: { quantity: true } }); return { ...p, warehouse: stock, warehouseAvailable: Prisma.Decimal.max(0, stock.minus(pending._sum.quantity || 0)), ...await productAvailability(tx, p.id) }; }));
        }, { isolationLevel: 'RepeatableRead', timeout: 15000 });
    }
    async create(input, user) {
        const b = body(input), why = reason(b.reason);
        if (!Array.isArray(b.lines) || !b.lines.length || b.lines.length > 100)
            throw new BadRequestException('Cần 1–100 dòng thành phẩm');
        const lines = b.lines.map(v => { const l = body(v); return { productId: id(l.productId), quantity: qty(l.quantity) }; });
        if (new Set(lines.map(l => l.productId)).size !== lines.length)
            throw new BadRequestException('Trùng thành phẩm');
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const p = await person(tx, user);
            for (const l of lines) {
                const product = await tx.product.findUniqueOrThrow({ where: { id: l.productId } });
                const held = await tx.storeDispatchLine.aggregate({ where: { productId: l.productId, dispatch: { status: 'PENDING' } }, _sum: { quantity: true } });
                if (product.status !== 'ACTIVE' || (await warehouse(tx, l.productId)).minus(held._sum.quantity || 0).lt(l.quantity))
                    throw new ConflictException('Kho không đủ lượng chưa giữ cho phiếu khác: ' + product.name);
            }
            return tx.storeDispatch.create({ data: { reason: why, requestedById: p.id, lines: { create: lines } }, include: inc });
        });
    }
    review(key, approve, user) {
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const p = await person(tx, user);
            const doc = await tx.storeDispatch.findUniqueOrThrow({ where: { id: id(key) }, include: inc });
            if (doc.status !== 'PENDING')
                throw new ConflictException('Phiếu đã xử lý');
            if (approve)
                for (const l of doc.lines) {
                    if (l.product.status !== 'ACTIVE' || (await warehouse(tx, l.productId)).lt(l.quantity))
                        throw new ConflictException('Thiếu tồn hoặc TP ngừng dùng: ' + l.product.name);
                    await tx.productMovement.create({ data: { productId: l.productId, quantity: l.quantity, movementType: 'CHUYEN_CUA_HANG', dispatchLineId: l.id } });
                    await tx.storeMovement.create({ data: { productId: l.productId, quantity: l.quantity, movementType: 'IN_TRANSFER', dispatchLineId: l.id } });
                }
            return tx.storeDispatch.update({ where: { id: doc.id }, data: { status: approve ? 'APPROVED' : 'REJECTED', approvedAt: new Date(), reviewedById: p.id }, include: inc });
        });
    }
    adjustments() { return this.db.storeAdjustment.findMany({ include: { product: { include: { unit: true } }, requestedBy: { select: { name: true } }, reviewedBy: { select: { name: true } } }, orderBy: { requestedAt: 'desc' } }); }
    async adjust(input, user) {
        const b = body(input), productId = id(b.productId), quantity = qty(b.quantity), why = reason(b.reason);
        if (!['RETURN', 'WASTE'].includes(String(b.kind)))
            throw new BadRequestException('Chọn hoàn hoặc hao hụt');
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const p = await person(tx, user);
            if ((await productAvailability(tx, productId)).available.lt(quantity))
                throw new ConflictException('Vượt lượng cửa hàng chưa dành cho đơn hoặc phiếu khác');
            return tx.storeAdjustment.create({ data: { productId, quantity, reason: why, kind: String(b.kind), requestedById: p.id } });
        });
    }
    reviewAdjustment(key, approve, user) {
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const p = await person(tx, user);
            const a = await tx.storeAdjustment.findUniqueOrThrow({ where: { id: id(key) } });
            if (a.status !== 'PENDING')
                throw new ConflictException('Phiếu đã xử lý');
            if (approve) {
                if ((await productAvailability(tx, a.productId)).stock.lt(a.quantity))
                    throw new ConflictException('Không đủ tồn cửa hàng');
                await tx.storeMovement.create({ data: { productId: a.productId, quantity: a.quantity, movementType: a.kind, adjustmentId: a.id } });
                if (a.kind === 'RETURN')
                    await tx.productMovement.create({ data: { productId: a.productId, quantity: a.quantity, movementType: 'HOAN_CUA_HANG', storeAdjustmentId: a.id } });
            }
            return tx.storeAdjustment.update({ where: { id: a.id }, data: { status: approve ? 'APPROVED' : 'REJECTED', approvedAt: new Date(), reviewedById: p.id } });
        });
    }
};
StoreService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], StoreService);
export { StoreService };
//# sourceMappingURL=store.service.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { lotStocks, takeLots, productIncoming } from './product-lots.js';
import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { productAvailability } from './product-availability.js';
const inc = { requestedBy: { select: { name: true } }, reviewedBy: { select: { name: true } }, lines: { include: { lotAllocations: { include: { lot: true } }, product: { include: { unit: true } } } } };
function body(v) { if (!v || typeof v !== 'object' || Array.isArray(v))
    throw new BadRequestException('Dữ liệu không hợp lệ'); return v; }
function id(v) { if (typeof v !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v))
    throw new BadRequestException('ID không hợp lệ'); return v; }
function qty(v) { if (!/^\d{1,15}(\.\d{1,3})?$/.test(String(v)))
    throw new BadRequestException('Số lượng không hợp lệ'); const q = new Prisma.Decimal(String(v)); if (q.lte(0))
    throw new BadRequestException('Số lượng phải dương'); return q; }
function reason(v) { if (typeof v !== 'string' || !v.trim() || v.length > 1000)
    throw new BadRequestException('Cần lý do, tối đa 1000 ký tự'); return v.trim(); }
const incoming = productIncoming;
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
            return Promise.all(products.map(async (p) => {
                const warehouseStock = await warehouse(tx, p.id), availability = await productAvailability(tx, p.id), lots = availability.lots;
                return { ...p, warehouse: warehouseStock, warehouseAvailable: Prisma.Decimal.sum(0, ...lots.map(l => l.warehouseAvailable)), warehouseExpired: Prisma.Decimal.sum(0, ...lots.filter(l => l.expired).map(l => l.warehouse)), warehouseUntracked: warehouseStock.minus(Prisma.Decimal.sum(0, ...lots.map(l => l.warehouse))), ...availability };
            }));
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
            const allocated = [];
            for (const l of lines) {
                const product = await tx.product.findUniqueOrThrow({ where: { id: l.productId } });
                if (product.status !== 'ACTIVE')
                    throw new ConflictException('TP đã ngừng dùng: ' + product.name);
                const lots = await lotStocks(tx, product.id);
                allocated.push({ ...l, lotAllocations: { create: takeLots(lots, l.quantity, lot => lot.warehouseAvailable) } });
            }
            return tx.storeDispatch.create({ data: { reason: why, requestedById: p.id, lines: { create: allocated } }, include: inc });
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
                    if (l.product.status !== 'ACTIVE' || !l.lotAllocations.length || !Prisma.Decimal.sum(0, ...l.lotAllocations.map(a => a.quantity)).eq(l.quantity))
                        throw new ConflictException('Phiếu cũ chưa gán lô hoặc TP đã ngừng dùng; từ chối và lập lại');
                    const lots = await lotStocks(tx, l.productId);
                    for (const a of l.lotAllocations) {
                        const lot = lots.find(lot => lot.id === a.lotId);
                        if (!lot || lot.expired || lot.warehouse.lt(a.quantity))
                            throw new ConflictException('Lô hết hạn hoặc không đủ hàng: ' + a.lot.code + '. Từ chối và lập lại phiếu');
                        await tx.productLotMovement.createMany({ data: [
                                { lotId: a.lotId, location: 'WAREHOUSE', quantity: a.quantity.negated(), dispatchLineId: l.id },
                                { lotId: a.lotId, location: 'STORE', quantity: a.quantity, dispatchLineId: l.id },
                            ] });
                    }
                    await tx.productMovement.create({ data: { productId: l.productId, quantity: l.quantity, movementType: 'CHUYEN_CUA_HANG', dispatchLineId: l.id } });
                    await tx.storeMovement.create({ data: { productId: l.productId, quantity: l.quantity, movementType: 'IN_TRANSFER', dispatchLineId: l.id } });
                }
            return tx.storeDispatch.update({ where: { id: doc.id }, data: { status: approve ? 'APPROVED' : 'REJECTED', approvedAt: new Date(), reviewedById: p.id }, include: inc });
        });
    }
    adjustments() { return this.db.storeAdjustment.findMany({ include: { lot: true, product: { include: { unit: true } }, requestedBy: { select: { name: true } }, reviewedBy: { select: { name: true } } }, orderBy: { requestedAt: 'desc' } }); }
    async adjust(input, user) {
        const b = body(input), productId = id(b.productId), lotId = id(b.lotId), quantity = qty(b.quantity), why = reason(b.reason);
        if (!['RETURN', 'WASTE'].includes(String(b.kind)))
            throw new BadRequestException('Chọn hoàn hoặc hao hụt');
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const p = await person(tx, user);
            const availability = await productAvailability(tx, productId), lot = availability.lots.find(l => l.id === lotId);
            if (!lot || (b.kind === 'RETURN' && lot.expired) || (lot.expired ? lot.store.minus(lot.storeHeld) : lot.available).lt(quantity))
                throw new ConflictException('Lô không đủ lượng chưa giữ cho đơn/phiếu khác. Lô hết hạn chỉ được hủy');
            return tx.storeAdjustment.create({ data: { productId, lotId, quantity, reason: why, kind: String(b.kind), requestedById: p.id } });
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
                if (!a.lotId)
                    throw new ConflictException('Phiếu cũ chưa gán lô; từ chối và lập lại');
                const lot = (await lotStocks(tx, a.productId)).find(l => l.id === a.lotId);
                if (!lot || lot.store.lt(a.quantity) || a.kind === 'RETURN' && lot.expired)
                    throw new ConflictException('Không đủ tồn lô hoặc lô hết hạn không được hoàn kho');
                await tx.storeMovement.create({ data: { productId: a.productId, quantity: a.quantity, movementType: a.kind, adjustmentId: a.id } });
                await tx.productLotMovement.create({ data: { lotId: a.lotId, location: 'STORE', quantity: a.quantity.negated(), adjustmentId: a.id } });
                if (a.kind === 'RETURN') {
                    await tx.productMovement.create({ data: { productId: a.productId, quantity: a.quantity, movementType: 'HOAN_CUA_HANG', storeAdjustmentId: a.id } });
                    await tx.productLotMovement.create({ data: { lotId: a.lotId, location: 'WAREHOUSE', quantity: a.quantity, adjustmentId: a.id } });
                }
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
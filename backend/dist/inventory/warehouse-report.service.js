var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { vietnamDay, daysRemaining } from './expiry.js';
const D = (v = 0) => new Prisma.Decimal(v);
const sum = (v) => v.reduce((s, q) => s.plus(q), D());
const positive = (v) => Prisma.Decimal.max(0, v);
const percent = (a, b) => b.isZero() ? null : a.div(b).mul(100).toDecimalPlaces(2);
function day(v) { const d = new Date(v + 'T00:00:00+07:00'); if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || !Number.isFinite(d.getTime()) || new Date(d.getTime() + 25200000).toISOString().slice(0, 10) !== v)
    throw new BadRequestException('Ngày báo cáo không hợp lệ'); return d; }
let WarehouseReportService = class WarehouseReportService {
    db;
    constructor(db) {
        this.db = db;
    }
    async read(start, end, horizonText) {
        const from = day(start || ''), until = new Date(day(end || '').getTime() + 86400000), now = new Date();
        const periodDays = Math.round((until.getTime() - from.getTime()) / 86400000);
        if (periodDays < 1 || periodDays > 1096)
            throw new BadRequestException('Chọn kỳ từ 1 đến 1096 ngày');
        const horizon = Number(horizonText || 7);
        if (![7, 14, 30].includes(horizon))
            throw new BadRequestException('Chọn kế hoạch 7, 14 hoặc 30 ngày');
        const previousFrom = new Date(from.getTime() - periodDays * 86400000);
        const observedDays = from > now ? 0 : Math.min(periodDays, Math.round((day(vietnamDay(now)).getTime() - from.getTime()) / 86400000) + 1);
        const previousUntil = new Date(previousFrom.getTime() + (observedDays || periodDays) * 86400000);
        const inPeriod = (d) => d >= from && d < until && d <= now;
        const today = vietnamDay(now);
        return this.db.$transaction(async (tx) => {
            const [materials, products, materialMoves, productMoves, runs, activeOrders, saleLines, receipts, wasteLines, shortageCount] = await Promise.all([
                tx.material.findMany({ include: { unit: true, category: true }, orderBy: { code: 'asc' } }),
                tx.product.findMany({ include: { unit: true, category: true, boms: { where: { status: 'ACTIVE', effectiveAt: { lte: now } }, orderBy: [{ effectiveAt: 'desc' }, { version: 'desc' }], take: 1, include: { lines: true } } }, orderBy: { code: 'asc' } }),
                tx.materialMovement.findMany({ where: { postedAt: { lte: now } }, include: { lot: true } }),
                tx.productMovement.findMany({ where: { postedAt: { lte: now } } }),
                tx.productionRun.findMany({ where: { recordedAt: { gte: from, lt: until, lte: now } }, include: { productionOrder: { include: { bom: { include: { lines: true, product: { include: { unit: true } } } } } }, consumptions: { include: { issueLine: { include: { lot: true } } } } } }),
                tx.productionOrder.findMany({ where: { status: { in: ['NEW', 'RECEIVED', 'IN_PROGRESS'] } }, include: { bom: { include: { lines: true } }, runs: true, materialIssues: { where: { status: 'APPROVED' }, include: { lines: { include: { lot: true, consumptions: true, returnLines: { include: { return: true } }, wasteLines: { include: { waste: true } } } } } } } }),
                tx.saleLine.findMany({ where: { sentAt: { not: null }, sale: { status: 'CONFIRMED' } }, include: { exportLines: { include: { export: true } } } }),
                tx.materialReceipt.findMany({ where: { status: 'POSTED', receivedAt: { gte: from, lt: until, lte: now } }, include: { lines: true, supplier: true } }),
                tx.wasteLine.findMany({ where: { waste: { status: 'APPROVED', approvedAt: { gte: from, lt: until, lte: now } } }, include: { waste: { include: { reviewedBy: { select: { name: true } } } }, lot: true, issueLine: { include: { lot: true } }, product: true } }),
                tx.materialShortage.count({ where: { status: { in: ['PENDING', 'PROCESSING'] } } }),
            ]);
            function inventory(moves) {
                const opening = sum(moves.filter(m => m.date < from).map(m => m.incoming ? m.quantity : m.outgoing ? m.quantity.negated() : D()));
                const current = moves.filter(m => inPeriod(m.date));
                const incoming = sum(current.filter(m => m.incoming).map(m => m.quantity));
                const outgoing = sum(current.filter(m => m.outgoing).map(m => m.quantity));
                const previousOut = sum(moves.filter(m => observedDays > 0 && m.date >= previousFrom && m.date < previousUntil && m.outgoing).map(m => m.quantity));
                const trend = new Map();
                const breakdown = new Map();
                for (const m of current) {
                    if (!m.incoming && !m.outgoing)
                        continue;
                    const date = vietnamDay(m.date), t = trend.get(date) || { date, incoming: D(), outgoing: D() };
                    if (m.incoming)
                        t.incoming = t.incoming.plus(m.quantity);
                    if (m.outgoing)
                        t.outgoing = t.outgoing.plus(m.quantity);
                    trend.set(date, t);
                    breakdown.set(m.label, (breakdown.get(m.label) || D()).plus(m.quantity));
                }
                return { opening, incoming, outgoing, closing: opening.plus(incoming).minus(outgoing), previousOut, outChange: percent(outgoing.minus(previousOut), previousOut), trend: [...trend.values()].sort((a, b) => a.date.localeCompare(b.date)), breakdown: [...breakdown].map(([label, quantity]) => ({ label, quantity })) };
            }
            const productRows = products.map(p => {
                const moves = productMoves.filter(m => m.productId === p.id);
                const stock = sum(moves.map(m => m.movementType === 'NHAP_SAN_XUAT' ? m.quantity : m.quantity.negated()));
                const exported = sum(moves.filter(m => inPeriod(m.postedAt) && m.movementType === 'XUAT_BAN').map(m => m.quantity));
                const demand = sum(saleLines.filter(l => l.productId === p.id).map(l => positive(l.quantity.minus(sum(l.exportLines.filter(e => e.export.status === 'APPROVED').map(e => e.exportedQuantity || 0))))));
                const orders = activeOrders.filter(o => o.bom.productId === p.id);
                const inProduction = sum(orders.map(o => positive(o.quantity.minus(sum(o.runs.map(r => r.actualQuantity))))));
                const awaitingInspection = sum(orders.flatMap(o => o.runs.filter(r => r.status === 'PENDING').map(r => r.actualQuantity)));
                const forecast = observedDays ? exported.div(observedDays).mul(horizon).toDecimalPlaces(3, Prisma.Decimal.ROUND_UP) : D();
                const suggested = p.status === 'ACTIVE' ? positive(Prisma.Decimal.max(demand, forecast).minus(stock).minus(inProduction).minus(awaitingInspection)) : D();
                const ownRuns = runs.filter(r => r.productionOrder.bom.productId === p.id);
                const actual = sum(ownRuns.map(r => r.actualQuantity)), inspectedActual = sum(ownRuns.filter(r => r.status !== 'PENDING').map(r => r.actualQuantity)), accepted = sum(ownRuns.filter(r => r.status !== 'PENDING').map(r => r.acceptedQuantity || 0));
                const hasBom = !!p.boms[0]?.lines.length && p.boms[0].lines.every(l => materials.some(m => m.id === l.materialId && m.status === 'ACTIVE'));
                return { id: p.id, code: p.code, name: p.name, unit: p.unit.symbol, status: p.status, category: p.category.name, ...inventory(moves.map(m => ({ quantity: m.quantity, date: m.postedAt, incoming: m.movementType === 'NHAP_SAN_XUAT', outgoing: m.movementType !== 'NHAP_SAN_XUAT', label: m.movementType === 'NHAP_SAN_XUAT' ? 'Nhập từ nghiệm thu' : m.movementType === 'XUAT_BAN' ? 'Xuất bán' : 'Xuất/hao hụt khác' }))), stock, exported, demand, inProduction, awaitingInspection, forecast, suggested, hasBom, actual, accepted, rejected: inspectedActual.minus(accepted), yieldPercent: percent(accepted, inspectedActual), runCount: ownRuns.length };
            });
            const openNeeds = new Map(), suggestedNeeds = new Map();
            for (const o of activeOrders) {
                const remaining = positive(o.quantity.minus(sum(o.runs.map(r => r.actualQuantity))));
                for (const l of o.bom.lines) {
                    const kitchen = sum(o.materialIssues.flatMap(i => i.lines.filter(x => x.lot.materialId === l.materialId && (!x.lot.expiryDate || x.lot.expiryDate.toISOString().slice(0, 10) >= today)).map(x => positive((x.issuedQuantity || D()).minus(sum(x.consumptions.map(c => c.quantity))).minus(sum(x.returnLines.filter(r => r.return.status !== 'REJECTED').map(r => r.quantity))).minus(sum(x.wasteLines.filter(w => w.waste.status !== 'REJECTED').map(w => w.quantity)))))));
                    openNeeds.set(l.materialId, (openNeeds.get(l.materialId) || D()).plus(positive(l.quantity.mul(remaining).div(o.bom.outputQuantity).minus(kitchen))));
                }
            }
            for (const p of products) {
                const row = productRows.find(r => r.id === p.id);
                if (!row.hasBom)
                    continue;
                for (const l of p.boms[0].lines)
                    suggestedNeeds.set(l.materialId, (suggestedNeeds.get(l.materialId) || D()).plus(l.quantity.mul(row.suggested).div(p.boms[0].outputQuantity)));
            }
            const materialRows = materials.map(m => {
                const moves = materialMoves.filter(x => x.lot.materialId === m.id);
                const ownLots = new Map();
                for (const x of moves) {
                    const l = ownLots.get(x.lotId) || { code: x.lot.code, expiry: x.lot.expiryDate?.toISOString().slice(0, 10) || null, quantity: D() };
                    l.quantity = l.quantity.plus(x.toSource === 'TRONG_KHO' ? x.quantity : 0).minus(x.fromSource === 'TRONG_KHO' ? x.quantity : 0);
                    ownLots.set(x.lotId, l);
                }
                const stock = sum([...ownLots.values()].map(l => l.quantity));
                const usable = m.status === 'ACTIVE' ? sum([...ownLots.values()].filter(l => !l.expiry || l.expiry >= today).map(l => positive(l.quantity))) : D();
                const expired = sum([...ownLots.values()].filter(l => !!l.expiry && l.expiry < today).map(l => positive(l.quantity)));
                const expiring = [...ownLots.values()].filter(l => l.quantity.gt(0) && daysRemaining(l.expiry, today) !== null && daysRemaining(l.expiry, today) >= 0 && daysRemaining(l.expiry, today) <= 7);
                const consumed = sum(moves.filter(x => inPeriod(x.postedAt) && x.toSource === 'DA_SU_DUNG').map(x => x.quantity));
                const need = (openNeeds.get(m.id) || D()).toDecimalPlaces(3, Prisma.Decimal.ROUND_UP), proposed = (suggestedNeeds.get(m.id) || D()).toDecimalPlaces(3, Prisma.Decimal.ROUND_UP);
                const suggestedPurchase = m.status === 'ACTIVE' ? positive(need.plus(proposed).plus(m.minStock).minus(usable)) : D();
                return { id: m.id, code: m.code, name: m.name, unit: m.unit.symbol, status: m.status, category: m.category.name, ...inventory(moves.map(x => ({ quantity: x.quantity, date: x.postedAt, incoming: x.toSource === 'TRONG_KHO', outgoing: x.fromSource === 'TRONG_KHO', label: x.receiptLineId ? 'Nhập NCC' : x.returnLineId ? 'Hoàn từ bếp' : x.issueLineId ? 'Cấp cho bếp' : x.wasteLineId ? 'Hủy tại kho' : 'Khác' }))), stock, usable, expired, expiring, minimum: m.minStock, openNeed: need, proposedNeed: proposed, suggestedPurchase, consumed, coverageDays: consumed.gt(0) && observedDays ? usable.div(consumed.div(observedDays)).toDecimalPlaces(1) : null };
            });
            const formulaMap = new Map();
            for (const r of runs) {
                const bom = r.productionOrder.bom;
                const ids = new Set([...bom.lines.map(l => l.materialId), ...r.consumptions.map(c => c.issueLine.lot.materialId)]);
                for (const id of ids) {
                    const material = materials.find(m => m.id === id);
                    const key = bom.id + ':' + id;
                    const row = formulaMap.get(key) || { bomId: bom.id, version: bom.version, product: bom.product.name, material: material.name, unit: material.unit.symbol, expected: D(), actual: D(), runs: 0, orderIds: new Set() };
                    row.expected = row.expected.plus((bom.lines.find(l => l.materialId === id)?.quantity || D()).mul(r.actualQuantity).div(bom.outputQuantity));
                    row.actual = row.actual.plus(sum(r.consumptions.filter(c => c.issueLine.lot.materialId === id).map(c => c.quantity)));
                    row.runs++;
                    row.orderIds.add(r.productionOrderId);
                    formulaMap.set(key, row);
                }
            }
            const formulas = [...formulaMap].map(([id, r]) => ({ id, bomId: r.bomId, version: r.version, product: r.product, material: r.material, unit: r.unit, expected: r.expected, actual: r.actual, delta: r.actual.minus(r.expected), deltaPercent: percent(r.actual.minus(r.expected), r.expected), runCount: r.runs, orderIds: [...r.orderIds] }));
            const wastes = wasteLines.map(w => { const materialId = w.lot?.materialId || w.issueLine?.lot.materialId; const m = materials.find(m => m.id === materialId); const p = products.find(p => p.id === w.productId); return { id: w.id, documentId: w.wasteId, name: m?.name || p?.name || 'Không xác định', unit: m?.unit.symbol || p?.unit.symbol || '', lot: w.lot?.code || w.issueLine?.lot.code || null, source: w.sourceType, quantity: w.quantity, at: w.waste.approvedAt, reason: w.waste.reason, by: w.waste.reviewedBy?.name || '' }; });
            return { asOf: now.toISOString(), period: { start, end, observedDays, previousStart: vietnamDay(previousFrom), previousEnd: vietnamDay(new Date(previousUntil.getTime() - 86400000)), horizon }, summary: { receiptCount: receipts.length, receiptValue: sum(receipts.flatMap(r => r.lines.map(l => l.quantity.mul(l.unitPrice)))).toDecimalPlaces(2), runCount: runs.length, wasteDocuments: new Set(wastes.map(w => w.documentId)).size, openOrderCount: activeOrders.length, overdueOrders: activeOrders.filter(o => o.dueAt && o.dueAt < now).length, openShortages: shortageCount, purchaseItems: materialRows.filter(m => m.suggestedPurchase.gt(0)).length, productionItems: productRows.filter(p => p.suggested.gt(0)).length, expiredItems: materialRows.filter(m => m.expired.gt(0)).length }, materials: materialRows, products: productRows, formulas, wastes };
        }, { isolationLevel: 'RepeatableRead', timeout: 15000 });
    }
};
WarehouseReportService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], WarehouseReportService);
export { WarehouseReportService };
//# sourceMappingURL=warehouse-report.service.js.map
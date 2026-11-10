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
import { daysRemaining } from '../inventory/expiry.js';
const lineInclude = { lot: { include: { material: { include: { unit: true } } } }, consumptions: true, returnLines: { include: { return: { include: { requestedBy: { select: { name: true } }, reviewedBy: { select: { name: true } } } } } }, wasteLines: { include: { waste: { include: { reportedBy: { select: { name: true } }, reviewedBy: { select: { name: true } } } } } } };
function uuid(v) { if (typeof v !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v))
    throw new BadRequestException('ID không hợp lệ'); return v; }
function qty(v, zero = false) { if (!['string', 'number'].includes(typeof v) || !/^\d{1,15}(\.\d{1,3})?$/.test(String(v)))
    throw new BadRequestException('Số lượng không hợp lệ'); const q = new Prisma.Decimal(String(v)); if (zero ? q.lt(0) : q.lte(0))
    throw new BadRequestException('Số lượng không hợp lệ'); return q; }
function reason(v) { if (typeof v !== 'string' || !v.trim() || v.length > 1000)
    throw new BadRequestException('Cần lý do (tối đa 1000 ký tự)'); return v.trim(); }
function allow(u, right) { if (!u.permissions.includes('*') && !u.permissions.includes(right))
    throw new ForbiddenException('Chưa có quyền thực hiện thao tác'); }
function expired(d) { const days = daysRemaining(d ? d.toISOString().slice(0, 10) : null); return days !== null && days < 0; }
function remaining(l) {
    return (l.issuedQuantity || new Prisma.Decimal(0)).minus(Prisma.Decimal.sum(0, ...l.consumptions.map(x => x.quantity), ...l.returnLines.filter(x => x.return.status !== 'REJECTED').map(x => x.quantity), ...l.wasteLines.filter(x => x.waste.status !== 'REJECTED').map(x => x.quantity)));
}
let ExecutionService = class ExecutionService {
    db;
    constructor(db) {
        this.db = db;
    }
    async detail(id, user) {
        return this.db.$transaction(async (tx) => {
            const order = await tx.productionOrder.findUniqueOrThrow({ where: { id: uuid(id) }, include: { assignedBy: true, assignedTo: true, replenishments: { include: { saleLine: { include: { sale: { include: { table: true } } } } } }, bom: { include: { product: { include: { unit: true } }, lines: { include: { material: { include: { unit: true } } } } } }, materialIssues: { include: { requestedBy: { select: { name: true } }, reviewedBy: { select: { name: true } }, lines: { include: lineInclude } }, orderBy: { requestedAt: 'asc' } }, runs: { include: { consumptions: true, performedBy: { select: { accountId: true, name: true } }, inspectedBy: { select: { name: true } } }, orderBy: { recordedAt: 'asc' } } } });
            if (order.assignedTo.accountId !== user.id && !user.permissions.some(p => ['*', 'material:view', 'production:manage', 'material:approve', 'production:inspect', 'waste:approve'].includes(p)))
                throw new ForbiddenException('Không có quyền xem lệnh');
            const materialIds = [...new Set([...order.bom.lines.map(l => l.materialId), ...order.materialIssues.flatMap(i => i.lines.map(l => l.lot.materialId))])];
            const lots = await tx.materialLot.findMany({ where: { materialId: { in: materialIds } }, include: { material: { include: { unit: true } }, movements: true }, orderBy: { expiryDate: 'asc' } });
            return { asOf: new Date().toISOString(), order, lots: lots.map(({ movements, ...l }) => ({ ...l, daysRemaining: daysRemaining(l.expiryDate?.toISOString().slice(0, 10) || null), stock: movements.reduce((q, m) => q.plus(m.toSource === 'TRONG_KHO' ? m.quantity : 0).minus(m.fromSource === 'TRONG_KHO' ? m.quantity : 0), new Prisma.Decimal(0)) })), balances: order.materialIssues.filter(i => i.status === 'APPROVED').flatMap(i => i.lines.map(l => {
                    const consumed = Prisma.Decimal.sum(0, ...l.consumptions.map(c => c.quantity));
                    const returned = Prisma.Decimal.sum(0, ...l.returnLines.filter(r => r.return.status === 'APPROVED').map(r => r.quantity));
                    const wasted = Prisma.Decimal.sum(0, ...l.wasteLines.filter(w => w.waste.status === 'APPROVED').map(w => w.quantity));
                    const pending = Prisma.Decimal.sum(0, ...l.returnLines.filter(r => r.return.status === 'PENDING').map(r => r.quantity), ...l.wasteLines.filter(w => w.waste.status === 'PENDING').map(w => w.quantity));
                    return { id: l.id, consumed, returned, wasted, pending, unsettled: (l.issuedQuantity || new Prisma.Decimal(0)).minus(consumed).minus(returned).minus(wasted), remaining: remaining(l) };
                })) };
        }, { isolationLevel: 'RepeatableRead', timeout: 15000 });
    }
    async act(id, input, user) {
        if (!input || typeof input !== 'object' || Array.isArray(input))
            throw new BadRequestException('Dữ liệu không hợp lệ');
        const b = input;
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112027)::text`;
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const order = await tx.productionOrder.findUniqueOrThrow({ where: { id: uuid(id) }, include: { assignedBy: true, assignedTo: true, replenishments: { include: { saleLine: { include: { sale: { include: { table: true } } } } } }, bom: { include: { lines: true } } } });
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần hồ sơ người sử dụng hoạt động');
            const worker = (right) => { allow(user, right); if (order.assignedToId !== employee.id)
                throw new ForbiddenException('Chỉ người được giao thực hiện lệnh'); if (!['RECEIVED', 'IN_PROGRESS'].includes(order.status))
                throw new ConflictException('Lệnh cần đã nhận và chưa hoàn thành'); };
            if (b.action === 'request') {
                worker('material:request');
                const lot = await tx.materialLot.findUniqueOrThrow({ where: { id: uuid(b.lotId) }, include: { material: true } });
                if (!order.bom.lines.some(l => l.materialId === lot.materialId) || lot.material.status !== 'ACTIVE' || expired(lot.expiryDate))
                    throw new BadRequestException('Lô không thuộc BOM, ngừng hoạt động hoặc hết hạn');
                return tx.materialIssue.create({ data: { productionOrderId: id, requestedById: employee.id, reason: reason(b.reason), lines: { create: { lotId: lot.id, requestedQuantity: qty(b.quantity) } } } });
            }
            if (b.action === 'approveIssue' || b.action === 'rejectIssue') {
                allow(user, 'material:approve');
                if (b.reviewNote !== undefined && (typeof b.reviewNote !== 'string' || b.reviewNote.length > 1000))
                    throw new BadRequestException('Phản hồi tối đa 1000 ký tự');
                const reviewNote = typeof b.reviewNote === 'string' ? b.reviewNote.trim() : '';
                if (b.action === 'rejectIssue' && !reviewNote)
                    throw new BadRequestException('Cần ghi rõ lý do từ chối cấp nguyên liệu');
                const issue = await tx.materialIssue.findUniqueOrThrow({ where: { id: uuid(b.targetId) }, include: { lines: { include: { lot: { include: { material: true, movements: true } } } } } });
                if (issue.productionOrderId !== id || issue.status !== 'PENDING' || !['RECEIVED', 'IN_PROGRESS'].includes(order.status))
                    throw new ConflictException('Phiếu không thể duyệt');
                if (b.action === 'approveIssue')
                    for (const l of issue.lines) {
                        const stock = l.lot.movements.reduce((q, m) => q.plus(m.toSource === 'TRONG_KHO' ? m.quantity : 0).minus(m.fromSource === 'TRONG_KHO' ? m.quantity : 0), new Prisma.Decimal(0));
                        if (stock.lt(l.requestedQuantity) || expired(l.lot.expiryDate) || l.lot.material.status !== 'ACTIVE')
                            throw new BadRequestException('Lô thiếu tồn, hết hạn hoặc NVL ngừng hoạt động');
                        await tx.materialIssueLine.update({ where: { id: l.id }, data: { issuedQuantity: l.requestedQuantity } });
                        await tx.materialMovement.create({ data: { lotId: l.lotId, quantity: l.requestedQuantity, fromSource: 'TRONG_KHO', toSource: 'DA_CAP', issueLineId: l.id } });
                    }
                return tx.materialIssue.update({ where: { id: issue.id }, data: { status: b.action === 'approveIssue' ? 'APPROVED' : 'REJECTED', approvedAt: new Date(), reviewedById: employee.id, reviewNote: reviewNote || null } });
            }
            if (b.action === 'run') {
                worker('production:perform');
                const actualQuantity = qty(b.quantity);
                if (!Array.isArray(b.lines) || !b.lines.length || b.lines.length > 100)
                    throw new BadRequestException('Cần ghi tiêu hao nguyên liệu');
                const lines = b.lines.map(v => { if (!v || typeof v !== 'object')
                    throw new BadRequestException('Dòng tiêu hao không hợp lệ'); const l = v; return { issueLineId: uuid(l.issueLineId), quantity: qty(l.quantity) }; });
                if (new Set(lines.map(l => l.issueLineId)).size !== lines.length)
                    throw new BadRequestException('Trùng dòng cấp');
                const used = await tx.productionRun.aggregate({ where: { productionOrderId: id }, _sum: { actualQuantity: true } });
                if (actualQuantity.plus(used._sum.actualQuantity || 0).gt(order.quantity))
                    throw new BadRequestException('Tổng sản lượng ghi nhận vượt lệnh');
                for (const l of lines) {
                    const issued = await tx.materialIssueLine.findUniqueOrThrow({ where: { id: l.issueLineId }, include: { ...lineInclude, issue: true } });
                    if (issued.issue.productionOrderId !== id || issued.issue.status !== 'APPROVED' || remaining(issued).lt(l.quantity) || expired(issued.lot.expiryDate))
                        throw new BadRequestException('Tiêu hao vượt NVL còn lại, lô hết hạn hoặc sai lệnh');
                }
                const run = await tx.productionRun.create({ data: { productionOrderId: id, performedById: employee.id, actualQuantity, consumptions: { create: lines } }, include: { consumptions: { include: { issueLine: true } } } });
                for (const l of run.consumptions)
                    await tx.materialMovement.create({ data: { lotId: l.issueLine.lotId, quantity: l.quantity, fromSource: 'DA_CAP', toSource: 'DA_SU_DUNG', consumptionLineId: l.id } });
                await tx.productionOrder.update({ where: { id }, data: { status: 'IN_PROGRESS' } });
                return run;
            }
            if (b.action === 'inspect') {
                allow(user, 'production:inspect');
                const run = await tx.productionRun.findUniqueOrThrow({ where: { id: uuid(b.targetId) } });
                const acceptedQuantity = qty(b.quantity, true), note = reason(b.reason);
                if (run.productionOrderId !== id || run.status !== 'PENDING' || acceptedQuantity.gt(run.actualQuantity))
                    throw new ConflictException('Lần sản xuất đã nghiệm thu hoặc số lượng không hợp lệ');
                if (acceptedQuantity.gt(0))
                    await tx.productMovement.create({ data: { productId: order.bom.productId, quantity: acceptedQuantity, movementType: 'NHAP_SAN_XUAT', runId: run.id } });
                return tx.productionRun.update({ where: { id: run.id }, data: { acceptedQuantity, status: 'INSPECTED', inspectedAt: new Date(), inspectedById: employee.id, inspectionNote: note } });
            }
            if (b.action === 'return' || b.action === 'waste') {
                worker(b.action === 'return' ? 'material:request' : 'waste:request');
                const l = await tx.materialIssueLine.findUniqueOrThrow({ where: { id: uuid(b.targetId) }, include: { ...lineInclude, issue: true } });
                const amount = qty(b.quantity), why = reason(b.reason);
                if (l.issue.productionOrderId !== id || l.issue.status !== 'APPROVED' || remaining(l).lt(amount))
                    throw new BadRequestException('Vượt NVL còn lại hoặc sai lệnh');
                if (b.action === 'return')
                    return tx.materialReturn.create({ data: { reason: why, requestedById: employee.id, lines: { create: { issueLineId: l.id, quantity: amount } } } });
                return tx.waste.create({ data: { reason: why, reportedById: employee.id, lines: { create: { sourceType: 'DA_CAP', issueLineId: l.id, quantity: amount } } } });
            }
            if (b.action === 'approveReturn' || b.action === 'rejectReturn') {
                allow(user, 'material:approve');
                const doc = await tx.materialReturn.findUniqueOrThrow({ where: { id: uuid(b.targetId) }, include: { lines: { include: { issueLine: { include: { issue: true, lot: true } } } } } });
                if (doc.status !== 'PENDING' || doc.lines.some(l => l.issueLine.issue.productionOrderId !== id))
                    throw new ConflictException('Phiếu không thể duyệt');
                if (b.action === 'approveReturn')
                    for (const l of doc.lines) {
                        if (expired(l.issueLine.lot.expiryDate))
                            throw new BadRequestException('Lô hết hạn: từ chối hoàn và lập hao hụt');
                        await tx.materialMovement.create({ data: { lotId: l.issueLine.lotId, quantity: l.quantity, fromSource: 'DA_CAP', toSource: 'TRONG_KHO', returnLineId: l.id } });
                    }
                return tx.materialReturn.update({ where: { id: doc.id }, data: { status: b.action === 'approveReturn' ? 'APPROVED' : 'REJECTED', approvedAt: new Date(), reviewedById: employee.id } });
            }
            if (b.action === 'approveWaste' || b.action === 'rejectWaste') {
                allow(user, 'waste:approve');
                const doc = await tx.waste.findUniqueOrThrow({ where: { id: uuid(b.targetId) }, include: { lines: { include: { issueLine: { include: { issue: true } } } } } });
                if (doc.status !== 'PENDING' || doc.lines.some(l => !l.issueLine || l.issueLine.issue.productionOrderId !== id || l.sourceType !== 'DA_CAP'))
                    throw new ConflictException('Phiếu không thể duyệt');
                if (b.action === 'approveWaste')
                    for (const l of doc.lines)
                        await tx.materialMovement.create({ data: { lotId: l.issueLine.lotId, quantity: l.quantity, fromSource: 'DA_CAP', toSource: 'DA_HUY', wasteLineId: l.id } });
                return tx.waste.update({ where: { id: doc.id }, data: { status: b.action === 'approveWaste' ? 'APPROVED' : 'REJECTED', approvedAt: new Date(), reviewedById: employee.id } });
            }
            if (b.action === 'complete') {
                allow(user, 'production:manage');
                if (await tx.materialShortage.count({ where: { productionOrderId: id, status: { in: ['PENDING', 'PROCESSING'] } } }))
                    throw new ConflictException('Cần kết thúc hoặc rút các báo thiếu NVL trước khi đóng lệnh');
                if (!['RECEIVED', 'IN_PROGRESS'].includes(order.status))
                    throw new ConflictException('Lệnh không thể hoàn thành');
                const runs = await tx.productionRun.findMany({ where: { productionOrderId: id } });
                const issues = await tx.materialIssue.findMany({ where: { productionOrderId: id }, include: { lines: { include: lineInclude } } });
                if (!runs.length || runs.some(r => r.status === 'PENDING') || Prisma.Decimal.sum(0, ...runs.map(r => r.actualQuantity)).lt(order.quantity))
                    throw new ConflictException('Cần ghi đủ sản lượng và nghiệm thu mọi lần sản xuất');
                if (issues.some(i => i.status === 'PENDING' || i.lines.some(l => (i.status === 'APPROVED' && !remaining(l).isZero()) || l.returnLines.some(r => r.return.status === 'PENDING') || l.wasteLines.some(w => w.waste.status === 'PENDING'))))
                    throw new ConflictException('Cần xử lý hết NVL dư và phiếu chờ duyệt');
                return tx.productionOrder.update({ where: { id }, data: { status: 'COMPLETED' } });
            }
            throw new BadRequestException('Thao tác không hợp lệ');
        });
    }
};
ExecutionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ExecutionService);
export { ExecutionService };
//# sourceMappingURL=execution.service.js.map
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
const include = { sale: true, requestedBy: true, reviewedBy: true, lines: { include: { saleLine: { include: { product: { include: { unit: true } } } } } } };
function id(v) { if (typeof v !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v))
    throw new BadRequestException('ID không hợp lệ'); return v; }
function amount(v) { if (!['string', 'number'].includes(typeof v) || !/^\d{1,15}(\.\d{1,3})?$/.test(String(v)))
    throw new BadRequestException('Số lượng không hợp lệ'); const q = new Prisma.Decimal(String(v)); if (q.lte(0))
    throw new BadRequestException('Số lượng phải dương'); return q; }
let FinishedService = class FinishedService {
    db;
    constructor(db) {
        this.db = db;
    }
    list() { return this.db.productExport.findMany({ include, orderBy: { requestedAt: 'desc' } }); }
    sales() { return this.db.sale.findMany({ where: { status: { notIn: ['DRAFT', 'CANCELLED'] } }, include: { lines: { include: { product: { include: { unit: true } }, exportLines: { include: { export: true } } } } }, orderBy: { createdAt: 'desc' } }); }
    async create(input, user) {
        if (!input || typeof input !== 'object')
            throw new BadRequestException('Dữ liệu không hợp lệ');
        const b = input, saleId = id(b.saleId);
        if (typeof b.reason !== 'string' || !b.reason.trim() || b.reason.length > 1000)
            throw new BadRequestException('Cần lý do xuất (tối đa 1000 ký tự)');
        const reason = b.reason.trim();
        if (!Array.isArray(b.lines) || !b.lines.length || b.lines.length > 100)
            throw new BadRequestException('Cần 1–100 dòng xuất');
        const lines = b.lines.map(v => { if (!v || typeof v !== 'object')
            throw new BadRequestException('Dòng không hợp lệ'); const l = v; return { saleLineId: id(l.saleLineId), requestedQuantity: amount(l.quantity) }; });
        if (new Set(lines.map(l => l.saleLineId)).size !== lines.length)
            throw new BadRequestException('Trùng dòng xuất');
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            const sale = await tx.sale.findUniqueOrThrow({ where: { id: saleId }, include: { lines: { include: { exportLines: { include: { export: true } } } } } });
            if (['DRAFT', 'CANCELLED'].includes(sale.status))
                throw new ConflictException('Đơn bán nháp hoặc đã hủy không thể xuất');
            for (const l of lines) {
                const sold = sale.lines.find(s => s.id === l.saleLineId);
                if (!sold)
                    throw new BadRequestException('Dòng xuất không thuộc đơn bán');
                const reserved = Prisma.Decimal.sum(0, ...sold.exportLines.filter(e => ['PENDING', 'APPROVED'].includes(e.export.status)).map(e => e.export.status === 'APPROVED' ? e.exportedQuantity || 0 : e.requestedQuantity));
                if (reserved.plus(l.requestedQuantity).gt(sold.quantity))
                    throw new BadRequestException('Số lượng xuất và chờ xuất vượt số lượng đơn bán');
            }
            return tx.productExport.create({ data: { saleId, requestedById: employee.id, reason, lines: { create: lines } }, include });
        });
    }
    async review(exportId, approve, user) {
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            const doc = await tx.productExport.findUniqueOrThrow({ where: { id: id(exportId) }, include });
            if (doc.status !== 'PENDING')
                throw new ConflictException('Phiếu đã xử lý');
            if (approve) {
                if (['DRAFT', 'CANCELLED'].includes(doc.sale.status))
                    throw new ConflictException('Đơn bán không thể xuất');
                for (const l of doc.lines) {
                    const moves = await tx.productMovement.findMany({ where: { productId: l.saleLine.productId } });
                    const stock = moves.reduce((q, m) => m.movementType === 'NHAP_SAN_XUAT' ? q.plus(m.quantity) : q.minus(m.quantity), new Prisma.Decimal(0));
                    if (stock.lt(l.requestedQuantity) || l.saleLine.product.status !== 'ACTIVE')
                        throw new BadRequestException(`Không đủ tồn hoặc thành phẩm ngừng hoạt động: ${l.saleLine.productName}`);
                    const other = await tx.productExportLine.findMany({ where: { saleLineId: l.saleLineId, export: { status: 'APPROVED' } } });
                    if (Prisma.Decimal.sum(l.requestedQuantity, ...other.map(x => x.exportedQuantity || 0)).gt(l.saleLine.quantity))
                        throw new ConflictException('Vượt số lượng đơn bán');
                    await tx.productExportLine.update({ where: { id: l.id }, data: { exportedQuantity: l.requestedQuantity } });
                    await tx.productMovement.create({ data: { productId: l.saleLine.productId, quantity: l.requestedQuantity, movementType: 'XUAT_BAN', exportLineId: l.id } });
                }
            }
            return tx.productExport.update({ where: { id: doc.id }, data: { status: approve ? 'APPROVED' : 'REJECTED', approvedAt: new Date(), reviewedById: employee.id }, include });
        });
    }
    async report(kind, start, end) {
        if (!['materials', 'products'].includes(kind))
            throw new BadRequestException('Loại kho không hợp lệ');
        const parse = (v) => { const d = new Date(`${v}T00:00:00+07:00`); if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || !Number.isFinite(d.getTime()) || new Date(d.getTime() + 7 * 3600000).toISOString().slice(0, 10) !== v)
            throw new BadRequestException('Ngày không hợp lệ'); return d; };
        if (!!start !== !!end)
            throw new BadRequestException('Cần cả ngày đầu và cuối');
        const from = start ? parse(start) : new Date(0), until = end ? new Date(parse(end).getTime() + 86400000) : new Date();
        if (from >= until)
            throw new BadRequestException('Khoảng ngày không hợp lệ');
        return this.db.$transaction(async (tx) => {
            const items = kind === 'materials' ? await tx.material.findMany({ include: { unit: true }, orderBy: { code: 'asc' } }) : await tx.product.findMany({ include: { unit: true }, orderBy: { code: 'asc' } });
            const movements = kind === 'materials' ? (await tx.materialMovement.findMany({ where: { postedAt: { lt: until } }, include: { lot: true } })).map(m => ({ itemId: m.lot.materialId, date: m.postedAt, incoming: m.toSource === 'TRONG_KHO' ? m.quantity : new Prisma.Decimal(0), outgoing: m.fromSource === 'TRONG_KHO' ? m.quantity : new Prisma.Decimal(0) })) : (await tx.productMovement.findMany({ where: { postedAt: { lt: until } } })).map(m => ({ itemId: m.productId, date: m.postedAt, incoming: m.movementType === 'NHAP_SAN_XUAT' ? m.quantity : new Prisma.Decimal(0), outgoing: m.movementType !== 'NHAP_SAN_XUAT' ? m.quantity : new Prisma.Decimal(0) }));
            return items.map(i => {
                let opening = new Prisma.Decimal(0), incoming = new Prisma.Decimal(0), outgoing = new Prisma.Decimal(0);
                for (const m of movements)
                    if (m.itemId === i.id) {
                        if (m.date < from)
                            opening = opening.plus(m.incoming).minus(m.outgoing);
                        else {
                            incoming = incoming.plus(m.incoming);
                            outgoing = outgoing.plus(m.outgoing);
                        }
                    }
                return { id: i.id, code: i.code, name: i.name, unit: i.unit.symbol, opening, incoming, outgoing, closing: opening.plus(incoming).minus(outgoing) };
            });
        }, { isolationLevel: 'RepeatableRead' });
    }
};
FinishedService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], FinishedService);
export { FinishedService };
//# sourceMappingURL=finished.service.js.map
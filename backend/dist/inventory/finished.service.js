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
let FinishedService = class FinishedService {
    db;
    constructor(db) {
        this.db = db;
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
            const movements = kind === 'materials' ? (await tx.materialMovement.findMany({ where: { postedAt: { lt: until } }, include: { lot: true } })).map(m => ({ itemId: m.lot.materialId, date: m.postedAt, incoming: m.toSource === 'TRONG_KHO' ? m.quantity : new Prisma.Decimal(0), outgoing: m.fromSource === 'TRONG_KHO' ? m.quantity : new Prisma.Decimal(0) })) : (await tx.productMovement.findMany({ where: { postedAt: { lt: until } } })).map(m => ({ itemId: m.productId, date: m.postedAt, incoming: ['NHAP_SAN_XUAT', 'NHAP_MUA', 'HOAN_CUA_HANG'].includes(m.movementType) ? m.quantity : new Prisma.Decimal(0), outgoing: !['NHAP_SAN_XUAT', 'NHAP_MUA', 'HOAN_CUA_HANG'].includes(m.movementType) ? m.quantity : new Prisma.Decimal(0) }));
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
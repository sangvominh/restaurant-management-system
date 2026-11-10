import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { vietnamDay, daysRemaining } from './expiry.js';
type Lot = { id: string; code: string; materialId: string; expiryDate: string | null; quantity: Prisma.Decimal };
@Injectable()
export class StockInsightsService {
  constructor(private readonly db: PrismaService) {}
  async read(kind: string) {
    if (!['materials', 'products'].includes(kind)) throw new BadRequestException('Loại kho không hợp lệ');
    const now = new Date();
    const today = vietnamDay(now);
    return this.db.$transaction(async tx => {
      if (kind === 'materials') {
        const [materials, lots, cancellations] = await Promise.all([
          tx.material.findMany({ include: { unit: true, category: true }, orderBy: { code: 'asc' } }),
          tx.$queryRaw<Lot[]>`SELECT l.id,l.code,l."materialId",to_char(l."expiryDate",'YYYY-MM-DD') AS "expiryDate",COALESCE(SUM(
            CASE WHEN m."toSource"='TRONG_KHO' THEN m.quantity ELSE 0 END - CASE WHEN m."fromSource"='TRONG_KHO' THEN m.quantity ELSE 0 END),0) AS quantity
            FROM "MaterialLot" l LEFT JOIN "MaterialMovement" m ON m."lotId"=l.id GROUP BY l.id ORDER BY l."expiryDate" NULLS LAST,l.code`,
          tx.wasteLine.findMany({ where: { lotId: { not: null }, sourceType: 'TRONG_KHO', waste: { status: 'APPROVED' } }, include: { waste: { include: { reviewedBy: { select: { name: true } } } } } }),
        ]);
        return { asOf: now.toISOString(), rows: materials.map(m => {
          const own = lots.filter(l => l.materialId === m.id).map(l => { const days = daysRemaining(l.expiryDate, today); return { ...l, daysRemaining: days, expired: days !== null && days < 0, soon: days !== null && days >= 0 && days <= 7, cancellations: cancellations.filter(c => c.lotId === l.id).map(c => ({ id: c.id, documentId: c.wasteId, quantity: c.quantity, at: c.waste.approvedAt, reason: c.waste.reason, by: c.waste.reviewedBy?.name || '' })) }; });
          const stock = Prisma.Decimal.sum(0, ...own.map(l => l.quantity));
          const expired = Prisma.Decimal.sum(0, ...own.filter(l => l.expired && l.quantity.gt(0)).map(l => l.quantity));
          const expiring = Prisma.Decimal.sum(0, ...own.filter(l => l.soon && l.quantity.gt(0)).map(l => l.quantity));
          const usable = m.status === 'ACTIVE' ? Prisma.Decimal.sum(0, ...own.filter(l => !l.expired && l.quantity.gt(0)).map(l => l.quantity)) : new Prisma.Decimal(0);
          return { id: m.id, code: m.code, name: m.name, status: m.status, unit: m.unit.symbol, category: m.category.name, stock, usable, expired, expiring, minimum: m.minStock, shortage: m.status === 'ACTIVE' ? Prisma.Decimal.max(0, m.minStock.minus(usable)) : new Prisma.Decimal(0), lots: own };
        }) };
      }
      const [products, moves, lines] = await Promise.all([
        tx.product.findMany({ include: { unit: true, category: true }, orderBy: { code: 'asc' } }),
        tx.productMovement.findMany(),
        tx.saleLine.findMany({ where: { sentAt: { not: null }, sale: { status: 'CONFIRMED' } }, include: { sale: { select: { code: true } }, exportLines: { include: { export: { select: { status: true } } } } } }),
      ]);
      return { asOf: now.toISOString(), rows: products.map(p => {
        const stock = moves.filter(m => m.productId === p.id).reduce((q, m) => m.movementType === 'NHAP_SAN_XUAT' ? q.plus(m.quantity) : q.minus(m.quantity), new Prisma.Decimal(0));
        const orders = lines.filter(l => l.productId === p.id).map(l => {
          const shipped = Prisma.Decimal.sum(0, ...l.exportLines.filter(e => e.export.status === 'APPROVED').map(e => e.exportedQuantity || 0));
          return { code: l.sale.code, remaining: Prisma.Decimal.max(0, l.quantity.minus(shipped)), pending: Prisma.Decimal.sum(0, ...l.exportLines.filter(e => e.export.status === 'PENDING').map(e => e.requestedQuantity)) };
        }).filter(l => l.remaining.gt(0));
        const demand = Prisma.Decimal.sum(0, ...orders.map(l => l.remaining));
        const pending = Prisma.Decimal.sum(0, ...orders.map(l => l.pending));
        return { id: p.id, code: p.code, name: p.name, status: p.status, unit: p.unit.symbol, category: p.category.name, stock, demand, pending, shortage: Prisma.Decimal.max(0, demand.minus(stock)), surplus: Prisma.Decimal.max(0, stock.minus(demand)), orders };
      }) };
    }, { isolationLevel: 'RepeatableRead' });
  }
}

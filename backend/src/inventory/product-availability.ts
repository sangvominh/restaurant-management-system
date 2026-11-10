import { Prisma } from '../generated/prisma/client.js';
export async function productAvailability(tx: Prisma.TransactionClient, productId: string) {
  const [moves, demand, adjustments] = await Promise.all([
    tx.storeMovement.findMany({ where: { productId } }),
    tx.saleLine.findMany({ where: { productId, sentAt: { not: null }, sale: { status: 'CONFIRMED', exports: { none: { status: { in: ['PENDING', 'APPROVED'] } } } } }, orderBy: [{ sentAt: 'asc' }, { id: 'asc' }] }),
    tx.storeAdjustment.findMany({ where: { productId, status: 'PENDING' } }),
  ]);
  const stock = moves.reduce((s, m) => m.movementType === 'IN_TRANSFER' ? s.plus(m.quantity) : s.minus(m.quantity), new Prisma.Decimal(0));
  const held = Prisma.Decimal.sum(0, ...adjustments.map(a => a.quantity));
  let available = Prisma.Decimal.max(0, stock.minus(held));
  const allocations = demand.map(l => { const ready = Prisma.Decimal.min(available, l.quantity); available = available.minus(ready); return { lineId: l.id, ready, missing: l.quantity.minus(ready), exported: new Prisma.Decimal(0), pending: new Prisma.Decimal(0) }; });
  return { stock, available, held, allocations };
}


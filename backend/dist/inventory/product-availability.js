import { Prisma } from '../generated/prisma/client.js';
import { lotStocks } from './product-lots.js';
export async function productAvailability(tx, productId) {
    const [lots, demand, moves] = await Promise.all([
        lotStocks(tx, productId),
        tx.saleLine.findMany({ where: { productId, sentAt: { not: null }, sale: { status: 'CONFIRMED', exports: { none: { status: { in: ['PENDING', 'APPROVED'] } } } } }, orderBy: [{ sentAt: 'asc' }, { id: 'asc' }] }),
        tx.storeMovement.findMany({ where: { productId } }),
    ]);
    const stock = moves.reduce((s, m) => m.movementType === 'IN_TRANSFER' ? s.plus(m.quantity) : s.minus(m.quantity), new Prisma.Decimal(0));
    const held = Prisma.Decimal.sum(0, ...lots.map(l => l.storeHeld));
    const remaining = new Map(lots.map(l => [l.id, l.storeAvailable]));
    const allocations = demand.map(line => {
        let missing = line.quantity;
        const allocated = [];
        for (const lot of lots) {
            const q = Prisma.Decimal.min(missing, remaining.get(lot.id));
            if (q.gt(0))
                allocated.push({ lotId: lot.id, code: lot.code, expiryDate: lot.expiryDate, quantity: q });
            remaining.set(lot.id, remaining.get(lot.id).minus(q));
            missing = missing.minus(q);
            if (missing.isZero())
                break;
        }
        return { lineId: line.id, ready: line.quantity.minus(missing), missing, lots: allocated, exported: new Prisma.Decimal(0), pending: new Prisma.Decimal(0) };
    });
    const available = Prisma.Decimal.sum(0, ...remaining.values());
    return { stock, available, held, reserved: Prisma.Decimal.sum(0, ...demand.map(l => l.quantity)), shortage: Prisma.Decimal.sum(0, ...allocations.map(a => a.missing)), expired: Prisma.Decimal.sum(0, ...lots.filter(l => l.expired).map(l => l.store)), untracked: stock.minus(Prisma.Decimal.sum(0, ...lots.map(l => l.store))), allocations, lots: lots.map(l => ({ ...l, available: remaining.get(l.id) })) };
}
//# sourceMappingURL=product-availability.js.map
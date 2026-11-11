import { BadRequestException, ConflictException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { daysRemaining, vietnamDay } from './expiry.js';
export const productIncoming = (kind: string) => ['NHAP_SAN_XUAT', 'NHAP_MUA', 'HOAN_CUA_HANG'].includes(kind);
export function lotDate(value: unknown, label: string) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new BadRequestException(label + ' không hợp lệ');
  const d = new Date(value + 'T00:00:00Z');
  if (!Number.isFinite(d.getTime()) || d.toISOString().slice(0, 10) !== value) throw new BadRequestException(label + ' không hợp lệ');
  return d;
}
export function lotDates(manufactured: unknown, expiry: unknown) {
  const manufacturedAt = lotDate(manufactured, 'Ngày sản xuất'), expiryDate = lotDate(expiry, 'Hạn sử dụng');
  if (manufacturedAt.toISOString().slice(0, 10) > vietnamDay() || expiryDate < manufacturedAt || expiryDate.toISOString().slice(0, 10) < vietnamDay()) throw new BadRequestException('Ngày sản xuất không ở tương lai; HSD phải từ ngày sản xuất và chưa hết hạn');
  return { manufacturedAt, expiryDate };
}
export async function lotStocks(tx: Prisma.TransactionClient, productId: string) {
  const lots = await tx.productLot.findMany({ where: { productId }, include: { ledger: true, dispatchAllocations: { where: { dispatchLine: { dispatch: { status: 'PENDING' } } } }, adjustments: { where: { status: 'PENDING' } }, disposals: { include: { createdBy: { select: { name: true } } }, orderBy: { postedAt: 'desc' } } }, orderBy: [{ expiryDate: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }] });
  return lots.map(({ ledger, dispatchAllocations, adjustments, ...lot }) => {
    const sum = (location: string) => Prisma.Decimal.sum(0, ...ledger.filter(m => m.location === location).map(m => m.quantity));
    const warehouse = sum('WAREHOUSE'), store = sum('STORE');
    const warehouseHeld = Prisma.Decimal.sum(0, ...dispatchAllocations.map(a => a.quantity));
    const storeHeld = Prisma.Decimal.sum(0, ...adjustments.map(a => a.quantity));
    const days = daysRemaining(lot.expiryDate.toISOString().slice(0, 10))!;
    return { ...lot, seenInStore: ledger.some(m => m.location === 'STORE'), warehouse, store, warehouseHeld, storeHeld, daysRemaining: days, expired: days < 0, soon: days >= 0 && days <= 7, warehouseAvailable: days < 0 ? new Prisma.Decimal(0) : Prisma.Decimal.max(0, warehouse.minus(warehouseHeld)), storeAvailable: days < 0 ? new Prisma.Decimal(0) : Prisma.Decimal.max(0, store.minus(storeHeld)) };
  });
}
export function takeLots<T extends { id: string }>(lots: T[], quantity: Prisma.Decimal, available: (lot: T) => Prisma.Decimal) {
  let left = quantity;
  const result: { lotId: string; quantity: Prisma.Decimal }[] = [];
  for (const lot of lots) { const q = Prisma.Decimal.min(left, Prisma.Decimal.max(0, available(lot))); if (q.gt(0)) result.push({ lotId: lot.id, quantity: q }); left = left.minus(q); if (left.isZero()) break; }
  if (left.gt(0)) throw new ConflictException('Không đủ thành phẩm còn hạn theo lô. Kiểm tra tồn, phiếu chờ và hàng chưa gán lô');
  return result;
}


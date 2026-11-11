import { randomUUID } from 'node:crypto';
import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { lotDates, lotStocks } from './product-lots.js';
const include = { supplier: true, createdBy: { select: { name: true } }, postedBy: { select: { name: true } }, lines: { include: { product: { include: { unit: true } }, lot: true } } } as const;
function body(v: unknown) { if (!v || typeof v !== 'object' || Array.isArray(v)) throw new BadRequestException('Dữ liệu không hợp lệ'); return v as Record<string, unknown>; }
function text(v: unknown, name: string, max = 1000) { if (typeof v !== 'string' || !v.trim() || v.length > max) throw new BadRequestException(name + ' không hợp lệ'); return v.trim(); }
function id(v: unknown) { const s = text(v, 'ID', 36); if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s)) throw new BadRequestException('ID không hợp lệ'); return s; }
function amount(v: unknown, price = false) { if (!new RegExp(price ? '^\\d{1,16}(\\.\\d{1,2})?$' : '^\\d{1,15}(\\.\\d{1,3})?$').test(String(v))) throw new BadRequestException('Số lượng / đơn giá không hợp lệ'); const d = new Prisma.Decimal(String(v)); if (price ? d.lt(0) : d.lte(0)) throw new BadRequestException('Số lượng phải dương, đơn giá không âm'); return d; }
async function person(tx: Prisma.TransactionClient, user: AdminUser) { const p = await tx.employee.findUnique({ where: { accountId: user.id } }); if (!p || p.status !== 'ACTIVE') throw new ForbiddenException('Cần hồ sơ người sử dụng đang hoạt động'); return p; }
const lock = (tx: Prisma.TransactionClient) => tx.$queryRawUnsafe('SELECT pg_advisory_xact_lock(8112028)::text');
@Injectable()
export class ProductReceiptsService {
  constructor(private readonly db: PrismaService) {}
  references() { return this.db.$transaction(async tx => ({ products: await tx.product.findMany({ where: { status: 'ACTIVE', supplyType: 'PURCHASED' }, include: { unit: true }, orderBy: { name: 'asc' } }), suppliers: await tx.supplier.findMany({ where: { status: 'ACTIVE' }, orderBy: { name: 'asc' } }) })); }
  list() { return this.db.productReceipt.findMany({ include, orderBy: { receivedAt: 'desc' } }); }
  save(input: unknown, user: AdminUser, key?: string) {
    const b = body(input), supplierId = id(b.supplierId), note = b.note ? text(b.note, 'Ghi chú') : null;
    if (!Array.isArray(b.lines) || !b.lines.length || b.lines.length > 100) throw new BadRequestException('Cần 1–100 dòng nhập thành phẩm');
    const lines = b.lines.map(v => { const l = body(v); return { productId: id(l.productId), lotCode: text(l.lotCode, 'Mã lô', 80), ...lotDates(l.manufacturedAt, l.expiryDate), quantity: amount(l.quantity), unitPrice: amount(l.unitPrice, true) }; });
    if (new Set(lines.map(l => l.productId + ':' + l.lotCode)).size !== lines.length) throw new BadRequestException('Trùng thành phẩm và mã lô trên phiếu');
    return this.db.$transaction(async tx => {
      await lock(tx); const p = await person(tx, user);
      const current = key ? await tx.productReceipt.findUniqueOrThrow({ where: { id: id(key) } }) : null;
      if (current && current.status !== 'DRAFT') throw new ConflictException('Phiếu đã ghi sổ không sửa/xóa');
      const supplier = await tx.supplier.findUnique({ where: { id: supplierId } });
      if (supplier?.status !== 'ACTIVE') throw new BadRequestException('Nhà cung cấp không hoạt động');
      for (const l of lines) {
        const product = await tx.product.findUniqueOrThrow({ where: { id: l.productId } });
        if (product.supplyType !== 'PURCHASED' || product.status !== 'ACTIVE') throw new BadRequestException('Chỉ nhập trực tiếp thành phẩm loại nhập mua đang hoạt động');
        if (await tx.productLot.findUnique({ where: { productId_code: { productId: l.productId, code: l.lotCode } } })) throw new ConflictException('Mã lô đã nhập. Dùng mã lô riêng cho lần nhận hàng này');
      }
      if (current) { await tx.productReceiptLine.deleteMany({ where: { receiptId: current.id } }); return tx.productReceipt.update({ where: { id: current.id }, data: { supplierId, note, lines: { create: lines } }, include }); }
      return tx.productReceipt.create({ data: { code: 'NTP-' + randomUUID().slice(0, 8).toUpperCase(), supplierId, note, createdById: p.id, lines: { create: lines } }, include });
    });
  }
  remove(key: string, user: AdminUser) { return this.db.$transaction(async tx => {
    await lock(tx); await person(tx, user);
    const doc = await tx.productReceipt.findUniqueOrThrow({ where: { id: id(key) } }); if (doc.status !== 'DRAFT') throw new ConflictException('Chỉ xóa phiếu nháp');
    await tx.productReceiptLine.deleteMany({ where: { receiptId: doc.id } }); return tx.productReceipt.delete({ where: { id: doc.id } });
  }); }
  post(key: string, user: AdminUser) { return this.db.$transaction(async tx => {
    await lock(tx); const p = await person(tx, user), doc = await tx.productReceipt.findUniqueOrThrow({ where: { id: id(key) }, include });
    if (doc.status !== 'DRAFT') throw new ConflictException('Phiếu đã ghi sổ');
    if (doc.supplier.status !== 'ACTIVE') throw new ConflictException('Nhà cung cấp đã ngừng hoạt động');
    for (const l of doc.lines) {
      if (l.product.supplyType !== 'PURCHASED' || l.product.status !== 'ACTIVE') throw new ConflictException('Thành phẩm không còn đủ điều kiện nhập mua');
      lotDates(l.manufacturedAt.toISOString().slice(0, 10), l.expiryDate.toISOString().slice(0, 10));
      if (await tx.productLot.findUnique({ where: { productId_code: { productId: l.productId, code: l.lotCode } } })) throw new ConflictException('Mã lô đã được ghi sổ ở phiếu khác');
      const lot = await tx.productLot.create({ data: { productId: l.productId, code: l.lotCode, manufacturedAt: l.manufacturedAt, expiryDate: l.expiryDate, receiptLineId: l.id } });
      await tx.productMovement.create({ data: { productId: l.productId, quantity: l.quantity, movementType: 'NHAP_MUA', receiptLineId: l.id } });
      await tx.productLotMovement.create({ data: { lotId: lot.id, location: 'WAREHOUSE', quantity: l.quantity, receiptLineId: l.id } });
    }
    return tx.productReceipt.update({ where: { id: doc.id }, data: { status: 'POSTED', postedAt: new Date(), postedById: p.id }, include });
  }); }
  lots(productId: string) { return this.db.$transaction(tx => lotStocks(tx, id(productId)), { isolationLevel: 'RepeatableRead' }); }
  discard(key: string, input: unknown, user: AdminUser) {
    const b = body(input), quantity = amount(b.quantity), reason = text(b.reason, 'Lý do hủy');
    return this.db.$transaction(async tx => {
      await lock(tx); const p = await person(tx, user), lot = await tx.productLot.findUniqueOrThrow({ where: { id: id(key) } }), row = (await lotStocks(tx, lot.productId)).find(l => l.id === lot.id)!;
      if (row.warehouse.minus(row.warehouseHeld).lt(quantity)) throw new ConflictException('Vượt lượng lô chưa giữ cho phiếu chuyển. Từ chối phiếu chờ trước khi hủy');
      const doc = await tx.productLotDisposal.create({ data: { lotId: lot.id, quantity, reason, createdById: p.id } });
      await tx.productMovement.create({ data: { productId: lot.productId, quantity, movementType: 'HUY_LO', lotDisposalId: doc.id } });
      await tx.productLotMovement.create({ data: { lotId: lot.id, location: 'WAREHOUSE', quantity: quantity.negated(), disposalId: doc.id } });
      return doc;
    });
  }
}


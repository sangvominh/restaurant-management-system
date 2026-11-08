import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
const include = { createdBy: { select: { id: true, name: true } }, lines: { include: { product: { include: { unit: true } } } }, payment: true, exports: { include: { requestedBy: { select: { name: true } }, reviewedBy: { select: { name: true } }, lines: true }, orderBy: { requestedAt: 'desc' as const } } } as const;
function object(v: unknown): Record<string, unknown> { if (!v || typeof v !== 'object' || Array.isArray(v)) throw new BadRequestException('Dữ liệu không hợp lệ'); return v as Record<string, unknown>; }
function uuid(v: unknown) { if (typeof v !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)) throw new BadRequestException('ID không hợp lệ'); return v; }
function quantity(v: unknown) { if (!['string', 'number'].includes(typeof v) || !/^\d{1,15}(\.\d{1,3})?$/.test(String(v))) throw new BadRequestException('Số lượng không hợp lệ'); const q = new Prisma.Decimal(String(v)); if (q.lte(0)) throw new BadRequestException('Số lượng phải dương'); return q; }
const total = (lines: { quantity: Prisma.Decimal; unitPrice: Prisma.Decimal }[]) => Prisma.Decimal.sum(0, ...lines.map(l => l.quantity.mul(l.unitPrice))).toDecimalPlaces(2);
function serialized(sale: Prisma.SaleGetPayload<{ include: typeof include }>) { return { ...sale, total: total(sale.lines) }; }
@Injectable()
export class SalesService {
  constructor(private readonly db: PrismaService) {}
  async products() {
    return this.db.$transaction(async tx => {
      const [products, moves] = await Promise.all([tx.product.findMany({ where: { status: 'ACTIVE' }, include: { unit: true, category: true }, orderBy: { code: 'asc' } }), tx.productMovement.findMany()]);
      return products.map(p => ({ ...p, stock: moves.filter(m => m.productId === p.id).reduce((q, m) => m.movementType === 'NHAP_SAN_XUAT' ? q.plus(m.quantity) : q.minus(m.quantity), new Prisma.Decimal(0)) }));
    }, { isolationLevel: 'RepeatableRead' });
  }
  async list() { return (await this.db.sale.findMany({ include, orderBy: { createdAt: 'desc' } })).map(serialized); }
  async save(input: unknown, user: AdminUser, existingId?: string) {
    const b = object(input);
    if (typeof b.code !== 'string' || !b.code.trim() || b.code.trim().length > 50) throw new BadRequestException('Mã đơn cần từ 1–50 ký tự');
    const code = b.code.trim();
    if (!Array.isArray(b.lines) || !b.lines.length || b.lines.length > 100) throw new BadRequestException('Đơn cần 1–100 dòng');
    const requested = b.lines.map(v => { const l = object(v); return { productId: uuid(l.productId), quantity: quantity(l.quantity) }; });
    if (new Set(requested.map(l => l.productId)).size !== requested.length) throw new BadRequestException('Thành phẩm bị trùng');
    return this.db.$transaction(async tx => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112028)::text`;
      const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
      if (!employee || employee.status !== 'ACTIVE') throw new ForbiddenException(`Tài khoản ${user.username} cần liên kết người sử dụng đang hoạt động`);
      const current = existingId ? await tx.sale.findUniqueOrThrow({ where: { id: uuid(existingId) }, include: { exports: true, payment: true, lines: true } }) : null;
      if (current && (current.status !== 'DRAFT' || current.exports.length || current.payment)) throw new ConflictException('Chỉ sửa đơn nháp chưa có xuất kho hoặc thanh toán');
      if (await tx.sale.findFirst({ where: { code, ...(existingId ? { id: { not: existingId } } : {}) } })) throw new ConflictException('Mã đơn bán đã tồn tại');
      const products = await tx.product.findMany({ where: { id: { in: requested.map(l => l.productId) }, status: 'ACTIVE' } });
      if (products.length !== requested.length) throw new BadRequestException('Có thành phẩm không tồn tại hoặc đã ngừng bán');
      const lines = requested.map(l => { const p = products.find(p => p.id === l.productId)!; const old = current?.lines.find(x => x.productId === l.productId); return { ...l, productName: old?.productName ?? p.name, unitPrice: old?.unitPrice ?? p.sellingPrice }; });
      if (total(lines).gt('9999999999999999.99')) throw new BadRequestException('Tổng tiền vượt giới hạn lưu trữ');
      if (existingId) { await tx.saleLine.deleteMany({ where: { saleId: existingId } }); return serialized(await tx.sale.update({ where: { id: existingId }, data: { code, lines: { create: lines } }, include })); }
      return serialized(await tx.sale.create({ data: { code, createdById: employee.id, lines: { create: lines } }, include }));
    });
  }
  async action(saleId: string, action: 'confirm' | 'cancel' | 'pay', input: unknown) {
    return this.db.$transaction(async tx => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112028)::text`;
      const sale = await tx.sale.findUniqueOrThrow({ where: { id: uuid(saleId) }, include });
      if (action === 'confirm') {
        if (sale.status !== 'DRAFT' || !sale.lines.length) throw new ConflictException('Chỉ xác nhận đơn nháp có thành phẩm');
        if (sale.lines.some(l => l.product.status !== 'ACTIVE')) throw new BadRequestException('Đơn có thành phẩm ngừng bán');
        return serialized(await tx.sale.update({ where: { id: sale.id }, data: { status: 'CONFIRMED' }, include }));
      }
      if (action === 'cancel') {
        if (!['DRAFT', 'CONFIRMED'].includes(sale.status) || sale.payment || sale.exports.some(e => ['PENDING', 'APPROVED'].includes(e.status))) throw new ConflictException('Chỉ hủy đơn chưa thanh toán và không có phiếu xuất chờ duyệt/đã xuất');
        return serialized(await tx.sale.update({ where: { id: sale.id }, data: { status: 'CANCELLED' }, include }));
      }
      const b = object(input);
      if (!['CASH', 'TRANSFER'].includes(String(b.method))) throw new BadRequestException('Chọn tiền mặt hoặc chuyển khoản');
      if (sale.status !== 'CONFIRMED' || sale.payment) throw new ConflictException('Đơn phải đã xác nhận và chưa thanh toán');
      if (sale.exports.some(e => e.status === 'PENDING') || sale.lines.some(l => !Prisma.Decimal.sum(0, ...sale.exports.filter(e => e.status === 'APPROVED').flatMap(e => e.lines.filter(x => x.saleLineId === l.id).map(x => x.exportedQuantity || 0))).eq(l.quantity))) throw new ConflictException('Cần xuất đủ thành phẩm và xử lý hết phiếu chờ trước khi thanh toán');
      await tx.payment.create({ data: { saleId: sale.id, amount: total(sale.lines), method: String(b.method), status: 'PAID', paidAt: new Date() } });
      return serialized(await tx.sale.update({ where: { id: sale.id }, data: { status: 'COMPLETED' }, include }));
    });
  }
}

import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { StaffIdentity } from '../auth/auth.service.js';
import { integer, object, text, uuid } from './input.js';
const invoiceInclude = { table: true, orders: { orderBy: { createdAt: 'asc' as const }, include: { lines: true } }, payment: true };
export function invoiceTotal(orders: { lines: { status: string; quantity: number; unitPrice: number }[] }[]) {
  return orders.flatMap(o => o.lines).filter(l => l.status !== 'CANCELLED').reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);
}
@Injectable()
export class StaffService {
  constructor(private readonly db: PrismaService) {}
  private tx<T>(work: (tx: Prisma.TransactionClient) => Promise<T>) { return this.db.$transaction(work, { isolationLevel: 'Serializable', timeout: 15_000 }); }
  private async invoice(tx: Prisma.TransactionClient, user: StaffIdentity, id: string) {
    const invoice = await tx.invoice.findFirst({ where: { id: uuid(id), branchId: user.branchId }, include: invoiceInclude });
    if (!invoice) throw new NotFoundException('Không tìm thấy hóa đơn trong chi nhánh.');
    return invoice;
  }
  private audit(tx: Prisma.TransactionClient, user: StaffIdentity, action: string, targetId: string, detail: string) {
    return tx.staffAudit.create({ data: { actorId: user.id, action, targetId, detail } });
  }
  async overview(user: StaffIdentity) {
    const [tables, orders, invoices, shift] = await Promise.all([
      this.tables(user), this.kitchen(user), this.db.invoice.findMany({ where: { branchId: user.branchId, status: 'OPEN' }, include: invoiceInclude }),
      this.db.staffShift.findFirst({ where: { userId: user.id, endedAt: null } }),
    ]);
    // Revenue is only available to cashier and shift supervisor.
    const dayStart = new Date(new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }) + 'T00:00:00+07:00');
    const revenue = ['CASHIER', 'SUPERVISOR'].includes(user.role) ? (await this.db.payment.aggregate({ where: { invoice: { branchId: user.branchId }, createdAt: { gte: dayStart } }, _sum: { amount: true } }))._sum.amount || 0 : null;
    return { tables, invoices: invoices.map(i => ({ ...i, total: invoiceTotal(i.orders) })), kitchen: orders, shift, revenue };
  }
  tables(user: StaffIdentity) {
    return this.db.restaurantTable.findMany({ where: { branchId: user.branchId, isActive: true }, orderBy: { code: 'asc' }, include: { invoices: { where: { status: 'OPEN' }, select: { id: true, guestName: true, createdAt: true } } } });
  }
  menu(user: StaffIdentity) { return this.db.menuItem.findMany({ where: { branchId: user.branchId }, orderBy: [{ category: 'asc' }, { name: 'asc' }] }); }
  async invoices(user: StaffIdentity) {
    const rows = await this.db.invoice.findMany({ where: { branchId: user.branchId }, include: invoiceInclude, orderBy: { createdAt: 'desc' }, take: 100 });
    return rows.map(i => ({ ...i, total: invoiceTotal(i.orders) }));
  }
  async detail(user: StaffIdentity, id: string) { const i = await this.invoice(this.db, user, id); return { ...i, total: invoiceTotal(i.orders) }; }
  createInvoice(user: StaffIdentity, body: unknown) {
    const input = object(body); const tableId = uuid(input.tableId); const guestName = text(input.guestName, 'Tên/nhãn nhận diện khách', 100);
    return this.tx(async tx => {
      const table = await tx.restaurantTable.findFirst({ where: { id: tableId, branchId: user.branchId, isActive: true } });
      if (!table) throw new NotFoundException('Bàn không khả dụng.');
      const count = await tx.invoice.count({ where: { tableId, status: 'OPEN' } });
      if (count >= table.capacity) throw new ConflictException('Bàn đã đạt số khách tối đa.');
      const invoice = await tx.invoice.create({ data: { branchId: user.branchId, tableId, guestName } });
      await this.audit(tx, user, 'INVOICE_CREATE', invoice.id, guestName);
      return invoice;
    });
  }
  addOrder(user: StaffIdentity, body: unknown) {
    const input = object(body); const invoiceId = uuid(input.invoiceId); const requestKey = uuid(input.requestKey);
    if (!Array.isArray(input.lines) || input.lines.length < 1 || input.lines.length > 50) throw new BadRequestException('Đơn phải có từ 1 đến 50 dòng món.');
    const lines = input.lines.map(value => { const line = object(value); return { menuItemId: uuid(line.menuItemId), quantity: integer(line.quantity, 'Số lượng', 1, 50), note: line.note ? text(line.note, 'Ghi chú', 300) : '' }; });
    return this.tx(async tx => {
      const invoice = await this.invoice(tx, user, invoiceId);
      const existing = await tx.staffOrder.findUnique({ where: { requestKey }, include: { lines: true } });
      if (existing) {
        if (existing.invoiceId !== invoice.id || existing.createdById !== user.id) throw new ConflictException('Mã yêu cầu đã dùng.');
        return existing;
      }
      if (invoice.status !== 'OPEN') throw new ConflictException('Không thể gọi thêm vào hóa đơn đã thanh toán.');
      const menu = await tx.menuItem.findMany({ where: { id: { in: lines.map(l => l.menuItemId) }, branchId: user.branchId, isAvailable: true } });
      const data = lines.map(line => {
        const item = menu.find(m => m.id === line.menuItemId);
        if (!item) throw new ConflictException('Có món đã hết hoặc không thuộc chi nhánh.');
        return { ...line, name: item.name, unitPrice: item.price };
      });
      const order = await tx.staffOrder.create({ data: { invoiceId, createdById: user.id, requestKey, lines: { create: data } }, include: { lines: true } });
      await this.audit(tx, user, 'ORDER_CREATE', order.id, `${data.length} dòng món; không trừ kho`);
      return order;
    });
  }
  kitchen(user: StaffIdentity) {
    return this.db.staffOrder.findMany({ where: { invoice: { branchId: user.branchId }, lines: { some: { status: { in: ['QUEUED', 'COOKING', 'READY'] } } } }, include: { invoice: { include: { table: true } }, lines: true }, orderBy: { createdAt: 'asc' } });
  }
  updateLine(user: StaffIdentity, id: string, body: unknown) {
    const input = object(body); const status = text(input.status, 'Trạng thái');
    if (!['COOKING', 'READY', 'SERVED'].includes(status)) throw new BadRequestException('Trạng thái không hỗ trợ.');
    if (status === 'SERVED' ? !['SERVICE', 'SUPERVISOR'].includes(user.role) : !['KITCHEN', 'SUPERVISOR'].includes(user.role)) throw new ForbiddenException('Không có quyền xử lý trạng thái này.');
    return this.tx(async tx => {
      const line = await tx.orderLine.findFirst({ where: { id: uuid(id), order: { invoice: { branchId: user.branchId } } }, include: { menuItem: { include: { recipe: true } } } });
      if (!line) throw new NotFoundException('Không tìm thấy món.');
      if (line.status === status) return line;
      const previous = { COOKING: 'QUEUED', READY: 'COOKING', SERVED: 'READY' }[status];
      if (line.status !== previous) throw new ConflictException('Món đã đổi trạng thái. Hãy tải lại.');
      if (status === 'COOKING') {
        throw new NotImplementedException('Chế biến từ đơn món chưa kết nối với kho chung. Vui lòng dùng luồng sản xuất của kho.');
      }
      const result = await tx.orderLine.update({ where: { id: line.id }, data: { status: status as 'COOKING' | 'READY' | 'SERVED', ...(status === 'COOKING' ? { cookingAt: new Date() } : status === 'READY' ? { readyAt: new Date() } : { servedAt: new Date() }) } });
      await this.audit(tx, user, `LINE_${status}`, id, status === 'COOKING' ? 'Xuất kho FEFO theo sổ chế biến duy nhất' : 'Không thay đổi tồn kho');
      return result;
    });
  }
  cancelLine(user: StaffIdentity, id: string, body: unknown) {
    const input = object(body); const reason = text(input.reason, 'Lý do', 300);
    return this.tx(async tx => {
      const line = await tx.orderLine.findFirst({ where: { id: uuid(id), order: { invoice: { branchId: user.branchId } } }, include: { order: { include: { invoice: true } } } });
      if (!line) throw new NotFoundException('Không tìm thấy món.');
      if (line.order.invoice.status !== 'OPEN') throw new ConflictException('Hóa đơn đã thanh toán.');
      if (line.status !== 'QUEUED') throw new NotImplementedException('Món đã chế biến cần quy trình phê duyệt và hao hụt kho. Chức năng này chưa được hỗ trợ; chưa có thay đổi nào được ghi nhận.');
      const result = await tx.orderLine.update({ where: { id }, data: { status: 'CANCELLED' } });
      await this.audit(tx, user, 'LINE_CANCEL', id, reason); return result;
    });
  }
  transfer(user: StaffIdentity, body: unknown) {
    const input = object(body); const id = uuid(input.invoiceId); const targetId = uuid(input.targetTableId); const reason = text(input.reason, 'Lý do', 300);
    return this.tx(async tx => {
      const invoice = await this.invoice(tx, user, id);
      if (invoice.status !== 'OPEN' || invoice.tableId === targetId) throw new ConflictException('Không thể chuyển hóa đơn này.');
      const target = await tx.restaurantTable.findFirst({ where: { id: targetId, branchId: user.branchId, isActive: true } });
      if (!target) throw new NotFoundException('Bàn đích không khả dụng.');
      const occupied = await tx.invoice.count({ where: { tableId: targetId, status: 'OPEN' } });
      if (occupied) throw new ConflictException('Chỉ hỗ trợ chuyển hóa đơn khách sang bàn trống. Gộp bàn chưa được hỗ trợ.');
      await tx.invoice.update({ where: { id }, data: { tableId: targetId } });
      await this.audit(tx, user, 'INVOICE_TRANSFER', id, `${invoice.tableId} -> ${targetId}: ${reason}`);
      return { message: 'Đã chuyển hóa đơn của khách sang bàn mới.' };
    });
  }
  pay(user: StaffIdentity, id: string, body: unknown) {
    const input = object(body); const cashReceived = integer(input.cashReceived, 'Tiền khách đưa', 0, 1_000_000_000);
    if (input.method !== 'CASH') throw new NotImplementedException('Chưa tích hợp xác nhận thanh toán QR, thẻ hoặc ví.');
    return this.tx(async tx => {
      const invoice = await this.invoice(tx, user, id);
      if (invoice.status !== 'OPEN' || invoice.payment) throw new ConflictException('Hóa đơn đã được thanh toán. Không ghi nhận thu tiền lần nữa.');
      const amount = invoiceTotal(invoice.orders);
      if (amount <= 0 || cashReceived < amount) throw new BadRequestException('Số tiền khách đưa chưa đủ hoặc hóa đơn không có món.');
      const payment = await tx.payment.create({ data: { invoiceId: id, cashierId: user.id, amount, cashReceived } });
      await tx.invoice.update({ where: { id }, data: { status: 'PAID' } });
      await this.audit(tx, user, 'PAYMENT_CASH', id, `Thu ${amount} VND; không trừ kho`);
      return { payment, change: cashReceived - amount };
    });
  }
  shifts(user: StaffIdentity) { return this.db.staffShift.findMany({ where: { userId: user.id }, orderBy: { startedAt: 'desc' }, take: 30 }); }
  startShift(user: StaffIdentity) {
    return this.tx(async tx => {
      if (await tx.staffShift.findFirst({ where: { userId: user.id, endedAt: null } })) throw new ConflictException('Bạn đang có ca chưa kết thúc.');
      const shift = await tx.staffShift.create({ data: { userId: user.id } });
      await this.audit(tx, user, 'SHIFT_START', shift.id, 'Bắt đầu ca thủ công'); return shift;
    });
  }
  endShift(user: StaffIdentity, body: unknown) {
    const note = text(object(body).note, 'Ghi chú bàn giao', 1000);
    return this.tx(async tx => {
      const shift = await tx.staffShift.findFirst({ where: { userId: user.id, endedAt: null } });
      if (!shift) throw new ConflictException('Không có ca đang làm.');
      const result = await tx.staffShift.update({ where: { id: shift.id }, data: { endedAt: new Date(), handoverNote: note } });
      await this.audit(tx, user, 'SHIFT_END', shift.id, note); return result;
    });
  }
}

import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { StaffIdentity } from '../auth/staff-auth.service.js';
import { integer, object, text, uuid } from './input.js';
import { randomUUID } from 'node:crypto';
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
  async kitchenHistory(user: StaffIdentity) {
    const lines = await this.db.orderLine.findMany({
      where: {
        order: { invoice: { branchId: user.branchId } },
        OR: [{ readyAt: { not: null } }, { servedAt: { not: null } }, { status: 'CANCELLED', cookingAt: { not: null } }],
        ...(user.role === 'BARISTA' ? { menuItem: { category: 'Đồ uống' } } : user.role === 'KITCHEN' ? { menuItem: { category: { not: 'Đồ uống' } } } : {}),
      },
      include: { order: { include: { invoice: { include: { table: true } } } } },
      orderBy: [{ readyAt: 'desc' }, { servedAt: 'desc' }], take: 500,
    });
    return lines.map(line => ({
      type: 'ORDER', code: line.id.slice(0, 8).toUpperCase(), title: line.name,
      reference: `${line.order.invoice.table.name} · Order ${line.order.id.slice(0, 8)}`,
      quantity: line.quantity.toString(), plannedQuantity: line.quantity.toString(),
      acceptedQuantity: ['READY', 'SERVED'].includes(line.status) ? line.quantity.toString() : null,
      rejectedQuantity: null, status: line.status, note: line.note || null,
      createdAt: line.servedAt ?? line.readyAt ?? line.cookingAt ?? line.order.createdAt,
      employeeCode: null,
    }));
  }
  private async requirements(tx: Prisma.TransactionClient, user: StaffIdentity, id: string) {
    const line = await tx.orderLine.findFirst({ where: { id: uuid(id), order: { invoice: { branchId: user.branchId } } } });
    if (!line) throw new NotFoundException('Không tìm thấy món.');
    const recipes = await tx.$queryRaw<{code:string; name:string; unit:string; quantity:Prisma.Decimal | null; available:Prisma.Decimal; blocked_expiry:Prisma.Decimal}[]>`
      SELECT m.code, m.name, u.name AS unit, (r.quantity / NULLIF(bom.output_quantity, 0) * CASE WHEN r.unit_id=m.unit_id THEN 1 WHEN ru.base_unit_id=m.unit_id THEN ru.conversion_factor END) AS quantity,
        COALESCE((SELECT SUM(GREATEST(b.quantity-b.reserved_waste-b.reserved_return-COALESCE((SELECT SUM(r.quantity) FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id WHERE r.branch_id=b.branch_id AND d.material_lot_id=b.material_lot_id AND r.status='PENDING' AND NOT r.stock_reserved),0),0)) FROM staff_kitchen_balances b JOIN material_lots l ON l.id=b.material_lot_id WHERE b.branch_id=${user.branchId}::uuid AND l.material_id=m.id AND l.status='ACTIVE' AND l.expiry_date >= (now() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date),0) AS available,
        COALESCE((SELECT SUM(GREATEST(b.quantity-b.reserved_waste-b.reserved_return-COALESCE((SELECT SUM(r.quantity) FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id WHERE r.branch_id=b.branch_id AND d.material_lot_id=b.material_lot_id AND r.status='PENDING' AND NOT r.stock_reserved),0),0)) FROM staff_kitchen_balances b JOIN material_lots l ON l.id=b.material_lot_id WHERE b.branch_id=${user.branchId}::uuid AND l.material_id=m.id AND l.status='ACTIVE' AND (l.expiry_date IS NULL OR l.expiry_date < (now() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date)),0) AS blocked_expiry
      FROM menu_items menu JOIN boms bom ON bom.id=menu.bom_id AND bom.status='ACTIVE' JOIN bom_details r ON r.bom_id=bom.id JOIN materials m ON m.id=r.material_id JOIN units ru ON ru.id=r.unit_id JOIN units u ON u.id=m.unit_id
      WHERE menu.id=${line.menuItemId}::uuid ORDER BY m.name`;
    if (!recipes.length) throw new BadRequestException('Món chưa có công thức BOM.');
    return recipes.map(r => { if (!r.quantity) throw new BadRequestException('Đơn vị BOM không quy đổi được về đơn vị tồn kho.'); const required = r.quantity.mul(line.quantity); return { code:r.code, name:r.name, unit:r.unit, required:required.toString(), available:r.available.toString(), blockedExpiry:r.blocked_expiry.toString(), shortage:Prisma.Decimal.max(required.minus(r.available),0).toString() }; });
  }
  lineRequirements(user: StaffIdentity, id: string) { return this.tx(tx => this.requirements(tx, user, id)); }
  updateLine(user: StaffIdentity, id: string, body: unknown) {
    const input = object(body); const status = text(input.status, 'Trạng thái');
    const wastes = input.wastes == null ? (input.waste == null ? [] : [object(input.waste)]) : Array.isArray(input.wastes) ? input.wastes.map(object) : (() => { throw new BadRequestException('Danh sách hao hụt không hợp lệ.'); })();
    if (wastes.length > 50) throw new BadRequestException('Tối đa 50 dòng hao hụt.');
    if (wastes.length && status !== 'READY') throw new BadRequestException('Chỉ ghi hao hụt khi báo hoàn thành.');
    if (!['COOKING', 'READY', 'SERVED'].includes(status)) throw new BadRequestException('Trạng thái không hỗ trợ.');
    if (status === 'SERVED' ? !['SERVICE', 'SUPERVISOR'].includes(user.role) : !['KITCHEN', 'BARISTA', 'SUPERVISOR'].includes(user.role)) throw new ForbiddenException('Không có quyền xử lý trạng thái này.');
    return this.tx(async tx => {
      const line = await tx.orderLine.findFirst({ where: { id: uuid(id), order: { invoice: { branchId: user.branchId } } }, include: { menuItem: true } });
      if (!line) throw new NotFoundException('Không tìm thấy món.');
      if (line.status === status) return line;
      const previous = { COOKING: 'QUEUED', READY: 'COOKING', SERVED: 'READY' }[status];
      if (line.status !== previous) throw new ConflictException('Món đã đổi trạng thái. Hãy tải lại.');
      if (status === 'COOKING') {
        const missing = (await this.requirements(tx, user, line.id)).filter(item => new Prisma.Decimal(item.shortage).gt(0));
        if (missing.length) throw new BadRequestException(`Không đủ nguyên liệu tại bếp: ${missing.map(item => `${item.name} thiếu ${item.shortage} ${item.unit}`).join(', ')}.`);
      }
      if (status === 'READY') {
        const pending=await tx.$queryRaw<{count:bigint}[]>`SELECT COUNT(*) AS count FROM staff_processing_defects WHERE order_line_id=${line.id}::uuid AND status='PENDING'`;
        if (pending[0].count > 0n) throw new ConflictException('Món có phiếu sự cố đang chờ duyệt; chưa thể báo hoàn thành.');
        // BOM quantities are converted into inventory units before consuming stock.
        const recipes = await tx.$queryRaw<{ material_id: string; quantity: Prisma.Decimal | null; name: string }[]>`
          SELECT r.material_id, (r.quantity / NULLIF(bom.output_quantity, 0) * CASE WHEN r.unit_id=m.unit_id THEN 1 WHEN ru.base_unit_id=m.unit_id THEN ru.conversion_factor END) AS quantity, m.name FROM menu_items menu JOIN boms bom ON bom.id=menu.bom_id AND bom.status='ACTIVE' JOIN bom_details r ON r.bom_id=bom.id
          JOIN materials m ON m.id=r.material_id JOIN units ru ON ru.id=r.unit_id WHERE menu.id=${line.menuItemId}::uuid ORDER BY r.material_id`;
        if (!recipes.length) throw new BadRequestException('Món chưa có công thức BOM; chưa thể báo hoàn thành.');
        for (const recipe of recipes) {
          if (!recipe.quantity) throw new BadRequestException('Đơn vị BOM không quy đổi được về đơn vị tồn kho.');
          let remaining = recipe.quantity.mul(line.quantity);
          const lots = await tx.$queryRaw<{ material_lot_id: string; quantity: Prisma.Decimal }[]>`
            SELECT b.material_lot_id, (GREATEST(b.quantity-b.reserved_waste-b.reserved_return-COALESCE((SELECT SUM(r.quantity) FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id WHERE r.branch_id=b.branch_id AND d.material_lot_id=b.material_lot_id AND r.status='PENDING' AND NOT r.stock_reserved),0),0)) AS quantity FROM staff_kitchen_balances b
            JOIN material_lots l ON l.id=b.material_lot_id
            WHERE b.branch_id=${user.branchId}::uuid AND l.material_id=${recipe.material_id}::uuid AND l.status='ACTIVE' AND l.expiry_date >= (now() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date AND GREATEST(b.quantity-b.reserved_waste-b.reserved_return-COALESCE((SELECT SUM(r.quantity) FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id WHERE r.branch_id=b.branch_id AND d.material_lot_id=b.material_lot_id AND r.status='PENDING' AND NOT r.stock_reserved),0),0) > 0
            ORDER BY l.expiry_date NULLS LAST, l.lot_code, l.id FOR UPDATE OF b`;
          for (const lot of lots) {
            if (remaining.lte(0)) break;
            const used = Prisma.Decimal.min(remaining, lot.quantity);
            await tx.$executeRaw`UPDATE staff_kitchen_balances SET quantity=quantity-${used} WHERE branch_id=${user.branchId}::uuid AND material_lot_id=${lot.material_lot_id}::uuid`;
            await tx.$executeRaw`INSERT INTO staff_kitchen_order_consumptions(order_line_id,material_lot_id,quantity) VALUES (${line.id}::uuid,${lot.material_lot_id}::uuid,${used})`;
            remaining = remaining.minus(used);
          }
          if (remaining.gt(0)) throw new BadRequestException(`Không đủ ${recipe.name} trong tồn bếp; chưa báo hoàn thành.`);
        }
      }
      for (const waste of wastes) {
        const lotId = uuid(waste.lotId); const reason = text(waste.reason, 'Lý do hao hụt', 1000);
        if (typeof waste.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(waste.quantity)) throw new BadRequestException('Số lượng hao hụt không hợp lệ.');
        const quantity = new Prisma.Decimal(waste.quantity);
        if (quantity.lte(0)) throw new BadRequestException('Số lượng hao hụt phải lớn hơn 0.');
        const updated = await tx.$executeRaw`UPDATE staff_kitchen_balances SET reserved_waste=reserved_waste+${quantity} WHERE branch_id=${user.branchId}::uuid AND material_lot_id=${lotId}::uuid AND quantity-reserved_waste-reserved_return-COALESCE((SELECT SUM(r.quantity) FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id WHERE r.branch_id=${user.branchId}::uuid AND d.material_lot_id=${lotId}::uuid AND r.status='PENDING' AND NOT r.stock_reserved),0) >= ${quantity}`;
        if (updated !== 1) throw new BadRequestException('Hao hụt vượt tồn bếp còn lại sau khi chế biến.');
        const code = `HH-${randomUUID().replaceAll('-', '').slice(0,12).toUpperCase()}`;
        await tx.$executeRaw`INSERT INTO staff_kitchen_waste(code,actor_id,branch_id,material_lot_id,order_line_id,quantity,reason,status) VALUES (${code},${user.id}::uuid,${user.branchId}::uuid,${lotId}::uuid,${line.id}::uuid,${quantity},${reason},'PENDING')`;
      }
      const result = await tx.orderLine.update({ where: { id: line.id }, data: { status: status as 'COOKING' | 'READY' | 'SERVED', ...(status === 'COOKING' ? { cookingAt: new Date() } : status === 'READY' ? { readyAt: new Date() } : { servedAt: new Date() }) } });
      await this.audit(tx, user, `LINE_${status}`, id, status === 'READY' ? 'Trừ tồn bếp theo công thức BOM' : 'Không thay đổi tồn kho');
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

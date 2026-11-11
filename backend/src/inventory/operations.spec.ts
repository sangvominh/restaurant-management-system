import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { type AdminUser } from '../admin/admin-auth.service.js';
import { InventoryService } from './inventory.service.js';
import { ProductReceiptsService } from './product-receipts.service.js';
import { StoreService } from './store.service.js';
import { SalesService } from '../sales/sales.service.js';
import { ExecutionService } from '../production/execution.service.js';
import { daysRemaining, vietnamDay } from './expiry.js';
import { lotDates, lotStocks, takeLots } from './product-lots.js';
import { productAvailability } from './product-availability.js';

const id = '00000000-0000-4000-8000-000000000001';
const d = (n: string | number) => new Prisma.Decimal(n);
const user: AdminUser = { id, username: 'qa', name: 'QA', roleName: 'QA', permissions: ['*'] };
const model = () => ({ findUnique: vi.fn(), findUniqueOrThrow: vi.fn(), findMany: vi.fn().mockResolvedValue([]), create: vi.fn(), createMany: vi.fn(), update: vi.fn(), updateMany: vi.fn(), aggregate: vi.fn(), count: vi.fn().mockResolvedValue(0) });
function setup() {
  const tx = { employee: model(), materialReceipt: model(), materialMovement: model(), productReceipt: model(), productLot: model(), productMovement: model(), productLotMovement: model(), storeDispatch: model(), storeMovement: model(), saleLine: model(), sale: model(), payment: model(), productionOrder: model(), productionRun: model(), materialIssue: model(), materialIssueLine: model(), materialReturn: model(), waste: model(), $queryRaw: vi.fn(), $queryRawUnsafe: vi.fn() };
  tx.employee.findUnique.mockResolvedValue({ id, status: 'ACTIVE' });
  const db = { ...tx, $transaction: (work: (client: typeof tx) => unknown) => work(tx) } as unknown as PrismaService;
  return { tx, db, client: tx as unknown as Prisma.TransactionClient };
}
const lot = (key: string, expiry: string, warehouse = 0, store = 0, held = 0) => ({ id: key, code: key, expiryDate: new Date(expiry), ledger: [{ location: 'WAREHOUSE', quantity: d(warehouse) }, { location: 'STORE', quantity: d(store) }], dispatchAllocations: [{ quantity: d(held) }], adjustments: [] as { quantity: Prisma.Decimal }[], disposals: [] });

describe('HSD, lô và giữ tồn cửa hàng', () => {
  beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date('2026-11-11T12:00:00Z')); });
  afterEach(() => vi.useRealTimers());
  it('HSD còn dùng hết ngày Việt Nam, qua 00:00 mới quá hạn', () => {
    expect(vietnamDay(new Date('2026-11-11T16:59:59Z'))).toBe('2026-11-11');
    expect(vietnamDay(new Date('2026-11-11T17:00:00Z'))).toBe('2026-11-12');
    expect(daysRemaining('2026-11-11', '2026-11-11')).toBe(0);
    expect(daysRemaining('2026-11-11', '2026-11-12')).toBe(-1);
    expect(daysRemaining(null)).toBeNull();
  });
  it.each([['2026-02-30', '2026-12-01'], ['2026-11-12', '2026-12-01'], ['2026-11-10', '2026-11-09']])('chặn NSX/HSD sai: %s / %s', (start, end) => {
    expect(() => lotDates(start, end)).toThrow();
  });
  it('chấp nhận lô hết hạn hôm nay', () => { expect(lotDates('2026-11-10', '2026-11-11').expiryDate).toEqual(new Date('2026-11-11')); });
  it('phân bổ đúng lượng thập phân theo thứ tự FEFO đầu vào', () => {
    expect(takeLots([{ id: 'first', q: d('0.1') }, { id: 'second', q: d('0.3') }], d('0.3'), l => l.q).map(l => [l.lotId, String(l.quantity)])).toEqual([['first', '0.1'], ['second', '0.2']]);
  });
  it('không phân bổ một phần khi thiếu tồn', () => { expect(() => takeLots([{ id, q: d(1) }], d(2), l => l.q)).toThrow('Không đủ'); });
  it('lô hết hạn và lượng chờ chuyển không được dùng; lịch sử vẫn còn', async () => {
    const { tx, client } = setup();
    tx.productLot.findMany.mockResolvedValue([lot('expired', '2026-11-10', 8, 3), lot('today', '2026-11-11', 5, 2, 4)]);
    const rows = await lotStocks(client, id);
    expect(rows.map(l => [l.id, String(l.warehouseAvailable), String(l.storeAvailable)])).toEqual([['expired', '0', '0'], ['today', '1', '2']]);
    expect(rows[0].warehouse.toString()).toBe('8');
    expect(tx.productLot.findMany.mock.calls[0][0].orderBy[0]).toEqual({ expiryDate: 'asc' });
  });
  it('đơn trước giữ tồn trước; hết hạn, phiếu hoàn chờ và tồn cũ không lô không bán được', async () => {
    const { tx, client } = setup(); const valid = lot('valid', '2026-11-12', 0, 5);
    valid.adjustments = [{ quantity: d(1) }];
    tx.productLot.findMany.mockResolvedValue([lot('expired', '2026-11-10', 0, 9), valid]);
    tx.storeMovement.findMany.mockResolvedValue([{ movementType: 'IN_TRANSFER', quantity: d(17) }]);
    tx.saleLine.findMany.mockResolvedValue([{ id: 'first', quantity: d(3) }, { id: 'second', quantity: d(2) }]);
    const result = await productAvailability(client, id);
    expect(result.allocations.map(a => [a.lineId, String(a.ready), String(a.missing)])).toEqual([['first', '3', '0'], ['second', '1', '1']]);
    expect(String(result.available)).toBe('0'); expect(String(result.expired)).toBe('9'); expect(String(result.untracked)).toBe('3');
    expect(tx.saleLine.findMany.mock.calls[0][0].where.sale.status).toBe('CONFIRMED');
  });
});

describe('Ghi sổ nhập và chuyển kho', () => {
  it('nhập NVL chỉ tăng tồn kho một lần', async () => {
    const { tx, db } = setup(); const receipt = { id, status: 'DRAFT', supplier: { status: 'ACTIVE' }, lines: [{ id, lotId: id, quantity: d(5), unitPrice: d(20), lot: { material: { status: 'ACTIVE' }, expiryDate: null } }] };
    tx.materialReceipt.findUniqueOrThrow.mockResolvedValue(receipt);
    tx.materialReceipt.update.mockImplementation(() => { receipt.status = 'POSTED'; return receipt; });
    await new InventoryService(db).post(id);
    await expect(new InventoryService(db).post(id)).rejects.toThrow('ghi lần hai');
    expect(tx.materialMovement.create).toHaveBeenCalledTimes(1);
    expect(tx.materialMovement.create.mock.calls[0][0].data).toMatchObject({ fromSource: 'BEN_NGOAI', toSource: 'TRONG_KHO', quantity: d(5) });
  });
  it('nhập mua TP tạo lô và hai sổ đồng nhất; không ghi lặp', async () => {
    const { tx, db } = setup(); const receipt = { id, status: 'DRAFT', supplier: { status: 'ACTIVE' }, lines: [{ id, productId: id, product: { status: 'ACTIVE', supplyType: 'PURCHASED' }, lotCode: 'QA', manufacturedAt: new Date('2020-01-01'), expiryDate: new Date('2099-01-01'), quantity: d(5) }] };
    tx.productReceipt.findUniqueOrThrow.mockResolvedValue(receipt); tx.productLot.create.mockResolvedValue({ id });
    tx.productReceipt.update.mockImplementation(() => { receipt.status = 'POSTED'; return receipt; });
    await new ProductReceiptsService(db).post(id, user);
    await expect(new ProductReceiptsService(db).post(id, user)).rejects.toThrow('ghi sổ');
    expect(tx.productLot.create).toHaveBeenCalledTimes(1);
    expect(tx.productMovement.create.mock.calls[0][0].data).toMatchObject({ quantity: d(5), movementType: 'NHAP_MUA' });
    expect(tx.productLotMovement.create.mock.calls[0][0].data).toMatchObject({ location: 'WAREHOUSE', quantity: d(5) });
  });
  it.each([true, false])('duyệt chuyển (%s): giảm kho, tăng cửa hàng chỉ khi đồng ý', async approve => {
    const { tx, db } = setup(); const doc = { id, status: 'PENDING', lines: [{ id, productId: id, product: { status: 'ACTIVE' }, quantity: d(2), lotAllocations: [{ lotId: id, quantity: d(2), lot: { code: 'QA' } }] }] };
    tx.storeDispatch.findUniqueOrThrow.mockResolvedValue(doc); tx.productLot.findMany.mockResolvedValue([lot(id, '2099-01-01', 5)]);
    tx.storeDispatch.update.mockImplementation(() => { doc.status = approve ? 'APPROVED' : 'REJECTED'; return doc; });
    const svc = new StoreService(db); await svc.review(id, approve, user);
    await expect(svc.review(id, approve, user)).rejects.toThrow('đã xử lý');
    expect(tx.productMovement.create).toHaveBeenCalledTimes(approve ? 1 : 0);
    if (approve) expect(tx.productLotMovement.createMany.mock.calls[0][0].data.map((m: { quantity: Prisma.Decimal }) => String(m.quantity))).toEqual(['-2', '2']);
    expect(tx.storeMovement.create).toHaveBeenCalledTimes(approve ? 1 : 0);
  });
});

describe('Cấp NVL, chế biến và nghiệm thu', () => {
  function execution() {
    const ctx = setup(); ctx.tx.productionOrder.findUniqueOrThrow.mockResolvedValue({ id, assignedToId: id, status: 'RECEIVED', quantity: d(5), bom: { productId: id, lines: [{ materialId: id }] } });
    return { ...ctx, svc: new ExecutionService(ctx.db) };
  }
  it('không có quyền duyệt thì không được ghi sổ', async () => {
    const { svc, tx } = execution(); await expect(svc.act(id, { action: 'approveIssue' }, { ...user, permissions: ['material:request'] })).rejects.toThrow('Chưa có quyền'); expect(tx.materialMovement.create).not.toHaveBeenCalled();
  });
  it('từ chối cấp bắt buộc ghi phản hồi', async () => { const { svc } = execution(); await expect(svc.act(id, { action: 'rejectIssue', targetId: id }, user)).rejects.toThrow('lý do'); });
  it('duyệt cấp lưu số thực cấp và chuyển NVL từ kho sang bếp', async () => {
    const { svc, tx } = execution(); tx.materialIssue.findUniqueOrThrow.mockResolvedValue({ id, productionOrderId: id, status: 'PENDING', lines: [{ id, lotId: id, requestedQuantity: d(3), lot: { material: { status: 'ACTIVE' }, expiryDate: null, movements: [{ toSource: 'TRONG_KHO', quantity: d(5) }] } }] });
    await svc.act(id, { action: 'approveIssue', targetId: id, reviewNote: 'Đã giao' }, user);
    expect(tx.materialIssueLine.update.mock.calls[0][0].data.issuedQuantity).toEqual(d(3));
    expect(tx.materialMovement.create.mock.calls[0][0].data).toMatchObject({ fromSource: 'TRONG_KHO', toSource: 'DA_CAP' });
  });
  it.each(['return', 'waste', 'run'])('không được dùng vượt NVL còn lại: %s', async action => {
    const { svc, tx } = execution(); tx.productionRun.aggregate.mockResolvedValue({ _sum: { actualQuantity: d(0) } });
    tx.materialIssueLine.findUniqueOrThrow.mockResolvedValue({ id, issuedQuantity: d(5), issue: { productionOrderId: id, status: 'APPROVED' }, consumptions: [{ quantity: d(2) }], returnLines: [{ quantity: d(1), return: { status: 'PENDING' } }], wasteLines: [{ quantity: d(1), waste: { status: 'APPROVED' } }] });
    await expect(svc.act(id, { action, targetId: id, quantity: '2', reason: 'QA', lines: [{ issueLineId: id, quantity: '2' }] }, user)).rejects.toThrow();
    expect(tx.materialMovement.create).not.toHaveBeenCalled(); expect(tx.productionRun.create).not.toHaveBeenCalled();
  });
  it('người làm có quyền nghiệm thu được duyệt chính sản lượng của mình; chỉ phần đạt nhập kho', async () => {
    const { svc, tx } = execution(); const run = { id, productionOrderId: id, status: 'PENDING', performedById: id, actualQuantity: d(5) };
    tx.productionRun.findUniqueOrThrow.mockResolvedValue(run); tx.productLot.create.mockResolvedValue({ id }); tx.productionRun.update.mockImplementation(() => { run.status = 'INSPECTED'; return run; });
    const payload = { action: 'inspect', targetId: id, quantity: '4', reason: '1 phần không đạt', manufacturedAt: '2020-01-01', expiryDate: '2099-01-01' };
    await svc.act(id, payload, user); await expect(svc.act(id, payload, user)).rejects.toThrow('đã nghiệm thu');
    expect(tx.productMovement.create).toHaveBeenCalledTimes(1); expect(tx.productMovement.create.mock.calls[0][0].data.quantity).toEqual(d(4));
    expect(tx.productLotMovement.create.mock.calls[0][0].data.quantity).toEqual(d(4));
  });
  it('chế biến tiêu hao phần đã cấp, không trừ kho lần nữa và chưa tăng TP trước nghiệm thu', async () => {
    const { svc, tx } = execution(); tx.productionRun.aggregate.mockResolvedValue({ _sum: { actualQuantity: null } });
    tx.materialIssueLine.findUniqueOrThrow.mockResolvedValue({ issuedQuantity: d(5), issue: { productionOrderId: id, status: 'APPROVED' }, consumptions: [], returnLines: [], wasteLines: [], lot: { expiryDate: null } });
    tx.productionRun.create.mockResolvedValue({ consumptions: [{ id, quantity: d(3), issueLine: { lotId: id } }] });
    await svc.act(id, { action: 'run', quantity: '2', lines: [{ issueLineId: id, quantity: '3' }] }, user);
    expect(tx.materialMovement.create.mock.calls[0][0].data).toMatchObject({ fromSource: 'DA_CAP', toSource: 'DA_SU_DUNG', quantity: d(3) });
    expect(tx.productMovement.create).not.toHaveBeenCalled(); expect(tx.productLot.create).not.toHaveBeenCalled();
  });
  it.each(['approveReturn', 'approveWaste'])('%s chỉ giảm phần ở bếp; hoàn tăng kho, hao hụt vào sổ hủy', async action => {
    const { svc, tx } = execution(); const doc = { id, status: 'PENDING', lines: [{ id, quantity: d(1), sourceType: 'DA_CAP', issueLine: { lotId: id, issue: { productionOrderId: id }, lot: { expiryDate: null } } }] };
    const target = action === 'approveReturn' ? tx.materialReturn : tx.waste; target.findUniqueOrThrow.mockResolvedValue(doc);
    target.update.mockImplementation(() => { doc.status = 'APPROVED'; return doc; });
    await svc.act(id, { action, targetId: id }, user); await expect(svc.act(id, { action, targetId: id }, user)).rejects.toThrow('không thể duyệt');
    expect(tx.materialMovement.create).toHaveBeenCalledTimes(1);
    expect(tx.materialMovement.create.mock.calls[0][0].data).toMatchObject({ fromSource: 'DA_CAP', toSource: action === 'approveReturn' ? 'TRONG_KHO' : 'DA_HUY' });
  });
  it('lô hết hạn không hoàn lại kho sử dụng được', async () => {
    const { svc, tx } = execution(); tx.materialReturn.findUniqueOrThrow.mockResolvedValue({ status: 'PENDING', lines: [{ issueLine: { issue: { productionOrderId: id }, lot: { expiryDate: new Date('2000-01-01') } } }] });
    await expect(svc.act(id, { action: 'approveReturn', targetId: id }, user)).rejects.toThrow('Lô hết hạn'); expect(tx.materialMovement.create).not.toHaveBeenCalled();
  });
});

describe('Thanh toán cửa hàng', () => {
  it.each(['shortage', 'version', 'draft'])('chặn thu tiền khi %s và không ghi giảm tồn', async scenario => {
    const { tx, db } = setup(); const line = { id, productId: id, quantity: d(2), unitPrice: d(100), sentAt: scenario === 'draft' ? null : new Date() };
    tx.sale.findUniqueOrThrow.mockResolvedValue({ id, version: 1, status: 'CONFIRMED', payment: null, lines: [line], exports: [] }); tx.saleLine.findMany.mockResolvedValue([line]);
    await expect(new SalesService(db).action(id, 'pay', { method: 'CASH', version: scenario === 'version' ? 0 : 1 }, user)).rejects.toThrow();
    expect(tx.payment.create).not.toHaveBeenCalled(); expect(tx.storeMovement.create).not.toHaveBeenCalled(); expect(tx.productLotMovement.createMany).not.toHaveBeenCalled();
  });
  it('thu tiền trừ đúng lô và tồn cửa hàng, không trừ lại kho; chặn thanh toán hai lần', async () => {
    const { tx, db } = setup(); const line = { id, productId: id, quantity: d(2), unitPrice: d(100), sentAt: new Date(), lotMovements: [], changes: [], replenishments: [] };
    const sale = { id, version: 1, status: 'CONFIRMED', payment: null, lines: [line], exports: [] };
    tx.sale.findUniqueOrThrow.mockResolvedValue(sale); tx.saleLine.findMany.mockResolvedValue([line]); tx.productLot.findMany.mockResolvedValue([lot(id, '2099-01-01', 0, 5)]); tx.storeMovement.findMany.mockResolvedValue([{ movementType: 'IN_TRANSFER', quantity: d(5) }]);
    tx.sale.update.mockImplementation(() => { sale.status = 'COMPLETED'; return sale; });
    const svc = new SalesService(db); await svc.action(id, 'pay', { method: 'CASH', version: 1 }, user);
    await expect(svc.action(id, 'pay', { method: 'CASH', version: 1 }, user)).rejects.toThrow('chưa thanh toán');
    expect(tx.payment.create).toHaveBeenCalledTimes(1); expect(tx.payment.create.mock.calls[0][0].data.amount).toEqual(d(200));
    expect(tx.productLotMovement.createMany.mock.calls[0][0].data[0].quantity).toEqual(d(-2));
    expect(tx.storeMovement.create.mock.calls[0][0].data.movementType).toBe('SALE'); expect(tx.productMovement.create).not.toHaveBeenCalled();
  });
});

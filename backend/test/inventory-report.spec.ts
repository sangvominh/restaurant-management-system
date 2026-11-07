import { InventoryReportApi, inventoryReportPeriod } from '../src/warehouse/api/inventory-report.api.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';

describe('Inventory period report', () => {
  const now = new Date('2026-11-07T05:00:00Z');
  it.each([
    ['MONTH', { month: '11' }, '2026-10-31T17:00:00.000Z', '2026-11-30T17:00:00.000Z'],
    ['QUARTER', { quarter: '4' }, '2026-09-30T17:00:00.000Z', '2026-12-31T17:00:00.000Z'],
    ['YEAR', {}, '2025-12-31T17:00:00.000Z', '2026-12-31T17:00:00.000Z'],
    ['MONTH', { month: '2', year: '2024' }, '2024-01-31T17:00:00.000Z', '2024-02-29T17:00:00.000Z'],
  ])('uses Vietnam calendar boundaries for %s', (period, extra, start, end) => {
    const result = inventoryReportPeriod({ year: '2026', period, ...extra }, now);
    expect(result.start.toISOString()).toBe(start);
    expect(result.end.toISOString()).toBe(end);
  });
  it.each([
    { period: 'DAY' }, { itemType: 'OTHER' }, { year: 'NaN' }, { year: '1999' },
    { month: '13' }, { month: '1.5' }, { period: 'QUARTER', quarter: '0' },
    { year: '2099' },
  ])('rejects invalid periods %j', query => {
    expect(() => inventoryReportPeriod(query, now)).toThrow();
  });
  it('defaults the calendar to Vietnam rather than the server timezone', () => {
    expect(inventoryReportPeriod({}, new Date('2026-12-31T17:01:00Z'))).toMatchObject({ year: 2027, month: 1 });
  });
  it.each(['MATERIAL', 'PRODUCT'])('queries full ledger for %s with bound parameters', async itemType => {
    const db = { $queryRaw: vi.fn().mockResolvedValue([]) };
    const result = await new InventoryReportApi(db as unknown as PrismaService).getReport({ itemType, year: '2025', period: 'YEAR' });
    const sql = db.$queryRaw.mock.calls[0][0];
    expect(sql.sql).not.toMatch(/\bLIMIT\b/i);
    expect(sql.sql).toContain(itemType === 'MATERIAL' ? 'inventory_movements' : 'finished_goods_movements');
    expect(sql.values[0]).toEqual(new Date('2024-12-31T17:00:00.000Z'));
    expect(result.data.rows).toEqual([]);
    expect(result.data.warnings).toEqual([]);
  });
  it('keeps unknown stock nullable and warns about missing history or Product', async () => {
    const rows = [{ code: 'OLD', opening: null, closing: '20', historyComplete: false, missingMetadata: true }];
    const db = { $queryRaw: vi.fn().mockResolvedValue(rows) };
    const result = await new InventoryReportApi(db as unknown as PrismaService).getReport({ year: '2025', period: 'YEAR' });
    expect(result.data.rows).toEqual(rows);
    expect(result.data.warnings).toHaveLength(2);
  });
});

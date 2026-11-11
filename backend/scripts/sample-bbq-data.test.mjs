import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createSampleData, INSERT_ORDER, sampleId, sampleSummary } from './sample-bbq-data.mjs';
import { sampleAlreadyPresent } from './seed-sample.mjs';

const number = value => Math.round(Number(value) * 1000);
const sum = (rows, key = 'quantity') => rows.reduce((total, row) => total + number(row[key]), 0);
const scalarTypes = new Set(['String', 'Int', 'Decimal', 'DateTime', 'Boolean', 'Float', 'Json', 'BigInt', 'Bytes']);
const schemaDirectory = new URL('../prisma/', import.meta.url);
const schema = (await Promise.all((await readdir(schemaDirectory)).filter(f => f.endsWith('.prisma')).map(f => readFile(new URL(f, schemaDirectory), 'utf8')))).join('\n');
const models = new Map([...schema.matchAll(/model\s+(\w+)\s*\{([^}]+)\}/g)].map(([, name, body]) => [name, body]));

for (const scenario of ['service', 'sold-out']) {
  const data = createSampleData({ date: '2026-11-10', scenario });
  const { rows } = data;
  const get = (model, id) => (rows[model] || []).find(row => row.id === id);
  test(`${scenario}: all fields, required scalars and relations match current Prisma schema`, () => {
    assert.equal(Object.keys(rows).filter(t => !INSERT_ORDER.includes(t)).length, 0);
    for (const [model, records] of Object.entries(rows)) {
      assert.ok(models.has(model), model);
      const fields = [...models.get(model).matchAll(/^\s*(\w+)\s+(\w+)(\?|\[\])?([^\n]*)/gm)].map(([, name, type, modifier, attributes]) => ({ name, type, modifier, attributes }));
      for (const row of records) {
        for (const key of Object.keys(row)) assert.ok(fields.some(f => f.name === key && scalarTypes.has(f.type)), `${model}.${key}`);
        for (const field of fields.filter(f => scalarTypes.has(f.type) && f.modifier !== '?' && !f.attributes.includes('@default') && !f.attributes.includes('@updatedAt'))) assert.notEqual(row[field.name], undefined, `${model}.${field.name}`);
        for (const field of fields) {
          const relation = field.attributes.match(/fields:\s*\[([^\]]+)\],\s*references:\s*\[([^\]]+)\]/);
          if (!relation) continue;
          const sourceFields = relation[1].split(',').map(s => s.trim());
          const targetFields = relation[2].split(',').map(s => s.trim());
          if (sourceFields.some(key => row[key] == null)) continue;
          assert.ok(rows[field.type]?.some(target => targetFields.every((key, n) => target[key] === row[sourceFields[n]])), `${model}.${field.name}: missing relation`);
          assert.ok(INSERT_ORDER.indexOf(field.type) < INSERT_ORDER.indexOf(model), `${field.type} must precede ${model}`);
        }
      }
    }
  });
  test(`${scenario}: each ledger entry has exactly one matching document source`, () => {
    for (const [table, sources] of [
      ['MaterialMovement', { receiptLineId: 'MaterialReceiptLine', issueLineId: 'MaterialIssueLine', consumptionLineId: 'ConsumptionLine', returnLineId: 'MaterialReturnLine', wasteLineId: 'WasteLine' }],
      ['ProductMovement', { dispatchLineId: 'StoreDispatchLine', storeAdjustmentId: 'StoreAdjustment', runId: 'ProductionRun', exportLineId: 'ProductExportLine', wasteLineId: 'WasteLine' }],
      ['StoreMovement', { dispatchLineId: 'StoreDispatchLine', saleLineId: 'SaleLine', adjustmentId: 'StoreAdjustment' }],
    ]) {
      const seen = new Set();
      for (const movement of rows[table]) {
        assert.ok(number(movement.quantity) > 0);
        const keys = Object.keys(sources).filter(key => movement[key]);
        assert.equal(keys.length, 1, `${table}: ambiguous source`);
        const key = keys[0], document = get(sources[key], movement[key]);
        assert.ok(document);
        const quantity = key === 'runId' ? document.acceptedQuantity : document.quantity ?? document.issuedQuantity;
        assert.equal(number(movement.quantity), number(quantity));
        const uniqueKey = `${key}:${document.id}`;
        assert.ok(!seen.has(uniqueKey), 'duplicate ledger source');
        seen.add(uniqueKey);
      }
    }
  });
  test(`${scenario}: warehouse, store and material balances never go negative over time`, () => {
    for (const [table, idField, places] of [
      ['MaterialMovement', 'lotId', ['TRONG_KHO', 'DA_CAP']],
      ['ProductMovement', 'productId', ['warehouse']],
      ['StoreMovement', 'productId', ['store']],
    ]) {
      for (const place of places) {
        const changes = new Map();
        for (const m of rows[table]) {
          const change = table === 'MaterialMovement' ? (m.toSource === place ? number(m.quantity) : 0) - (m.fromSource === place ? number(m.quantity) : 0)
            : number(m.quantity) * (table === 'ProductMovement' ? ['NHAP_SAN_XUAT', 'HOAN_CUA_HANG'].includes(m.movementType) ? 1 : -1 : m.movementType === 'IN_TRANSFER' ? 1 : -1);
          const key = `${m.postedAt}|${m[idField]}`;
          changes.set(key, (changes.get(key) || 0) + change);
        }
        const balances = new Map();
        for (const [key, change] of [...changes].sort(([a], [b]) => a.localeCompare(b))) {
          const id = key.split('|')[1];
          const balance = (balances.get(id) || 0) + change;
          assert.ok(balance >= 0, `${table}/${place}/${id}: ${balance}`);
          balances.set(id, balance);
        }
      }
    }
    for (const m of rows.MaterialMovement.filter(m => m.toSource === 'DA_CAP' || m.toSource === 'DA_SU_DUNG')) {
      const lot = get('MaterialLot', m.lotId);
      const localDay = new Date(Date.parse(m.postedAt) + 7 * 3600000).toISOString().slice(0, 10);
      assert.ok(!lot.expiryDate || localDay <= lot.expiryDate, 'expired ingredients used');
    }
  });
  test(`${scenario}: payments equal line totals and only completed sales reduce stock`, () => {
    for (const sale of rows.Sale) {
      const lines = rows.SaleLine.filter(l => l.saleId === sale.id);
      const payment = rows.Payment.find(p => p.saleId === sale.id);
      if (sale.status === 'COMPLETED') {
        assert.equal(payment.status, 'PAID');
        assert.equal(Math.round(Number(payment.amount) * 100), lines.reduce((cents, l) => cents + Math.round(Number(l.quantity) * Number(l.unitPrice) * 100), 0));
        assert.equal(payment.paidAt, sale.closedAt);
      } else assert.equal(payment, undefined);
      for (const l of lines) {
        const movements = rows.StoreMovement.filter(m => m.saleLineId === l.id);
        assert.equal(movements.length, sale.status === 'COMPLETED' && number(l.quantity) > 0 ? 1 : 0);
        assert.ok(sum(rows.Serving.filter(s => s.saleLineId === l.id)) <= number(l.quantity));
        if (sale.status === 'CANCELLED') assert.equal(number(l.quantity), 0);
      }
    }
    assert.deepEqual(new Set(rows.Payment.map(p => p.method)), new Set(['CASH', 'TRANSFER']));
    assert.ok(rows.SaleLine.some(l => l.unitPrice === '920000.00'));
    assert.ok(rows.Product.some(p => p.sellingPrice === '980000.00'));
  });
  test(`${scenario}: closed production accounts for all issued materials without counting rejected output twice`, () => {
    for (const order of rows.ProductionOrder.filter(o => o.status === 'COMPLETED')) {
      const runs = rows.ProductionRun.filter(r => r.productionOrderId === order.id);
      assert.equal(sum(runs, 'actualQuantity'), number(order.quantity));
      assert.ok(runs.every(r => r.status === 'INSPECTED' && number(r.acceptedQuantity) <= number(r.actualQuantity)));
      for (const issue of rows.MaterialIssue.filter(i => i.productionOrderId === order.id)) {
        for (const line of rows.MaterialIssueLine.filter(l => l.issueId === issue.id)) {
          const used = sum(rows.ConsumptionLine.filter(c => c.issueLineId === line.id));
          const returned = sum((rows.MaterialReturnLine || []).filter(r => r.issueLineId === line.id && get('MaterialReturn', r.returnId).status === 'APPROVED'));
          const wasted = sum(rows.WasteLine.filter(w => w.issueLineId === line.id && get('Waste', w.wasteId).status === 'APPROVED'));
          assert.equal(number(line.issuedQuantity), used + returned + wasted);
        }
      }
    }
    for (const run of rows.ProductionRun.filter(r => r.status === 'PENDING')) assert.ok(!rows.ProductMovement.some(m => m.runId === run.id));
    assert.equal(rows.ProductExport, undefined);
    assert.equal(rows.ReplenishmentRequest, undefined);
  });
  test(`${scenario}: deterministic data has six historical service days and valid reservations`, () => {
    assert.equal(data.historyDays.length, 6);
    assert.ok(data.historyDays.every(day => new Date(day).getUTCDay() !== 1));
    assert.deepEqual(data, createSampleData({ date: '2026-11-10', scenario }));
    for (const summary of sampleSummary(data)) assert.ok(Number(summary.available) >= 0);
    const ids = Object.values(rows).flatMap(records => records.map(r => r.id).filter(Boolean));
    assert.equal(ids.length, new Set(ids).size);
  });
}

test('service: finite stock, pending holds, fractional sales and sold-out menu items', () => {
  const data = createSampleData({ date: '2026-11-10' });
  const summaries = sampleSummary(data);
  const item = code => summaries.find(s => s.code === `BBQ-TP-${code}`);
  assert.equal(item('BRISKET').stock, '0.000');
  assert.equal(item('BRISKET').warehouse, '2.500');
  assert.equal(item('RIBS').stock, '0.750');
  assert.equal(item('RIBS').available, '0.250');
  assert.equal(item('CORN').available, '0.000');
  assert.equal(item('BEANS').held, '1.000');
  assert.equal(item('BEANS').available, '2.000');
  assert.equal(data.rows.Sale.filter(s => s.status === 'DRAFT').length, 1);
  assert.equal(data.rows.Account.filter(a => a.status === 'INACTIVE').length, 1);
  assert.ok(data.rows.MaterialLot.some(l => l.expiryDate && l.expiryDate < data.date));
});
test('sold-out: no available or reserved finished goods and no open customer orders', () => {
  const data = createSampleData({ date: '2026-11-10', scenario: 'sold-out' });
  for (const item of sampleSummary(data)) for (const key of ['warehouse', 'stock', 'reserved', 'held', 'available']) assert.equal(item[key], '0.000');
  assert.ok(data.rows.Sale.every(s => ['COMPLETED', 'CANCELLED'].includes(s.status)));
  assert.ok(data.rows.ProductionOrder.some(o => o.status === 'NEW' && o.dueAt > data.snapshotAt));
});
test('reject malformed dates/scenarios', () => {
  for (const date of ['2026-02-30', '2026-13-01', 'bad']) assert.throws(() => createSampleData({ date }));
  assert.throws(() => createSampleData({ scenario: 'made-to-order' }));
});
test('reimport checks reject a partial dataset and a different scenario', async () => {
  const data = createSampleData({ date: '2026-11-10' });
  const empty = { query: async () => ({ rowCount: 0, rows: [] }) };
  assert.equal(await sampleAlreadyPresent(empty, data), false);
  const partial = { query: async sql => sql.includes('username') ? { rowCount: 1 } : { rows: [{ count: 0 }] } };
  await assert.rejects(sampleAlreadyPresent(partial, data), /một phần/);
  const existing = { query: async (sql, params) => sql.includes('username') ? { rowCount: 9 } : sql.includes('count(*)') ? { rows: [{ count: params[0].length }] } : { rowCount: 0 } };
  assert.equal(await sampleAlreadyPresent(existing, data), true);
  const alternate = { query: async (sql, params) => sql.includes('WHERE id=$1') ? { rowCount: 1, rows: [{ id: sampleId('Sale:KHACH-CUOI') }] } : existing.query(sql, params) };
  await assert.rejects(sampleAlreadyPresent(alternate, data), /scenario khác/);
});

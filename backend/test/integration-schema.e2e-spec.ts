import { Client } from 'pg';
import { randomUUID } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';

const enabled = process.env.RUN_INTEGRATION_SCHEMA_E2E === '1';
const directory = new URL('../prisma/migrations/', import.meta.url);
const categoryMigration = '20261030161905_category_code';
const productMigration = '20261029200000_add_product_table';

function testUrl() {
  const value = process.env.WAREHOUSE_TEST_DATABASE_URL;
  if (!value) throw new Error('Set WAREHOUSE_TEST_DATABASE_URL');
  const url = new URL(value);
  if (!['localhost', '127.0.0.1'].includes(url.hostname) ||
      url.pathname !== '/restaurant_integration_test') {
    throw new Error('Only the dedicated local restaurant_integration_test is allowed');
  }
  return value;
}

async function migrations() {
  return (await readdir(directory, { withFileTypes: true }))
    .filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
}

async function sql(name: string) {
  const value = await readFile(new URL(name + '/migration.sql', directory), 'utf8');
  if (/\b(?:CREATE|ALTER|DROP) DATABASE\b|\bpublic\./i.test(value)) {
    throw new Error('Migration is not isolated: ' + name);
  }
  return value;
}

// All legacy fixtures and DDL disappear on rollback, even after a failed migration.
async function legacy(before: string, verify: (db: Client) => Promise<void>) {
  const db = new Client({ connectionString: testUrl() });
  await db.connect();
  try {
    await db.query('BEGIN');
    const schema = 'integration_schema_' + randomUUID().replaceAll('-', '');
    await db.query('CREATE SCHEMA "' + schema + '"');
    await db.query('SET LOCAL search_path TO "' + schema + '"');
    for (const name of await migrations()) {
      if (name >= before) break;
      await db.query(await sql(name));
    }
    await verify(db);
  } finally {
    try { await db.query('ROLLBACK'); } finally { await db.end(); }
  }
}

(enabled ? describe : describe.skip)('Isolated integration database migration', () => {
  it('has every deployed migration and the columns/tables required by the merged code', async () => {
    const db = new Client({ connectionString: testUrl() });
    await db.connect();
    try {
      await db.query('BEGIN READ ONLY');
      const rows = (await db.query(
        'SELECT migration_name FROM public._prisma_migrations WHERE finished_at IS NOT NULL AND rolled_back_at IS NULL ORDER BY migration_name',
      )).rows.map(row => row.migration_name);
      expect(rows).toEqual(await migrations());
      for (const [table, column] of [
        ['categories', 'code'], ['boms', 'product_name'],
        ['staff_material_returns', 'stock_reserved'],
        ['staff_material_returns', 'condition_confirmed'],
        ['staff_material_returns', 'movement_id'], ['staff_material_waste', 'movement_id'],
        ['staff_material_waste', 'decision_note'], ['staff_material_waste', 'processed_at'],
      ]) {
        const result = await db.query(
          'SELECT 1 FROM information_schema.columns WHERE table_schema=$1 AND table_name=$2 AND column_name=$3',
          ['public', table, column],
        );
        expect(result.rowCount, table + '.' + column).toBe(1);
      }
      for (const table of ['material_adjustments', 'material_usage_settlements',
        'staff_kitchen_balances', 'staff_kitchen_sources', 'staff_processing_defects']) {
        const result = await db.query('SELECT to_regclass($1) AS name', ['public.' + table]);
        expect(result.rows[0].name, table).not.toBeNull();
      }
    } finally {
      try { await db.query('ROLLBACK'); } finally { await db.end(); }
    }
  });

  it('backfills seven legacy categories without losing their identifiers or names', async () => {
    await legacy(categoryMigration, async db => {
      for (let index = 1; index <= 7; index++) {
        await db.query("INSERT INTO categories(name,category_type) VALUES ($1,'MATERIAL')", ['Legacy ' + index]);
      }
      const before = (await db.query('SELECT id,name FROM categories ORDER BY name')).rows;
      await db.query(await sql(categoryMigration));
      const after = (await db.query('SELECT id,name,code FROM categories ORDER BY name')).rows;
      expect(after.map(({ id, name }) => ({ id, name }))).toEqual(before);
      expect(new Set(after.map(row => row.code)).size).toBe(7);
      expect(after.every(row => /^DM\d{3}$/.test(row.code))).toBe(true);
    });
  }, 30000);

  it.each(['UNMAPPED-LEGACY', 'TP001'])('blocks the Product upgrade for a legacy BOM (%s), with safe rollback', async productCode => {
    await legacy(productMigration, async db => {
      await db.query("INSERT INTO boms(code,product_code) VALUES ('BOM-LEGACY-TEST',$1)", [productCode]);
      await db.query('SAVEPOINT product_upgrade');
      await expect(db.query(await sql(productMigration))).rejects.toMatchObject({
        code: '23503', constraint: 'boms_product_code_fkey',
      });
      await db.query('ROLLBACK TO SAVEPOINT product_upgrade');
      const row = (await db.query("SELECT product_code FROM boms WHERE code='BOM-LEGACY-TEST'")).rows[0];
      expect(row.product_code).toBe(productCode);
      expect((await db.query("SELECT to_regclass('products') AS name")).rows[0].name).toBeNull();
    });
  }, 30000);
});

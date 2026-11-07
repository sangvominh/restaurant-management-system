import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';

const migration = () =>
  readFile(
    new URL(
      '../prisma/migrations/20261107000300_remove_legacy_report_demo/migration.sql',
      import.meta.url,
    ),
    'utf8',
  );

it('xóa đúng ba bảng có marker demo, giữ bản ghi nghiệp vụ', async () => {
  const pg = await PGlite.create();
  try {
    await pg.exec(`CREATE TABLE demo_materials(id int PRIMARY KEY);
      CREATE TABLE demo_stock_movements(material_id int REFERENCES demo_materials(id));
      CREATE TABLE demo_invoices(id int);
      COMMENT ON TABLE demo_materials IS 'system-admin-demo-v1';
      COMMENT ON TABLE demo_stock_movements IS 'system-admin-demo-v1';
      COMMENT ON TABLE demo_invoices IS 'system-admin-demo-v1';
      CREATE TABLE business_records(id int); INSERT INTO business_records VALUES (7);`);
    await pg.exec(await migration());
    expect(
      (
        await pg.query(
          "SELECT to_regclass('demo_materials') AS materials, to_regclass('demo_invoices') AS invoices, to_regclass('demo_stock_movements') AS movements",
        )
      ).rows[0],
    ).toEqual({ materials: null, invoices: null, movements: null });
    expect((await pg.query('SELECT id FROM business_records')).rows).toEqual([
      { id: 7 },
    ]);
  } finally {
    await pg.close();
  }
}, 30000);

it('giữ bảng cùng tên khi không có marker của bộ demo cũ', async () => {
  const pg = await PGlite.create();
  try {
    await pg.exec(
      'CREATE TABLE demo_materials(id int); CREATE TABLE demo_stock_movements(id int); CREATE TABLE demo_invoices(id int); INSERT INTO demo_invoices VALUES (9);',
    );
    await pg.exec(await migration());
    expect((await pg.query('SELECT id FROM demo_invoices')).rows).toEqual([
      { id: 9 },
    ]);
    expect(
      (
        await pg.query(
          "SELECT count(*)::int AS count FROM pg_class WHERE relname IN ('demo_materials','demo_stock_movements','demo_invoices') AND relkind='r'",
        )
      ).rows[0],
    ).toEqual({ count: 3 });
  } finally {
    await pg.close();
  }
}, 30000);

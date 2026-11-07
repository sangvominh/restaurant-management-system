import { PGlite } from '@electric-sql/pglite';
import { readFile, readdir } from 'node:fs/promises';

it('tích hợp hai lịch sử giữ riêng danh mục kho, quản trị và đóng phiên cũ khi thêm portal', async () => {
  const pg = await PGlite.create();
  try {
    const names = (await readdir(new URL('../prisma/migrations/', import.meta.url))).filter(name => /^\d/.test(name)).sort();
    const apply = async (name: string) => pg.exec(await readFile(new URL(`../prisma/migrations/${name}/migration.sql`, import.meta.url), 'utf8'));
    for (const name of names.filter(name => name < '20261102')) await apply(name);
    await pg.exec(`INSERT INTO system_admin_categories (type, name) VALUES ('Đơn vị', 'Đơn vị quản trị');
      INSERT INTO branches (code,name) VALUES ('UPGRADE-CN01','Chi nhánh đã có');
      INSERT INTO roles (name, permissions, is_system) VALUES ('Admin nâng cấp',ARRAY['*'],true), ('Kho tùy chỉnh',ARRAY['inventory:view'],false);
      INSERT INTO accounts (name,email,role_id) SELECT 'Admin','upgrade@example.com',id FROM roles WHERE is_system;
      INSERT INTO login_logs (account_id,email,status) SELECT id,email,'success' FROM accounts;`);
    const before = await pg.query('SELECT id, type, name FROM system_admin_categories');
    for (const name of names.filter(name => name >= '20261102')) await apply(name);
    expect((await pg.query('SELECT id,type,name FROM system_admin_categories')).rows).toEqual(before.rows);
    expect((await pg.query("SELECT code FROM branches WHERE code='UPGRADE-CN01'")).rows).toHaveLength(1);
    expect((await pg.query("SELECT permissions,portal FROM roles WHERE name='Kho tùy chỉnh'")).rows[0]).toEqual({ permissions: ['inventory:view'], portal: 'warehouse' });
    expect((await pg.query('SELECT session_version FROM accounts')).rows[0]).toMatchObject({session_version:1});
    expect((await pg.query('SELECT logout_at IS NOT NULL AS closed FROM login_logs')).rows[0]).toMatchObject({closed:true});
    await pg.exec("INSERT INTO categories (code,name,category_type) VALUES ('DM-TEST','Nhóm nguyên liệu','MATERIAL')");
    expect((await pg.query('SELECT pg_typeof(id)::text AS type FROM categories')).rows[0]).toEqual({type:'uuid'});
    expect((await pg.query('SELECT pg_typeof(id)::text AS type FROM system_admin_categories')).rows[0]).toEqual({type:'integer'});
  } finally { await pg.close(); }
}, 30000);

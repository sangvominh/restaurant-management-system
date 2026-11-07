import { readFile, readdir } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { hashPassword, verifyPassword } from '../src/auth/password.js';

it('nâng cấp giữ ID nhân viên, mật khẩu và định lượng công thức cũ', async () => {
  const pg = await PGlite.create();
  try {
    const migrations = (
      await readdir(new URL('../prisma/migrations/', import.meta.url))
    )
      .filter((x) => /^\d/.test(x))
      .sort();
    const apply = async (name: string) =>
      pg.exec(
        await readFile(
          new URL(
            `../prisma/migrations/${name}/migration.sql`,
            import.meta.url,
          ),
          'utf8',
        ),
      );
    for (const name of migrations.filter((x) => x < '20261107'))
      await apply(name);
    const hash = hashPassword('Legacy-password-2026');
    await pg.exec(`INSERT INTO branches(id,code,name) VALUES ('10000000-0000-4000-8000-000000000001','LEGACY','Legacy');
      INSERT INTO units(id,name) VALUES ('10000000-0000-4000-8000-000000000002','Legacy-kg');
      INSERT INTO categories(id,code,name,category_type) VALUES ('10000000-0000-4000-8000-000000000003','LEGACY','Legacy','MATERIAL');
      INSERT INTO materials(id,code,name,unit_id,category_id) VALUES ('10000000-0000-4000-8000-000000000004','LEGACY','Legacy','10000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000003');
      INSERT INTO menu_items(id,branch_id,name,category,price) VALUES ('10000000-0000-4000-8000-000000000005','10000000-0000-4000-8000-000000000001','Legacy meal','Meal',10000);
      INSERT INTO staff_demo_order_recipes VALUES ('10000000-0000-4000-8000-000000000005','10000000-0000-4000-8000-000000000004',0.125);`);
    await pg.query(
      `INSERT INTO staff_users(id,code,name,password_hash,role,branch_id) VALUES ('10000000-0000-4000-8000-000000000006','LEGACY','Legacy',$1,'KITCHEN','10000000-0000-4000-8000-000000000001')`,
      [hash],
    );
    for (const name of migrations.filter((x) => x >= '20261107'))
      await apply(name);
    const account = await pg.query<{ id: string; password_hash: string }>(
      'SELECT s.id,a.password_hash FROM staff_users s JOIN accounts a ON a.id=s.account_id',
    );
    expect(account.rows[0].id).toBe('10000000-0000-4000-8000-000000000006');
    expect(
      verifyPassword('Legacy-password-2026', account.rows[0].password_hash),
    ).toBe(true);
    const recipe = await pg.query<{ quantity: string }>(
      'SELECT d.quantity::text AS quantity FROM menu_items m JOIN bom_details d ON d.bom_id=m.bom_id',
    );
    expect(Number(recipe.rows[0].quantity)).toBe(0.125);
    expect(
      (await pg.query("SELECT to_regclass('staff_sessions') AS old_session"))
        .rows[0],
    ).toEqual({ old_session: null });
  } finally {
    await pg.close();
  }
}, 30000);

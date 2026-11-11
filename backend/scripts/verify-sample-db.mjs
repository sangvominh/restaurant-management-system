import { config } from 'dotenv';
import pg from 'pg';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createSampleData, sampleSummary } from './sample-bbq-data.mjs';
import { insertSample, sampleAlreadyPresent } from './seed-sample.mjs';

// Optional PostgreSQL integration QA. Every schema and insert is rolled back.
config({ path: fileURLToPath(new URL('../.env', import.meta.url)), quiet: true });
async function verify() {
  if (!process.env.DATABASE_URL) throw new Error('Thiếu DATABASE_URL.');
  const backend = fileURLToPath(new URL('../', import.meta.url));
  const result = spawnSync(process.execPath, ['node_modules/prisma/build/index.js', 'migrate', 'diff', '--from-empty', '--to-schema', 'prisma', '--script', '--config', 'prisma7.config.ts'], { cwd: backend, encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 });
  if (result.status !== 0) throw new Error('Không tạo được DDL từ Prisma schema hiện tại.');
  const ddl = result.stdout.replace(/CREATE SCHEMA IF NOT EXISTS "public";/g, '');
  if (/"public"\./.test(ddl) || /CREATE SCHEMA/i.test(ddl)) throw new Error('DDL có schema cố định; dừng để tránh tác động bảng hiện có.');
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.delete('schema');
  const client = new pg.Client({ connectionString: url.toString(), connectionTimeoutMillis: 5000 });
  await client.connect();
  try {
    for (const scenario of ['service', 'sold-out']) {
      const schemaName = `bbq_qa_${randomUUID().replaceAll('-', '')}`;
      await client.query('BEGIN');
      try {
        await client.query(`CREATE SCHEMA "${schemaName}"`);
        await client.query("SELECT set_config('search_path', $1, true)", [schemaName]);
        await client.query(ddl);
        // Cover a real DB that already contains these shared natural keys.
        const unitId = randomUUID(), permissionId = randomUUID();
        await client.query('INSERT INTO "Unit" (id,name,symbol) VALUES ($1,$2,$3)', [unitId, 'Đơn vị kg có sẵn', 'kg']);
        await client.query('INSERT INTO "Permission" (id,name,code) VALUES ($1,$2,$3)', [permissionId, 'Quyền có sẵn', '*']);
        const data = createSampleData({ date: '2026-11-10', scenario });
        assert.equal(await sampleAlreadyPresent(client, data), false);
        await insertSample(client, data, 'QA-only-random-' + randomUUID());
        assert.equal(await sampleAlreadyPresent(client, data), true);
        await assert.rejects(sampleAlreadyPresent(client, createSampleData({ date: data.date, scenario: scenario === 'service' ? 'sold-out' : 'service' })));
        for (const item of sampleSummary(data)) {
          const result = await client.query(`SELECT COALESCE(sum(CASE WHEN m."movementType"='IN_TRANSFER' THEN m.quantity ELSE -m.quantity END),0)::text AS stock FROM "StoreMovement" m JOIN "Product" p ON p.id=m."productId" WHERE p.code=$1`, [item.code]);
          assert.equal(Number(result.rows[0].stock), Number(item.stock));
        }
        const kg = await client.query('SELECT name FROM "Unit" WHERE id=$1', [unitId]);
        assert.equal(kg.rows[0].name, 'Đơn vị kg có sẵn');
        console.log(`${scenario}: FK, unique, NOT NULL, decimal/date, shared keys, rerun and stock verified in PostgreSQL.`);
      } finally {
        await client.query('ROLLBACK');
      }
      const check = await client.query('SELECT 1 FROM pg_namespace WHERE nspname=$1', [schemaName]);
      assert.equal(check.rowCount, 0);
    }
    console.log('Đã rollback toàn bộ schema QA và dữ liệu QA. Không nhập bộ mẫu vào bảng ứng dụng.');
  } finally {
    await client.end();
  }
}
verify().catch(error => {
  console.error('Kiểm chứng PostgreSQL thất bại:', error instanceof assert.AssertionError ? error.message : error.code || error.name);
  process.exitCode = 1;
});

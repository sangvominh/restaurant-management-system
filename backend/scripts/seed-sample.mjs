import { config } from 'dotenv';
import pg from 'pg';
import { randomBytes, scryptSync } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { createSampleData, INSERT_ORDER, sampleSummary } from './sample-bbq-data.mjs';

const quote = name => '"' + name.replaceAll('"', '""') + '"';

// The caller owns the transaction, allowing both real imports and rollback QA.
export async function insertSample(client, data, password) {
  if (!password || password.length < 8 || password.length > 128 || !password.trim())
    throw new Error('SAMPLE_DATA_PASSWORD phải có từ 8 đến 128 ký tự.');
  const rows = structuredClone(data.rows);
  const remap = new Map();
  // Reuse shared catalog keys without changing names or existing permissions.
  for (const [table, natural] of [['Unit', 'symbol'], ['Permission', 'code']]) {
    for (const row of rows[table]) {
      await client.query(`INSERT INTO ${quote(table)} (id, name, ${quote(natural)}) VALUES ($1,$2,$3) ON CONFLICT (${quote(natural)}) DO NOTHING`, [row.id, row.name, row[natural]]);
      const result = await client.query(`SELECT id FROM ${quote(table)} WHERE ${quote(natural)}=$1`, [row[natural]]);
      remap.set(row.id, result.rows[0].id);
    }
  }
  for (const table of INSERT_ORDER.filter(t => !['Unit', 'Permission'].includes(t))) {
    for (const original of rows[table] || []) {
      const row = Object.fromEntries(Object.entries(original).map(([key, value]) => [key, typeof value === 'string' && remap.has(value) ? remap.get(value) : value]));
      if (table === 'Account') {
        const salt = randomBytes(16).toString('hex');
        row.passwordHash = `scrypt$${salt}$${scryptSync(password, salt, 64).toString('hex')}`;
      }
      const columns = Object.keys(row);
      await client.query(`INSERT INTO ${quote(table)} (${columns.map(quote).join(',')}) VALUES (${columns.map((_, n) => '$' + (n + 1)).join(',')})`, Object.values(row));
    }
  }
}

export async function sampleAlreadyPresent(client, data) {
  const accounts = await client.query('SELECT id FROM "Account" WHERE username = ANY($1::text[])', [data.rows.Account.map(a => a.username)]);
  if (!accounts.rowCount) return false;
  // Scenario/date change requires a fresh test DB, not deleting somebody's work.
  for (const table of INSERT_ORDER.filter(t => !['Unit', 'Permission', 'RolePermission', 'DiningArea'].includes(t))) {
    const ids = (data.rows[table] || []).map(r => r.id);
    if (!ids.length) continue;
    const found = await client.query(`SELECT count(*)::int AS count FROM ${quote(table)} WHERE id = ANY($1::uuid[])`, [ids]);
    if (found.rows[0].count !== ids.length) throw new Error('Dữ liệu mẫu đã tồn tại một phần hoặc khác ngày/scenario. Dùng CSDL test mới; seed không xóa hay ghi đè dữ liệu.');
  }
  // These IDs differ between the two profiles even if most rows are shared.
  const lastSale = data.rows.Sale.find(s => s.code.endsWith('-KHACH-CUOI'));
  const soldOutPresent = await client.query('SELECT 1 FROM "Sale" WHERE id=$1', [sampleIdForLastSale(data)]);
  if (Boolean(soldOutPresent.rowCount) !== Boolean(lastSale)) throw new Error('CSDL đã có scenario khác. Dùng CSDL test mới để đổi scenario.');
  return true;
}
function sampleIdForLastSale(data) {
  // Constructing the alternate profile only performs local calculations.
  return createSampleData({ date: data.date, scenario: 'sold-out' }).rows.Sale.find(s => s.code.endsWith('-KHACH-CUOI')).id;
}

async function main() {
  config({ path: fileURLToPath(new URL('../.env', import.meta.url)), quiet: true });
  const args = process.argv.slice(2);
  const unknown = args.filter(a => a !== '--apply' && a !== '--dry-run' && !a.startsWith('--date=') && !a.startsWith('--scenario=') && !a.startsWith('--export='));
  if (unknown.length) throw new Error('Tham số không hợp lệ. Dùng --date=YYYY-MM-DD --scenario=service|sold-out --dry-run | --apply --export=path.json');
  if (args.includes('--apply') && args.includes('--dry-run')) throw new Error('Chỉ chọn --apply hoặc --dry-run.');
  const value = key => args.find(a => a.startsWith(`--${key}=`))?.slice(key.length + 3);
  const data = createSampleData({ date: value('date'), scenario: value('scenario') });
  console.log(`BBQ mẫu | ${data.date} | ${data.scenario} | ${Object.values(data.rows).reduce((sum, rows) => sum + rows.length, 0)} bản ghi`);
  console.table(sampleSummary(data));
  if (value('export')) {
    const destination = resolve(value('export'));
    // Exclusive create prevents silently overwriting an existing artifact.
    await writeFile(destination, JSON.stringify(data, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' });
    console.log(`Đã xuất JSON: ${destination} (mật khẩu chỉ là placeholder).`);
  }
  if (!args.includes('--apply')) {
    console.log('Dry run: chưa kết nối hoặc thay đổi CSDL. Thêm --apply và SAMPLE_DATA_PASSWORD để nhập vào CSDL test.');
    return;
  }
  if (!process.env.DATABASE_URL) throw new Error('Thiếu DATABASE_URL.');
  if (process.env.NODE_ENV === 'production') throw new Error('Không nhập dữ liệu mẫu khi NODE_ENV=production.');
  const url = new URL(process.env.DATABASE_URL);
  const schema = url.searchParams.get('schema') || 'public';
  url.searchParams.delete('schema');
  const client = new pg.Client({ connectionString: url.toString(), connectionTimeoutMillis: 5000 });
  await client.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL lock_timeout='5s'");
    await client.query("SET LOCAL statement_timeout='60s'");
    await client.query("SELECT set_config('search_path', $1, true)", [quote(schema)]);
    // Same lock ordering as production code, plus a seed-specific lock.
    await client.query('SELECT pg_advisory_xact_lock(8112026), pg_advisory_xact_lock(8112027), pg_advisory_xact_lock(8112028)');
    if (await sampleAlreadyPresent(client, data)) {
      await client.query('ROLLBACK');
      console.log('Bộ mẫu cùng ngày/scenario đã tồn tại. Giữ nguyên dữ liệu và mật khẩu hiện tại.');
      return;
    }
    await insertSample(client, data, process.env.SAMPLE_DATA_PASSWORD);
    await client.query('COMMIT');
    console.log('Đã nhập bộ mẫu. Đăng nhập bbq_admin / bbq_kho / bbq_bep / bbq_quanly / bbq_phucvu / bbq_thungan bằng SAMPLE_DATA_PASSWORD đã đặt.');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    await client.end();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => {
    // Do not print pg connection details or SQL parameters (password hashes).
    const message = error?.code === '42P01' || error?.code === '42703' ? 'CSDL chưa khớp schema hiện tại. Cập nhật schema ở CSDL test trước khi seed.'
      : error?.code === '23505' ? 'Trùng khóa dữ liệu hiện có. Đã rollback toàn bộ, không ghi đè.'
      : error?.code || error?.name === 'TypeError' ? 'Không thể nhập dữ liệu. Kiểm tra kết nối, schema, ràng buộc và cấu hình CSDL test.'
      : error.message;
    console.error(message);
    process.exitCode = 1;
  });
}

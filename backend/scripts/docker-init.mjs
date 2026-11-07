import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../dist/generated/prisma/client.js';
import { seedSystemAdmin } from '../dist/prisma/seed-admin.js';

const require = createRequire(import.meta.url);
const backendDirectory = fileURLToPath(new URL('../', import.meta.url));
const migration = spawnSync(process.execPath, [require.resolve('prisma/build/index.js'), 'migrate', 'deploy', '--config', 'prisma7.config.ts'], {
  cwd: backendDirectory,
  stdio: 'inherit',
});
if (migration.error) console.error(migration.error.message);
if (migration.status !== 0) process.exit(migration.status ?? 1);

if (!process.env.DATABASE_URL) throw new Error('Missing DATABASE_URL');
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
try {
  const activeAdmins = () => db.account.count({ where: {
    status: 'active', passwordHash: { not: null },
    role: { isSystem: true, permissions: { has: '*' } },
  } });
  if (await activeAdmins()) {
    console.log('Database initialized; existing Admin credentials and role settings are preserved.');
  } else {
    await seedSystemAdmin(db, {
      email: process.env.SEED_ADMIN_EMAIL ?? 'a@gmail.com',
      password: process.env.SEED_DEFAULT_PASSWORD ?? '',
    });
    if (!(await activeAdmins()))
      throw new Error('No usable System Admin exists. Check existing accounts/roles; bootstrap will not overwrite them.');
    console.log('First System Admin initialized.');
  }
} finally {
  await db.$disconnect();
}

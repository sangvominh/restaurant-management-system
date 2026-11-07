import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../dist/generated/prisma/client.js';
import { seedSystemAdmin } from '../dist/prisma/seed-admin.js';
import { seedDemo, DEMO_VERSION } from '../dist/prisma/seed-demo.js';

const action = process.argv[2];
if (!['bootstrap', 'demo'].includes(action)) throw new Error('Usage: database.mjs <bootstrap|demo>');
if (!process.env.DATABASE_URL) throw new Error('Missing DATABASE_URL');
if (action === 'demo' && new URL(process.env.DATABASE_URL).pathname !== '/restaurant_demo')
  throw new Error('Demo chỉ được chạy trên database restaurant_demo.');
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
try {
  if (action === 'bootstrap') {
    await seedSystemAdmin(db, { email: process.env.SEED_ADMIN_EMAIL ?? '', password: process.env.SEED_DEFAULT_PASSWORD ?? '' });
    console.log('Bootstrap hoàn tất; thông tin tài khoản và quyền đã có được giữ nguyên.');
  } else {
    await seedDemo(db, process.env.DEMO_PASSWORD ?? '');
    console.log(`Demo v${DEMO_VERSION} hoàn tất. Xem tài khoản và kịch bản trong README.md.`);
  }
} finally { await db.$disconnect(); }

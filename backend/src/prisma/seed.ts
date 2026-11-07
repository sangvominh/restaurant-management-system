import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { seedSystemAdmin } from './seed-admin.js';

if (!process.env.DATABASE_URL) throw new Error('Missing DATABASE_URL');
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
try {
  await seedSystemAdmin(db, {
    email: process.env.SEED_ADMIN_EMAIL ?? '',
    password: process.env.SEED_DEFAULT_PASSWORD ?? '',
  });
  console.log('Đã tạo dữ liệu nền; giữ nguyên tài khoản đã có.');
} finally {
  await db.$disconnect();
}

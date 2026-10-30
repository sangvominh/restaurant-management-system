import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { seedSystemAdmin } from '../src/prisma/seed-admin.js';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('Cần DATABASE_URL trước khi chạy seed');
const db = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: url,
    connectionTimeoutMillis: 5000,
  }),
});
try {
  await seedSystemAdmin(db, {
    email: process.env.SEED_ADMIN_EMAIL ?? 'a@gmail.com',
    password: process.env.SEED_DEFAULT_PASSWORD ?? '',
  });
  console.log(
    'Đã khởi tạo vai trò và tài khoản quản trị; tài khoản đã tồn tại được giữ nguyên.',
  );
} finally {
  await db.$disconnect();
}

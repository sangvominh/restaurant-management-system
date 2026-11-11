import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { randomBytes, scryptSync } from 'node:crypto';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../dist/generated/prisma/client.js';

config({ path: fileURLToPath(new URL('../.env', import.meta.url)), quiet: true });

async function main() {
  const username = process.env.INITIAL_ADMIN_USERNAME?.trim();
  const password = process.env.INITIAL_ADMIN_PASSWORD;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('Thiếu DATABASE_URL trong backend/.env');
  if (!username || username.length > 100)
    throw new Error('INITIAL_ADMIN_USERNAME phải có từ 1 đến 100 ký tự');
  if (!password || !password.trim() || password.length < 8 || password.length > 128)
    throw new Error('INITIAL_ADMIN_PASSWORD phải có từ 8 đến 128 ký tự');

  const db = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  try {
    const result = await db.$transaction(async tx => {
      // Hai lần khởi tạo đồng thời không tạo trùng hoặc thay đổi quyền ngoài ý muốn.
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112026)::text`;
      const existing = await tx.account.findUnique({
        where: { username },
        include: { role: { include: { permissions: { include: { permission: true } } } } },
      });
      if (existing) {
        if (!existing.role.permissions.some(p => p.permission.code === '*'))
          throw new Error('Tên đăng nhập đã thuộc tài khoản thường. Không tự nâng quyền; hãy chọn tên Admin khác trong .env.');
        return 'Admin đã tồn tại. Giữ nguyên mật khẩu, vai trò và trạng thái tài khoản.';
      }

      const roleName = 'System Admin';
      let role = await tx.role.findUnique({
        where: { name: roleName },
        include: { permissions: { include: { permission: true } }, _count: { select: { accounts: true } } },
      });
      if (role && role._count.accounts > 0 && !role.permissions.some(p => p.permission.code === '*'))
        throw new Error('Vai trò System Admin đang được tài khoản thường sử dụng. Không tự nâng quyền vai trò này.');

      if (!role) {
        role = await tx.role.create({
          data: { name: roleName, description: 'Quản trị toàn hệ thống' },
          include: { permissions: { include: { permission: true } }, _count: { select: { accounts: true } } },
        });
      }
      const permission = await tx.permission.upsert({
        where: { code: '*' }, update: {},
        create: { code: '*', name: 'Toàn quyền hệ thống' },
      });
      await tx.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
        update: {}, create: { roleId: role.id, permissionId: permission.id },
      });
      // Cùng định dạng với mật khẩu được tạo từ màn hình Tài khoản.
      const salt = randomBytes(16).toString('hex');
      const passwordHash = `scrypt$${salt}$${scryptSync(password, salt, 64).toString('hex')}`;
      await tx.account.create({ data: { username, passwordHash, roleId: role.id, status: 'ACTIVE' } });
      return 'Đã tạo tài khoản System Admin từ cấu hình .env.';
    }, { timeout: 15000 });
    console.log(result);
  } finally {
    await db.$disconnect();
  }
}

main().catch(error => {
  if (error?.code === 'P2021' || error?.code === 'P2022') {
    console.error('CSDL chưa có đủ bảng/cột. Hãy chạy migration trước khi khởi tạo Admin.');
  } else if (error?.code === 'P2002') {
    console.error('Dữ liệu khởi tạo bị trùng. Hãy kiểm tra tài khoản/vai trò rồi chạy lại.');
  } else if (error?.name?.startsWith('Prisma')) {
    console.error('Không thể khởi tạo Admin. Kiểm tra PostgreSQL, DATABASE_URL và migration.');
  } else {
    console.error(error instanceof Error ? error.message : 'Không thể khởi tạo Admin');
  }
  process.exitCode = 1;
});

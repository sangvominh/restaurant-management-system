import * as bcrypt from 'bcryptjs';
import { isEmail } from 'class-validator';
import { DEFAULT_ROLE_PERMISSIONS } from '../common/permissions.js';
import type { PrismaClient } from '../generated/prisma/client.js';

export async function seedSystemAdmin(
  db: PrismaClient,
  options: { email: string; password: string },
) {
  const email = options.email.trim().toLowerCase();
  if (
    !isEmail(email) ||
    options.password.length < 8 ||
    Buffer.byteLength(options.password, 'utf8') > 72
  ) {
    throw new Error(
      'Cần email hợp lệ và mật khẩu ít nhất 8 ký tự, tối đa 72 byte UTF-8',
    );
  }
  const passwordHash = await bcrypt.hash(options.password, 10);
  await db.$transaction(
    async (tx) => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(17112026)::text`;
      for (const [name, permissions] of Object.entries(
        DEFAULT_ROLE_PERMISSIONS,
      )) {
        await tx.role.upsert({
          where: { name },
          update: {},
          create: {
            name,
            permissions,
            description: name,
            isSystem: permissions.includes('*'),
          },
        });
      }
      const role = await tx.role.findUniqueOrThrow({
        where: { name: 'Quản trị viên (Admin)' },
      });
      if (!role.isSystem || !role.permissions.includes('*'))
        throw new Error(
          'Vai trò Admin hiện tại không hợp lệ; seed không tự sửa quyền đã có',
        );
      await tx.account.upsert({
        where: { email },
        update: {},
        create: {
          name: 'Quản trị viên hệ thống',
          email,
          roleId: role.id,
          passwordHash,
        },
      });
      await tx.systemSetting.upsert({
        where: { id: 1 },
        update: {},
        create: {
          id: 1,
          restaurantName: 'Hệ thống Quản lý MRP',
          email: 'admin@mrpsystem.vn',
          currency: 'VND',
          tax: 8,
        },
      });
    },
    { timeout: 15000 },
  );
}

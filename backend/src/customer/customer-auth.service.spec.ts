import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { scryptSync } from 'node:crypto';
import { CustomerAuthService } from './customer-auth.service.js';
import type { PrismaService } from '../prisma/prisma.service.js';

function createDbMock(initialCustomer?: {
  id: string;
  phone: string;
  name: string;
  passwordHash: string;
  status: string;
  createdAt: Date;
}) {
  let stored = initialCustomer ?? null;
  const db = {
    customer: {
      findUnique: vi.fn().mockImplementation(async ({ where }: { where: { phone?: string; id?: string } }) => {
        if (!stored) return null;
        if (where.phone && stored.phone === where.phone) return stored;
        if (where.id && stored.id === where.id) return stored;
        return null;
      }),
      create: vi.fn().mockImplementation(async ({ data }: { data: { phone: string; name: string; passwordHash: string; status: string } }) => {
        stored = {
          id: '11111111-1111-4111-8111-111111111111',
          phone: data.phone,
          name: data.name,
          passwordHash: data.passwordHash,
          status: data.status,
          createdAt: new Date('2026-11-25T00:00:00Z'),
        };
        return {
          id: stored.id,
          phone: stored.phone,
          name: stored.name,
          createdAt: stored.createdAt,
        };
      }),
    },
  };
  return { db: db as unknown as PrismaService, getStored: () => stored, setStored: (next: typeof stored) => { stored = next; } };
}

afterEach(() => vi.restoreAllMocks());

describe('CustomerAuthService', () => {
  it('đăng ký tài khoản mới, xác thực token và đăng xuất thành công', async () => {
    const { db } = createDbMock();
    const svc = new CustomerAuthService(db);

    const registered = await svc.register({
      phone: '0909 123 456',
      name: 'Nguyễn Văn A',
      password: 'password123',
    });

    expect(registered.token).toMatch(/^[0-9a-f]{64}$/);
    expect(registered.customer.phone).toBe('0909123456');

    const user = await svc.authenticate(registered.token);
    expect(user.name).toBe('Nguyễn Văn A');

    const optionalUser = await svc.tryAuthenticate(`Bearer ${registered.token}`);
    expect(optionalUser?.id).toBe(registered.customer.id);

    expect(await svc.tryAuthenticate(undefined)).toBeNull();

    svc.logout(registered.token);
    await expect(svc.authenticate(registered.token)).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('từ chối đăng ký trùng số điện thoại hoặc dữ liệu sai', async () => {
    const salt = 'a'.repeat(32);
    const { db } = createDbMock({
      id: '11111111-1111-4111-8111-111111111111',
      phone: '0909123456',
      name: 'Khách cũ',
      passwordHash: `scrypt$${salt}$${scryptSync('secret123', salt, 64).toString('hex')}`,
      status: 'ACTIVE',
      createdAt: new Date(),
    });
    const svc = new CustomerAuthService(db);

    await expect(
      svc.register({ phone: '0909123456', name: 'Khách mới', password: 'secret123' }),
    ).rejects.toBeInstanceOf(ConflictException);

    await expect(
      svc.register({ phone: '123', name: 'Khách mới', password: 'secret123' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('kiểm tra sai mật khẩu, tài khoản bị khóa và header token sai định dạng', async () => {
    const salt = 'b'.repeat(32);
    const { db, setStored } = createDbMock({
      id: '11111111-1111-4111-8111-111111111111',
      phone: '0909123456',
      name: 'Khách',
      passwordHash: `scrypt$${salt}$${scryptSync('secret123', salt, 64).toString('hex')}`,
      status: 'ACTIVE',
      createdAt: new Date(),
    });
    const svc = new CustomerAuthService(db);

    const logged = await svc.login({ phone: '0909123456', password: 'secret123' });
    expect(logged.customer.name).toBe('Khách');

    await expect(svc.login({ phone: '0909123456', password: 'wrong' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    await expect(svc.tryAuthenticate('Bearer invalid')).rejects.toBeInstanceOf(UnauthorizedException);

    setStored({
      id: '11111111-1111-4111-8111-111111111111',
      phone: '0909123456',
      name: 'Khách',
      passwordHash: `scrypt$${salt}$${scryptSync('secret123', salt, 64).toString('hex')}`,
      status: 'LOCKED',
      createdAt: new Date(),
    });
    await expect(svc.login({ phone: '0909123456', password: 'secret123' })).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    await expect(svc.authenticate(logged.token)).rejects.toBeInstanceOf(UnauthorizedException);
  });
});

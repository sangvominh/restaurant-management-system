import 'reflect-metadata';
import { ForbiddenException, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { JwtService } from '@nestjs/jwt';
import type { PrismaService } from '../prisma/prisma.service.js';
import {
  PERMISSIONS_KEY,
  SYSTEM_ADMIN_ONLY_KEY,
} from '../common/auth.decorators.js';
import { AuthGuard } from './auth.guard.js';

function fixture(permissions: string[], isSystem = false) {
  const handler = () => undefined;
  const controller = class {};
  const session = {
    status: 'success',
    logoutAt: null,
    accountId: 1,
    account: {
      id: 1,
      name: 'A',
      email: 'a@example.com',
      status: 'active',
      sessionVersion: 0,
      role: { name: 'Tên vai trò tùy ý', permissions, isSystem },
    },
  };
  const jwt = {
    verifyAsync: async () => ({ sub: 1, sid: 1, ver: 0 }),
  } as unknown as JwtService;
  const db = {
    loginLog: { findUnique: async () => session },
  } as unknown as PrismaService;
  const guard = new AuthGuard(new Reflector(), jwt, db);
  const req = { headers: { authorization: 'Bearer example' } };
  const context = {
    getHandler: () => handler,
    getClass: () => controller,
    switchToHttp: () => ({ getRequest: () => req }),
  } as unknown as ExecutionContext;
  return { guard, context, handler, controller, session };
}

describe('quyền nghiệp vụ và ranh giới System Admin', () => {
  it('cho phép đúng quyền được tick và chặn ngay khi quyền không còn trong database', async () => {
    const f = fixture(['supplier:manage', 'inventory:view']);
    Reflect.defineMetadata(PERMISSIONS_KEY, ['supplier:manage'], f.handler);
    await expect(f.guard.canActivate(f.context)).resolves.toBe(true);
    f.session.account.role.permissions = ['inventory:view'];
    await expect(f.guard.canActivate(f.context)).rejects.toThrow(
      ForbiddenException,
    );
  });
  it('duyệt nguyên vật liệu không đồng nghĩa được duyệt thành phẩm', async () => {
    const f = fixture(['inventory:approve-export']);
    Reflect.defineMetadata(
      PERMISSIONS_KEY,
      ['finished-goods:approve-export'],
      f.handler,
    );
    await expect(f.guard.canActivate(f.context)).rejects.toThrow(
      ForbiddenException,
    );
    f.session.account.role.permissions.push('finished-goods:approve-export');
    await expect(f.guard.canActivate(f.context)).resolves.toBe(true);
  });
  it('metadata System Admin trên controller chặn cả handler chưa khai báo quyền riêng', async () => {
    const f = fixture(['account:manage', 'role:manage', '*']);
    Reflect.defineMetadata(SYSTEM_ADMIN_ONLY_KEY, true, f.controller);
    await expect(f.guard.canActivate(f.context)).rejects.toThrow(
      ForbiddenException,
    );
    f.session.account.role.isSystem = true;
    await expect(f.guard.canActivate(f.context)).resolves.toBe(true);
  });
  it('wildcard chỉ có tác dụng khi server xác nhận vai trò hệ thống', async () => {
    const f = fixture(['*']);
    Reflect.defineMetadata(PERMISSIONS_KEY, ['*'], f.handler);
    await expect(f.guard.canActivate(f.context)).rejects.toThrow(
      ForbiddenException,
    );
  });
});

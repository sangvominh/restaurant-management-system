import { ForbiddenException } from '@nestjs/common';
import {
  assertAssignRole,
  assertGrantPermissions,
  assertManageAccount,
} from './management-policy.js';
import type { AuthUser } from './auth.decorators.js';

const actor = (permissions: string[]): AuthUser => ({
  id: 1,
  name: 'A',
  email: 'a@test.vn',
  role: 'Delegated',
  permissions,
});
const role = (permissions: string[], isSystem = false) => ({
  permissions,
  isSystem,
});

describe('ủy quyền quản trị', () => {
  it('không cho account:manage tự gán Admin', () => {
    expect(() =>
      assertAssignRole(actor(['account:manage']), role(['*'], true)),
    ).toThrow(ForbiddenException);
  });
  it('không cho quản lý tài khoản đặt lại mật khẩu của người có quyền quản trị', () => {
    for (const permission of [
      '*',
      'account:manage',
      'role:manage',
      'backup:manage',
    ]) {
      expect(() =>
        assertManageAccount(actor(['account:manage']), role([permission])),
      ).toThrow(ForbiddenException);
    }
  });
  it('yêu cầu role:manage khi gán vai trò thường', () => {
    expect(() =>
      assertAssignRole(
        actor(['account:manage', 'inventory:view']),
        role(['inventory:view']),
      ),
    ).toThrow(ForbiddenException);
  });
  it('cho phép gán quyền thường trong phạm vi ủy quyền', () => {
    expect(() =>
      assertAssignRole(
        actor(['role:manage', 'inventory:view']),
        role(['inventory:view']),
      ),
    ).not.toThrow();
  });
  it('chặn role manager cấp quyền mới vượt quyền của mình', () => {
    expect(() =>
      assertGrantPermissions(actor(['role:manage']), ['inventory:import']),
    ).toThrow(ForbiddenException);
    expect(() =>
      assertGrantPermissions(actor(['role:manage']), ['backup:manage']),
    ).toThrow(ForbiddenException);
  });
  it('Admin hệ thống được gán mọi vai trò', () => {
    expect(() =>
      assertAssignRole(actor(['*']), role(['*'], true)),
    ).not.toThrow();
  });
});

import { BadRequestException, ForbiddenException } from '@nestjs/common';
import {
  assertGrantPermissions,
  assertSystemAdmin,
  isSystemRole,
} from './management-policy.js';
import { ALL_PERMISSION_KEYS, SYSTEM_PERMISSION_KEYS } from './permissions.js';
import type { AuthUser } from './auth.decorators.js';

const actor = (permissions: string[], isSystemAdmin = false): AuthUser => ({
  id: 1,
  name: 'A',
  email: 'a@test.vn',
  role: 'Delegated',
  permissions,
  isSystemAdmin,
});

describe('System Admin độc quyền quản trị', () => {
  it('quyền quản trị cũ và tên vai trò không tạo đặc quyền System Admin', () => {
    for (const permissions of [[...SYSTEM_PERMISSION_KEYS], ['*'], []]) {
      const user = actor(permissions);
      user.role = 'Quản trị viên (Admin)';
      expect(() => assertSystemAdmin(user)).toThrow(ForbiddenException);
    }
  });
  it('cờ System Admin thiếu wildcard cũng bị từ chối', () => {
    expect(() => assertSystemAdmin(actor([], true))).toThrow(
      ForbiddenException,
    );
  });
  it('server chỉ xác định Admin từ vai trò hệ thống có wildcard', () => {
    expect(isSystemRole({ isSystem: false, permissions: ['*'] })).toBe(false);
    expect(isSystemRole({ isSystem: true, permissions: [] })).toBe(false);
    expect(isSystemRole({ isSystem: true, permissions: ['*'] })).toBe(true);
  });
  it('vai trò thường không được cấp quyền, kể cả quyền họ đã có', () => {
    expect(() =>
      assertGrantPermissions(actor(['supplier:manage']), ['supplier:manage']),
    ).toThrow(ForbiddenException);
  });
  it('Admin được cấp mọi quyền nghiệp vụ hoặc bỏ hết quyền', () => {
    expect(() =>
      assertGrantPermissions(actor(['*'], true), ALL_PERMISSION_KEYS),
    ).not.toThrow();
    expect(() => assertGrantPermissions(actor(['*'], true), [])).not.toThrow();
  });
  it('Admin cũng không cấp wildcard, quyền quản trị hoặc quyền ngoài danh mục cho vai trò con', () => {
    for (const permission of [
      '*',
      ...SYSTEM_PERMISSION_KEYS,
      'product:manage',
      'invented:permission',
    ])
      expect(() =>
        assertGrantPermissions(actor(['*'], true), [permission]),
      ).toThrow(BadRequestException);
  });
});

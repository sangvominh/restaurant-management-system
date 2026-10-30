import { ForbiddenException } from '@nestjs/common';
import type { AuthUser } from './auth.decorators.js';

type ManagedRole = { isSystem: boolean; permissions: string[] };
const MANAGEMENT = [
  'account:manage',
  'role:manage',
  'backup:manage',
  'setting:manage',
];
export const isSystemAdmin = (actor: AuthUser) =>
  actor.permissions.includes('*');
export const protectedRole = (role: ManagedRole) =>
  role.isSystem ||
  role.permissions.some((p) => p === '*' || MANAGEMENT.includes(p));

export function assertManageAccount(actor: AuthUser, role: ManagedRole) {
  if (!isSystemAdmin(actor) && protectedRole(role)) {
    throw new ForbiddenException(
      'Chỉ Admin hệ thống được quản lý tài khoản có quyền quản trị',
    );
  }
}

export function assertAssignRole(actor: AuthUser, role: ManagedRole) {
  if (isSystemAdmin(actor)) return;
  assertManageAccount(actor, role);
  if (
    !actor.permissions.includes('role:manage') ||
    role.permissions.some((p) => !actor.permissions.includes(p))
  ) {
    throw new ForbiddenException(
      'Bạn không được gán vai trò vượt quá quyền được ủy quyền',
    );
  }
}

export function assertGrantPermissions(actor: AuthUser, permissions: string[]) {
  if (
    !isSystemAdmin(actor) &&
    permissions.some(
      (p) =>
        p === '*' || MANAGEMENT.includes(p) || !actor.permissions.includes(p),
    )
  ) {
    throw new ForbiddenException(
      'Bạn không được cấp quyền quản trị hoặc quyền mà mình không có',
    );
  }
}

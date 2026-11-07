import { BadRequestException, ForbiddenException } from '@nestjs/common';
import type { AuthUser } from './auth.decorators.js';
import { ALL_PERMISSION_KEYS, WILDCARD } from './permissions.js';

export const isSystemRole = (role: {
  isSystem: boolean;
  permissions: string[];
}) => role.isSystem && role.permissions.includes(WILDCARD);

export const isSystemAdmin = (actor: AuthUser) =>
  actor.isSystemAdmin === true && actor.permissions.includes(WILDCARD);

export function assertSystemAdmin(actor: AuthUser) {
  if (!isSystemAdmin(actor))
    throw new ForbiddenException(
      'Chỉ System Admin được truy cập quản trị hệ thống',
    );
}

export function assertGrantPermissions(actor: AuthUser, permissions: string[]) {
  assertSystemAdmin(actor);
  if (
    permissions.some((permission) => !ALL_PERMISSION_KEYS.includes(permission))
  )
    throw new BadRequestException(
      'Vai trò thường chỉ được cấp quyền nghiệp vụ trong danh mục',
    );
}

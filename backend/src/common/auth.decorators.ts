import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

// Là class (không phải interface) để dùng được làm kiểu của tham số có decorator
// khi bật isolatedModules + emitDecoratorMetadata (TS1272).
export class AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  /** Do server xác định từ vai trò hệ thống, không dựa vào tên vai trò hay dữ liệu client. */
  isSystemAdmin: boolean;
  /** Id phiên đăng nhập (login_logs.id); guard chỉ nhận JWT gắn với phiên hợp lệ. */
  sessionId?: number;
}

export const IS_PUBLIC_KEY = 'isPublic';
/** Route không cần đăng nhập (ví dụ /api/auth/login). */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const PERMISSIONS_KEY = 'requiredPermissions';
/** Người dùng cần có ÍT NHẤT MỘT trong các quyền liệt kê (Admin '*' luôn qua). */
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

export const SYSTEM_ADMIN_ONLY_KEY = 'systemAdminOnly';
export const RequireSystemAdmin = () =>
  SetMetadata(SYSTEM_ADMIN_ONLY_KEY, true);

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    return ctx.switchToHttp().getRequest().user;
  },
);

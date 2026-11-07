import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service.js';
import {
  IS_PUBLIC_KEY,
  PERMISSIONS_KEY,
  SYSTEM_ADMIN_ONLY_KEY,
  WAREHOUSE_ONLY_KEY,
} from '../common/auth.decorators.js';
import { assertSystemAdmin } from '../common/management-policy.js';
import { WILDCARD } from '../common/permissions.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly auth: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const targets = [context.getHandler(), context.getClass()];
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, targets))
      return true;
    const req = context.switchToHttp().getRequest();
    const [type, token] = String(req.headers?.authorization ?? '').split(' ');
    if (type !== 'Bearer' || !token)
      throw new UnauthorizedException('Chưa đăng nhập');
    const user = await this.auth.authenticate(token);
    req.user = user;
    if (
      this.reflector.getAllAndOverride<boolean>(SYSTEM_ADMIN_ONLY_KEY, targets)
    )
      assertSystemAdmin(user);
    const required = this.reflector.getAllAndOverride<string[] | undefined>(
      PERMISSIONS_KEY,
      targets,
    );
    const warehouseOnly = this.reflector.getAllAndOverride<boolean>(
      WAREHOUSE_ONLY_KEY,
      targets,
    );
    if (warehouseOnly && !user.isSystemAdmin && user.portal !== 'warehouse')
      throw new ForbiddenException(
        'Tài khoản không được truy cập khu vực Kho / Nhà hàng',
      );
    if (warehouseOnly && !required?.length)
      throw new ForbiddenException('Chức năng chưa được mở quyền tích hợp');
    if (
      required?.length &&
      !user.isSystemAdmin &&
      !required.some((p) => p !== WILDCARD && user.permissions.includes(p))
    )
      throw new ForbiddenException('Bạn không có quyền thực hiện thao tác này');
    return true;
  }
}

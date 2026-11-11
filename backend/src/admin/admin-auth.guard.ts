import { CanActivate, createParamDecorator, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService, type AdminUser } from './admin-auth.service.js';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly auth: AdminAuthService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const header = String(req.headers.authorization || '');
    if (!/^Bearer [0-9a-f]{64}$/.test(header)) throw new UnauthorizedException('Vui lòng đăng nhập Admin');
    req.adminToken = header.slice(7);
    req.admin = await this.auth.authenticate(req.adminToken);
    return true;
  }
}
export const CurrentAdmin = createParamDecorator((_: unknown, ctx: ExecutionContext): AdminUser => ctx.switchToHttp().getRequest().admin);
export const AdminToken = createParamDecorator((_: unknown, ctx: ExecutionContext): string => ctx.switchToHttp().getRequest().adminToken);

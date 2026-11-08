import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from '../admin/admin-auth.service.js';
@Injectable()
export class CatalogGuard implements CanActivate {
  constructor(private readonly auth: AdminAuthService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const header = String(req.headers.authorization || '');
    if (!/^Bearer [0-9a-f]{64}$/.test(header)) throw new UnauthorizedException('Vui lòng đăng nhập');
    req.catalogToken = header.slice(7);
    req.catalogUser = await this.auth.authenticate(req.catalogToken, false);
    return true;
  }
}

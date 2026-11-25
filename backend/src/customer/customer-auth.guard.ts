import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerAuthService } from './customer-auth.service.js';

@Injectable()
export class CustomerAuthGuard implements CanActivate {
  constructor(private readonly auth: CustomerAuthService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const header = String(req.headers.authorization || '');
    if (!/^Bearer [0-9a-f]{64}$/.test(header)) {
      throw new UnauthorizedException('Vui lòng đăng nhập');
    }
    req.customerToken = header.slice(7);
    req.customerUser = await this.auth.authenticate(req.customerToken);
    return true;
  }
}

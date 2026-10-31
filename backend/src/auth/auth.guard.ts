import { CanActivate, ExecutionContext, Injectable, SetMetadata, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { AuthService, type StaffIdentity } from './auth.service.js';
export const Roles = (...roles: StaffIdentity['role'][]) => SetMetadata('staffRoles', roles);
export type StaffRequest = Request & { staff: StaffIdentity };
export function readToken(req: Request) { return req.headers.cookie?.split(';').map(p => p.trim()).find(p => p.startsWith('staff_session='))?.slice(14) || ''; }
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<StaffRequest>();
    req.staff = await this.auth.identity(readToken(req));
    const roles = this.reflector.getAllAndOverride<StaffIdentity['role'][] | undefined>('staffRoles', [context.getHandler(), context.getClass()]);
    if (roles && !roles.includes(req.staff.role)) throw new ForbiddenException('Bạn không có quyền thực hiện thao tác này.');
    return true;
  }
}

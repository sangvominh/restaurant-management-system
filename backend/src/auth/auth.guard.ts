import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import {
  AuthUser,
  IS_PUBLIC_KEY,
  PERMISSIONS_KEY,
} from '../common/auth.decorators.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
    private readonly db: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const targets = [context.getHandler(), context.getClass()];
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, targets))
      return true;
    const req = context.switchToHttp().getRequest();
    const [type, token] = String(req.headers?.authorization ?? '').split(' ');
    if (type !== 'Bearer' || !token)
      throw new UnauthorizedException('Chưa đăng nhập');
    let payload: { sub: number; sid: number; ver: number };
    try {
      payload = await this.jwt.verifyAsync(token);
    } catch {
      throw new UnauthorizedException(
        'Phiên đăng nhập không hợp lệ hoặc đã hết hạn',
      );
    }
    if (
      !Number.isInteger(payload.sub) ||
      payload.sub <= 0 ||
      !Number.isInteger(payload.sid) ||
      payload.sid <= 0 ||
      !Number.isInteger(payload.ver)
    )
      throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
    const session = await this.db.loginLog.findUnique({
      where: { id: payload.sid },
      include: { account: { include: { role: true } } },
    });
    const account = session?.account;
    if (
      !session ||
      session.status !== 'success' ||
      session.logoutAt ||
      !account ||
      session.accountId !== payload.sub ||
      account.status !== 'active' ||
      account.sessionVersion !== payload.ver
    ) {
      throw new UnauthorizedException(
        'Phiên đăng nhập đã kết thúc hoặc tài khoản bị khóa',
      );
    }
    const user: AuthUser = {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role.name,
      permissions: account.role.permissions,
      sessionId: session.id,
    };
    req.user = user;
    const required = this.reflector.getAllAndOverride<string[] | undefined>(
      PERMISSIONS_KEY,
      targets,
    );
    if (
      required?.length &&
      !user.permissions.includes('*') &&
      !required.some((p) => user.permissions.includes(p))
    )
      throw new ForbiddenException('Bạn không có quyền thực hiện thao tác này');
    return true;
  }
}

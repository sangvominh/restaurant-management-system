import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../api/admin/account.entity';
import { RoleEntity } from '../api/admin/role.entity';
import { AuditService } from '../audit/audit.service';
import { AuthUser, IS_PUBLIC_KEY, PERMISSIONS_KEY } from '../common/auth.decorators';
import { WILDCARD } from '../common/permissions';

/**
 * Guard toàn cục: mọi route đều phải có JWT hợp lệ, trừ route gắn @Public().
 * Quyền được đọc lại từ DB ở MỖI request nên khóa tài khoản / đổi quyền có hiệu lực ngay,
 * không phải chờ token hết hạn.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
    @InjectRepository(AccountEntity) private readonly accounts: Repository<AccountEntity>,
    @InjectRepository(RoleEntity) private readonly roles: Repository<RoleEntity>,
    private readonly audit: AuditService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const targets = [context.getHandler(), context.getClass()];
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, targets)) return true;

    const req = context.switchToHttp().getRequest();
    const [type, token] = String(req.headers?.authorization ?? '').split(' ');
    if (type !== 'Bearer' || !token) throw new UnauthorizedException('Chưa đăng nhập');

    let payload: { sub: number; sid?: number };
    try {
      payload = await this.jwt.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Phiên đăng nhập không hợp lệ hoặc đã hết hạn');
    }

    // Phiên đã đăng xuất thì token cũ không còn giá trị dù chưa hết hạn.
    if (payload.sid && (await this.audit.isSessionClosed(payload.sid))) {
      throw new UnauthorizedException('Phiên đăng nhập đã kết thúc');
    }

    const account = await this.accounts.findOne({ where: { id: payload.sub } });
    if (!account) throw new UnauthorizedException('Tài khoản không còn tồn tại');
    if (account.status === 'locked') throw new UnauthorizedException('Tài khoản đã bị khóa');

    const role = await this.roles.findOne({ where: { name: account.role } });
    const user: AuthUser = {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
      permissions: role?.permissions ?? [],
      sessionId: payload.sid,
    };
    req.user = user;

    const required = this.reflector.getAllAndOverride<string[] | undefined>(PERMISSIONS_KEY, targets);
    if (required?.length) {
      const allowed =
        user.permissions.includes(WILDCARD) || required.some((p) => user.permissions.includes(p));
      if (!allowed) throw new ForbiddenException('Bạn không có quyền thực hiện thao tác này');
    }
    return true;
  }
}

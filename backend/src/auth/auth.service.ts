import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuditService } from '../audit/audit.service.js';
import type { AuthUser } from '../common/auth.decorators.js';
import { isSystemRole } from '../common/management-policy.js';
import { PrismaService } from '../prisma/prisma.service.js';

const DUMMY_HASH = bcrypt.hashSync('khong-ton-tai', 10);

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwt: JwtService,
    private readonly audit: AuditService,
  ) {}

  async login(email: string, password: string, ip?: string) {
    const account = await this.db.account.findUnique({
      where: { email: email.trim().toLowerCase() },
      include: { role: true },
    });
    const ok = await bcrypt.compare(
      password,
      account?.passwordHash ?? DUMMY_HASH,
    );
    if (!account || !account.passwordHash || !ok) {
      await this.audit.recordLogin({
        accountId: account?.id ?? null,
        email: email.trim(),
        ip,
        status: 'failed',
      });
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    if (account.status === 'locked') {
      await this.audit.recordLogin({
        accountId: account.id,
        email: account.email,
        ip,
        status: 'locked',
      });
      throw new UnauthorizedException(
        'Tài khoản đã bị khóa, vui lòng liên hệ quản trị viên',
      );
    }
    const session = await this.audit.recordLogin({
      accountId: account.id,
      email: account.email,
      ip,
      status: 'success',
    });
    const accessToken = await this.jwt.signAsync({
      sub: account.id,
      sid: session.id,
      ver: account.sessionVersion,
    });
    const user: AuthUser = {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role.name,
      permissions: account.role.permissions,
      isSystemAdmin: isSystemRole(account.role),
    };
    return { accessToken, user };
  }

  async logout(user: AuthUser) {
    await this.audit.recordLogout(user.sessionId);
    return { message: 'Đã đăng xuất' };
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const hash = await bcrypt.hash(newPassword, 10);
    await this.db.adminTransaction(async (tx) => {
      const account = await tx.account.findUnique({ where: { id: userId } });
      if (
        !account?.passwordHash ||
        !(await bcrypt.compare(oldPassword, account.passwordHash))
      )
        throw new BadRequestException('Mật khẩu hiện tại không đúng');
      if (oldPassword === newPassword)
        throw new BadRequestException(
          'Mật khẩu mới phải khác mật khẩu hiện tại',
        );
      await tx.account.update({
        where: { id: userId },
        data: { passwordHash: hash, sessionVersion: { increment: 1 } },
      });
      await tx.loginLog.updateMany({
        where: { accountId: userId, logoutAt: null },
        data: { logoutAt: new Date() },
      });
    });
    return { message: 'Đã đổi mật khẩu. Vui lòng đăng nhập lại.' };
  }
}

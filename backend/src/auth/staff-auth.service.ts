import { Injectable, ForbiddenException, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { object, text } from '../staff/input.js';
import { AuthService as AccountAuthService } from './auth.service.js';

export type StaffIdentity = {
  id: string;
  code: string;
  name: string;
  role: 'SERVICE' | 'KITCHEN' | 'BARISTA' | 'CASHIER' | 'SUPERVISOR';
  branchId: string;
};

// Cookie transport for the staff app; credentials and sessions belong to accounts.
@Injectable()
export class AuthService {
  private attempts = new Map<string, { count: number; until: number }>();
  constructor(
    private readonly db: PrismaService,
    private readonly accounts: AccountAuthService,
  ) {}

  async login(body: unknown, ip: string) {
    const now = Date.now();
    for (const [key, value] of this.attempts)
      if (value.until < now) this.attempts.delete(key);
    const limit = this.attempts.get(ip) || { count: 0, until: now + 60_000 };
    if (limit.count >= 10)
      throw new HttpException('Thử lại sau một phút.', 429);
    limit.count++;
    this.attempts.set(ip, limit);
    const data = object(body);
    const identifier = text(data.code, 'Email hoặc mã nhân viên', 150);
    const password = text(data.password, 'Mật khẩu', 128);
    const profile = await this.db.staffUser.findUnique({
      where: { code: identifier },
      include: { account: true },
    });
    const result = await this.accounts.login(
      profile?.account.email ?? identifier,
      password,
      ip,
    );
    try {
      await this.identity(result.accessToken);
    } catch (error) {
      await this.accounts.logout(
        await this.accounts.authenticate(result.accessToken),
      );
      throw error;
    }
    return result.accessToken;
  }

  async identity(token: string) {
    const account = await this.accounts.authenticate(token);
    if (!account.isSystemAdmin && !account.permissions.includes('staff:access'))
      throw new ForbiddenException('Tài khoản chưa được cấp quyền nhân viên.');
    const profile = await this.db.staffUser.findUnique({
      where: { accountId: account.id },
      include: { branch: true },
    });
    if (!profile || !profile.isActive || !profile.branch.isActive)
      throw new ForbiddenException(
        'Chưa có hồ sơ nhân viên hoặc chi nhánh đang hoạt động.',
      );
    return {
      id: profile.id,
      code: profile.code,
      name: account.name,
      role: profile.role,
      branchId: profile.branchId,
      branch: { name: profile.branch.name, code: profile.branch.code },
    };
  }

  async logout(token: string) {
    await this.accounts.logout(await this.accounts.authenticate(token));
  }
}

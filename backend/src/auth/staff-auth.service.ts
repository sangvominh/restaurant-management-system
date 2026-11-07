import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service.js';
import { object, text } from '../staff/input.js';
import { hashPassword, tokenHash, verifyPassword } from './password.js';
export const staffSelect = { id: true, code: true, name: true, role: true, branchId: true, branch: { select: { name: true, code: true } } } as const;
export type StaffIdentity = { id: string; code: string; name: string; role: 'SERVICE' | 'KITCHEN' | 'BARISTA' | 'CASHIER' | 'SUPERVISOR'; branchId: string };
@Injectable()
export class AuthService {
  private attempts = new Map<string, { count: number; until: number }>();
  private dummy = hashPassword(randomBytes(32).toString('hex'));
  constructor(private readonly db: PrismaService) {}
  async login(body: unknown, ip: string) {
    const now = Date.now();
    for (const [key, value] of this.attempts) if (value.until < now) this.attempts.delete(key);
    const limit = this.attempts.get(ip) || { count: 0, until: now + 60_000 };
    if (limit.count >= 10) throw new HttpException('Thử lại sau một phút.', 429);
    limit.count++; this.attempts.set(ip, limit);
    const data = object(body);
    const code = text(data.code, 'Mã nhân viên', 50);
    const password = text(data.password, 'Mật khẩu', 128);
    const user = await this.db.staffUser.findUnique({ where: { code }, include: { branch: true } });
    const valid = verifyPassword(password, user?.passwordHash || this.dummy);
    if (!user || !valid || !user.isActive || !user.branch.isActive) throw new UnauthorizedException('Mã nhân viên hoặc mật khẩu không đúng.');
    const token = randomBytes(32).toString('hex');
    await this.db.staffSession.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    await this.db.staffSession.create({ data: { tokenHash: tokenHash(token), userId: user.id, expiresAt: new Date(now + 8 * 60 * 60_000) } });
    return token;
  }
  async identity(token: string) {
    const session = await this.db.staffSession.findUnique({ where: { tokenHash: tokenHash(token) }, include: { user: { include: { branch: true } } } });
    if (!session || session.expiresAt <= new Date() || !session.user.isActive || !session.user.branch.isActive) throw new UnauthorizedException('Phiên đăng nhập hết hạn.');
    return this.db.staffUser.findUniqueOrThrow({ where: { id: session.userId }, select: staffSelect });
  }
  async logout(token: string) { await this.db.staffSession.deleteMany({ where: { tokenHash: tokenHash(token) } }); }
}

import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { AccountEntity } from '../api/admin/account.entity';
import { RoleEntity } from '../api/admin/role.entity';
import { AuditService } from '../audit/audit.service';
import { AuthUser } from '../common/auth.decorators';

// So khớp với hash giả khi không tìm thấy email, để thời gian phản hồi không lộ email nào tồn tại.
const DUMMY_HASH = bcrypt.hashSync('khong-ton-tai', 10);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountEntity) private readonly accounts: Repository<AccountEntity>,
    @InjectRepository(RoleEntity) private readonly roles: Repository<RoleEntity>,
    private readonly jwt: JwtService,
    private readonly audit: AuditService,
  ) {}

  private findWithHash(where: { email?: string; id?: number }) {
    const qb = this.accounts.createQueryBuilder('a').addSelect('a.passwordHash');
    if (where.id !== undefined) qb.where('a.id = :id', { id: where.id });
    else qb.where('LOWER(a.email) = LOWER(:email)', { email: where.email });
    return qb.getOne();
  }

  async toAuthUser(account: AccountEntity): Promise<AuthUser> {
    const role = await this.roles.findOne({ where: { name: account.role } });
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
      permissions: role?.permissions ?? [],
    };
  }

  async login(email: string, password: string, ip?: string) {
    const account = await this.findWithHash({ email: email.trim() });
    const ok = await bcrypt.compare(password, account?.passwordHash ?? DUMMY_HASH);
    if (!account || !account.passwordHash || !ok) {
      await this.audit.recordLogin({ accountId: account?.id ?? null, email: email.trim(), ip, status: 'failed' });
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    if (account.status === 'locked') {
      await this.audit.recordLogin({ accountId: account.id, email: account.email, ip, status: 'locked' });
      throw new UnauthorizedException('Tài khoản đã bị khóa, vui lòng liên hệ quản trị viên');
    }
    const session = await this.audit.recordLogin({ accountId: account.id, email: account.email, ip, status: 'success' });
    // sid = id phiên đăng nhập, để đăng xuất thật sự vô hiệu token và gắn thao tác với phiên.
    const accessToken = await this.jwt.signAsync({ sub: account.id, sid: session?.id });
    return { accessToken, user: await this.toAuthUser(account) };
  }

  async logout(user: AuthUser) {
    await this.audit.recordLogout(user.sessionId);
    return { message: 'Đã đăng xuất' };
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const account = await this.findWithHash({ id: userId });
    if (!account?.passwordHash || !(await bcrypt.compare(oldPassword, account.passwordHash))) {
      throw new BadRequestException('Mật khẩu hiện tại không đúng');
    }
    if (oldPassword === newPassword) {
      throw new BadRequestException('Mật khẩu mới phải khác mật khẩu hiện tại');
    }
    account.passwordHash = await bcrypt.hash(newPassword, 10);
    await this.accounts.save(account);
    return { message: 'Đã đổi mật khẩu' };
  }
}

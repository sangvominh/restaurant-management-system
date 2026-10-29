import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { AuthUser } from '../common/auth.decorators';
import { LogQueryDto } from './audit.dto';
import { AuditLogEntity } from './audit-log.entity';
import { LoginLogEntity } from './login-log.entity';

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Thoát ký tự đặc biệt của LIKE để người dùng gõ "%" hay "_" vẫn tìm đúng nghĩa đen.
const escapeLike = (s: string) => s.replace(/[\\%_]/g, (c) => `\\${c}`);

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    @InjectRepository(AuditLogEntity) private readonly auditRepo: Repository<AuditLogEntity>,
    @InjectRepository(LoginLogEntity) private readonly loginRepo: Repository<LoginLogEntity>,
  ) {}

  /** Ghi một thao tác quản trị. Lỗi ghi log không được làm hỏng thao tác chính nên chỉ ghi cảnh báo. */
  async log(
    actor: Pick<AuthUser, 'id' | 'name' | 'sessionId'> | null,
    entry: { action: string; entityName: string; entityId?: string | number | null; description: string },
  ): Promise<void> {
    try {
      await this.auditRepo.save(
        this.auditRepo.create({
          loginLogId: actor?.sessionId ?? null,
          accountId: actor?.id ?? null,
          actorName: (actor?.name ?? 'Hệ thống').slice(0, 150),
          action: entry.action,
          entityName: entry.entityName,
          entityId: entry.entityId != null ? String(entry.entityId) : null,
          description: entry.description,
        }),
      );
    } catch (e) {
      this.logger.error(`Không ghi được nhật ký "${entry.action}": ${(e as Error).message}`);
    }
  }

  async recordLogin(input: {
    accountId: number | null;
    email: string;
    ip?: string | null;
    status: 'success' | 'failed' | 'locked';
  }): Promise<LoginLogEntity | null> {
    try {
      return await this.loginRepo.save(
        this.loginRepo.create({
          accountId: input.accountId,
          email: input.email.slice(0, 150),
          ipAddress: input.ip ? input.ip.slice(0, 60) : null,
          status: input.status,
        }),
      );
    } catch (e) {
      this.logger.error(`Không ghi được lịch sử đăng nhập: ${(e as Error).message}`);
      return null;
    }
  }

  /** Đóng phiên. Dùng NOW() của DB để cùng đồng hồ với loginAt (cùng do DB sinh ra). */
  async recordLogout(sessionId?: number): Promise<void> {
    if (!sessionId) return;
    try {
      await this.loginRepo.update({ id: sessionId, logoutAt: IsNull() }, { logoutAt: () => 'NOW()' });
    } catch (e) {
      this.logger.error(`Không ghi được giờ đăng xuất: ${(e as Error).message}`);
    }
  }

  /** Phiên đã đăng xuất chưa? Token cũ của phiên đó phải bị từ chối. */
  async isSessionClosed(sessionId: number): Promise<boolean> {
    const row = await this.loginRepo.findOne({ where: { id: sessionId } });
    return !!row?.logoutAt;
  }

  async listAudit(q: LogQueryDto): Promise<Paged<AuditLogEntity>> {
    const page = q.page ?? 1;
    const pageSize = q.pageSize ?? 20;
    const qb = this.auditRepo
      .createQueryBuilder('l')
      .orderBy('l.createdAt', 'DESC')
      .addOrderBy('l.id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const s = q.search?.trim();
    if (s) qb.andWhere('(l.description ILIKE :s OR l.actorName ILIKE :s)', { s: `%${escapeLike(s)}%` });
    if (q.entity) qb.andWhere('l.entityName = :entity', { entity: q.entity });
    if (q.from) qb.andWhere('l.createdAt >= :from', { from: new Date(q.from) });
    if (q.to) qb.andWhere('l.createdAt <= :to', { to: new Date(q.to) });

    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, pageSize };
  }

  async listLogins(q: LogQueryDto): Promise<Paged<LoginLogEntity>> {
    const page = q.page ?? 1;
    const pageSize = q.pageSize ?? 20;
    const qb = this.loginRepo
      .createQueryBuilder('l')
      .orderBy('l.loginAt', 'DESC')
      .addOrderBy('l.id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const s = q.search?.trim();
    if (s) qb.andWhere('l.email ILIKE :s', { s: `%${escapeLike(s)}%` });
    if (q.status) qb.andWhere('l.status = :status', { status: q.status });
    if (q.from) qb.andWhere('l.loginAt >= :from', { from: new Date(q.from) });
    if (q.to) qb.andWhere('l.loginAt <= :to', { to: new Date(q.to) });

    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, pageSize };
  }

  /** Hoạt động gần đây cho trang Tổng quan: thao tác quản trị + các lần đăng nhập thất bại. */
  async recentActivity(limit = 6) {
    const [audits, fails] = await Promise.all([
      this.auditRepo.find({ order: { createdAt: 'DESC' }, take: limit }),
      this.loginRepo.find({ where: { status: In(['failed', 'locked']) }, order: { loginAt: 'DESC' }, take: 3 }),
    ]);
    const fmt = (d: Date) =>
      new Date(d).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });

    const rows = [
      ...audits.map((a) => ({
        at: new Date(a.createdAt),
        id: a.id,
        action: a.description,
        user: a.actorName,
        status: 'success' as const,
      })),
      ...fails.map((f) => ({
        at: new Date(f.loginAt),
        id: 1_000_000 + f.id, // tránh trùng key với dòng audit
        action: f.status === 'locked' ? `Tài khoản bị khóa vẫn thử đăng nhập: ${f.email}` : `Đăng nhập thất bại: ${f.email}`,
        user: f.email,
        status: 'warning' as const,
      })),
    ];
    return rows
      .sort((a, b) => b.at.getTime() - a.at.getTime())
      .slice(0, limit)
      .map(({ at, ...r }) => ({ ...r, time: fmt(at) }));
  }
}

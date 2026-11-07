import { Injectable, Logger } from '@nestjs/common';
import type { AuthUser } from '../common/auth.decorators.js';
import type { Prisma, LoginStatus } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { LogQueryDto } from './audit.dto.js';

const escapeLike = (s: string) => s.replace(/[\\%_]/g, (c) => `\\${c}`);

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);
  constructor(private readonly db: PrismaService) {}

  async log(
    actor: Pick<AuthUser, 'id' | 'name' | 'sessionId'> | null,
    entry: {
      action: string;
      entityName: string;
      entityId?: string | number | null;
      description: string;
    },
  ): Promise<void> {
    try {
      const account = actor
        ? await this.db.account.findUnique({
            where: { id: actor.id },
            select: { id: true },
          })
        : null;
      await this.db.auditLog.create({
        data: {
          loginLogId: actor?.sessionId ?? null,
          accountId: account?.id ?? null,
          actorName: (actor?.name ?? 'Hệ thống').slice(0, 150),
          action: entry.action,
          entityName: entry.entityName,
          entityId: entry.entityId == null ? null : String(entry.entityId),
          description: entry.description,
        },
      });
    } catch (e) {
      this.logger.error(`Không ghi được nhật ký: ${(e as Error).message}`);
    }
  }

  recordLogin(input: {
    accountId: number | null;
    email: string;
    ip?: string | null;
    status: LoginStatus;
  }) {
    return this.db.loginLog.create({
      data: {
        accountId: input.accountId,
        email: input.email.slice(0, 150),
        ipAddress: input.ip?.slice(0, 60),
        status: input.status,
      },
    });
  }

  async recordLogout(sessionId?: number) {
    if (sessionId)
      await this.db.loginLog.updateMany({
        where: { id: sessionId, logoutAt: null },
        data: { logoutAt: new Date() },
      });
  }

  async listAudit(q: LogQueryDto) {
    const page = q.page ?? 1,
      pageSize = q.pageSize ?? 20;
    const s = q.search?.trim();
    const where: Prisma.AuditLogWhereInput = {
      ...(s
        ? {
            OR: [
              { description: { contains: escapeLike(s), mode: 'insensitive' } },
              { actorName: { contains: escapeLike(s), mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(q.entity ? { entityName: q.entity } : {}),
      ...(q.from || q.to
        ? {
            createdAt: {
              ...(q.from ? { gte: new Date(q.from) } : {}),
              ...(q.to ? { lte: new Date(q.to) } : {}),
            },
          }
        : {}),
    };
    const [items, total] = await this.db.$transaction([
      this.db.auditLog.findMany({
        where,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.db.auditLog.count({ where }),
    ]);
    return { items, total, page, pageSize };
  }

  async listLogins(q: LogQueryDto) {
    const page = q.page ?? 1,
      pageSize = q.pageSize ?? 20;
    const s = q.search?.trim();
    const where: Prisma.LoginLogWhereInput = {
      ...(s
        ? {
            OR: [
              { email: { contains: escapeLike(s), mode: 'insensitive' } },
              { ipAddress: { contains: escapeLike(s), mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(q.status ? { status: q.status as LoginStatus } : {}),
      ...(q.from || q.to
        ? {
            loginAt: {
              ...(q.from ? { gte: new Date(q.from) } : {}),
              ...(q.to ? { lte: new Date(q.to) } : {}),
            },
          }
        : {}),
    };
    const [items, total] = await this.db.$transaction([
      this.db.loginLog.findMany({
        where,
        orderBy: [{ loginAt: 'desc' }, { id: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.db.loginLog.count({ where }),
    ]);
    return { items, total, page, pageSize };
  }

  async recentActivity(limit = 6) {
    const [audits, fails] = await Promise.all([
      this.db.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
      }),
      this.db.loginLog.findMany({
        where: { status: { in: ['failed', 'locked'] } },
        orderBy: { loginAt: 'desc' },
        take: 3,
      }),
    ]);
    return [
      ...audits.map((a) => ({
        at: a.createdAt,
        id: a.id,
        action: a.description,
        user: a.actorName,
        status: 'success',
      })),
      ...fails.map((f) => ({
        at: f.loginAt,
        id: 1000000 + f.id,
        action: `Đăng nhập ${f.status === 'locked' ? 'bị khóa' : 'thất bại'}: ${f.email}`,
        user: f.email,
        status: 'warning',
      })),
    ]
      .sort((a, b) => b.at.getTime() - a.at.getTime())
      .slice(0, limit)
      .map(({ at, ...r }) => ({
        ...r,
        time: at.toLocaleString('vi-VN', {
          timeZone: 'Asia/Ho_Chi_Minh',
          hour12: false,
        }),
      }));
  }
}

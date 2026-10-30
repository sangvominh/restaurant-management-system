import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { accountResponse } from '../common/account-response.js';
import { isSystemAdmin } from '../common/management-policy.js';
import { AuditService } from '../audit/audit.service.js';
import { AuthUser } from '../common/auth.decorators.js';
import { ALL_PERMISSION_KEYS, WILDCARD } from '../common/permissions.js';

export const BACKUP_APP = 'mrp-admin-backup';
export const BACKUP_VERSION = 1;

interface RoleRow {
  id: number;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: string[];
  createdAt?: Date;
}
interface AccountRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'locked';
  passwordHash: string | null;
  username?: string | null;
  phone?: string | null;
  createdAt?: Date;
}
interface CategoryRow {
  id: number;
  type: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
}
interface SettingRow {
  id: number;
  restaurantName: string;
  email: string;
  phone: string | null;
  currency: string;
  tax: number;
}

interface ParsedBackup {
  roles: RoleRow[];
  accounts: AccountRow[];
  categories: CategoryRow[];
  settings: SettingRow[];
  meta: { exportedAt: string | null; exportedBy: string | null };
}

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);
const isId = (v: unknown): v is number =>
  Number.isInteger(v) && (v as number) > 0 && (v as number) <= 2147483647;

@Injectable()
export class BackupService {
  constructor(
    private readonly db: PrismaService,
    private readonly audit: AuditService,
  ) {}

  /** Sao lưu: gom toàn bộ dữ liệu quản trị thành một tệp JSON có đánh dấu phiên bản. */
  async exportAll(actor: AuthUser) {
    const [roles, rawAccounts, categories, settings] =
      await this.db.$transaction(
        [
          this.db.role.findMany({ orderBy: { id: 'asc' } }),
          this.db.account.findMany({
            include: { role: true },
            orderBy: { id: 'asc' },
          }),
          this.db.category.findMany({ orderBy: { id: 'asc' } }),
          this.db.systemSetting.findMany({ orderBy: { id: 'asc' } }),
        ],
        { isolationLevel: 'RepeatableRead' },
      );
    const accounts = rawAccounts.map((a) => ({
      ...accountResponse(a),
      passwordHash: a.passwordHash,
    }));

    await this.audit.log(actor, {
      action: 'backup.export',
      entityName: 'backup',
      description: `Sao lưu dữ liệu: ${accounts.length} tài khoản, ${roles.length} vai trò, ${categories.length} danh mục`,
    });

    return {
      app: BACKUP_APP,
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      exportedBy: actor.email,
      counts: {
        roles: roles.length,
        accounts: accounts.length,
        categories: categories.length,
        settings: settings.length,
      },
      data: { roles, accounts, categories, settings },
    };
  }

  /**
   * Phục hồi. dryRun=true chỉ kiểm tra và cho xem trước, không ghi gì.
   * Phục hồi trong một transaction; giữ tài khoản/nhật ký đã phát sinh và khóa tài khoản ngoài bản sao lưu.
   */
  async restore(body: unknown, dryRun: boolean, actor: AuthUser) {
    if (!isSystemAdmin(actor))
      throw new ForbiddenException(
        'Chỉ Admin hệ thống được phục hồi tài khoản và quyền',
      );
    const backup = this.parse(body);

    const warnings: string[] = [
      'Mọi phiên đăng nhập sẽ bị thu hồi. Tài khoản không có trong bản sao lưu sẽ bị khóa; nhật ký và dữ liệu nghiệp vụ được giữ lại.',
    ];
    const me = backup.accounts.find(
      (a) => a.email.toLowerCase() === actor.email.toLowerCase(),
    );
    if (!me)
      warnings.push(
        'Tài khoản bạn đang dùng không có trong bản sao lưu: bạn sẽ bị đăng xuất và có thể không đăng nhập lại được bằng tài khoản này.',
      );
    else if (me.status === 'locked')
      warnings.push('Tài khoản bạn đang dùng bị khóa trong bản sao lưu.');
    else
      warnings.push(
        'Mật khẩu và vai trò của mọi tài khoản sẽ quay về đúng như lúc sao lưu (kể cả mật khẩu của bạn).',
      );

    const summary = {
      roles: backup.roles.length,
      accounts: backup.accounts.length,
      categories: backup.categories.length,
      settings: backup.settings.length,
      exportedAt: backup.meta.exportedAt,
      exportedBy: backup.meta.exportedBy,
    };

    if (dryRun) return { dryRun: true, summary, warnings };

    await this.db.adminTransaction(async (tx) => {
      const existing = await tx.account.findMany({
        select: { id: true, email: true, createdAt: true },
      });
      for (const a of backup.accounts) {
        const sameId = existing.find((x) => x.id === a.id);
        const sameEmail = existing.find(
          (x) => x.email.toLowerCase() === a.email.toLowerCase(),
        );
        if (
          (sameEmail && sameEmail.id !== a.id) ||
          (sameId &&
            sameId.email.toLowerCase() !== a.email.toLowerCase() &&
            (!a.createdAt ||
              a.createdAt.getTime() !== sameId.createdAt.getTime()))
        ) {
          throw new BadRequestException(
            'Bản sao lưu có ID tài khoản xung đột với hệ thống hiện tại',
          );
        }
      }
      await tx.loginLog.updateMany({
        where: { logoutAt: null },
        data: { logoutAt: new Date() },
      });
      for (const r of backup.roles)
        await tx.role.upsert({ where: { id: r.id }, create: r, update: r });
      const roleIds = new Map(backup.roles.map((r) => [r.name, r.id]));
      for (const a of backup.accounts) {
        const { role, ...fields } = a;
        const data = { ...fields, roleId: roleIds.get(role)! };
        await tx.account.upsert({
          where: { id: a.id },
          create: { ...data, sessionVersion: 1 },
          update: { ...data, sessionVersion: { increment: 1 } },
        });
      }
      await tx.account.updateMany({
        where: { id: { notIn: backup.accounts.map((a) => a.id) } },
        data: { status: 'locked', sessionVersion: { increment: 1 } },
      });
      await tx.role.deleteMany({
        where: {
          id: { notIn: backup.roles.map((r) => r.id) },
          accounts: { none: {} },
        },
      });
      await tx.category.deleteMany({
        where: { id: { notIn: backup.categories.map((c) => c.id) } },
      });
      for (const c of backup.categories)
        await tx.category.upsert({ where: { id: c.id }, create: c, update: c });
      for (const s of backup.settings)
        await tx.systemSetting.upsert({
          where: { id: s.id },
          create: s,
          update: s,
        });
      for (const table of [
        'accounts',
        'roles',
        'categories',
        'system_settings',
      ]) {
        await tx.$queryRaw(Prisma.sql`SELECT setval(pg_get_serial_sequence(${table}, 'id'),
          COALESCE((SELECT MAX(id) FROM ${Prisma.raw('"' + table + '"')}), 0) + 1, false)::text`);
      }
    });

    await this.audit.log(actor, {
      action: 'backup.restore',
      entityName: 'backup',
      description: `Phục hồi dữ liệu từ bản sao lưu ${backup.meta.exportedAt ?? '(không rõ thời điểm)'}: ${summary.accounts} tài khoản, ${summary.roles} vai trò, ${summary.categories} danh mục`,
    });

    return { dryRun: false, summary, warnings };
  }

  /** Kiểm tra kỹ tệp trước khi đụng tới DB. Gom hết lỗi để người dùng sửa một lượt. */
  private parse(body: unknown): ParsedBackup {
    const errors: string[] = [];
    const fail = () => {
      throw new BadRequestException(
        errors.slice(0, 8).join('; ') +
          (errors.length > 8 ? `; ... (${errors.length} lỗi)` : ''),
      );
    };

    if (!isObj(body) || body.app !== BACKUP_APP || !isObj(body.data)) {
      throw new BadRequestException(
        'Đây không phải tệp sao lưu của hệ thống này',
      );
    }
    if (body.version !== BACKUP_VERSION) {
      throw new BadRequestException(
        `Phiên bản tệp sao lưu (${String(body.version)}) không được hỗ trợ`,
      );
    }
    const d = body.data;
    for (const k of ['roles', 'accounts', 'categories', 'settings']) {
      if (!Array.isArray(d[k])) errors.push(`Thiếu mục "${k}"`);
    }
    if (errors.length) fail();

    const toDate = (v: unknown, where: string): Date | undefined => {
      if (v == null) return undefined;
      const t = new Date(v as string);
      if (Number.isNaN(t.getTime())) {
        errors.push(`${where}: ngày không hợp lệ`);
        return undefined;
      }
      return t;
    };
    const text = (
      v: unknown,
      where: string,
      max: number,
      required = true,
    ): string => {
      if (typeof v !== 'string' || (required && !v.trim()) || v.length > max) {
        errors.push(
          `${where}: phải là chuỗi${required ? ' không rỗng' : ''}, tối đa ${max} ký tự`,
        );
        return '';
      }
      return v;
    };

    // --- roles ---
    const roleIds = new Set<number>();
    const roleNames = new Set<string>();
    const roles: RoleRow[] = (d.roles as unknown[]).map((raw, i) => {
      const w = `Vai trò #${i + 1}`;
      const r = isObj(raw) ? raw : {};
      if (!isObj(raw)) errors.push(`${w}: sai định dạng`);
      if (!isId(r.id) || roleIds.has(r.id as number))
        errors.push(`${w}: id thiếu hoặc trùng`);
      roleIds.add(r.id as number);
      const name = text(r.name, `${w} (tên)`, 100);
      if (roleNames.has(name)) errors.push(`${w}: tên "${name}" bị trùng`);
      roleNames.add(name);
      const perms = Array.isArray(r.permissions)
        ? (r.permissions as unknown[])
        : (errors.push(`${w}: permissions phải là mảng`), []);
      for (const p of perms) {
        if (
          typeof p !== 'string' ||
          (p !== WILDCARD && !ALL_PERMISSION_KEYS.includes(p))
        ) {
          errors.push(`${w}: quyền không tồn tại "${String(p)}"`);
        }
      }
      if ((r.isSystem === true) !== perms.includes(WILDCARD))
        errors.push(
          `${w}: vai trò hệ thống phải có toàn quyền, vai trò thường không được chứa '*'`,
        );
      return {
        id: r.id as number,
        name,
        description: typeof r.description === 'string' ? r.description : '',
        isSystem: r.isSystem === true,
        permissions: perms as string[],
        createdAt: toDate(r.createdAt, w),
      };
    });

    // --- accounts ---
    const accIds = new Set<number>();
    const emails = new Set<string>();
    const usernames = new Set<string>();
    const accounts: AccountRow[] = (d.accounts as unknown[]).map((raw, i) => {
      const w = `Tài khoản #${i + 1}`;
      const r = isObj(raw) ? raw : {};
      if (!isObj(raw)) errors.push(`${w}: sai định dạng`);
      if (!isId(r.id) || accIds.has(r.id as number))
        errors.push(`${w}: id thiếu hoặc trùng`);
      accIds.add(r.id as number);
      const email = text(r.email, `${w} (email)`, 150).toLowerCase();
      if (email && !/^[^@\s]+@[^@\s]+$/.test(email))
        errors.push(`${w}: email không hợp lệ`);
      if (emails.has(email.toLowerCase()))
        errors.push(`${w}: email "${email}" bị trùng`);
      emails.add(email.toLowerCase());
      const role = text(r.role, `${w} (vai trò)`, 100);
      if (role && !roleNames.has(role))
        errors.push(`${w}: vai trò "${role}" không có trong bản sao lưu`);
      if (r.status !== 'active' && r.status !== 'locked')
        errors.push(`${w}: trạng thái phải là active hoặc locked`);
      const hash = r.passwordHash;
      if (typeof r.username === 'string') {
        if (usernames.has(r.username))
          errors.push(`${w}: tên đăng nhập bị trùng`);
        usernames.add(r.username);
      }
      if (
        hash != null &&
        (typeof hash !== 'string' || !/^\$2[aby]\$\d{2}\$.{53}$/.test(hash))
      ) {
        errors.push(`${w}: mật khẩu băm không đúng định dạng bcrypt`);
      }
      return {
        id: r.id as number,
        name: text(r.name, `${w} (tên)`, 100),
        email,
        role,
        status: r.status as 'active' | 'locked',
        passwordHash: typeof hash === 'string' ? hash : null,
        username:
          r.username == null
            ? null
            : text(r.username, `${w} (tên đăng nhập)`, 100),
        phone:
          r.phone == null
            ? null
            : text(r.phone, `${w} (điện thoại)`, 20, false),
        createdAt: toDate(r.createdAt, w),
      };
    });

    // --- categories ---
    const catIds = new Set<number>();
    const catNames = new Set<string>();
    const categories: CategoryRow[] = (d.categories as unknown[]).map(
      (raw, i) => {
        const w = `Danh mục #${i + 1}`;
        const r = isObj(raw) ? raw : {};
        if (!isObj(raw)) errors.push(`${w}: sai định dạng`);
        if (!isId(r.id) || catIds.has(r.id as number))
          errors.push(`${w}: id thiếu hoặc trùng`);
        catIds.add(r.id as number);
        const categoryKey = JSON.stringify([r.type, r.name]);
        if (catNames.has(categoryKey))
          errors.push(`${w}: tên bị trùng trong cùng nhóm`);
        catNames.add(categoryKey);
        if (r.status !== 'active' && r.status !== 'inactive')
          errors.push(`${w}: trạng thái phải là active hoặc inactive`);
        return {
          id: r.id as number,
          type: text(r.type, `${w} (nhóm)`, 100),
          name: text(r.name, `${w} (tên)`, 150),
          status: r.status as 'active' | 'inactive',
          createdAt: toDate(r.createdAt, w),
        };
      },
    );

    // --- settings ---
    if ((d.settings as unknown[]).length > 1)
      errors.push('Cấu hình hệ thống chỉ được có tối đa 1 bản ghi');
    const settings: SettingRow[] = (d.settings as unknown[]).map((raw, i) => {
      const w = `Cấu hình #${i + 1}`;
      const r = isObj(raw) ? raw : {};
      if (r.id !== 1) errors.push(`${w}: cấu hình hệ thống phải có id = 1`);
      if (
        typeof r.tax !== 'number' ||
        !Number.isFinite(r.tax) ||
        r.tax < 0 ||
        r.tax > 100
      )
        errors.push(`${w}: thuế phải từ 0 đến 100`);
      if (!['VND', 'USD'].includes(String(r.currency)))
        errors.push(`${w}: tiền tệ phải là VND hoặc USD`);
      return {
        id: r.id as number,
        restaurantName: text(r.restaurantName, `${w} (tên nhà hàng)`, 150),
        email: text(r.email, `${w} (email)`, 150),
        phone: typeof r.phone === 'string' ? r.phone.slice(0, 20) : null,
        currency: text(r.currency, `${w} (tiền tệ)`, 10),
        tax: r.tax as number,
      };
    });

    // Chặn phục hồi khiến không còn ai vào được hệ thống.
    const adminRoles = new Set(
      roles.filter((r) => r.permissions.includes(WILDCARD)).map((r) => r.name),
    );
    const hasUsableAdmin = accounts.some(
      (a) => a.status === 'active' && a.passwordHash && adminRoles.has(a.role),
    );
    if (!hasUsableAdmin) {
      errors.push(
        'Bản sao lưu phải có ít nhất một tài khoản quản trị viên đang hoạt động và có mật khẩu, nếu không sẽ không ai đăng nhập được',
      );
    }

    if (errors.length) fail();

    return {
      roles,
      accounts,
      categories,
      settings,
      meta: {
        exportedAt:
          typeof body.exportedAt === 'string' ? body.exportedAt : null,
        exportedBy:
          typeof body.exportedBy === 'string' ? body.exportedBy : null,
      },
    };
  }
}

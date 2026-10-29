import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { AccountEntity } from '../api/admin/account.entity';
import { CategoryEntity } from '../api/admin/category.entity';
import { RoleEntity } from '../api/admin/role.entity';
import { SettingEntity } from '../api/admin/setting.entity';
import { AuditService } from '../audit/audit.service';
import { AuthUser } from '../common/auth.decorators';
import { ALL_PERMISSION_KEYS, WILDCARD } from '../common/permissions';

export const BACKUP_APP = 'mrp-admin-backup';
export const BACKUP_VERSION = 1;

interface RoleRow { id: number; name: string; description: string; isSystem: boolean; permissions: string[]; createdAt?: Date }
interface AccountRow { id: number; name: string; email: string; role: string; status: 'active' | 'locked'; passwordHash: string | null; createdAt?: Date }
interface CategoryRow { id: number; type: string; name: string; status: 'active' | 'inactive'; createdAt?: Date }
interface SettingRow { id: number; restaurantName: string; email: string; phone: string | null; currency: string; tax: number }

interface ParsedBackup {
  roles: RoleRow[];
  accounts: AccountRow[];
  categories: CategoryRow[];
  settings: SettingRow[];
  meta: { exportedAt: string | null; exportedBy: string | null };
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isId = (v: unknown): v is number => Number.isInteger(v) && (v as number) > 0;

@Injectable()
export class BackupService {
  constructor(
    @InjectDataSource() private readonly ds: DataSource,
    private readonly audit: AuditService,
  ) {}

  /** Sao lưu: gom toàn bộ dữ liệu quản trị thành một tệp JSON có đánh dấu phiên bản. */
  async exportAll(actor: AuthUser) {
    const [roles, accounts, categories, settings] = await Promise.all([
      this.ds.getRepository(RoleEntity).find({ order: { id: 'ASC' } }),
      // passwordHash là select:false nên phải addSelect tường minh; chỉ băm bcrypt, không bao giờ có mật khẩu gốc.
      this.ds.getRepository(AccountEntity).createQueryBuilder('a').addSelect('a.passwordHash').orderBy('a.id', 'ASC').getMany(),
      this.ds.getRepository(CategoryEntity).find({ order: { id: 'ASC' } }),
      this.ds.getRepository(SettingEntity).find({ order: { id: 'ASC' } }),
    ]);

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
      counts: { roles: roles.length, accounts: accounts.length, categories: categories.length, settings: settings.length },
      data: { roles, accounts, categories, settings },
    };
  }

  /**
   * Phục hồi. dryRun=true chỉ kiểm tra và cho xem trước, không ghi gì.
   * Thật sự phục hồi: thay thế toàn bộ dữ liệu quản trị trong MỘT transaction (lỗi giữa chừng thì hoàn tác hết).
   */
  async restore(body: unknown, dryRun: boolean, actor: AuthUser) {
    const backup = this.parse(body);

    const warnings: string[] = [];
    const me = backup.accounts.find((a) => a.email.toLowerCase() === actor.email.toLowerCase());
    if (!me) warnings.push('Tài khoản bạn đang dùng không có trong bản sao lưu: bạn sẽ bị đăng xuất và có thể không đăng nhập lại được bằng tài khoản này.');
    else if (me.status === 'locked') warnings.push('Tài khoản bạn đang dùng bị khóa trong bản sao lưu.');
    else warnings.push('Mật khẩu và vai trò của mọi tài khoản sẽ quay về đúng như lúc sao lưu (kể cả mật khẩu của bạn).');

    const summary = {
      roles: backup.roles.length,
      accounts: backup.accounts.length,
      categories: backup.categories.length,
      settings: backup.settings.length,
      exportedAt: backup.meta.exportedAt,
      exportedBy: backup.meta.exportedBy,
    };

    if (dryRun) return { dryRun: true, summary, warnings };

    await this.ds.transaction(async (em) => {
      // Xóa theo thứ tự rồi chèn lại với đúng id ban đầu để quan hệ theo tên/id vẫn khớp.
      await em.query('DELETE FROM accounts');
      await em.query('DELETE FROM roles');
      await em.query('DELETE FROM categories');
      await em.query('DELETE FROM system_settings');

      if (backup.roles.length) await em.getRepository(RoleEntity).insert(backup.roles as any);
      if (backup.accounts.length) await em.getRepository(AccountEntity).insert(backup.accounts as any);
      if (backup.categories.length) await em.getRepository(CategoryEntity).insert(backup.categories as any);
      if (backup.settings.length) await em.getRepository(SettingEntity).insert(backup.settings as any);

      // Đặt lại bộ đếm id tự tăng, nếu không lần tạo mới kế tiếp sẽ trùng id đã chèn.
      for (const table of ['accounts', 'roles', 'categories', 'system_settings']) {
        await this.resetSequence(em, table);
      }
    });

    await this.audit.log(actor, {
      action: 'backup.restore',
      entityName: 'backup',
      description: `Phục hồi dữ liệu từ bản sao lưu ${backup.meta.exportedAt ?? '(không rõ thời điểm)'}: ${summary.accounts} tài khoản, ${summary.roles} vai trò, ${summary.categories} danh mục`,
    });

    return { dryRun: false, summary, warnings };
  }

  private async resetSequence(em: EntityManager, table: string) {
    await em.query(
      `SELECT setval(pg_get_serial_sequence('${table}', 'id'), COALESCE((SELECT MAX(id) FROM ${table}), 0) + 1, false)`,
    );
  }

  /** Kiểm tra kỹ tệp trước khi đụng tới DB. Gom hết lỗi để người dùng sửa một lượt. */
  private parse(body: unknown): ParsedBackup {
    const errors: string[] = [];
    const fail = () => {
      throw new BadRequestException(errors.slice(0, 8).join('; ') + (errors.length > 8 ? `; ... (${errors.length} lỗi)` : ''));
    };

    if (!isObj(body) || body.app !== BACKUP_APP || !isObj(body.data)) {
      throw new BadRequestException('Đây không phải tệp sao lưu của hệ thống này');
    }
    if (body.version !== BACKUP_VERSION) {
      throw new BadRequestException(`Phiên bản tệp sao lưu (${String(body.version)}) không được hỗ trợ`);
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
    const text = (v: unknown, where: string, max: number, required = true): string => {
      if (typeof v !== 'string' || (required && !v.trim()) || v.length > max) {
        errors.push(`${where}: phải là chuỗi${required ? ' không rỗng' : ''}, tối đa ${max} ký tự`);
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
      if (!isId(r.id) || roleIds.has(r.id as number)) errors.push(`${w}: id thiếu hoặc trùng`);
      roleIds.add(r.id as number);
      const name = text(r.name, `${w} (tên)`, 100);
      if (roleNames.has(name)) errors.push(`${w}: tên "${name}" bị trùng`);
      roleNames.add(name);
      const perms = Array.isArray(r.permissions) ? (r.permissions as unknown[]) : (errors.push(`${w}: permissions phải là mảng`), []);
      for (const p of perms) {
        if (typeof p !== 'string' || (p !== WILDCARD && !ALL_PERMISSION_KEYS.includes(p))) {
          errors.push(`${w}: quyền không tồn tại "${String(p)}"`);
        }
      }
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
    const accounts: AccountRow[] = (d.accounts as unknown[]).map((raw, i) => {
      const w = `Tài khoản #${i + 1}`;
      const r = isObj(raw) ? raw : {};
      if (!isObj(raw)) errors.push(`${w}: sai định dạng`);
      if (!isId(r.id) || accIds.has(r.id as number)) errors.push(`${w}: id thiếu hoặc trùng`);
      accIds.add(r.id as number);
      const email = text(r.email, `${w} (email)`, 150);
      if (email && !/^[^@\s]+@[^@\s]+$/.test(email)) errors.push(`${w}: email không hợp lệ`);
      if (emails.has(email.toLowerCase())) errors.push(`${w}: email "${email}" bị trùng`);
      emails.add(email.toLowerCase());
      const role = text(r.role, `${w} (vai trò)`, 100);
      if (role && !roleNames.has(role)) errors.push(`${w}: vai trò "${role}" không có trong bản sao lưu`);
      if (r.status !== 'active' && r.status !== 'locked') errors.push(`${w}: trạng thái phải là active hoặc locked`);
      const hash = r.passwordHash;
      if (hash != null && (typeof hash !== 'string' || !/^\$2[aby]\$\d{2}\$.{53}$/.test(hash))) {
        errors.push(`${w}: mật khẩu băm không đúng định dạng bcrypt`);
      }
      return {
        id: r.id as number,
        name: text(r.name, `${w} (tên)`, 100),
        email,
        role,
        status: r.status as 'active' | 'locked',
        passwordHash: typeof hash === 'string' ? hash : null,
        createdAt: toDate(r.createdAt, w),
      };
    });

    // --- categories ---
    const catIds = new Set<number>();
    const categories: CategoryRow[] = (d.categories as unknown[]).map((raw, i) => {
      const w = `Danh mục #${i + 1}`;
      const r = isObj(raw) ? raw : {};
      if (!isObj(raw)) errors.push(`${w}: sai định dạng`);
      if (!isId(r.id) || catIds.has(r.id as number)) errors.push(`${w}: id thiếu hoặc trùng`);
      catIds.add(r.id as number);
      if (r.status !== 'active' && r.status !== 'inactive') errors.push(`${w}: trạng thái phải là active hoặc inactive`);
      return {
        id: r.id as number,
        type: text(r.type, `${w} (nhóm)`, 100),
        name: text(r.name, `${w} (tên)`, 150),
        status: r.status as 'active' | 'inactive',
        createdAt: toDate(r.createdAt, w),
      };
    });

    // --- settings ---
    if ((d.settings as unknown[]).length > 1) errors.push('Cấu hình hệ thống chỉ được có tối đa 1 bản ghi');
    const settings: SettingRow[] = (d.settings as unknown[]).map((raw, i) => {
      const w = `Cấu hình #${i + 1}`;
      const r = isObj(raw) ? raw : {};
      if (!isId(r.id)) errors.push(`${w}: id thiếu`);
      if (typeof r.tax !== 'number' || r.tax < 0 || r.tax > 100) errors.push(`${w}: thuế phải từ 0 đến 100`);
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
    const adminRoles = new Set(roles.filter((r) => r.permissions.includes(WILDCARD)).map((r) => r.name));
    const hasUsableAdmin = accounts.some((a) => a.status === 'active' && a.passwordHash && adminRoles.has(a.role));
    if (!hasUsableAdmin) {
      errors.push('Bản sao lưu phải có ít nhất một tài khoản quản trị viên đang hoạt động và có mật khẩu, nếu không sẽ không ai đăng nhập được');
    }

    if (errors.length) fail();

    return {
      roles,
      accounts,
      categories,
      settings,
      meta: {
        exportedAt: typeof body.exportedAt === 'string' ? body.exportedAt : null,
        exportedBy: typeof body.exportedBy === 'string' ? body.exportedBy : null,
      },
    };
  }
}

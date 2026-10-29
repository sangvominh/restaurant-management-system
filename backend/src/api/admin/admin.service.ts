import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { In, Repository } from 'typeorm';
import { AuditService } from '../../audit/audit.service';
import { AuthUser } from '../../common/auth.decorators';
import { DEFAULT_ROLE_PERMISSIONS, PERMISSIONS, WILDCARD } from '../../common/permissions';
import { AccountEntity } from './account.entity';
import { CategoryEntity } from './category.entity';
import {
  CreateAccountDto,
  CreateCategoryDto,
  CreateRoleDto,
  UpdateAccountDto,
  UpdateCategoryDto,
  UpdateRoleDto,
  UpdateSettingsDto,
} from './dto/admin.dto';
import { RoleEntity } from './role.entity';
import { SettingEntity } from './setting.entity';

export interface RoleResponse {
  id: number;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: string[];
  usersCount: number;
}

const BCRYPT_ROUNDS = 10;

@Injectable()
export class AdminService implements OnModuleInit {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectRepository(AccountEntity) private readonly accountRepo: Repository<AccountEntity>,
    @InjectRepository(RoleEntity) private readonly roleRepo: Repository<RoleEntity>,
    @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(SettingEntity) private readonly settingRepo: Repository<SettingEntity>,
    private readonly audit: AuditService,
  ) {}

  /* ==================== SEED DỮ LIỆU MẪU ==================== */
  async onModuleInit() {
    await this.seedRoles();
    await this.seedAccounts();
    await this.seedCategories();
    await this.getSettings(); // tự tạo dòng cấu hình mặc định nếu chưa có
  }

  private async seedRoles() {
    if ((await this.roleRepo.count()) === 0) {
      await this.roleRepo.save([
        { name: 'Quản trị viên (Admin)', description: 'Toàn quyền truy cập hệ thống', isSystem: true },
        { name: 'Quản lý nhà hàng', description: 'Quản lý vận hành, nhân sự và báo cáo doanh thu', isSystem: false },
        { name: 'Quản lý kho', description: 'Quản lý nguyên vật liệu, nhập/xuất tồn kho MRP', isSystem: false },
        { name: 'Thu ngân', description: 'Quản lý thanh toán, hóa đơn', isSystem: false },
        { name: 'Nhân viên', description: 'Nhân viên phục vụ và tiếp nhận order', isSystem: false },
      ]);
    }
    const roles = await this.roleRepo.find();

    // Di trú một lần: DB cũ chưa có cột quyền (tất cả đang rỗng) -> điền quyền mặc định theo tên vai trò.
    if (roles.length > 0 && roles.every((r) => r.permissions.length === 0)) {
      for (const r of roles) r.permissions = DEFAULT_ROLE_PERMISSIONS[r.name] ?? [];
      await this.roleRepo.save(roles);
      this.logger.log('Đã gán quyền mặc định cho các vai trò mẫu');
    }
    // Vai trò hệ thống luôn giữ toàn quyền, để không ai tự khóa mình ra khỏi hệ thống.
    for (const r of roles.filter((x) => x.isSystem && !x.permissions.includes(WILDCARD))) {
      r.permissions = [WILDCARD];
      await this.roleRepo.save(r);
    }
  }

  private async seedAccounts() {
    const password = process.env.SEED_DEFAULT_PASSWORD || 'Admin@123';
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    if ((await this.accountRepo.count()) === 0) {
      await this.accountRepo.save([
        { name: 'Nguyễn Văn A', email: 'a@gmail.com', role: 'Quản trị viên (Admin)', status: 'active', passwordHash },
        { name: 'Trần Thị B', email: 'b@gmail.com', role: 'Quản lý kho', status: 'active', passwordHash },
        { name: 'Lê Văn C', email: 'c@gmail.com', role: 'Nhân viên', status: 'locked', passwordHash },
      ]);
      this.logger.warn(`Đã tạo 3 tài khoản mẫu (a/b/c@gmail.com), mật khẩu mặc định: ${password}`);
    }

    // Tài khoản cũ chưa có mật khẩu -> đặt mật khẩu mặc định để đăng nhập được.
    const missing = await this.accountRepo
      .createQueryBuilder('a')
      .where('a.passwordHash IS NULL')
      .getMany();
    for (const a of missing) await this.accountRepo.update(a.id, { passwordHash });
    if (missing.length) this.logger.warn(`Đã đặt mật khẩu mặc định cho ${missing.length} tài khoản cũ`);
  }

  private async seedCategories() {
    if ((await this.categoryRepo.count()) > 0) return;
    await this.categoryRepo.save([
      { type: 'Nhóm món ăn', name: 'Món Nướng', status: 'active' },
      { type: 'Nhóm món ăn', name: 'Món Lẩu', status: 'active' },
      { type: 'Đơn vị tính', name: 'Kilogram (Kg)', status: 'active' },
      { type: 'Đơn vị tính', name: 'Lít (L)', status: 'active' },
      { type: 'Trạng thái đơn', name: 'Chờ chế biến', status: 'active' },
      { type: 'Khu vực bàn', name: 'Tầng 1 - Sảnh chính', status: 'active' },
    ]);
  }

  /* ==================== HELPER ==================== */
  private findAccountByEmail(email: string) {
    return this.accountRepo
      .createQueryBuilder('a')
      .where('LOWER(a.email) = LOWER(:email)', { email })
      .getOne();
  }

  private async assertRoleExists(name: string) {
    if (!(await this.roleRepo.findOne({ where: { name } }))) {
      throw new BadRequestException(`Vai trò "${name}" không tồn tại`);
    }
  }

  private async adminRoleNames(): Promise<string[]> {
    const roles = await this.roleRepo.find();
    return roles.filter((r) => r.permissions.includes(WILDCARD)).map((r) => r.name);
  }

  /** Tài khoản này có phải quản trị viên đang hoạt động duy nhất không? */
  private async isLastActiveAdmin(account: AccountEntity): Promise<boolean> {
    const adminRoles = await this.adminRoleNames();
    if (account.status !== 'active' || !adminRoles.includes(account.role)) return false;
    const count = await this.accountRepo.count({ where: { role: In(adminRoles), status: 'active' } });
    return count <= 1;
  }

  /* ==================== TÀI KHOẢN ==================== */
  getAllAccounts(): Promise<AccountEntity[]> {
    return this.accountRepo.find({ order: { id: 'DESC' } });
  }

  async createAccount(dto: CreateAccountDto, actor: AuthUser): Promise<AccountEntity> {
    await this.assertRoleExists(dto.role);
    if (await this.findAccountByEmail(dto.email)) {
      throw new BadRequestException('Email này đã được sử dụng bởi tài khoản khác!');
    }
    const saved = await this.accountRepo.save(
      this.accountRepo.create({
        name: dto.name,
        email: dto.email.toLowerCase(),
        role: dto.role,
        status: 'active',
        passwordHash: await bcrypt.hash(dto.password, BCRYPT_ROUNDS),
      }),
    );
    await this.audit.log(actor, {
      action: 'account.create',
      entityName: 'account',
      entityId: saved.id,
      description: `Tạo tài khoản ${saved.email} (vai trò "${saved.role}")`,
    });
    // Đọc lại để response không chứa passwordHash.
    return this.accountRepo.findOneOrFail({ where: { id: saved.id } });
  }

  async updateAccount(id: number, dto: UpdateAccountDto, actor: AuthUser): Promise<AccountEntity> {
    const user = await this.accountRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Không tìm thấy tài khoản');
    const before = { name: user.name, email: user.email, role: user.role };

    if (dto.email && dto.email.toLowerCase() !== user.email.toLowerCase()) {
      if (await this.findAccountByEmail(dto.email)) {
        throw new BadRequestException('Email này đã được sử dụng bởi tài khoản khác!');
      }
      user.email = dto.email.toLowerCase();
    }
    if (dto.role !== undefined && dto.role !== user.role) {
      await this.assertRoleExists(dto.role);
      const adminRoles = await this.adminRoleNames();
      if (adminRoles.includes(user.role) && !adminRoles.includes(dto.role) && (await this.isLastActiveAdmin(user))) {
        throw new BadRequestException('Không thể hạ quyền quản trị viên đang hoạt động cuối cùng');
      }
      user.role = dto.role;
    }
    if (dto.name !== undefined) user.name = dto.name;

    await this.accountRepo.save(user);
    if (dto.password) {
      await this.accountRepo.update(id, { passwordHash: await bcrypt.hash(dto.password, BCRYPT_ROUNDS) });
    }

    const changes: string[] = [];
    if (before.name !== user.name) changes.push(`đổi tên "${before.name}" → "${user.name}"`);
    if (before.email !== user.email) changes.push(`đổi email ${before.email} → ${user.email}`);
    if (before.role !== user.role) changes.push(`đổi vai trò "${before.role}" → "${user.role}"`);
    if (dto.password) changes.push('đặt lại mật khẩu');
    if (changes.length) {
      await this.audit.log(actor, {
        action: 'account.update',
        entityName: 'account',
        entityId: id,
        description: `Cập nhật tài khoản ${user.email}: ${changes.join('; ')}`,
      });
    }
    return this.accountRepo.findOneOrFail({ where: { id } });
  }

  async toggleLockStatus(id: number, actor: AuthUser): Promise<AccountEntity> {
    const user = await this.accountRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Không tìm thấy tài khoản');

    if (user.status === 'active') {
      if (user.id === actor.id) throw new BadRequestException('Không thể tự khóa tài khoản của chính mình');
      if (await this.isLastActiveAdmin(user)) {
        throw new BadRequestException('Không thể khóa quản trị viên đang hoạt động cuối cùng');
      }
    }
    user.status = user.status === 'active' ? 'locked' : 'active';
    const saved = await this.accountRepo.save(user);
    await this.audit.log(actor, {
      action: saved.status === 'locked' ? 'account.lock' : 'account.unlock',
      entityName: 'account',
      entityId: saved.id,
      description: `${saved.status === 'locked' ? 'Khóa' : 'Mở khóa'} tài khoản ${saved.email}`,
    });
    return saved;
  }

  async deleteAccount(id: number, actor: AuthUser): Promise<{ message: string }> {
    const user = await this.accountRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Không tìm thấy tài khoản');
    if (user.id === actor.id) throw new BadRequestException('Không thể tự xóa tài khoản của chính mình');
    if (await this.isLastActiveAdmin(user)) {
      throw new BadRequestException('Không thể xóa quản trị viên đang hoạt động cuối cùng');
    }
    const email = user.email;
    await this.accountRepo.remove(user);
    await this.audit.log(actor, {
      action: 'account.delete',
      entityName: 'account',
      entityId: id,
      description: `Xóa tài khoản ${email}`,
    });
    return { message: 'Đã xóa tài khoản' };
  }

  /* ==================== VAI TRÒ & PHÂN QUYỀN ==================== */
  getPermissionCatalog() {
    return PERMISSIONS;
  }

  async getAllRoles(): Promise<RoleResponse[]> {
    const roles = await this.roleRepo.find({ order: { id: 'ASC' } });
    const rows: { role: string; count: string }[] = await this.accountRepo
      .createQueryBuilder('a')
      .select('a.role', 'role')
      .addSelect('COUNT(*)', 'count')
      .groupBy('a.role')
      .getRawMany();
    const counts = new Map(rows.map((r) => [r.role, Number(r.count)]));
    return roles.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      isSystem: r.isSystem,
      permissions: r.permissions,
      usersCount: counts.get(r.name) ?? 0,
    }));
  }

  async createRole(dto: CreateRoleDto, actor: AuthUser): Promise<RoleResponse> {
    if (await this.roleRepo.findOne({ where: { name: dto.name } })) {
      throw new BadRequestException('Tên vai trò này đã tồn tại!');
    }
    const saved = await this.roleRepo.save(
      this.roleRepo.create({
        name: dto.name,
        description: dto.description ?? '',
        permissions: dto.permissions ?? [],
        isSystem: false,
      }),
    );
    await this.audit.log(actor, {
      action: 'role.create',
      entityName: 'role',
      entityId: saved.id,
      description: `Tạo vai trò "${saved.name}" (${saved.permissions.length} quyền)`,
    });
    return { ...saved, usersCount: 0 };
  }

  async updateRole(id: number, dto: UpdateRoleDto, actor: AuthUser): Promise<RoleResponse> {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) throw new NotFoundException('Không tìm thấy vai trò');

    const oldName = role.name;
    const oldDescription = role.description;
    const oldPermissions = [...role.permissions];
    const renamed = dto.name !== undefined && dto.name !== oldName;

    if (role.isSystem && renamed) throw new BadRequestException('Không thể đổi tên vai trò hệ thống');
    if (role.isSystem && dto.permissions !== undefined) {
      throw new BadRequestException('Không thể thay đổi quyền của vai trò hệ thống');
    }
    if (renamed && (await this.roleRepo.findOne({ where: { name: dto.name } }))) {
      throw new BadRequestException('Tên vai trò này đã tồn tại!');
    }

    if (renamed) role.name = dto.name!;
    if (dto.description !== undefined) role.description = dto.description;
    if (dto.permissions !== undefined) role.permissions = dto.permissions;

    await this.roleRepo.manager.transaction(async (em) => {
      if (renamed) await em.update(AccountEntity, { role: oldName }, { role: role.name });
      await em.save(role);
    });

    const changes: string[] = [];
    if (renamed) changes.push(`đổi tên "${oldName}" → "${role.name}"`);
    if (role.description !== oldDescription) changes.push('đổi mô tả');
    const added = role.permissions.filter((p) => !oldPermissions.includes(p));
    const removed = oldPermissions.filter((p) => !role.permissions.includes(p));
    if (added.length) changes.push(`thêm quyền ${added.join(', ')}`);
    if (removed.length) changes.push(`bỏ quyền ${removed.join(', ')}`);
    if (changes.length) {
      await this.audit.log(actor, {
        action: 'role.update',
        entityName: 'role',
        entityId: id,
        description: `Cập nhật vai trò "${role.name}": ${changes.join('; ')}`,
      });
    }

    const usersCount = await this.accountRepo.count({ where: { role: role.name } });
    return { ...role, usersCount };
  }

  async deleteRole(id: number, actor: AuthUser): Promise<{ message: string }> {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) throw new NotFoundException('Không tìm thấy vai trò');
    if (role.isSystem) throw new BadRequestException('Vai trò hệ thống, không thể xóa!');

    const usersCount = await this.accountRepo.count({ where: { role: role.name } });
    if (usersCount > 0) {
      throw new BadRequestException(`Không thể xóa vì còn ${usersCount} người dùng đang giữ vai trò này!`);
    }
    const name = role.name;
    await this.roleRepo.remove(role);
    await this.audit.log(actor, {
      action: 'role.delete',
      entityName: 'role',
      entityId: id,
      description: `Xóa vai trò "${name}"`,
    });
    return { message: 'Đã xóa vai trò thành công' };
  }

  /* ==================== DANH MỤC CHUNG ==================== */
  getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepo.find({ order: { id: 'ASC' } });
  }

  async createCategory(dto: CreateCategoryDto, actor: AuthUser): Promise<CategoryEntity> {
    if (await this.categoryRepo.findOne({ where: { type: dto.type, name: dto.name } })) {
      throw new BadRequestException('Danh mục này đã tồn tại trong cùng nhóm!');
    }
    const saved = await this.categoryRepo.save(
      this.categoryRepo.create({ type: dto.type, name: dto.name, status: dto.status ?? 'active' }),
    );
    await this.audit.log(actor, {
      action: 'category.create',
      entityName: 'category',
      entityId: saved.id,
      description: `Thêm danh mục "${saved.name}" (${saved.type})`,
    });
    return saved;
  }

  async updateCategory(id: number, dto: UpdateCategoryDto, actor: AuthUser): Promise<CategoryEntity> {
    const cat = await this.categoryRepo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Không tìm thấy danh mục');

    const type = dto.type ?? cat.type;
    const name = dto.name ?? cat.name;
    if (type !== cat.type || name !== cat.name) {
      const dup = await this.categoryRepo.findOne({ where: { type, name } });
      if (dup && dup.id !== id) throw new BadRequestException('Danh mục này đã tồn tại trong cùng nhóm!');
    }
    const before = { type: cat.type, name: cat.name, status: cat.status };
    cat.type = type;
    cat.name = name;
    if (dto.status !== undefined) cat.status = dto.status;
    const saved = await this.categoryRepo.save(cat);

    const changes: string[] = [];
    if (before.type !== saved.type) changes.push(`đổi nhóm "${before.type}" → "${saved.type}"`);
    if (before.name !== saved.name) changes.push(`đổi tên "${before.name}" → "${saved.name}"`);
    if (before.status !== saved.status) changes.push(`đổi trạng thái ${before.status} → ${saved.status}`);
    if (changes.length) {
      await this.audit.log(actor, {
        action: 'category.update',
        entityName: 'category',
        entityId: id,
        description: `Cập nhật danh mục "${saved.name}": ${changes.join('; ')}`,
      });
    }
    return saved;
  }

  async deleteCategory(id: number, actor: AuthUser): Promise<{ message: string }> {
    const cat = await this.categoryRepo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Không tìm thấy danh mục');
    const label = `"${cat.name}" (${cat.type})`;
    await this.categoryRepo.remove(cat);
    await this.audit.log(actor, {
      action: 'category.delete',
      entityName: 'category',
      entityId: id,
      description: `Xóa danh mục ${label}`,
    });
    return { message: 'Đã xóa danh mục thành công' };
  }

  /* ==================== CẤU HÌNH HỆ THỐNG ==================== */
  async getSettings(): Promise<SettingEntity> {
    let setting = await this.settingRepo.findOne({ where: {}, order: { id: 'ASC' } });
    if (!setting) {
      setting = await this.settingRepo.save(
        this.settingRepo.create({
          restaurantName: 'Hệ thống Quản lý MRP',
          email: 'admin@mrpsystem.vn',
          phone: '0901234567',
          currency: 'VND',
          tax: 8,
        }),
      );
    }
    return setting;
  }

  async updateSettings(dto: UpdateSettingsDto, actor: AuthUser): Promise<SettingEntity> {
    const setting = await this.getSettings();
    const changed: string[] = [];
    if (dto.restaurantName !== undefined && dto.restaurantName !== setting.restaurantName) {
      setting.restaurantName = dto.restaurantName;
      changed.push('tên nhà hàng');
    }
    if (dto.email !== undefined && dto.email !== setting.email) {
      setting.email = dto.email;
      changed.push('email');
    }
    if (dto.phone !== undefined && dto.phone !== setting.phone) {
      setting.phone = dto.phone;
      changed.push('số điện thoại');
    }
    if (dto.currency !== undefined && dto.currency !== setting.currency) {
      setting.currency = dto.currency;
      changed.push('tiền tệ');
    }
    if (dto.tax !== undefined && dto.tax !== setting.tax) {
      setting.tax = dto.tax;
      changed.push('thuế VAT');
    }
    const saved = await this.settingRepo.save(setting);
    if (changed.length) {
      await this.audit.log(actor, {
        action: 'setting.update',
        entityName: 'setting',
        entityId: saved.id,
        description: `Cập nhật cấu hình hệ thống: ${changed.join(', ')}`,
      });
    }
    return saved;
  }

  /* ==================== TỔNG QUAN ==================== */
  async getDashboardSummary() {
    const [accounts, roles, categories, settings] = await Promise.all([
      this.accountRepo.find({ order: { id: 'DESC' } }),
      this.roleRepo.find({ order: { id: 'ASC' } }),
      this.categoryRepo.find({ order: { id: 'ASC' } }),
      this.getSettings(),
    ]);

    const activeAccounts = accounts.filter((a) => a.status === 'active').length;
    const lockedAccounts = accounts.filter((a) => a.status === 'locked').length;
    const assignedRoles = roles.filter((r) => accounts.some((a) => a.role === r.name)).length;
    const activeCategories = categories.filter((c) => c.status === 'active').length;
    const categoryTypesCount = new Set(categories.map((c) => c.type)).size;

    // Nhật ký thật: thao tác quản trị gần đây + các lần đăng nhập thất bại.
    const logs = await this.audit.recentActivity(6);

    return {
      restaurantName: settings.restaurantName,
      metrics: {
        totalAccounts: accounts.length,
        activeAccounts,
        lockedAccounts,
        totalRoles: roles.length,
        assignedRoles,
        totalCategories: categories.length,
        activeCategories,
        categoryTypesCount,
      },
      logs,
    };
  }
}

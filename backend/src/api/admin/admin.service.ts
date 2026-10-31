import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuditService } from '../../audit/audit.service.js';
import type { AuthUser } from '../../common/auth.decorators.js';
import { accountResponse } from '../../common/account-response.js';
import {
  assertGrantPermissions,
  assertSystemAdmin,
  isSystemRole,
} from '../../common/management-policy.js';
import {
  DEFAULT_ROLE_PERMISSIONS,
  PERMISSIONS,
  WILDCARD,
} from '../../common/permissions.js';
import type { Account, Prisma, Role } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  CreateAccountDto,
  CreateCategoryDto,
  CreateRoleDto,
  UpdateAccountDto,
  UpdateCategoryDto,
  UpdateRoleDto,
  UpdateSettingsDto,
} from './dto/admin.dto.js';

const roleResponse = (r: Role & { _count: { accounts: number } }) => ({
  id: r.id,
  name: r.name,
  description: r.description,
  isSystem: r.isSystem,
  permissions: r.permissions,
  usersCount: r._count.accounts,
});

@Injectable()
export class AdminService {
  constructor(
    private readonly db: PrismaService,
    private readonly audit: AuditService,
  ) {}

  private async roleByName(tx: Prisma.TransactionClient, name: string) {
    const role = await tx.role.findUnique({ where: { name } });
    if (!role) throw new BadRequestException(`Vai trò "${name}" không tồn tại`);
    return role;
  }

  private async account(tx: Prisma.TransactionClient, id: number) {
    const account = await tx.account.findUnique({
      where: { id },
      include: { role: true },
    });
    if (!account) throw new NotFoundException('Không tìm thấy tài khoản');
    return account;
  }

  private async isLastAdmin(
    tx: Prisma.TransactionClient,
    account: Account & { role: Role },
  ) {
    if (
      account.status !== 'active' ||
      !account.role.isSystem ||
      !account.role.permissions.includes(WILDCARD)
    )
      return false;
    return (
      (await tx.account.count({
        where: {
          status: 'active',
          role: { isSystem: true, permissions: { has: WILDCARD } },
        },
      })) <= 1
    );
  }

  private async revoke(tx: Prisma.TransactionClient, id: number) {
    await tx.loginLog.updateMany({
      where: { accountId: id, logoutAt: null },
      data: { logoutAt: new Date() },
    });
  }

  async getAllAccounts() {
    return (
      await this.db.account.findMany({
        include: { role: true },
        orderBy: { id: 'desc' },
      })
    ).map(accountResponse);
  }

  async createAccount(dto: CreateAccountDto, actor: AuthUser) {
    assertSystemAdmin(actor);
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const saved = await this.db.adminTransaction(async (tx) => {
      const role = await this.roleByName(tx, dto.role);
      return tx.account.create({
        data: {
          name: dto.name,
          email: dto.email.toLowerCase(),
          roleId: role.id,
          passwordHash,
          username: dto.username ?? null,
          phone: dto.phone ?? null,
        },
        include: { role: true },
      });
    });
    await this.audit.log(actor, {
      action: 'account.create',
      entityName: 'account',
      entityId: saved.id,
      description: `Tạo tài khoản ${saved.email} (vai trò "${saved.role.name}")`,
    });
    return accountResponse(saved);
  }

  async updateAccount(id: number, dto: UpdateAccountDto, actor: AuthUser) {
    assertSystemAdmin(actor);
    const passwordHash = dto.password
      ? await bcrypt.hash(dto.password, 10)
      : undefined;
    const saved = await this.db.adminTransaction(async (tx) => {
      const current = await this.account(tx, id);
      let roleId = current.roleId;
      if (dto.role !== undefined && dto.role !== current.role.name) {
        const role = await this.roleByName(tx, dto.role);
        if (!isSystemRole(role) && (await this.isLastAdmin(tx, current)))
          throw new BadRequestException(
            'Không thể hạ quyền quản trị viên đang hoạt động cuối cùng',
          );
        roleId = role.id;
      }
      const email = dto.email?.toLowerCase() ?? current.email;
      const revoke =
        passwordHash !== undefined ||
        roleId !== current.roleId ||
        email !== current.email;
      const updated = await tx.account.update({
        where: { id },
        data: {
          name: dto.name,
          email,
          roleId,
          passwordHash,
          username: dto.username,
          phone: dto.phone,
          ...(revoke ? { sessionVersion: { increment: 1 } } : {}),
        },
        include: { role: true },
      });
      if (revoke) await this.revoke(tx, id);
      return updated;
    });
    await this.audit.log(actor, {
      action: 'account.update',
      entityName: 'account',
      entityId: id,
      description: `Cập nhật tài khoản ${saved.email}${passwordHash ? ' (đặt lại mật khẩu)' : ''}`,
    });
    return accountResponse(saved);
  }

  async toggleLockStatus(id: number, actor: AuthUser) {
    assertSystemAdmin(actor);
    const saved = await this.db.adminTransaction(async (tx) => {
      const current = await this.account(tx, id);
      if (current.status === 'active') {
        if (id === actor.id)
          throw new BadRequestException(
            'Không thể tự khóa tài khoản của chính mình',
          );
        if (await this.isLastAdmin(tx, current))
          throw new BadRequestException(
            'Không thể khóa quản trị viên đang hoạt động cuối cùng',
          );
      }
      await this.revoke(tx, id);
      return tx.account.update({
        where: { id },
        data: {
          status: current.status === 'active' ? 'locked' : 'active',
          sessionVersion: { increment: 1 },
        },
        include: { role: true },
      });
    });
    await this.audit.log(actor, {
      action: saved.status === 'locked' ? 'account.lock' : 'account.unlock',
      entityName: 'account',
      entityId: id,
      description: `${saved.status === 'locked' ? 'Khóa' : 'Mở khóa'} tài khoản ${saved.email}`,
    });
    return accountResponse(saved);
  }

  async deleteAccount(id: number, actor: AuthUser) {
    assertSystemAdmin(actor);
    const deleted = await this.db.adminTransaction(async (tx) => {
      const current = await this.account(tx, id);
      if (id === actor.id)
        throw new BadRequestException(
          'Không thể tự xóa tài khoản của chính mình',
        );
      if (await this.isLastAdmin(tx, current))
        throw new BadRequestException(
          'Không thể xóa quản trị viên đang hoạt động cuối cùng',
        );
      await this.revoke(tx, id);
      return tx.account.delete({ where: { id } });
    });
    await this.audit.log(actor, {
      action: 'account.delete',
      entityName: 'account',
      entityId: id,
      description: `Xóa tài khoản ${deleted.email}`,
    });
    return { message: 'Đã xóa tài khoản' };
  }

  getPermissionCatalog() {
    return PERMISSIONS;
  }

  getRoleDefaults() {
    return Object.entries(DEFAULT_ROLE_PERMISSIONS)
      .filter(([, permissions]) => !permissions.includes(WILDCARD))
      .map(([name, permissions]) => ({ name, permissions }));
  }

  async getAllRoles() {
    return (
      await this.db.role.findMany({
        orderBy: { id: 'asc' },
        include: { _count: { select: { accounts: true } } },
      })
    ).map(roleResponse);
  }

  async createRole(dto: CreateRoleDto, actor: AuthUser) {
    assertGrantPermissions(actor, dto.permissions ?? []);
    const saved = await this.db.adminTransaction((tx) =>
      tx.role.create({
        data: {
          name: dto.name,
          description: dto.description ?? '',
          permissions: dto.permissions ?? [],
        },
        include: { _count: { select: { accounts: true } } },
      }),
    );
    await this.audit.log(actor, {
      action: 'role.create',
      entityName: 'role',
      entityId: saved.id,
      description: `Tạo vai trò "${saved.name}"`,
    });
    return roleResponse(saved);
  }

  async updateRole(id: number, dto: UpdateRoleDto, actor: AuthUser) {
    assertSystemAdmin(actor);
    const saved = await this.db.adminTransaction(async (tx) => {
      const current = await tx.role.findUnique({ where: { id } });
      if (!current) throw new NotFoundException('Không tìm thấy vai trò');
      if (
        current.isSystem &&
        ((dto.name !== undefined && dto.name !== current.name) ||
          dto.permissions !== undefined)
      )
        throw new BadRequestException(
          'Không thể đổi tên hoặc quyền của vai trò hệ thống',
        );
      if (dto.permissions !== undefined)
        assertGrantPermissions(actor, dto.permissions);
      const saved = await tx.role.update({
        where: { id },
        data: {
          name: dto.name,
          description: dto.description,
          permissions: dto.permissions,
        },
        include: { _count: { select: { accounts: true } } },
      });
      if (dto.permissions !== undefined) {
        await tx.account.updateMany({
          where: { roleId: id },
          data: { sessionVersion: { increment: 1 } },
        });
        await tx.loginLog.updateMany({
          where: { account: { roleId: id }, logoutAt: null },
          data: { logoutAt: new Date() },
        });
      }
      return saved;
    });
    await this.audit.log(actor, {
      action: 'role.update',
      entityName: 'role',
      entityId: id,
      description: `Cập nhật vai trò "${saved.name}"`,
    });
    return roleResponse(saved);
  }

  async deleteRole(id: number, actor: AuthUser) {
    assertSystemAdmin(actor);
    const deleted = await this.db.adminTransaction(async (tx) => {
      const current = await tx.role.findUnique({
        where: { id },
        include: { _count: { select: { accounts: true } } },
      });
      if (!current) throw new NotFoundException('Không tìm thấy vai trò');
      if (current.isSystem)
        throw new BadRequestException('Vai trò hệ thống, không thể xóa');
      if (current._count.accounts)
        throw new BadRequestException(
          'Không thể xóa vai trò đang có tài khoản sử dụng',
        );
      return tx.role.delete({ where: { id } });
    });
    await this.audit.log(actor, {
      action: 'role.delete',
      entityName: 'role',
      entityId: id,
      description: `Xóa vai trò "${deleted.name}"`,
    });
    return { message: 'Đã xóa vai trò thành công' };
  }

  getAllCategories() {
    return this.db.category.findMany({ orderBy: { id: 'asc' } });
  }

  async createCategory(dto: CreateCategoryDto, actor: AuthUser) {
    const saved = await this.db.adminTransaction((tx) =>
      tx.category.create({ data: dto }),
    );
    await this.audit.log(actor, {
      action: 'category.create',
      entityName: 'category',
      entityId: saved.id,
      description: `Thêm danh mục "${saved.name}"`,
    });
    return saved;
  }

  async updateCategory(id: number, dto: UpdateCategoryDto, actor: AuthUser) {
    const saved = await this.db.adminTransaction((tx) =>
      tx.category.update({ where: { id }, data: dto }),
    );
    await this.audit.log(actor, {
      action: 'category.update',
      entityName: 'category',
      entityId: id,
      description: `Cập nhật danh mục "${saved.name}"`,
    });
    return saved;
  }

  async deleteCategory(id: number, actor: AuthUser) {
    const saved = await this.db.adminTransaction((tx) =>
      tx.category.delete({ where: { id } }),
    );
    await this.audit.log(actor, {
      action: 'category.delete',
      entityName: 'category',
      entityId: id,
      description: `Xóa danh mục "${saved.name}"`,
    });
    return { message: 'Đã xóa danh mục thành công' };
  }

  getSettings() {
    return this.db.systemSetting.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        restaurantName: 'Hệ thống Quản lý MRP',
        email: 'admin@mrpsystem.vn',
        phone: '0901234567',
        currency: 'VND',
        tax: 8,
      },
    });
  }

  async updateSettings(dto: UpdateSettingsDto, actor: AuthUser) {
    const current = await this.getSettings();
    const saved = await this.db.systemSetting.update({
      where: { id: current.id },
      data: dto,
    });
    await this.audit.log(actor, {
      action: 'setting.update',
      entityName: 'setting',
      entityId: saved.id,
      description: 'Cập nhật cấu hình hệ thống',
    });
    return saved;
  }

  async getDashboardSummary() {
    const [accounts, roles, categories, settings, logs] = await Promise.all([
      this.db.account.findMany({ select: { status: true, roleId: true } }),
      this.db.role.findMany({ select: { id: true } }),
      this.db.category.findMany(),
      this.getSettings(),
      this.audit.recentActivity(6),
    ]);
    return {
      restaurantName: settings.restaurantName,
      metrics: {
        totalAccounts: accounts.length,
        activeAccounts: accounts.filter((a) => a.status === 'active').length,
        lockedAccounts: accounts.filter((a) => a.status === 'locked').length,
        totalRoles: roles.length,
        assignedRoles: roles.filter((r) =>
          accounts.some((a) => a.roleId === r.id),
        ).length,
        totalCategories: categories.length,
        activeCategories: categories.filter((c) => c.status === 'active')
          .length,
        categoryTypesCount: new Set(categories.map((c) => c.type)).size,
      },
      logs,
    };
  }
}

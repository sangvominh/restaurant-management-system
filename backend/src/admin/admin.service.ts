import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { randomBytes, scryptSync } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service.js';
import { PERMISSIONS } from './permissions.js';

function text(value: unknown, name: string, max = 200): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max)
    throw new BadRequestException(`${name} không hợp lệ`);
  return value.trim();
}
function id(value: unknown): string {
  const result = text(value, 'ID', 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(result))
    throw new BadRequestException('ID không hợp lệ');
  return result;
}
function status(value: unknown, allowed: string[]) {
  const result = value ?? 'ACTIVE';
  if (typeof result !== 'string' || !allowed.includes(result))
    throw new BadRequestException('Trạng thái không hợp lệ');
  return result;
}
function body(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new BadRequestException('Dữ liệu không hợp lệ');
  return value as Record<string, unknown>;
}
const accountSelect = {
  id: true, username: true, status: true, createdAt: true,
  roleId: true, role: { select: { id: true, name: true } },
  employee: { select: { id: true, code: true, name: true } },
} as const;
const roleInclude = {
  permissions: { include: { permission: true } },
  _count: { select: { accounts: true } },
} as const;

@Injectable()
export class AdminService {
  constructor(private readonly db: PrismaService) {}

  accounts() { return this.db.account.findMany({ select: accountSelect, orderBy: { createdAt: 'desc' } }); }
  roles() { return this.db.role.findMany({ include: roleInclude, orderBy: { name: 'asc' } }); }
  employees() { return this.db.employee.findMany({ orderBy: { code: 'asc' } }); }
  permissions() { return PERMISSIONS; }

  async saveAccount(input: unknown, accountId?: string, actorId?: string) {
    const b = body(input);
    const username = text(b.username, 'Tên đăng nhập', 100);
    const roleId = id(b.roleId);
    const employeeId = b.employeeId ? id(b.employeeId) : null;
    const accountStatus = status(b.status, ['ACTIVE', 'LOCKED']);
    let passwordHash: string | undefined;
    if (b.password !== undefined && b.password !== '') {
      if (typeof b.password !== 'string' || b.password.length < 8 || b.password.length > 128)
        throw new BadRequestException('Mật khẩu cần từ 8 đến 128 ký tự');
      const salt = randomBytes(16).toString('hex');
      passwordHash = `scrypt$${salt}$${scryptSync(b.password, salt, 64).toString('hex')}`;
    }
    if (!accountId && !passwordHash) throw new BadRequestException('Cần nhập mật khẩu');
    if (accountId) id(accountId);
    return this.db.$transaction(async tx => {
      if (accountId && accountId === actorId) {
        const current = await tx.account.findUniqueOrThrow({ where: { id: accountId } });
        if (accountStatus !== 'ACTIVE' || roleId !== current.roleId)
          throw new BadRequestException('Không tự khóa hoặc đổi vai trò tài khoản đang đăng nhập');
      }
      await tx.role.findUniqueOrThrow({ where: { id: roleId } });
      if (employeeId) {
        const employee = await tx.employee.findUniqueOrThrow({ where: { id: employeeId } });
        if (accountId && accountId === actorId && employee.status !== 'ACTIVE')
          throw new BadRequestException('Không tự liên kết với người sử dụng đã ngừng hoạt động');
        if (employee.accountId && employee.accountId !== accountId)
          throw new ConflictException('Người sử dụng đã có tài khoản');
      }
      const data = { username, roleId, status: accountStatus, passwordHash };
      const account = accountId
        ? await tx.account.update({ where: { id: accountId }, data, select: accountSelect })
        : await tx.account.create({ data: { ...data, passwordHash: passwordHash! }, select: accountSelect });
      await tx.employee.updateMany({ where: { accountId: account.id }, data: { accountId: null } });
      if (employeeId) await tx.employee.update({ where: { id: employeeId }, data: { accountId: account.id } });
      return tx.account.findUniqueOrThrow({ where: { id: account.id }, select: accountSelect });
    });
  }

  async deleteAccount(accountId: string, actorId?: string) {
    if (accountId === actorId) throw new BadRequestException('Không tự xóa tài khoản đang đăng nhập');
    return this.db.$transaction(async tx => {
      await tx.employee.updateMany({ where: { accountId: id(accountId) }, data: { accountId: null } });
      await tx.account.delete({ where: { id: accountId } });
      return { message: 'Đã xóa tài khoản, giữ thông tin người sử dụng' };
    });
  }

  async saveRole(input: unknown, roleId?: string) {
    const b = body(input);
    const name = text(b.name, 'Tên vai trò', 100);
    const description = b.description ? text(b.description, 'Mô tả', 500) : null;
    if (!Array.isArray(b.permissions) || b.permissions.some(code => !PERMISSIONS.some(p => p.code === code)))
      throw new BadRequestException('Danh sách quyền không hợp lệ');
    const codes = [...new Set(b.permissions as string[])];
    if (roleId) id(roleId);
    return this.db.$transaction(async tx => {
      if (roleId) {
        const current = await tx.role.findUniqueOrThrow({ where: { id: roleId }, include: roleInclude });
        if (current.permissions.some(p => p.permission.code === '*') && !codes.includes('*'))
          throw new BadRequestException('Không được gỡ quyền toàn hệ thống khỏi vai trò System Admin');
      }
      const role = roleId
        ? await tx.role.update({ where: { id: roleId }, data: { name, description } })
        : await tx.role.create({ data: { name, description } });
      await tx.rolePermission.deleteMany({ where: { roleId: role.id } });
      for (const code of codes) {
        const definition = PERMISSIONS.find(p => p.code === code)!;
        const permission = await tx.permission.upsert({ where: { code }, update: { name: definition.name }, create: { code, name: definition.name } });
        await tx.rolePermission.create({ data: { roleId: role.id, permissionId: permission.id } });
      }
      return tx.role.findUniqueOrThrow({ where: { id: role.id }, include: roleInclude });
    });
  }

  async deleteRole(roleId: string) {
    return this.db.$transaction(async tx => {
      const role = await tx.role.findUniqueOrThrow({ where: { id: id(roleId) }, include: { _count: { select: { accounts: true } } } });
      if (role._count.accounts) throw new ConflictException('Vai trò đang có tài khoản sử dụng');
      await tx.rolePermission.deleteMany({ where: { roleId } });
      await tx.role.delete({ where: { id: roleId } });
      return { message: 'Đã xóa vai trò' };
    });
  }

  async saveEmployee(input: unknown, employeeId?: string, actorId?: string) {
    const b = body(input);
    const email = b.email ? text(b.email, 'Email', 150).toLowerCase() : null;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new BadRequestException('Email không hợp lệ');
    const data = { code: text(b.code, 'Mã người sử dụng', 50), name: text(b.name, 'Họ tên'),
      phone: b.phone ? text(b.phone, 'Điện thoại', 20) : null, email,
      status: status(b.status, ['ACTIVE', 'INACTIVE']) };
    if (employeeId && actorId && data.status !== 'ACTIVE') {
      const current = await this.db.employee.findUniqueOrThrow({ where: { id: id(employeeId) } });
      if (current.accountId === actorId) throw new BadRequestException('Không tự ngừng hoạt động hồ sơ đang đăng nhập');
    }
    return employeeId ? this.db.employee.update({ where: { id: id(employeeId) }, data }) : this.db.employee.create({ data });
  }
  async deleteEmployee(employeeId: string) {
    const employee = await this.db.employee.findUniqueOrThrow({ where: { id: id(employeeId) } });
    if (employee.accountId) throw new ConflictException('Hãy gỡ liên kết tài khoản trước khi xóa');
    await this.db.employee.delete({ where: { id: employeeId } });
    return { message: 'Đã xóa thông tin người sử dụng' };
  }
}

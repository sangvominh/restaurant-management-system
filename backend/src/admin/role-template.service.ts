import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ROLE_PRESETS } from './role-presets.js';
import { PERMISSIONS } from './permissions.js';
function text(v: unknown, label: string, max: number, empty = false) {
  if (typeof v !== 'string' || (!empty && !v.trim()) || v.trim().length > max) throw new BadRequestException(label + ' không hợp lệ');
  return v.trim();
}
@Injectable()
export class RoleTemplateService {
  constructor(private readonly db: PrismaService) {}
  async list() {
    const overrides = await this.db.roleTemplate.findMany();
    return ROLE_PRESETS.map(p => { const saved = overrides.find(r => r.id === p.id); return { ...p, ...saved, permissions: (saved?.permissions || p.permissions).filter(c => PERMISSIONS.some(right => right.code === c)), customized: !!saved }; });
  }
  private key(id: string) { if (!ROLE_PRESETS.some(p => p.id === id)) throw new BadRequestException('Mẫu vai trò không tồn tại'); return id; }
  async save(id: string, input: unknown) {
    this.key(id);
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new BadRequestException('Dữ liệu không hợp lệ');
    const b = input as Record<string, unknown>;
    const name = text(b.name, 'Tên mẫu', 100), description = text(b.description, 'Mô tả', 500, true), workspace = text(b.workspace, 'Web làm việc chính', 50);
    if (!['Kho & Chế biến', 'Quản lý nhà hàng', 'Admin system'].includes(workspace)) throw new BadRequestException('Web làm việc chính không hợp lệ');
    if (!Array.isArray(b.permissions) || b.permissions.some(c => typeof c !== 'string' || !PERMISSIONS.some(p => p.code === c))) throw new BadRequestException('Danh sách quyền không hợp lệ');
    const permissions = b.permissions.includes('*') ? ['*'] : [...new Set(b.permissions as string[])];
    if ((await this.list()).some(p => p.id !== id && p.name.toLocaleLowerCase('vi') === name.toLocaleLowerCase('vi'))) throw new BadRequestException('Tên mẫu đã được sử dụng');
    const data = { name, description, workspace, permissions };
    return { ...await this.db.roleTemplate.upsert({ where: { id }, create: { id, ...data }, update: data }), customized: true };
  }
  async reset(id: string) {
    this.key(id);
    await this.db.roleTemplate.deleteMany({ where: { id } });
    return { message: 'Đã khôi phục mẫu mặc định; vai trò và tài khoản hiện có không thay đổi' };
  }
}

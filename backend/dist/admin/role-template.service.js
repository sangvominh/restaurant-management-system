var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ROLE_PRESETS } from './role-presets.js';
import { PERMISSIONS } from './permissions.js';
function text(v, label, max, empty = false) {
    if (typeof v !== 'string' || (!empty && !v.trim()) || v.trim().length > max)
        throw new BadRequestException(label + ' không hợp lệ');
    return v.trim();
}
let RoleTemplateService = class RoleTemplateService {
    db;
    constructor(db) {
        this.db = db;
    }
    async list() {
        const overrides = await this.db.roleTemplate.findMany();
        return ROLE_PRESETS.map(p => { const saved = overrides.find(r => r.id === p.id); return { ...p, ...saved, permissions: (saved?.permissions || p.permissions).filter(c => PERMISSIONS.some(right => right.code === c)), customized: !!saved }; });
    }
    key(id) { if (!ROLE_PRESETS.some(p => p.id === id))
        throw new BadRequestException('Mẫu vai trò không tồn tại'); return id; }
    async save(id, input) {
        this.key(id);
        if (!input || typeof input !== 'object' || Array.isArray(input))
            throw new BadRequestException('Dữ liệu không hợp lệ');
        const b = input;
        const name = text(b.name, 'Tên mẫu', 100), description = text(b.description, 'Mô tả', 500, true), workspace = text(b.workspace, 'Web làm việc chính', 50);
        if (!['Kho & Chế biến', 'Quản lý nhà hàng', 'Admin system'].includes(workspace))
            throw new BadRequestException('Web làm việc chính không hợp lệ');
        if (!Array.isArray(b.permissions) || b.permissions.some(c => typeof c !== 'string' || !PERMISSIONS.some(p => p.code === c)))
            throw new BadRequestException('Danh sách quyền không hợp lệ');
        const permissions = b.permissions.includes('*') ? ['*'] : [...new Set(b.permissions)];
        if ((await this.list()).some(p => p.id !== id && p.name.toLocaleLowerCase('vi') === name.toLocaleLowerCase('vi')))
            throw new BadRequestException('Tên mẫu đã được sử dụng');
        const data = { name, description, workspace, permissions };
        return { ...await this.db.roleTemplate.upsert({ where: { id }, create: { id, ...data }, update: data }), customized: true };
    }
    async reset(id) {
        this.key(id);
        await this.db.roleTemplate.deleteMany({ where: { id } });
        return { message: 'Đã khôi phục mẫu mặc định; vai trò và tài khoản hiện có không thay đổi' };
    }
};
RoleTemplateService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], RoleTemplateService);
export { RoleTemplateService };
//# sourceMappingURL=role-template.service.js.map
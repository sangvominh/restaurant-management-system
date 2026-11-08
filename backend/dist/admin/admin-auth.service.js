var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { PrismaService } from '../prisma/prisma.service.js';
const derive = promisify(scrypt);
const key = (token) => createHash('sha256').update(token).digest('hex');
const include = { employee: true, role: { include: { permissions: { include: { permission: true } } } } };
let AdminAuthService = class AdminAuthService {
    db;
    sessions = new Map();
    constructor(db) {
        this.db = db;
    }
    async login(body, adminOnly = true) {
        if (!body || typeof body !== 'object')
            throw new BadRequestException('Dữ liệu không hợp lệ');
        const b = body;
        if (typeof b.username !== 'string' || !b.username.trim() || b.username.length > 100 ||
            typeof b.password !== 'string' || b.password.length > 128)
            throw new BadRequestException('Vui lòng nhập tên đăng nhập và mật khẩu hợp lệ');
        const account = await this.db.account.findUnique({ where: { username: b.username.trim() }, include });
        const hash = account?.passwordHash;
        const validFormat = hash && /^scrypt\$[0-9a-f]{32}\$[0-9a-f]{128}$/.test(hash);
        const [, salt, stored] = validFormat ? hash.split('$') : ['scrypt', '0'.repeat(32), '0'.repeat(128)];
        const derived = await derive(b.password, salt, 64);
        if (!account || !validFormat || !timingSafeEqual(derived, Buffer.from(stored, 'hex')))
            throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không đúng');
        if (account.status !== 'ACTIVE' || (account.employee && account.employee.status !== 'ACTIVE'))
            throw new ForbiddenException('Tài khoản hoặc người sử dụng đã ngừng hoạt động');
        const codes = account.role.permissions.map(p => p.permission.code).sort();
        if (adminOnly && !codes.includes('*'))
            throw new ForbiddenException('Tài khoản không có quyền System Admin');
        if (!adminOnly && !codes.some(code => ['*', 'catalog:manage', 'inventory:view', 'product:manage', 'production:perform', 'receipt:create', 'sale:view'].includes(code)))
            throw new ForbiddenException('Tài khoản chưa được cấp quyền vào danh mục kho');
        for (const [id, session] of this.sessions)
            if (session.expiresAt <= Date.now())
                this.sessions.delete(id);
        const token = randomBytes(32).toString('hex');
        this.sessions.set(key(token), { accountId: account.id, passwordHash: account.passwordHash,
            roleId: account.roleId, rights: codes.join(','), expiresAt: Date.now() + 8 * 60 * 60 * 1000 });
        return { token, user: { id: account.id, username: account.username, name: account.employee?.name || account.username, permissions: codes } };
    }
    async authenticate(token, adminOnly = true) {
        const session = this.sessions.get(key(token));
        if (!session || session.expiresAt <= Date.now()) {
            this.sessions.delete(key(token));
            throw new UnauthorizedException('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
        }
        const account = await this.db.account.findUnique({ where: { id: session.accountId }, include });
        const codes = account?.role.permissions.map(p => p.permission.code).sort() || [];
        if (!account || account.status !== 'ACTIVE' || (account.employee && account.employee.status !== 'ACTIVE') ||
            account.passwordHash !== session.passwordHash || account.roleId !== session.roleId ||
            (adminOnly && !codes.includes('*')) || codes.join(',') !== session.rights) {
            this.sessions.delete(key(token));
            throw new UnauthorizedException('Tài khoản hoặc quyền đã thay đổi, vui lòng đăng nhập lại');
        }
        return { id: account.id, username: account.username, name: account.employee?.name || account.username, permissions: codes };
    }
    logout(token) { this.sessions.delete(key(token)); return { message: 'Đã đăng xuất' }; }
};
AdminAuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AdminAuthService);
export { AdminAuthService };
//# sourceMappingURL=admin-auth.service.js.map
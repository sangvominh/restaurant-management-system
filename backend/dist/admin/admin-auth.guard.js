var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { createParamDecorator, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service.js';
let AdminAuthGuard = class AdminAuthGuard {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const header = String(req.headers.authorization || '');
        if (!/^Bearer [0-9a-f]{64}$/.test(header))
            throw new UnauthorizedException('Vui lòng đăng nhập Admin');
        req.adminToken = header.slice(7);
        req.admin = await this.auth.authenticate(req.adminToken);
        return true;
    }
};
AdminAuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AdminAuthService])
], AdminAuthGuard);
export { AdminAuthGuard };
export const CurrentAdmin = createParamDecorator((_, ctx) => ctx.switchToHttp().getRequest().admin);
export const AdminToken = createParamDecorator((_, ctx) => ctx.switchToHttp().getRequest().adminToken);
//# sourceMappingURL=admin-auth.guard.js.map
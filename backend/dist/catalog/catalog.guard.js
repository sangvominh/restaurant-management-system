var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from '../admin/admin-auth.service.js';
let CatalogGuard = class CatalogGuard {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const header = String(req.headers.authorization || '');
        if (!/^Bearer [0-9a-f]{64}$/.test(header))
            throw new UnauthorizedException('Vui lòng đăng nhập');
        req.catalogToken = header.slice(7);
        req.catalogUser = await this.auth.authenticate(req.catalogToken, false);
        return true;
    }
};
CatalogGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AdminAuthService])
], CatalogGuard);
export { CatalogGuard };
//# sourceMappingURL=catalog.guard.js.map
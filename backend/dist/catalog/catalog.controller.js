var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { AdminAuthService } from '../admin/admin-auth.service.js';
import { CatalogGuard } from './catalog.guard.js';
import { CatalogService, kind } from './catalog.service.js';
const readRights = {
    units: ['catalog:manage', 'inventory:view', 'product:manage', 'production:perform'],
    categories: ['catalog:manage', 'inventory:view', 'product:manage', 'production:perform'],
    materials: ['catalog:manage', 'inventory:view', 'production:perform'],
    suppliers: ['catalog:manage', 'receipt:create'],
    products: ['catalog:manage', 'inventory:view', 'product:manage', 'production:perform', 'sale:view'],
};
let WarehouseAuthController = class WarehouseAuthController {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    login(b) { return this.auth.login(b, false); }
    me(req) { return req.catalogUser; }
    logout(req) { return this.auth.logout(req.catalogToken); }
};
__decorate([
    Post('login'),
    HttpCode(200),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WarehouseAuthController.prototype, "login", null);
__decorate([
    Get('me'),
    UseGuards(CatalogGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WarehouseAuthController.prototype, "me", null);
__decorate([
    Post('logout'),
    HttpCode(200),
    UseGuards(CatalogGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WarehouseAuthController.prototype, "logout", null);
WarehouseAuthController = __decorate([
    Controller('api/warehouse/auth'),
    __metadata("design:paramtypes", [AdminAuthService])
], WarehouseAuthController);
export { WarehouseAuthController };
let CatalogController = class CatalogController {
    service;
    constructor(service) {
        this.service = service;
    }
    allow(user, codes) {
        if (!user.permissions.includes('*') && !codes.some(code => user.permissions.includes(code)))
            throw new ForbiddenException('Bạn chưa được cấp quyền chức năng này');
    }
    list(value, req) {
        const type = kind(value);
        this.allow(req.catalogUser, readRights[type]);
        return this.service.list(type);
    }
    create(value, b, req) {
        const type = kind(value);
        this.allow(req.catalogUser, type === 'products' ? ['catalog:manage', 'product:manage'] : ['catalog:manage']);
        return this.service.save(type, b);
    }
    update(value, id, b, req) {
        const type = kind(value);
        this.allow(req.catalogUser, type === 'products' ? ['catalog:manage', 'product:manage'] : ['catalog:manage']);
        return this.service.save(type, b, id);
    }
    remove(value, id, req) {
        const type = kind(value);
        this.allow(req.catalogUser, type === 'products' ? ['catalog:manage', 'product:manage'] : ['catalog:manage']);
        return this.service.remove(type, id);
    }
};
__decorate([
    Get(':type'),
    __param(0, Param('type')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "list", null);
__decorate([
    Post(':type'),
    __param(0, Param('type')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "create", null);
__decorate([
    Put(':type/:id'),
    __param(0, Param('type')),
    __param(1, Param('id')),
    __param(2, Body()),
    __param(3, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "update", null);
__decorate([
    Delete(':type/:id'),
    __param(0, Param('type')),
    __param(1, Param('id')),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "remove", null);
CatalogController = __decorate([
    Controller('api/warehouse/catalog'),
    UseGuards(CatalogGuard),
    __metadata("design:paramtypes", [CatalogService])
], CatalogController);
export { CatalogController };
//# sourceMappingURL=catalog.controller.js.map
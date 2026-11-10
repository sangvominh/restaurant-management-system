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
import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AdminAuthService } from '../admin/admin-auth.service.js';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { FinishedService } from '../inventory/finished.service.js';
import { SalesService } from './sales.service.js';
const rights = ['sale:view', 'sale:create', 'export:request', 'payment:create', 'sale:prepare'];
function allow(r, codes = rights) { if (!r.catalogUser.permissions.includes('*') && !codes.some(c => r.catalogUser.permissions.includes(c)))
    throw new ForbiddenException('Chưa có quyền bán hàng'); }
let RestaurantAuthController = class RestaurantAuthController {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    login(b) { return this.auth.login(b, false, 'sales'); }
    me(r) { allow(r); return r.catalogUser; }
    logout(r) { return this.auth.logout(r.catalogToken); }
};
__decorate([
    Post('login'),
    HttpCode(200),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestaurantAuthController.prototype, "login", null);
__decorate([
    Get('me'),
    UseGuards(CatalogGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestaurantAuthController.prototype, "me", null);
__decorate([
    Post('logout'),
    HttpCode(200),
    UseGuards(CatalogGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestaurantAuthController.prototype, "logout", null);
RestaurantAuthController = __decorate([
    Controller('api/restaurant/auth'),
    __metadata("design:paramtypes", [AdminAuthService])
], RestaurantAuthController);
export { RestaurantAuthController };
let SalesController = class SalesController {
    service;
    finished;
    constructor(service, finished) {
        this.service = service;
        this.finished = finished;
    }
    ready(id, b, r) { allow(r, ['sale:prepare']); return this.service.ready(id, b, r.catalogUser); }
    updateArea(name, b, r) { allow(r, ['sale:create']); return this.service.saveArea(b, name); }
    deleteArea(name, r) { allow(r, ['sale:create']); return this.service.deleteArea(name); }
    deleteTable(id, r) { allow(r, ['sale:create']); return this.service.deleteTable(id); }
    products(r) { allow(r); return this.service.products(); }
    changeLine(id, b, r) { allow(r, ['sale:create']); return this.service.changeLine(id, b, r.catalogUser); }
    serve(id, b, r) { allow(r, ['sale:create']); return this.service.serve(id, b, r.catalogUser); }
    replenish(id, b, r) { allow(r, ['production:request']); return this.service.replenish(id, b, r.catalogUser); }
    areas(r) { allow(r); return this.service.areas(); }
    area(b, r) { allow(r, ['sale:create']); return this.service.saveArea(b); }
    tables(r) { allow(r); return this.service.tables(); }
    createTable(b, r) { allow(r, ['sale:create']); return this.service.saveTable(b); }
    updateTable(id, b, r) { allow(r, ['sale:create']); return this.service.saveTable(b, id); }
    send(id, b, r) { allow(r, ['sale:create']); return this.service.send(id, b, r.catalogUser); }
    list(r) { allow(r); return this.service.list(); }
    create(b, r) { allow(r, ['sale:create']); return this.service.save(b, r.catalogUser); }
    update(id, b, r) { allow(r, ['sale:create']); return this.service.save(b, r.catalogUser, id); }
    confirm(id, r) { allow(r, ['sale:create']); return this.service.action(id, 'confirm', {}, r.catalogUser); }
    cancel(id, b, r) { allow(r, ['sale:create']); return this.service.action(id, 'cancel', b, r.catalogUser); }
    pay(id, b, r) { allow(r, ['payment:create']); return this.service.action(id, 'pay', b, r.catalogUser); }
    request(b, r) { allow(r, ['export:request']); return this.finished.create(b, r.catalogUser); }
};
__decorate([
    Post('sales/:id/ready'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "ready", null);
__decorate([
    Put('areas/:name'),
    __param(0, Param('name')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "updateArea", null);
__decorate([
    Delete('areas/:name'),
    __param(0, Param('name')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "deleteArea", null);
__decorate([
    Delete('tables/:id'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "deleteTable", null);
__decorate([
    Get('products'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "products", null);
__decorate([
    Post('sales/:id/change-line'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "changeLine", null);
__decorate([
    Post('sales/:id/serve'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "serve", null);
__decorate([
    Post('sales/:id/replenish'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "replenish", null);
__decorate([
    Get('areas'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "areas", null);
__decorate([
    Post('areas'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "area", null);
__decorate([
    Get('tables'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "tables", null);
__decorate([
    Post('tables'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "createTable", null);
__decorate([
    Put('tables/:id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "updateTable", null);
__decorate([
    Post('sales/:id/send'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "send", null);
__decorate([
    Get('sales'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "list", null);
__decorate([
    Post('sales'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "create", null);
__decorate([
    Put('sales/:id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "update", null);
__decorate([
    Post('sales/:id/confirm'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "confirm", null);
__decorate([
    Post('sales/:id/cancel'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "cancel", null);
__decorate([
    Post('sales/:id/pay'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "pay", null);
__decorate([
    Post('exports'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "request", null);
SalesController = __decorate([
    Controller('api/restaurant'),
    UseGuards(CatalogGuard),
    __metadata("design:paramtypes", [SalesService, FinishedService])
], SalesController);
export { SalesController };
//# sourceMappingURL=sales.controller.js.map
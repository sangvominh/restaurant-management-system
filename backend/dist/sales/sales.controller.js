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
import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AdminAuthService } from '../admin/admin-auth.service.js';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { SalesService } from './sales.service.js';
const rights = ['sale:view', 'sale:create', 'payment:create', 'store:manage', 'product:price', 'dining:manage', 'report:sales'];
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
    constructor(service) {
        this.service = service;
    }
    updateArea(name, b, r) { allow(r, ['dining:manage']); return this.service.saveArea(b, name); }
    deleteArea(name, r) { allow(r, ['dining:manage']); return this.service.deleteArea(name); }
    deleteTable(id, r) { allow(r, ['dining:manage']); return this.service.deleteTable(id); }
    report(month, r) { allow(r, ['report:sales']); return this.service.salesReport(month); }
    price(id, b, r) { allow(r, ['product:price', 'product:manage']); return this.service.setPrice(id, b); }
    products(r) { allow(r); return this.service.products(); }
    changeLine(id, b, r) { allow(r, ['sale:create']); return this.service.changeLine(id, b, r.catalogUser); }
    areas(r) { allow(r); return this.service.areas(); }
    area(b, r) { allow(r, ['dining:manage']); return this.service.saveArea(b); }
    tables(r) { allow(r); return this.service.tables(); }
    createTable(b, r) { allow(r, ['dining:manage']); return this.service.saveTable(b); }
    updateTable(id, b, r) { allow(r, ['dining:manage']); return this.service.saveTable(b, id); }
    send(id, b, r) { allow(r, ['sale:create']); return this.service.send(id, b, r.catalogUser); }
    list(r) { allow(r); return this.service.list(); }
    create(b, r) { allow(r, ['sale:create']); return this.service.save(b, r.catalogUser); }
    update(id, b, r) { allow(r, ['sale:create']); return this.service.save(b, r.catalogUser, id); }
    confirm(id, b, r) { allow(r, ['sale:create']); return this.service.send(id, b, r.catalogUser); }
    cancel(id, b, r) { allow(r, ['sale:create']); return this.service.action(id, 'cancel', b, r.catalogUser); }
    pay(id, b, r) { allow(r, ['payment:create']); return this.service.action(id, 'pay', b, r.catalogUser); }
};
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
    Get('reports/sales'),
    __param(0, Query('month')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "report", null);
__decorate([
    Put('products/:id/price'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "price", null);
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
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
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
SalesController = __decorate([
    Controller('api/restaurant'),
    UseGuards(CatalogGuard),
    __metadata("design:paramtypes", [SalesService])
], SalesController);
export { SalesController };
//# sourceMappingURL=sales.controller.js.map
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
import { Body, Controller, ForbiddenException, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { StoreService } from './store.service.js';
let StoreController = class StoreController {
    service;
    constructor(service) {
        this.service = service;
    }
    allow(r, ...codes) { if (!r.catalogUser.permissions.includes('*') && !codes.some(c => r.catalogUser.permissions.includes(c)))
        throw new ForbiddenException('Chưa có quyền chức năng này'); }
    dispatches(r) { this.allow(r, 'store:manage'); return this.service.list(); }
    stock(r) { this.allow(r, 'inventory:view', 'sale:view', 'store:manage', 'report:stock'); return this.service.stock(); }
    list(r) { this.allow(r, 'store:manage', 'export:approve'); return this.service.adjustments(); }
    create(b, r) { this.allow(r, 'store:manage'); return this.service.adjust(b, r.catalogUser); }
    review(id, action, r) { this.allow(r, 'export:approve'); if (!['approve', 'reject'].includes(action))
        throw new ForbiddenException('Thao tác không hợp lệ'); return this.service.reviewAdjustment(id, action === 'approve', r.catalogUser); }
};
__decorate([
    Get('dispatches'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "dispatches", null);
__decorate([
    Get('stock'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "stock", null);
__decorate([
    Get('adjustments'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "list", null);
__decorate([
    Post('adjustments'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "create", null);
__decorate([
    Post('adjustments/:id/:action'),
    __param(0, Param('id')),
    __param(1, Param('action')),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "review", null);
StoreController = __decorate([
    Controller(['api/warehouse/store', 'api/restaurant/store']),
    UseGuards(CatalogGuard),
    __metadata("design:paramtypes", [StoreService])
], StoreController);
export { StoreController };
//# sourceMappingURL=store.controller.js.map
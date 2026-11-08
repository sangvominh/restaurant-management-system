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
import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { InventoryService } from './inventory.service.js';
let InventoryController = class InventoryController {
    service;
    constructor(service) {
        this.service = service;
    }
    allow(req, ...codes) {
        if (!req.catalogUser.permissions.includes('*') && !codes.some(code => req.catalogUser.permissions.includes(code)))
            throw new ForbiddenException('Bạn chưa được cấp quyền chức năng này');
    }
    references(req) { this.allow(req, 'receipt:create'); return this.service.references(); }
    list(req) { this.allow(req, 'receipt:create', 'receipt:post'); return this.service.list(); }
    create(b, req) { this.allow(req, 'receipt:create'); return this.service.save(b, req.catalogUser); }
    update(id, b, req) { this.allow(req, 'receipt:create'); return this.service.save(b, req.catalogUser, id); }
    remove(id, req) { this.allow(req, 'receipt:create'); return this.service.remove(id, req.catalogUser); }
    post(id, req) { this.allow(req, 'receipt:post'); return this.service.post(id); }
    stock(req) { this.allow(req, 'inventory:view'); return this.service.stock(); }
    lots(id, req) { this.allow(req, 'inventory:view'); return this.service.lots(id); }
};
__decorate([
    Get('receipts/references'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "references", null);
__decorate([
    Get('receipts'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "list", null);
__decorate([
    Post('receipts'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "create", null);
__decorate([
    Put('receipts/:id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "update", null);
__decorate([
    Delete('receipts/:id'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "remove", null);
__decorate([
    Post('receipts/:id/post'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "post", null);
__decorate([
    Get('inventory'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "stock", null);
__decorate([
    Get('inventory/:id/lots'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "lots", null);
InventoryController = __decorate([
    Controller('api/warehouse'),
    UseGuards(CatalogGuard),
    __metadata("design:paramtypes", [InventoryService])
], InventoryController);
export { InventoryController };
//# sourceMappingURL=inventory.controller.js.map
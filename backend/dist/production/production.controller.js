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
import { ProductionService } from './production.service.js';
import { ExecutionService } from './execution.service.js';
import { ShortageService } from './shortage.service.js';
let ProductionController = class ProductionController {
    service;
    execution;
    shortages;
    constructor(service, execution, shortages) {
        this.service = service;
        this.execution = execution;
        this.shortages = shortages;
    }
    allow(req, ...codes) {
        if (!req.catalogUser.permissions.includes('*') && !codes.some(c => req.catalogUser.permissions.includes(c)))
            throw new ForbiddenException('Bạn chưa được cấp quyền chức năng này');
    }
    references(r) { this.allow(r, 'bom:manage', 'production:manage'); return this.service.references(); }
    shortageList(r) { return this.shortages.list(r.catalogUser); }
    reportShortage(b, r) { return this.shortages.save(b, r.catalogUser); }
    reviewShortage(id, b, r) { return this.shortages.save(b, r.catalogUser, id); }
    boms(r) { this.allow(r, 'bom:manage', 'production:manage'); return this.service.boms(); }
    createBom(b, r) { this.allow(r, 'bom:manage'); return this.service.saveBom(b, r.catalogUser); }
    updateBom(id, b, r) { this.allow(r, 'bom:manage'); return this.service.saveBom(b, r.catalogUser, id); }
    deleteBom(id, r) { this.allow(r, 'bom:manage'); return this.service.bomAction(id, 'delete'); }
    activate(id, r) { this.allow(r, 'bom:manage'); return this.service.bomAction(id, 'activate'); }
    rejectReplenishment(id, b, r) { this.allow(r, 'production:manage'); return this.service.rejectReplenishment(id, b); }
    replenishments(r) { this.allow(r, 'production:manage'); return this.service.replenishments(); }
    orders(r) { this.allow(r, 'production:manage', 'production:perform', 'material:approve', 'production:inspect', 'waste:approve', 'material:request', 'waste:request'); return this.service.orders(r.catalogUser); }
    detail(id, r) { return this.execution.detail(id, r.catalogUser); }
    execute(id, b, r) { return this.execution.act(id, b, r.catalogUser); }
    createOrder(b, r) { this.allow(r, 'production:manage'); return this.service.createOrder(b, r.catalogUser); }
    receive(id, r) { this.allow(r, 'production:perform'); return this.service.orderAction(id, 'receive', r.catalogUser); }
    cancel(id, r) { this.allow(r, 'production:manage'); return this.service.orderAction(id, 'cancel', r.catalogUser); }
};
__decorate([
    Get('references'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "references", null);
__decorate([
    Get('material-shortages'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "shortageList", null);
__decorate([
    Post('material-shortages'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "reportShortage", null);
__decorate([
    Put('material-shortages/:id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "reviewShortage", null);
__decorate([
    Get('boms'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "boms", null);
__decorate([
    Post('boms'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "createBom", null);
__decorate([
    Put('boms/:id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "updateBom", null);
__decorate([
    Delete('boms/:id'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "deleteBom", null);
__decorate([
    Post('boms/:id/activate'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "activate", null);
__decorate([
    Post('replenishments/:id/reject'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "rejectReplenishment", null);
__decorate([
    Get('replenishments'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "replenishments", null);
__decorate([
    Get('orders'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "orders", null);
__decorate([
    Get('orders/:id/execution'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "detail", null);
__decorate([
    Post('orders/:id/execution'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "execute", null);
__decorate([
    Post('orders'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "createOrder", null);
__decorate([
    Post('orders/:id/receive'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "receive", null);
__decorate([
    Post('orders/:id/cancel'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "cancel", null);
ProductionController = __decorate([
    Controller('api/warehouse/production'),
    UseGuards(CatalogGuard),
    __metadata("design:paramtypes", [ProductionService, ExecutionService, ShortageService])
], ProductionController);
export { ProductionController };
//# sourceMappingURL=production.controller.js.map
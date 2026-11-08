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
import { Body, Controller, ForbiddenException, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { FinishedService } from './finished.service.js';
let FinishedController = class FinishedController {
    service;
    constructor(service) {
        this.service = service;
    }
    allow(r, ...rights) { if (!r.catalogUser.permissions.includes('*') && !rights.some(p => r.catalogUser.permissions.includes(p)))
        throw new ForbiddenException('Chưa có quyền chức năng này'); }
    list(r) { this.allow(r, 'export:request', 'export:approve'); return this.service.list(); }
    sales(r) { this.allow(r, 'export:request'); return this.service.sales(); }
    create(b, r) { this.allow(r, 'export:request'); return this.service.create(b, r.catalogUser); }
    approve(id, r) { this.allow(r, 'export:approve'); return this.service.review(id, true, r.catalogUser); }
    reject(id, r) { this.allow(r, 'export:approve'); return this.service.review(id, false, r.catalogUser); }
    stock(r) { this.allow(r, 'inventory:view'); return this.service.report('products'); }
    report(kind, start, end, r) { this.allow(r, 'report:stock'); if (!start || !end)
        throw new ForbiddenException('Cần chọn kỳ báo cáo'); return this.service.report(kind, start, end); }
};
__decorate([
    Get('exports'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinishedController.prototype, "list", null);
__decorate([
    Get('exports/sales'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinishedController.prototype, "sales", null);
__decorate([
    Post('exports'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FinishedController.prototype, "create", null);
__decorate([
    Post('exports/:id/approve'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FinishedController.prototype, "approve", null);
__decorate([
    Post('exports/:id/reject'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FinishedController.prototype, "reject", null);
__decorate([
    Get('finished-stock'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinishedController.prototype, "stock", null);
__decorate([
    Get('stock-report'),
    __param(0, Query('kind')),
    __param(1, Query('start')),
    __param(2, Query('end')),
    __param(3, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], FinishedController.prototype, "report", null);
FinishedController = __decorate([
    Controller('api/warehouse'),
    UseGuards(CatalogGuard),
    __metadata("design:paramtypes", [FinishedService])
], FinishedController);
export { FinishedController };
//# sourceMappingURL=finished.controller.js.map
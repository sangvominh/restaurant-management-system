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
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RoleTemplateService } from './role-template.service.js';
import { AdminService } from './admin.service.js';
import { AdminAuthGuard, CurrentAdmin } from './admin-auth.guard.js';
let AdminController = class AdminController {
    service;
    templates;
    constructor(service, templates) {
        this.service = service;
        this.templates = templates;
    }
    accounts() { return this.service.accounts(); }
    createAccount(b) { return this.service.saveAccount(b); }
    updateAccount(id, b, user) { return this.service.saveAccount(b, id, user.id); }
    deleteAccount(id, user) { return this.service.deleteAccount(id, user.id); }
    roles() { return this.service.roles(); }
    createRole(b) { return this.service.saveRole(b); }
    updateRole(id, b) { return this.service.saveRole(b, id); }
    deleteRole(id) { return this.service.deleteRole(id); }
    presets() { return this.templates.list(); }
    savePreset(id, b) { return this.templates.save(id, b); }
    resetPreset(id) { return this.templates.reset(id); }
    permissions() { return this.service.permissions(); }
    employees() { return this.service.employees(); }
    createEmployee(b) { return this.service.saveEmployee(b); }
    updateEmployee(id, b, user) { return this.service.saveEmployee(b, id, user.id); }
    deleteEmployee(id) { return this.service.deleteEmployee(id); }
};
__decorate([
    Get('accounts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "accounts", null);
__decorate([
    Post('accounts'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createAccount", null);
__decorate([
    Put('accounts/:id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, CurrentAdmin()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateAccount", null);
__decorate([
    Delete('accounts/:id'),
    __param(0, Param('id')),
    __param(1, CurrentAdmin()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteAccount", null);
__decorate([
    Get('roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "roles", null);
__decorate([
    Post('roles'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createRole", null);
__decorate([
    Put('roles/:id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateRole", null);
__decorate([
    Delete('roles/:id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteRole", null);
__decorate([
    Get('role-presets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "presets", null);
__decorate([
    Put('role-presets/:id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "savePreset", null);
__decorate([
    Delete('role-presets/:id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "resetPreset", null);
__decorate([
    Get('permissions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "permissions", null);
__decorate([
    Get('employees'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "employees", null);
__decorate([
    Post('employees'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createEmployee", null);
__decorate([
    Put('employees/:id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, CurrentAdmin()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateEmployee", null);
__decorate([
    Delete('employees/:id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteEmployee", null);
AdminController = __decorate([
    UseGuards(AdminAuthGuard),
    Controller('api/admin'),
    __metadata("design:paramtypes", [AdminService, RoleTemplateService])
], AdminController);
export { AdminController };
//# sourceMappingURL=admin.controller.js.map
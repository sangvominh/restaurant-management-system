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
import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service.js';
import { AdminAuthGuard, AdminToken, CurrentAdmin } from './admin-auth.guard.js';
let AdminAuthController = class AdminAuthController {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    login(b) { return this.auth.login(b); }
    me(user) { return user; }
    logout(token) { return this.auth.logout(token); }
};
__decorate([
    Post('login'),
    HttpCode(200),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminAuthController.prototype, "login", null);
__decorate([
    Get('me'),
    UseGuards(AdminAuthGuard),
    __param(0, CurrentAdmin()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminAuthController.prototype, "me", null);
__decorate([
    Post('logout'),
    HttpCode(200),
    UseGuards(AdminAuthGuard),
    __param(0, AdminToken()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminAuthController.prototype, "logout", null);
AdminAuthController = __decorate([
    Controller('api/admin/auth'),
    __metadata("design:paramtypes", [AdminAuthService])
], AdminAuthController);
export { AdminAuthController };
//# sourceMappingURL=admin-auth.controller.js.map
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AdminController } from './admin.controller.js';
import { RoleTemplateService } from './role-template.service.js';
import { AdminService } from './admin.service.js';
import { AdminAuthService } from './admin-auth.service.js';
import { AdminAuthGuard } from './admin-auth.guard.js';
import { AdminAuthController } from './admin-auth.controller.js';
@Module({ imports: [PrismaModule], controllers: [AdminController, AdminAuthController], providers: [RoleTemplateService, AdminService, AdminAuthService, AdminAuthGuard], exports: [AdminAuthService] })
export class AdminModule {}

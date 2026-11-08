import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AdminController } from './admin.controller.js';
import { AdminService } from './admin.service.js';
import { AdminAuthService } from './admin-auth.service.js';
import { AdminAuthGuard } from './admin-auth.guard.js';
import { AdminAuthController } from './admin-auth.controller.js';
@Module({ imports: [PrismaModule], controllers: [AdminController, AdminAuthController], providers: [AdminService, AdminAuthService, AdminAuthGuard] })
export class AdminModule {}

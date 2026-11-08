import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CatalogController, WarehouseAuthController } from './catalog.controller.js';
import { CatalogService } from './catalog.service.js';
import { CatalogGuard } from './catalog.guard.js';
@Module({ imports: [AdminModule, PrismaModule], controllers: [CatalogController, WarehouseAuthController], providers: [CatalogService, CatalogGuard] })
export class CatalogModule {}

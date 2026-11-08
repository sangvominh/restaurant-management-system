import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CatalogModule } from '../catalog/catalog.module.js';
import { InventoryController } from './inventory.controller.js';
import { InventoryService } from './inventory.service.js';
import { FinishedService } from './finished.service.js';
import { FinishedController } from './finished.controller.js';
@Module({ imports: [PrismaModule, CatalogModule], controllers: [InventoryController, FinishedController], providers: [InventoryService, FinishedService] })
export class InventoryModule {}

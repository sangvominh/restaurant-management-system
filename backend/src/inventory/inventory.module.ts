import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CatalogModule } from '../catalog/catalog.module.js';
import { InventoryController } from './inventory.controller.js';
import { InventoryService } from './inventory.service.js';
@Module({ imports: [PrismaModule, CatalogModule], controllers: [InventoryController], providers: [InventoryService] })
export class InventoryModule {}

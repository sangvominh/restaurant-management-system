import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CatalogModule } from '../catalog/catalog.module.js';
import { InventoryModule } from '../inventory/inventory.module.js';
import { RestaurantAuthController, SalesController } from './sales.controller.js';
import { SalesService } from './sales.service.js';
@Module({ imports: [PrismaModule, CatalogModule, InventoryModule], controllers: [RestaurantAuthController, SalesController], providers: [SalesService], exports: [SalesService] })
export class SalesModule {}

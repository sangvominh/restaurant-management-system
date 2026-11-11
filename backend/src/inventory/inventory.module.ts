import { ProductReceiptsService } from './product-receipts.service.js';
import { ProductReceiptsController } from './product-receipts.controller.js';
import { StoreService } from './store.service.js';
import { StoreController } from './store.controller.js';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CatalogModule } from '../catalog/catalog.module.js';
import { InventoryController } from './inventory.controller.js';
import { InventoryService } from './inventory.service.js';
import { FinishedService } from './finished.service.js';
import { FinishedController } from './finished.controller.js';
import { StockInsightsService } from './stock-insights.service.js';
import { WarehouseReportService } from './warehouse-report.service.js';
@Module({ imports: [PrismaModule, CatalogModule], controllers: [ProductReceiptsController, StoreController, InventoryController, FinishedController], providers: [ProductReceiptsService, StoreService, InventoryService, FinishedService, StockInsightsService, WarehouseReportService], exports: [FinishedService] })
export class InventoryModule {}

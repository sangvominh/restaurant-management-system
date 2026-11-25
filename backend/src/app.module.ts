import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthController } from './health.controller.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AdminModule } from './admin/admin.module.js';
import { CatalogModule } from './catalog/catalog.module.js';
import { InventoryModule } from './inventory/inventory.module.js';
import { ProductionModule } from './production/production.module.js';
import { SalesModule } from './sales/sales.module.js';
import { CustomerModule } from './customer/customer.module.js';

@Module({
  imports: [PrismaModule, AdminModule, CatalogModule, InventoryModule, ProductionModule, SalesModule, CustomerModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}

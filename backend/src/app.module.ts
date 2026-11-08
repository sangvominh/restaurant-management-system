import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AdminModule } from './admin/admin.module.js';
import { CatalogModule } from './catalog/catalog.module.js';
import { InventoryModule } from './inventory/inventory.module.js';
import { ProductionModule } from './production/production.module.js';

@Module({
  imports: [PrismaModule, AdminModule, CatalogModule, InventoryModule, ProductionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

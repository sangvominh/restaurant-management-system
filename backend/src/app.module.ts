import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { WarehouseModule } from './warehouse/warehouse.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [WarehouseModule, PrismaModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

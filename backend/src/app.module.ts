import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { AdminModule } from './api/admin/admin.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { BackupModule } from './backup/backup.module.js';
import { WarehouseModule } from './warehouse/warehouse.module.js';
import { ProductsModule } from './products/products.module.js';
import { ReportModule } from './report/report.module.js';
import { BrandingController } from './branding/branding.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    AdminModule,
    BackupModule,
    ReportModule,
    WarehouseModule,
    ProductsModule,
  ],
  controllers: [AppController, BrandingController],
  providers: [AppService],
})
export class AppModule {}

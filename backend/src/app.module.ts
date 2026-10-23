import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { WarehouseModule } from './warehouse/warehouse.module.js';

@Module({
  imports: [WarehouseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

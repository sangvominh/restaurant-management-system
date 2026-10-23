
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';

import { WarehouseController } from './warehouse.controller.js';
import { WarehouseService } from './warehouse.service.js';
import { InventoryApi } from './api/inventory.api.js';

@Module({
  imports: [PrismaModule],
  controllers: [WarehouseController],
  providers: [
    WarehouseService,
    InventoryApi,
  ],
})
export class WarehouseModule {}

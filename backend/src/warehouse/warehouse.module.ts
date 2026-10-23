
import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';

import { WarehouseController } from './warehouse.controller.js';
import { WarehouseService } from './warehouse.service.js';

import { InventoryApi } from './api/inventory.api.js';
import { ReceiptApi } from './api/receipt.api.js';

@Module({
  imports: [PrismaModule],

  controllers: [WarehouseController],

  providers: [
    WarehouseService,
    InventoryApi,
    ReceiptApi,
  ],
})
export class WarehouseModule {}

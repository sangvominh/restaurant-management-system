
import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';

import { WarehouseController } from './warehouse.controller.js';
import { WarehouseService } from './warehouse.service.js';

import { InventoryApi } from './api/inventory.api.js';
import { ReceiptApi } from './api/receipt.api.js';
import { MaterialIssueApi } from './api/material-issue.api.js';
import { BomApi } from './api/bom.api.js';
import { ProductionOrderApi } from './api/production-order.api.js';
import { FinishedGoodsApi } from './api/finished-goods.api.js';
import { WasteApi } from './api/waste.api.js';
import { SupplierApi } from './api/supplier.api.js';
import { MaterialApi } from './api/material.api.js';

@Module({
  imports: [PrismaModule],

  controllers: [WarehouseController],

  providers: [
    WarehouseService,
    InventoryApi,
    ReceiptApi,
    MaterialIssueApi,
    BomApi,
    ProductionOrderApi,
    FinishedGoodsApi,
    WasteApi,
    SupplierApi,
    MaterialApi,
  ],
})
export class WarehouseModule {}

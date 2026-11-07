import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';
import { KitchenReturnDecisionService } from '../staff/kitchen-return-decision.service.js';
import { KitchenWasteDecisionService } from '../staff/kitchen-waste-decision.service.js';

import { WarehouseController } from './warehouse.controller.js';
import { WarehouseService } from './warehouse.service.js';

import { ProductionCapacityApi } from './api/production-capacity.api.js';
import { InventoryReportApi } from './api/inventory-report.api.js';
import { InventoryApi } from './api/inventory.api.js';
import { ReceiptApi } from './api/receipt.api.js';
import { MaterialIssueApi } from './api/material-issue.api.js';
import { BomApi } from './api/bom.api.js';
import { ProductionOrderApi } from './api/production-order.api.js';
import { FinishedGoodsApi } from './api/finished-goods.api.js';
import { WasteApi } from './api/waste.api.js';
import { SupplierApi } from './api/supplier.api.js';
import { MaterialApi } from './api/material.api.js';
import { CategoryApi } from './api/category.api.js';
import { WarehouseReferenceApi } from './api/warehouse-reference.api.js';
import { SharedMaterialAdjustmentApi } from './api/shared-material-adjustment.api.js';
import { MaterialAdjustmentApi } from './api/material-adjustment.api.js';
import { FinishedGoodsIssueApi } from './api/finished-goods-issue.api.js';
import { FinishedGoodsDefectApi } from './api/finished-goods-defect.api.js';

@Module({
  imports: [PrismaModule],

  controllers: [WarehouseController],

  providers: [
    WarehouseService,
    InventoryApi,
    InventoryReportApi,
    ProductionCapacityApi,
    ReceiptApi,
    MaterialIssueApi,
    BomApi,
    ProductionOrderApi,
    FinishedGoodsApi,
    WasteApi,
    SupplierApi,
    MaterialApi,
    CategoryApi,
    WarehouseReferenceApi,
    MaterialAdjustmentApi,
    SharedMaterialAdjustmentApi,
    KitchenReturnDecisionService,
    KitchenWasteDecisionService,
    FinishedGoodsIssueApi,
    FinishedGoodsDefectApi,
  ],
})
export class WarehouseModule {}

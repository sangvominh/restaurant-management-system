import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseService } from './warehouse.service.js';
import { InventoryApi } from './api/inventory.api.js';
import { ReceiptApi } from './api/receipt.api.js';
import { MaterialIssueApi } from './api/material-issue.api.js';
import { BomApi } from './api/bom.api.js';
import { ProductionOrderApi } from './api/production-order.api.js';
import { FinishedGoodsApi } from './api/finished-goods.api.js';
import { WasteApi } from './api/waste.api.js';
import { FinishedGoodsIssueApi } from './api/finished-goods-issue.api.js';
import { FinishedGoodsDefectApi } from './api/finished-goods-defect.api.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('WarehouseService', () => {
  let service: WarehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarehouseService,
        InventoryApi,
        ReceiptApi,
        MaterialIssueApi,
        BomApi,
        ProductionOrderApi,
        FinishedGoodsApi,
        WasteApi,
        FinishedGoodsIssueApi,
        FinishedGoodsDefectApi,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<WarehouseService>(WarehouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

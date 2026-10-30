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
import { CategoryApi } from './api/category.api.js';

describe('WarehouseService', () => {
  it('passes supplier search to SupplierApi', async () => {
    const supplierApi = {
      getSuppliers: vi.fn().mockResolvedValue({ data: [] }),
    } as unknown as SupplierApi;
    const service = new WarehouseService(
      {} as InventoryApi,
      {} as ReceiptApi,
      {} as MaterialIssueApi,
      {} as BomApi,
      {} as ProductionOrderApi,
      {} as FinishedGoodsApi,
      {} as WasteApi,
      supplierApi,
      {} as MaterialApi,
      {} as CategoryApi,
    );

    await service.getSuppliers('rau củ');

    expect(supplierApi.getSuppliers).toHaveBeenCalledWith('rau củ');
  });
});

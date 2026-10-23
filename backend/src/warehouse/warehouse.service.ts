
import { Injectable } from '@nestjs/common';
import { InventoryApi } from './api/inventory.api.js';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly inventoryApi: InventoryApi,
  ) {}

  // API lấy danh sách tồn kho
  getInventory() {
    return this.inventoryApi.getInventory();
  }
}

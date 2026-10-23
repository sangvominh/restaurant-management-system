
import { Injectable } from '@nestjs/common';

import { InventoryApi } from './api/inventory.api.js';
import { ReceiptApi } from './api/receipt.api.js';
import { CreateReceiptDto } from './dto/create-receipt.dto.js';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly inventoryApi: InventoryApi,
    private readonly receiptApi: ReceiptApi,
  ) {}

  // API 1: Danh sách tồn kho
  getInventory() {
    return this.inventoryApi.getInventory();
  }

  // API 2: Chi tiết tồn kho
  getInventoryByCode(code: string) {
    return this.inventoryApi.getInventoryByCode(code);
  }

  // API 3: Tạo phiếu nhập
  createReceipt(dto: CreateReceiptDto) {
    return this.receiptApi.createReceipt(dto);
  }
}

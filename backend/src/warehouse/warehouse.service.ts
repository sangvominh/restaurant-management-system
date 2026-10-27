import { Injectable } from '@nestjs/common';

import { InventoryApi } from './api/inventory.api.js';
import { ReceiptApi } from './api/receipt.api.js';
import { CreateReceiptDto } from './dto/create-receipt.dto.js';
import { MaterialIssueApi } from './api/material-issue.api.js';
import { BomApi } from './api/bom.api.js';
import { CreateBomDto } from './dto/create-bom.dto.js';
import { CheckBomStockDto } from './dto/check-bom-stock.dto.js';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly inventoryApi: InventoryApi,
    private readonly receiptApi: ReceiptApi,
    private readonly materialIssueApi: MaterialIssueApi,
    private readonly bomApi: BomApi,
  ) {}

  //Danh sách tồn kho
  getInventory() {
    return this.inventoryApi.getInventory();
  }

  // Chi tiết tồn kho
  getInventoryByCode(code: string) {
    return this.inventoryApi.getInventoryByCode(code);
  }

  // Tạo phiếu nhập
  createReceipt(dto: CreateReceiptDto) {
    return this.receiptApi.createReceipt(dto);
  }

  getReceipts() {
    return this.receiptApi.getReceipts();
  }
  // Xem chi tiết phiếu nhập theo mã
  getReceiptByCode(code: string) {
    return this.receiptApi.getReceiptByCode(code);
  }
  //phiếu xuất kho
  getMaterialIssues(status?: string) {
    return this.materialIssueApi.getMaterialIssues(status);
  }

  // Xem chi tiết phiếu xuất NVL
  getMaterialIssueByCode(code: string) {
    return this.materialIssueApi.getMaterialIssueByCode(code);
  }

  // Phê duyệt phiếu xuất nguyên vật liệu
  approveMaterialIssue(code: string) {
    return this.materialIssueApi.approveIssue(code);
  }

  // Từ chối phiếu xuất nguyên vật liệu
  rejectMaterialIssue(code: string, reason: string) {
    return this.materialIssueApi.rejectIssue(code, reason);
  }

  // Tạo công thức BOM
  createBom(dto: CreateBomDto) {
    return this.bomApi.createBom(dto);
  }

  // Lấy danh sách công thức BOM
  getBoms() {
    return this.bomApi.getBoms();
  }

  // Xem chi tiết công thức BOM
  getBomByCode(code: string) {
    return this.bomApi.getBomByCode(code);
  }

  // Kiểm tra nguyên vật liệu theo BOM
  checkBomStock(dto: CheckBomStockDto) {
    return this.bomApi.checkBomStock(dto);
  }
}

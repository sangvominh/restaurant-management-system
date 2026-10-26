import { Injectable } from '@nestjs/common';

import { InventoryApi } from './api/inventory.api.js';
import { ReceiptApi } from './api/receipt.api.js';
import { CreateReceiptDto } from './dto/create-receipt.dto.js';
import { MaterialIssueApi } from './api/material-issue.api.js';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly inventoryApi: InventoryApi,
    private readonly receiptApi: ReceiptApi,
    private readonly materialIssueApi: MaterialIssueApi,
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
}

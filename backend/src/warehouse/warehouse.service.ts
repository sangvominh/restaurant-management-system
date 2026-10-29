import { Injectable } from '@nestjs/common';

import { InventoryApi } from './api/inventory.api.js';
import { ReceiptApi } from './api/receipt.api.js';
import { CreateReceiptDto } from './dto/create-receipt.dto.js';
import { MaterialIssueApi } from './api/material-issue.api.js';
import { BomApi } from './api/bom.api.js';
import { CreateBomDto } from './dto/create-bom.dto.js';
import { CheckBomStockDto } from './dto/check-bom-stock.dto.js';
import { ProductionOrderApi } from './api/production-order.api.js';
import { CreateProductionOrderDto } from './dto/create-production-order.dto.js';
import { AssignProductionOrderDto } from './dto/assign-production-order.dto.js';
import { FinishedGoodsApi } from './api/finished-goods.api.js';
import { ApproveFinishedGoodsDto } from './dto/approve-finished-goods.dto.js';
import { RejectFinishedGoodsDto } from './dto/reject-finished-goods.dto.js';
import { WasteApi } from './api/waste.api.js';
import { RejectWasteDto } from './dto/reject-waste.dto.js';
@Injectable()
export class WarehouseService {
  constructor(
    private readonly inventoryApi: InventoryApi,
    private readonly receiptApi: ReceiptApi,
    private readonly materialIssueApi: MaterialIssueApi,
    private readonly bomApi: BomApi,
    private readonly productionOrderApi: ProductionOrderApi,
    private readonly finishedGoodsApi: FinishedGoodsApi,
    private readonly wasteApi: WasteApi,
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

  // Tạo lệnh sản xuất
  createProductionOrder(dto: CreateProductionOrderDto) {
    return this.productionOrderApi.createProductionOrder(dto);
  }

  // Lấy danh sách lệnh sản xuất
  getProductionOrders(status?: string, code?: string) {
    return this.productionOrderApi.getProductionOrders(status, code);
  }

  // Xem chi tiết lệnh sản xuất
  getProductionOrderByCode(code: string) {
    return this.productionOrderApi.getProductionOrderByCode(code);
  }

  // Kiểm tra NVL cho lệnh sản xuất
  checkProductionOrderMaterials(code: string) {
    return this.productionOrderApi.checkProductionOrderMaterials(code);
  }

  // Xác nhận kế hoạch sản xuất
  confirmProductionOrder(code: string) {
    return this.productionOrderApi.confirmProductionOrder(code);
  }

  // Cấp phát NVL cho lệnh sản xuất
  issueProductionMaterials(code: string) {
    return this.productionOrderApi.issueProductionMaterials(code);
  }

  // Xem lịch sử cấp phát NVL
  getMaterialMovements(code: string) {
    return this.productionOrderApi.getMaterialMovements(code);
  }

  // Hủy lệnh sản xuất
  cancelProductionOrder(code: string) {
    return this.productionOrderApi.cancelProductionOrder(code);
  }

  // Xem tiến độ sản xuất
  getProductionOrderProgress(code: string) {
    return this.productionOrderApi.getProductionOrderProgress(code);
  }

  // Giao lệnh sản xuất cho nhân viên
  assignProductionOrder(code: string, dto: AssignProductionOrderDto) {
    return this.productionOrderApi.assignProductionOrder(code, dto);
  }

  // Cho phép bắt đầu sản xuất
  startProductionOrder(code: string) {
    return this.productionOrderApi.startProductionOrder(code);
  }

  // Lấy phiếu thành phẩm
  getFinishedGoodsReceipts(status?: string) {
    return this.finishedGoodsApi.getReceipts(status);
  }

  //Duyệt nhập thành phẩm
  approveFinishedGoodsReceipt(code: string, dto: ApproveFinishedGoodsDto) {
    return this.finishedGoodsApi.approveReceipt(code, dto);
  }

  //Từ chối phiếu thành phẩm
  rejectFinishedGoodsReceipt(code: string, dto: RejectFinishedGoodsDto) {
    return this.finishedGoodsApi.rejectReceipt(code, dto);
  }

  // Xem tồn kho thành phẩm
  getFinishedGoodsInventory(branchCode: string, productCode?: string) {
    return this.finishedGoodsApi.getInventory(branchCode, productCode);
  }

  // Xem chi tiết phiếu thành phẩm
  getFinishedGoodsReceiptByCode(code: string) {
    return this.finishedGoodsApi.getReceiptByCode(code);
  }

  // Lấy lịch sử nhập thành phẩm
  getFinishedGoodsMovements() {
    return this.finishedGoodsApi.getFinishedGoodsMovements();
  }

  // Lấy danh sách tồn kho
  getInventoryMovements() {
    return this.inventoryApi.getInventoryMovements();
  }

  // Lấy danh sách yêu cầu hao hụt
  getWasteRequests(status?: string) {
    return this.wasteApi.getRequests(status);
  }

  // Duyệt yêu cầu hao hụt
  approveWasteRequest(code: string) {
    return this.wasteApi.approveRequest(code);
  }

  // Từ chối yêu cầu hao hụt
  rejectWasteRequest(code: string, dto: RejectWasteDto) {
    return this.wasteApi.rejectRequest(code, dto);
  }
}

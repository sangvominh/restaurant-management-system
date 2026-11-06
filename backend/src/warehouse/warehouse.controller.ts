import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Delete,
} from '@nestjs/common';

import { WarehouseService } from './warehouse.service.js';
import { CreateReceiptDto } from './dto/create-receipt.dto.js';
import { RejectMaterialIssueDto } from './dto/reject-material-issue.dto.js';
import { CreateBomDto } from './dto/create-bom.dto.js';
import { NewVersionBomDto, UpdateBomDto } from './dto/update-bom.dto.js';
import { CheckBomStockDto } from './dto/check-bom-stock.dto.js';
import { CreateProductionOrderDto } from './dto/create-production-order.dto.js';
import { AssignProductionOrderDto } from './dto/assign-production-order.dto.js';
import { ApproveFinishedGoodsDto } from './dto/approve-finished-goods.dto.js';
import { RejectFinishedGoodsDto } from './dto/reject-finished-goods.dto.js';
import { RejectWasteDto } from './dto/reject-waste.dto.js';
import { CreateSupplierDto } from './dto/create-supplier.dto.js';
import { UpdateSupplierDto } from './dto/update-supplier.dto.js';
import { CreateMaterialDto } from './dto/create-material.dto.js';
import { UpdateMaterialDto } from './dto/update-material.dto.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { ApproveMaterialAdjustmentDto, RejectMaterialAdjustmentDto } from './dto/process-material-adjustment.dto.js';
import { CreateFinishedGoodsIssueDto } from './dto/create-finished-goods-issue.dto.js';
import { ReportFinishedGoodsDto } from './dto/report-finished-goods.dto.js';
import { CreateFinishedGoodsDefectDto } from './dto/create-finished-goods-defect.dto.js';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get('branches')
  getBranches() { return this.warehouseService.getBranches(); }

  @Get('locations')
  getLocations(@Query('branchId') branchId: string) { return this.warehouseService.getLocations(branchId); }

  @Get('material-adjustments')
  getMaterialAdjustments(@Query('type') type?: string, @Query('status') status?: string) { return this.warehouseService.getMaterialAdjustments(type, status); }

  @Get('material-adjustments/:code')
  getMaterialAdjustment(@Param('code') code: string) { return this.warehouseService.getMaterialAdjustment(code); }

  @Post('material-adjustments/:code/approve')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  approveMaterialAdjustment(@Param('code') code: string, @Body() dto: ApproveMaterialAdjustmentDto) { return this.warehouseService.approveMaterialAdjustment(code, dto); }

  @Post('material-adjustments/:code/reject')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  rejectMaterialAdjustment(@Param('code') code: string, @Body() dto: RejectMaterialAdjustmentDto) { return this.warehouseService.rejectMaterialAdjustment(code, dto.reason); }

  // API 1: Lấy danh sách tồn kho
  @Get('inventory')
  getInventory(@Query('branchCode') branchCode?: string) {
    return this.warehouseService.getInventory(branchCode);
  }

  // Cảnh báo NVL có tồn khả dụng dưới mức tối thiểu
  @Get('inventory/alerts')
  getInventoryAlerts(@Query('branchCode') branchCode?: string) {
    return this.warehouseService.getInventoryAlerts(branchCode);
  }

  // API 2: Lấy chi tiết NVL theo mã
  @Get('inventory/:code')
  getInventoryByCode(
    @Param('code') code: string,
    @Query('branchCode') branchCode?: string,
  ) {
    return this.warehouseService.getInventoryByCode(code, branchCode);
  }

  // API 3: Tạo phiếu nhập kho
  @Post('receipts')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  createReceipt(@Body() dto: CreateReceiptDto) {
    return this.warehouseService.createReceipt(dto);
  }
  // API 4: Lấy danh sách phiếu nhập kho
  @Get('receipts')
  getReceipts(
    @Query('supplierCode') supplierCode?: string,
    @Query('branchCode') branchCode?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.warehouseService.getReceipts(
      supplierCode,
      branchCode,
      from,
      to,
    );
  }

  // GET /warehouse/receipts/PN003
  @Get('receipts/:code')
  getReceiptByCode(@Param('code') code: string) {
    return this.warehouseService.getReceiptByCode(code);
  }

  // GET /warehouse/material-issues?status=PENDING
  @Get('material-issues')
  getMaterialIssues(@Query('status') status?: string) {
    return this.warehouseService.getMaterialIssues(status);
  }

  // POST /warehouse/material-issues/XNVL001/approve
  // GET /warehouse/material-issues/XNVL001
  @Get('material-issues/:code')
  getMaterialIssueByCode(@Param('code') code: string) {
    return this.warehouseService.getMaterialIssueByCode(code);
  }

  // POST /warehouse/material-issues/XNVL001/approve
  @Post('material-issues/:code/approve')
  @HttpCode(200)
  approveMaterialIssue(@Param('code') code: string) {
    return this.warehouseService.approveMaterialIssue(code);
  }

  @Post('material-issues/:code/reject')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  rejectMaterialIssue(
    @Param('code') code: string,
    @Body() dto: RejectMaterialIssueDto,
  ) {
    return this.warehouseService.rejectMaterialIssue(code, dto.reason);
  }

  // Tạo công thức BOM
  @Post('boms')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  createBom(@Body() dto: CreateBomDto) {
    return this.warehouseService.createBom(dto);
  }

  @Post('boms/:code/update')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  updateBom(@Param('code') code: string, @Body() dto: UpdateBomDto) {
    return this.warehouseService.updateBom(code, dto);
  }

  @Post('boms/:code/new-version')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  createBomVersion(
    @Param('code') code: string,
    @Body() dto: NewVersionBomDto,
  ) {
    return this.warehouseService.createBomVersion(code, dto);
  }

  @Post('boms/:code/deactivate')
  @HttpCode(200)
  deactivateBom(@Param('code') code: string) {
    return this.warehouseService.deactivateBom(code);
  }
  // GET /warehouse/boms
  @Get('boms')
  getBoms(
    @Query('productCode') productCode?: string,
    @Query('status') status?: string,
  ) {
    return this.warehouseService.getBoms(productCode, status);
  }

  // GET /warehouse/boms/product/TP001 (Tra cứu tất cả phiên bản công thức theo mã món ăn)
  @Get('boms/product/:productCode')
  getBomsByProduct(@Param('productCode') productCode: string) {
    return this.warehouseService.getBomsByProduct(productCode);
  }

  // GET /warehouse/boms/BOM001 (Xem chi tiết công thức)
  @Get('boms/:code')
  getBomByCode(@Param('code') code: string) {
    return this.warehouseService.getBomByCode(code);
  }

  // PATCH /warehouse/boms/BOM001 (Chỉnh sửa công thức BOM)
  @Patch('boms/:code')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  updateBom(@Param('code') code: string, @Body() dto: UpdateBomDto) {
    return this.warehouseService.updateBom(code, dto);
  }

  // POST /warehouse/boms/BOM001/version (Tạo phiên bản mới cho BOM)
  @Post('boms/:code/version')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  createBomNextVersion(
    @Param('code') code: string,
    @Body() dto: CreateBomVersionDto,
  ) {
    return this.warehouseService.createBomNextVersion(code, dto);
  }

  // PATCH /warehouse/boms/BOM001/status (Ngừng áp dụng hoặc kích hoạt lại công thức)
  @Patch('boms/:code/status')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  updateBomStatus(
    @Param('code') code: string,
    @Body() dto: UpdateBomStatusDto,
  ) {
    return this.warehouseService.updateBomStatus(code, dto.status);
  }

  // POST /warehouse/boms/check-stock
  @Post('boms/check-stock')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  checkBomStock(@Body() dto: CheckBomStockDto) {
    return this.warehouseService.checkBomStock(dto);
  }

  // POST /warehouse/production-orders
  @Post('production-orders')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  createProductionOrder(@Body() dto: CreateProductionOrderDto) {
    return this.warehouseService.createProductionOrder(dto);
  }

  // GET /warehouse/production-orders
  @Get('production-orders')
  getProductionOrders(
    @Query('status') status?: string,
    @Query('code') code?: string,
  ) {
    return this.warehouseService.getProductionOrders(status, code);
  }

  // GET /warehouse/production-orders/LSX001
  @Get('production-orders/:code')
  getProductionOrderByCode(@Param('code') code: string) {
    return this.warehouseService.getProductionOrderByCode(code);
  }

  // POST /warehouse/production-orders/LSX001/check-materials
  @Post('production-orders/:code/check-materials')
  @HttpCode(200)
  checkProductionOrderMaterials(@Param('code') code: string) {
    return this.warehouseService.checkProductionOrderMaterials(code);
  }

  // POST /warehouse/production-orders/LSX001/confirm
  @Post('production-orders/:code/confirm')
  @HttpCode(200)
  confirmProductionOrder(@Param('code') code: string) {
    return this.warehouseService.confirmProductionOrder(code);
  }

  // POST /warehouse/production-orders/LSX001/issue-materials
  @Post('production-orders/:code/issue-materials')
  @HttpCode(200)
  issueProductionMaterials(@Param('code') code: string) {
    return this.warehouseService.issueProductionMaterials(code);
  }

  // GET lịch sử NVL của lệnh sản xuất
  @Get('production-orders/:code/material-movements')
  getMaterialMovements(@Param('code') code: string) {
    return this.warehouseService.getMaterialMovements(code);
  }

  // POST hủy lệnh sản xuất
  @Post('production-orders/:code/cancel')
  @HttpCode(200)
  cancelProductionOrder(@Param('code') code: string) {
    return this.warehouseService.cancelProductionOrder(code);
  }

  // GET tiến độ lệnh sản xuất
  @Get('production-orders/:code/progress')
  getProductionOrderProgress(@Param('code') code: string) {
    return this.warehouseService.getProductionOrderProgress(code);
  }
  // POST giao lệnh sản xuất cho nhân viên
  @Post('production-orders/:code/assign')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  assignProductionOrder(
    @Param('code') code: string,
    @Body() dto: AssignProductionOrderDto,
  ) {
    return this.warehouseService.assignProductionOrder(code, dto);
  }

  // POST /warehouse/production-orders/LSX001/start
  @Post('production-orders/:code/start')
  @HttpCode(200)
  startProductionOrder(@Param('code') code: string) {
    return this.warehouseService.startProductionOrder(code);
  }

  @Post('production-orders/:code/finished-goods')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  reportFinishedGoods(@Param('code') code: string, @Body() dto: ReportFinishedGoodsDto) {
    return this.warehouseService.reportFinishedGoods(code, dto);
  }

  // GET /warehouse/finished-goods-receipts
  @Get('finished-goods-receipts')
  getFinishedGoodsReceipts(@Query('status') status?: string) {
    return this.warehouseService.getFinishedGoodsReceipts(status);
  }

  //Duyệt nhập thành phẩm
  @Post('finished-goods-receipts/:code/approve')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  approveFinishedGoodsReceipt(
    @Param('code') code: string,
    @Body() dto: ApproveFinishedGoodsDto,
  ) {
    return this.warehouseService.approveFinishedGoodsReceipt(code, dto);
  }

  // Từ chối nhập thành phẩm
  @Post('finished-goods-receipts/:code/reject')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  rejectFinishedGoodsReceipt(
    @Param('code') code: string,
    @Body() dto: RejectFinishedGoodsDto,
  ) {
    return this.warehouseService.rejectFinishedGoodsReceipt(code, dto);
  }

  // GET /warehouse/finished-goods-inventory?branchCode=BR001&productCode=PROD001
  @Get('finished-goods-inventory')
  getFinishedGoodsInventory(
    @Query('branchCode') branchCode: string,
    @Query('productCode') productCode?: string,
  ) {
    return this.warehouseService.getFinishedGoodsInventory(
      branchCode,
      productCode,
    );
  }
  // GET /warehouse/finished-goods-receipts/:code
  @Get('finished-goods-receipts/:code')
  getFinishedGoodsReceiptByCode(@Param('code') code: string) {
    return this.warehouseService.getFinishedGoodsReceiptByCode(code);
  }

  // GET /warehouse/finished-goods-movements
  @Get('finished-goods-movements')
  getFinishedGoodsMovements() {
    return this.warehouseService.getFinishedGoodsMovements();
  }

  @Get('finished-goods-issues')
  getFinishedGoodsIssues(@Query('status') status?: string, @Query('shiftCode') shiftCode?: string) {
    return this.warehouseService.getFinishedGoodsIssues(status, shiftCode);
  }

  @Get('finished-goods-issue-branches')
  getFinishedGoodsIssueBranches() {
    return this.warehouseService.getFinishedGoodsIssueBranches();
  }

  @Post('finished-goods-issues')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createFinishedGoodsIssue(@Body() dto: CreateFinishedGoodsIssueDto) {
    return this.warehouseService.createFinishedGoodsIssue(dto);
  }

  @Post('finished-goods-issues/:code/approve')
  @HttpCode(200)
  approveFinishedGoodsIssue(@Param('code') code: string, @Body() body: { quantities?: Record<string, string> }) {
    return this.warehouseService.approveFinishedGoodsIssue(code, body?.quantities);
  }

  @Post('finished-goods-issues/:code/reject')
  @HttpCode(200)
  rejectFinishedGoodsIssue(@Param('code') code: string, @Body() body: { reason: string }) {
    return this.warehouseService.rejectFinishedGoodsIssue(code, body?.reason ?? '');
  }

  @Get('finished-goods-defects')
  getFinishedGoodsDefects(@Query('status') status?: string) {
    return this.warehouseService.getFinishedGoodsDefects(status);
  }

  @Post('finished-goods-defects')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createFinishedGoodsDefect(@Body() dto: CreateFinishedGoodsDefectDto) {
    return this.warehouseService.createFinishedGoodsDefect(dto);
  }

  @Post('finished-goods-defects/:code/approve')
  @HttpCode(200)
  approveFinishedGoodsDefect(@Param('code') code: string) {
    return this.warehouseService.approveFinishedGoodsDefect(code);
  }

  @Post('finished-goods-defects/:code/reject')
  @HttpCode(200)
  rejectFinishedGoodsDefect(@Param('code') code: string, @Body() body: { reason: string }) {
    return this.warehouseService.rejectFinishedGoodsDefect(code, body?.reason ?? '');
  }

  // GET /warehouse/inventory-movements
  @Get('inventory-movements')
  getInventoryMovements(@Query('branchCode') branchCode?: string) {
    return this.warehouseService.getInventoryMovements(branchCode);
  }

  // GET /warehouse/waste-requests?status=PENDING
  @Get('waste-requests')
  getWasteRequests(@Query('status') status?: string) {
    return this.warehouseService.getWasteRequests(status);
  }

  // POST /warehouse/waste-requests/:code/approve
  @Post('waste-requests/:code/approve')
  @HttpCode(200)
  approveWasteRequest(@Param('code') code: string) {
    return this.warehouseService.approveWasteRequest(code);
  }

  // POST /warehouse/waste-requests/:code/reject
  @Post('waste-requests/:code/reject')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  rejectWasteRequest(@Param('code') code: string, @Body() dto: RejectWasteDto) {
    return this.warehouseService.rejectWasteRequest(code, dto);
  }

  // 1. Danh sách và tìm kiếm
  @Get('suppliers')
  getSuppliers(@Query('search') search?: string) {
    return this.warehouseService.getSuppliers(search);
  }

  // 2. Xem chi tiết
  @Get('suppliers/:code')
  getSupplierByCode(@Param('code') code: string) {
    return this.warehouseService.getSupplierByCode(code);
  }

  // 3. Thêm
  @Post('suppliers')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createSupplier(@Body() dto: CreateSupplierDto) {
    return this.warehouseService.createSupplier(dto);
  }

  // 4. Sửa
  @Patch('suppliers/:code')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateSupplier(@Param('code') code: string, @Body() dto: UpdateSupplierDto) {
    return this.warehouseService.updateSupplier(code, dto);
  }

  // 5. Xóa
  @Delete('suppliers/:code')
  deleteSupplier(@Param('code') code: string) {
    return this.warehouseService.deleteSupplier(code);
  }

  // GET danh sách NVL
  @Get('materials')
  getMaterials(@Query('search') search?: string) {
    return this.warehouseService.getMaterials(search);
  }

  // POST thêm NVL
  @Post('materials')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createMaterial(@Body() dto: CreateMaterialDto) {
    return this.warehouseService.createMaterial(dto);
  }

  @Get('materials/:code')
  getMaterialByCode(@Param('code') code: string) {
    return this.warehouseService.getMaterialByCode(code);
  }

  @Patch('materials/:code')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateMaterial(@Param('code') code: string, @Body() dto: UpdateMaterialDto) {
    return this.warehouseService.updateMaterial(code, dto);
  }

  @Get('categories')
  getCategories() {
    return this.warehouseService.getCategories();
  }

  // 1. Thêm danh mục
  @Post('categories')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.warehouseService.createCategory(dto);
  }

  // 2. Cập nhật danh mục
  @Patch('categories/:code')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateCategory(@Param('code') code: string, @Body() dto: UpdateCategoryDto) {
    return this.warehouseService.updateCategory(code, dto);
  }

  // 3. Danh sách đơn vị tính
  @Get('units')
  getUnits() {
    return this.warehouseService.getUnits();
  }
}

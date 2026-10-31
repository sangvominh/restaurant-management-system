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
} from '@nestjs/common';

import { WarehouseService } from './warehouse.service.js';
import { CreateReceiptDto } from './dto/create-receipt.dto.js';
import { RejectMaterialIssueDto } from './dto/reject-material-issue.dto.js';
import { CreateBomDto } from './dto/create-bom.dto.js';
import { UpdateBomDto } from './dto/update-bom.dto.js';
import { CreateBomVersionDto } from './dto/create-bom-version.dto.js';
import { UpdateBomStatusDto } from './dto/update-bom-status.dto.js';
import { CheckBomStockDto } from './dto/check-bom-stock.dto.js';
import { CreateProductionOrderDto } from './dto/create-production-order.dto.js';
import { AssignProductionOrderDto } from './dto/assign-production-order.dto.js';
import { ApproveFinishedGoodsDto } from './dto/approve-finished-goods.dto.js';
import { RejectFinishedGoodsDto } from './dto/reject-finished-goods.dto.js';
import { RejectWasteDto } from './dto/reject-waste.dto.js';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  // API 1: Lấy danh sách tồn kho
  @Get('inventory')
  getInventory() {
    return this.warehouseService.getInventory();
  }

  // API 2: Lấy chi tiết NVL theo mã
  @Get('inventory/:code')
  getInventoryByCode(@Param('code') code: string) {
    return this.warehouseService.getInventoryByCode(code);
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
  getReceipts() {
    return this.warehouseService.getReceipts();
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

  // GET /warehouse/boms (hỗ trợ lọc theo productCode & status)
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

  // GET /warehouse/inventory-movements
  @Get('inventory-movements')
  getInventoryMovements() {
    return this.warehouseService.getInventoryMovements();
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
}

import {
  Controller,
  Get,
  Post,
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
import { CheckBomStockDto } from './dto/check-bom-stock.dto.js';
import { CreateProductionOrderDto } from './dto/create-production-order.dto.js';

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

  @Post('boms')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  // tạo công thức BOM
  createBom(@Body() dto: CreateBomDto) {
    return this.warehouseService.createBom(dto);
  }
  // GET /warehouse/boms
  @Get('boms')
  getBoms() {
    return this.warehouseService.getBoms();
  }

  // GET /warehouse/boms/BOM001
  @Get('boms/:code')
  getBomByCode(@Param('code') code: string) {
    return this.warehouseService.getBomByCode(code);
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
}

import { RequirePermissions, RequireWarehouse } from '../common/auth.decorators.js';
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
import { PrismaService } from '../prisma/prisma.service.js';
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
import { CreateFinishedGoodsIssueDto } from './dto/create-finished-goods-issue.dto.js';
import { ReportFinishedGoodsDto } from './dto/report-finished-goods.dto.js';
import { CreateFinishedGoodsDefectDto } from './dto/create-finished-goods-defect.dto.js';

@RequireWarehouse()
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService, private readonly db: PrismaService) {}

  @Get('receipt-options')
  @RequirePermissions('inventory:import')
  async receiptOptions() {
    const [branches, suppliers, materials] = await Promise.all([
      this.db.branch.findMany({ where: { isActive: true }, include: { warehouseLocations: true }, orderBy: { name: 'asc' } }),
      this.db.supplier.findMany({ where: { status: 'ACTIVE' }, select: { code: true, name: true }, orderBy: { name: 'asc' } }),
      this.db.material.findMany({ where: { status: 'ACTIVE' }, include: { unit: true, lots: { where: { status: 'ACTIVE' } } }, orderBy: { name: 'asc' } }),
    ]);
    return { data: { branches, suppliers, materials } };
  }

  // API 1: Lấy danh sách tồn kho
  @RequirePermissions("inventory:view")
  @Get('inventory')
  getInventory() {
    return this.warehouseService.getInventory();
  }

  // API 2: Lấy chi tiết NVL theo mã
  @RequirePermissions("inventory:view")
  @Get('inventory/:code')
  getInventoryByCode(@Param('code') code: string) {
    return this.warehouseService.getInventoryByCode(code);
  }

  @Get('bom-materials')
  @RequirePermissions('bom:manage')
  async bomMaterials() {
    const materials = await this.db.material.findMany({ where: { status: 'ACTIVE' }, include: { unit: true, category: true }, orderBy: { name: 'asc' } });
    return { data: materials.map(m => ({ id: m.id, code: m.code, name: m.name, unit: m.unit.name, category: m.category.name })) };
  }

  @Get('bom-products')
  @RequirePermissions('bom:manage')
  async bomProducts() {
    return { data: await this.db.product.findMany({ where: { status: 'ACTIVE' }, select: { id: true, code: true, name: true, category: true, price: true, unit: true, imageUrl: true }, orderBy: { name: 'asc' } }) };
  }

  // API 3: Tạo phiếu nhập kho
  @RequirePermissions("inventory:import")
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
  @RequirePermissions("inventory:import")
  @Get('receipts')
  getReceipts() {
    return this.warehouseService.getReceipts();
  }

  // GET /warehouse/receipts/PN003
  @RequirePermissions("inventory:import")
  @Get('receipts/:code')
  getReceiptByCode(@Param('code') code: string) {
    return this.warehouseService.getReceiptByCode(code);
  }

  // GET /warehouse/material-issues?status=PENDING
  @RequirePermissions("inventory:approve-export")
  @Get('material-issues')
  getMaterialIssues(@Query('status') status?: string) {
    return this.warehouseService.getMaterialIssues(status);
  }

  // POST /warehouse/material-issues/XNVL001/approve
  // GET /warehouse/material-issues/XNVL001
  @RequirePermissions("inventory:approve-export")
  @Get('material-issues/:code')
  getMaterialIssueByCode(@Param('code') code: string) {
    return this.warehouseService.getMaterialIssueByCode(code);
  }

  // POST /warehouse/material-issues/XNVL001/approve
  @RequirePermissions("inventory:approve-export")
  @Post('material-issues/:code/approve')
  @HttpCode(200)
  approveMaterialIssue(@Param('code') code: string) {
    return this.warehouseService.approveMaterialIssue(code);
  }

  @RequirePermissions("inventory:approve-export")
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
  @RequirePermissions("bom:manage")
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
  @RequirePermissions("bom:manage")
  @Get('boms')
  getBoms(
    @Query('productCode') productCode?: string,
    @Query('status') status?: string,
  ) {
    return this.warehouseService.getBoms(productCode, status);
  }

  // GET /warehouse/boms/product/TP001 (Tra cứu tất cả phiên bản công thức theo mã món ăn)
  @RequirePermissions("bom:manage")
  @Get('boms/product/:productCode')
  getBomsByProduct(@Param('productCode') productCode: string) {
    return this.warehouseService.getBomsByProduct(productCode);
  }

  // GET /warehouse/boms/BOM001 (Xem chi tiết công thức)
  @RequirePermissions("bom:manage")
  @Get('boms/:code')
  getBomByCode(@Param('code') code: string) {
    return this.warehouseService.getBomByCode(code);
  }

  // PATCH /warehouse/boms/BOM001 (Chỉnh sửa công thức BOM)
  @RequirePermissions("bom:manage")
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
  @RequirePermissions("bom:manage")
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
  @RequirePermissions("bom:manage")
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
  @RequirePermissions("bom:manage")
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
  @RequirePermissions("integration:pending")
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
  @RequirePermissions("integration:pending")
  @Get('production-orders')
  getProductionOrders(
    @Query('status') status?: string,
    @Query('code') code?: string,
  ) {
    return this.warehouseService.getProductionOrders(status, code);
  }

  // GET /warehouse/production-orders/LSX001
  @RequirePermissions("integration:pending")
  @Get('production-orders/:code')
  getProductionOrderByCode(@Param('code') code: string) {
    return this.warehouseService.getProductionOrderByCode(code);
  }

  // POST /warehouse/production-orders/LSX001/check-materials
  @RequirePermissions("integration:pending")
  @Post('production-orders/:code/check-materials')
  @HttpCode(200)
  checkProductionOrderMaterials(@Param('code') code: string) {
    return this.warehouseService.checkProductionOrderMaterials(code);
  }

  // POST /warehouse/production-orders/LSX001/confirm
  @RequirePermissions("integration:pending")
  @Post('production-orders/:code/confirm')
  @HttpCode(200)
  confirmProductionOrder(@Param('code') code: string) {
    return this.warehouseService.confirmProductionOrder(code);
  }

  // POST /warehouse/production-orders/LSX001/issue-materials
  @RequirePermissions("integration:pending")
  @Post('production-orders/:code/issue-materials')
  @HttpCode(200)
  issueProductionMaterials(@Param('code') code: string) {
    return this.warehouseService.issueProductionMaterials(code);
  }

  // GET lịch sử NVL của lệnh sản xuất
  @RequirePermissions("integration:pending")
  @Get('production-orders/:code/material-movements')
  getMaterialMovements(@Param('code') code: string) {
    return this.warehouseService.getMaterialMovements(code);
  }

  // POST hủy lệnh sản xuất
  @RequirePermissions("integration:pending")
  @Post('production-orders/:code/cancel')
  @HttpCode(200)
  cancelProductionOrder(@Param('code') code: string) {
    return this.warehouseService.cancelProductionOrder(code);
  }

  // GET tiến độ lệnh sản xuất
  @RequirePermissions("integration:pending")
  @Get('production-orders/:code/progress')
  getProductionOrderProgress(@Param('code') code: string) {
    return this.warehouseService.getProductionOrderProgress(code);
  }
  // POST giao lệnh sản xuất cho nhân viên
  @RequirePermissions("integration:pending")
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
  @RequirePermissions("integration:pending")
  @Post('production-orders/:code/start')
  @HttpCode(200)
  startProductionOrder(@Param('code') code: string) {
    return this.warehouseService.startProductionOrder(code);
  }

  @RequirePermissions("integration:pending")
  @Post('production-orders/:code/finished-goods')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  reportFinishedGoods(@Param('code') code: string, @Body() dto: ReportFinishedGoodsDto) {
    return this.warehouseService.reportFinishedGoods(code, dto);
  }

  // GET /warehouse/finished-goods-receipts
  @RequirePermissions("integration:pending")
  @Get('finished-goods-receipts')
  getFinishedGoodsReceipts(@Query('status') status?: string) {
    return this.warehouseService.getFinishedGoodsReceipts(status);
  }

  //Duyệt nhập thành phẩm
  @RequirePermissions("integration:pending")
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
  @RequirePermissions("integration:pending")
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
  @RequirePermissions("product:view", "finished-goods:approve-export")
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

  // GET /warehouse/finished-goods-inventory/:productCode?branchCode=BR001
  @Get('finished-goods-inventory/:productCode')
  getFinishedGoodsInventoryDetail(
    @Param('productCode') productCode: string,
    @Query('branchCode') branchCode: string,
  ) {
    return this.warehouseService.getFinishedGoodsInventoryDetail(
      productCode,
      branchCode,
    );
  }

  // GET /warehouse/finished-goods-receipts/:code
  @RequirePermissions("integration:pending")
  @Get('finished-goods-receipts/:code')
  getFinishedGoodsReceiptByCode(@Param('code') code: string) {
    return this.warehouseService.getFinishedGoodsReceiptByCode(code);
  }

  // GET /warehouse/finished-goods-movements
  @RequirePermissions("product:view", "finished-goods:approve-export")
  @Get('finished-goods-movements')
  getFinishedGoodsMovements() {
    return this.warehouseService.getFinishedGoodsMovements();
  }

  @RequirePermissions("finished-goods:approve-export")
  @Get('finished-goods-issues')
  getFinishedGoodsIssues(@Query('status') status?: string, @Query('shiftCode') shiftCode?: string) {
    return this.warehouseService.getFinishedGoodsIssues(status, shiftCode);
  }

  @RequirePermissions("finished-goods:approve-export")
  @Get('finished-goods-issue-branches')
  getFinishedGoodsIssueBranches() {
    return this.warehouseService.getFinishedGoodsIssueBranches();
  }

  @RequirePermissions("finished-goods:request-export")
  @Post('finished-goods-issues')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createFinishedGoodsIssue(@Body() dto: CreateFinishedGoodsIssueDto) {
    return this.warehouseService.createFinishedGoodsIssue(dto);
  }

  @RequirePermissions("finished-goods:approve-export")
  @Post('finished-goods-issues/:code/approve')
  @HttpCode(200)
  approveFinishedGoodsIssue(@Param('code') code: string, @Body() body: { quantities?: Record<string, string> }) {
    return this.warehouseService.approveFinishedGoodsIssue(code, body?.quantities);
  }

  @RequirePermissions("finished-goods:approve-export")
  @Post('finished-goods-issues/:code/reject')
  @HttpCode(200)
  rejectFinishedGoodsIssue(@Param('code') code: string, @Body() body: { reason: string }) {
    return this.warehouseService.rejectFinishedGoodsIssue(code, body?.reason ?? '');
  }

  @RequirePermissions("integration:pending")
  @Get('finished-goods-defects')
  getFinishedGoodsDefects(@Query('status') status?: string) {
    return this.warehouseService.getFinishedGoodsDefects(status);
  }

  @RequirePermissions("integration:pending")
  @Post('finished-goods-defects')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createFinishedGoodsDefect(@Body() dto: CreateFinishedGoodsDefectDto) {
    return this.warehouseService.createFinishedGoodsDefect(dto);
  }

  @RequirePermissions("integration:pending")
  @Post('finished-goods-defects/:code/approve')
  @HttpCode(200)
  approveFinishedGoodsDefect(@Param('code') code: string) {
    return this.warehouseService.approveFinishedGoodsDefect(code);
  }

  @RequirePermissions("integration:pending")
  @Post('finished-goods-defects/:code/reject')
  @HttpCode(200)
  rejectFinishedGoodsDefect(@Param('code') code: string, @Body() body: { reason: string }) {
    return this.warehouseService.rejectFinishedGoodsDefect(code, body?.reason ?? '');
  }

  // GET /warehouse/inventory-movements
  @RequirePermissions("inventory:view")
  @Get('inventory-movements')
  getInventoryMovements() {
    return this.warehouseService.getInventoryMovements();
  }

  // GET /warehouse/waste-requests?status=PENDING
  @RequirePermissions("integration:pending")
  @Get('waste-requests')
  getWasteRequests(@Query('status') status?: string) {
    return this.warehouseService.getWasteRequests(status);
  }

  // GET /warehouse/waste-requests/:code
  @Get('waste-requests/:code')
  getWasteRequestByCode(@Param('code') code: string) {
    return this.warehouseService.getWasteRequestByCode(code);
  }

  // POST /warehouse/waste-requests/:code/approve
  @RequirePermissions("integration:pending")
  @Post('waste-requests/:code/approve')
  @HttpCode(200)
  approveWasteRequest(@Param('code') code: string) {
    return this.warehouseService.approveWasteRequest(code);
  }

  // POST /warehouse/waste-requests/:code/reject
  @RequirePermissions("integration:pending")
  @Post('waste-requests/:code/reject')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  rejectWasteRequest(@Param('code') code: string, @Body() dto: RejectWasteDto) {
    return this.warehouseService.rejectWasteRequest(code, dto);
  }
}

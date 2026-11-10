import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { InventoryService } from './inventory.service.js';
import { StockInsightsService } from './stock-insights.service.js';
type AuthRequest = Request & { catalogUser: AdminUser };
@Controller('api/warehouse')
@UseGuards(CatalogGuard)
export class InventoryController {
  constructor(private readonly service: InventoryService, private readonly insights: StockInsightsService) {}
  private allow(req: AuthRequest, ...codes: string[]) {
    if (!req.catalogUser.permissions.includes('*') && !codes.some(code => req.catalogUser.permissions.includes(code))) throw new ForbiddenException('Bạn chưa được cấp quyền chức năng này');
  }
  @Get('receipts/references') references(@Req() req: AuthRequest) { this.allow(req, 'receipt:create'); return this.service.references(); }
  @Get('receipts') list(@Req() req: AuthRequest) { this.allow(req, 'receipt:create', 'receipt:post'); return this.service.list(); }
  @Post('receipts') create(@Body() b: unknown, @Req() req: AuthRequest) { this.allow(req, 'receipt:create'); return this.service.save(b, req.catalogUser); }
  @Put('receipts/:id') update(@Param('id') id: string, @Body() b: unknown, @Req() req: AuthRequest) { this.allow(req, 'receipt:create'); return this.service.save(b, req.catalogUser, id); }
  @Delete('receipts/:id') remove(@Param('id') id: string, @Req() req: AuthRequest) { this.allow(req, 'receipt:create'); return this.service.remove(id, req.catalogUser); }
  @Post('receipts/:id/post') post(@Param('id') id: string, @Req() req: AuthRequest) { this.allow(req, 'receipt:post'); return this.service.post(id); }
  @Get('inventory') stock(@Req() req: AuthRequest) { this.allow(req, 'inventory:view'); return this.service.stock(); }
  @Post('inventory/lots/:id/discard') discard(@Param('id') id: string, @Body() b: unknown, @Req() req: AuthRequest) { this.allow(req, 'waste:approve'); return this.service.discardLot(id, b, req.catalogUser); }
  @Put('inventory/:id/minimum') minimum(@Param('id') id: string, @Body() b: unknown, @Req() req: AuthRequest) { this.allow(req, 'catalog:manage'); return this.service.setMinimum(id, b); }
  @Get('stock-insights') insightsList(@Query('kind') kind: string, @Req() req: AuthRequest) { this.allow(req, 'inventory:view'); return this.insights.read(kind); }
  @Get('inventory/:id/lots') lots(@Param('id') id: string, @Req() req: AuthRequest) { this.allow(req, 'inventory:view'); return this.service.lots(id); }
}

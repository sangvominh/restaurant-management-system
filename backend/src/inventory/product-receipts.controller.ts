import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { ProductReceiptsService } from './product-receipts.service.js';
type R = Request & { catalogUser: AdminUser };
@Controller('api/warehouse')
@UseGuards(CatalogGuard)
export class ProductReceiptsController {
  constructor(private readonly service: ProductReceiptsService) {}
  private allow(r: R, ...rights: string[]) { if (!r.catalogUser.permissions.includes('*') && !rights.some(p => r.catalogUser.permissions.includes(p))) throw new ForbiddenException('Chưa có quyền chức năng này'); }
  @Get('product-receipts/references') references(@Req() r: R) { this.allow(r, 'receipt:create'); return this.service.references(); }
  @Get('product-receipts') list(@Req() r: R) { this.allow(r, 'receipt:create', 'receipt:post'); return this.service.list(); }
  @Post('product-receipts') create(@Body() b: unknown, @Req() r: R) { this.allow(r, 'receipt:create'); return this.service.save(b, r.catalogUser); }
  @Put('product-receipts/:id') update(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { this.allow(r, 'receipt:create'); return this.service.save(b, r.catalogUser, id); }
  @Delete('product-receipts/:id') remove(@Param('id') id: string, @Req() r: R) { this.allow(r, 'receipt:create'); return this.service.remove(id, r.catalogUser); }
  @Post('product-receipts/:id/post') post(@Param('id') id: string, @Req() r: R) { this.allow(r, 'receipt:post'); return this.service.post(id, r.catalogUser); }
  @Get('product-lots/:productId') lots(@Param('productId') id: string, @Req() r: R) { this.allow(r, 'inventory:view', 'export:request', 'export:approve'); return this.service.lots(id); }
  @Post('product-lots/:id/discard') discard(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { this.allow(r, 'waste:approve'); return this.service.discard(id, b, r.catalogUser); }
}


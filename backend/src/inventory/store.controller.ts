import { Body, Controller, ForbiddenException, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { StoreService } from './store.service.js';
type R = Request & { catalogUser: AdminUser };
@Controller(['api/warehouse/store', 'api/restaurant/store'])
@UseGuards(CatalogGuard)
export class StoreController {
  constructor(private readonly service: StoreService) {}
  private allow(r: R, ...codes: string[]) { if (!r.catalogUser.permissions.includes('*') && !codes.some(c => r.catalogUser.permissions.includes(c))) throw new ForbiddenException('Chưa có quyền chức năng này'); }
  @Get('dispatches') dispatches(@Req() r: R) { this.allow(r, 'store:manage'); return this.service.list(); }
  @Get('stock') stock(@Req() r: R) { this.allow(r, 'inventory:view', 'sale:view', 'store:manage', 'report:stock'); return this.service.stock(); }
  @Get('adjustments') list(@Req() r: R) { this.allow(r, 'store:manage', 'export:approve'); return this.service.adjustments(); }
  @Post('adjustments') create(@Body() b: unknown, @Req() r: R) { this.allow(r, 'store:manage'); return this.service.adjust(b, r.catalogUser); }
  @Post('adjustments/:id/:action') review(@Param('id') id: string, @Param('action') action: string, @Req() r: R) { this.allow(r, 'export:approve'); if (!['approve', 'reject'].includes(action)) throw new ForbiddenException('Thao tác không hợp lệ'); return this.service.reviewAdjustment(id, action === 'approve', r.catalogUser); }
}

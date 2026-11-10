import { Body, Controller, ForbiddenException, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { FinishedService } from './finished.service.js';
import { WarehouseReportService } from './warehouse-report.service.js';
type R = Request & { catalogUser: AdminUser };
@Controller('api/warehouse')
@UseGuards(CatalogGuard)
export class FinishedController {
  constructor(private readonly service: FinishedService, private readonly reports: WarehouseReportService) {}
  private allow(r: R, ...rights: string[]) { if (!r.catalogUser.permissions.includes('*') && !rights.some(p => r.catalogUser.permissions.includes(p))) throw new ForbiddenException('Chưa có quyền chức năng này'); }
  @Get('exports') list(@Req() r: R) { this.allow(r, 'export:request', 'export:approve'); return this.service.list(); }
  @Get('exports/sales') sales(@Req() r: R) { this.allow(r, 'export:request'); return this.service.sales(); }
  @Post('exports') create(@Body() b: unknown, @Req() r: R) { this.allow(r, 'export:request'); return this.service.create(b, r.catalogUser); }
  @Post('exports/:id/approve') approve(@Param('id') id: string, @Req() r: R) { this.allow(r, 'export:approve'); return this.service.review(id, true, r.catalogUser); }
  @Post('exports/:id/reject') reject(@Param('id') id: string, @Req() r: R) { this.allow(r, 'export:approve'); return this.service.review(id, false, r.catalogUser); }
  @Get('finished-stock') stock(@Req() r: R) { this.allow(r, 'inventory:view'); return this.service.report('products'); }
  @Get('warehouse-report') analytics(@Query('start') start: string, @Query('end') end: string, @Query('horizon') horizon: string, @Req() r: R) { this.allow(r, 'report:stock'); return this.reports.read(start, end, horizon); }
  @Get('stock-report') report(@Query('kind') kind: string, @Query('start') start: string, @Query('end') end: string, @Req() r: R) { this.allow(r, 'report:stock'); if (!start || !end) throw new ForbiddenException('Cần chọn kỳ báo cáo'); return this.service.report(kind, start, end); }
}

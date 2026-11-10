import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { ProductionService } from './production.service.js';
import { ExecutionService } from './execution.service.js';
import { ShortageService } from './shortage.service.js';
type AuthRequest = Request & { catalogUser: AdminUser };
@Controller('api/warehouse/production')
@UseGuards(CatalogGuard)
export class ProductionController {
  constructor(private readonly service: ProductionService, private readonly execution: ExecutionService, private readonly shortages: ShortageService) {}
  private allow(req: AuthRequest, ...codes: string[]) {
    if (!req.catalogUser.permissions.includes('*') && !codes.some(c => req.catalogUser.permissions.includes(c))) throw new ForbiddenException('Bạn chưa được cấp quyền chức năng này');
  }
  @Get('references') references(@Req() r: AuthRequest) { this.allow(r, 'bom:manage', 'production:manage'); return this.service.references(); }
  @Get('material-shortages') shortageList(@Req() r: AuthRequest) { return this.shortages.list(r.catalogUser); }
  @Post('material-shortages') reportShortage(@Body() b: unknown, @Req() r: AuthRequest) { return this.shortages.save(b, r.catalogUser); }
  @Put('material-shortages/:id') reviewShortage(@Param('id') id: string, @Body() b: unknown, @Req() r: AuthRequest) { return this.shortages.save(b, r.catalogUser, id); }
  @Get('boms') boms(@Req() r: AuthRequest) { this.allow(r, 'bom:manage', 'production:manage'); return this.service.boms(); }
  @Post('boms') createBom(@Body() b: unknown, @Req() r: AuthRequest) { this.allow(r, 'bom:manage'); return this.service.saveBom(b, r.catalogUser); }
  @Put('boms/:id') updateBom(@Param('id') id: string, @Body() b: unknown, @Req() r: AuthRequest) { this.allow(r, 'bom:manage'); return this.service.saveBom(b, r.catalogUser, id); }
  @Delete('boms/:id') deleteBom(@Param('id') id: string, @Req() r: AuthRequest) { this.allow(r, 'bom:manage'); return this.service.bomAction(id, 'delete'); }
  @Post('boms/:id/activate') activate(@Param('id') id: string, @Req() r: AuthRequest) { this.allow(r, 'bom:manage'); return this.service.bomAction(id, 'activate'); }
  @Post('replenishments/:id/reject') rejectReplenishment(@Param('id') id: string, @Body() b: unknown, @Req() r: AuthRequest) { this.allow(r, 'production:manage'); return this.service.rejectReplenishment(id, b); }
  @Get('replenishments') replenishments(@Req() r: AuthRequest) { this.allow(r, 'production:manage'); return this.service.replenishments(); }
  @Get('orders') orders(@Req() r: AuthRequest) { this.allow(r, 'production:manage', 'production:perform', 'material:approve', 'production:inspect', 'waste:approve'); return this.service.orders(r.catalogUser); }
  @Get('orders/:id/execution') detail(@Param('id') id: string, @Req() r: AuthRequest) { return this.execution.detail(id, r.catalogUser); }
  @Post('orders/:id/execution') execute(@Param('id') id: string, @Body() b: unknown, @Req() r: AuthRequest) { return this.execution.act(id, b, r.catalogUser); }
  @Post('orders') createOrder(@Body() b: unknown, @Req() r: AuthRequest) { this.allow(r, 'production:manage'); return this.service.createOrder(b, r.catalogUser); }
  @Post('orders/:id/receive') receive(@Param('id') id: string, @Req() r: AuthRequest) { this.allow(r, 'production:perform'); return this.service.orderAction(id, 'receive', r.catalogUser); }
  @Post('orders/:id/cancel') cancel(@Param('id') id: string, @Req() r: AuthRequest) { this.allow(r, 'production:manage'); return this.service.orderAction(id, 'cancel', r.catalogUser); }
}

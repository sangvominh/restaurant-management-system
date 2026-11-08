import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { ProductionService } from './production.service.js';
type AuthRequest = Request & { catalogUser: AdminUser };
@Controller('api/warehouse/production')
@UseGuards(CatalogGuard)
export class ProductionController {
  constructor(private readonly service: ProductionService) {}
  private allow(req: AuthRequest, ...codes: string[]) {
    if (!req.catalogUser.permissions.includes('*') && !codes.some(c => req.catalogUser.permissions.includes(c))) throw new ForbiddenException('Bạn chưa được cấp quyền chức năng này');
  }
  @Get('references') references(@Req() r: AuthRequest) { this.allow(r, 'bom:manage', 'production:manage'); return this.service.references(); }
  @Get('boms') boms(@Req() r: AuthRequest) { this.allow(r, 'bom:manage', 'production:manage'); return this.service.boms(); }
  @Post('boms') createBom(@Body() b: unknown, @Req() r: AuthRequest) { this.allow(r, 'bom:manage'); return this.service.saveBom(b, r.catalogUser); }
  @Put('boms/:id') updateBom(@Param('id') id: string, @Body() b: unknown, @Req() r: AuthRequest) { this.allow(r, 'bom:manage'); return this.service.saveBom(b, r.catalogUser, id); }
  @Delete('boms/:id') deleteBom(@Param('id') id: string, @Req() r: AuthRequest) { this.allow(r, 'bom:manage'); return this.service.bomAction(id, 'delete'); }
  @Post('boms/:id/activate') activate(@Param('id') id: string, @Req() r: AuthRequest) { this.allow(r, 'bom:manage'); return this.service.bomAction(id, 'activate'); }
  @Get('orders') orders(@Req() r: AuthRequest) { this.allow(r, 'production:manage', 'production:perform'); return this.service.orders(r.catalogUser); }
  @Post('orders') createOrder(@Body() b: unknown, @Req() r: AuthRequest) { this.allow(r, 'production:manage'); return this.service.createOrder(b, r.catalogUser); }
  @Post('orders/:id/receive') receive(@Param('id') id: string, @Req() r: AuthRequest) { this.allow(r, 'production:perform'); return this.service.orderAction(id, 'receive', r.catalogUser); }
  @Post('orders/:id/cancel') cancel(@Param('id') id: string, @Req() r: AuthRequest) { this.allow(r, 'production:manage'); return this.service.orderAction(id, 'cancel', r.catalogUser); }
}

import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AdminAuthService, type AdminUser } from '../admin/admin-auth.service.js';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { FinishedService } from '../inventory/finished.service.js';
import { SalesService } from './sales.service.js';
type R = Request & { catalogUser: AdminUser; catalogToken: string };
const rights = ['sale:view', 'sale:create', 'export:request', 'payment:create', 'sale:prepare'];
function allow(r: R, codes = rights) { if (!r.catalogUser.permissions.includes('*') && !codes.some(c => r.catalogUser.permissions.includes(c))) throw new ForbiddenException('Chưa có quyền bán hàng'); }
@Controller('api/restaurant/auth')
export class RestaurantAuthController {
  constructor(private readonly auth: AdminAuthService) {}
  @Post('login') @HttpCode(200) login(@Body() b: unknown) { return this.auth.login(b, false, 'sales'); }
  @Get('me') @UseGuards(CatalogGuard) me(@Req() r: R) { allow(r); return r.catalogUser; }
  @Post('logout') @HttpCode(200) @UseGuards(CatalogGuard) logout(@Req() r: R) { return this.auth.logout(r.catalogToken); }
}
@Controller('api/restaurant')
@UseGuards(CatalogGuard)
export class SalesController {
  constructor(private readonly service: SalesService, private readonly finished: FinishedService) {}
  @Post('sales/:id/ready') ready(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:prepare']); return this.service.ready(id, b, r.catalogUser); }
  @Put('areas/:name') updateArea(@Param('name') name: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.saveArea(b, name); }
  @Delete('areas/:name') deleteArea(@Param('name') name: string, @Req() r: R) { allow(r, ['sale:create']); return this.service.deleteArea(name); }
  @Delete('tables/:id') deleteTable(@Param('id') id: string, @Req() r: R) { allow(r, ['sale:create']); return this.service.deleteTable(id); }
  @Get('products') products(@Req() r: R) { allow(r); return this.service.products(); }
  @Post('sales/:id/change-line') changeLine(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.changeLine(id, b, r.catalogUser); }
  @Post('sales/:id/serve') serve(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.serve(id, b, r.catalogUser); }
  @Post('sales/:id/replenish') replenish(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['production:request']); return this.service.replenish(id, b, r.catalogUser); }
  @Get('areas') areas(@Req() r: R) { allow(r); return this.service.areas(); }
  @Post('areas') area(@Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.saveArea(b); }
  @Get('tables') tables(@Req() r: R) { allow(r); return this.service.tables(); }
  @Post('tables') createTable(@Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.saveTable(b); }
  @Put('tables/:id') updateTable(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.saveTable(b, id); }
  @Post('sales/:id/send') send(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.send(id, b, r.catalogUser); }
  @Get('sales') list(@Req() r: R) { allow(r); return this.service.list(); }
  @Post('sales') create(@Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.save(b, r.catalogUser); }
  @Put('sales/:id') update(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.save(b, r.catalogUser, id); }
  @Post('sales/:id/confirm') confirm(@Param('id') id: string, @Req() r: R) { allow(r, ['sale:create']); return this.service.action(id, 'confirm', {}, r.catalogUser); }
  @Post('sales/:id/cancel') cancel(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.action(id, 'cancel', b, r.catalogUser); }
  @Post('sales/:id/pay') pay(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['payment:create']); return this.service.action(id, 'pay', b, r.catalogUser); }
  @Post('exports') request(@Body() b: unknown, @Req() r: R) { allow(r, ['export:request']); return this.finished.create(b, r.catalogUser); }
}

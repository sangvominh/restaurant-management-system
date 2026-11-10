import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AdminAuthService, type AdminUser } from '../admin/admin-auth.service.js';
import { CatalogGuard } from '../catalog/catalog.guard.js';
import { SalesService } from './sales.service.js';
type R = Request & { catalogUser: AdminUser; catalogToken: string };
const rights = ['sale:view', 'sale:create', 'payment:create', 'store:manage', 'product:price', 'dining:manage', 'report:sales'];
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
  constructor(private readonly service: SalesService) {}
  @Put('areas/:name') updateArea(@Param('name') name: string, @Body() b: unknown, @Req() r: R) { allow(r, ['dining:manage']); return this.service.saveArea(b, name); }
  @Delete('areas/:name') deleteArea(@Param('name') name: string, @Req() r: R) { allow(r, ['dining:manage']); return this.service.deleteArea(name); }
  @Delete('tables/:id') deleteTable(@Param('id') id: string, @Req() r: R) { allow(r, ['dining:manage']); return this.service.deleteTable(id); }
  @Get('reports/sales') report(@Query('month') month: string, @Req() r: R) { allow(r, ['report:sales']); return this.service.salesReport(month); }
  @Put('products/:id/price') price(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['product:price', 'product:manage']); return this.service.setPrice(id, b); }
  @Get('products') products(@Req() r: R) { allow(r); return this.service.products(); }
  @Post('sales/:id/change-line') changeLine(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.changeLine(id, b, r.catalogUser); }
  @Get('areas') areas(@Req() r: R) { allow(r); return this.service.areas(); }
  @Post('areas') area(@Body() b: unknown, @Req() r: R) { allow(r, ['dining:manage']); return this.service.saveArea(b); }
  @Get('tables') tables(@Req() r: R) { allow(r); return this.service.tables(); }
  @Post('tables') createTable(@Body() b: unknown, @Req() r: R) { allow(r, ['dining:manage']); return this.service.saveTable(b); }
  @Put('tables/:id') updateTable(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['dining:manage']); return this.service.saveTable(b, id); }
  @Post('sales/:id/send') send(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.send(id, b, r.catalogUser); }
  @Get('sales') list(@Req() r: R) { allow(r); return this.service.list(); }
  @Post('sales') create(@Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.save(b, r.catalogUser); }
  @Put('sales/:id') update(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.save(b, r.catalogUser, id); }
  @Post('sales/:id/confirm') confirm(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.send(id, b, r.catalogUser); }
  @Post('sales/:id/cancel') cancel(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['sale:create']); return this.service.action(id, 'cancel', b, r.catalogUser); }
  @Post('sales/:id/pay') pay(@Param('id') id: string, @Body() b: unknown, @Req() r: R) { allow(r, ['payment:create']); return this.service.action(id, 'pay', b, r.catalogUser); }
}

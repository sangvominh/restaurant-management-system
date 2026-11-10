import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import type { Request } from 'express';
import { AdminAuthService, type AdminUser } from '../admin/admin-auth.service.js';
import { CatalogGuard } from './catalog.guard.js';
import { CatalogService, kind, type CatalogKind } from './catalog.service.js';
type CatalogRequest = Request & { catalogUser: AdminUser; catalogToken: string };
const readRights: Record<CatalogKind, string[]> = {
  units: ['catalog:manage', 'inventory:view', 'product:manage', 'production:perform'],
  categories: ['catalog:manage', 'inventory:view', 'product:manage', 'production:perform'],
  materials: ['catalog:manage', 'inventory:view', 'production:perform'],
  suppliers: ['catalog:manage', 'receipt:create'],
  products: ['catalog:manage', 'inventory:view', 'product:manage', 'production:perform', 'sale:view'],
};
@Controller('api/warehouse/auth')
export class WarehouseAuthController {
  constructor(private readonly auth: AdminAuthService) {}
  @Post('login') @HttpCode(200) login(@Body() b: unknown) { return this.auth.login(b, false); }
  @Get('me') @UseGuards(CatalogGuard) me(@Req() req: CatalogRequest) { return req.catalogUser; }
  @Post('logout') @HttpCode(200) @UseGuards(CatalogGuard) logout(@Req() req: CatalogRequest) { return this.auth.logout(req.catalogToken); }
}
@Controller('api/warehouse/catalog')
@UseGuards(CatalogGuard)
export class CatalogController {
  constructor(private readonly service: CatalogService) {}
  private allow(user: AdminUser, codes: string[]) {
    if (!user.permissions.includes('*') && !codes.some(code => user.permissions.includes(code))) throw new ForbiddenException('Bạn chưa được cấp quyền chức năng này');
  }
  @Get(':type') list(@Param('type') value: string, @Req() req: CatalogRequest) {
    const type = kind(value); this.allow(req.catalogUser, readRights[type]); return this.service.presentation(type);
  }
  @Post(':type') create(@Param('type') value: string, @Body() b: unknown, @Req() req: CatalogRequest) {
    const type = kind(value); this.allow(req.catalogUser, type === 'products' ? ['catalog:manage', 'product:manage'] : ['catalog:manage']); return this.service.save(type, b);
  }
  @Put(':type/:id') update(@Param('type') value: string, @Param('id') id: string, @Body() b: unknown, @Req() req: CatalogRequest) {
    const type = kind(value); this.allow(req.catalogUser, type === 'products' ? ['catalog:manage', 'product:manage'] : ['catalog:manage']); return this.service.save(type, b, id);
  }
  @Delete(':type/:id') remove(@Param('type') value: string, @Param('id') id: string, @Req() req: CatalogRequest) {
    const type = kind(value); this.allow(req.catalogUser, type === 'products' ? ['catalog:manage', 'product:manage'] : ['catalog:manage']); return this.service.remove(type, id);
  }
}

import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AdminAuthService, type AdminUser } from './admin-auth.service.js';
import { AdminAuthGuard, AdminToken, CurrentAdmin } from './admin-auth.guard.js';
@Controller('api/admin/auth')
export class AdminAuthController {
  constructor(private readonly auth: AdminAuthService) {}
  @Post('login') @HttpCode(200) login(@Body() b: unknown) { return this.auth.login(b); }
  @Get('me') @UseGuards(AdminAuthGuard) me(@CurrentAdmin() user: AdminUser) { return user; }
  @Post('logout') @HttpCode(200) @UseGuards(AdminAuthGuard)
  logout(@AdminToken() token: string) { return this.auth.logout(token); }
}

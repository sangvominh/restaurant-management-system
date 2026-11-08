import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { AdminAuthGuard, CurrentAdmin } from './admin-auth.guard.js';
import type { AdminUser } from './admin-auth.service.js';

@UseGuards(AdminAuthGuard)
@Controller('api/admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}
  @Get('accounts') accounts() { return this.service.accounts(); }
  @Post('accounts') createAccount(@Body() b: unknown) { return this.service.saveAccount(b); }
  @Put('accounts/:id') updateAccount(@Param('id') id: string, @Body() b: unknown, @CurrentAdmin() user: AdminUser) { return this.service.saveAccount(b, id, user.id); }
  @Delete('accounts/:id') deleteAccount(@Param('id') id: string, @CurrentAdmin() user: AdminUser) { return this.service.deleteAccount(id, user.id); }
  @Get('roles') roles() { return this.service.roles(); }
  @Post('roles') createRole(@Body() b: unknown) { return this.service.saveRole(b); }
  @Put('roles/:id') updateRole(@Param('id') id: string, @Body() b: unknown) { return this.service.saveRole(b, id); }
  @Delete('roles/:id') deleteRole(@Param('id') id: string) { return this.service.deleteRole(id); }
  @Get('permissions') permissions() { return this.service.permissions(); }
  @Get('employees') employees() { return this.service.employees(); }
  @Post('employees') createEmployee(@Body() b: unknown) { return this.service.saveEmployee(b); }
  @Put('employees/:id') updateEmployee(@Param('id') id: string, @Body() b: unknown, @CurrentAdmin() user: AdminUser) { return this.service.saveEmployee(b, id, user.id); }
  @Delete('employees/:id') deleteEmployee(@Param('id') id: string) { return this.service.deleteEmployee(id); }
}

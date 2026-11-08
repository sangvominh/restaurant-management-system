import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service.js';

// Chưa bật xác thực theo phạm vi giai đoạn hiện tại.
@Controller('api/admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}
  @Get('accounts') accounts() { return this.service.accounts(); }
  @Post('accounts') createAccount(@Body() b: unknown) { return this.service.saveAccount(b); }
  @Put('accounts/:id') updateAccount(@Param('id') id: string, @Body() b: unknown) { return this.service.saveAccount(b, id); }
  @Delete('accounts/:id') deleteAccount(@Param('id') id: string) { return this.service.deleteAccount(id); }
  @Get('roles') roles() { return this.service.roles(); }
  @Post('roles') createRole(@Body() b: unknown) { return this.service.saveRole(b); }
  @Put('roles/:id') updateRole(@Param('id') id: string, @Body() b: unknown) { return this.service.saveRole(b, id); }
  @Delete('roles/:id') deleteRole(@Param('id') id: string) { return this.service.deleteRole(id); }
  @Get('permissions') permissions() { return this.service.permissions(); }
  @Get('employees') employees() { return this.service.employees(); }
  @Post('employees') createEmployee(@Body() b: unknown) { return this.service.saveEmployee(b); }
  @Put('employees/:id') updateEmployee(@Param('id') id: string, @Body() b: unknown) { return this.service.saveEmployee(b, id); }
  @Delete('employees/:id') deleteEmployee(@Param('id') id: string) { return this.service.deleteEmployee(id); }
}

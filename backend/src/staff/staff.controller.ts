import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, NotImplementedException } from '@nestjs/common';
import { AuthGuard, Roles, type StaffRequest } from '../auth/auth.guard.js';
import { StaffService } from './staff.service.js';
@Controller('api/staff')
@UseGuards(AuthGuard)
export class StaffController {
  constructor(private readonly service: StaffService) {}
  @Get('overview') overview(@Req() r: StaffRequest) { return this.service.overview(r.staff); }
  @Get('tables') tables(@Req() r: StaffRequest) { return this.service.tables(r.staff); }
  @Get('menu') menu(@Req() r: StaffRequest) { return this.service.menu(r.staff); }
  @Get('invoices') invoices(@Req() r: StaffRequest) { return this.service.invoices(r.staff); }
  @Get('invoices/:id') invoice(@Req() r: StaffRequest, @Param('id') id: string) { return this.service.detail(r.staff, id); }
  @Post('invoices') @Roles('SERVICE', 'CASHIER', 'SUPERVISOR') create(@Req() r: StaffRequest, @Body() b: unknown) { return this.service.createInvoice(r.staff, b); }
  @Post('orders') @Roles('SERVICE', 'SUPERVISOR') order(@Req() r: StaffRequest, @Body() b: unknown) { return this.service.addOrder(r.staff, b); }
  @Get('kitchen') kitchen(@Req() r: StaffRequest) { return this.service.kitchen(r.staff); }
  @Get('kitchen/history') @Roles('KITCHEN', 'BARISTA', 'SUPERVISOR') kitchenHistory(@Req() r: StaffRequest) { return this.service.kitchenHistory(r.staff); }
  @Get('lines/:id/material-requirements') @Roles('KITCHEN', 'BARISTA', 'SUPERVISOR') requirements(@Req() r: StaffRequest, @Param('id') id: string) { return this.service.lineRequirements(r.staff, id); }
  @Patch('lines/:id') @Roles('SERVICE', 'KITCHEN', 'BARISTA', 'SUPERVISOR') line(@Req() r: StaffRequest, @Param('id') id: string, @Body() b: unknown) { return this.service.updateLine(r.staff, id, b); }
  @Post('lines/:id/cancel') @Roles('SERVICE', 'SUPERVISOR') cancel(@Req() r: StaffRequest, @Param('id') id: string, @Body() b: unknown) { return this.service.cancelLine(r.staff, id, b); }
  @Post('transfer') @Roles('SERVICE', 'SUPERVISOR') transfer(@Req() r: StaffRequest, @Body() b: unknown) { return this.service.transfer(r.staff, b); }
  @Post('merge') @Roles('SUPERVISOR') merge() { throw new NotImplementedException('Gộp bàn chưa hỗ trợ. Hóa đơn từng khách được giữ nguyên.'); }
  @Post('split') @Roles('CASHIER', 'SUPERVISOR') split() { throw new NotImplementedException('Tách hóa đơn chưa hỗ trợ phân bổ món và làm tròn. Chưa có thay đổi nào được ghi nhận.'); }
  @Post('invoices/:id/pay') @Roles('CASHIER', 'SUPERVISOR') pay(@Req() r: StaffRequest, @Param('id') id: string, @Body() b: unknown) { return this.service.pay(r.staff, id, b); }
  @Get('shifts') shifts(@Req() r: StaffRequest) { return this.service.shifts(r.staff); }
  @Post('shifts/start') start(@Req() r: StaffRequest) { return this.service.startShift(r.staff); }
  @Post('shifts/end') end(@Req() r: StaffRequest, @Body() b: unknown) { return this.service.endShift(r.staff, b); }
}

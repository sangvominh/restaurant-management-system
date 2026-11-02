import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '../generated/prisma/client.js';
import { AuthGuard, Roles, type StaffRequest } from '../auth/auth.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { object, text, uuid } from './input.js';
@Controller('api/staff/material-waste')
@UseGuards(AuthGuard)
@Roles('KITCHEN', 'BARISTA', 'SUPERVISOR')
export class StaffMaterialWasteController {
 constructor(private readonly db: PrismaService) {}
 @Get() async list(@Req() req: StaffRequest) {
  const rows = await this.db.staffMaterialWaste.findMany({ where: { actorId: req.staff.id, branchId: req.staff.branchId }, orderBy: { createdAt: 'desc' }, take: 100 });
  const balances = await this.db.materialBalance.findMany({ where: { id: { in: rows.map(r => r.balanceId) }, location: { branchId: req.staff.branchId } }, include: { materialLot: { include: { material: { include: { unit: true } } } }, location: true } });
  return rows.map(r => { const b = balances.find(x => x.id === r.balanceId); return { ...r, quantity: r.quantity.toString(), name: b?.materialLot.material.name ?? 'Không còn dữ liệu', unit: b?.materialLot.material.unit.name ?? '', lot: b?.materialLot.lotCode ?? '', location: b?.location.name ?? '' }; });
 }
 @Post() async create(@Req() req: StaffRequest, @Body() body: unknown) {
  const input = object(body); const balanceId = uuid(input.balanceId); const reason = text(input.reason, 'Lý do', 1000); const unit = text(input.unit, 'Đơn vị', 50);
  if (typeof input.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(input.quantity)) throw new BadRequestException('Số lượng không hợp lệ.');
  const entered = new Prisma.Decimal(input.quantity); if (entered.lte(0)) throw new BadRequestException('Số lượng phải lớn hơn 0.');
  const balance = await this.db.materialBalance.findFirst({ where: { id: balanceId, location: { branchId: req.staff.branchId } }, include: { materialLot: { include: { material: { include: { unit: true } } } } } });
  if (!balance) throw new BadRequestException('Lô không hợp lệ.');
  const base = balance.materialLot.material.unit.name.trim().toLowerCase();
  const groups: Record<string, Record<string, string>> = { kg: { kg: '1', g: '0.001' }, g: { g: '1', kg: '1000' }, l: { l: '1', ml: '0.001' }, 'lít': { 'lít': '1', ml: '0.001' }, ml: { ml: '1', l: '1000' } };
  const factor = unit.toLowerCase() === base ? '1' : groups[base]?.[unit.toLowerCase()];
  if (!factor) throw new BadRequestException('Đơn vị không phù hợp với nguyên liệu.');
  const quantity = entered.mul(factor);
  if (quantity.decimalPlaces() > 3) throw new BadRequestException('Số lượng sau quy đổi vượt độ chính xác tồn kho.');
  if (quantity.gt(balance.quantity)) throw new BadRequestException('Lô không hợp lệ hoặc số lượng vượt tồn.');
  const result = await this.db.staffMaterialWaste.create({ data: { code: `HH-${randomUUID().replaceAll('-', '').slice(0,12).toUpperCase()}`, actorId: req.staff.id, branchId: req.staff.branchId, balanceId, quantity, reason } });
  return { code: result.code, status: result.status };
 }
}

import { Public } from '../common/auth.decorators.js';
import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '../generated/prisma/client.js';
import { AuthGuard, Roles, type StaffRequest } from '../auth/staff-auth.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { object, text, uuid } from './input.js';
@Public()
@Controller('api/staff/material-waste')
@UseGuards(AuthGuard)
@Roles('KITCHEN', 'BARISTA', 'SUPERVISOR')
export class StaffMaterialWasteController {
 constructor(private readonly db: PrismaService) {}
 @Get() async list(@Req() req: StaffRequest) {
  const rows = await this.db.staffMaterialWaste.findMany({ where: { actorId: req.staff.id, branchId: req.staff.branchId }, orderBy: { createdAt: 'desc' }, take: 100 });
  const balances = await this.db.materialBalance.findMany({ where: { id: { in: rows.map(r => r.balanceId) }, location: { branchId: req.staff.branchId } }, include: { materialLot: { include: { material: { include: { unit: true } } } }, location: true } });
  const kitchenRows = await this.db.$queryRaw<{ id:string; code:string; status:string; name:string; unit:string; lot:string; location:string; quantity:string; reason:string; createdAt:Date; processedAt:Date | null; orderLineId:string }[]>`SELECT w.id, w.code, w.status, m.name, u.name AS unit, l.lot_code AS lot, 'Bếp' AS location, w.quantity::text AS quantity, w.reason, w.created_at AS "createdAt", w.processed_at AS "processedAt", w.order_line_id AS "orderLineId", w.decision_note AS "decisionNote" FROM staff_kitchen_waste w JOIN material_lots l ON l.id=w.material_lot_id JOIN materials m ON m.id=l.material_id JOIN units u ON u.id=m.unit_id WHERE w.actor_id=${req.staff.id}::uuid AND w.branch_id=${req.staff.branchId}::uuid ORDER BY w.created_at DESC LIMIT 100`;
  return [...rows.map(r => { const b = balances.find(x => x.id === r.balanceId); return { ...r, quantity: r.quantity.toString(), name: b?.materialLot.material.name ?? 'Không còn dữ liệu', unit: b?.materialLot.material.unit.name ?? '', lot: b?.materialLot.lotCode ?? '', location: b?.location.name ?? '' }; }), ...kitchenRows].sort((a,b) => b.createdAt.getTime()-a.createdAt.getTime()).slice(0,100);
 }
 @Post('kitchen') async createKitchen(@Req() req: StaffRequest, @Body() body: unknown) {
  const input = object(body); const lotId = uuid(input.lotId); const reason = text(input.reason, 'Lý do', 1000);
  if (typeof input.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(input.quantity)) throw new BadRequestException('Số lượng không hợp lệ.');
  const quantity = new Prisma.Decimal(input.quantity); if (quantity.lte(0)) throw new BadRequestException('Số lượng phải lớn hơn 0.');
  return this.db.$transaction(async tx => {
   const count = await tx.$executeRaw`UPDATE staff_kitchen_balances SET reserved_waste=reserved_waste+${quantity} WHERE branch_id=${req.staff.branchId}::uuid AND material_lot_id=${lotId}::uuid AND quantity-reserved_waste-reserved_return-COALESCE((SELECT SUM(r.quantity) FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id WHERE r.branch_id=${req.staff.branchId}::uuid AND d.material_lot_id=${lotId}::uuid AND r.status='PENDING' AND NOT r.stock_reserved),0) >= ${quantity}`;
   if (count !== 1) throw new BadRequestException('Số lượng vượt tồn bếp hoặc lô không hợp lệ.');
   const code = `HH-${randomUUID().replaceAll('-', '').slice(0,12).toUpperCase()}`;
   await tx.$executeRaw`INSERT INTO staff_kitchen_waste(code,actor_id,branch_id,material_lot_id,quantity,reason,status) VALUES (${code},${req.staff.id}::uuid,${req.staff.branchId}::uuid,${lotId}::uuid,${quantity},${reason},'PENDING')`;
   return { code, status: 'PENDING' };
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
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

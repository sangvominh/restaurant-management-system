import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '../generated/prisma/client.js';
import { AuthGuard, Roles, type StaffRequest } from '../auth/auth.guard.js';
import { isUsableLotExpiry } from '../warehouse/lot-expiry.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { object, uuid, text } from './input.js';
@Controller('api/staff/material-returns')
@UseGuards(AuthGuard)
@Roles('KITCHEN', 'BARISTA', 'SUPERVISOR')
export class StaffMaterialReturnController {
 constructor(private readonly db: PrismaService) {}
 private async source(tx: Prisma.TransactionClient, branchId:string, detailId:string) {
  const rows=await tx.$queryRaw<{available:Prisma.Decimal; used:Prisma.Decimal; received:Prisma.Decimal}[]>`SELECT s.received,s.available,COALESCE((SELECT sum(a.quantity) FROM staff_kitchen_source_allocations a WHERE a.issue_detail_id=s.issue_detail_id AND a.event_type IN ('ORDER','PRODUCTION','WASTE')),0) AS used FROM staff_kitchen_sources s WHERE s.branch_id=${branchId}::uuid AND s.issue_detail_id=${detailId}::uuid`;
  return rows[0];
 }
 private async owned(user: StaffRequest['staff']) { return this.db.staffAudit.findMany({ where: { actorId: user.id, action: 'MATERIAL_REQUEST' }, select: { targetId: true } }); }
 @Get('eligible') async eligible(@Req() req: StaffRequest) {
  const audits = await this.owned(req.staff);
  const details = await this.db.materialIssueDetail.findMany({ where: { issue: { id: { in: audits.map(x => x.targetId) }, branchId: req.staff.branchId, status: 'APPROVED' } }, include: { issue: true, material: { include: { unit: true } }, materialLot: true, unit: true } });
  const result = await Promise.all(details.filter(d => d.materialLot.status === 'ACTIVE' && isUsableLotExpiry(d.materialLot.expiryDate)).map(async d => {
   const source = await this.source(this.db, req.staff.branchId, d.id);
   if (!source) return null;
   const balances = await this.db.$queryRaw<{available:Prisma.Decimal}[]>`SELECT quantity-reserved_waste-reserved_return AS available FROM staff_kitchen_balances WHERE branch_id=${req.staff.branchId}::uuid AND material_lot_id=${d.materialLotId}::uuid`;
   const pending = await this.db.$queryRaw<{quantity:Prisma.Decimal}[]>`SELECT COALESCE(SUM(r.quantity),0) AS quantity FROM staff_material_returns r JOIN material_issue_details i ON i.id=r.issue_detail_id WHERE r.branch_id=${req.staff.branchId}::uuid AND i.material_lot_id=${d.materialLotId}::uuid AND r.status='PENDING' AND NOT r.stock_reserved`;
   const remaining = Prisma.Decimal.max(Prisma.Decimal.min(source.available, (balances[0]?.available ?? new Prisma.Decimal(0)).minus(pending[0].quantity)), 0);
   return { id: d.id, issueCode: d.issue.issueCode, name: d.material.name, lot: d.materialLot.lotCode, unit: d.material.unit.name, issued: source.received.toString(), usedOrWaste: source.used.toString(), remaining: remaining.toString() };
  }));
  return result.filter((x): x is NonNullable<typeof x> => x !== null && new Prisma.Decimal(x.remaining).gt(0));
 }
 @Get() async list(@Req() req: StaffRequest) {
  const rows = await this.db.staffMaterialReturn.findMany({ where: { actorId: req.staff.id, branchId: req.staff.branchId }, orderBy: { createdAt: 'desc' }, take: 100 });
  const details = await this.db.materialIssueDetail.findMany({ where: { id: { in: rows.map(x => x.issueDetailId) } }, include: { issue: true, material: { include: { unit: true } }, materialLot: true, unit: true } });
  return rows.map(r => { const d = details.find(x => x.id === r.issueDetailId); return { code:r.code, status:r.status, createdAt:r.createdAt, quantity:r.quantity.toString(), note:r.note, condition:r.condition, decisionNote:r.decisionNote, name:d?.material.name, lot:d?.materialLot.lotCode, unit:d?.material.unit.name, issueCode:d?.issue.issueCode }; });
 }
 @Post() async create(@Req() req: StaffRequest, @Body() body: unknown) {
  const input=object(body); const detailId=uuid(input.issueDetailId);
  if (typeof input.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(input.quantity)) throw new BadRequestException('Số lượng không hợp lệ.');
  const quantity=new Prisma.Decimal(input.quantity); if (quantity.lte(0)) throw new BadRequestException('Số lượng phải lớn hơn 0.');
  const note = typeof input.note === 'string' ? input.note.trim().slice(0,1000) : '';
  const condition = text(input.condition, 'Tình trạng', 30);
  if (!['SEALED','OPENED','OTHER'].includes(condition) || input.conditionConfirmed !== true || (condition === 'OTHER' && !note)) throw new BadRequestException('Chọn tình trạng, xác nhận kiểm tra và ghi chú nếu chọn Khác.');
  return this.db.$transaction(async tx => {
   const detail=await tx.materialIssueDetail.findFirst({ where: { id:detailId, issue: { branchId:req.staff.branchId, status:'APPROVED' } }, include: { issue:true, materialLot:true } });
   if (!detail || !await tx.staffAudit.findFirst({ where: { actorId:req.staff.id, action:'MATERIAL_REQUEST', targetId:detail.issueId } })) throw new BadRequestException('Không tìm thấy nguyên liệu đã lĩnh hợp lệ.');
   if (detail.materialLot.status !== 'ACTIVE' || !isUsableLotExpiry(detail.materialLot.expiryDate)) throw new BadRequestException('Lô hết hạn hoặc chưa có hạn không được hoàn trả.');
   const held=await tx.$queryRaw<{available:Prisma.Decimal}[]>`SELECT quantity-reserved_waste-reserved_return AS available FROM staff_kitchen_balances WHERE branch_id=${req.staff.branchId}::uuid AND material_lot_id=${detail.materialLotId}::uuid FOR UPDATE`;
   const pendingLot=await tx.$queryRaw<{quantity:Prisma.Decimal}[]>`SELECT COALESCE(SUM(r.quantity),0) AS quantity FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id WHERE r.branch_id=${req.staff.branchId}::uuid AND d.material_lot_id=${detail.materialLotId}::uuid AND r.status='PENDING' AND NOT r.stock_reserved`;
   if (!held.length || quantity.gt(held[0].available.minus(pendingLot[0].quantity))) throw new BadRequestException('Số lượng vượt tồn bếp khả dụng sau khi giữ hao hụt và hoàn trả chờ xử lý.');
   const source=await this.source(tx, req.staff.branchId, detail.id);
   if (!source || quantity.gt(source.available)) throw new BadRequestException('Số lượng vượt phần còn có thể đề nghị trả.');
   const changed=await tx.$executeRaw`UPDATE staff_kitchen_balances SET reserved_return=reserved_return+${quantity} WHERE branch_id=${req.staff.branchId}::uuid AND material_lot_id=${detail.materialLotId}::uuid AND quantity-reserved_waste-reserved_return >= ${quantity}`;
   if (changed !== 1) throw new BadRequestException('Tồn bếp không đủ để giữ lượng hoàn trả.');
   const result=await tx.staffMaterialReturn.create({ data: { condition, conditionConfirmed:true, stockReserved:true, code:`HT-${randomUUID().replaceAll('-','').slice(0,12).toUpperCase()}`, actorId:req.staff.id, branchId:req.staff.branchId, issueDetailId:detail.id, quantity, note } }); return {code:result.code,status:result.status};
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
 }
}

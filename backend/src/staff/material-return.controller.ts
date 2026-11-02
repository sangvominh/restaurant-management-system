import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '../generated/prisma/client.js';
import { AuthGuard, Roles, type StaffRequest } from '../auth/auth.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { object, uuid } from './input.js';
@Controller('api/staff/material-returns')
@UseGuards(AuthGuard)
@Roles('KITCHEN', 'BARISTA', 'SUPERVISOR')
export class StaffMaterialReturnController {
 constructor(private readonly db: PrismaService) {}
 private async owned(user: StaffRequest['staff']) { return this.db.staffAudit.findMany({ where: { actorId: user.id, action: 'MATERIAL_REQUEST' }, select: { targetId: true } }); }
 @Get('eligible') async eligible(@Req() req: StaffRequest) {
  const audits = await this.owned(req.staff);
  const details = await this.db.materialIssueDetail.findMany({ where: { issue: { id: { in: audits.map(x => x.targetId) }, branchId: req.staff.branchId, status: 'APPROVED' } }, include: { issue: true, material: true, materialLot: true, unit: true } });
  const result = await Promise.all(details.map(async d => { const total = await this.db.staffMaterialReturn.aggregate({ where: { issueDetailId: d.id, status: { in: ['PENDING','APPROVED'] } }, _sum: { quantity: true } }); return { id: d.id, issueCode: d.issue.issueCode, name: d.material.name, lot: d.materialLot.lotCode, unit: d.unit.name, issued: d.quantity.toString(), remaining: d.quantity.minus(total._sum.quantity ?? 0).toString() }; }));
  return result.filter(x => new Prisma.Decimal(x.remaining).gt(0));
 }
 @Get() async list(@Req() req: StaffRequest) {
  const rows = await this.db.staffMaterialReturn.findMany({ where: { actorId: req.staff.id, branchId: req.staff.branchId }, orderBy: { createdAt: 'desc' }, take: 100 });
  const details = await this.db.materialIssueDetail.findMany({ where: { id: { in: rows.map(x => x.issueDetailId) } }, include: { issue: true, material: true, materialLot: true, unit: true } });
  return rows.map(r => { const d = details.find(x => x.id === r.issueDetailId); return { code:r.code, status:r.status, createdAt:r.createdAt, quantity:r.quantity.toString(), note:r.note, name:d?.material.name, lot:d?.materialLot.lotCode, unit:d?.unit.name, issueCode:d?.issue.issueCode }; });
 }
 @Post() async create(@Req() req: StaffRequest, @Body() body: unknown) {
  const input=object(body); const detailId=uuid(input.issueDetailId);
  if (typeof input.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(input.quantity)) throw new BadRequestException('Số lượng không hợp lệ.');
  const quantity=new Prisma.Decimal(input.quantity); if (quantity.lte(0)) throw new BadRequestException('Số lượng phải lớn hơn 0.');
  const note = typeof input.note === 'string' ? input.note.trim().slice(0,1000) : '';
  return this.db.$transaction(async tx => {
   const detail=await tx.materialIssueDetail.findFirst({ where: { id:detailId, issue: { branchId:req.staff.branchId, status:'APPROVED' } }, include: { issue:true } });
   if (!detail || !await tx.staffAudit.findFirst({ where: { actorId:req.staff.id, action:'MATERIAL_REQUEST', targetId:detail.issueId } })) throw new BadRequestException('Không tìm thấy nguyên liệu đã lĩnh hợp lệ.');
   const prior=await tx.staffMaterialReturn.aggregate({ where: { issueDetailId:detail.id, status:{in:['PENDING','APPROVED']} }, _sum:{quantity:true} });
   if (quantity.gt(detail.quantity.minus(prior._sum.quantity ?? 0))) throw new BadRequestException('Số lượng vượt phần còn có thể đề nghị trả.');
   const result=await tx.staffMaterialReturn.create({ data: { code:`HT-${randomUUID().replaceAll('-','').slice(0,12).toUpperCase()}`, actorId:req.staff.id, branchId:req.staff.branchId, issueDetailId:detail.id, quantity, note } }); return {code:result.code,status:result.status};
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
 }
}

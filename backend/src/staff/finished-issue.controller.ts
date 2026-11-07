import { Public } from '../common/auth.decorators.js';
import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '../generated/prisma/client.js';
import { AuthGuard, Roles, type StaffRequest } from '../auth/staff-auth.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { object, text } from './input.js';
@Public()
@Controller('api/staff/finished-issues')
@UseGuards(AuthGuard)
@Roles('KITCHEN', 'BARISTA', 'SUPERVISOR')
export class StaffFinishedIssueController {
 constructor(private readonly db: PrismaService) {}
 @Get('shift-summary') async summary(@Req() req: StaffRequest) {
  const shift = await this.db.staffShift.findFirst({ where: { userId: req.staff.id, endedAt: null } });
  if (!shift) return { active: false, items: [] };
  const receipts = await this.db.finishedGoodsReceipt.findMany({ where: { createdAt: { gte: shift.startedAt }, productionOrder: { branchId: req.staff.branchId, assignedEmployeeCode: req.staff.code } }, include: { productionOrder: { include: { bom: { include: { product: true } } } } } });
  const totals = new Map<string, { code: string; name: string; reported: Prisma.Decimal; accepted: Prisma.Decimal }>();
  for (const r of receipts) { const code = r.productionOrder.bom.productCode; const old = totals.get(code); totals.set(code, { code, name: r.productionOrder.bom.product?.name ?? code, reported: (old?.reported ?? new Prisma.Decimal(0)).plus(r.reportedQuantity), accepted: (old?.accepted ?? new Prisma.Decimal(0)).plus(r.acceptedQuantity ?? 0) }); }
  return { active: true, startedAt: shift.startedAt, items: [...totals.values()].map(x => ({ ...x, reported: x.reported.toString(), accepted: x.accepted.toString() })) };
 }
 @Get('stock') async stock(@Req() req: StaffRequest) {
  const rows = await this.db.finishedGoodsBalance.findMany({ where: { location: { branchId: req.staff.branchId }, quantity: { gt: 0 }, product: { status: 'ACTIVE', ...(req.staff.role === 'BARISTA' ? { category: 'Đồ uống' } : req.staff.role === 'KITCHEN' ? { category: { not: 'Đồ uống' } } : {}) } }, include: { product: true } });
  const grouped = new Map<string, { code: string; name: string; unit: string; quantity: Prisma.Decimal }>();
  for (const row of rows) { if (!row.product) continue; const prev = grouped.get(row.productCode); grouped.set(row.productCode, { code: row.productCode, name: row.product.name, unit: row.product.unit, quantity: (prev?.quantity ?? new Prisma.Decimal(0)).plus(row.quantity) }); }
  const held=await this.db.finishedGoodsDefect.groupBy({by:['productCode'],where:{branchId:req.staff.branchId,status:'PENDING',deductFromStock:true},_sum:{quantity:true}});
  return [...grouped.values()].map(x => ({ ...x, quantity: Prisma.Decimal.max(x.quantity.minus(held.find(h=>h.productCode===x.code)?._sum.quantity ?? 0),0).toString() }));
 }
 @Get() async list(@Req() req: StaffRequest) {
  const audits = await this.db.staffAudit.findMany({ where: { actorId: req.staff.id, action: 'FINISHED_ISSUE_REQUEST' }, select: { targetId: true } });
  const issues = await this.db.finishedGoodsIssue.findMany({ where: { branchId: req.staff.branchId, id: { in: audits.map(a => a.targetId) } }, include: { details: { include: { product: true } } }, orderBy: { createdAt: 'desc' }, take: 100 });
  return issues.map(i => ({ code: i.code, status: i.status, shiftCode: i.shiftCode, createdAt: i.createdAt, note: i.note, details: i.details.map(d => ({ name: d.product.name, quantity: d.requestedQuantity.toString(), approved: d.approvedQuantity?.toString() ?? null })) }));
 }
 @Post() async create(@Req() req: StaffRequest, @Body() body: unknown) {
  const input = object(body); const code = text(input.productCode, 'Mã thành phẩm', 50);
  if (typeof input.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(input.quantity)) throw new BadRequestException('Số lượng không hợp lệ.');
  const quantity = new Prisma.Decimal(input.quantity); if (quantity.lte(0)) throw new BadRequestException('Số lượng phải lớn hơn 0.');
  return this.db.$transaction(async tx => {
   const product = await tx.product.findFirst({ where: { code, status: 'ACTIVE', ...(req.staff.role === 'BARISTA' ? { category: 'Đồ uống' } : req.staff.role === 'KITCHEN' ? { category: { not: 'Đồ uống' } } : {}) } });
   const stock = await tx.finishedGoodsBalance.aggregate({ where: { productCode: code, location: { branchId: req.staff.branchId } }, _sum: { quantity: true } });
   const held=await tx.finishedGoodsDefect.aggregate({where:{branchId:req.staff.branchId,productCode:code,status:'PENDING',deductFromStock:true},_sum:{quantity:true}});
   if (!product || quantity.gt((stock._sum.quantity ?? new Prisma.Decimal(0)).minus(held._sum.quantity ?? 0))) throw new BadRequestException('Thành phẩm không tồn tại hoặc số lượng vượt tồn hiện tại.');
   const shift = await tx.staffShift.findFirst({ where: { userId: req.staff.id, endedAt: null } });
   const issue = await tx.finishedGoodsIssue.create({ data: { code: `PXTP-${randomUUID().replaceAll('-', '').slice(0,12).toUpperCase()}`, branchId: req.staff.branchId, shiftCode: shift?.id ?? 'CHUA-CO-CA', note: `Đề nghị bởi ${req.staff.code}`, details: { create: { productCode: code, requestedQuantity: quantity } } } });
   await tx.staffAudit.create({ data: { actorId: req.staff.id, action: 'FINISHED_ISSUE_REQUEST', targetId: issue.id, detail: issue.code } });
   return { code: issue.code, status: issue.status };
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
 }
}

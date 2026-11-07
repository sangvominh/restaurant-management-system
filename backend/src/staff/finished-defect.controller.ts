import { Public } from '../common/auth.decorators.js';
import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '../generated/prisma/client.js';
import { AuthGuard, Roles, type StaffRequest } from '../auth/staff-auth.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { object, text } from './input.js';
@Public()
@Controller('api/staff/finished-defects')
@UseGuards(AuthGuard)
@Roles('KITCHEN', 'BARISTA', 'SUPERVISOR')
export class StaffFinishedDefectController {
 constructor(private readonly db: PrismaService) {}
 @Get() async list(@Req() req: StaffRequest) {
  const audits = await this.db.staffAudit.findMany({ where: { actorId: req.staff.id, action: 'FINISHED_DEFECT_REQUEST' }, select: { targetId: true } });
  const rows = await this.db.finishedGoodsDefect.findMany({ where: { branchId: req.staff.branchId, id: { in: audits.map(x => x.targetId) } }, include: { product: true }, orderBy: { createdAt: 'desc' } });
  return rows.map(r => ({ code: r.code, name: r.product.name, unit: r.product.unit, quantity: r.quantity.toString(), status: r.status, reason: r.reason, createdAt: r.createdAt }));
 }
 @Post() async create(@Req() req: StaffRequest, @Body() body: unknown) {
  const b = object(body); const productCode = text(b.productCode, 'Thành phẩm', 50); const reason = text(b.reason, 'Lý do', 1000);
  if (typeof b.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(b.quantity)) throw new BadRequestException('Số lượng không hợp lệ.');
  const quantity = new Prisma.Decimal(b.quantity); if (quantity.lte(0)) throw new BadRequestException('Số lượng phải lớn hơn 0.');
  return this.db.$transaction(async tx => {
   const product = await tx.product.findFirst({ where: { code: productCode, status: 'ACTIVE', ...(req.staff.role === 'BARISTA' ? { category: 'Đồ uống' } : req.staff.role === 'KITCHEN' ? { category: { not: 'Đồ uống' } } : {}) } }); const stock = await tx.finishedGoodsBalance.aggregate({ where: { productCode, location: { branchId: req.staff.branchId } }, _sum: { quantity: true } });
   const held=await tx.finishedGoodsDefect.aggregate({where:{branchId:req.staff.branchId,productCode,status:'PENDING',deductFromStock:true},_sum:{quantity:true}});
   if (!product || quantity.gt((stock._sum.quantity ?? new Prisma.Decimal(0)).minus(held._sum.quantity ?? 0))) throw new BadRequestException('Số lượng vượt tồn thành phẩm hiện tại.');
   const defect = await tx.finishedGoodsDefect.create({ data: { code: `TPLOI-${randomUUID().replaceAll('-', '').slice(0,12).toUpperCase()}`, branchId: req.staff.branchId, productCode, quantity, reason, deductFromStock: true } });
   await tx.staffAudit.create({ data: { actorId: req.staff.id, action: 'FINISHED_DEFECT_REQUEST', targetId: defect.id, detail: defect.code } });
   return { code: defect.code, status: defect.status };
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
 }
}

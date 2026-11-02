import { Controller, Get, Post, Param, Req, Body, UseGuards, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { AuthGuard, Roles, type StaffRequest } from '../auth/auth.guard.js';
import { randomUUID } from 'node:crypto';
import { Prisma } from '../generated/prisma/client.js';
import { object, uuid } from './input.js';
import { FinishedGoodsApi } from '../warehouse/api/finished-goods.api.js';
import { PrismaService } from '../prisma/prisma.service.js';
@Controller('api/staff/production-orders')
@UseGuards(AuthGuard)
@Roles('KITCHEN', 'BARISTA', 'SUPERVISOR')
export class StaffProductionController {
  constructor(private readonly db: PrismaService, private readonly finishedGoods: FinishedGoodsApi) {}
  @Get()
  async list(@Req() req: StaffRequest) {
    const orders = await this.db.productionOrder.findMany({ where: { branchId: req.staff.branchId, assignedEmployeeCode: req.staff.code }, include: { bom: { include: { product: true } } }, orderBy: { createdAt: 'desc' } });
    return orders.map(o => ({ code: o.code, productCode: o.bom.productCode, productName: o.bom.product?.name ?? o.bom.productCode, quantity: o.quantity.toString(), status: o.status, materialStatus: o.materialStatus }));
  }
  @Get('menu')
  async menu(@Req() req: StaffRequest) {
    const boms = await this.db.bom.findMany({ where: { status: 'ACTIVE', product: { status: 'ACTIVE', ...(req.staff.role === 'BARISTA' ? { category: 'Đồ uống' } : req.staff.role === 'KITCHEN' ? { category: { not: 'Đồ uống' } } : {}) }, details: { some: {} } }, include: { product: true, details: { include: { material: true, unit: true } } }, orderBy: [{ productCode: 'asc' }, { version: 'desc' }] });
    const seen = new Set<string>();
    return boms.filter(b => { if (seen.has(b.productCode)) return false; seen.add(b.productCode); return true; }).map(b => ({ code: b.code, productCode: b.productCode, name: b.product?.name ?? b.productCode, outputQuantity: b.outputQuantity.toString(), recipe: b.details.map(d => ({ name: d.material.name, quantity: d.quantity.toString(), unit: d.unit.name })) }));
  }
  @Post('requests')
  async createRequest(@Req() req: StaffRequest, @Body() body: unknown) {
    const input = object(body); const bomCode = typeof input.bomCode === 'string' ? input.bomCode.trim() : '';
    if (typeof input.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(input.quantity)) throw new BadRequestException('Số lượng không hợp lệ.');
    const quantity = new Prisma.Decimal(input.quantity); if (quantity.lte(0)) throw new BadRequestException('Số lượng phải lớn hơn 0.');
    const bom = await this.db.bom.findFirst({ where: { code: bomCode, status: 'ACTIVE', product: { status: 'ACTIVE', ...(req.staff.role === 'BARISTA' ? { category: 'Đồ uống' } : req.staff.role === 'KITCHEN' ? { category: { not: 'Đồ uống' } } : {}) }, details: { some: {} } } });
    if (!bom || bom.outputQuantity.lte(0)) throw new BadRequestException('Công thức không khả dụng.');
    const order = await this.db.productionOrder.create({ data: { code: `LSX-${randomUUID().replaceAll('-', '').slice(0,12).toUpperCase()}`, bomId: bom.id, branchId: req.staff.branchId, quantity, productionMode: 'MAKE_TO_STOCK', assignedEmployeeCode: req.staff.code, note: 'Nhân viên đề nghị sản xuất; cần quản lý xác nhận và cấp nguyên liệu.' } });
    return { code: order.code };
  }
  @Get(':code/detail')
  async detail(@Req() req: StaffRequest, @Param('code') code: string) {
    const order = await this.db.productionOrder.findFirst({ where: { code, branchId: req.staff.branchId, assignedEmployeeCode: req.staff.code }, include: { bom: { include: { details: { include: { material: true, unit: true } } } }, inventoryMovements: { include: { materialLot: { include: { material: true } }, location: true } } } });
    if (!order) throw new NotFoundException('Không tìm thấy lệnh được giao.');
    return { code: order.code, recipe: order.bom.details.map(d => ({ name: d.material.name, quantity: d.quantity.toString(), unit: d.unit.name })), outputQuantity: order.bom.outputQuantity.toString(), movements: order.inventoryMovements.map(m => ({ name: m.materialLot.material.name, lot: m.materialLot.lotCode, location: m.location.name, quantity: m.quantityChange.toString() })) };
  }
  @Get('inventory')
  async inventory(@Req() req: StaffRequest) {
    const rows = await this.db.materialBalance.findMany({ where: { location: { branchId: req.staff.branchId }, quantity: { gt: 0 } }, include: { location: true, materialLot: { include: { material: { include: { unit: true } } } } }, orderBy: { materialLot: { material: { name: 'asc' } } } });
    return rows.map(r => ({ id: r.id, code: r.materialLot.material.code, name: r.materialLot.material.name, unit: r.materialLot.material.unit.name, quantity: r.quantity.toString(), lot: r.materialLot.lotCode, expiry: r.materialLot.expiryDate, location: r.location.name, lotStatus: r.materialLot.status }));
  }
  @Get('material-requests')
  async materialRequests(@Req() req: StaffRequest) {
    const audits = await this.db.staffAudit.findMany({ where: { actorId: req.staff.id, action: 'MATERIAL_REQUEST' }, select: { targetId: true }, orderBy: { createdAt: 'desc' }, take: 100 });
    const issues = await this.db.materialIssue.findMany({ where: { id: { in: audits.map(a => a.targetId) }, branchId: req.staff.branchId }, include: { details: { include: { material: true, materialLot: true, unit: true, location: true } } }, orderBy: { createdAt: 'desc' } });
    return issues.map(i => ({ code: i.issueCode, status: i.status, createdAt: i.createdAt, note: i.note, details: i.details.map(d => ({ name: d.material.name, lot: d.materialLot.lotCode, location: d.location.name, quantity: d.quantity.toString(), unit: d.unit.name })) }));
  }
  @Post('material-requests')
  async requestMaterial(@Req() req: StaffRequest, @Body() body: unknown) {
    const input = object(body);
    const entries = Array.isArray(input.items) ? input.items : [input];
    if (!entries.length || entries.length > 50) throw new BadRequestException('Chọn từ 1 đến 50 lô.');
    const parsed = entries.map(entry => { const row = object(entry); const balanceId = uuid(row.balanceId); if (typeof row.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(row.quantity)) throw new BadRequestException('Số lượng không hợp lệ.'); const quantity = new Prisma.Decimal(row.quantity); if (quantity.lte(0)) throw new BadRequestException('Số lượng phải lớn hơn 0.'); return { balanceId, quantity }; });
    if (new Set(parsed.map(x => x.balanceId)).size !== parsed.length) throw new BadRequestException('Mỗi lô chỉ được chọn một lần.');
    return this.db.$transaction(async tx => {
      const details: { materialId: string; materialLotId: string; locationId: string; unitId: string; quantity: Prisma.Decimal }[] = [];
      for (const row of parsed) {
        const balance = await tx.materialBalance.findFirst({ where: { id: row.balanceId, location: { branchId: req.staff.branchId } }, include: { materialLot: { include: { material: { include: { unit: true } } } } } });
        if (!balance || balance.materialLot.status !== 'ACTIVE' || balance.materialLot.material.status !== 'ACTIVE' || balance.materialLot.material.unit.status !== 'ACTIVE') throw new BadRequestException('Lô nguyên liệu không khả dụng.');
        if (row.quantity.gt(balance.quantity)) throw new BadRequestException('Số lượng vượt tồn hiện tại.');
        details.push({ materialId: balance.materialLot.materialId, materialLotId: balance.materialLotId, locationId: balance.locationId, unitId: balance.materialLot.material.unitId, quantity: row.quantity });
      }
      const code = `PX-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
      const issue = await tx.materialIssue.create({ data: { issueCode: code, branchId: req.staff.branchId, note: `Đề nghị bởi ${req.staff.code}`, details: { create: details } } });
      await tx.staffAudit.create({ data: { actorId: req.staff.id, action: 'MATERIAL_REQUEST', targetId: issue.id, detail: code } });
      return { code, status: issue.status };
    });
  }
  @Post(':code/finished-goods')
  async report(@Req() req: StaffRequest, @Param('code') code: string, @Body() body: unknown) {
    const input = object(body);
    if (typeof input.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(input.quantity) || new Prisma.Decimal(input.quantity).lte(0)) throw new BadRequestException('Số lượng không hợp lệ.');
    const order = await this.db.productionOrder.findFirst({ where: { code, branchId: req.staff.branchId, assignedEmployeeCode: req.staff.code } });
    if (!order) throw new NotFoundException('Không tìm thấy lệnh được giao.');
    return this.finishedGoods.reportOutput(code, { reportedQuantity: input.quantity });
  }
  @Post(':code/start')
  async start(@Req() req: StaffRequest, @Param('code') code: string) {
    const order = await this.db.productionOrder.findFirst({ where: { code, branchId: req.staff.branchId, assignedEmployeeCode: req.staff.code } });
    if (!order) throw new NotFoundException('Không tìm thấy lệnh được giao.');
    const result = await this.db.productionOrder.updateMany({ where: { id: order.id, branchId: req.staff.branchId, assignedEmployeeCode: req.staff.code, status: 'PENDING', materialStatus: 'ISSUED', productionMode: { in: ['MAKE_TO_STOCK', 'HYBRID'] } }, data: { status: 'IN_PROGRESS' } });
    if (result.count !== 1) throw new ConflictException('Lệnh chưa đủ điều kiện hoặc đã thay đổi.');
    return { message: 'Đã bắt đầu sản xuất.' };
  }
}

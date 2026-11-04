import { Controller, Get, Post, Param, Req, Body, Query, UseGuards, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
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
    return orders.map(o => ({ code: o.code, productCode: o.bom.productCode, productName: o.bom.product?.name ?? o.bom.productCode, quantity: o.quantity.toString(), createdAt: o.createdAt, status: o.status, materialStatus: o.materialStatus }));
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
  @Get('kitchen-inventory')
  async kitchenInventory(@Req() req: StaffRequest) {
    return this.db.$queryRaw<{ id: string; name: string; code: string; lot: string; unit: string; quantity: string; expiry: Date | null }[]>`
      SELECT l.id, m.name, m.code, l.lot_code AS lot, u.name AS unit,
        b.quantity::text AS quantity, l.expiry_date AS expiry
      FROM staff_kitchen_balances b
      JOIN material_lots l ON l.id = b.material_lot_id
      JOIN materials m ON m.id = l.material_id
      JOIN units u ON u.id = m.unit_id
      WHERE b.branch_id = ${req.staff.branchId}::uuid AND b.quantity > 0
      ORDER BY m.name, l.expiry_date NULLS LAST, l.lot_code`;
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
  private async kitchenRequirements(tx: Prisma.TransactionClient, branchId: string, employeeCode: string, code: string, output?: Prisma.Decimal) {
    const order = await tx.productionOrder.findFirst({ where: { code, branchId, assignedEmployeeCode: employeeCode }, include: { bom: { include: { details: { include: { unit: true, material: { include: { unit: true } } } } } } } });
    if (!order) throw new NotFoundException('Không tìm thấy lệnh được giao.');
    if (order.bom.outputQuantity.lte(0) || !order.bom.details.length) throw new BadRequestException('Lệnh chưa có công thức hợp lệ.');
    const results = [];
    for (const detail of order.bom.details) {
      let factor = new Prisma.Decimal(1);
      if (detail.unitId !== detail.material.unitId) {
        if (detail.unit.baseUnitId !== detail.material.unitId) throw new BadRequestException(`Đơn vị công thức ${detail.material.name} không phù hợp.`);
        factor = detail.unit.conversionFactor;
      }
      const needed = detail.quantity.mul(output ?? order.quantity).mul(factor).div(order.bom.outputQuantity);
      if (needed.lte(0) || needed.decimalPlaces() > 3) throw new BadRequestException(`Số lượng ${detail.material.name} sau quy đổi vượt độ chính xác kho.`);
      const balances = await tx.$queryRaw<{ quantity: Prisma.Decimal }[]>`SELECT b.quantity FROM staff_kitchen_balances b JOIN material_lots l ON l.id=b.material_lot_id WHERE b.branch_id=${branchId}::uuid AND l.material_id=${detail.materialId}::uuid AND l.status='ACTIVE'`;
      const available = balances.reduce((sum, row) => sum.plus(row.quantity), new Prisma.Decimal(0));
      results.push({ materialId:detail.materialId, code:detail.material.code, name:detail.material.name, unit:detail.material.unit.name, required:needed.toString(), available:available.toString(), shortage:Prisma.Decimal.max(needed.minus(available),0).toString() });
    }
    return { order, items: results };
  }
  @Get(':code/material-requirements')
  async productionRequirements(@Req() req: StaffRequest, @Param('code') code: string, @Query('quantity') quantity?: string) {
    if (quantity !== undefined && (!/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(quantity) || new Prisma.Decimal(quantity).lte(0))) throw new BadRequestException('Số lượng không hợp lệ.');
    return this.db.$transaction(async tx => {
      const { order, items } = await this.kitchenRequirements(tx, req.staff.branchId, req.staff.code, code, quantity === undefined ? undefined : new Prisma.Decimal(quantity));
      if (quantity !== undefined && new Prisma.Decimal(quantity).gt(order.quantity)) throw new BadRequestException('Số lượng hoàn thành vượt kế hoạch.');
      const marker = await tx.$queryRaw<{ production_order_id:string }[]>`SELECT production_order_id FROM staff_kitchen_production_starts WHERE production_order_id=${order.id}::uuid`;
      return { source: order.materialStatus === 'ISSUED' && !marker.length ? 'WAREHOUSE' : 'KITCHEN', items };
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  }
  @Post(':code/finished-goods')
  async report(@Req() req: StaffRequest, @Param('code') code: string, @Body() body: unknown) {
    const input = object(body);
    if (typeof input.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(input.quantity) || new Prisma.Decimal(input.quantity).lte(0)) throw new BadRequestException('Số lượng không hợp lệ.');
    const quantity = new Prisma.Decimal(input.quantity);
    const order = await this.db.productionOrder.findFirst({ where: { code, branchId: req.staff.branchId, assignedEmployeeCode: req.staff.code } });
    if (!order) throw new NotFoundException('Không tìm thấy lệnh được giao.');
    const marker = await this.db.$queryRaw<{ production_order_id: string }[]>`SELECT production_order_id FROM staff_kitchen_production_starts WHERE production_order_id=${order.id}::uuid`;
    if (!marker.length) return this.finishedGoods.reportOutput(code, { reportedQuantity: input.quantity });
    return this.db.$transaction(async tx => {
      const { order: current, items } = await this.kitchenRequirements(tx, req.staff.branchId, req.staff.code, code, quantity);
      if (current.status !== 'IN_PROGRESS' || current.materialStatus !== 'ISSUED') throw new ConflictException('Lệnh chưa ở trạng thái đang sản xuất.');
      if (quantity.gt(current.quantity)) throw new BadRequestException('Số lượng hoàn thành vượt kế hoạch.');
      const previous = await tx.$queryRaw<{ reported_quantity: Prisma.Decimal | null }[]>`SELECT reported_quantity FROM staff_kitchen_production_starts WHERE production_order_id=${current.id}::uuid FOR UPDATE`;
      if (!previous.length) throw new ConflictException('Không tìm thấy dữ liệu cấp nguyên liệu cho lệnh.');
      if (previous[0].reported_quantity && !previous[0].reported_quantity.equals(quantity)) throw new ConflictException('Lệnh đã ghi nhận nguyên liệu; số lượng báo lại phải giữ nguyên để tránh trừ hai lần.');
      if (!previous[0].reported_quantity) {
        for (const item of items) {
          let remaining = new Prisma.Decimal(item.required);
          const lots = await tx.$queryRaw<{ material_lot_id:string; quantity:Prisma.Decimal }[]>`SELECT b.material_lot_id,b.quantity FROM staff_kitchen_balances b JOIN material_lots l ON l.id=b.material_lot_id WHERE b.branch_id=${req.staff.branchId}::uuid AND l.material_id=${item.materialId}::uuid AND l.status='ACTIVE' AND b.quantity>0 ORDER BY l.expiry_date NULLS LAST,l.lot_code,l.id FOR UPDATE OF b`;
          for (const lot of lots) {
            if (remaining.lte(0)) break;
            const used = Prisma.Decimal.min(remaining,lot.quantity);
            await tx.$executeRaw`UPDATE staff_kitchen_balances SET quantity=quantity-${used} WHERE branch_id=${req.staff.branchId}::uuid AND material_lot_id=${lot.material_lot_id}::uuid`;
            await tx.$executeRaw`INSERT INTO staff_kitchen_production_consumptions(production_order_id,material_lot_id,quantity) VALUES (${current.id}::uuid,${lot.material_lot_id}::uuid,${used})`;
            remaining = remaining.minus(used);
          }
          if (remaining.gt(0)) throw new BadRequestException(`Không đủ ${item.name} trong tồn bếp; chưa báo hoàn thành.`);
        }
        await tx.$executeRaw`UPDATE staff_kitchen_production_starts SET reported_quantity=${quantity} WHERE production_order_id=${current.id}::uuid`;
      }
      const existing = await tx.finishedGoodsReceipt.findUnique({ where: { productionOrderId: current.id } });
      const receipt = existing ? await tx.finishedGoodsReceipt.update({ where: { id: existing.id }, data: { reportedQuantity:quantity, acceptedQuantity:null, rejectedQuantity:null, status:'PENDING', note:null, inspectionNote:null, inspectedAt:null, approvedAt:null } }) : await tx.finishedGoodsReceipt.create({ data: { code:`NTP-${randomUUID().replaceAll('-', '').slice(0,12).toUpperCase()}`, productionOrderId:current.id, reportedQuantity:quantity } });
      const changed = await tx.productionOrder.updateMany({ where: { id:current.id, status:'IN_PROGRESS' }, data: { status:'WAITING_APPROVAL' } });
      if (changed.count !== 1) throw new ConflictException('Trạng thái lệnh đã thay đổi.');
      return { message:'Đã gửi số lượng thành phẩm chờ quản lý duyệt', data:{ receiptCode:receipt.code, orderCode:current.code, reportedQuantity:quantity.toString(), status:'PENDING', productionStatus:'WAITING_APPROVAL' } };
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  }
  @Post(':code/start')
  async start(@Req() req: StaffRequest, @Param('code') code: string) {
    return this.db.$transaction(async tx => {
      const { order, items } = await this.kitchenRequirements(tx, req.staff.branchId, req.staff.code, code);
      if (order.status !== 'PENDING' || !['MAKE_TO_STOCK','HYBRID'].includes(order.productionMode)) throw new ConflictException('Lệnh chưa đủ điều kiện hoặc đã thay đổi.');
      const kitchen = order.materialStatus !== 'ISSUED';
      if (kitchen) {
        const missing = items.filter(item => new Prisma.Decimal(item.shortage).gt(0));
        if (missing.length) throw new BadRequestException(`Không đủ nguyên liệu tại bếp: ${missing.map(item => `${item.name} thiếu ${item.shortage} ${item.unit}`).join(', ')}.`);
      }
      const changed = await tx.productionOrder.updateMany({ where: { id:order.id, status:'PENDING', materialStatus:order.materialStatus }, data: { status:'IN_PROGRESS', ...(kitchen ? { materialStatus:'ISSUED' } : {}) } });
      if (changed.count !== 1) throw new ConflictException('Lệnh đã thay đổi.');
      if (kitchen) await tx.$executeRaw`INSERT INTO staff_kitchen_production_starts(production_order_id,branch_id) VALUES (${order.id}::uuid,${req.staff.branchId}::uuid)`;
      return { message:'Đã bắt đầu sản xuất.' };
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  }

}

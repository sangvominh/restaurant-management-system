import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { randomBytes } from 'node:crypto';
import { vietnamDay } from './expiry.js';
const include = { supplier: true, createdBy: { select: { id: true, name: true, accountId: true } }, lines: { include: { lot: { include: { material: { include: { unit: true } } } } } } } as const;
function text(value: unknown, name: string, max = 200) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) throw new BadRequestException(`${name} không hợp lệ`);
  return value.trim();
}
function id(value: unknown) {
  const result = text(value, 'ID', 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(result)) throw new BadRequestException('ID không hợp lệ');
  return result;
}
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new BadRequestException('Dữ liệu không hợp lệ');
  return value as Record<string, unknown>;
}
function number(value: unknown, label: string, scale: number, zero = false) {
  if ((typeof value !== 'string' && typeof value !== 'number') || !new RegExp(`^\\d{1,${18-scale}}(?:\\.\\d{1,${scale}})?$`).test(String(value))) throw new BadRequestException(`${label} không hợp lệ`);
  const result = new Prisma.Decimal(value);
  if (!zero && result.lte(0)) throw new BadRequestException(`${label} phải lớn hơn 0`);
  return result;
}
function expiry(value: unknown) {
  if (!value) return null;
  const input = text(value, 'Hạn sử dụng', 10);
  const date = new Date(`${input}T00:00:00.000Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== input) throw new BadRequestException('Hạn sử dụng không hợp lệ');
  return date;
}
function today() { return new Date(vietnamDay() + 'T00:00:00.000Z'); }
function generatedCode(prefix: string) { return `${prefix}-${today().toISOString().slice(0, 10).replaceAll('-', '')}-${randomBytes(6).toString('hex').toUpperCase()}`; }
@Injectable()
export class InventoryService {
  constructor(private readonly db: PrismaService) {}
  list() { return this.db.materialReceipt.findMany({ include, orderBy: { receivedAt: 'desc' } }); }
  async references() {
    const [suppliers, materials] = await Promise.all([
      this.db.supplier.findMany({ where: { status: 'ACTIVE' }, orderBy: { name: 'asc' } }),
      this.db.material.findMany({ where: { status: 'ACTIVE' }, include: { unit: true }, orderBy: { code: 'asc' } }),
    ]);
    return { suppliers, materials };
  }
  private editable(receipt: { status: string; createdBy: { accountId: string | null } }, user: AdminUser) {
    if (receipt.status !== 'DRAFT') throw new ConflictException('Phiếu đã ghi sổ, không được sửa/xóa hoặc ghi sổ lại');
    if (receipt.createdBy.accountId !== user.id && !user.permissions.includes('*') && !user.permissions.includes('receipt:post')) throw new ForbiddenException('Chỉ sửa/xóa phiếu nháp của mình');
  }
  async save(input: unknown, user: AdminUser, receiptId?: string) {
    const b = object(input), supplierId = id(b.supplierId);
    if (!Array.isArray(b.lines) || !b.lines.length || b.lines.length > 100) throw new BadRequestException('Cần từ 1 đến 100 dòng NVL');
    const seen = new Set<string>();
    const lines = b.lines.map(value => {
      const line = object(value), materialId = id(line.materialId), lineId = line.id ? id(line.id) : null;
      if (lineId && seen.has(lineId)) throw new BadRequestException('Dòng nhập bị trùng');
      if (lineId) seen.add(lineId);
      return { id: lineId, materialId, expiryDate: expiry(line.expiryDate), quantity: number(line.quantity, 'Số lượng', 3), unitPrice: number(line.unitPrice, 'Đơn giá', 2, true) };
    });
    return this.db.$transaction(async tx => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112027)::text`;
      const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
      if (!employee || employee.status !== 'ACTIVE') throw new ForbiddenException('Tài khoản cần liên kết hồ sơ người sử dụng đang hoạt động để lập phiếu');
      const current = receiptId ? await tx.materialReceipt.findUniqueOrThrow({ where: { id: id(receiptId) }, include: { createdBy: true, lines: { include: { lot: { include: { _count: { select: { receiptLines: true, issueLines: true, movements: true, wasteLines: true } } } } } } } }) : null;
      if (current) this.editable(current, user);
      if (lines.some(l => l.id && !current?.lines.some(old => old.id === l.id))) throw new BadRequestException('Dòng nhập không thuộc phiếu nháp này');
      const supplier = await tx.supplier.findUniqueOrThrow({ where: { id: supplierId } });
      if (supplier.status !== 'ACTIVE') throw new BadRequestException('NCC đã ngừng hoạt động');
      const details = [];
      for (const line of lines) {
        const material = await tx.material.findUniqueOrThrow({ where: { id: line.materialId } });
        if (material.status !== 'ACTIVE') throw new BadRequestException(`NVL ${material.code} đã ngừng sử dụng`);
        const old = current?.lines.find(l => l.id === line.id)?.lot;
        // Không sửa lô cũ dùng chung ở dữ liệu trước đây hoặc đã có phát sinh.
        const reusable = old && old.materialId === line.materialId && old._count.receiptLines === 1 && old._count.issueLines === 0 && old._count.movements === 0 && old._count.wasteLines === 0;
        let lot;
        if (reusable) lot = await tx.materialLot.update({ where: { id: old.id }, data: { expiryDate: line.expiryDate } });
        else {
          let lotCode: string;
          do { lotCode = generatedCode('LO'); } while (await tx.materialLot.findFirst({ where: { code: lotCode } }));
          lot = await tx.materialLot.create({ data: { materialId: line.materialId, code: lotCode, expiryDate: line.expiryDate } });
        }
        details.push({ lotId: lot.id, quantity: line.quantity, unitPrice: line.unitPrice });
      }
      const data = { supplierId, note: b.note ? text(b.note, 'Ghi chú', 1000) : null };
      if (receiptId) {
        await tx.materialReceiptLine.deleteMany({ where: { receiptId } });
        const updated = await tx.materialReceipt.update({ where: { id: receiptId }, data: { ...data, lines: { create: details } }, include });
        await tx.materialLot.deleteMany({ where: { id: { in: current!.lines.map(l => l.lotId) }, receiptLines: { none: {} }, issueLines: { none: {} }, movements: { none: {} }, wasteLines: { none: {} } } });
        return updated;
      }
      let code: string;
      do { code = generatedCode('PN'); } while (await tx.materialReceipt.findUnique({ where: { code } }));
      return tx.materialReceipt.create({ data: { ...data, code, createdById: employee.id, lines: { create: details } }, include });
    });
  }
  async post(receiptId: string) {
    return this.db.$transaction(async tx => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112027)::text`;
      const receipt = await tx.materialReceipt.findUniqueOrThrow({ where: { id: id(receiptId) }, include });
      if (receipt.status !== 'DRAFT') throw new ConflictException('Phiếu đã ghi sổ, không thể ghi lần hai');
      if (!receipt.lines.length) throw new BadRequestException('Phiếu chưa có chi tiết');
      if (receipt.supplier.status !== 'ACTIVE') throw new BadRequestException('NCC đã ngừng hoạt động');
      const postedAt = new Date();
      for (const line of receipt.lines) {
        if (line.lot.material.status !== 'ACTIVE') throw new BadRequestException('Phiếu có NVL đã ngừng sử dụng');
        if (line.lot.expiryDate && line.lot.expiryDate < today()) throw new BadRequestException(`Lô ${line.lot.code} đã hết hạn`);
        if (line.quantity.lte(0) || line.unitPrice.lt(0)) throw new BadRequestException('Số lượng hoặc đơn giá không hợp lệ');
        await tx.materialMovement.create({ data: { lotId: line.lotId, receiptLineId: line.id, quantity: line.quantity, fromSource: 'BEN_NGOAI', toSource: 'TRONG_KHO', postedAt } });
      }
      return tx.materialReceipt.update({ where: { id: receipt.id }, data: { status: 'POSTED', receivedAt: postedAt }, include });
    });
  }
  async remove(receiptId: string, user: AdminUser) {
    return this.db.$transaction(async tx => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112027)::text`;
      const receipt = await tx.materialReceipt.findUniqueOrThrow({ where: { id: id(receiptId) }, include: { createdBy: true, lines: true } });
      this.editable(receipt, user);
      await tx.materialReceiptLine.deleteMany({ where: { receiptId } });
      await tx.materialReceipt.delete({ where: { id: receiptId } });
      await tx.materialLot.deleteMany({ where: { id: { in: receipt.lines.map(l => l.lotId) }, receiptLines: { none: {} }, issueLines: { none: {} }, movements: { none: {} }, wasteLines: { none: {} } } });
      return { message: 'Đã xóa phiếu nháp' };
    });
  }
  stock() {
    return this.db.$queryRaw`SELECT m.id,m.code,m.name,m.status,m."minStock",u.name AS "unitName",u.symbol,
      COALESCE(SUM(CASE WHEN mm."toSource"='TRONG_KHO' THEN mm.quantity ELSE 0 END - CASE WHEN mm."fromSource"='TRONG_KHO' THEN mm.quantity ELSE 0 END),0) AS quantity
      FROM "Material" m JOIN "Unit" u ON u.id=m."unitId" LEFT JOIN "MaterialLot" l ON l."materialId"=m.id
      LEFT JOIN "MaterialMovement" mm ON mm."lotId"=l.id GROUP BY m.id,u.name,u.symbol ORDER BY m.code`;
  }
  async setMinimum(materialId: string, input: unknown) {
    const b = object(input);
    return this.db.material.update({ where: { id: id(materialId) }, data: { minStock: number(b.minStock, 'Tồn tối thiểu', 3, true) }, select: { id: true, minStock: true } });
  }
  async discardLot(lotId: string, input: unknown, user: AdminUser) {
    const b = object(input), reason = text(b.reason, 'Lý do hủy', 1000), quantity = number(b.quantity, 'Số lượng hủy', 3);
    return this.db.$transaction(async tx => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112027)::text`;
      const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
      if (!employee || employee.status !== 'ACTIVE') throw new ForbiddenException('Cần hồ sơ người sử dụng đang hoạt động');
      const lot = await tx.materialLot.findUniqueOrThrow({ where: { id: id(lotId) }, include: { movements: true } });
      const stock = lot.movements.reduce((q, m) => q.plus(m.toSource === 'TRONG_KHO' ? m.quantity : 0).minus(m.fromSource === 'TRONG_KHO' ? m.quantity : 0), new Prisma.Decimal(0));
      if (quantity.gt(stock)) throw new ConflictException('Số lượng hủy vượt tồn trong kho');
      const waste = await tx.waste.create({ data: { reason, status: 'APPROVED', approvedAt: new Date(), reportedById: employee.id, reviewedById: employee.id, lines: { create: { sourceType: 'TRONG_KHO', lotId: lot.id, quantity } } }, include: { lines: true } });
      await tx.materialMovement.create({ data: { lotId: lot.id, quantity, fromSource: 'TRONG_KHO', toSource: 'DA_HUY', wasteLineId: waste.lines[0].id } });
      return waste;
    });
  }
  async lots(materialId: string) {
    await this.db.material.findUniqueOrThrow({ where: { id: id(materialId) } });
    return this.db.$queryRaw`SELECT l.id,l.code,l."expiryDate",
      COALESCE(SUM(CASE WHEN mm."toSource"='TRONG_KHO' THEN mm.quantity ELSE 0 END - CASE WHEN mm."fromSource"='TRONG_KHO' THEN mm.quantity ELSE 0 END),0) AS quantity
      FROM "MaterialLot" l LEFT JOIN "MaterialMovement" mm ON mm."lotId"=l.id WHERE l."materialId"=${materialId}::uuid
      GROUP BY l.id ORDER BY l."expiryDate" NULLS LAST,l.code`;
  }
}

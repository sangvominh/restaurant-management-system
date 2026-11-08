import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
const bomInclude = { product: { include: { unit: true } }, createdBy: true, lines: { include: { material: { include: { unit: true } } } } } as const;
const orderInclude = { bom: { include: bomInclude }, assignedBy: true, assignedTo: true } as const;
function body(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new BadRequestException('Dữ liệu không hợp lệ');
  return value as Record<string, unknown>;
}
function uuid(value: unknown) {
  if (typeof value !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) throw new BadRequestException('ID không hợp lệ');
  return value;
}
function quantity(value: unknown) {
  if ((typeof value !== 'string' && typeof value !== 'number') || !/^\d{1,15}(\.\d{1,3})?$/.test(String(value))) throw new BadRequestException('Số lượng không hợp lệ (tối đa 3 số lẻ)');
  const result = new Prisma.Decimal(value);
  if (result.lte(0)) throw new BadRequestException('Số lượng phải lớn hơn 0');
  return result;
}
function date(value: unknown) {
  if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d(?::\d\d(?:\.\d{3})?)?Z$/.test(value) || !Number.isFinite(Date.parse(value))) throw new BadRequestException('Ngày giờ không hợp lệ');
  return new Date(value);
}
const manager = (user: AdminUser) => user.permissions.some(p => ['*', 'production:manage'].includes(p));
@Injectable()
export class ProductionService {
  constructor(private readonly db: PrismaService) {}
  async references() {
    const [products, materials, employees] = await Promise.all([
      this.db.product.findMany({ where: { status: 'ACTIVE' }, include: { unit: true }, orderBy: { code: 'asc' } }),
      this.db.material.findMany({ where: { status: 'ACTIVE' }, include: { unit: true }, orderBy: { code: 'asc' } }),
      this.db.employee.findMany({ where: { status: 'ACTIVE', account: { status: 'ACTIVE', role: { permissions: { some: { permission: { code: { in: ['*', 'production:perform'] } } } } } } }, select: { id: true, name: true, code: true }, orderBy: { name: 'asc' } }),
    ]);
    return { products, materials, employees };
  }
  boms() { return this.db.bom.findMany({ include: bomInclude, orderBy: [{ productId: 'asc' }, { version: 'desc' }] }); }
  async saveBom(input: unknown, user: AdminUser, existingId?: string) {
    const b = body(input), productId = uuid(b.productId), outputQuantity = quantity(b.outputQuantity), effectiveAt = date(b.effectiveAt);
    const version = Number(b.version);
    if (!Number.isInteger(version) || version < 1 || version > 2147483647) throw new BadRequestException('Phiên bản phải là số nguyên dương');
    if (!Array.isArray(b.lines) || b.lines.length < 1 || b.lines.length > 100) throw new BadRequestException('Cần 1–100 nguyên liệu');
    const lines = b.lines.map(item => { const l = body(item); return { materialId: uuid(l.materialId), quantity: quantity(l.quantity) }; });
    if (new Set(lines.map(l => l.materialId)).size !== lines.length) throw new BadRequestException('Nguyên liệu bị trùng');
    return this.db.$transaction(async tx => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112028)::text`;
      const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
      if (!employee || employee.status !== 'ACTIVE') throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
      if (existingId) {
        const current = await tx.bom.findUniqueOrThrow({ where: { id: uuid(existingId) } });
        if (current.status !== 'DRAFT') throw new ConflictException('Chỉ sửa BOM nháp; BOM đã áp dụng cần tạo phiên bản mới');
      }
      const product = await tx.product.findUniqueOrThrow({ where: { id: productId } });
      if (product.status !== 'ACTIVE' || await tx.material.count({ where: { id: { in: lines.map(l => l.materialId) }, status: 'ACTIVE' } }) !== lines.length) throw new BadRequestException('Thành phẩm và nguyên liệu phải đang hoạt động');
      const data = { productId, version, outputQuantity, effectiveAt, lines: { create: lines } };
      if (existingId) {
        await tx.bomLine.deleteMany({ where: { bomId: existingId } });
        return tx.bom.update({ where: { id: existingId }, data, include: bomInclude });
      }
      return tx.bom.create({ data: { ...data, createdById: employee.id }, include: bomInclude });
    });
  }
  async bomAction(id: string, action: 'activate' | 'delete') {
    return this.db.$transaction(async tx => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112028)::text`;
      const bom = await tx.bom.findUniqueOrThrow({ where: { id: uuid(id) }, include: bomInclude });
      if (bom.status !== 'DRAFT') throw new ConflictException('Chỉ thực hiện trên BOM nháp');
      if (action === 'delete') {
        await tx.bomLine.deleteMany({ where: { bomId: id } });
        return tx.bom.delete({ where: { id } });
      }
      if (!bom.lines.length || bom.product.status !== 'ACTIVE' || bom.lines.some(l => l.material.status !== 'ACTIVE')) throw new BadRequestException('BOM cần nguyên liệu và thành phẩm đang hoạt động');
      return tx.bom.update({ where: { id }, data: { status: 'ACTIVE' } });
    });
  }
  orders(user: AdminUser) {
    return this.db.productionOrder.findMany({ where: manager(user) || user.permissions.some(p => ['material:approve', 'production:inspect', 'waste:approve'].includes(p)) ? {} : { assignedTo: { accountId: user.id } }, include: orderInclude, orderBy: { assignedAt: 'desc' } });
  }
  async createOrder(input: unknown, user: AdminUser) {
    const b = body(input), bomId = uuid(b.bomId), assignedToId = uuid(b.assignedToId), amount = quantity(b.quantity), dueAt = b.dueAt ? date(b.dueAt) : null;
    return this.db.$transaction(async tx => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112028)::text`;
      const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
      if (!employee || employee.status !== 'ACTIVE') throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
      const bom = await tx.bom.findUniqueOrThrow({ where: { id: bomId }, include: bomInclude });
      if (bom.status !== 'ACTIVE' || bom.effectiveAt > new Date() || bom.product.status !== 'ACTIVE' || !bom.lines.length || bom.lines.some(l => l.material.status !== 'ACTIVE')) throw new BadRequestException('BOM chưa có hiệu lực hoặc có thành phẩm/nguyên liệu ngừng hoạt động');
      if (dueAt && dueAt <= new Date()) throw new BadRequestException('Hạn hoàn thành phải ở tương lai');
      const assignee = await tx.employee.findFirst({ where: { id: assignedToId, status: 'ACTIVE', account: { status: 'ACTIVE', role: { permissions: { some: { permission: { code: { in: ['*', 'production:perform'] } } } } } } } });
      if (!assignee) throw new BadRequestException('Người nhận cần tài khoản hoạt động và quyền thực hiện sản xuất');
      return tx.productionOrder.create({ data: { bomId, quantity: amount, assignedById: employee.id, assignedToId, dueAt }, include: orderInclude });
    });
  }
  async orderAction(id: string, action: 'receive' | 'cancel', user: AdminUser) {
    return this.db.$transaction(async tx => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112028)::text`;
      const order = await tx.productionOrder.findUniqueOrThrow({ where: { id: uuid(id) }, include: { assignedTo: true } });
      if (action === 'receive') {
        if (order.assignedTo.accountId !== user.id) throw new ForbiddenException('Chỉ người được giao mới được nhận lệnh');
        if (order.status !== 'NEW') throw new ConflictException('Lệnh đã được nhận hoặc đã hủy');
        return tx.productionOrder.update({ where: { id }, data: { status: 'RECEIVED' } });
      }
      if (order.status !== 'NEW') throw new ConflictException('Chỉ hủy lệnh chưa được nhận');
      if (await tx.materialIssue.count({ where: { productionOrderId: id } }) || await tx.productionRun.count({ where: { productionOrderId: id } })) throw new ConflictException('Lệnh đã có phát sinh');
      return tx.productionOrder.update({ where: { id }, data: { status: 'CANCELLED' } });
    });
  }
}

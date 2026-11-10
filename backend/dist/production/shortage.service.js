var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { vietnamDay } from '../inventory/expiry.js';
const include = { material: { include: { unit: true } }, productionOrder: { include: { bom: { include: { product: true } } } }, requestedBy: { select: { name: true } }, reviewedBy: { select: { name: true } } };
const manage = (u) => u.permissions.some(p => ['*', 'production:manage', 'material:approve'].includes(p));
function uuid(v) { if (typeof v !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v))
    throw new BadRequestException('ID không hợp lệ'); return v; }
function text(v) { if (typeof v !== 'string' || !v.trim() || v.length > 1000)
    throw new BadRequestException('Cần lý do/ghi chú, tối đa 1000 ký tự'); return v.trim(); }
let ShortageService = class ShortageService {
    db;
    constructor(db) {
        this.db = db;
    }
    list(user) {
        if (!manage(user) && !user.permissions.includes('material:request'))
            throw new ForbiddenException('Không có quyền xem báo thiếu');
        return this.db.materialShortage.findMany({ where: manage(user) ? {} : { productionOrder: { assignedTo: { accountId: user.id } } }, include, orderBy: { requestedAt: 'desc' } });
    }
    async save(input, user, reportId) {
        if (!input || typeof input !== 'object' || Array.isArray(input))
            throw new BadRequestException('Dữ liệu không hợp lệ');
        const b = input;
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112027)::text`;
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần hồ sơ người sử dụng hoạt động');
            if (reportId) {
                const current = await tx.materialShortage.findUniqueOrThrow({ where: { id: uuid(reportId) }, include: { productionOrder: true } });
                if (!['PENDING', 'PROCESSING'].includes(current.status))
                    throw new ConflictException('Báo thiếu đã kết thúc');
                if (b.status === 'CANCELLED') {
                    if (current.requestedById !== employee.id)
                        throw new ForbiddenException('Chỉ người lập được rút báo thiếu');
                    return tx.materialShortage.update({ where: { id: current.id }, data: { status: 'CANCELLED' }, include });
                }
                if (!manage(user))
                    throw new ForbiddenException('Chỉ quản lý được xử lý báo thiếu');
                if (!['PROCESSING', 'RESOLVED', 'REJECTED'].includes(String(b.status)))
                    throw new BadRequestException('Trạng thái không hợp lệ');
                if (!['RECEIVED', 'IN_PROGRESS'].includes(current.productionOrder.status))
                    throw new ConflictException('Lệnh không còn thực hiện');
                if (b.status === 'RESOLVED') {
                    const material = await tx.material.findUniqueOrThrow({ where: { id: current.materialId } });
                    const lots = await tx.materialLot.findMany({ where: { materialId: current.materialId }, include: { movements: true } });
                    const today = vietnamDay();
                    const stock = lots.filter(l => !l.expiryDate || l.expiryDate.toISOString().slice(0, 10) >= today).reduce((sum, l) => sum.plus(l.movements.reduce((q, m) => q.plus(m.toSource === 'TRONG_KHO' ? m.quantity : 0).minus(m.fromSource === 'TRONG_KHO' ? m.quantity : 0), new Prisma.Decimal(0))), new Prisma.Decimal(0));
                    const deliveredLines = await tx.materialIssueLine.findMany({ where: { lotId: { in: lots.filter(l => !l.expiryDate || l.expiryDate.toISOString().slice(0, 10) >= today).map(l => l.id) }, issue: { productionOrderId: current.productionOrderId, status: 'APPROVED', approvedAt: { gte: current.requestedAt } } }, include: { returnLines: { include: { return: true } } } });
                    const delivered = Prisma.Decimal.sum(0, ...deliveredLines.map(l => Prisma.Decimal.max(0, (l.issuedQuantity || new Prisma.Decimal(0)).minus(Prisma.Decimal.sum(0, ...l.returnLines.filter(r => r.return.status !== 'REJECTED').map(r => r.quantity))))));
                    if (material.status !== 'ACTIVE' || stock.plus(delivered).lt(current.quantity))
                        throw new ConflictException('Tồn còn hạn và lượng đã cấp sau báo thiếu chưa đủ. Cần bổ sung hoặc phản hồi không đáp ứng');
                }
                return tx.materialShortage.update({ where: { id: current.id }, data: { status: String(b.status), reviewNote: text(b.reviewNote), reviewedById: employee.id }, include });
            }
            if (!user.permissions.includes('*') && !user.permissions.includes('material:request'))
                throw new ForbiddenException('Chưa có quyền báo thiếu NVL');
            const orderId = uuid(b.productionOrderId), materialId = uuid(b.materialId);
            const order = await tx.productionOrder.findUniqueOrThrow({ where: { id: orderId }, include: { bom: { include: { lines: true } } } });
            if (order.assignedToId !== employee.id || !['RECEIVED', 'IN_PROGRESS'].includes(order.status))
                throw new ForbiddenException('Chỉ người nhận lệnh đang thực hiện được báo thiếu');
            if (!order.bom.lines.some(l => l.materialId === materialId))
                throw new BadRequestException('NVL không thuộc công thức của lệnh');
            const material = await tx.material.findUniqueOrThrow({ where: { id: materialId } });
            if (material.status !== 'ACTIVE')
                throw new BadRequestException('NVL ngừng sử dụng; cần quản lý kiểm tra công thức');
            if (await tx.materialShortage.count({ where: { productionOrderId: orderId, materialId, status: { in: ['PENDING', 'PROCESSING'] } } }))
                throw new ConflictException('Đã có báo thiếu nguyên liệu này đang chờ xử lý trong lệnh');
            if (!['string', 'number'].includes(typeof b.quantity) || !/^\d{1,15}(\.\d{1,3})?$/.test(String(b.quantity)))
                throw new BadRequestException('Số lượng không hợp lệ');
            const quantity = new Prisma.Decimal(String(b.quantity));
            if (quantity.lte(0))
                throw new BadRequestException('Số lượng phải lớn hơn 0');
            return tx.materialShortage.create({ data: { productionOrderId: orderId, materialId, quantity, reason: text(b.reason), requestedById: employee.id }, include });
        });
    }
};
ShortageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ShortageService);
export { ShortageService };
//# sourceMappingURL=shortage.service.js.map
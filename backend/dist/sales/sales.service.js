var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { randomUUID } from 'node:crypto';
import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
const include = { table: true, createdBy: { select: { id: true, name: true } }, lines: { orderBy: { id: 'asc' }, include: { changes: { include: { changedBy: { select: { name: true } } } }, servings: { include: { servedBy: { select: { name: true } } } }, replenishments: { include: { productionOrder: { select: { id: true, status: true } } } }, product: { include: { unit: true } } } }, payment: true, exports: { include: { requestedBy: { select: { name: true } }, reviewedBy: { select: { name: true } }, lines: true }, orderBy: { requestedAt: 'desc' } } };
function object(v) { if (!v || typeof v !== 'object' || Array.isArray(v))
    throw new BadRequestException('Dữ liệu không hợp lệ'); return v; }
function uuid(v) { if (typeof v !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v))
    throw new BadRequestException('ID không hợp lệ'); return v; }
function quantity(v) { if (!['string', 'number'].includes(typeof v) || !/^\d{1,15}(\.\d{1,3})?$/.test(String(v)))
    throw new BadRequestException('Số lượng không hợp lệ'); const q = new Prisma.Decimal(String(v)); if (q.lte(0))
    throw new BadRequestException('Số lượng phải dương'); return q; }
const total = (lines) => Prisma.Decimal.sum(0, ...lines.map(l => l.quantity.mul(l.unitPrice))).toDecimalPlaces(2);
function serialized(sale) { return { ...sale, total: total(sale.lines) }; }
let SalesService = class SalesService {
    db;
    constructor(db) {
        this.db = db;
    }
    async products() {
        return this.db.$transaction(async (tx) => {
            const [products, moves, demand] = await Promise.all([tx.product.findMany({ where: { status: 'ACTIVE' }, include: { unit: true, category: true }, orderBy: { code: 'asc' } }), tx.productMovement.findMany(), tx.saleLine.findMany({ where: { sentAt: { not: null }, sale: { status: 'CONFIRMED' } }, orderBy: [{ sentAt: 'asc' }, { id: 'asc' }], include: { exportLines: { include: { export: true } } } })]);
            return products.map(p => {
                const stock = moves.filter(m => m.productId === p.id).reduce((q, m) => m.movementType === 'NHAP_SAN_XUAT' ? q.plus(m.quantity) : q.minus(m.quantity), new Prisma.Decimal(0));
                let remaining = Prisma.Decimal.max(0, stock);
                const allocations = demand.filter(l => l.productId === p.id).map(l => {
                    const exported = Prisma.Decimal.sum(0, ...l.exportLines.filter(e => e.export.status === 'APPROVED').map(e => e.exportedQuantity || 0));
                    const needed = Prisma.Decimal.max(0, l.quantity.minus(exported));
                    const ready = Prisma.Decimal.min(remaining, needed);
                    remaining = remaining.minus(ready);
                    return { lineId: l.id, ready, missing: needed.minus(ready) };
                });
                return { ...p, stock, available: remaining, allocations };
            });
        }, { isolationLevel: 'RepeatableRead' });
    }
    async list() { return (await this.db.sale.findMany({ include, orderBy: { createdAt: 'desc' } })).map(serialized); }
    async save(input, user, existingId) {
        const b = object(input);
        if (!Array.isArray(b.lines) || b.lines.length > 100)
            throw new BadRequestException('Tối đa 100 dòng mỗi lần sửa');
        const requested = b.lines.map(v => {
            const l = object(v);
            if (typeof l.note !== 'undefined' && (typeof l.note !== 'string' || l.note.length > 500))
                throw new BadRequestException('Ghi chú tối đa 500 ký tự');
            return { id: l.id ? uuid(l.id) : undefined, productId: uuid(l.productId), quantity: quantity(l.quantity), note: String(l.note || '').trim() };
        });
        if (new Set(requested.filter(l => l.id).map(l => l.id)).size !== requested.filter(l => l.id).length)
            throw new BadRequestException('Trùng dòng món');
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            const current = existingId ? await tx.sale.findUniqueOrThrow({ where: { id: uuid(existingId) }, include }) : null;
            if (current && (!['DRAFT', 'CONFIRMED'].includes(current.status) || current.payment))
                throw new ConflictException('Đơn đã đóng');
            if (current && b.version !== current.version)
                throw new ConflictException('Đơn đã thay đổi. Đóng biểu mẫu và mở lại để cập nhật');
            const tableId = current ? current.tableId : b.tableId ? uuid(b.tableId) : null;
            if (tableId) {
                const table = await tx.diningTable.findUniqueOrThrow({ where: { id: tableId } });
                if (!current && table.status !== 'ACTIVE')
                    throw new ConflictException('Bàn ngừng sử dụng');
                if (await tx.sale.findFirst({ where: { tableId, status: { in: ['DRAFT', 'CONFIRMED'] }, ...(existingId ? { id: { not: existingId } } : {}) } }))
                    throw new ConflictException('Bàn đang có đơn phục vụ');
            }
            if (!current && !requested.length)
                throw new BadRequestException('Chọn ít nhất một món');
            const products = await tx.product.findMany({ where: { id: { in: requested.map(l => l.productId) }, status: 'ACTIVE' } });
            const lines = requested.map(l => {
                const previous = l.id ? current?.lines.find(x => x.id === l.id) : undefined;
                if (l.id && (!previous || previous.sentAt || previous.productId !== l.productId))
                    throw new ConflictException('Không được sửa món đã gửi hoặc thay tham chiếu dòng món');
                const p = products.find(p => p.id === l.productId);
                if (!p)
                    throw new BadRequestException('Món không tồn tại hoặc ngừng bán');
                return { ...l, productName: previous?.productName ?? p.name, unitPrice: previous?.unitPrice ?? p.sellingPrice };
            });
            const sent = current?.lines.filter(l => l.sentAt) || [];
            if (sent.length + lines.length === 0 || sent.length + lines.length > 300)
                throw new BadRequestException('Đơn cần 1–300 dòng món');
            if (total([...sent, ...lines]).gt('9999999999999999.99'))
                throw new BadRequestException('Tổng tiền vượt giới hạn');
            if (current) {
                await tx.saleLine.deleteMany({ where: { saleId: current.id, sentAt: null, id: { notIn: lines.flatMap(l => l.id ? [l.id] : []) } } });
                for (const l of lines) {
                    const { id, ...fields } = l;
                    if (id)
                        await tx.saleLine.update({ where: { id }, data: fields });
                    else
                        await tx.saleLine.create({ data: { ...fields, saleId: current.id } });
                }
                return serialized(await tx.sale.update({ where: { id: current.id }, data: { version: { increment: 1 } }, include }));
            }
            return serialized(await tx.sale.create({ data: { code: 'DB-' + randomUUID().replaceAll('-', '').slice(0, 16).toUpperCase(), tableId, createdById: employee.id, lines: { create: lines.map(({ id, ...l }) => l) } }, include }));
        });
    }
    async changeLine(saleId, input, user) {
        const b = object(input), lineId = uuid(b.lineId), amount = quantity(b.quantity);
        if (typeof b.reason !== 'string' || !b.reason.trim() || b.reason.length > 500)
            throw new BadRequestException('Cần lý do thay đổi, tối đa 500 ký tự');
        const reason = b.reason.trim();
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            const sale = await tx.sale.findUniqueOrThrow({ where: { id: uuid(saleId) }, include });
            if (sale.status !== 'CONFIRMED' || sale.payment || sale.version !== b.version)
                throw new ConflictException('Đơn đã đóng hoặc đã thay đổi; mở lại để cập nhật');
            const line = sale.lines.find(l => l.id === lineId);
            if (!line?.sentAt)
                throw new BadRequestException('Chỉ đổi/hủy món đã gửi');
            const exported = Prisma.Decimal.sum(0, ...sale.exports.filter(e => e.status === 'APPROVED').flatMap(e => e.lines.filter(l => l.saleLineId === lineId).map(l => l.exportedQuantity || 0)));
            const served = Prisma.Decimal.sum(0, ...line.servings.map(v => v.quantity));
            if (amount.gt(line.quantity.minus(Prisma.Decimal.max(exported, served))))
                throw new ConflictException('Chỉ hủy/đổi phần chưa ra món. Phần đã làm cần xử lý hao hụt/miễn phí riêng');
            if (line.replenishments.some(r => r.status === 'LINKED' && r.productionOrder && !['COMPLETED', 'CANCELLED'].includes(r.productionOrder.status)))
                throw new ConflictException('Có lệnh bổ sung đang chạy; xử lý lệnh trước');
            if (sale.exports.some(e => e.status === 'PENDING' && e.lines.some(l => l.saleLineId === lineId)))
                throw new ConflictException('Xử lý phiếu xuất chờ duyệt trước khi đổi/hủy');
            let replacementLineId = null;
            if (b.productId) {
                const product = await tx.product.findUniqueOrThrow({ where: { id: uuid(b.productId) } });
                if (product.status !== 'ACTIVE')
                    throw new BadRequestException('Món thay thế đã ngừng bán');
                const replacementAmount = quantity(b.replacementQuantity);
                if (total(sale.lines).minus(line.unitPrice.mul(amount)).plus(product.sellingPrice.mul(replacementAmount)).gt('9999999999999999.99'))
                    throw new BadRequestException('Tổng tiền vượt giới hạn');
                const replacement = await tx.saleLine.create({ data: { saleId: sale.id, productId: product.id, productName: product.name, unitPrice: product.sellingPrice, quantity: replacementAmount, sentAt: new Date(), sentById: employee.id, batch: Math.max(0, ...sale.lines.map(l => l.batch || 0)) + 1, note: 'Đổi món: ' + reason } });
                replacementLineId = replacement.id;
            }
            await tx.saleLineChange.create({ data: { saleLineId: lineId, previousQuantity: line.quantity, quantity: amount, reason, changedById: employee.id, replacementLineId } });
            await tx.saleLine.update({ where: { id: lineId }, data: { quantity: line.quantity.minus(amount) } });
            await tx.replenishmentRequest.updateMany({ where: { saleLineId: lineId, status: 'PENDING' }, data: { status: 'CANCELLED', note: 'Thay đổi món: ' + reason } });
            return serialized(await tx.sale.update({ where: { id: sale.id }, data: { version: { increment: 1 } }, include }));
        });
    }
    async serve(saleId, input, user) {
        const b = object(input), lineId = uuid(b.lineId), amount = quantity(b.quantity);
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            const sale = await tx.sale.findUniqueOrThrow({ where: { id: uuid(saleId) }, include });
            if (sale.status !== 'CONFIRMED' || b.version !== sale.version)
                throw new ConflictException('Đơn đã thay đổi hoặc đã đóng; mở lại để cập nhật');
            const line = sale.lines.find(l => l.id === lineId);
            if (!line?.sentAt)
                throw new BadRequestException('Món chưa gửi hoặc không thuộc đơn');
            const exported = Prisma.Decimal.sum(0, ...sale.exports.filter(e => e.status === 'APPROVED').flatMap(e => e.lines.filter(l => l.saleLineId === lineId).map(l => l.exportedQuantity || 0)));
            const served = Prisma.Decimal.sum(0, ...line.servings.map(v => v.quantity));
            if (served.plus(amount).gt(exported) || served.plus(amount).gt(line.quantity))
                throw new ConflictException('Chỉ ghi phục vụ trong lượng đã xuất và chưa phục vụ');
            await tx.serving.create({ data: { saleLineId: lineId, servedById: employee.id, quantity: amount } });
            return serialized(await tx.sale.update({ where: { id: sale.id }, data: { version: { increment: 1 } }, include }));
        });
    }
    async replenish(saleId, input, user) {
        const b = object(input), lineId = uuid(b.lineId), amount = quantity(b.quantity);
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            const sale = await tx.sale.findUniqueOrThrow({ where: { id: uuid(saleId) }, include });
            if (sale.status !== 'CONFIRMED')
                throw new ConflictException('Đơn không còn phục vụ');
            const line = sale.lines.find(l => l.id === lineId);
            if (!line?.sentAt || amount.gt(line.quantity))
                throw new BadRequestException('Số lượng bổ sung không hợp lệ');
            const moves = await tx.productMovement.findMany({ where: { productId: line.productId } });
            let ready = Prisma.Decimal.max(0, moves.reduce((q, m) => m.movementType === 'NHAP_SAN_XUAT' ? q.plus(m.quantity) : q.minus(m.quantity), new Prisma.Decimal(0)));
            const demand = await tx.saleLine.findMany({ where: { productId: line.productId, sentAt: { not: null }, sale: { status: 'CONFIRMED' } }, orderBy: [{ sentAt: 'asc' }, { id: 'asc' }], include: { exportLines: { include: { export: true } } } });
            let missing = new Prisma.Decimal(0);
            for (const l of demand) {
                const exported = Prisma.Decimal.sum(0, ...l.exportLines.filter(e => e.export.status === 'APPROVED').map(e => e.exportedQuantity || 0));
                const needed = Prisma.Decimal.max(0, l.quantity.minus(exported)), allocated = Prisma.Decimal.min(ready, needed);
                ready = ready.minus(allocated);
                if (l.id === lineId)
                    missing = needed.minus(allocated);
            }
            if (!missing.gt(0) || !amount.eq(missing))
                throw new ConflictException('Lượng thiếu đã thay đổi; cập nhật tồn rồi yêu cầu lại');
            if (line.replenishments.some(r => r.status === 'PENDING' || r.status === 'LINKED' && r.productionOrder && !['CANCELLED', 'COMPLETED'].includes(r.productionOrder.status)))
                throw new ConflictException('Đã có yêu cầu bổ sung đang xử lý cho dòng này');
            await tx.replenishmentRequest.create({ data: { saleLineId: lineId, quantity: amount, requestedById: employee.id } });
            return serialized(await tx.sale.update({ where: { id: sale.id }, data: { version: { increment: 1 } }, include }));
        });
    }
    async areas() { return this.db.diningArea.findMany({ orderBy: { name: 'asc' } }); }
    async saveArea(input, oldName) {
        const b = object(input);
        if (typeof b.name !== 'string' || !b.name.trim() || b.name.length > 60)
            throw new BadRequestException('Tên khu vực cần 1–60 ký tự');
        const name = b.name.trim(), columns = Number(b.columns ?? 8), rows = Number(b.rows ?? 4), color = String(b.color ?? '#42688b');
        if (!Number.isInteger(columns) || columns < 2 || columns > 16 || !Number.isInteger(rows) || rows < 2 || rows > 100 || !/^#[0-9a-f]{6}$/i.test(color))
            throw new BadRequestException('Sơ đồ cần 2–16 cột, 2–100 hàng và mã màu hợp lệ');
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            if (name !== oldName && await tx.diningArea.findUnique({ where: { name } }))
                throw new ConflictException('Tên khu vực đã tồn tại');
            if (oldName && await tx.diningTable.findFirst({ where: { area: oldName, OR: [{ x: { gte: columns } }, { y: { gte: rows } }] } }))
                throw new ConflictException('Có bàn nằm ngoài kích thước mới. Di chuyển bàn trước khi thu nhỏ');
            return oldName ? tx.diningArea.update({ where: { name: oldName }, data: { name, columns, rows, color } }) : tx.diningArea.create({ data: { name, columns, rows, color } });
        });
    }
    async deleteArea(name) {
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            if (await tx.diningTable.count({ where: { area: name } }))
                throw new ConflictException('Chuyển hoặc xóa các bàn trước khi xóa khu vực');
            return tx.diningArea.delete({ where: { name } });
        });
    }
    async deleteTable(id) {
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            if (await tx.sale.count({ where: { tableId: uuid(id) } }))
                throw new ConflictException('Bàn đã có lịch sử đơn; hãy ngừng sử dụng thay vì xóa');
            return tx.diningTable.delete({ where: { id } });
        });
    }
    async ready(saleId, input, user) {
        const b = object(input), lineId = uuid(b.lineId), amount = quantity(b.quantity);
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            const sale = await tx.sale.findUniqueOrThrow({ where: { id: uuid(saleId) }, include });
            if (sale.status !== 'CONFIRMED' || b.version !== sale.version)
                throw new ConflictException('Đơn đã thay đổi; cập nhật lại');
            const line = sale.lines.find(l => l.id === lineId);
            if (!line?.sentAt)
                throw new BadRequestException('Món chưa gửi');
            const exported = Prisma.Decimal.sum(0, ...sale.exports.filter(e => e.status === 'APPROVED').flatMap(e => e.lines.filter(l => l.saleLineId === lineId).map(l => l.exportedQuantity || 0)));
            if (exported.plus(amount).gt(line.quantity))
                throw new ConflictException('Vượt số lượng còn cần chuẩn bị');
            if (sale.exports.some(e => e.status === 'PENDING' && e.lines.some(l => l.saleLineId === lineId)))
                throw new ConflictException('Có phiếu xuất cũ chờ kho duyệt; xử lý phiếu đó trước');
            const moves = await tx.productMovement.findMany({ where: { productId: line.productId } });
            const stock = moves.reduce((q, m) => m.movementType === 'NHAP_SAN_XUAT' ? q.plus(m.quantity) : q.minus(m.quantity), new Prisma.Decimal(0));
            const pending = await tx.productExportLine.findMany({ where: { saleLine: { productId: line.productId }, export: { status: 'PENDING' } } });
            if (line.product.status !== 'ACTIVE' || stock.minus(Prisma.Decimal.sum(0, ...pending.map(l => l.requestedQuantity))).lt(amount))
                throw new ConflictException('Chưa đủ thành phẩm sẵn. Báo quản lý yêu cầu bổ sung');
            const doc = await tx.productExport.create({ data: { saleId: sale.id, requestedById: employee.id, reviewedById: employee.id, approvedAt: new Date(), status: 'APPROVED', reason: 'Ra món theo đơn ' + sale.code, lines: { create: { saleLineId: lineId, requestedQuantity: amount, exportedQuantity: amount } } }, include: { lines: true } });
            await tx.productMovement.create({ data: { productId: line.productId, quantity: amount, movementType: 'XUAT_BAN', exportLineId: doc.lines[0].id } });
            return serialized(await tx.sale.update({ where: { id: sale.id }, data: { version: { increment: 1 } }, include }));
        });
    }
    async tables() { return this.db.diningTable.findMany({ orderBy: [{ area: 'asc' }, { name: 'asc' }] }); }
    async saveTable(input, tableId) {
        const b = object(input);
        if (typeof b.name !== 'string' || !b.name.trim() || b.name.length > 60 || typeof b.area !== 'string' || b.area.length > 60 || !['ACTIVE', 'INACTIVE'].includes(String(b.status)))
            throw new BadRequestException('Tên/khu vực tối đa 60 ký tự; trạng thái không hợp lệ');
        const name = b.name.trim(), area = b.area.trim() || 'Chung', status = String(b.status);
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            if (tableId && b.status === 'INACTIVE' && await tx.sale.findFirst({ where: { tableId: uuid(tableId), status: { in: ['DRAFT', 'CONFIRMED'] } } }))
                throw new ConflictException('Bàn đang phục vụ, không thể ngừng sử dụng');
            if (await tx.diningTable.findFirst({ where: { name, ...(tableId ? { id: { not: uuid(tableId) } } : {}) } }))
                throw new ConflictException('Tên bàn đã tồn tại');
            const floor = await tx.diningArea.findUnique({ where: { name: area } });
            if (!floor)
                throw new BadRequestException('Chọn khu vực có sẵn');
            const existing = tableId ? await tx.diningTable.findUniqueOrThrow({ where: { id: tableId } }) : null;
            const others = await tx.diningTable.findMany({ where: { area, ...(tableId ? { id: { not: tableId } } : {}) } });
            let x = b.x === undefined ? existing?.area === area ? existing.x : undefined : Number(b.x);
            let y = b.y === undefined ? existing?.area === area ? existing.y : undefined : Number(b.y);
            if (x === undefined || y === undefined) {
                let pos = 0;
                while (others.some(t => t.x === pos % floor.columns && t.y === Math.floor(pos / floor.columns)))
                    pos++;
                x = pos % floor.columns;
                y = Math.floor(pos / floor.columns);
            }
            if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || x >= floor.columns || y < 0 || y >= floor.rows)
                throw new BadRequestException('Vị trí ngoài sơ đồ');
            if (others.some(t => t.x === x && t.y === y))
                throw new ConflictException('Vị trí đã có bàn');
            const data = { name, area, status, x, y };
            return tableId ? tx.diningTable.update({ where: { id: uuid(tableId) }, data }) : tx.diningTable.create({ data });
        });
    }
    async send(saleId, input, user) {
        const b = object(input);
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const sale = await tx.sale.findUniqueOrThrow({ where: { id: uuid(saleId) }, include });
            if (!['DRAFT', 'CONFIRMED'].includes(sale.status))
                throw new ConflictException('Đơn đã đóng');
            const draft = sale.lines.filter(l => !l.sentAt);
            if (!draft.length)
                return serialized(sale);
            if (b.version !== sale.version)
                throw new ConflictException('Đơn đã thay đổi, mở lại đơn trước khi gửi món');
            const sender = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!sender || sender.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            if (draft.some(l => l.product.status !== 'ACTIVE'))
                throw new ConflictException('Có món ngừng bán');
            const batch = Math.max(0, ...sale.lines.map(l => l.batch || 0)) + 1;
            await tx.saleLine.updateMany({ where: { saleId, sentAt: null }, data: { sentAt: new Date(), batch, sentById: sender.id } });
            return serialized(await tx.sale.update({ where: { id: saleId }, data: { status: 'CONFIRMED', version: { increment: 1 } }, include }));
        });
    }
    async action(saleId, action, input, user) {
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const sale = await tx.sale.findUniqueOrThrow({ where: { id: uuid(saleId) }, include });
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            if (action === 'confirm') {
                if (sale.status !== 'DRAFT' || !sale.lines.length)
                    throw new ConflictException('Chỉ xác nhận đơn nháp có thành phẩm');
                if (sale.lines.some(l => l.product.status !== 'ACTIVE'))
                    throw new BadRequestException('Đơn có thành phẩm ngừng bán');
                await tx.saleLine.updateMany({ where: { saleId: sale.id, sentAt: null }, data: { sentAt: new Date(), batch: 1, sentById: employee.id } });
                return serialized(await tx.sale.update({ where: { id: sale.id }, data: { status: 'CONFIRMED', version: { increment: 1 } }, include }));
            }
            if (action === 'cancel') {
                const b = object(input);
                if (typeof b.reason !== 'string' || !b.reason.trim() || b.reason.length > 500 || b.version !== sale.version)
                    throw new ConflictException('Cần lý do hủy và phiên bản đơn hiện tại');
                const reason = b.reason.trim();
                if (sale.lines.some(l => l.replenishments.some(r => r.status === 'PENDING' || r.status === 'LINKED' && r.productionOrder && !['CANCELLED', 'COMPLETED'].includes(r.productionOrder.status))))
                    throw new ConflictException('Cần xử lý yêu cầu/lệnh bổ sung đang chạy trước khi hủy đơn');
                if (!['DRAFT', 'CONFIRMED'].includes(sale.status) || sale.payment || sale.exports.some(e => ['PENDING', 'APPROVED'].includes(e.status)))
                    throw new ConflictException('Chỉ hủy đơn chưa thanh toán và không có phiếu xuất chờ duyệt/đã xuất');
                for (const l of sale.lines.filter(l => l.quantity.gt(0))) {
                    await tx.saleLineChange.create({ data: { saleLineId: l.id, previousQuantity: l.quantity, quantity: l.quantity, reason, changedById: employee.id } });
                    await tx.saleLine.update({ where: { id: l.id }, data: { quantity: 0 } });
                }
                return serialized(await tx.sale.update({ where: { id: sale.id }, data: { status: 'CANCELLED', closedAt: new Date(), closedById: employee.id, version: { increment: 1 } }, include }));
            }
            const b = object(input);
            if (!['CASH', 'TRANSFER'].includes(String(b.method)))
                throw new BadRequestException('Chọn tiền mặt hoặc chuyển khoản');
            if (sale.status !== 'CONFIRMED' || sale.payment)
                throw new ConflictException('Đơn phải đã xác nhận và chưa thanh toán');
            if (sale.lines.some(l => !l.sentAt))
                throw new ConflictException('Còn món chưa gửi, cần xử lý trước thanh toán');
            if (b.version !== sale.version)
                throw new ConflictException('Hóa đơn đã thay đổi, kiểm tra lại trước khi thu tiền');
            if (total(sale.lines).lte(0))
                throw new BadRequestException('Đơn không còn món tính tiền; hãy đóng đơn không tính tiền');
            if (sale.lines.some(l => l.replenishments.some(r => r.status === 'PENDING' || r.status === 'LINKED' && r.productionOrder && !['CANCELLED', 'COMPLETED'].includes(r.productionOrder.status))))
                throw new ConflictException('Còn yêu cầu bổ sung đang xử lý; chốt kết quả trước khi tính tiền');
            if (sale.exports.some(e => e.status === 'PENDING'))
                throw new ConflictException('Xử lý phiếu xuất cũ đang chờ trước khi đóng đơn');
            const missing = sale.lines.map(l => ({ line: l, quantity: l.quantity.minus(Prisma.Decimal.sum(0, ...sale.exports.filter(e => e.status === 'APPROVED').flatMap(e => e.lines.filter(x => x.saleLineId === l.id).map(x => x.exportedQuantity || 0)))) }));
            if (missing.some(l => l.quantity.lt(0)))
                throw new ConflictException('Lượng đã xuất vượt hóa đơn, cần đối chiếu');
            const needs = missing.filter(l => l.quantity.gt(0));
            for (const productId of new Set(needs.map(l => l.line.productId))) {
                const moves = await tx.productMovement.findMany({ where: { productId } });
                const stock = moves.reduce((q, m) => m.movementType === 'NHAP_SAN_XUAT' ? q.plus(m.quantity) : q.minus(m.quantity), new Prisma.Decimal(0));
                const pending = await tx.productExportLine.findMany({ where: { saleLine: { productId }, export: { status: 'PENDING' } } });
                const needed = Prisma.Decimal.sum(0, ...needs.filter(l => l.line.productId === productId).map(l => l.quantity));
                if (stock.minus(Prisma.Decimal.sum(0, ...pending.map(l => l.requestedQuantity))).lt(needed))
                    throw new ConflictException('Tồn thành phẩm không khớp: bổ sung hoặc xử lý món không phục vụ trước khi chốt');
            }
            if (needs.length) {
                const doc = await tx.productExport.create({ data: { saleId: sale.id, status: 'APPROVED', requestedById: employee.id, reviewedById: employee.id, approvedAt: new Date(), reason: 'Chốt bán hàng ' + sale.code, lines: { create: needs.map(l => ({ saleLineId: l.line.id, requestedQuantity: l.quantity, exportedQuantity: l.quantity })) } }, include: { lines: true } });
                for (const l of doc.lines)
                    await tx.productMovement.create({ data: { productId: sale.lines.find(x => x.id === l.saleLineId).productId, quantity: l.exportedQuantity, movementType: 'XUAT_BAN', exportLineId: l.id } });
            }
            await tx.payment.create({ data: { saleId: sale.id, amount: total(sale.lines), receivedById: employee.id, method: String(b.method), status: 'PAID', paidAt: new Date() } });
            return serialized(await tx.sale.update({ where: { id: sale.id }, data: { status: 'COMPLETED', closedAt: new Date(), closedById: employee.id, version: { increment: 1 } }, include }));
        });
    }
};
SalesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], SalesService);
export { SalesService };
//# sourceMappingURL=sales.service.js.map
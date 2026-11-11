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
import { productAvailability } from '../inventory/product-availability.js';
const include = { table: true, createdBy: { select: { id: true, name: true } }, lines: { orderBy: { id: 'asc' }, include: { lotMovements: { include: { lot: { select: { code: true, expiryDate: true } } } }, changes: { include: { changedBy: { select: { name: true } } } }, replenishments: { orderBy: { requestedAt: 'desc' }, include: { productionOrder: { select: { id: true, status: true, dueAt: true, assignedTo: { select: { name: true, accountId: true } }, assignedBy: { select: { name: true } }, runs: { select: { status: true, actualQuantity: true, acceptedQuantity: true } } } } } }, product: { include: { unit: true } } } }, payment: true, exports: { include: { requestedBy: { select: { name: true } }, reviewedBy: { select: { name: true } }, lines: true }, orderBy: { requestedAt: 'desc' } } };
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
            const products = await tx.product.findMany({ where: { status: 'ACTIVE', sellingPrice: { gt: 0 } }, include: { unit: true, category: true }, orderBy: { code: 'asc' } });
            return Promise.all(products.map(async (p) => ({ ...p, ...await productAvailability(tx, p.id) })));
        }, { isolationLevel: 'RepeatableRead', timeout: 15000 });
    }
    priceProducts() { return this.db.product.findMany({ include: { unit: true, category: true }, orderBy: { name: 'asc' } }); }
    async salesReport(start, end, method) {
        const day = (v) => { const d = new Date(v + 'T00:00:00+07:00'); if (!/^\d{4}-\d{2}-\d{2}$/.test(v || '') || !Number.isFinite(d.getTime()) || new Date(d.getTime() + 25200000).toISOString().slice(0, 10) !== v)
            throw new BadRequestException('Ngày báo cáo không hợp lệ'); return d; };
        const from = day(start), until = new Date(day(end).getTime() + 86400000), days = Math.round((until.getTime() - from.getTime()) / 86400000);
        if (days < 1 || days > 1096)
            throw new BadRequestException('Chọn khoảng báo cáo từ 1 đến 1096 ngày');
        if (method && !['CASH', 'TRANSFER'].includes(method))
            throw new BadRequestException('Phương thức không hợp lệ');
        const sales = await this.db.sale.findMany({ where: { status: 'COMPLETED', payment: { status: 'PAID', paidAt: { gte: from, lt: until }, ...(method ? { method } : {}) } }, include: { payment: true, table: true, createdBy: { select: { name: true } }, lines: { include: { product: { include: { unit: true, category: true } } } } }, orderBy: { payment: { paidAt: 'desc' } } });
        const items = new Map();
        const buckets = new Map();
        const keyOf = (d) => new Date(d.getTime() + 25200000).toISOString().slice(0, days === 1 ? 13 : days <= 62 ? 10 : 7);
        if (days === 1)
            for (let h = 0; h < 24; h++) {
                const key = start + 'T' + String(h).padStart(2, '0');
                buckets.set(key, { key, paid: new Prisma.Decimal(0), orders: 0 });
            }
        else
            for (let at = from.getTime(); at < until.getTime(); at += 86400000) {
                const key = keyOf(new Date(at));
                if (!buckets.has(key))
                    buckets.set(key, { key, paid: new Prisma.Decimal(0), orders: 0 });
            }
        for (const s of sales) {
            const point = buckets.get(keyOf(s.payment.paidAt));
            point.paid = point.paid.plus(s.payment.amount);
            point.orders++;
            for (const l of s.lines.filter(l => l.quantity.gt(0))) {
                const p = items.get(l.productId) || { id: l.productId, name: l.productName, category: l.product.category.name, unit: l.product.unit.symbol, quantity: new Prisma.Decimal(0), revenue: new Prisma.Decimal(0) };
                p.quantity = p.quantity.plus(l.quantity);
                p.revenue = p.revenue.plus(l.quantity.mul(l.unitPrice));
                items.set(p.id, p);
            }
        }
        const paid = (m) => Prisma.Decimal.sum(0, ...sales.filter(s => !m || s.payment.method === m).map(s => s.payment.amount));
        return { start, end, method: method || '', orders: sales.length, paid: paid(), average: sales.length ? paid().div(sales.length).toDecimalPlaces(2) : new Prisma.Decimal(0), cash: paid('CASH'), transfer: paid('TRANSFER'), granularity: days === 1 ? 'hour' : days <= 62 ? 'day' : 'month', trend: [...buckets.values()], products: [...items.values()].sort((a, b) => b.revenue.cmp(a.revenue)), sales: sales.map(s => ({ id: s.id, code: s.code, table: s.table?.name || 'Mang đi', paidAt: s.payment.paidAt, method: s.payment.method, total: s.payment.amount, createdBy: s.createdBy.name, productIds: [...new Set(s.lines.filter(l => l.quantity.gt(0)).map(l => l.productId))] })) };
    }
    async setPrice(productId, input) {
        const b = object(input);
        if (!['string', 'number'].includes(typeof b.price) || !/^\d{1,16}(\.\d{1,2})?$/.test(String(b.price)) || new Prisma.Decimal(String(b.price)).lte(0))
            throw new BadRequestException('Giá bán phải lớn hơn 0, tối đa 2 chữ số lẻ');
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            return tx.product.update({ where: { id: uuid(productId) }, data: { sellingPrice: new Prisma.Decimal(String(b.price)) }, select: { id: true, sellingPrice: true } });
        });
    }
    async list() { return (await this.db.sale.findMany({ include, orderBy: { createdAt: 'desc' } })).map(serialized); }
    async save(input, user, existingId) {
        const b = object(input);
        if (b.confirm !== undefined && typeof b.confirm !== 'boolean')
            throw new BadRequestException('Trạng thái xác nhận không hợp lệ');
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
                if (!p || p.sellingPrice.lte(0))
                    throw new BadRequestException('Món ngừng bán hoặc chưa được quản lý thiết lập giá bán');
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
                const updated = await tx.sale.update({ where: { id: current.id }, data: { version: { increment: 1 } }, include });
                return serialized(b.confirm ? await this.confirmLines(tx, updated, employee.id) : updated);
            }
            const created = await tx.sale.create({ data: { code: 'DB-' + randomUUID().replaceAll('-', '').slice(0, 16).toUpperCase(), tableId, createdById: employee.id, lines: { create: lines.map(({ id: _id, ...l }) => l) } }, include });
            return serialized(b.confirm ? await this.confirmLines(tx, created, employee.id) : created);
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
            if (amount.gt(line.quantity.minus(exported)))
                throw new ConflictException('Số lượng giảm vượt lượng món còn trên đơn');
            if (line.replenishments.some(r => r.status === 'LINKED' && r.productionOrder && !['COMPLETED', 'CANCELLED'].includes(r.productionOrder.status)))
                throw new ConflictException('Có lệnh bổ sung đang chạy; xử lý lệnh trước');
            if (sale.exports.some(e => e.status === 'PENDING' && e.lines.some(l => l.saleLineId === lineId)))
                throw new ConflictException('Xử lý phiếu xuất chờ duyệt trước khi đổi/hủy');
            let replacementLineId = null;
            if (b.productId) {
                const product = await tx.product.findUniqueOrThrow({ where: { id: uuid(b.productId) } });
                if (product.status !== 'ACTIVE' || product.sellingPrice.lte(0))
                    throw new BadRequestException('Món thay thế ngừng bán hoặc chưa thiết lập giá');
                const replacementAmount = quantity(b.replacementQuantity);
                if (total(sale.lines).minus(line.unitPrice.mul(amount)).plus(product.sellingPrice.mul(replacementAmount)).gt('9999999999999999.99'))
                    throw new BadRequestException('Tổng tiền vượt giới hạn');
                const replacement = await tx.saleLine.create({ data: { saleId: sale.id, productId: product.id, productName: product.name, unitPrice: product.sellingPrice, quantity: replacementAmount, sentAt: new Date(), sentById: employee.id, batch: Math.max(0, ...sale.lines.map(l => l.batch || 0)) + 1, note: 'Đổi món: ' + reason } });
                replacementLineId = replacement.id;
            }
            await tx.saleLineChange.create({ data: { saleLineId: lineId, previousQuantity: line.quantity, quantity: amount, reason, changedById: employee.id, replacementLineId } });
            await tx.saleLine.update({ where: { id: lineId }, data: { quantity: line.quantity.minus(amount) } });
            await tx.replenishmentRequest.updateMany({ where: { saleLineId: lineId, status: 'PENDING' }, data: { status: 'CANCELLED', note: 'Thay đổi món: ' + reason } });
            if (replacementLineId) {
                const replacement = await tx.saleLine.findUniqueOrThrow({ where: { id: replacementLineId } });
                const allocation = (await productAvailability(tx, replacement.productId)).allocations.find(a => a.lineId === replacement.id);
                if (!allocation || allocation.missing.gt(0))
                    throw new ConflictException('Cửa hàng không đủ món thay thế; chọn giảm số lượng hoặc món khác');
            }
            return serialized(await tx.sale.update({ where: { id: sale.id }, data: { version: { increment: 1 } }, include }));
        });
    }
    async areas() { return this.db.diningArea.findMany({ orderBy: { name: 'asc' } }); }
    async saveArea(input, oldName) {
        const b = object(input);
        if (typeof b.name !== 'string' || !b.name.trim() || b.name.length > 60)
            throw new BadRequestException('Tên khu vực cần 1–60 ký tự');
        if (b.color != null && typeof b.color !== 'string')
            throw new BadRequestException('Màu khu vực không hợp lệ');
        const name = b.name.trim(), columns = Number(b.columns ?? 8), rows = Number(b.rows ?? 4), color = b.color ?? '#42688b';
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
    async confirmLines(tx, sale, employeeId) {
        if (!['DRAFT', 'CONFIRMED'].includes(sale.status) || sale.payment)
            throw new ConflictException('Đơn đã đóng');
        if (sale.exports.some(e => ['PENDING', 'APPROVED'].includes(e.status)))
            throw new ConflictException('Đơn đang dùng chứng từ xuất bán cũ; dùng đơn mới cho luồng cửa hàng');
        const draft = sale.lines.filter(l => !l.sentAt);
        if (!draft.length)
            return sale;
        if (draft.some(l => l.product.status !== 'ACTIVE'))
            throw new ConflictException('Có món đã ngừng bán; bỏ món này khỏi phần đang chọn');
        const batch = Math.max(0, ...sale.lines.map(l => l.batch || 0)) + 1;
        await tx.saleLine.updateMany({ where: { saleId: sale.id, sentAt: null }, data: { sentAt: new Date(), batch, sentById: employeeId } });
        await tx.sale.update({ where: { id: sale.id }, data: { status: 'CONFIRMED' } });
        for (const productId of new Set(draft.map(l => l.productId))) {
            const availability = await productAvailability(tx, productId);
            if (draft.some(l => l.productId === productId && (!availability.allocations.find(a => a.lineId === l.id) || availability.allocations.find(a => a.lineId === l.id).missing.gt(0)))) {
                const productName = draft.find(l => l.productId === productId).productName;
                throw new ConflictException('Cửa hàng không đủ ' + productName + '. Đơn chưa được thay đổi; giảm số lượng hoặc chọn món khác');
            }
        }
        return tx.sale.update({ where: { id: sale.id }, data: { version: { increment: 1 } }, include });
    }
    async send(saleId, input, user) {
        const b = object(input);
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const sale = await tx.sale.findUniqueOrThrow({ where: { id: uuid(saleId) }, include });
            if (b.version !== sale.version)
                throw new ConflictException('Đơn đã thay đổi; tải lại trước khi xác nhận món');
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            return serialized(await this.confirmLines(tx, sale, employee.id));
        });
    }
    async action(saleId, action, input, user) {
        return this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT pg_advisory_xact_lock(8112028)::text`;
            const sale = await tx.sale.findUniqueOrThrow({ where: { id: uuid(saleId) }, include });
            const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
            if (!employee || employee.status !== 'ACTIVE')
                throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
            if (action === 'cancel') {
                const b = object(input);
                if (typeof b.reason !== 'string' || !b.reason.trim() || b.reason.length > 500 || b.version !== sale.version)
                    throw new ConflictException('Cần lý do hủy và phiên bản đơn hiện tại');
                const reason = b.reason.trim();
                if (sale.lines.some(l => l.replenishments.some(r => r.status === 'LINKED' && r.productionOrder && !['CANCELLED', 'COMPLETED'].includes(r.productionOrder.status))))
                    throw new ConflictException('Cần xử lý yêu cầu/lệnh bổ sung đang chạy trước khi hủy đơn');
                if (!['DRAFT', 'CONFIRMED'].includes(sale.status) || sale.payment || sale.exports.some(e => ['PENDING', 'APPROVED'].includes(e.status)))
                    throw new ConflictException('Chỉ hủy đơn chưa thanh toán và không có phiếu xuất chờ duyệt/đã xuất');
                await tx.replenishmentRequest.updateMany({ where: { saleLine: { saleId: sale.id }, status: 'PENDING' }, data: { status: 'CANCELLED', note: 'Hủy đơn: ' + reason } });
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
                throw new ConflictException('Còn món chưa xác nhận, cần xử lý trước thanh toán');
            if (b.version !== sale.version)
                throw new ConflictException('Hóa đơn đã thay đổi, kiểm tra lại trước khi thu tiền');
            if (total(sale.lines).lte(0))
                throw new BadRequestException('Đơn không còn món tính tiền; hãy đóng đơn không tính tiền');
            if (sale.exports.some(e => e.status === 'PENDING'))
                throw new ConflictException('Xử lý phiếu xuất cũ đang chờ trước khi đóng đơn');
            if (sale.exports.some(e => e.status === 'APPROVED'))
                throw new ConflictException('Đơn thuộc luồng xuất bán cũ. Không chuyển sang tồn cửa hàng tự động; dùng đơn mới để kiểm thử luồng mới');
            const byProduct = new Map();
            for (const productId of new Set(sale.lines.map(l => l.productId))) {
                const availability = await productAvailability(tx, productId);
                byProduct.set(productId, availability);
                if (sale.lines.some(l => l.productId === productId && l.quantity.gt(0) && (!availability.allocations.find(a => a.lineId === l.id) || availability.allocations.find(a => a.lineId === l.id).missing.gt(0))))
                    throw new ConflictException('Tồn cửa hàng không đủ cho đơn; đối chiếu trước khi thanh toán');
            }
            for (const line of sale.lines.filter(l => l.quantity.gt(0))) {
                await tx.storeMovement.create({ data: { productId: line.productId, quantity: line.quantity, movementType: 'SALE', saleLineId: line.id } });
                const allocation = byProduct.get(line.productId).allocations.find(a => a.lineId === line.id);
                await tx.productLotMovement.createMany({ data: allocation.lots.map(l => ({ lotId: l.lotId, location: 'STORE', quantity: l.quantity.negated(), saleLineId: line.id })) });
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
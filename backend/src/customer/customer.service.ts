import { randomUUID } from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { productAvailability } from '../inventory/product-availability.js';
import { vietnamDay } from '../inventory/expiry.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
import type { CustomerUser } from './customer-auth.service.js';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const orderInclude = {
  table: { select: { id: true, name: true, area: true, status: true } },
  customer: { select: { id: true, name: true, phone: true } },
  reviewedBy: { select: { id: true, name: true } },
  sale: { select: { id: true, code: true, status: true } },
  lines: {
    orderBy: { id: 'asc' as const },
    include: {
      product: {
        select: {
          id: true,
          code: true,
          imageUrl: true,
          unit: { select: { symbol: true } },
        },
      },
    },
  },
} as const;

type CustomerOrderRecord = Prisma.CustomerOrderGetPayload<{ include: typeof orderInclude }>;

function asObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new BadRequestException('Dữ liệu không hợp lệ');
  }
  return value as Record<string, unknown>;
}

function asUuid(value: unknown, label = 'ID'): string {
  if (typeof value !== 'string' || !UUID_REGEX.test(value.trim())) {
    throw new BadRequestException(`${label} không hợp lệ`);
  }
  return value.trim();
}

function asQuantity(value: unknown): Prisma.Decimal {
  if (
    (typeof value !== 'string' && typeof value !== 'number') ||
    !/^\d{1,15}(\.\d{1,3})?$/.test(String(value))
  ) {
    throw new BadRequestException('Số lượng không hợp lệ (tối đa 3 chữ số lẻ)');
  }
  const qty = new Prisma.Decimal(String(value));
  if (qty.lte(0)) {
    throw new BadRequestException('Số lượng phải lớn hơn 0');
  }
  return qty;
}

function asOptionalText(value: unknown, label: string, max: number): string | null {
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value !== 'string') {
    throw new BadRequestException(`${label} không hợp lệ`);
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.length > max) {
    throw new BadRequestException(`${label} tối đa ${max} ký tự`);
  }
  return trimmed;
}

/**
 * Quy đổi trạng thái hiển thị cho Customer Web / Mobile App theo 4 bước rõ ràng:
 * PENDING -> CONFIRMED -> COMPLETED (hoặc REJECTED / CANCELLED).
 */
export function computeTrackingStatus(order: {
  status: string;
  sale?: { status: string } | null;
}): { trackingStatus: string; trackingLabel: string } {
  if (order.status === 'PENDING') {
    return { trackingStatus: 'PENDING', trackingLabel: 'Chờ nhà hàng xác nhận' };
  }
  if (order.status === 'REJECTED') {
    return { trackingStatus: 'REJECTED', trackingLabel: 'Nhà hàng đã từ chối' };
  }
  if (order.status === 'APPROVED') {
    if (order.sale?.status === 'COMPLETED') {
      return { trackingStatus: 'COMPLETED', trackingLabel: 'Đã hoàn tất' };
    }
    if (order.sale?.status === 'CANCELLED') {
      return { trackingStatus: 'CANCELLED', trackingLabel: 'Đơn đã hủy' };
    }
    return { trackingStatus: 'CONFIRMED', trackingLabel: 'Đã xác nhận, đang phục vụ' };
  }
  return { trackingStatus: order.status, trackingLabel: order.status };
}

function calculateOrderTotal(lines: { quantity: Prisma.Decimal; unitPrice: Prisma.Decimal }[]) {
  return Prisma.Decimal.sum(0, ...lines.map(l => l.quantity.mul(l.unitPrice))).toDecimalPlaces(2);
}

function formatOrder(order: CustomerOrderRecord) {
  const { trackingStatus, trackingLabel } = computeTrackingStatus(order);
  return {
    id: order.id,
    code: order.code,
    orderType: order.tableId ? 'DINE_IN' : 'TAKEAWAY',
    status: order.status,
    trackingStatus,
    trackingLabel,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    note: order.note,
    rejectReason: order.rejectReason,
    createdAt: order.createdAt,
    reviewedAt: order.reviewedAt,
    table: order.table
      ? { id: order.table.id, code: order.table.name, name: order.table.name, area: order.table.area }
      : null,
    customer: order.customer,
    saleCode: order.sale?.code ?? null,
    saleStatus: order.sale?.status ?? null,
    reviewedBy: order.reviewedBy?.name ?? null,
    total: calculateOrderTotal(order.lines),
    lines: order.lines.map(line => ({
      id: line.id,
      productId: line.productId,
      productCode: line.product.code,
      productName: line.productName,
      imageUrl: line.product.imageUrl,
      unitSymbol: line.product.unit.symbol,
      quantity: line.quantity,
      unitPrice: line.unitPrice,
      lineTotal: line.quantity.mul(line.unitPrice).toDecimalPlaces(2),
      note: line.note,
    })),
  };
}

@Injectable()
export class CustomerService {
  constructor(private readonly db: PrismaService) {}

  /** 1. Danh mục món ăn đang mở bán */
  async listCategories() {
    const categories = await this.db.category.findMany({
      where: { objectType: 'PRODUCT' },
      include: {
        _count: {
          select: {
            products: { where: { status: 'ACTIVE', sellingPrice: { gt: 0 } } },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return categories.map(c => ({
      id: c.id,
      name: c.name,
      productCount: c._count.products,
    }));
  }

  /** 2. Danh sách món ăn cho khách (lọc theo danh mục, từ khóa tìm kiếm, kèm tồn còn bán được) */
  async listProducts(query: { categoryId?: string; q?: string }) {
    const categoryId = query.categoryId?.trim() ? asUuid(query.categoryId, 'Danh mục') : undefined;
    const search = query.q?.trim() || '';

    return this.db.$transaction(
      async tx => {
        const products = await tx.product.findMany({
          where: {
            status: 'ACTIVE',
            sellingPrice: { gt: 0 },
            ...(categoryId ? { categoryId } : {}),
            ...(search
              ? {
                  OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { code: { contains: search, mode: 'insensitive' } },
                  ],
                }
              : {}),
          },
          include: { unit: true, category: true },
          orderBy: { name: 'asc' },
        });

        return Promise.all(
          products.map(async p => {
            const availability = await productAvailability(tx, p.id);
            return {
              id: p.id,
              code: p.code,
              name: p.name,
              description: p.description,
              imageUrl: p.imageUrl,
              sellingPrice: p.sellingPrice,
              unit: { id: p.unit.id, name: p.unit.name, symbol: p.unit.symbol },
              category: { id: p.category.id, name: p.category.name },
              available: availability.available,
              inStock: availability.available.gt(0),
            };
          }),
        );
      },
      { isolationLevel: 'RepeatableRead', timeout: 15000 },
    );
  }

  /** 3. Chi tiết một món ăn */
  async getProduct(productId: string) {
    const id = asUuid(productId, 'Món ăn');

    return this.db.$transaction(
      async tx => {
        const product = await tx.product.findFirst({
          where: { id, status: 'ACTIVE', sellingPrice: { gt: 0 } },
          include: { unit: true, category: true },
        });
        if (!product) {
          throw new NotFoundException('Không tìm thấy món ăn');
        }
        const availability = await productAvailability(tx, product.id);
        return {
          id: product.id,
          code: product.code,
          name: product.name,
          description: product.description,
          imageUrl: product.imageUrl,
          sellingPrice: product.sellingPrice,
          unit: { id: product.unit.id, name: product.unit.name, symbol: product.unit.symbol },
          category: { id: product.category.id, name: product.category.name },
          available: availability.available,
          inStock: availability.available.gt(0),
        };
      },
      { isolationLevel: 'RepeatableRead', timeout: 15000 },
    );
  }

  /** 4. Kiểm tra mã bàn / QR bàn trước khi khách đặt món */
  async lookupTable(codeOrId: string) {
    const raw = typeof codeOrId === 'string' ? codeOrId.trim() : '';
    if (!raw || raw.length > 60) {
      throw new BadRequestException('Vui lòng nhập mã bàn hợp lệ');
    }

    const table = UUID_REGEX.test(raw)
      ? await this.db.diningTable.findUnique({ where: { id: raw } })
      : await this.db.diningTable.findFirst({
          where: { name: { equals: raw, mode: 'insensitive' } },
        });

    if (!table) {
      throw new NotFoundException('Không tìm thấy bàn');
    }
    if (table.status !== 'ACTIVE') {
      throw new ConflictException('Bàn này hiện ngừng phục vụ');
    }

    return {
      id: table.id,
      code: table.name,
      name: table.name,
      area: table.area,
      status: table.status,
    };
  }

  /**
   * 5. Khách gửi đơn đặt món (tạo phiếu PENDING, chưa giữ tồn kho ngay).
   * Phục vụ trên web-restaurant bấm Duyệt mới đổ vào Sale và giữ tồn kho.
   */
  async createOrder(input: unknown, customer: CustomerUser | null) {
    const b = asObject(input);
    if (!Array.isArray(b.items) || b.items.length < 1 || b.items.length > 50) {
      throw new BadRequestException('Giỏ hàng cần từ 1 đến 50 dòng món');
    }

    const requestedItems = b.items.map(raw => {
      const item = asObject(raw);
      return {
        productId: asUuid(item.productId, 'Món ăn'),
        quantity: asQuantity(item.quantity),
        note: asOptionalText(item.note, 'Ghi chú món', 300) ?? '',
      };
    });

    const tableIdInput = asOptionalText(b.tableId, 'ID bàn', 36);
    const tableCodeInput = asOptionalText(b.tableCode, 'Mã bàn', 60);
    const note = asOptionalText(b.note, 'Ghi chú đơn', 500) ?? '';
    const customerName = asOptionalText(b.customerName, 'Tên khách hàng', 100) ?? customer?.name ?? null;
    const customerPhone = asOptionalText(b.customerPhone, 'Số điện thoại', 20) ?? customer?.phone ?? null;

    if (!tableIdInput && !tableCodeInput && !customerName && !customerPhone) {
      throw new BadRequestException('Đơn mang đi cần nhập tên hoặc số điện thoại để nhân viên liên hệ');
    }

    return this.db.$transaction(async tx => {
      // Bước 1: Kiểm tra bàn ăn nếu khách đặt tại bàn
      let tableId: string | null = null;
      if (tableIdInput || tableCodeInput) {
        const table = tableIdInput
          ? await tx.diningTable.findUnique({ where: { id: asUuid(tableIdInput, 'ID bàn') } })
          : await tx.diningTable.findFirst({
              where: { name: { equals: tableCodeInput!, mode: 'insensitive' } },
            });
        if (!table) {
          throw new NotFoundException('Không tìm thấy bàn');
        }
        if (table.status !== 'ACTIVE') {
          throw new ConflictException('Bàn này hiện ngừng phục vụ');
        }
        tableId = table.id;
      }

      // Bước 2: Kiểm tra toàn bộ món khách chọn đều đang mở bán & có giá bán
      const distinctProductIds = [...new Set(requestedItems.map(i => i.productId))];
      const products = await tx.product.findMany({
        where: { id: { in: distinctProductIds }, status: 'ACTIVE', sellingPrice: { gt: 0 } },
        include: { unit: true },
      });

      const productMap = new Map(products.map(p => [p.id, p]));
      const totalByProduct = new Map<string, Prisma.Decimal>();
      for (const item of requestedItems) {
        if (!productMap.has(item.productId)) {
          throw new BadRequestException('Có món đã ngừng bán hoặc chưa thiết lập giá');
        }
        const currentTotal = totalByProduct.get(item.productId) ?? new Prisma.Decimal(0);
        totalByProduct.set(item.productId, currentTotal.plus(item.quantity));
      }

      // Bước 3: Kiểm tra sơ bộ lượng còn bán được tại cửa hàng (từ chối sớm nếu đã hết món)
      for (const [productId, requestedQty] of totalByProduct) {
        const availability = await productAvailability(tx, productId);
        if (requestedQty.gt(availability.available)) {
          const p = productMap.get(productId)!;
          throw new ConflictException(
            `Món ${p.name} hiện chỉ còn ${availability.available.toString()} ${p.unit.symbol} có thể bán`,
          );
        }
      }

      // Bước 4: Tạo mã đơn ngắn gọn dễ đọc để khách theo dõi trạng thái
      const dayCode = vietnamDay().replaceAll('-', '');
      const code = `KH-${dayCode}-${randomUUID().replaceAll('-', '').slice(0, 6).toUpperCase()}`;

      const created = await tx.customerOrder.create({
        data: {
          code,
          status: 'PENDING',
          tableId,
          customerId: customer?.id ?? null,
          customerName,
          customerPhone,
          note,
          lines: {
            create: requestedItems.map(item => {
              const p = productMap.get(item.productId)!;
              return {
                productId: p.id,
                productName: p.name,
                unitPrice: p.sellingPrice,
                quantity: item.quantity,
                note: item.note,
              };
            }),
          },
        },
        include: orderInclude,
      });

      return formatOrder(created);
    });
  }

  /** 6. Theo dõi trạng thái đơn theo mã đơn (Web/App polling mỗi 5–10s) */
  async getOrderByCode(code: string) {
    const normalized = typeof code === 'string' ? code.trim().toUpperCase() : '';
    if (!normalized || normalized.length > 40) {
      throw new BadRequestException('Mã đơn không hợp lệ');
    }

    const order = await this.db.customerOrder.findUnique({
      where: { code: normalized },
      include: orderInclude,
    });
    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn đặt món');
    }
    return formatOrder(order);
  }

  /** 7. Lịch sử đơn của khách hàng đã đăng nhập */
  async listCustomerOrders(customerId: string) {
    const orders = await this.db.customerOrder.findMany({
      where: { customerId },
      include: orderInclude,
      orderBy: { createdAt: 'desc' },
    });
    return orders.map(formatOrder);
  }

  /** 8. Danh sách đơn khách gửi cho màn hình Phục vụ (web-restaurant) */
  async listRestaurantOrders(status?: string) {
    const filter = status?.trim().toUpperCase();
    if (filter && !['PENDING', 'APPROVED', 'REJECTED'].includes(filter)) {
      throw new BadRequestException('Trạng thái lọc không hợp lệ');
    }

    const orders = await this.db.customerOrder.findMany({
      where: filter ? { status: filter } : {},
      include: orderInclude,
      orderBy: { createdAt: 'desc' },
    });

    // Đưa đơn PENDING (chờ duyệt) lên đầu để phục vụ thấy ngay
    const sorted = [...orders].sort((a, b) => {
      const rank = (s: string) => (s === 'PENDING' ? 0 : s === 'APPROVED' ? 1 : 2);
      return rank(a.status) - rank(b.status);
    });

    return sorted.map(formatOrder);
  }

  /**
   * 9. Phục vụ duyệt đơn khách -> đổ vào Sale (tạo mới hoặc gộp vào đơn đang mở của bàn) và giữ tồn kho.
   * Nếu tồn cửa hàng không còn đủ lúc duyệt, toàn bộ giao dịch tự rollback.
   */
  async approveOrder(orderId: string, user: AdminUser) {
    const id = asUuid(orderId, 'Đơn khách');

    return this.db.$transaction(async tx => {
      // Khóa giao dịch đồng bộ với luồng SalesService & StoreService
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112028)::text`;

      const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
      if (!employee || employee.status !== 'ACTIVE') {
        throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
      }

      const order = await tx.customerOrder.findUnique({
        where: { id },
        include: {
          table: true,
          lines: { include: { product: { include: { unit: true } } } },
        },
      });
      if (!order) {
        throw new NotFoundException('Không tìm thấy đơn khách');
      }
      if (order.status !== 'PENDING') {
        throw new ConflictException('Đơn khách đã được xử lý trước đó');
      }
      if (order.tableId && order.table?.status !== 'ACTIVE') {
        throw new ConflictException('Bàn đã ngừng sử dụng, không thể duyệt đơn');
      }

      for (const line of order.lines) {
        if (line.product.status !== 'ACTIVE' || line.product.sellingPrice.lte(0)) {
          throw new ConflictException(`Món ${line.productName} đã ngừng bán hoặc chưa có giá`);
        }
      }

      const now = new Date();
      let saleId: string;
      const newLineIds: string[] = [];

      // Kiểm tra bàn đã có đơn mở (DRAFT/CONFIRMED) chưa để gộp chung hóa đơn
      const existingSale = order.tableId
        ? await tx.sale.findFirst({
            where: { tableId: order.tableId, status: { in: ['DRAFT', 'CONFIRMED'] } },
            include: { lines: true, exports: true },
          })
        : null;

      if (existingSale) {
        if (existingSale.exports.some(e => ['PENDING', 'APPROVED'].includes(e.status))) {
          throw new ConflictException('Đơn tại bàn đang dùng chứng từ xuất bán cũ, không thể gộp');
        }
        if (existingSale.lines.length + order.lines.length > 300) {
          throw new ConflictException('Đơn tại bàn vượt quá 300 dòng món');
        }

        const nextBatch = Math.max(0, ...existingSale.lines.map(l => l.batch || 0)) + 1;
        for (const line of order.lines) {
          const createdLine = await tx.saleLine.create({
            data: {
              saleId: existingSale.id,
              productId: line.productId,
              productName: line.product.name,
              unitPrice: line.product.sellingPrice,
              quantity: line.quantity,
              note: line.note,
              sentAt: now,
              sentById: employee.id,
              batch: nextBatch,
            },
          });
          newLineIds.push(createdLine.id);
        }

        await tx.sale.update({
          where: { id: existingSale.id },
          data: { status: 'CONFIRMED', version: { increment: 1 } },
        });
        saleId = existingSale.id;
      } else {
        const createdSale = await tx.sale.create({
          data: {
            code: 'DB-' + randomUUID().replaceAll('-', '').slice(0, 16).toUpperCase(),
            tableId: order.tableId,
            createdById: employee.id,
            status: 'CONFIRMED',
            version: 1,
            lines: {
              create: order.lines.map(line => ({
                productId: line.productId,
                productName: line.product.name,
                unitPrice: line.product.sellingPrice,
                quantity: line.quantity,
                note: line.note,
                sentAt: now,
                sentById: employee.id,
                batch: 1,
              })),
            },
          },
          include: { lines: true },
        });
        saleId = createdSale.id;
        newLineIds.push(...createdSale.lines.map(l => l.id));
      }

      // Kiểm tra tồn còn bán được tại cửa hàng cho từng món vừa xác nhận (FEFO)
      for (const productId of new Set(order.lines.map(l => l.productId))) {
        const availability = await productAvailability(tx, productId);
        const shortageLine = order.lines.find(l => l.productId === productId);
        const missingForNewLines = newLineIds.some(lineId => {
          const matchingLine = availability.allocations.find(a => a.lineId === lineId);
          return matchingLine ? matchingLine.missing.gt(0) : false;
        });
        // Đảm bảo mọi dòng mới thuộc productId này đều được cấp đủ
        const relatedIds = new Set(newLineIds);
        const allocatedCount = availability.allocations.filter(a => relatedIds.has(a.lineId)).length;
        const expectedCount = order.lines.filter(l => l.productId === productId).length;
        if (missingForNewLines || allocatedCount < expectedCount) {
          throw new ConflictException(
            `Cửa hàng không đủ ${shortageLine?.productName ?? 'món'} để duyệt đơn khách. Kiểm tra lại tồn hoặc từ chối đơn`,
          );
        }
      }

      const updatedOrder = await tx.customerOrder.update({
        where: { id: order.id },
        data: {
          status: 'APPROVED',
          saleId,
          reviewedAt: now,
          reviewedById: employee.id,
        },
        include: orderInclude,
      });

      return formatOrder(updatedOrder);
    });
  }

  /** 10. Phục vụ từ chối đơn khách (bắt buộc ghi lý do để khách thấy trên Web/App) */
  async rejectOrder(orderId: string, input: unknown, user: AdminUser) {
    const id = asUuid(orderId, 'Đơn khách');
    const b = asObject(input);
    const reason = asOptionalText(b.reason, 'Lý do từ chối', 500);
    if (!reason) {
      throw new BadRequestException('Cần ghi lý do từ chối đơn khách');
    }

    return this.db.$transaction(async tx => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(8112028)::text`;

      const employee = await tx.employee.findUnique({ where: { accountId: user.id } });
      if (!employee || employee.status !== 'ACTIVE') {
        throw new ForbiddenException('Cần liên kết người sử dụng đang hoạt động');
      }

      const order = await tx.customerOrder.findUnique({ where: { id } });
      if (!order) {
        throw new NotFoundException('Không tìm thấy đơn khách');
      }
      if (order.status !== 'PENDING') {
        throw new ConflictException('Đơn khách đã được xử lý trước đó');
      }

      const updated = await tx.customerOrder.update({
        where: { id },
        data: {
          status: 'REJECTED',
          rejectReason: reason,
          reviewedAt: new Date(),
          reviewedById: employee.id,
        },
        include: orderInclude,
      });

      return formatOrder(updated);
    });
  }

  /** 11. Quản lý nhà hàng cập nhật mô tả và đường dẫn ảnh hiển thị cho khách */
  async updateProductMenuInfo(productId: string, input: unknown) {
    const id = asUuid(productId, 'Món ăn');
    const b = asObject(input);

    const hasDescription = Object.hasOwn(b, 'description');
    const hasImageUrl = Object.hasOwn(b, 'imageUrl');
    if (!hasDescription && !hasImageUrl) {
      throw new BadRequestException('Cần truyền mô tả hoặc đường dẫn ảnh để cập nhật');
    }

    const description = hasDescription ? asOptionalText(b.description, 'Mô tả món', 1000) : undefined;
    const imageUrl = hasImageUrl ? asOptionalText(b.imageUrl, 'Đường dẫn ảnh', 1000) : undefined;
    if (imageUrl && !/^(https?:\/\/|\/)/i.test(imageUrl)) {
      throw new BadRequestException('Đường dẫn ảnh phải bắt đầu bằng http://, https:// hoặc /');
    }

    const existing = await this.db.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Không tìm thấy món ăn');
    }

    return this.db.product.update({
      where: { id },
      data: {
        ...(hasDescription ? { description } : {}),
        ...(hasImageUrl ? { imageUrl } : {}),
      },
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        imageUrl: true,
      },
    });
  }
}

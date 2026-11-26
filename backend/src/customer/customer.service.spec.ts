import { BadRequestException, ConflictException } from '@nestjs/common';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Prisma } from '../generated/prisma/client.js';
import type { PrismaService } from '../prisma/prisma.service.js';
import * as availabilityModule from '../inventory/product-availability.js';
import { CustomerService, computeTrackingStatus } from './customer.service.js';

const TABLE_ID = '11111111-1111-4111-8111-111111111111';
const PRODUCT_ID = '22222222-2222-4222-8222-222222222222';
const ORDER_ID = '33333333-3333-4333-8333-333333333333';
const LINE_ID = '44444444-4444-4444-8444-444444444444';
const SALE_ID = '55555555-5555-4555-8555-555555555555';
const STAFF_USER = {
  id: '66666666-6666-4666-8666-666666666666',
  username: 'phucvu',
  name: 'Phục vụ A',
  roleName: 'Phục vụ',
  permissions: ['sale:create', 'sale:view'],
};

function makeAvailability(available: string, lineId = LINE_ID, missing = '0') {
  return {
    stock: new Prisma.Decimal(available),
    available: new Prisma.Decimal(available),
    held: new Prisma.Decimal(0),
    reserved: new Prisma.Decimal(0),
    shortage: new Prisma.Decimal(missing),
    expired: new Prisma.Decimal(0),
    untracked: new Prisma.Decimal(0),
    allocations: [
      {
        lineId,
        ready: new Prisma.Decimal(1),
        missing: new Prisma.Decimal(missing),
        lots: [],
        exported: new Prisma.Decimal(0),
        pending: new Prisma.Decimal(0),
      },
    ],
    lots: [],
  };
}

afterEach(() => vi.restoreAllMocks());

describe('CustomerService', () => {
  it('computeTrackingStatus quy đổi đủ 5 trạng thái cho Web/App', () => {
    expect(computeTrackingStatus({ status: 'PENDING' }).trackingStatus).toBe('PENDING');
    expect(computeTrackingStatus({ status: 'REJECTED' }).trackingStatus).toBe('REJECTED');
    expect(computeTrackingStatus({ status: 'APPROVED', sale: { status: 'CONFIRMED' } }).trackingStatus).toBe('CONFIRMED');
    expect(computeTrackingStatus({ status: 'APPROVED', sale: { status: 'COMPLETED' } }).trackingStatus).toBe('COMPLETED');
    expect(computeTrackingStatus({ status: 'APPROVED', sale: { status: 'CANCELLED' } }).trackingStatus).toBe('CANCELLED');
  });

  it('createOrder từ chối giỏ rỗng, đơn mang đi thiếu liên hệ, bàn ngừng dùng, vượt tồn; và tạo đơn thành công', async () => {
    const db = { $transaction: vi.fn() } as unknown as PrismaService;
    const svc = new CustomerService(db);

    await expect(svc.createOrder({ items: [] }, null)).rejects.toBeInstanceOf(BadRequestException);
    await expect(
      svc.createOrder({ items: [{ productId: PRODUCT_ID, quantity: 1 }] }, null),
    ).rejects.toBeInstanceOf(BadRequestException);

    // Trường hợp bàn ngừng phục vụ
    (db.$transaction as ReturnType<typeof vi.fn>).mockImplementationOnce(async fn =>
      fn({
        diningTable: { findFirst: vi.fn().mockResolvedValue({ id: TABLE_ID, name: 'BBQ-A01', status: 'INACTIVE' }) },
      }),
    );
    await expect(
      svc.createOrder({ tableCode: 'BBQ-A01', items: [{ productId: PRODUCT_ID, quantity: 1 }] }, null),
    ).rejects.toBeInstanceOf(ConflictException);

    // Trường hợp đặt vượt tồn còn bán được
    vi.spyOn(availabilityModule, 'productAvailability').mockResolvedValue(makeAvailability('1'));
    (db.$transaction as ReturnType<typeof vi.fn>).mockImplementationOnce(async fn =>
      fn({
        diningTable: { findFirst: vi.fn().mockResolvedValue({ id: TABLE_ID, name: 'BBQ-A01', status: 'ACTIVE' }) },
        product: {
          findMany: vi.fn().mockResolvedValue([
            { id: PRODUCT_ID, name: 'Sườn nướng', sellingPrice: new Prisma.Decimal('100000'), status: 'ACTIVE', unit: { symbol: 'kg' } },
          ]),
        },
      }),
    );
    await expect(
      svc.createOrder({ tableCode: 'BBQ-A01', items: [{ productId: PRODUCT_ID, quantity: 2 }] }, null),
    ).rejects.toBeInstanceOf(ConflictException);

    // Trường hợp tạo đơn tại bàn thành công
    const createOrderMock = vi.fn().mockResolvedValue({
      id: ORDER_ID,
      code: 'KH-20261125-ABC123',
      status: 'PENDING',
      customerName: null,
      customerPhone: null,
      note: 'Ít cay',
      rejectReason: null,
      createdAt: new Date('2026-11-25T01:00:00Z'),
      reviewedAt: null,
      tableId: TABLE_ID,
      table: { id: TABLE_ID, name: 'BBQ-A01', area: 'Trong nhà', status: 'ACTIVE' },
      customer: null,
      reviewedBy: null,
      sale: null,
      lines: [
        {
          id: LINE_ID,
          productId: PRODUCT_ID,
          productName: 'Sườn nướng',
          unitPrice: new Prisma.Decimal('100000'),
          quantity: new Prisma.Decimal('1'),
          note: '',
          product: { id: PRODUCT_ID, code: 'BBQ-TP-RIBS', imageUrl: null, unit: { symbol: 'kg' } },
        },
      ],
    });
    vi.spyOn(availabilityModule, 'productAvailability').mockResolvedValue(makeAvailability('5'));
    (db.$transaction as ReturnType<typeof vi.fn>).mockImplementationOnce(async fn =>
      fn({
        diningTable: { findFirst: vi.fn().mockResolvedValue({ id: TABLE_ID, name: 'BBQ-A01', status: 'ACTIVE' }) },
        product: {
          findMany: vi.fn().mockResolvedValue([
            { id: PRODUCT_ID, name: 'Sườn nướng', sellingPrice: new Prisma.Decimal('100000'), status: 'ACTIVE', unit: { symbol: 'kg' } },
          ]),
        },
        customerOrder: { create: createOrderMock },
      }),
    );

    const created = await svc.createOrder(
      { tableCode: 'BBQ-A01', note: 'Ít cay', items: [{ productId: PRODUCT_ID, quantity: 1 }] },
      null,
    );
    expect(created.trackingStatus).toBe('PENDING');
    expect(created.orderType).toBe('DINE_IN');
    expect(created.total.toString()).toBe('100000');
  });

  it('approveOrder tạo Sale mới nếu bàn trống và gộp vào Sale đang mở nếu bàn đã có đơn', async () => {
    const db = { $transaction: vi.fn() } as unknown as PrismaService;
    const svc = new CustomerService(db);

    const pendingOrder = {
      id: ORDER_ID,
      code: 'KH-20261125-000001',
      status: 'PENDING',
      tableId: TABLE_ID,
      table: { id: TABLE_ID, name: 'BBQ-A01', area: 'Trong nhà', status: 'ACTIVE' },
      lines: [
        {
          id: LINE_ID,
          productId: PRODUCT_ID,
          productName: 'Sườn nướng',
          quantity: new Prisma.Decimal('1'),
          note: '',
          product: { id: PRODUCT_ID, name: 'Sườn nướng', status: 'ACTIVE', sellingPrice: new Prisma.Decimal('100000'), unit: { symbol: 'kg' } },
        },
      ],
    };

    // Case 1: Bàn chưa có đơn mở -> tạo Sale mới
    const newSaleLineId = '77777777-7777-4777-8777-777777777777';
    vi.spyOn(availabilityModule, 'productAvailability').mockResolvedValue(makeAvailability('5', newSaleLineId, '0'));
    const saleCreate = vi.fn().mockResolvedValue({ id: SALE_ID, lines: [{ id: newSaleLineId }] });
    const orderUpdate = vi.fn().mockResolvedValue({
      ...pendingOrder,
      status: 'APPROVED',
      customerName: null,
      customerPhone: null,
      note: '',
      rejectReason: null,
      createdAt: new Date(),
      reviewedAt: new Date(),
      customer: null,
      reviewedBy: { id: 'emp1', name: 'Phục vụ A' },
      sale: { id: SALE_ID, code: 'DB-NEW', status: 'CONFIRMED' },
      lines: [
        {
          id: LINE_ID,
          productId: PRODUCT_ID,
          productName: 'Sườn nướng',
          unitPrice: new Prisma.Decimal('100000'),
          quantity: new Prisma.Decimal('1'),
          note: '',
          product: { id: PRODUCT_ID, code: 'BBQ-TP-RIBS', imageUrl: null, unit: { symbol: 'kg' } },
        },
      ],
    });

    (db.$transaction as ReturnType<typeof vi.fn>).mockImplementationOnce(async fn =>
      fn({
        $queryRaw: vi.fn(),
        employee: { findUnique: vi.fn().mockResolvedValue({ id: 'emp1', status: 'ACTIVE' }) },
        customerOrder: { findUnique: vi.fn().mockResolvedValue(pendingOrder), update: orderUpdate },
        sale: { findFirst: vi.fn().mockResolvedValue(null), create: saleCreate },
      }),
    );

    const approvedNew = await svc.approveOrder(ORDER_ID, STAFF_USER);
    expect(saleCreate).toHaveBeenCalledTimes(1);
    expect(approvedNew.trackingStatus).toBe('CONFIRMED');
    expect(approvedNew.saleCode).toBe('DB-NEW');

    // Case 2: Bàn đã có Sale mở -> gộp thêm SaleLine batch + 1 và tăng version
    const mergedLineId = '88888888-8888-4888-8888-888888888888';
    vi.spyOn(availabilityModule, 'productAvailability').mockResolvedValue(makeAvailability('5', mergedLineId, '0'));
    const saleLineCreate = vi.fn().mockResolvedValue({ id: mergedLineId });
    const saleUpdate = vi.fn().mockResolvedValue({ id: SALE_ID });

    (db.$transaction as ReturnType<typeof vi.fn>).mockImplementationOnce(async fn =>
      fn({
        $queryRaw: vi.fn(),
        employee: { findUnique: vi.fn().mockResolvedValue({ id: 'emp1', status: 'ACTIVE' }) },
        customerOrder: { findUnique: vi.fn().mockResolvedValue(pendingOrder), update: orderUpdate },
        sale: {
          findFirst: vi.fn().mockResolvedValue({
            id: SALE_ID,
            lines: [{ id: 'old-line', batch: 2 }],
            exports: [],
          }),
          update: saleUpdate,
        },
        saleLine: { create: saleLineCreate },
      }),
    );

    await svc.approveOrder(ORDER_ID, STAFF_USER);
    expect(saleLineCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ saleId: SALE_ID, batch: 3 }),
      }),
    );
    expect(saleUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: SALE_ID },
        data: { status: 'CONFIRMED', version: { increment: 1 } },
      }),
    );

    // Case 3: Thiếu tồn khi duyệt -> throw ConflictException
    vi.spyOn(availabilityModule, 'productAvailability').mockResolvedValue(makeAvailability('0', newSaleLineId, '1'));
    (db.$transaction as ReturnType<typeof vi.fn>).mockImplementationOnce(async fn =>
      fn({
        $queryRaw: vi.fn(),
        employee: { findUnique: vi.fn().mockResolvedValue({ id: 'emp1', status: 'ACTIVE' }) },
        customerOrder: { findUnique: vi.fn().mockResolvedValue(pendingOrder), update: orderUpdate },
        sale: { findFirst: vi.fn().mockResolvedValue(null), create: saleCreate },
      }),
    );
    await expect(svc.approveOrder(ORDER_ID, STAFF_USER)).rejects.toBeInstanceOf(ConflictException);
  });

  it('rejectOrder yêu cầu lý do và updateProductMenuInfo kiểm tra URL ảnh', async () => {
    const db = {
      $transaction: vi.fn(),
      product: { findUnique: vi.fn(), update: vi.fn() },
    } as unknown as PrismaService;
    const svc = new CustomerService(db);

    await expect(svc.rejectOrder(ORDER_ID, { reason: '   ' }, STAFF_USER)).rejects.toBeInstanceOf(
      BadRequestException,
    );

    (db.$transaction as ReturnType<typeof vi.fn>).mockImplementationOnce(async fn =>
      fn({
        $queryRaw: vi.fn(),
        employee: { findUnique: vi.fn().mockResolvedValue({ id: 'emp1', status: 'ACTIVE' }) },
        customerOrder: {
          findUnique: vi.fn().mockResolvedValue({ id: ORDER_ID, status: 'PENDING' }),
          update: vi.fn().mockResolvedValue({
            id: ORDER_ID,
            code: 'KH-1',
            status: 'REJECTED',
            customerName: null,
            customerPhone: null,
            note: '',
            rejectReason: 'Hết món',
            createdAt: new Date(),
            reviewedAt: new Date(),
            tableId: TABLE_ID,
            table: { id: TABLE_ID, name: 'BBQ-A01', area: 'Trong nhà', status: 'ACTIVE' },
            customer: null,
            reviewedBy: { id: 'emp1', name: 'Phục vụ A' },
            sale: null,
            lines: [],
          }),
        },
      }),
    );

    const rejected = await svc.rejectOrder(ORDER_ID, { reason: 'Hết món' }, STAFF_USER);
    expect(rejected.trackingStatus).toBe('REJECTED');
    expect(rejected.rejectReason).toBe('Hết món');

    await expect(
      svc.updateProductMenuInfo(PRODUCT_ID, { imageUrl: 'javascript:alert(1)' }),
    ).rejects.toBeInstanceOf(BadRequestException);

    (db.product.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue({ id: PRODUCT_ID });
    (db.product.update as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: PRODUCT_ID,
      code: 'BBQ-TP-RIBS',
      name: 'Sườn nướng',
      description: 'Nướng gỗ sồi 6 giờ',
      imageUrl: 'https://example.com/ribs.jpg',
    });
    const updated = await svc.updateProductMenuInfo(PRODUCT_ID, {
      description: 'Nướng gỗ sồi 6 giờ',
      imageUrl: 'https://example.com/ribs.jpg',
    });
    expect(updated.imageUrl).toBe('https://example.com/ribs.jpg');
  });
});

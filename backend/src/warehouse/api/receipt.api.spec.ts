import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateReceiptDto } from '../dto/create-receipt.dto.js';
import { ReceiptApi } from './receipt.api.js';

describe('ReceiptApi', () => {
  let prisma: {
    $transaction: ReturnType<typeof vi.fn>;
    supplier: { findUnique: ReturnType<typeof vi.fn> };
    branch: { findUnique: ReturnType<typeof vi.fn> };
    goodsReceipt: {
      create: ReturnType<typeof vi.fn>;
      findMany: ReturnType<typeof vi.fn>;
    };
  };
  let api: ReceiptApi;

  beforeEach(() => {
    prisma = {
      $transaction: vi.fn(),
      supplier: { findUnique: vi.fn() },
      branch: { findUnique: vi.fn() },
      goodsReceipt: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
    };
    api = new ReceiptApi(prisma as unknown as PrismaService);
  });

  it('creates a new lot and records the receipt, balance and movement in one transaction', async () => {
    const tx = {
      supplier: {
        findUnique: vi.fn().mockResolvedValue({
          id: 'supplier-id',
          status: 'ACTIVE',
        }),
      },
      branch: {
        findUnique: vi.fn().mockResolvedValue({
          id: 'branch-id',
          isActive: true,
        }),
      },
      goodsReceipt: {
        create: vi.fn().mockResolvedValue({
          id: 'receipt-id',
          receiptCode: 'PN001',
          status: 'POSTED',
        }),
      },
      material: {
        findUnique: vi.fn().mockResolvedValue({
          id: 'material-id',
          unitId: 'kg-id',
          status: 'ACTIVE',
        }),
      },
      materialLot: {
        findUnique: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({
          id: 'lot-id',
          status: 'ACTIVE',
          expiryDate: new Date('2099-12-31T00:00:00.000Z'),
        }),
      },
      warehouseLocation: {
        findUnique: vi.fn().mockResolvedValue({ id: 'location-id' }),
      },
      unit: {
        findUnique: vi.fn().mockResolvedValue({
          id: 'kg-id',
          status: 'ACTIVE',
          baseUnitId: null,
          conversionFactor: new Prisma.Decimal(1),
        }),
      },
      goodsReceiptDetail: {
        create: vi.fn().mockResolvedValue({ id: 'detail-id' }),
      },
      materialBalance: {
        upsert: vi.fn().mockResolvedValue({
          quantity: new Prisma.Decimal('5'),
        }),
      },
      inventoryMovement: { create: vi.fn() },
    };

    prisma.$transaction.mockImplementation(
      async (callback: (transaction: typeof tx) => Promise<unknown>) =>
        callback(tx),
    );

    const dto: CreateReceiptDto = {
      receiptCode: 'PN001',
      supplierCode: 'NCC001',
      branchCode: 'CN001',
      details: [
        {
          materialCode: 'NVL001',
          lotCode: 'LOT001',
          expiryDate: '2099-12-31',
          locationName: 'Kho mát',
          unitName: 'kg',
          quantity: '5',
          unitPrice: '10000',
        },
      ],
    };

    const result = await api.createReceipt(dto);

    expect(prisma.$transaction).toHaveBeenCalledOnce();
    expect(tx.goodsReceipt.create).toHaveBeenCalledOnce();
    expect(tx.materialLot.create).toHaveBeenCalledWith({
      data: {
        materialId: 'material-id',
        lotCode: 'LOT001',
        expiryDate: new Date('2099-12-31T00:00:00.000+07:00'),
      },
    });
    expect(tx.materialBalance.upsert).toHaveBeenCalledOnce();
    expect(tx.inventoryMovement.create).toHaveBeenCalledOnce();
    expect(result.data.status).toBe('POSTED');
  });

  it('rejects unknown suppliers before creating a receipt', async () => {
    const tx = {
      supplier: { findUnique: vi.fn().mockResolvedValue(null) },
      branch: { findUnique: vi.fn() },
      goodsReceipt: { create: vi.fn() },
    };
    prisma.$transaction.mockImplementation(
      async (callback: (transaction: typeof tx) => Promise<unknown>) =>
        callback(tx),
    );

    await expect(
      api.createReceipt({
        receiptCode: 'PN001',
        supplierCode: 'NCC-UNKNOWN',
        branchCode: 'CN001',
        details: [
          {
            materialCode: 'NVL001',
            lotCode: 'LOT001',
            locationName: 'Kho mát',
            unitName: 'kg',
            quantity: '5',
            unitPrice: '10000',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(tx.goodsReceipt.create).not.toHaveBeenCalled();
  });

  it('filters receipt lists by supplier, branch and date range', async () => {
    prisma.supplier.findUnique.mockResolvedValue({ id: 'supplier-id' });
    prisma.branch.findUnique.mockResolvedValue({ id: 'branch-id' });
    prisma.goodsReceipt.findMany.mockResolvedValue([]);

    await api.getReceipts('NCC001', 'CN001', '2026-10-01', '2026-10-31');

    expect(prisma.goodsReceipt.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          supplierId: 'supplier-id',
          branchId: 'branch-id',
          createdAt: {
            gte: new Date('2026-10-01T00:00:00.000+07:00'),
            lt: new Date('2026-11-01T00:00:00.000+07:00'),
          },
        }),
      }),
    );
  });

  it('rejects invalid date ranges', async () => {
    await expect(
      api.getReceipts(undefined, undefined, '2026-02-30'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.goodsReceipt.findMany).not.toHaveBeenCalled();
  });
});

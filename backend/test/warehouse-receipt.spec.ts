import { afterEach, describe, expect, it, vi } from 'vitest';
import { ReceiptApi } from '../src/warehouse/api/receipt.api.js';
import { Prisma } from '../src/generated/prisma/client.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';
import type { CreateReceiptDto } from '../src/warehouse/dto/create-receipt.dto.js';

function setup(expiry?: string | null) {
  const lot =
    expiry === undefined
      ? null
      : {
          id: 'lot',
          status: 'ACTIVE',
          expiryDate: expiry ? new Date(`${expiry}T00:00:00Z`) : null,
        };
  const tx = {
    supplier: {
      findUnique: vi
        .fn()
        .mockResolvedValue({ id: 'supplier', status: 'ACTIVE' }),
    },
    branch: {
      findUnique: vi.fn().mockResolvedValue({ id: 'branch', isActive: true }),
    },
    goodsReceipt: {
      create: vi
        .fn()
        .mockResolvedValue({
          id: 'receipt',
          receiptCode: 'PN-TEST',
          status: 'POSTED',
        }),
    },
    material: {
      findUnique: vi
        .fn()
        .mockResolvedValue({
          id: 'material',
          unitId: 'unit',
          status: 'ACTIVE',
        }),
    },
    materialLot: {
      findUnique: vi.fn().mockResolvedValue(lot),
      create: vi
        .fn()
        .mockImplementation(({ data }) => ({ id: 'lot', ...data })),
      update: vi
        .fn()
        .mockImplementation(({ data }) => ({ id: 'lot', ...data })),
    },
    warehouseLocation: {
      findUnique: vi.fn().mockResolvedValue({ id: 'location' }),
    },
    unit: {
      findUnique: vi.fn().mockResolvedValue({ id: 'unit', status: 'ACTIVE' }),
    },
    goodsReceiptDetail: { create: vi.fn().mockResolvedValue({ id: 'detail' }) },
    materialBalance: {
      upsert: vi.fn().mockResolvedValue({ quantity: new Prisma.Decimal(1) }),
    },
    inventoryMovement: { create: vi.fn() },
  };
  const prisma = { $transaction: vi.fn((fn) => fn(tx)) };
  return { api: new ReceiptApi(prisma as unknown as PrismaService), tx };
}

const dto = (expiryDate?: string) => ({
  receiptCode: 'PN-TEST',
  supplierCode: 'NCC001',
  branchCode: 'BR001',
  details: [
    {
      materialCode: 'NVL001',
      lotCode: 'LOT1',
      locationName: 'Kho',
      unitName: 'kg',
      quantity: '1',
      unitPrice: '100',
      expiryDate,
    },
  ],
});

afterEach(() => vi.useRealTimers());
describe('Receipt calendar dates and existing lots', () => {
  it('rejects yesterday without writing a movement', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-03T05:00:00Z'));
    const { api, tx } = setup();
    await expect(api.createReceipt(dto('2026-11-02'))).rejects.toThrow('hết hạn');
    expect(tx.inventoryMovement.create).not.toHaveBeenCalled();
  });
  it('stores the exact calendar date at UTC midnight', async () => {
    const { api, tx } = setup();
    await api.createReceipt(dto('2099-12-31'));
    expect(
      tx.materialLot.create.mock.calls[0][0].data.expiryDate.toISOString(),
    ).toBe('2099-12-31T00:00:00.000Z');
  });
  it.each(['2026-11-03T16:59:59Z', '2026-11-03T17:00:00Z'])(
    'uses the Vietnamese business date near midnight: %s',
    async (now) => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(now));
      const { api } = setup();
      const result = api.createReceipt(dto('2026-11-03'));
      if (now.includes('16:59')) await expect(result).resolves.toBeDefined();
      else await expect(result).rejects.toThrow('hết hạn');
    },
  );
  it.each(['2026-11-03', '2026-11-04'])(
    'accepts today/tomorrow: %s',
    async (day) => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-11-03T05:00:00Z'));
      await expect(setup().api.createReceipt(dto(day))).resolves.toBeDefined();
    },
  );
  it.each([undefined, '2099-12-31'])(
    'rejects an expired existing lot even with request date %s',
    async (day) => {
      const { api, tx } = setup('2020-01-01');
      await expect(api.createReceipt(dto(day))).rejects.toThrow('hết hạn');
      expect(tx.materialBalance.upsert).not.toHaveBeenCalled();
      expect(tx.inventoryMovement.create).not.toHaveBeenCalled();
      expect(tx.materialLot.update).not.toHaveBeenCalled();
    },
  );
  it('accepts an existing lot with matching expiry or omitted expiry', async () => {
    await expect(
      setup('2099-12-31').api.createReceipt(dto('2099-12-31')),
    ).resolves.toBeDefined();
    await expect(
      setup('2099-12-31').api.createReceipt(dto()),
    ).resolves.toBeDefined();
  });
  it('preserves a no-expiry lot when the request omits expiry', async () => {
    const { api, tx } = setup(null);
    await api.createReceipt(dto());
    expect(tx.materialLot.update).not.toHaveBeenCalled();
  });
  it('rejects invalid or mismatching calendar dates', async () => {
    await expect(setup().api.createReceipt(dto('2099-02-30'))).rejects.toThrow(
      'không hợp lệ',
    );
    await expect(
      setup('2099-12-31').api.createReceipt(dto('2099-12-30')),
    ).rejects.toThrow('không khớp');
  });
  it('validates optional branch/location IDs without breaking legacy bodies', async () => {
    const request: CreateReceiptDto = dto();
    request.branchId = 'wrong';
    await expect(setup().api.createReceipt(request)).rejects.toThrow(
      'không khớp',
    );
    request.branchId = 'branch';
    request.details[0].locationId = 'wrong';
    await expect(setup().api.createReceipt(request)).rejects.toThrow('Vị trí');
  });
});

import { describe, expect, it, vi } from 'vitest';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '../src/generated/prisma/client.js';
import { MaterialAdjustmentApi } from '../src/warehouse/api/material-adjustment.api.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';

const d = (value: number) => new Prisma.Decimal(value);
function setup(source = 'STOCK', type = 'WASTE') {
  const row = {
    id: 'adjustment',
    code: 'DC001',
    source,
    type,
    status: 'PENDING',
    reason: 'Lý do kiểm thử',
    quantity: d(3),
    materialLotId: 'lot',
    locationId: 'location',
    issueDetailId: source === 'ISSUED' ? 'line' : null,
    materialLot: {
      materialId: 'material',
      status: 'ACTIVE',
      expiryDate: new Date('2099-12-31T00:00:00Z'),
      material: { unitId: 'kg', status: 'ACTIVE', unit: { status: 'ACTIVE' } },
    },
    location: {
      branchId: 'branch',
      locationType: 'RAW_MATERIAL',
      branch: { isActive: true },
    },
    issueDetail: {
      id: 'line',
      materialId: 'material',
      materialLotId: 'lot',
      unitId: 'kg',
      quantity: d(10),
      unit: {},
      issue: { status: 'APPROVED', branchId: 'branch' },
      settlement: {
        consumedQuantity: d(4),
        referenceCode: 'USAGE1',
        recordedBy: 'staff',
        finalizedAt: new Date('2020-01-01T00:00:00Z'),
      } as object | null,
    },
  };
  const tx = {
    materialAdjustment: {
      findUnique: vi.fn().mockResolvedValue(row),
      aggregate: vi
        .fn()
        .mockResolvedValue({ _sum: { acceptedQuantity: d(0) } }),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    materialBalance: {
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      findUniqueOrThrow: vi.fn().mockResolvedValue({ quantity: d(7) }),
      upsert: vi.fn().mockResolvedValue({ quantity: d(3) }),
    },
    inventoryMovement: {
      create: vi.fn().mockResolvedValue({ id: 'movement' }),
    },
    materialAdjustmentMovement: { create: vi.fn() },
  };
  return {
    row,
    tx,
    api: new MaterialAdjustmentApi({
      $transaction: (fn: (client: typeof tx) => Promise<unknown>) => fn(tx),
    } as unknown as PrismaService),
  };
}

describe('Adjustment approval/rejection', () => {
  it.each([
    { cause: { kind: 'TransactionWriteConflict' } },
    { cause: { originalCode: '40001' } },
    { cause: { originalCode: '40P01' } },
    new Prisma.PrismaClientKnownRequestError('Serialization conflict', {
      code: 'P2034',
      clientVersion: '7.10.1',
    }),
  ])('returns HTTP 409 for transaction conflict %j', async (error) => {
    const prisma = { $transaction: vi.fn().mockRejectedValue(error) };
    const api = new MaterialAdjustmentApi(prisma as unknown as PrismaService);
    for (const operation of [
      () => api.approve('DC001', { acceptedQuantity: '1' }),
      () => api.reject('DC001', 'Lý do hợp lệ'),
    ]) {
      await expect(operation()).rejects.toMatchObject({ status: 409 });
    }
  });
  it.each(['WASTE', 'RETURN'])(
    'returns HTTP 400 for %s exceeding the unsettled issued quantity',
    async (type) => {
      const { api, tx } = setup('ISSUED', type);
      tx.materialAdjustment.aggregate.mockResolvedValue({
        _sum: { acceptedQuantity: d(5) },
      });
      const error = await api
        .approve('DC001', {
          acceptedQuantity: '3',
          qualityStatus: 'ACCEPTABLE',
        })
        .catch((error) => error);
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.getStatus()).toBe(400);
      expect(error.message).toContain('vượt lượng đã lĩnh');
      expect(tx.materialAdjustment.updateMany).not.toHaveBeenCalled();
      expect(tx.materialBalance.upsert).not.toHaveBeenCalled();
      expect(tx.inventoryMovement.create).not.toHaveBeenCalled();
    },
  );
  it('does not disguise unexpected database failures as business conflicts', async () => {
    const error = new Error('Database connection lost');
    const api = new MaterialAdjustmentApi({
      $transaction: vi.fn().mockRejectedValue(error),
    } as unknown as PrismaService);
    await expect(api.approve('DC001', { acceptedQuantity: '1' })).rejects.toBe(
      error,
    );
  });
  it('does not approve a request with a blank original reason', async () => {
    const { api, row, tx } = setup();
    row.reason = '   ';
    await expect(
      api.approve('DC001', { acceptedQuantity: '3' }),
    ).rejects.toThrow('lý do đề nghị');
    expect(tx.materialBalance.updateMany).not.toHaveBeenCalled();
  });
  it('blocks expired returns and invalid source lines before changing stock', async () => {
    const expired = setup('ISSUED', 'RETURN');
    expired.row.materialLot.expiryDate = new Date('2020-01-01T00:00:00Z');
    await expect(
      expired.api.approve('DC001', {
        acceptedQuantity: '3',
        qualityStatus: 'ACCEPTABLE',
      }),
    ).rejects.toThrow('hết hạn');
    expect(expired.tx.materialBalance.upsert).not.toHaveBeenCalled();
    const source = setup('ISSUED', 'RETURN');
    source.row.issueDetail.materialLotId = 'wrong-lot';
    await expect(
      source.api.approve('DC001', {
        acceptedQuantity: '3',
        qualityStatus: 'ACCEPTABLE',
      }),
    ).rejects.toThrow('phiếu xuất gốc');
    expect(source.tx.materialAdjustment.updateMany).not.toHaveBeenCalled();
  });
  it('requires positive quantities and explains partial acceptance', async () => {
    await expect(
      setup().api.approve('DC001', { acceptedQuantity: '0' }),
    ).rejects.toThrow('Số lượng');
    await expect(
      setup().api.approve('DC001', { acceptedQuantity: '1' }),
    ).rejects.toThrow('lý do');
    await expect(
      setup().api.approve('DC001', {
        acceptedQuantity: '1',
        note: 'Kiểm nhận thực tế',
      }),
    ).resolves.toBeDefined();
  });
  it('WASTE STOCK decrements and links exactly one WASTE movement', async () => {
    const { api, tx } = setup();
    await api.approve('DC001', { acceptedQuantity: '3' });
    expect(tx.materialBalance.updateMany).toHaveBeenCalledTimes(1);
    expect(
      tx.inventoryMovement.create.mock.calls[0][0].data.quantityChange.toString(),
    ).toBe('-3');
    expect(tx.materialAdjustmentMovement.create).toHaveBeenCalledTimes(1);
  });
  it('WASTE ISSUED only records settlement, without another stock movement', async () => {
    const { api, tx } = setup('ISSUED');
    await api.approve('DC001', { acceptedQuantity: '3' });
    expect(tx.materialBalance.updateMany).not.toHaveBeenCalled();
    expect(tx.inventoryMovement.create).not.toHaveBeenCalled();
  });
  it('RETURN increments and records RETURN only for acceptable quality', async () => {
    const { api, tx } = setup('ISSUED', 'RETURN');
    await api.approve('DC001', {
      acceptedQuantity: '3',
      qualityStatus: 'ACCEPTABLE',
    });
    expect(tx.materialBalance.upsert).toHaveBeenCalledTimes(1);
    expect(tx.inventoryMovement.create.mock.calls[0][0].data.movementType).toBe(
      'RETURN',
    );
  });
  it('blocks unknown consumption and does not change stock', async () => {
    const { api, row, tx } = setup('ISSUED', 'RETURN');
    row.issueDetail.settlement = null;
    await expect(
      api.approve('DC001', {
        acceptedQuantity: '3',
        qualityStatus: 'ACCEPTABLE',
      }),
    ).rejects.toThrow('BLOCKED');
    expect(tx.materialAdjustment.updateMany).not.toHaveBeenCalled();
    expect(tx.materialBalance.upsert).not.toHaveBeenCalled();
  });
  it('blocks over-return and unacceptable quality', async () => {
    const first = setup('ISSUED', 'RETURN');
    first.tx.materialAdjustment.aggregate.mockResolvedValue({
      _sum: { acceptedQuantity: d(5) },
    });
    await expect(
      first.api.approve('DC001', {
        acceptedQuantity: '3',
        qualityStatus: 'ACCEPTABLE',
      }),
    ).rejects.toThrow('vượt');
    await expect(
      setup('ISSUED', 'RETURN').api.approve('DC001', {
        acceptedQuantity: '3',
        qualityStatus: 'UNACCEPTABLE',
      }),
    ).rejects.toThrow('chất lượng');
  });
  it('does not approve twice or create negative balances', async () => {
    const first = setup();
    first.row.status = 'APPROVED';
    await expect(
      first.api.approve('DC001', { acceptedQuantity: '3' }),
    ).rejects.toThrow('đã được xử lý');
    const second = setup();
    second.tx.materialBalance.updateMany.mockResolvedValue({ count: 0 });
    await expect(
      second.api.approve('DC001', { acceptedQuantity: '3' }),
    ).rejects.toThrow('Không đủ');
    expect(second.tx.inventoryMovement.create).not.toHaveBeenCalled();
  });
  it('rejects only once, requires a reason, and never touches stock', async () => {
    const { api, tx } = setup();
    await expect(api.reject('DC001', '  ')).rejects.toThrow('lý do');
    await api.reject('DC001', 'Không phù hợp');
    expect(tx.materialBalance.updateMany).not.toHaveBeenCalled();
    expect(tx.inventoryMovement.create).not.toHaveBeenCalled();
    tx.materialAdjustment.updateMany.mockResolvedValue({ count: 0 });
    await expect(api.reject('DC001', 'Lặp lại')).rejects.toThrow(
      'đã được xử lý',
    );
  });
});

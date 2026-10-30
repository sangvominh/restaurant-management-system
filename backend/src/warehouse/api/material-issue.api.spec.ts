import { BadRequestException, ConflictException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MaterialIssueApi } from './material-issue.api.js';

describe('MaterialIssueApi', () => {
  let prisma: {
    $transaction: ReturnType<typeof vi.fn>;
    materialIssue: {
      findMany: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      updateMany: ReturnType<typeof vi.fn>;
    };
  };
  let api: MaterialIssueApi;

  const makeIssue = (status = 'PENDING', expiryDate: Date | null = null) => ({
    id: 'issue-id',
    issueCode: 'XNVL001',
    status,
    branchId: 'branch-id',
    note: null,
    details: [
      {
        id: 'detail-id',
        materialId: 'material-id',
        materialLotId: 'lot-id',
        locationId: 'location-id',
        unitId: 'kg-id',
        quantity: new Prisma.Decimal('3'),
        material: {
          code: 'NVL001',
          unitId: 'kg-id',
          status: 'ACTIVE',
        },
        materialLot: {
          materialId: 'material-id',
          status: 'ACTIVE',
          expiryDate,
        },
        location: { branchId: 'branch-id' },
        unit: {
          status: 'ACTIVE',
          baseUnitId: null,
          conversionFactor: new Prisma.Decimal(1),
        },
      },
    ],
  });

  beforeEach(() => {
    prisma = {
      $transaction: vi.fn(),
      materialIssue: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        updateMany: vi.fn(),
      },
    };
    api = new MaterialIssueApi(prisma as unknown as PrismaService);
  });

  it('decrements stock and writes movement when approval succeeds', async () => {
    const tx = {
      materialIssue: {
        findUnique: vi.fn().mockResolvedValue(makeIssue()),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      materialBalance: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          quantity: new Prisma.Decimal('7'),
        }),
      },
      inventoryMovement: { create: vi.fn() },
    };
    prisma.$transaction.mockImplementation(
      async (callback: (transaction: typeof tx) => Promise<unknown>) =>
        callback(tx),
    );

    const result = await api.approveIssue('XNVL001');

    expect(tx.materialBalance.updateMany).toHaveBeenCalledWith({
      where: {
        materialLotId: 'lot-id',
        locationId: 'location-id',
        quantity: { gte: new Prisma.Decimal('3') },
      },
      data: { quantity: { decrement: new Prisma.Decimal('3') } },
    });
    expect(tx.inventoryMovement.create).toHaveBeenCalledOnce();
    expect(result.data.status).toBe('APPROVED');
  });

  it('rejects a repeated approval without decrementing stock again', async () => {
    const tx = {
      materialIssue: {
        findUnique: vi.fn().mockResolvedValue(makeIssue('APPROVED')),
        updateMany: vi.fn(),
      },
      materialBalance: { updateMany: vi.fn() },
      inventoryMovement: { create: vi.fn() },
    };
    prisma.$transaction.mockImplementation(
      async (callback: (transaction: typeof tx) => Promise<unknown>) =>
        callback(tx),
    );

    await expect(api.approveIssue('XNVL001')).rejects.toBeInstanceOf(
      ConflictException,
    );
    expect(tx.materialBalance.updateMany).not.toHaveBeenCalled();
    expect(tx.inventoryMovement.create).not.toHaveBeenCalled();
  });

  it('does not decrement or record movement for an expired lot', async () => {
    const tx = {
      materialIssue: {
        findUnique: vi
          .fn()
          .mockResolvedValue(
            makeIssue('PENDING', new Date('2020-01-01T00:00:00Z')),
          ),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      materialBalance: { updateMany: vi.fn() },
      inventoryMovement: { create: vi.fn() },
    };
    prisma.$transaction.mockImplementation(
      async (callback: (transaction: typeof tx) => Promise<unknown>) =>
        callback(tx),
    );

    await expect(api.approveIssue('XNVL001')).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(tx.materialBalance.updateMany).not.toHaveBeenCalled();
    expect(tx.inventoryMovement.create).not.toHaveBeenCalled();
  });

  it('requires a non-empty rejection reason', async () => {
    await expect(api.rejectIssue('XNVL001', '   ')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});

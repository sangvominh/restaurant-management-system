import { NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { InventoryApi } from './inventory.api.js';

describe('InventoryApi', () => {
  let prisma: {
    branch: { findUnique: ReturnType<typeof vi.fn> };
    material: {
      findMany: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
    };
    inventoryMovement: { findMany: ReturnType<typeof vi.fn> };
  };
  let api: InventoryApi;

  const material = () => ({
    id: 'material-id',
    code: 'NVL001',
    name: 'Thịt bò',
    status: 'ACTIVE',
    minStock: new Prisma.Decimal('5'),
    category: { name: 'Thịt' },
    unit: { name: 'kg' },
    lots: [
      {
        lotCode: 'LOT-VALID',
        status: 'ACTIVE',
        expiryDate: new Date('2099-12-31T00:00:00.000Z'),
        balances: [
          {
            quantity: new Prisma.Decimal('5'),
            location: {
              branchId: 'branch-id',
              branch: { code: 'CN001', name: 'Chi nhánh 1' },
              name: 'Kho mát',
            },
          },
        ],
      },
      {
        lotCode: 'LOT-EXPIRED',
        status: 'ACTIVE',
        expiryDate: new Date('2020-01-01T00:00:00.000Z'),
        balances: [
          {
            quantity: new Prisma.Decimal('10'),
            location: {
              branchId: 'branch-id',
              branch: { code: 'CN001', name: 'Chi nhánh 1' },
              name: 'Kho mát',
            },
          },
        ],
      },
      {
        lotCode: 'LOT-INACTIVE',
        status: 'INACTIVE',
        expiryDate: null,
        balances: [
          {
            quantity: new Prisma.Decimal('7'),
            location: {
              branchId: 'branch-id',
              branch: { code: 'CN001', name: 'Chi nhánh 1' },
              name: 'Kho khô',
            },
          },
        ],
      },
    ],
  });

  beforeEach(() => {
    prisma = {
      branch: { findUnique: vi.fn() },
      material: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
      inventoryMovement: { findMany: vi.fn() },
    };
    api = new InventoryApi(prisma as unknown as PrismaService);
  });

  it('returns total and available stock separately and excludes invalid lots from availability', async () => {
    prisma.material.findMany.mockResolvedValue([material()]);

    const result = await api.getInventory();

    expect(result.data[0]).toMatchObject({
      totalStock: 22,
      availableStock: 5,
      stockStatus: 'LOW_STOCK',
    });
  });

  it('filters stock and alerts by branch code', async () => {
    prisma.branch.findUnique.mockResolvedValue({ id: 'branch-id' });
    prisma.material.findMany.mockResolvedValue([material()]);

    const result = await api.getInventoryAlerts('CN001');

    expect(prisma.branch.findUnique).toHaveBeenCalledWith({
      where: { code: 'CN001' },
    });
    expect(result.data).toHaveLength(1);
    expect(result.data[0].availableStock).toBe(5);
  });

  it('returns 404 for an unknown branch filter', async () => {
    prisma.branch.findUnique.mockResolvedValue(null);

    await expect(api.getInventory('UNKNOWN')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(prisma.material.findMany).not.toHaveBeenCalled();
  });
});

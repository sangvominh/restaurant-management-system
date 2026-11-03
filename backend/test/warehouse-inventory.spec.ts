import { describe, expect, it, vi } from 'vitest';
import { InventoryApi } from '../src/warehouse/api/inventory.api.js';
import { Prisma } from '../src/generated/prisma/client.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';

const decimal = (n: number) => new Prisma.Decimal(n);
function setup() {
  const material = {
    id: 'material',
    code: 'NVL001',
    name: 'Bột',
    status: 'ACTIVE',
    minStock: decimal(5),
    unit: { name: 'kg' },
    category: { name: 'Ngũ cốc' },
    lots: [
      {
        lotCode: 'LOT',
        status: 'ACTIVE',
        expiryDate: new Date('2099-12-31T00:00:00Z'),
        balances: [
          {
            quantity: decimal(3),
            location: {
              branchId: 'active',
              name: 'Kho',
              branch: { code: 'BR001', name: 'Đang mở', isActive: true },
            },
          },
          {
            quantity: decimal(10),
            location: {
              branchId: 'inactive',
              name: 'Kho',
              branch: { code: 'BR002', name: 'Đã đóng', isActive: false },
            },
          },
        ],
      },
    ],
  };
  const prisma = {
    material: {
      findMany: vi.fn().mockResolvedValue([material]),
      findUnique: vi.fn().mockResolvedValue(material),
    },
    branch: {
      findUnique: vi
        .fn()
        .mockImplementation(({ where }) => ({
          id: where.code === 'BR001' ? 'active' : 'inactive',
        })),
    },
  };
  return new InventoryApi(prisma as unknown as PrismaService);
}
describe('Inventory physical and available stock', () => {
  it('retains physical quantities but excludes inactive branches from availability', async () => {
    const result = await setup().getInventory();
    expect(result.data[0]).toMatchObject({
      totalStock: 13,
      availableStock: 3,
      stockStatus: 'LOW_STOCK',
    });
  });
  it('shows physical stock and zero available when explicitly filtering inactive branch', async () => {
    const result = await setup().getInventory('BR002');
    expect(result.data[0]).toMatchObject({ totalStock: 10, availableStock: 0 });
  });
  it('alerts use the available quantity from active branches', async () => {
    const result = await setup().getInventoryAlerts();
    expect(result.data).toHaveLength(1);
    expect(result.data[0].availableStock).toBe(3);
  });
  it('detail preserves inactive physical balances and marks them unavailable', async () => {
    const result = await setup().getInventoryByCode('NVL001', 'BR002');
    expect(result.data).toMatchObject({ totalStock: 10, availableStock: 0 });
    expect(result.data.lots[0]).toMatchObject({
      totalStock: 10,
      availableStock: 0,
      isAvailable: false,
    });
    expect(result.data.lots[0].locations[0]).toMatchObject({
      quantity: 10,
      availableQuantity: 0,
    });
  });
});

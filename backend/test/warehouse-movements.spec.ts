import { expect, it, vi } from 'vitest';
import { InventoryApi } from '../src/warehouse/api/inventory.api.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';

it('scopes history without discarding inactive-branch history', async () => {
  const prisma = {
    branch: {
      findUnique: vi
        .fn()
        .mockResolvedValue({ id: 'closed-branch', isActive: false }),
    },
    inventoryMovement: { findMany: vi.fn().mockResolvedValue([]) },
  };
  await new InventoryApi(
    prisma as unknown as PrismaService,
  ).getInventoryMovements('BR003');
  expect(prisma.inventoryMovement.findMany.mock.calls[0][0].where).toEqual({
    location: { branchId: 'closed-branch' },
  });
});

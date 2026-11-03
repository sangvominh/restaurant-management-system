import { describe, expect, it, vi } from 'vitest';
import { WarehouseReferenceApi } from '../src/warehouse/api/warehouse-reference.api.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';

describe('Warehouse reference lists', () => {
  const id = 'a6848ec1-0d59-4a7c-9285-ea24381e1638';
  function setup(active = true) {
    const prisma = {
      branch: {
        findMany: vi.fn().mockResolvedValue([]),
        findUnique: vi.fn().mockResolvedValue({ isActive: active }),
      },
      warehouseLocation: { findMany: vi.fn().mockResolvedValue([]) },
    };
    return {
      prisma,
      api: new WarehouseReferenceApi(prisma as unknown as PrismaService),
    };
  }
  it('queries only active branches', async () => {
    const { api, prisma } = setup();
    await api.getBranches();
    expect(prisma.branch.findMany.mock.calls[0][0].where).toEqual({
      isActive: true,
    });
  });
  it('scopes locations to the selected active branch', async () => {
    const { api, prisma } = setup();
    await api.getLocations(id);
    expect(
      prisma.warehouseLocation.findMany.mock.calls[0][0].where.branchId,
    ).toBe(id);
  });
  it('rejects invalid identifiers and inactive branches', async () => {
    await expect(setup().api.getLocations('bad')).rejects.toThrow('định danh');
    await expect(setup(false).api.getLocations(id)).rejects.toThrow(
      'không hoạt động',
    );
  });
});

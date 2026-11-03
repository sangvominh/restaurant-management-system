import { describe, expect, it, vi } from 'vitest';
import { MaterialAdjustmentApi } from '../src/warehouse/api/material-adjustment.api.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';

describe('Material adjustment read APIs', () => {
  const setup = () => {
    const prisma = {
      materialAdjustment: {
        findMany: vi.fn().mockResolvedValue([]),
        findUnique: vi.fn().mockResolvedValue(null),
      },
    };
    return {
      prisma,
      api: new MaterialAdjustmentApi(prisma as unknown as PrismaService),
    };
  };
  it('returns an empty real list and scopes type/status', async () => {
    const { api, prisma } = setup();
    expect((await api.getRequests('RETURN', 'PENDING'))?.data).toEqual([]);
    expect(prisma.materialAdjustment.findMany.mock.calls[0][0].where).toEqual({
      type: 'RETURN',
      status: 'PENDING',
    });
  });
  it('rejects invalid filters before reading data', async () => {
    const { api, prisma } = setup();
    await expect(api.getRequests('PRODUCT')).rejects.toThrow('Loại phiếu');
    await expect(api.getRequests('WASTE', 'BAD')).rejects.toThrow('Trạng thái');
    expect(prisma.materialAdjustment.findMany).not.toHaveBeenCalled();
  });
  it('reports missing documents', async () => {
    await expect(setup().api.getRequest('NONE')).rejects.toThrow(
      'Không tìm thấy',
    );
  });
});

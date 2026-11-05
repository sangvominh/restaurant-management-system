import { describe, expect, it, vi } from 'vitest';
import { MaterialIssueApi } from '../src/warehouse/api/material-issue.api.js';
import { Prisma } from '../src/generated/prisma/client.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';

function setup() {
  const branch = { isActive: true };
  const issue = {
    id: 'issue',
    issueCode: 'PX001',
    branchId: 'branch',
    branch,
    status: 'PENDING',
    details: [
      {
        materialId: 'material',
        materialLotId: 'lot',
        locationId: 'location',
        unitId: 'kg',
        quantity: new Prisma.Decimal(2),
        material: { code: 'NVL001', status: 'ACTIVE', unitId: 'kg' },
        materialLot: {
          materialId: 'material',
          status: 'ACTIVE',
          expiryDate: new Date('2099-12-31T00:00:00Z'),
        },
        location: { branchId: 'branch' },
        unit: { status: 'ACTIVE' },
      },
    ],
  };
  const tx = {
      staffAudit: { findFirst: vi.fn().mockResolvedValue(null) },
    materialIssue: {
      findUnique: vi.fn().mockResolvedValue(issue),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    materialBalance: {
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      findUniqueOrThrow: vi
        .fn()
        .mockResolvedValue({ quantity: new Prisma.Decimal(8) }),
    },
    inventoryMovement: { create: vi.fn() },
  };
  return {
    branch,
    tx,
    api: new MaterialIssueApi({
      $transaction: (fn: (client: typeof tx) => Promise<unknown>) => fn(tx),
    } as unknown as PrismaService),
  };
}

describe('Issue approval branch status', () => {
  it('approves an active branch and writes exactly one decrement/movement', async () => {
    const { api, tx } = setup();
    await expect(api.approveIssue('PX001')).resolves.toBeDefined();
    expect(tx.materialBalance.updateMany).toHaveBeenCalledTimes(1);
    expect(tx.inventoryMovement.create).toHaveBeenCalledTimes(1);
    expect(
      tx.inventoryMovement.create.mock.calls[0][0].data.quantityChange.toString(),
    ).toBe('-2');
  });
  it('checks the current branch status after the request was created', async () => {
    const { api, tx, branch } = setup();
    branch.isActive = false;
    await expect(api.approveIssue('PX001')).rejects.toThrow('ngừng hoạt động');
    expect(tx.materialIssue.updateMany).not.toHaveBeenCalled();
    expect(tx.materialBalance.updateMany).not.toHaveBeenCalled();
    expect(tx.inventoryMovement.create).not.toHaveBeenCalled();
  });
});

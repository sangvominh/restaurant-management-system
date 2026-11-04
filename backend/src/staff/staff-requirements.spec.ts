import { BadRequestException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import type { PrismaService } from '../prisma/prisma.service.js';
import { StaffService } from './staff.service.js';

const id = '40000000-0000-4000-8000-000000000041';
const user = { id: '10000000-0000-4000-8000-000000000201', code: 'DEMO-KITCHEN', name: 'Bếp', role: 'KITCHEN' as const, branchId: '10000000-0000-4000-8000-000000000001' };
const line = { id, menuItemId: '30000000-0000-4000-8000-000000000011', quantity: 2, status: 'QUEUED' };

describe('Kitchen material requirements', () => {
  const recipes = [
    { code: 'MEAT', name: 'Thịt', unit: 'kg', quantity: new Prisma.Decimal('0.2'), available: new Prisma.Decimal('0.1') },
    { code: 'MILK', name: 'Sữa', unit: 'lít', quantity: new Prisma.Decimal('0.1'), available: new Prisma.Decimal('0.05') },
  ];
  const tx = { orderLine: { findFirst: vi.fn(), update: vi.fn() }, $queryRaw: vi.fn() };
  const db = { $transaction: vi.fn((work: (client: typeof tx) => unknown) => work(tx)) };
  const service = new StaffService(db as unknown as PrismaService);
  beforeEach(() => { vi.clearAllMocks(); tx.orderLine.findFirst.mockResolvedValue(line); tx.$queryRaw.mockResolvedValue(recipes); });

  it('calculates the shortage for each ingredient using decimal arithmetic', async () => {
    const result = await service.lineRequirements(user, id);
    expect(result.map(x => [x.code, x.required, x.available, x.shortage])).toEqual([['MEAT','0.4','0.1','0.3'], ['MILK','0.2','0.05','0.15']]);
  });

  it('does not start a line when any ingredient is short', async () => {
    await expect(service.updateLine(user, id, { status: 'COOKING' })).rejects.toBeInstanceOf(BadRequestException);
    expect(tx.orderLine.update).not.toHaveBeenCalled();
  });

  it('rejects a menu item with no configured demo recipe', async () => {
    tx.$queryRaw.mockResolvedValue([]);
    await expect(service.lineRequirements(user, id)).rejects.toThrow('Món chưa có công thức giả lập.');
  });
});

import {
  calculateProductCapacity,
  ProductionCapacityApi,
} from './production-capacity.api.js';
import { Prisma } from '../../generated/prisma/client.js';
import type { PrismaService } from '../../prisma/prisma.service.js';

const d = (value: string | number) => new Prisma.Decimal(value);
const product = {
  code: 'TP1',
  name: 'Bánh mẫu',
  unit: 'cái',
  status: 'ACTIVE',
};
type Recipe = Parameters<typeof calculateProductCapacity>[0];
function recipe(): Recipe {
  return {
    productCode: 'TP1',
    productName: 'Tên cũ',
    outputQuantity: d(1),
    details: [
      {
        materialId: 'm1',
        unitId: 'kg',
        branchId: null,
        quantity: d(2),
        material: {
          name: 'Thịt bò',
          status: 'ACTIVE',
          unitId: 'kg',
          unit: { status: 'ACTIVE' },
        },
        unit: { status: 'ACTIVE', baseUnitId: null, conversionFactor: d(1) },
      },
    ],
  } as Recipe;
}
describe('Warehouse production capacity', () => {
  it('finds the limiting material across the entire recipe', () => {
    const bom = recipe();
    bom.outputQuantity = d(4);
    bom.details.push({ ...bom.details[0], materialId: 'm2', quantity: d(1) });
    expect(
      calculateProductCapacity(
        bom,
        product,
        new Map([
          ['m1', d(10)],
          ['m2', d(3)],
        ]),
        'b1',
      ).maxQuantity,
    ).toBe('12');
  });
  it('converts recipe units into the material base unit', () => {
    const bom = recipe();
    Object.assign(bom.details[0], { unitId: 'g', quantity: d(500) });
    Object.assign(bom.details[0].unit, {
      baseUnitId: 'kg',
      conversionFactor: d('0.001'),
    });
    expect(
      calculateProductCapacity(bom, product, new Map([['m1', d('1.25')]]), 'b1')
        .maxQuantity,
    ).toBe('2');
  });
  it('scales batch output before rounding down whole products', () => {
    const bom = recipe();
    bom.outputQuantity = d(4);
    bom.details[0].quantity = d(3);
    expect(
      calculateProductCapacity(bom, product, new Map([['m1', d(5)]]), 'b1')
        .maxQuantity,
    ).toBe('6');
  });
  it('identifies the missing product code and the team responsible for completing it', () => {
    const result = calculateProductCapacity(
      recipe(),
      undefined,
      new Map(),
      'b1',
    );
    expect(result.reason).toContain('TP1');
    expect(result.reason).toContain('Quản lý Nhà hàng');
    expect(result.reason).toContain('đơn vị tính');
    expect(result).toMatchObject({ maxQuantity: null, status: 'UNAVAILABLE' });
  });
  it('returns zero when any required material is unavailable', () => {
    expect(
      calculateProductCapacity(recipe(), product, new Map(), 'b1'),
    ).toMatchObject({ maxQuantity: '0', status: 'SHORTAGE' });
  });
  it('names only genuinely missing materials, without listing the full recipe', () => {
    const bom = recipe();
    bom.details.push({
      ...bom.details[0],
      materialId: 'm2',
      material: { ...bom.details[0].material, name: 'Muối' },
    });
    const result = calculateProductCapacity(
      bom,
      product,
      new Map([['m2', d(10)]]),
      'b1',
    );
    expect(result).toMatchObject({
      maxQuantity: '0',
      status: 'SHORTAGE',
      reason: 'Thịt bò thiếu. Đang chờ nhập kho.',
    });
    expect(result.reason).not.toContain('Muối');
  });
  it('lists multiple shortages after checking unit conversions', () => {
    const bom = recipe();
    Object.assign(bom.details[0], { unitId: 'g', quantity: d(500) });
    Object.assign(bom.details[0].unit, {
      baseUnitId: 'kg',
      conversionFactor: d('0.001'),
    });
    bom.details.push({
      ...bom.details[0],
      materialId: 'm2',
      material: { ...bom.details[0].material, name: 'Hành tây' },
    });
    const result = calculateProductCapacity(
      bom,
      product,
      new Map([['m1', d('0.4')]]),
      'b1',
    );
    expect(result.reason).toBe('Thịt bò, Hành tây thiếu. Đang chờ nhập kho.');
  });
  it.each([
    'missing-product',
    'inactive-product',
    'empty-recipe',
    'zero-output',
    'zero-input',
    'inactive-material',
    'inactive-unit',
    'wrong-unit',
    'wrong-branch',
  ])('blocks invalid data: %s', (kind) => {
    const bom = recipe();
    let current: typeof product | undefined = product;
    if (kind === 'missing-product') current = undefined;
    if (kind === 'inactive-product')
      current = { ...product, status: 'INACTIVE' };
    if (kind === 'empty-recipe') bom.details = [];
    if (kind === 'zero-output') bom.outputQuantity = d(0);
    if (kind === 'zero-input') bom.details[0].quantity = d(0);
    if (kind === 'inactive-material')
      bom.details[0].material.status = 'INACTIVE';
    if (kind === 'inactive-unit') bom.details[0].unit.status = 'INACTIVE';
    if (kind === 'wrong-unit') bom.details[0].unitId = 'invalid';
    if (kind === 'wrong-branch') bom.details[0].branchId = 'b2';
    expect(
      calculateProductCapacity(bom, current, new Map([['m1', d(10)]]), 'b1'),
    ).toMatchObject({ maxQuantity: null, status: 'UNAVAILABLE' });
  });
  function setup() {
    const latest = recipe(),
      older = recipe();
    older.details[0].quantity = d(1);
    const tx = {
      branch: {
        findUnique: vi
          .fn()
          .mockResolvedValue({
            id: 'b1',
            code: 'CN1',
            name: 'Kho',
            isActive: true,
          }),
      },
      bom: { findMany: vi.fn().mockResolvedValue([latest, older]) },
      product: { findMany: vi.fn().mockResolvedValue([product]) },
      materialBalance: {
        findMany: vi.fn().mockResolvedValue([
          {
            quantity: d(4),
            materialLot: {
              materialId: 'm1',
              expiryDate: new Date('2099-12-31'),
            },
          },
          {
            quantity: d(100),
            materialLot: {
              materialId: 'm1',
              expiryDate: new Date('2000-01-01'),
            },
          },
          {
            quantity: d(100),
            materialLot: { materialId: 'm1', expiryDate: null },
          },
        ]),
      },
    };
    const db = { $transaction: vi.fn(async (callback) => callback(tx)) };
    return {
      tx,
      db,
      api: new ProductionCapacityApi(db as unknown as PrismaService),
    };
  }
  it('excludes expired/undated lots and uses the latest active recipe once', async () => {
    const { api, db, tx } = setup();
    const result = await api.getCapacity('CN1');
    expect(result.data.items).toHaveLength(1);
    expect(result.data.items[0].maxQuantity).toBe('2');
    expect(tx.materialBalance.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          location: { branchId: 'b1', locationType: { not: 'FINISHED_GOODS' } },
        }),
      }),
    );
    expect(db.$transaction).toHaveBeenCalledWith(expect.any(Function), {
      isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
    });
  });
  it('returns product results without revealing recipe fields', async () => {
    const { api } = setup();
    const result = await api.getCapacity('CN1');
    expect(Object.keys(result.data.items[0]).sort()).toEqual(
      [
        'productCode',
        'productName',
        'unit',
        'maxQuantity',
        'status',
        'reason',
      ].sort(),
    );
  });
  it('requires an existing active branch', async () => {
    const { api, tx } = setup();
    await expect(api.getCapacity('')).rejects.toMatchObject({ status: 400 });
    tx.branch.findUnique.mockResolvedValueOnce(null);
    await expect(api.getCapacity('missing')).rejects.toMatchObject({
      status: 404,
    });
    tx.branch.findUnique.mockResolvedValueOnce({
      id: 'b1',
      code: 'CN1',
      name: 'Kho',
      isActive: false,
    });
    await expect(api.getCapacity('CN1')).rejects.toMatchObject({ status: 400 });
  });
});

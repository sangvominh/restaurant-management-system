import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MaterialApi } from './material.api.js';

describe('MaterialApi', () => {
  let prisma: {
    material: {
      findMany: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      create: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
    };
    category: { findFirst: ReturnType<typeof vi.fn> };
    unit: { findFirst: ReturnType<typeof vi.fn> };
  };
  let api: MaterialApi;

  beforeEach(() => {
    prisma = {
      material: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
      category: { findFirst: vi.fn() },
      unit: { findFirst: vi.fn() },
    };
    api = new MaterialApi(prisma as unknown as PrismaService);
  });

  it('creates material with active category and base unit links', async () => {
    prisma.category.findFirst.mockResolvedValue({
      id: 'category-id',
      name: 'Thịt',
    });
    prisma.unit.findFirst.mockResolvedValue({
      id: 'unit-id',
      name: 'kg',
      baseUnitId: null,
    });
    prisma.material.create.mockResolvedValue({
      code: 'NVL001',
      name: 'Thịt bò',
      minStock: new Prisma.Decimal('5'),
      status: 'ACTIVE',
    });

    await api.createMaterial({
      code: ' NVL001 ',
      name: ' Thịt bò ',
      categoryName: 'Thịt',
      categoryType: 'MATERIAL',
      unitName: 'kg',
      minStock: '5',
    });

    expect(prisma.material.create).toHaveBeenCalledWith({
      data: {
        code: 'NVL001',
        name: 'Thịt bò',
        categoryId: 'category-id',
        unitId: 'unit-id',
        minStock: new Prisma.Decimal('5'),
        status: 'ACTIVE',
      },
    });
  });

  it('does not create material when the category is missing', async () => {
    prisma.category.findFirst.mockResolvedValue(null);

    await expect(
      api.createMaterial({
        code: 'NVL001',
        name: 'Thịt bò',
        categoryName: 'Không có',
        categoryType: 'MATERIAL',
        unitName: 'kg',
        minStock: '5',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.material.create).not.toHaveBeenCalled();
  });

  it('rejects an empty update without writing to the database', async () => {
    await expect(api.updateMaterial('NVL001', {})).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(prisma.material.update).not.toHaveBeenCalled();
  });

  it('updates minStock as a Decimal and looks up by short code', async () => {
    prisma.material.update.mockResolvedValue({
      code: 'NVL001',
      minStock: new Prisma.Decimal('8.5'),
    });

    await api.updateMaterial(' NVL001 ', { minStock: '8.5' });

    expect(prisma.material.update).toHaveBeenCalledWith({
      where: { code: 'NVL001' },
      data: { minStock: new Prisma.Decimal('8.5') },
    });
  });
});

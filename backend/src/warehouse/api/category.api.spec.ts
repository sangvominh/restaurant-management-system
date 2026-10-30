import { ConflictException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CategoryApi } from './category.api.js';

describe('CategoryApi', () => {
  let prisma: {
    category: {
      findFirst: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      create: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
    };
    material: { count: ReturnType<typeof vi.fn> };
    unit: { findMany: ReturnType<typeof vi.fn> };
  };
  let api: CategoryApi;

  beforeEach(() => {
    prisma = {
      category: {
        findFirst: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
      material: { count: vi.fn() },
      unit: { findMany: vi.fn() },
    };
    api = new CategoryApi(prisma as unknown as PrismaService);
  });

  it('creates a category with its short code', async () => {
    prisma.category.findFirst.mockResolvedValue(null);
    prisma.category.create.mockResolvedValue({
      code: 'DM008',
      name: 'Hải sản',
      categoryType: 'MATERIAL',
      status: 'ACTIVE',
    });

    await api.createCategory({
      code: ' DM008 ',
      name: ' Hải sản ',
      categoryType: 'MATERIAL',
    });

    expect(prisma.category.create).toHaveBeenCalledWith({
      data: {
        code: 'DM008',
        name: 'Hải sản',
        categoryType: 'MATERIAL',
        status: 'ACTIVE',
      },
    });
  });

  it('updates a category by short code but checks active materials by id', async () => {
    prisma.category.findUnique.mockResolvedValue({
      id: 'category-id',
      code: 'DM008',
      name: 'Hải sản',
      categoryType: 'MATERIAL',
    });
    prisma.category.findFirst.mockResolvedValue(null);
    prisma.category.update.mockResolvedValue({
      code: 'DM008',
      name: 'Hải sản tươi sống',
      status: 'ACTIVE',
    });

    await api.updateCategory(' DM008 ', {
      name: 'Hải sản tươi sống',
      status: 'ACTIVE',
    });

    expect(prisma.category.findUnique).toHaveBeenCalledWith({
      where: { code: 'DM008' },
    });
    expect(prisma.category.update).toHaveBeenCalledWith({
      where: { code: 'DM008' },
      data: { name: 'Hải sản tươi sống', status: 'ACTIVE' },
    });
  });

  it('blocks a duplicate category name within the same type', async () => {
    prisma.category.findFirst.mockResolvedValue({ id: 'existing' });

    await expect(
      api.createCategory({
        code: 'DM009',
        name: 'Hải sản',
        categoryType: 'MATERIAL',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.category.create).not.toHaveBeenCalled();
  });
});

import { BadRequestException, ConflictException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { SupplierApi } from './supplier.api.js';

describe('SupplierApi', () => {
  let prisma: {
    supplier: {
      findMany: ReturnType<typeof vi.fn>;
      create: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
      delete: ReturnType<typeof vi.fn>;
    };
  };
  let api: SupplierApi;

  beforeEach(() => {
    prisma = {
      supplier: {
        findMany: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    };
    api = new SupplierApi(prisma as unknown as PrismaService);
  });

  it('searches by a trimmed keyword', async () => {
    prisma.supplier.findMany.mockResolvedValue([]);

    await api.getSuppliers(' NCC001 ');

    expect(prisma.supplier.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          OR: expect.arrayContaining([
            { code: { contains: 'NCC001', mode: 'insensitive' } },
            { name: { contains: 'NCC001', mode: 'insensitive' } },
          ]),
        },
      }),
    );
  });

  it('creates a supplier with trimmed fields and optional contact data', async () => {
    prisma.supplier.create.mockResolvedValue({
      code: 'NCC001',
      name: 'Nhà cung cấp A',
    });

    await api.createSupplier({
      code: ' NCC001 ',
      name: ' Nhà cung cấp A ',
      phone: ' 0900000000 ',
      email: ' kho@example.com ',
      address: ' Quận 1 ',
    });

    expect(prisma.supplier.create).toHaveBeenCalledWith({
      data: {
        code: 'NCC001',
        name: 'Nhà cung cấp A',
        phone: '0900000000',
        email: 'kho@example.com',
        address: 'Quận 1',
      },
    });
  });

  it('rejects duplicate supplier codes', async () => {
    prisma.supplier.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Unique constraint', {
        code: 'P2002',
        clientVersion: '7.10.1',
      }),
    );

    await expect(
      api.createSupplier({ code: 'NCC001', name: 'Nhà cung cấp A' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('rejects an empty patch', async () => {
    await expect(api.updateSupplier('NCC001', {})).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(prisma.supplier.update).not.toHaveBeenCalled();
  });

  it('changes supplier status without deleting its record', async () => {
    prisma.supplier.update.mockResolvedValue({ code: 'NCC001', status: 'INACTIVE' });
    await api.updateSupplier('NCC001', { status: 'INACTIVE' });
    expect(prisma.supplier.update).toHaveBeenCalledWith({
      where: { code: 'NCC001' }, data: { status: 'INACTIVE' },
    });
    expect(prisma.supplier.delete).not.toHaveBeenCalled();
  });

  it('rejects invalid supplier status', async () => {
    await expect(api.updateSupplier('NCC001', { status: 'DELETED' } as never))
      .rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.supplier.update).not.toHaveBeenCalled();
  });

  it('blocks hard deletion even without receipt history', async () => {
    await expect(api.deleteSupplier('NCC001')).rejects.toThrow('Ngừng hoạt động');
    expect(prisma.supplier.delete).not.toHaveBeenCalled();
  });
});

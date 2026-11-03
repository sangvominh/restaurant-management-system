import { BadRequestException, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class WarehouseReferenceApi {
  constructor(private readonly prisma: PrismaService) {}

  async getBranches() {
    return {
      message: 'Danh sách chi nhánh hoạt động',
      data: await this.prisma.branch.findMany({
        where: { isActive: true },
        select: { id: true, code: true, name: true },
        orderBy: { name: 'asc' },
      }),
    };
  }

  async getLocations(branchId: string) {
    if (!isUUID(branchId ?? ''))
      throw new BadRequestException('Mã định danh chi nhánh không hợp lệ');
    const branch = await this.prisma.branch.findUnique({
      where: { id: branchId },
    });
    if (!branch?.isActive)
      throw new BadRequestException('Chi nhánh không hoạt động');
    return {
      message: 'Danh sách vị trí kho',
      data: await this.prisma.warehouseLocation.findMany({
        where: { branchId, locationType: { not: 'FINISHED_GOODS' } },
        select: { id: true, name: true, branchId: true },
        orderBy: { name: 'asc' },
      }),
    };
  }
}

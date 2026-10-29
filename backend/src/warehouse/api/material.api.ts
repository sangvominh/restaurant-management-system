
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { Prisma } from '../../generated/prisma/client.js';
import { CreateMaterialDto } from '../dto/create-material.dto.js';

@Injectable()
export class MaterialApi {
  constructor(private readonly prisma: PrismaService) {}

  // Danh sách nguyên vật liệu
  async getMaterials(search?: string) {
    const keyword = search?.trim();

    const materials = await this.prisma.material.findMany({
      where: keyword
        ? {
            OR: [
              { code: { contains: keyword, mode: 'insensitive' } },
              { name: { contains: keyword, mode: 'insensitive' } },
            ],
          }
        : undefined,
      include: {
        category: true,
        unit: true,
      },
      orderBy: { name: 'asc' },
      take: 50,
    });

    return {
      message: 'Lấy danh sách NVL thành công',
      data: materials.map((item) => ({
        code: item.code,
        name: item.name,
        categoryName: item.category.name,
        unitName: item.unit.name,
        minStock: item.minStock.toString(),
        status: item.status,
      })),
    };
  }

  // hêm nguyên vật liệu
  async createMaterial(dto: CreateMaterialDto) {
    const code = dto.code.trim();
    const name = dto.name.trim();

    if (!code || !name) {
      throw new BadRequestException('Mã và tên không được để trống');
    }

    // 1. Tìm loại NVL
    const category = await this.prisma.category.findFirst({
      where: {
        name: dto.categoryName.trim(),
        categoryType: dto.categoryType.trim(),
        status: 'ACTIVE',
      },
    });

    if (!category) {
      throw new NotFoundException('Không tìm thấy loại NVL');
    }

    // 2. Tìm đơn vị cơ sở
    const unit = await this.prisma.unit.findFirst({
      where: {
        name: dto.unitName.trim(),
        baseUnitId: null,
        status: 'ACTIVE',
      },
    });

    if (!unit) {
      throw new NotFoundException('Không tìm thấy đơn vị tính');
    }

    // 3. Lưu nguyên vật liệu
    try {
      const material = await this.prisma.material.create({
        data: {
          code,
          name,
          categoryId: category.id,
          unitId: unit.id,
          minStock: new Prisma.Decimal(dto.minStock),
          status: 'ACTIVE',
        },
      });

      return {
        message: 'Thêm NVL thành công',
        data: {
          code: material.code,
          name: material.name,
          categoryName: category.name,
          unitName: unit.name,
          minStock: material.minStock.toString(),
          status: material.status,
        },
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Mã NVL đã tồn tại');
      }

      throw error;
    }
  }
}

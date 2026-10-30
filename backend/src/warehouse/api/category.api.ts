import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { Prisma } from '../../generated/prisma/client.js';
import { CreateCategoryDto } from '../dto/create-category.dto.js';
import { UpdateCategoryDto } from '../dto/update-category.dto.js';

@Injectable()
export class CategoryApi {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories() {
    const categories = await this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      take: 100,
    });

    return {
      message: 'Lấy danh mục NVL thành công',
      data: categories,
    };
  }

  //thêm danh mục NVL
  async createCategory(dto: CreateCategoryDto) {
    const code = dto.code.trim();
    const name = dto.name.trim();
    const categoryType = dto.categoryType.trim();

    if (!code) {
      throw new BadRequestException('Mã danh mục không được để trống');
    }

    if (!name || !categoryType) {
      throw new BadRequestException('Thông tin không được để trống');
    }

    // 1. Kiểm tra trùng
    const exists = await this.prisma.category.findFirst({
      where: {
        OR: [
          { code },
          {
            name: { equals: name, mode: 'insensitive' },
            categoryType,
          },
        ],
      },
    });

    if (exists) {
      throw new ConflictException('Mã hoặc tên danh mục đã tồn tại');
    }

    // 2. Thêm danh mục
    try {
      const category = await this.prisma.category.create({
        data: {
          code,
          name,
          categoryType,
          status: 'ACTIVE',
        },
      });

      return {
        message: 'Thêm danh mục thành công',
        data: category,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Mã danh mục hoặc danh mục đã tồn tại');
      }

      throw error;
    }
  }

  //cập nhật danh mục nvl
  async updateCategory(code: string, dto: UpdateCategoryDto) {
    // 1. Tìm danh mục
    const category = await this.prisma.category.findUnique({
      where: { code: code.trim() },
    });

    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }

    // 2. Kiểm tra dữ liệu
    const data: Prisma.CategoryUpdateInput = {};

    if (dto.name !== undefined) {
      const name = dto.name.trim();

      if (!name) {
        throw new BadRequestException('Tên không được để trống');
      }

      data.name = name;
    }

    if (dto.status !== undefined) {
      data.status = dto.status;
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('Chưa có thông tin cập nhật');
    }

    if (dto.name !== undefined) {
      const name = dto.name.trim();
      const duplicate = await this.prisma.category.findFirst({
        where: {
          id: { not: category.id },
          name: { equals: name, mode: 'insensitive' },
          categoryType: category.categoryType,
        },
      });

      if (duplicate) {
        throw new ConflictException('Tên danh mục đã tồn tại');
      }
    }

    // Không ngừng sử dụng loại NVL đang có NVL hoạt động
    if (dto.status === 'INACTIVE') {
      const count = await this.prisma.material.count({
        where: { categoryId: category.id, status: 'ACTIVE' },
      });

      if (count > 0) {
        throw new ConflictException('Danh mục đang được sử dụng');
      }
    }

    // 3. Cập nhật
    try {
      const updated = await this.prisma.category.update({
        where: { code: code.trim() },
        data,
      });

      return {
        message: 'Cập nhật danh mục thành công',
        data: updated,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Tên danh mục đã tồn tại');
        }

        if (error.code === 'P2025') {
          throw new NotFoundException('Không tìm thấy danh mục');
        }
      }

      throw error;
    }
  }

  //lấy danh sách đơn vị tính
  async getUnits() {
    const units = await this.prisma.unit.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { name: 'asc' },
    });

    return {
      message: 'Lấy đơn vị tính thành công',
      data: units.map((unit) => ({
        id: unit.id,
        name: unit.name,
        baseUnitId: unit.baseUnitId,
        conversionFactor: unit.conversionFactor.toString(),
      })),
    };
  }
}


import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

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
}

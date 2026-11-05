import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { QueryProductDto } from './dto/query-product.dto.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // Tạo món ăn mới
  async create(dto: CreateProductDto) {
    const existing = await this.prisma.product.findUnique({
      where: { code: dto.code.trim().toUpperCase() },
    });

    if (existing) {
      throw new ConflictException(`Mã món ăn '${dto.code}' đã tồn tại trong hệ thống.`);
    }

    return this.prisma.product.create({
      data: {
        code: dto.code.trim().toUpperCase(),
        name: dto.name.trim(),
        category: dto.category.trim(),
        price: new Prisma.Decimal(dto.price),
        unit: dto.unit?.trim() || 'phần',
        imageUrl: dto.imageUrl?.trim() || null,
        description: dto.description?.trim() || null,
        status: dto.status || 'ACTIVE',
      },
    });
  }

  // Danh sách món ăn: Tìm kiếm nâng cao, Lọc, Sắp xếp, Phân trang
  async findAll(query: QueryProductDto) {
    const {
      search,
      category,
      status,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = query;

    const where: Prisma.ProductWhereInput = {};

    // 1. Tìm kiếm nâng cao: khớp theo tên, mã món hoặc mô tả
    if (search && search.trim() !== '') {
      const keyword = search.trim();
      where.OR = [
        { name: { contains: keyword, mode: 'insensitive' } },
        { code: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    // 2. Lọc theo nhóm món ăn
    if (category && category !== 'Tất cả' && category !== 'Tất cả phân loại') {
      where.category = { equals: category, mode: 'insensitive' };
    }

    // 3. Lọc theo trạng thái
    if (status && status !== 'Tất cả') {
      where.status = status;
    }

    // 4. Lọc theo khoảng giá
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price.gte = new Prisma.Decimal(minPrice);
      }
      if (maxPrice !== undefined) {
        where.price.lte = new Prisma.Decimal(maxPrice);
      }
    }

    // 5. Sắp xếp
    const orderDirection = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';
    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      [sortBy]: orderDirection,
    };

    // 6. Phân trang
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          boms: {
            select: {
              id: true,
              code: true,
              version: true,
              status: true,
            },
          },
          finishedGoodsBalances: {
            select: {
              quantity: true,
              location: {
                select: {
                  name: true,
                  branch: { select: { name: true, code: true } },
                },
              },
            },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    // Format kết quả trả về
    const data = items.map((p) => {
      const totalStock = p.finishedGoodsBalances.reduce(
        (sum, b) => sum + Number(b.quantity),
        0,
      );

      return {
        id: p.id,
        code: p.code,
        name: p.name,
        category: p.category,
        price: Number(p.price),
        unit: p.unit,
        imageUrl: p.imageUrl,
        description: p.description,
        status: p.status,
        totalStock,
        bomCount: p.boms.length,
        activeBom: p.boms.find((b) => b.status === 'ACTIVE') ?? null,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      };
    });

    return {
      data,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / take) || 1,
      },
    };
  }

  // Lấy chi tiết món ăn
  async findOne(code: string) {
    const product = await this.prisma.product.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        boms: {
          include: {
            details: {
              include: {
                material: true,
                unit: true,
              },
            },
          },
        },
        finishedGoodsBalances: {
          include: {
            location: {
              include: {
                branch: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy món ăn với mã '${code}'.`);
    }

    const totalStock = product.finishedGoodsBalances.reduce(
      (sum, b) => sum + Number(b.quantity),
      0,
    );

    return {
      id: product.id,
      code: product.code,
      name: product.name,
      category: product.category,
      price: Number(product.price),
      unit: product.unit,
      imageUrl: product.imageUrl,
      description: product.description,
      status: product.status,
      totalStock,
      boms: product.boms.map((b) => ({
        id: b.id,
        code: b.code,
        version: b.version,
        outputQuantity: Number(b.outputQuantity),
        status: b.status,
        materialsCount: b.details.length,
        materials: b.details.map((d) => ({
          materialCode: d.material.code,
          materialName: d.material.name,
          quantity: Number(d.quantity),
          unitName: d.unit.name,
        })),
      })),
      stockLocations: product.finishedGoodsBalances.map((b) => ({
        locationName: b.location.name,
        branchName: b.location.branch.name,
        quantity: Number(b.quantity),
      })),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  // Cập nhật thông tin món ăn
  async update(code: string, dto: UpdateProductDto) {
    await this.findOne(code);

    const updateData: Prisma.ProductUpdateInput = {};
    if (dto.name !== undefined) updateData.name = dto.name.trim();
    if (dto.category !== undefined) updateData.category = dto.category.trim();
    if (dto.price !== undefined) updateData.price = new Prisma.Decimal(dto.price);
    if (dto.unit !== undefined) updateData.unit = dto.unit.trim();
    if (dto.imageUrl !== undefined) updateData.imageUrl = dto.imageUrl?.trim() || null;
    if (dto.description !== undefined) updateData.description = dto.description?.trim() || null;
    if (dto.status !== undefined) updateData.status = dto.status;

    return this.prisma.product.update({
      where: { code: code.toUpperCase() },
      data: updateData,
    });
  }

  // Xóa món ăn (kiểm tra ràng buộc kho và đơn sản xuất)
  async remove(code: string) {
    const product = await this.findOne(code);

    // Kiểm tra có đang tồn kho không
    if (product.totalStock > 0) {
      throw new BadRequestException(
        `Không thể xóa món ăn '${code}' vì còn ${product.totalStock} ${product.unit} trong kho. Vui lòng thanh lý hoặc điều chuyển trước.`,
      );
    }

    return this.prisma.product.delete({
      where: { code: code.toUpperCase() },
    });
  }

  // Lấy danh sách nhóm món duy nhất (cho Dropdown Filter)
  async getCategories() {
    const categories = await this.prisma.product.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });
    return categories.map((c) => c.category);
  }

  // API lấy tồn kho thành phẩm thật (kết nối trực tiếp DB, thay thế mock FE)
  async getFinishedGoodsRealStock() {
    const products = await this.prisma.product.findMany({
      include: {
        boms: {
          where: { status: 'ACTIVE' },
          select: { code: true, version: true },
        },
        finishedGoodsBalances: {
          include: {
            location: {
              include: { branch: true },
            },
          },
        },
      },
      orderBy: { code: 'asc' },
    });

    return products.map((p) => {
      const currentStock = p.finishedGoodsBalances.reduce(
        (sum, b) => sum + Number(b.quantity),
        0,
      );

      // Định mức minStock tạm tính
      const targetStock = 20;
      let status = 'An toàn';
      if (currentStock === 0 || currentStock < targetStock * 0.5) {
        status = 'Dưới định mức';
      } else if (currentStock < targetStock) {
        status = 'Sắp hết';
      }

      return {
        code: p.code,
        name: p.name,
        category: p.category,
        price: Number(p.price),
        unit: p.unit,
        imageUrl: p.imageUrl,
        quantity: currentStock,
        minimum: targetStock,
        status,
        bomCode: p.boms[0]?.code ?? 'Chưa tạo BOM',
        locations: p.finishedGoodsBalances.map((b) => ({
          branch: b.location.branch.name,
          location: b.location.name,
          quantity: Number(b.quantity),
        })),
      };
    });
  }
}


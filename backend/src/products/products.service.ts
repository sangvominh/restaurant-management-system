import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Between, Like, ILike } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { QueryProductDto } from './dto/query-product.dto.js';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(query: QueryProductDto): Promise<PaginatedResult<Product>> {
    const {
      search,
      category,
      status,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      page = 1,
      limit = 10,
    } = query;

    const qb = this.productsRepository.createQueryBuilder('product');

    // Tìm kiếm theo tên (không phân biệt hoa thường)
    if (search) {
      qb.andWhere('LOWER(product.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    // Lọc theo danh mục
    if (category) {
      qb.andWhere('product.category = :category', { category });
    }

    // Lọc theo trạng thái
    if (status) {
      qb.andWhere('product.status = :status', { status });
    }

    // Lọc theo khoảng giá
    if (minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', { minPrice });
    }
    if (maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    // Sắp xếp
    const allowedSortFields = ['name', 'price', 'category', 'createdAt'];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    qb.orderBy(`product.${safeSortBy}`, sortOrder);

    // Phân trang
    const skip = (page - 1) * limit;
    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Sản phẩm #${id} không tồn tại`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }

  // Lấy danh sách category duy nhất (dùng cho filter dropdown)
  async getCategories(): Promise<string[]> {
    const result = await this.productsRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .getRawMany<{ category: string }>();
    return result.map((r) => r.category);
  }
}


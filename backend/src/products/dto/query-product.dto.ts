import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ProductStatus } from '../entities/product.entity.js';

export type SortOrder = 'ASC' | 'DESC';

export class QueryProductDto {
  @ApiPropertyOptional({ description: 'Tìm theo tên sản phẩm' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Lọc theo danh mục' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: ProductStatus, description: 'Lọc theo trạng thái' })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional({ description: 'Giá tối thiểu' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Giá tối đa' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Sắp xếp theo trường',
    enum: ['name', 'price', 'category', 'createdAt'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'price' | 'category' | 'createdAt' = 'createdAt';

  @ApiPropertyOptional({
    description: 'Thứ tự sắp xếp',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsString()
  sortOrder?: SortOrder = 'DESC';

  @ApiPropertyOptional({ description: 'Số trang (bắt đầu từ 1)', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Số item mỗi trang', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 10;
}


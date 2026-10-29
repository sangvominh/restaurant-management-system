import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ProductStatus } from '../entities/product.entity.js';

export class CreateProductDto {
  @ApiProperty({ description: 'Tên sản phẩm', example: 'Bánh mì thịt' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ description: 'Mô tả sản phẩm' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Danh mục', example: 'Bánh mì' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  category: string;

  @ApiProperty({ description: 'Giá bán (VND)', example: 25000 })
  @IsInt()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ description: 'Đơn vị tính', example: 'cái', default: 'cái' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  unit?: string;

  @ApiPropertyOptional({ enum: ProductStatus, default: ProductStatus.ACTIVE })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}


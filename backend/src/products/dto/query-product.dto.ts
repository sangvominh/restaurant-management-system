import { IsIn, IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryProductDto {
  // Tìm kiếm nâng cao theo tên, mã món hoặc mô tả
  @IsOptional()
  @IsString()
  search?: string;

  // Lọc theo nhóm món ăn (Pizza, Mì Ý, Khai vị, Tráng miệng...)
  @IsOptional()
  @IsString()
  category?: string;

  // Lọc theo trạng thái (ACTIVE, INACTIVE)
  @IsOptional()
  @IsString()
  status?: string;

  // Lọc khoảng giá
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  // Sắp xếp
  @IsOptional()
  @IsIn(['name', 'price', 'code', 'createdAt'])
  sortBy?: 'name' | 'price' | 'code' | 'createdAt' = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc', 'ASC', 'DESC'])
  sortOrder?: 'asc' | 'desc' | 'ASC' | 'DESC' = 'desc';

  // Phân trang
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 10;
}


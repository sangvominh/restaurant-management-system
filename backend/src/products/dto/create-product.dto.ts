import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Mã món ăn không được để trống' })
  @IsString()
  code: string;

  @IsNotEmpty({ message: 'Tên món ăn không được để trống' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Nhóm món ăn không được để trống' })
  @IsString()
  category: string;

  @IsNotEmpty({ message: 'Giá bán không được để trống' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Giá bán phải là số' })
  @Min(0, { message: 'Giá bán không được âm' })
  price: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;
}


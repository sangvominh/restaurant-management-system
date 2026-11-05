
import {
  IsString,
  IsNotEmpty,
  Matches,
  MaxLength,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsOptional,
} from 'class-validator';

import { Type } from 'class-transformer';

export class BomDetailDto {
  @IsString()
  @IsNotEmpty()
  materialCode: string;

  @IsString()
  @IsNotEmpty()
  unitName: string;

  @IsString()
  @Matches(/^\d{1,15}(\.\d{1,3})?$/)
  quantity: string;
}

export class CreateBomDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  productCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  productName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @Matches(/^\d{1,15}(\.\d{1,2})?$/)
  price?: string;

  @IsString()
  @Matches(/^\d{1,15}(\.\d{1,3})?$/)
  outputQuantity: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => BomDetailDto)
  details: BomDetailDto[];
}

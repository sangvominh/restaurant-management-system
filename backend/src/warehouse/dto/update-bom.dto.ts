import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BomDetailDto } from './create-bom.dto.js';

export class UpdateBomDto {
  @IsString()
  @MaxLength(150)
  productName: string;

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

export class NewVersionBomDto extends UpdateBomDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  code?: string;
}

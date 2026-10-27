
import {
  IsString,
  IsNotEmpty,
  Matches,
  MaxLength,
  IsArray,
  ArrayMinSize,
  ValidateNested,
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

  @IsString()
  @Matches(/^\d{1,15}(\.\d{1,3})?$/)
  outputQuantity: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => BomDetailDto)
  details: BomDetailDto[];
}

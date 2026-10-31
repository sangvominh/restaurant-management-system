import {
  IsString,
  IsOptional,
  MaxLength,
  Matches,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BomDetailDto } from './create-bom.dto.js';

export class CreateBomVersionDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  newCode?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,15}(\.\d{1,3})?$/, {
    message: 'Sản lượng đầu ra phải là số hợp lệ',
  })
  outputQuantity?: string;

  @IsOptional()
  @IsBoolean()
  deactivateOldVersion?: boolean = true;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BomDetailDto)
  details?: BomDetailDto[];
}


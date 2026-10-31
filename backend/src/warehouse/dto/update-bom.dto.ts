import {
  IsString,
  IsOptional,
  Matches,
  IsArray,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BomDetailDto } from './create-bom.dto.js';

export class UpdateBomDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,15}(\.\d{1,3})?$/, {
    message: 'Sản lượng đầu ra phải là số hợp lệ',
  })
  outputQuantity?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ACTIVE', 'INACTIVE', 'DRAFT', 'ARCHIVED'], {
    message: 'Trạng thái phải là ACTIVE, INACTIVE, DRAFT hoặc ARCHIVED',
  })
  status?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BomDetailDto)
  details?: BomDetailDto[];
}


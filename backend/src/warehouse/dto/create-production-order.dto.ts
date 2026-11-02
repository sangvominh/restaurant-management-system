
import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateProductionOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @IsString()
  @IsNotEmpty()
  bomCode: string;

  @IsString()
  @IsNotEmpty()
  branchCode: string;

  @IsIn(['MAKE_TO_STOCK', 'HYBRID'])
  productionMode: string;

  @IsString()
  @Matches(/^\d{1,15}(\.\d{1,3})?$/)
  quantity: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

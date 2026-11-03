import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class ApproveMaterialAdjustmentDto {
  @IsString()
  @Matches(/^(?=.*[1-9])\d{1,15}(?:\.\d{1,3})?$/)
  acceptedQuantity: string;

  @IsOptional()
  @IsIn(['ACCEPTABLE', 'UNACCEPTABLE'])
  qualityStatus?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

export class RejectMaterialAdjustmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  reason: string;
}

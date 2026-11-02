import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Matches,
} from 'class-validator';

export class ApproveFinishedGoodsDto {
  @IsString()
  @Matches(/^\d{1,15}(\.\d{1,3})?$/)
  acceptedQuantity: string;

  @IsString()
  @IsNotEmpty()
  locationName: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  wasteReason?: string;
}

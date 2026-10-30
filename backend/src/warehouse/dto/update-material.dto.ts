
import {
  IsOptional, IsString, IsNotEmpty,
  IsIn, MaxLength, Matches,
} from 'class-validator';

export class UpdateMaterialDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,15}(\.\d{1,3})?$/)
  minStock?: string;

  @IsOptional()
  @IsIn(['ACTIVE', 'INACTIVE'])
  status?: string;
}

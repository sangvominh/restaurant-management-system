import {
  IsString,
  IsNotEmpty,
  MaxLength,
  Matches,
  IsIn,
} from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['MATERIAL', 'RAW_MATERIAL'])
  categoryType: string;

  @IsString()
  @IsNotEmpty()
  unitName: string;

  @IsString()
  @Matches(/^\d{1,15}(\.\d{1,3})?$/)
  minStock: string;
}

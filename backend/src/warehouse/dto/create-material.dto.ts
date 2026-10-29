
import { IsString, IsNotEmpty, MaxLength, Matches } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsString()
  @IsNotEmpty()
  categoryType: string;

  @IsString()
  @IsNotEmpty()
  unitName: string;

  @IsString()
  @Matches(/^\d{1,15}(\.\d{1,3})?$/)
  minStock: string;
}

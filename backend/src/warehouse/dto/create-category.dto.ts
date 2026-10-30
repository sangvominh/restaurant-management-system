import {
  IsString,
  IsNotEmpty,
  IsIn,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9_-]{3,20}$/)
  @MaxLength(20)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['MATERIAL', 'RAW_MATERIAL'])
  categoryType: string;
}

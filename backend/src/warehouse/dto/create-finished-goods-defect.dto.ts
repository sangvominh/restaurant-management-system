import { IsNotEmpty, IsNumberString, IsString, MaxLength } from 'class-validator';

export class CreateFinishedGoodsDefectDto {
  @IsString() @IsNotEmpty() branchCode!: string;
  @IsString() @IsNotEmpty() productCode!: string;
  @IsNumberString() quantity!: string;
  @IsString() @IsNotEmpty() @MaxLength(1000) reason!: string;
}

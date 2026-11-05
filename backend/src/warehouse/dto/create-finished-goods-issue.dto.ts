import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator';

class FinishedGoodsIssueLineDto {
  @IsString() @IsNotEmpty() productCode!: string;
  @IsNumberString() quantity!: string;
}

export class CreateFinishedGoodsIssueDto {
  @IsString() @IsNotEmpty() branchCode: string;
  @IsOptional() @IsString() shiftCode?: string;
  @IsOptional() @IsString() note?: string;
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => FinishedGoodsIssueLineDto)
  items!: FinishedGoodsIssueLineDto[];
}

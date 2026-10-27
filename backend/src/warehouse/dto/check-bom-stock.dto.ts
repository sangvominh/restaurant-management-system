
import {
  IsString,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class CheckBomStockDto {
  @IsString()
  @IsNotEmpty()
  bomCode: string;

  @IsString()
  @IsNotEmpty()
  branchCode: string;

  @IsString()
  @Matches(/^\d{1,15}(\.\d{1,3})?$/)
  productionQuantity: string;
}

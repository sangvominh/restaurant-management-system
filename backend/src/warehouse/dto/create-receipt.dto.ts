
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  MaxLength,
  Matches,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateReceiptDetailDto {
  @IsString()
  @IsNotEmpty()
  materialCode: string;

  @IsString()
  @IsNotEmpty()
  lotCode: string;

  @IsString()
  @IsNotEmpty()
  locationName: string;

  @IsString()
  @IsNotEmpty()
  unitName: string;

  @IsString()
  @Matches(/^(?=.*[1-9])\d{1,15}(?:\.\d{1,3})?$/)
  quantity: string;

  @IsString()
  @Matches(/^\d{1,16}(?:\.\d{1,2})?$/)
  unitPrice: string;
}

export class CreateReceiptDto {
  @IsString()
  @Matches(/^[A-Z0-9_-]{3,50}$/)
  receiptCode: string;

  @IsString()
  @IsNotEmpty()
  supplierCode: string;

  @IsString()
  @IsNotEmpty()
  branchCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateReceiptDetailDto)
  details: CreateReceiptDetailDto[];
}

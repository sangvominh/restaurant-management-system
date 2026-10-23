
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

import { Type } from 'class-transformer';

// Chi tiết nguyên vật liệu nhập
export class CreateReceiptDetailDto {
  @IsUUID('4')
  materialId: string;

  @IsUUID('4')
  materialLotId: string;

  @IsUUID('4')
  locationId: string;

  @IsUUID('4')
  unitId: string;

  // Số lượng > 0, tối đa 3 chữ số thập phân
  @IsString()
  @Matches(/^(?=.*[1-9])\d{1,15}(?:\.\d{1,3})?$/)
  quantity: string;

  // Đơn giá >= 0, tối đa 2 chữ số thập phân
  @IsString()
  @Matches(/^\d{1,16}(?:\.\d{1,2})?$/)
  unitPrice: string;
}

// Thông tin phiếu nhập kho
export class CreateReceiptDto {
  @IsString()
  @Matches(/^[A-Z0-9_-]{3,50}$/)
  receiptCode: string;

  @IsUUID('4')
  supplierId: string;

  @IsUUID('4')
  branchId: string;

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

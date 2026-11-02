import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ReportFinishedGoodsDto {
  @IsNumberString() reportedQuantity!: string;
  @IsOptional() @IsString() note?: string;
}

import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class ReportQueryDto {
  @IsOptional() @IsIn(['month', 'quarter', 'year'])
  period?: 'month' | 'quarter' | 'year';

  /** month/quarter: năm cần xem. year: năm cuối của khoảng 5 năm. */
  @IsOptional() @Type(() => Number) @IsInt() @Min(2000) @Max(2100)
  year?: number;

  /** Chỉ dùng cho chi tiết theo NVL: số tháng (1-12), quý (1-4) hoặc năm. */
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(2100)
  key?: number;
}

import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

/** Tham số lọc dùng chung cho cả hai danh sách nhật ký (query string). */
export class LogQueryDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  page?: number;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100)
  pageSize?: number;

  /** Tìm theo mô tả/người thực hiện (audit) hoặc email (đăng nhập). */
  @IsOptional() @IsString() @MaxLength(100)
  search?: string;

  /** Chỉ dùng cho audit-logs. */
  @IsOptional() @IsIn(['account', 'role', 'category', 'setting', 'backup', 'report'])
  entity?: string;

  /** Chỉ dùng cho login-logs. */
  @IsOptional() @IsIn(['success', 'failed', 'locked'])
  status?: string;

  @IsOptional() @IsDateString()
  from?: string;

  @IsOptional() @IsDateString()
  to?: string;
}

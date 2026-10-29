import {
  ArrayUnique,
  IsArray,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ALL_PERMISSION_KEYS } from '../../../common/permissions';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

/* ---------------- Accounts ---------------- */
export class CreateAccountDto {
  @Transform(trim) @IsString() @IsNotEmpty({ message: 'Họ tên không được để trống' }) @MaxLength(100)
  name: string;

  @Transform(trim) @IsEmail({}, { message: 'Email không đúng định dạng' }) @MaxLength(150)
  email: string;

  @IsString() @IsNotEmpty({ message: 'Vai trò không được để trống' })
  role: string;

  @IsString() @MinLength(8, { message: 'Mật khẩu tối thiểu 8 ký tự' }) @MaxLength(72)
  password: string;
}

export class UpdateAccountDto {
  @IsOptional() @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(100)
  name?: string;

  @IsOptional() @Transform(trim) @IsEmail({}, { message: 'Email không đúng định dạng' }) @MaxLength(150)
  email?: string;

  @IsOptional() @IsString() @IsNotEmpty()
  role?: string;

  /** Có gửi lên = đặt lại mật khẩu cho tài khoản này. */
  @IsOptional() @IsString() @MinLength(8, { message: 'Mật khẩu tối thiểu 8 ký tự' }) @MaxLength(72)
  password?: string;
}

/* ---------------- Roles ---------------- */
export class CreateRoleDto {
  @Transform(trim) @IsString() @IsNotEmpty({ message: 'Tên vai trò không được để trống' }) @MaxLength(100)
  name: string;

  @IsOptional() @Transform(trim) @IsString() @MaxLength(500)
  description?: string;

  @IsOptional() @IsArray() @ArrayUnique() @IsIn(ALL_PERMISSION_KEYS, { each: true, message: 'Có quyền không hợp lệ' })
  permissions?: string[];
}

export class UpdateRoleDto {
  @IsOptional() @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(100)
  name?: string;

  @IsOptional() @Transform(trim) @IsString() @MaxLength(500)
  description?: string;

  @IsOptional() @IsArray() @ArrayUnique() @IsIn(ALL_PERMISSION_KEYS, { each: true, message: 'Có quyền không hợp lệ' })
  permissions?: string[];
}

/* ---------------- Categories ---------------- */
export class CreateCategoryDto {
  @Transform(trim) @IsString() @IsNotEmpty({ message: 'Loại danh mục không được để trống' }) @MaxLength(100)
  type: string;

  @Transform(trim) @IsString() @IsNotEmpty({ message: 'Tên danh mục không được để trống' }) @MaxLength(150)
  name: string;

  @IsOptional() @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

export class UpdateCategoryDto {
  @IsOptional() @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(100)
  type?: string;

  @IsOptional() @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(150)
  name?: string;

  @IsOptional() @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

/* ---------------- Settings ---------------- */
export class UpdateSettingsDto {
  @IsOptional() @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(150)
  restaurantName?: string;

  @IsOptional() @Transform(trim) @IsEmail({}, { message: 'Email không đúng định dạng' }) @MaxLength(150)
  email?: string;

  // Cho phép để trống; nếu có thì phải giống số điện thoại.
  @ValidateIf((o: UpdateSettingsDto) => o.phone !== undefined && o.phone !== '')
  @Transform(trim) @Matches(/^[0-9+\s().-]{8,20}$/, { message: 'Số điện thoại không hợp lệ' })
  phone?: string;

  @IsOptional() @IsIn(['VND', 'USD'])
  currency?: 'VND' | 'USD';

  @IsOptional() @IsNumber({}, { message: 'VAT phải là số' }) @Min(0) @Max(100)
  tax?: number;
}

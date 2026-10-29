import { Body, Controller, Get, HttpCode, Ip, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthUser, CurrentUser, Public } from '../common/auth.decorators';
import { AuthService } from './auth.service';

class LoginDto {
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  @IsString() @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' }) @MaxLength(72)
  password: string;
}

class ChangePasswordDto {
  @IsString() @IsNotEmpty() @MaxLength(72)
  oldPassword: string;

  @IsString() @MinLength(8, { message: 'Mật khẩu mới tối thiểu 8 ký tự' }) @MaxLength(72)
  newPassword: string;
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto, @Ip() ip: string) {
    return this.auth.login(dto.email, dto.password, ip);
  }

  @Post('logout')
  @HttpCode(200)
  logout(@CurrentUser() user: AuthUser) {
    return this.auth.logout(user);
  }

  /** Mọi người dùng đã đăng nhập đều gọi được (không yêu cầu quyền cụ thể). */
  @Get('me')
  me(@CurrentUser() user: AuthUser) {
    return user;
  }

  @Post('change-password')
  @HttpCode(200)
  changePassword(@CurrentUser() user: AuthUser, @Body() dto: ChangePasswordDto) {
    return this.auth.changePassword(user.id, dto.oldPassword, dto.newPassword);
  }
}

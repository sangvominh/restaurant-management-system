import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { AuthGuard, readToken, type StaffRequest } from './auth.guard.js';
@Controller('api/auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('login') async login(@Body() body: unknown, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = await this.auth.login(body, req.ip || 'unknown');
    res.cookie('staff_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.COOKIE_SECURE === 'true', maxAge: 8 * 60 * 60_000, path: '/' });
    return { message: 'Đăng nhập thành công.' };
  }
  @Get('me') @UseGuards(AuthGuard) me(@Req() req: StaffRequest) { return req.staff; }
  @Post('logout') @UseGuards(AuthGuard) async logout(@Req() req: StaffRequest, @Res({ passthrough: true }) res: Response) {
    await this.auth.logout(readToken(req)); res.clearCookie('staff_session', { path: '/' }); return { message: 'Đã đăng xuất.' };
  }
}

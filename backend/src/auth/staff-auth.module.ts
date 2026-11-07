import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { AuthService } from './staff-auth.service.js';
import { AuthGuard } from './staff-auth.guard.js';
import { AuthController } from './staff-auth.controller.js';
@Global()
@Module({ providers: [PrismaService, AuthService, AuthGuard], controllers: [AuthController], exports: [PrismaService, AuthService, AuthGuard] })
export class StaffAuthModule {}

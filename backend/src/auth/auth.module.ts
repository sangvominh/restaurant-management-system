import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';
import { AuthController } from './auth.controller.js';
@Global()
@Module({ providers: [PrismaService, AuthService, AuthGuard], controllers: [AuthController], exports: [PrismaService, AuthService, AuthGuard] })
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module.js';
import { AuthService } from './staff-auth.service.js';
import { AuthGuard } from './staff-auth.guard.js';
import { AuthController } from './staff-auth.controller.js';

@Module({
  imports: [AuthModule],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class StaffAuthModule {}

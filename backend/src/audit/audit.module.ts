import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditController } from './audit.controller';
import { AuditLogEntity } from './audit-log.entity';
import { AuditService } from './audit.service';
import { LoginLogEntity } from './login-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLogEntity, LoginLogEntity])],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}

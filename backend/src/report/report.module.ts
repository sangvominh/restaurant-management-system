import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module.js';
import { ReportController } from './report.controller.js';
import { ReportService } from './report.service.js';

@Module({
  imports: [AuditModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}

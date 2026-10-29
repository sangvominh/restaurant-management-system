import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [AuditModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}

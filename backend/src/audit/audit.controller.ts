import { Controller, Get, Query } from '@nestjs/common';
import { RequirePermissions } from '../common/auth.decorators';
import { LogQueryDto } from './audit.dto';
import { AuditService } from './audit.service';

@Controller('api/admin')
export class AuditController {
  constructor(private readonly audit: AuditService) {}

  @Get('audit-logs')
  @RequirePermissions('audit:view')
  auditLogs(@Query() q: LogQueryDto) {
    return this.audit.listAudit(q);
  }

  @Get('login-logs')
  @RequirePermissions('audit:view')
  loginLogs(@Query() q: LogQueryDto) {
    return this.audit.listLogins(q);
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import {
  RequirePermissions,
  RequireSystemAdmin,
} from '../common/auth.decorators.js';
import { LogQueryDto } from './audit.dto.js';
import { AuditService } from './audit.service.js';

@Controller('api/admin')
@RequireSystemAdmin()
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

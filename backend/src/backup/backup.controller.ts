import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AuthUser, CurrentUser, RequirePermissions } from '../common/auth.decorators';
import { BackupService } from './backup.service';

@Controller('api/admin/backup')
export class BackupController {
  constructor(private readonly backup: BackupService) {}

  /** Tải toàn bộ dữ liệu quản trị dưới dạng JSON (frontend tự lưu thành tệp). */
  @Get('export')
  @RequirePermissions('backup:manage')
  export(@CurrentUser() actor: AuthUser) {
    return this.backup.exportAll(actor);
  }

  /** ?dryRun=true: chỉ kiểm tra tệp và trả bản xem trước, không thay đổi dữ liệu. */
  @Post('restore')
  @HttpCode(200)
  @RequirePermissions('backup:manage')
  restore(@Body() body: unknown, @Query('dryRun') dryRun: string | undefined, @CurrentUser() actor: AuthUser) {
    return this.backup.restore(body, dryRun === 'true', actor);
  }
}

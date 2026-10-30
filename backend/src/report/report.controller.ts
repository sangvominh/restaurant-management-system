import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import {
  AuthUser,
  CurrentUser,
  RequirePermissions,
} from '../common/auth.decorators.js';
import { ReportQueryDto } from './report.dto.js';
import { Period, ReportService } from './report.service.js';

const norm = (q: ReportQueryDto): { period: Period; year: number } => ({
  period: q.period ?? 'month',
  year: q.year ?? new Date().getFullYear(),
});

@Controller('api/admin/reports')
export class ReportController {
  constructor(private readonly reports: ReportService) {}

  @Get('status')
  @RequirePermissions('report:view')
  status() {
    return this.reports.status();
  }

  @Get('revenue')
  @RequirePermissions('report:view')
  revenue(@Query() q: ReportQueryDto) {
    const { period, year } = norm(q);
    return this.reports.revenue(period, year);
  }

  @Get('stock')
  @RequirePermissions('report:view')
  stock(@Query() q: ReportQueryDto) {
    const { period, year } = norm(q);
    return this.reports.stock(period, year);
  }

  @Get('stock/materials')
  @RequirePermissions('report:view')
  stockMaterials(@Query() q: ReportQueryDto) {
    const { period, year } = norm(q);
    if (!q.key)
      throw new BadRequestException('Thiếu tham số key (kỳ cần xem chi tiết)');
    if (period === 'month' && q.key > 12)
      throw new BadRequestException('Tháng phải từ 1 đến 12');
    if (period === 'quarter' && q.key > 4)
      throw new BadRequestException('Quý phải từ 1 đến 4');
    if (period === 'year' && (q.key < year - 4 || q.key > year))
      throw new BadRequestException(
        'Năm chi tiết phải nằm trong khoảng báo cáo',
      );
    return this.reports.stockMaterials(period, year, q.key);
  }

  @Post('demo-data')
  @HttpCode(200)
  @RequirePermissions('backup:manage')
  installDemo(@CurrentUser() actor: AuthUser) {
    return this.reports.installDemo(actor);
  }

  @Delete('demo-data')
  @RequirePermissions('backup:manage')
  removeDemo(@CurrentUser() actor: AuthUser) {
    return this.reports.removeDemo(actor);
  }
}

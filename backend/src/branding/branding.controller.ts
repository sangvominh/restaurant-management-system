import { Controller, Get, Header } from '@nestjs/common';
import { Public } from '../common/auth.decorators.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('api/public')
export class BrandingController {
  constructor(private readonly db: PrismaService) {}

  /** Only the displayed name is public; contact details and settings remain admin-only. */
  @Public()
  @Get('branding')
  @Header('Cache-Control', 'no-store')
  async getBranding() {
    const settings = await this.db.systemSetting.findUnique({
      where: { id: 1 },
      select: { restaurantName: true },
    });
    return { restaurantName: settings?.restaurantName ?? 'Hệ thống Quản lý MRP' };
  }
}

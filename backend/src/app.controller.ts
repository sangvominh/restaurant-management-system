import { Controller, Get } from '@nestjs/common';
import { Public } from './common/auth.decorators';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Giữ công khai để dùng làm health-check (docker/healthcheck).
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

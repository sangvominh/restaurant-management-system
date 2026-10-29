import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Tệp sao lưu có thể lớn hơn mức mặc định 100kb của body JSON.
  app.useBodyParser('json', { limit: '10mb' });

  // Kiểm tra dữ liệu vào: bỏ trường lạ, báo lỗi 400 với thông điệp tiếng Việt từ DTO.
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  // CORS_ORIGIN: danh sách origin cách nhau bằng dấu phẩy (frontend Next.js).
  const origins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  app.enableCors({ origin: origins, credentials: true });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend NestJS đang chạy tại: http://localhost:${port}`);
}
void bootstrap();

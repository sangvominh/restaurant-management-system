import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.enableCors({ origin: (process.env.CORS_ORIGIN || 'http://localhost:3004').split(',').map(origin => origin.trim()) });
  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { Request, Response, NextFunction } from 'express';
import { PrismaExceptionFilter } from './common/prisma-exception.filter.js';

export function configureApp(app: NestExpressApplication) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const staffRoute = req.path.startsWith('/api/staff/') || req.path.startsWith('/api/staff-auth/');
    if (staffRoute && !['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.headers['x-staff-request'] !== '1') {
      res.status(403).json({ message: 'Yêu cầu không hợp lệ.' });
      return;
    }
    next();
  });
  app.useBodyParser('json', { limit: '10mb' });
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const origins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  app.enableCors({ origin: origins, credentials: true });
}

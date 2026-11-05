import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ApiErrors } from './http.js';
import type { Request, Response, NextFunction } from 'express';
export async function configureApp(app: Awaited<ReturnType<typeof NestFactory.create>>) {
  // Mutations require a non-simple header. With CORS disabled, another origin cannot forge it.
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api/') && !['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.headers['x-staff-request'] !== '1') {
      res.status(403).json({ message: 'Yêu cầu không hợp lệ.' }); return;
    }
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (req.path.startsWith('/api/')) res.setHeader('Cache-Control', 'no-store');
    next();
  });
  app.useGlobalFilters(new ApiErrors());
  app.enableShutdownHooks();
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await configureApp(app);
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
if (process.env.NODE_ENV !== 'test') await bootstrap();

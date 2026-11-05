import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from './generated/prisma/client.js';
@Catch()
export class ApiErrors implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    if (error instanceof HttpException) { res.status(error.getStatus()).json(error.getResponse()); return; }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const code = error.code;
      const status = code === 'P2025' ? 404 : ['P2002', 'P2003', 'P2034'].includes(code) ? 409 : 500;
      res.status(status).json({ message: status === 409 ? 'Dữ liệu vừa thay đổi hoặc đã được xử lý. Hãy tải lại trước khi thử tiếp.' : status === 404 ? 'Không tìm thấy dữ liệu.' : 'Không thể truy cập dữ liệu.' }); return;
    }
    console.error(error instanceof Error ? error.name : 'Unknown server error');
    res.status(500).json({ message: 'Máy chủ chưa sẵn sàng. Vui lòng thử lại.' });
  }
}

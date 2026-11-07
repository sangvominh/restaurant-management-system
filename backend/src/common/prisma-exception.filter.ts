import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    error:
      Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse();
    if (error instanceof Prisma.PrismaClientValidationError) {
      response
        .status(400)
        .json({ statusCode: 400, message: 'Dữ liệu gửi lên không hợp lệ' });
      return;
    }
    const messages: Record<string, [number, string]> = {
      P2002: [409, 'Email, tên đăng nhập hoặc tên danh mục/vai trò đã tồn tại'],
      P2003: [
        409,
        'Dữ liệu đang được sử dụng. Với tài khoản, hãy khóa thay vì xóa',
      ],
      P2025: [404, 'Không tìm thấy dữ liệu'],
      P2034: [409, 'Dữ liệu vừa thay đổi, vui lòng thử lại'],
    };
    const [statusCode, message] = messages[error.code] ?? [
      500,
      'Không thể thực hiện thao tác dữ liệu',
    ];
    response.status(statusCode).json({ statusCode, message });
  }
}

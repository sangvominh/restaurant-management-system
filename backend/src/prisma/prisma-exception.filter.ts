import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(error: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const errors: Record<string, [number, string]> = {
      P2002: [409, 'Tên đăng nhập, mã, email hoặc liên kết đã tồn tại'],
      P2003: [409, 'Dữ liệu đã được sử dụng trong nghiệp vụ, không thể xóa'],
      P2025: [404, 'Không tìm thấy bản ghi'],
      P2034: [409, 'Dữ liệu vừa thay đổi, vui lòng tải lại'],
    };
    const [statusCode, message] = errors[error.code] ?? [500, 'Không thể thực hiện thao tác dữ liệu'];
    host.switchToHttp().getResponse().status(statusCode).json({ statusCode, message });
  }
}

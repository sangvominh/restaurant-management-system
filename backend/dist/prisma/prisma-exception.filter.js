var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Catch } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
let PrismaExceptionFilter = class PrismaExceptionFilter {
    catch(error, host) {
        const errors = {
            P2002: [409, 'Tên đăng nhập, mã, email hoặc liên kết đã tồn tại'],
            P2003: [409, 'Dữ liệu đã được sử dụng trong nghiệp vụ, không thể xóa'],
            P2025: [404, 'Không tìm thấy bản ghi'],
            P2034: [409, 'Dữ liệu vừa thay đổi, vui lòng tải lại'],
        };
        const [statusCode, message] = errors[error.code] ?? [500, 'Không thể thực hiện thao tác dữ liệu'];
        host.switchToHttp().getResponse().status(statusCode).json({ statusCode, message });
    }
};
PrismaExceptionFilter = __decorate([
    Catch(Prisma.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
export { PrismaExceptionFilter };
//# sourceMappingURL=prisma-exception.filter.js.map
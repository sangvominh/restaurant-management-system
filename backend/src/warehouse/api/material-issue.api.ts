
import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class MaterialIssueApi {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Lấy danh sách phiếu xuất theo trạng thái
  async getMaterialIssues(status = 'PENDING') {
    // 1. Kiểm tra trạng thái
    const validStatus = ['PENDING', 'APPROVED', 'REJECTED'];

    if (!validStatus.includes(status)) {
      throw new BadRequestException('Trạng thái không hợp lệ');
    }

    // 2. Lấy dữ liệu từ PostgreSQL
    const issues = await this.prisma.materialIssue.findMany({
      where: { status },
      include: {
        branch: true,
        _count: {
          select: { details: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    // 3. Trả kết quả
    return {
      message: 'Lấy danh sách phiếu xuất thành công',
      data: issues.map((issue) => ({
        issueCode: issue.issueCode,
        branchCode: issue.branch.code,
        branchName: issue.branch.name,
        status: issue.status,
        note: issue.note,
        createdAt: issue.createdAt,
        totalItems: issue._count.details,
      })),
    };
  }
}

import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class MaterialIssueApi {
  constructor(private readonly prisma: PrismaService) {}

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
// Xem chi tiết phiếu xuất nguyên vật liệu
  async getMaterialIssueByCode(code: string) {
    // 1. Tìm phiếu xuất theo mã
    const issue = await this.prisma.materialIssue.findUnique({
      where: { issueCode: code },
      include: {
        branch: true,
        details: {
          include: {
            material: true,
            materialLot: true,
            location: true,
            unit: true,
          },
        },
      },
    });

    // 2. Kiểm tra phiếu có tồn tại không
    if (!issue) {
      throw new NotFoundException('Không tìm thấy phiếu xuất NVL');
    }

    // 3. Trả kết quả
    return {
      message: 'Lấy chi tiết phiếu xuất thành công',
      data: {
        issueCode: issue.issueCode,
        branchCode: issue.branch.code,
        branchName: issue.branch.name,
        status: issue.status,
        note: issue.note,
        createdAt: issue.createdAt,

        details: issue.details.map((item) => ({
          materialCode: item.material.code,
          materialName: item.material.name,
          lotCode: item.materialLot.lotCode,
          locationName: item.location.name,
          unitName: item.unit.name,
          quantity: item.quantity.toString(),
        })),
      },
    };
  }
// Phê duyệt phiếu xuất nguyên vật liệu
  async approveIssue(code: string) {
    try {
      return await this.prisma.$transaction(
        async (tx) => {
          // 1. Tìm phiếu xuất
          const issue = await tx.materialIssue.findUnique({
            where: { issueCode: code },
            include: {
              details: {
                include: {
                  material: true,
                  materialLot: true,
                  location: true,
                  unit: true,
                },
              },
            },
          });

          if (!issue) {
            throw new NotFoundException('Không tìm thấy phiếu xuất');
          }

          // 2. Kiểm tra trạng thái
          if (issue.status !== 'PENDING') {
            throw new ConflictException('Phiếu đã được xử lý');
          }

          if (issue.details.length === 0) {
            throw new BadRequestException('Phiếu chưa có nguyên vật liệu');
          }

          // 3. Chuyển phiếu sang APPROVED
          const updated = await tx.materialIssue.updateMany({
            where: {
              id: issue.id,
              status: 'PENDING',
            },
            data: { status: 'APPROVED' },
          });

          if (updated.count !== 1) {
            throw new ConflictException('Phiếu đã được xử lý');
          }

          // 4. Xử lý từng nguyên vật liệu
          for (const item of issue.details) {
            // Kiểm tra thông tin nguyên vật liệu
            if (
              item.material.status !== 'ACTIVE' ||
              item.materialLot.status !== 'ACTIVE' ||
              item.unit.status !== 'ACTIVE' ||
              item.materialLot.materialId !== item.materialId ||
              item.location.branchId !== issue.branchId
            ) {
              throw new BadRequestException('Thông tin NVL không hợp lệ');
            }

            // Quy đổi về đơn vị tồn kho
            let quantity = item.quantity;

            if (item.unitId !== item.material.unitId) {
              if (item.unit.baseUnitId !== item.material.unitId) {
                throw new BadRequestException('Đơn vị tính không phù hợp');
              }

              quantity = quantity.mul(item.unit.conversionFactor);
            }

            if (quantity.lte(0) || quantity.decimalPlaces() > 3) {
              throw new BadRequestException('Số lượng xuất không hợp lệ');
            }

            // 5. Trừ kho nếu đủ nguyên vật liệu
            const result = await tx.materialBalance.updateMany({
              where: {
                materialLotId: item.materialLotId,
                locationId: item.locationId,
                quantity: { gte: quantity },
              },
              data: {
                quantity: { decrement: quantity },
              },
            });

            if (result.count === 0) {
              throw new BadRequestException(
                `Không đủ tồn kho: ${item.material.code}`,
              );
            }

            // 6. Lấy số lượng tồn sau khi xuất
            const balance = await tx.materialBalance.findUniqueOrThrow({
              where: {
                locationId_materialLotId: {
                  locationId: item.locationId,
                  materialLotId: item.materialLotId,
                },
              },
            });

            // 7. Ghi lịch sử giao dịch
            await tx.inventoryMovement.create({
              data: {
                materialLotId: item.materialLotId,
                locationId: item.locationId,
                movementType: 'ISSUE',
                quantityBefore: balance.quantity.plus(quantity),
                quantityChange: quantity.neg(),
                quantityAfter: balance.quantity,
              },
            });
          }

          // 8. Trả kết quả
          return {
            message: 'Phê duyệt xuất kho thành công',
            data: {
              issueCode: issue.issueCode,
              status: 'APPROVED',
              totalItems: issue.details.length,
            },
          };
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2034'
      ) {
        throw new ConflictException(
          'Giao dịch kho bị xung đột, vui lòng thử lại',
        );
      }

      throw error;
    }
  }
// Từ chối phiếu xuất nguyên vật liệu
  async rejectIssue(code: string, reason: string) {
    // 1. Kiểm tra lý do
    reason = reason.trim();

    if (!reason) {
      throw new BadRequestException('Vui lòng nhập lý do từ chối');
    }

    // 2. Tìm phiếu xuất
    const issue = await this.prisma.materialIssue.findUnique({
      where: { issueCode: code },
    });

    if (!issue) {
      throw new NotFoundException('Không tìm thấy phiếu xuất');
    }

    // 3. Kiểm tra trạng thái
    if (issue.status !== 'PENDING') {
      throw new ConflictException('Phiếu đã được xử lý');
    }

    // 4. Giữ ghi chú cũ và thêm lý do từ chối
    const note = [issue.note, `Lý do từ chối: ${reason}`]
      .filter(Boolean)
      .join('\n');

    // 5. Cập nhật trạng thái phiếu
    const result = await this.prisma.materialIssue.updateMany({
      where: {
        id: issue.id,
        status: 'PENDING',
      },
      data: {
        status: 'REJECTED',
        note,
      },
    });

    if (result.count === 0) {
      throw new ConflictException('Phiếu đã được xử lý');
    }

    // 6. Trả kết quả
    return {
      message: 'Từ chối phiếu xuất thành công',
      data: {
        issueCode: issue.issueCode,
        status: 'REJECTED',
        reason,
      },
    };
  }
}

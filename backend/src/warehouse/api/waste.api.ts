import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { RejectWasteDto } from '../dto/reject-waste.dto.js';

@Injectable()
export class WasteApi {
  constructor(private readonly prisma: PrismaService) {}

  //Danh sách yêu cầu hao hụt
  async getRequests(status = 'PENDING') {
    const valid = ['PENDING', 'APPROVED', 'REJECTED'];

    if (!valid.includes(status)) {
      throw new BadRequestException('Trạng thái không hợp lệ');
    }

    const requests = await this.prisma.wasteRequest.findMany({
      where: { status },
      include: {
        receipt: {
          include: {
            productionOrder: {
              include: {
                bom: true,
                branch: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return {
      message: 'Lấy danh sách hao hụt thành công',
      data: requests.map((item) => ({
        code: item.code,
        receiptCode: item.receipt.code,
        orderCode: item.receipt.productionOrder.code,
        productCode: item.receipt.productionOrder.bom.productCode,
        branchCode: item.receipt.productionOrder.branch.code,
        quantity: item.quantity.toString(),
        reason: item.reason,
        status: item.status,
        decisionNote: item.decisionNote,
        createdAt: item.createdAt,
      })),
    };
  }

  //Chấp thuận xử lý hao hụt
  async approveRequest(code: string) {
    const request = await this.prisma.wasteRequest.findUnique({
      where: { code: code.trim() },
      include: { receipt: true },
    });

    if (!request) {
      throw new NotFoundException('Không tìm thấy phiếu hao hụt');
    }

    if (request.status !== 'PENDING') {
      throw new ConflictException('Phiếu đã được xử lý');
    }

    if (
      request.receipt.status !== 'APPROVED' ||
      !request.receipt.rejectedQuantity ||
      !request.quantity.equals(request.receipt.rejectedQuantity)
    ) {
      throw new ConflictException('Số lượng hao hụt chưa hợp lệ');
    }

    const result = await this.prisma.wasteRequest.updateMany({
      where: { id: request.id, status: 'PENDING' },
      data: {
        status: 'APPROVED',
        processedAt: new Date(),
      },
    });

    if (result.count !== 1) {
      throw new ConflictException('Phiếu đã được xử lý');
    }

    return {
      message: 'Chấp thuận xử lý hao hụt thành công',
      data: {
        code: request.code,
        quantity: request.quantity.toString(),
        status: 'APPROVED',
      },
    };
  }

  //Từ chối yêu cầu hao hụt
  async rejectRequest(code: string, dto: RejectWasteDto) {
    const reason = dto.reason.trim();

    if (!reason) {
      throw new BadRequestException('Phải nhập lý do từ chối');
    }

    const request = await this.prisma.wasteRequest.findUnique({
      where: { code: code.trim() },
    });

    if (!request) {
      throw new NotFoundException('Không tìm thấy phiếu hao hụt');
    }

    if (request.status !== 'PENDING') {
      throw new ConflictException('Phiếu đã được xử lý');
    }

    const result = await this.prisma.wasteRequest.updateMany({
      where: { id: request.id, status: 'PENDING' },
      data: {
        status: 'REJECTED',
        decisionNote: reason,
        processedAt: new Date(),
      },
    });

    if (result.count !== 1) {
      throw new ConflictException('Phiếu đã được xử lý');
    }

    return {
      message: 'Từ chối yêu cầu hao hụt thành công',
      data: {
        code: request.code,
        status: 'REJECTED',
        reason,
      },
    };
  }
}

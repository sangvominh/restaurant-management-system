import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateFinishedGoodsDefectDto } from '../dto/create-finished-goods-defect.dto.js';

@Injectable()
export class FinishedGoodsDefectApi {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFinishedGoodsDefectDto) {
    const quantity = new Prisma.Decimal(dto.quantity);
    if (quantity.lte(0)) throw new BadRequestException('Số lượng lỗi phải lớn hơn 0');
    const [branch, product] = await Promise.all([
      this.prisma.branch.findFirst({ where: { OR: [{ code: dto.branchCode.trim() }, { name: dto.branchCode.trim() }] } }),
      this.prisma.product.findUnique({ where: { code: dto.productCode.trim() } }),
    ]);
    if (!branch) throw new NotFoundException('Không tìm thấy chi nhánh');
    if (!product || product.status !== 'ACTIVE') throw new NotFoundException('Không tìm thấy món thành phẩm đang hoạt động');
    const stock = await this.prisma.finishedGoodsBalance.aggregate({
      where: { productCode: product.code, location: { branchId: branch.id } },
      _sum: { quantity: true },
    });
    const deductFromStock = (stock._sum.quantity ?? new Prisma.Decimal(0)).gte(quantity);
    const defect = await this.prisma.finishedGoodsDefect.create({
      data: {
        code: `HH-TP-${randomUUID().slice(0, 8).toUpperCase()}`,
        branchId: branch.id,
        productCode: product.code,
        quantity,
        reason: dto.reason.trim(),
        deductFromStock,
      },
      include: { branch: true, product: true },
    });
    return { message: 'Đã gửi phiếu báo thành phẩm lỗi', data: this.present(defect) };
  }

  async list(status = 'PENDING') {
    if (!['PENDING', 'APPROVED', 'REJECTED', 'ALL'].includes(status)) throw new BadRequestException('Trạng thái không hợp lệ');
    const defects = await this.prisma.finishedGoodsDefect.findMany({
      where: status === 'ALL' ? {} : { status },
      include: { branch: true, product: true, movements: { include: { location: true } } },
      orderBy: { createdAt: 'desc' }, take: 100,
    });
    return { message: 'Lấy danh sách phiếu báo thành phẩm lỗi thành công', data: defects.map((defect) => this.present(defect)) };
  }

  async approve(code: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const defect = await tx.finishedGoodsDefect.findUnique({ where: { code: code.trim() }, include: { branch: true, product: true } });
        if (!defect) throw new NotFoundException('Không tìm thấy phiếu báo thành phẩm lỗi');
        if (defect.status !== 'PENDING') throw new ConflictException('Phiếu đã được xử lý');
        if (defect.deductFromStock) {
          const locations = await tx.warehouseLocation.findMany({ where: { branchId: defect.branchId } });
          const balances = await tx.finishedGoodsBalance.findMany({ where: { productCode: defect.productCode, locationId: { in: locations.map((item) => item.id) }, quantity: { gt: 0 } }, orderBy: { quantity: 'desc' } });
          const available = balances.reduce((sum, balance) => sum.plus(balance.quantity), new Prisma.Decimal(0));
          if (available.lt(defect.quantity)) throw new BadRequestException(`Tồn ${defect.productCode} không đủ để ghi giảm: cần ${defect.quantity.toString()}, còn ${available.toString()}`);
          let remaining = defect.quantity;
          for (const balance of balances) {
            if (remaining.lte(0)) break;
            const used = balance.quantity.gte(remaining) ? remaining : balance.quantity;
            const changed = await tx.finishedGoodsBalance.updateMany({ where: { id: balance.id, quantity: { gte: used } }, data: { quantity: { decrement: used } } });
            if (changed.count !== 1) throw new ConflictException('Tồn kho vừa thay đổi, vui lòng thử lại');
            const after = await tx.finishedGoodsBalance.findUniqueOrThrow({ where: { id: balance.id } });
            await tx.finishedGoodsMovement.create({ data: { defectId: defect.id, productCode: defect.productCode, locationId: balance.locationId, quantityBefore: after.quantity.plus(used), quantityChange: used.neg(), quantityAfter: after.quantity } });
            remaining = remaining.minus(used);
          }
        }
        const updated = await tx.finishedGoodsDefect.updateMany({ where: { id: defect.id, status: 'PENDING' }, data: { status: 'APPROVED', processedAt: new Date() } });
        if (updated.count !== 1) throw new ConflictException('Phiếu đã được xử lý');
        return { message: 'Duyệt phiếu thành phẩm lỗi thành công', data: { code: defect.code, status: 'APPROVED', stockDeducted: defect.deductFromStock ? defect.quantity.toString() : '0' } };
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, timeout: 15000 });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034') throw new ConflictException('Tồn kho vừa thay đổi, vui lòng thử lại');
      throw error;
    }
  }

  async reject(code: string, reason: string) {
    const cleanReason = reason.trim();
    if (!cleanReason) throw new BadRequestException('Cần nhập lý do từ chối');
    const defect = await this.prisma.finishedGoodsDefect.findUnique({ where: { code: code.trim() } });
    if (!defect) throw new NotFoundException('Không tìm thấy phiếu báo thành phẩm lỗi');
    const updated = await this.prisma.finishedGoodsDefect.updateMany({ where: { id: defect.id, status: 'PENDING' }, data: { status: 'REJECTED', decisionNote: cleanReason, processedAt: new Date() } });
    if (updated.count !== 1) throw new ConflictException('Phiếu đã được xử lý');
    return { message: 'Từ chối phiếu thành phẩm lỗi thành công', data: { code: defect.code, status: 'REJECTED' } };
  }

  private present(defect: any) {
    return {
      code: defect.code,
      branchCode: defect.branch.code,
      branchName: defect.branch.name,
      productCode: defect.productCode,
      productName: defect.product.name,
      quantity: defect.quantity.toString(),
      reason: defect.reason,
      deductFromStock: defect.deductFromStock,
      status: defect.status,
      decisionNote: defect.decisionNote,
      createdAt: defect.createdAt,
      movements: defect.movements?.map((movement: any) => ({ locationName: movement.location.name, quantityChange: movement.quantityChange.toString(), quantityAfter: movement.quantityAfter.toString() })) ?? [],
    };
  }
}

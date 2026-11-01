import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateFinishedGoodsIssueDto } from '../dto/create-finished-goods-issue.dto.js';

@Injectable()
export class FinishedGoodsIssueApi {
  constructor(private readonly prisma: PrismaService) {}

  async listBranches() {
    const branches = await this.prisma.branch.findMany({ where: { isActive: true }, select: { code: true, name: true }, orderBy: { name: 'asc' } });
    return { data: branches };
  }

  async create(dto: CreateFinishedGoodsIssueDto) {
    const branch = await this.prisma.branch.findFirst({ where: { OR: [{ code: dto.branchCode.trim() }, { name: dto.branchCode.trim() }, { name: dto.branchCode.trim().replace(/^Chi nhánh\s+/i, '') }] } });
    if (!branch) throw new NotFoundException('Không tìm thấy chi nhánh');
    const items = dto.items.map((item) => ({ productCode: item.productCode.trim(), quantity: new Prisma.Decimal(item.quantity) }));
    if (items.some((item) => item.quantity.lte(0))) throw new BadRequestException('Số lượng xuất phải lớn hơn 0');
    if (new Set(items.map((item) => item.productCode)).size !== items.length) throw new BadRequestException('Mỗi món chỉ được xuất một dòng trong phiếu');
    const products = await this.prisma.product.findMany({ where: { code: { in: items.map((item) => item.productCode) }, status: 'ACTIVE' } });
    if (products.length !== items.length) throw new BadRequestException('Có món không tồn tại hoặc không hoạt động');
    const issue = await this.prisma.finishedGoodsIssue.create({
      data: {
        code: `PXTP-${Date.now()}`,
        branchId: branch.id,
        shiftCode: dto.shiftCode?.trim() || this.currentShiftCode(),
        note: dto.note?.trim(),
        details: { create: items.map((item) => ({ productCode: item.productCode, requestedQuantity: item.quantity })) },
      },
      include: { branch: true, details: { include: { product: true } } },
    });
    return { message: 'Tạo phiếu xuất thành phẩm thành công', data: this.present(issue) };
  }

  async list(status?: string, shiftCode?: string) {
    if (status && !['PENDING', 'APPROVED', 'REJECTED'].includes(status)) throw new BadRequestException('Trạng thái không hợp lệ');
    const issues = await this.prisma.finishedGoodsIssue.findMany({
      where: { ...(status ? { status } : {}), ...(shiftCode ? { shiftCode: shiftCode.trim() } : {}) },
      include: { branch: true, details: { include: { product: true } } }, orderBy: { createdAt: 'desc' }, take: 100,
    });
    return { message: 'Lấy danh sách phiếu xuất thành phẩm thành công', data: issues.map((issue) => this.present(issue)) };
  }

  async approve(code: string, quantities?: Record<string, string>) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const issue = await tx.finishedGoodsIssue.findUnique({ where: { code: code.trim() }, include: { details: true, branch: true } });
        if (!issue) throw new NotFoundException('Không tìm thấy phiếu xuất thành phẩm');
        if (issue.status !== 'PENDING') throw new ConflictException('Phiếu không còn ở trạng thái chờ duyệt');
        const locations = await tx.warehouseLocation.findMany({ where: { branchId: issue.branchId } });
        if (!locations.length) throw new BadRequestException('Chi nhánh chưa có vị trí kho');
        const locationIds = locations.map((location) => location.id);
        const approvedRows: { detailId: string; quantity: Prisma.Decimal }[] = [];
        for (const detail of issue.details) {
          const approved = new Prisma.Decimal(quantities?.[detail.productCode] ?? detail.requestedQuantity.toString());
          if (approved.lt(0) || approved.gt(detail.requestedQuantity)) throw new BadRequestException(`Số lượng duyệt không hợp lệ cho ${detail.productCode}`);
          let remaining = approved;
          if (remaining.gt(0)) {
            const balances = await tx.finishedGoodsBalance.findMany({ where: { productCode: detail.productCode, locationId: { in: locationIds }, quantity: { gt: 0 } }, orderBy: { quantity: 'desc' } });
            const available = balances.reduce((sum, balance) => sum.plus(balance.quantity), new Prisma.Decimal(0));
            if (available.lt(remaining)) throw new BadRequestException(`Tồn ${detail.productCode} không đủ: cần ${remaining.toString()}, còn ${available.toString()}`);
            for (const balance of balances) {
              if (remaining.lte(0)) break;
              const used = balance.quantity.gte(remaining) ? remaining : balance.quantity;
              const changed = await tx.finishedGoodsBalance.updateMany({ where: { id: balance.id, quantity: { gte: used } }, data: { quantity: { decrement: used } } });
              if (changed.count !== 1) throw new ConflictException('Tồn kho vừa thay đổi, vui lòng thử lại');
              const after = await tx.finishedGoodsBalance.findUniqueOrThrow({ where: { id: balance.id } });
              await tx.finishedGoodsMovement.create({ data: { issueDetailId: detail.id, productCode: detail.productCode, locationId: balance.locationId, quantityBefore: after.quantity.plus(used), quantityChange: used.neg(), quantityAfter: after.quantity } });
              remaining = remaining.minus(used);
            }
          }
          approvedRows.push({ detailId: detail.id, quantity: approved });
        }
        await Promise.all(approvedRows.map((row) => tx.finishedGoodsIssueDetail.update({ where: { id: row.detailId }, data: { approvedQuantity: row.quantity } })));
        const changed = await tx.finishedGoodsIssue.updateMany({ where: { id: issue.id, status: 'PENDING' }, data: { status: 'APPROVED', approvedAt: new Date() } });
        if (changed.count !== 1) throw new ConflictException('Phiếu đã được xử lý');
        return { message: 'Duyệt phiếu xuất thành phẩm thành công', data: { code: issue.code, status: 'APPROVED', shiftCode: issue.shiftCode } };
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, timeout: 15000 });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034') throw new ConflictException('Tồn kho vừa thay đổi, vui lòng thử lại');
      throw error;
    }
  }

  async reject(code: string, reason: string) {
    const issue = await this.prisma.finishedGoodsIssue.findUnique({ where: { code: code.trim() } });
    if (!issue) throw new NotFoundException('Không tìm thấy phiếu xuất thành phẩm');
    const changed = await this.prisma.finishedGoodsIssue.updateMany({ where: { id: issue.id, status: 'PENDING' }, data: { status: 'REJECTED', rejectedAt: new Date(), note: reason.trim() } });
    if (!changed.count) throw new ConflictException('Phiếu đã được xử lý');
    return { message: 'Từ chối phiếu xuất thành phẩm thành công', data: { code: issue.code, status: 'REJECTED' } };
  }

  private present(issue: any) {
    return { code: issue.code, branchCode: issue.branch.code, shiftCode: issue.shiftCode, status: issue.status, note: issue.note, createdAt: issue.createdAt, details: issue.details.map((detail: any) => ({ productCode: detail.productCode, productName: detail.product.name, requestedQuantity: detail.requestedQuantity.toString(), approvedQuantity: detail.approvedQuantity?.toString() ?? null })) };
  }

  private currentShiftCode() {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const value = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
    const hour = Number(value('hour'));
    const shift = hour < 6 ? 'DEM' : hour < 14 ? 'SANG' : hour < 22 ? 'CHIEU' : 'DEM';
    return `CA-${value('year')}${value('month')}${value('day')}-${shift}`;
  }
}

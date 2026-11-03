import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { ApproveMaterialAdjustmentDto } from '../dto/process-material-adjustment.dto.js';

const includeAdjustment = {
  materialLot: { include: { material: { include: { unit: true } } } },
  location: { include: { branch: true } },
  issueDetail: { include: { issue: true, unit: true, settlement: true } },
  movementLink: { include: { movement: true } },
} satisfies Prisma.MaterialAdjustmentInclude;
type Adjustment = Prisma.MaterialAdjustmentGetPayload<{
  include: typeof includeAdjustment;
}>;

@Injectable()
export class MaterialAdjustmentApi {
  constructor(private readonly prisma: PrismaService) {}

  async getRequests(type?: string, status = 'PENDING') {
    if (type && !['WASTE', 'RETURN'].includes(type))
      throw new BadRequestException('Loại phiếu không hợp lệ');
    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status))
      throw new BadRequestException('Trạng thái không hợp lệ');
    try {
      const rows = await this.prisma.materialAdjustment.findMany({
        where: { ...(type ? { type } : {}), status },
        include: includeAdjustment,
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
      return {
        message: 'Danh sách phiếu điều chỉnh NVL',
        data: rows.map((row) => this.toResponse(row)),
      };
    } catch (error) {
      this.fail(error);
    }
  }

  async getRequest(code: string) {
    try {
      const row = await this.prisma.materialAdjustment.findUnique({
        where: { code: code.trim() },
        include: includeAdjustment,
      });
      if (!row)
        throw new NotFoundException('Không tìm thấy phiếu điều chỉnh NVL');
      let remainingQuantity: string | null = null;
      if (
        row.issueDetail?.settlement &&
        row.issueDetail.issue.status === 'APPROVED'
      ) {
        const settled = await this.prisma.materialAdjustment.aggregate({
          where: { issueDetailId: row.issueDetailId, status: 'APPROVED' },
          _sum: { acceptedQuantity: true },
        });
        remainingQuantity = this.issuedQuantity(row)
          .minus(row.issueDetail.settlement.consumedQuantity)
          .minus(settled._sum.acceptedQuantity ?? 0)
          .toString();
      }
      return {
        message: 'Chi tiết phiếu điều chỉnh NVL',
        data: { ...this.toResponse(row), remainingQuantity },
      };
    } catch (error) {
      this.fail(error);
    }
  }

  async approve(code: string, dto: ApproveMaterialAdjustmentDto) {
    try {
      return await this.prisma.$transaction(
        async (tx) => {
          const row = await tx.materialAdjustment.findUnique({
            where: { code: code.trim() },
            include: includeAdjustment,
          });
          if (!row)
            throw new NotFoundException('Không tìm thấy phiếu điều chỉnh NVL');
          if (row.status !== 'PENDING')
            throw new ConflictException('Phiếu đã được xử lý');
          if (!row.reason.trim())
            throw new BadRequestException(
              'Phiếu điều chỉnh chưa có lý do đề nghị',
            );
          if (
            !row.location.branch.isActive ||
            row.location.locationType === 'FINISHED_GOODS'
          )
            throw new BadRequestException(
              'Chi nhánh hoặc vị trí kho không hợp lệ',
            );
          if (
            !['WASTE', 'RETURN'].includes(row.type) ||
            !['STOCK', 'ISSUED'].includes(row.source) ||
            (row.type === 'RETURN' && row.source !== 'ISSUED')
          )
            throw new BadRequestException('Loại và nguồn NVL không hợp lệ');
          const quantity = new Prisma.Decimal(dto.acceptedQuantity);
          if (
            quantity.lte(0) ||
            quantity.gt(row.quantity) ||
            quantity.decimalPlaces() > 3
          )
            throw new BadRequestException('Số lượng thực nhận không hợp lệ');
          const note = dto.note?.trim() || null;
          if (!quantity.equals(row.quantity) && !note)
            throw new BadRequestException(
              'Phải ghi lý do khi số lượng thực nhận khác đề nghị',
            );

          if (row.source === 'ISSUED') {
            const line = row.issueDetail;
            if (
              !line ||
              line.issue.status !== 'APPROVED' ||
              line.materialId !== row.materialLot.materialId ||
              line.materialLotId !== row.materialLotId ||
              line.issue.branchId !== row.location.branchId
            )
              throw new ConflictException('Dòng phiếu xuất gốc không hợp lệ');
            if (
              line.unitId !== row.materialLot.material.unitId &&
              (line.unit.baseUnitId !== row.materialLot.material.unitId ||
                line.unit.conversionFactor.lte(0))
            )
              throw new ConflictException('Đơn vị phiếu xuất gốc không hợp lệ');
            const settlement = line.settlement;
            if (
              !settlement ||
              !settlement.referenceCode.trim() ||
              !settlement.recordedBy.trim() ||
              settlement.finalizedAt > new Date()
            )
              throw new ConflictException(
                'BLOCKED: Chưa có quyết toán tiêu hao đã chốt từ App Nhân viên.',
              );
            const settled = await tx.materialAdjustment.aggregate({
              where: { issueDetailId: line.id, status: 'APPROVED' },
              _sum: { acceptedQuantity: true },
            });
            const remaining = this.issuedQuantity(row)
              .minus(settlement.consumedQuantity)
              .minus(settled._sum.acceptedQuantity ?? 0);
            if (settlement.consumedQuantity.lt(0) || quantity.gt(remaining))
              throw new BadRequestException(
                'Số lượng vượt lượng đã lĩnh chưa quyết toán',
              );
          }
          if (row.type === 'RETURN') {
            const today = new Intl.DateTimeFormat('sv-SE', {
              timeZone: 'Asia/Ho_Chi_Minh',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date());
            if (
              dto.qualityStatus !== 'ACCEPTABLE' ||
              row.materialLot.status !== 'ACTIVE' ||
              row.materialLot.material.status !== 'ACTIVE' ||
              row.materialLot.material.unit.status !== 'ACTIVE' ||
              (row.materialLot.expiryDate &&
                row.materialLot.expiryDate.toISOString().slice(0, 10) < today)
            )
              throw new BadRequestException(
                'NVL không đủ điều kiện chất lượng hoặc đã hết hạn',
              );
          }
          const updated = await tx.materialAdjustment.updateMany({
            where: { id: row.id, status: 'PENDING' },
            data: {
              status: 'APPROVED',
              acceptedQuantity: quantity,
              qualityStatus: dto.qualityStatus ?? null,
              decisionNote: note,
              processedAt: new Date(),
            },
          });
          if (updated.count !== 1)
            throw new ConflictException('Phiếu vừa được xử lý');

          // NVL đã lĩnh chỉ ghi hao hụt; không ghi movement/trừ kho lần thứ hai.
          if (row.type === 'RETURN' || row.source === 'STOCK') {
            const key = {
              locationId: row.locationId,
              materialLotId: row.materialLotId,
            };
            if (row.type === 'WASTE') {
              const reduced = await tx.materialBalance.updateMany({
                where: { ...key, quantity: { gte: quantity } },
                data: { quantity: { decrement: quantity } },
              });
              if (reduced.count !== 1)
                throw new BadRequestException(
                  'Không đủ tồn kho để ghi giảm hao hụt',
                );
            }
            const balance =
              row.type === 'RETURN'
                ? await tx.materialBalance.upsert({
                    where: { locationId_materialLotId: key },
                    create: { ...key, quantity },
                    update: { quantity: { increment: quantity } },
                  })
                : await tx.materialBalance.findUniqueOrThrow({
                    where: { locationId_materialLotId: key },
                  });
            const change = row.type === 'RETURN' ? quantity : quantity.neg();
            const movement = await tx.inventoryMovement.create({
              data: {
                ...key,
                movementType: row.type,
                quantityBefore: balance.quantity.minus(change),
                quantityChange: change,
                quantityAfter: balance.quantity,
              },
            });
            await tx.materialAdjustmentMovement.create({
              data: { adjustmentId: row.id, movementId: movement.id },
            });
          }
          return {
            message: 'Đã duyệt phiếu điều chỉnh NVL',
            data: {
              code: row.code,
              status: 'APPROVED',
              acceptedQuantity: quantity.toString(),
            },
          };
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          timeout: 15000,
        },
      );
    } catch (error) {
      this.fail(error);
    }
  }

  async reject(code: string, reason: string) {
    reason = reason.trim();
    if (!reason) throw new BadRequestException('Phải nhập lý do từ chối');
    try {
      return await this.prisma.$transaction(
        async (tx) => {
          const row = await tx.materialAdjustment.findUnique({
            where: { code: code.trim() },
          });
          if (!row)
            throw new NotFoundException('Không tìm thấy phiếu điều chỉnh NVL');
          const result = await tx.materialAdjustment.updateMany({
            where: { id: row.id, status: 'PENDING' },
            data: {
              status: 'REJECTED',
              decisionNote: reason,
              processedAt: new Date(),
            },
          });
          if (result.count !== 1)
            throw new ConflictException('Phiếu đã được xử lý');
          return {
            message: 'Đã từ chối phiếu điều chỉnh NVL',
            data: { code: row.code, status: 'REJECTED', reason },
          };
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (error) {
      this.fail(error);
    }
  }

  private issuedQuantity(row: Adjustment) {
    const line = row.issueDetail;
    if (!line) throw new ConflictException('Thiếu dòng phiếu xuất gốc');
    return line.unitId === row.materialLot.material.unitId
      ? line.quantity
      : line.quantity.mul(line.unit.conversionFactor);
  }

  private toResponse(row: Adjustment) {
    return {
      code: row.code,
      type: row.type,
      source: row.source,
      status: row.status,
      materialCode: row.materialLot.material.code,
      materialName: row.materialLot.material.name,
      lotCode: row.materialLot.lotCode,
      expiryDate: row.materialLot.expiryDate,
      unitName: row.materialLot.material.unit.name,
      locationName: row.location.name,
      branchCode: row.location.branch.code,
      quantity: row.quantity.toString(),
      acceptedQuantity: row.acceptedQuantity?.toString() ?? null,
      qualityStatus: row.qualityStatus,
      reason: row.reason,
      decisionNote: row.decisionNote,
      createdAt: row.createdAt,
      processedAt: row.processedAt,
      issueCode: row.issueDetail?.issue.issueCode ?? null,
      issueDetailId: row.issueDetailId,
      consumedQuantity:
        row.issueDetail?.settlement?.consumedQuantity.toString() ?? null,
      approvalBlockedReason:
        row.source === 'ISSUED' && !row.issueDetail?.settlement
          ? 'Chưa có quyết toán tiêu hao đã chốt từ App Nhân viên.'
          : null,
      movement: row.movementLink?.movement ?? null,
    };
  }

  private fail(error: unknown): never {
    // adapter-pg can report a COMMIT conflict directly instead of Prisma P2034.
    const cause = (
      error as { cause?: { kind?: string; originalCode?: string } } | null
    )?.cause;
    if (
      cause?.kind === 'TransactionWriteConflict' ||
      ['40001', '40P01'].includes(cause?.originalCode ?? '')
    ) {
      throw new ConflictException(
        'Phiếu hoặc số dư vừa thay đổi, vui lòng tải lại.',
      );
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2021')
        throw new ServiceUnavailableException(
          'Chưa cài migration phiếu hao hụt/hoàn trả NVL.',
        );
      if (['P2034', 'P2002'].includes(error.code))
        throw new ConflictException(
          'Phiếu hoặc số dư vừa thay đổi, vui lòng tải lại.',
        );
    }
    throw error;
  }
}

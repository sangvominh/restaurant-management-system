import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { KitchenReturnDecisionService } from '../../staff/kitchen-return-decision.service.js';
import { KitchenWasteDecisionService } from '../../staff/kitchen-waste-decision.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MaterialAdjustmentApi } from './material-adjustment.api.js';
import { ApproveMaterialAdjustmentDto } from '../dto/process-material-adjustment.dto.js';

const lotInclude = { material: { include: { unit: true } } } as const;
type StaffRow = {
  recordId: string; storage: 'STAFF_STOCK_WASTE' | 'STAFF_KITCHEN_WASTE' | 'STAFF_RETURN';
  code: string; type: string; source: string; status: string;
  materialCode: string; materialName: string; lotCode: string; expiryDate: Date | null;
  unitName: string; locationName: string; branchCode: string;
  quantity: string; acceptedQuantity: string | null; qualityStatus: null;
  reason: string; decisionNote: string | null; createdAt: Date; processedAt: Date | null;
  issueCode: string | null; issueDetailId: string | null;
  consumedQuantity: null; approvalBlockedReason: string | null; movement: unknown;
  sourceDetails?: {issueDetailId:string;issueCode:string;quantity:string}[];
  condition?: string | null; conditionConfirmed?: boolean;
};
const missingSource = 'Chưa có đủ nguồn cấp phát và lượng giữ đáng tin cậy để xử lý.';

@Injectable()
export class SharedMaterialAdjustmentApi {
  constructor(private readonly prisma: PrismaService, private readonly original: MaterialAdjustmentApi,
    private readonly kitchenReturn: KitchenReturnDecisionService,
    private readonly kitchenWaste: KitchenWasteDecisionService) {}

  async getRequests(type?: string, status = 'PENDING') {
    // Keep the existing validation and Warehouse documents.
    const original = await this.original.getRequests(type, status);
    const staff = await this.staffRows(type, status);
    const data = [...original.data, ...staff].sort((a,b) => b.createdAt.getTime()-a.createdAt.getTime());
    this.unique(data);
    return { message: original.message, data: data.slice(0,100) };
  }

  async getRequest(code: string) {
    let original: Awaited<ReturnType<MaterialAdjustmentApi['getRequest']>> | null = null;
    try { original = await this.original.getRequest(code); }
    catch (error) { if (!(error instanceof NotFoundException)) throw error; }
    const staff = await this.staffRows(undefined, undefined, code.trim());
    this.unique([...(original ? [original.data] : []), ...staff]);
    if (original) return original;
    if (!staff.length) throw new NotFoundException('Không tìm thấy phiếu điều chỉnh NVL');
    return { message:'Chi tiết phiếu điều chỉnh NVL', data:{...staff[0],remainingQuantity:null} };
  }

  async approve(code: string, dto: ApproveMaterialAdjustmentDto) {
    const record = await this.getRequest(code);
    if (!('storage' in record.data)) return this.original.approve(code,dto);
    const row = record.data;
    if (row.status !== 'PENDING') throw new ConflictException('Phiếu đã được xử lý');
    if (row.approvalBlockedReason) throw new ConflictException(row.approvalBlockedReason);
    if (!new Prisma.Decimal(dto.acceptedQuantity).equals(row.quantity))
      throw new BadRequestException('Phiếu Staff hiện hỗ trợ duyệt toàn bộ số lượng đề nghị.');
    if (row.type === 'RETURN' && dto.qualityStatus !== 'ACCEPTABLE')
      throw new BadRequestException('Phải xác nhận chất lượng NVL hoàn trả đạt yêu cầu.');
    try {
      if (row.storage === 'STAFF_STOCK_WASTE') return await this.stockDecision(row.recordId,dto.note);
      const branch = await this.prisma.branch.findUniqueOrThrow({where:{code:row.branchCode}});
      if (!branch.isActive) throw new BadRequestException('Chi nhánh đã ngừng hoạt động.');
      const input = {branchId:branch.id,code:row.code,decision:'APPROVED' as const,
        decidedBy:'warehouse-api',reason:dto.note};
      const result = row.storage === 'STAFF_RETURN'
        ? await this.kitchenReturn.decide(input) : await this.kitchenWaste.decide(input);
      return {message:'Đã duyệt phiếu gốc từ Staff',data:{...result,acceptedQuantity:row.quantity}};
    } catch (error) { this.fail(error); }
  }

  async reject(code: string, reason: string) {
    const note = reason.trim();
    if (!note) throw new BadRequestException('Phải nhập lý do từ chối');
    const record = await this.getRequest(code);
    if (!('storage' in record.data)) return this.original.reject(code,note);
    const row = record.data;
    if (row.status !== 'PENDING') throw new ConflictException('Phiếu đã được xử lý');
    try {
      if (row.storage === 'STAFF_STOCK_WASTE') return await this.stockDecision(row.recordId,note,true);
      const branch = await this.prisma.branch.findUniqueOrThrow({where:{code:row.branchCode}});
      const input = {branchId:branch.id,code:row.code,decision:'REJECTED' as const,
        decidedBy:'warehouse-api',reason:note};
      const result = row.storage === 'STAFF_RETURN'
        ? await this.kitchenReturn.decide(input) : await this.kitchenWaste.decide(input);
      return {message:'Đã từ chối phiếu gốc từ Staff',data:{...result,reason:note}};
    } catch (error) { this.fail(error); }
  }

  private async stockDecision(id:string,note?:string,rejected=false) {
    return this.prisma.$transaction(async tx => {
      const row = await tx.staffMaterialWaste.findUniqueOrThrow({where:{id}});
      if (row.status !== 'PENDING') throw new ConflictException('Phiếu đã được xử lý');
      const status = rejected ? 'REJECTED' : 'APPROVED';
      const changed = await tx.staffMaterialWaste.updateMany({
        where:{id,status:'PENDING'},data:{status,decisionNote:note?.trim() || null,processedAt:new Date()},
      });
      if (changed.count !== 1) throw new ConflictException('Phiếu vừa được xử lý');
      if (!rejected) {
        const balance = await tx.materialBalance.findUnique({where:{id:row.balanceId},
          include:{location:{include:{branch:true}},materialLot:true}});
        if (!balance || balance.location.branchId !== row.branchId ||
            !balance.location.branch.isActive || balance.location.locationType === 'FINISHED_GOODS' ||
            row.quantity.lte(0)) throw new ConflictException('Nguồn tồn kho của phiếu không hợp lệ');
        const reduced = await tx.materialBalance.updateMany({
          where:{id:balance.id,quantity:{gte:row.quantity}},data:{quantity:{decrement:row.quantity}},
        });
        if (reduced.count !== 1) throw new BadRequestException('Không đủ tồn kho để ghi giảm hao hụt');
        const after = await tx.materialBalance.findUniqueOrThrow({where:{id:balance.id}});
        const movement = await tx.inventoryMovement.create({data:{
          materialLotId:balance.materialLotId,locationId:balance.locationId,movementType:'WASTE',
          quantityBefore:after.quantity.plus(row.quantity),quantityChange:row.quantity.neg(),quantityAfter:after.quantity,
        }});
        await tx.staffMaterialWaste.update({where:{id},data:{movementId:movement.id}});
      }
      return {message:rejected?'Đã từ chối phiếu hao hụt':'Đã duyệt phiếu hao hụt',
        data:{code:row.code,status,...(rejected?{reason:note}:{acceptedQuantity:row.quantity.toString()})}};
    },{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
  }

  private async trace(id:string,type:'WASTE'|'RETURN',branchId:string,lotId:string,detailId?:string) {
    return this.prisma.$queryRaw<{issueDetailId:string;issueCode:string;quantity:string}[]>`
      SELECT d.id AS "issueDetailId",i.issue_code AS "issueCode",a.quantity::text AS quantity
      FROM staff_kitchen_source_allocations a
      JOIN staff_kitchen_sources s ON s.issue_detail_id=a.issue_detail_id
      JOIN material_issue_details d ON d.id=s.issue_detail_id
      JOIN material_issues i ON i.id=d.issue_id
      JOIN material_lots l ON l.id=d.material_lot_id
      WHERE a.event_type=${type} AND a.event_key=${id} AND i.status='APPROVED'
        AND i.branch_id=${branchId}::uuid AND s.branch_id=i.branch_id
        AND d.material_lot_id=${lotId}::uuid AND s.material_lot_id=d.material_lot_id
        AND d.material_id=l.material_id
        AND (${detailId ?? null}::uuid IS NULL OR d.id=${detailId ?? null}::uuid)`;
  }

  private traced(rows:{quantity:string}[],quantity:string | Prisma.Decimal) {
    return new Prisma.Decimal(quantity).gt(0) &&
      rows.reduce((sum,row)=>sum.plus(row.quantity),new Prisma.Decimal(0)).equals(quantity);
  }

  private fail(error:unknown):never {
    const cause=(error as {cause?:{kind?:string;originalCode?:string}})?.cause;
    if ((error instanceof Prisma.PrismaClientKnownRequestError && error.code==='P2034') ||
        cause?.kind==='TransactionWriteConflict' || ['40001','40P01'].includes(cause?.originalCode ?? ''))
      throw new ConflictException('Phiếu hoặc số dư vừa thay đổi, vui lòng tải lại.');
    throw error;
  }

  private unique(rows: {code:string}[]) {
    const codes = new Set<string>();
    for (const row of rows) {
      if (codes.has(row.code)) throw new ConflictException('Mã phiếu trùng giữa các nguồn; cần đối chiếu trước khi xử lý.');
      codes.add(row.code);
    }
  }

  private async staffRows(type?: string, status?: string, code?: string): Promise<StaffRow[]> {
    const rows: StaffRow[] = [];
    const where = { ...(status ? {status} : {}), ...(code ? {code} : {}) };
    if (!type || type === 'WASTE') {
      const waste = await this.prisma.staffMaterialWaste.findMany({where,include:{movement:true},orderBy:{createdAt:'desc'},take:100});
      const balances = await this.prisma.materialBalance.findMany({
        where:{id:{in:waste.map(row=>row.balanceId)}},
        include:{materialLot:{include:lotInclude},location:{include:{branch:true}}},
      });
      for (const row of waste) {
        const balance = balances.find(item=>item.id===row.balanceId);
        rows.push({
          recordId:row.id,storage:'STAFF_STOCK_WASTE',code:row.code,type:'WASTE',source:'STOCK',status:row.status,
          materialCode:balance?.materialLot.material.code ?? '',materialName:balance?.materialLot.material.name ?? 'Không còn dữ liệu',
          lotCode:balance?.materialLot.lotCode ?? '',expiryDate:balance?.materialLot.expiryDate ?? null,
          unitName:balance?.materialLot.material.unit.name ?? '',locationName:balance?.location.name ?? '',
          branchCode:balance?.location.branch.code ?? '',quantity:row.quantity.toString(),
          acceptedQuantity:row.status==='APPROVED'?row.quantity.toString():null,qualityStatus:null,
          reason:row.reason,decisionNote:row.decisionNote,createdAt:row.createdAt,processedAt:row.processedAt,
          issueCode:null,issueDetailId:null,consumedQuantity:null,
          approvalBlockedReason:balance && balance.location.branchId===row.branchId && balance.location.branch.isActive &&
            balance.location.locationType!=='FINISHED_GOODS' && row.quantity.gt(0) ? null : 'Nguồn tồn kho không hợp lệ.',movement:row.movement,
        });
      }
      // Processing defects belong to Restaurant Admin, not Warehouse Admin.
      const kitchen = await this.prisma.$queryRaw<(StaffRow & {branchId:string;materialLotId:string})[]>`
        SELECT w.branch_id AS "branchId",w.material_lot_id AS "materialLotId",w.id AS "recordId",'STAFF_KITCHEN_WASTE'::text AS storage,w.code,
          'WASTE'::text AS type,'ISSUED'::text AS source,w.status,
          m.code AS "materialCode",m.name AS "materialName",l.lot_code AS "lotCode",
          l.expiry_date AS "expiryDate",u.name AS "unitName",'Bếp'::text AS "locationName",
          b.code AS "branchCode",w.quantity::text AS quantity,
          CASE WHEN w.status='APPROVED' THEN w.quantity::text ELSE NULL END AS "acceptedQuantity",
          NULL AS "qualityStatus",w.reason,w.decision_note AS "decisionNote",
          w.created_at AS "createdAt",w.processed_at AS "processedAt",
          NULL AS "issueCode",NULL AS "issueDetailId",NULL AS "consumedQuantity",
          ${missingSource}::text AS "approvalBlockedReason",NULL AS movement
        FROM staff_kitchen_waste w
        JOIN material_lots l ON l.id=w.material_lot_id
        JOIN materials m ON m.id=l.material_id JOIN units u ON u.id=m.unit_id
        JOIN branches b ON b.id=w.branch_id
        WHERE w.processing_defect_id IS NULL
          AND (${status ?? null}::text IS NULL OR w.status=${status ?? null})
          AND (${code ?? null}::text IS NULL OR w.code=${code ?? null})
        ORDER BY w.created_at DESC LIMIT 100`;
      for (const {branchId,materialLotId,...row} of kitchen) {
        const sources = await this.trace(row.recordId,'WASTE',branchId,materialLotId);
        rows.push({...row,sourceDetails:sources,issueCode:sources.map(item=>item.issueCode).join(', ') || null,
          issueDetailId:sources.length===1?sources[0].issueDetailId:null,
          approvalBlockedReason:this.traced(sources,row.quantity)?null:missingSource});
      }
    }
    if (!type || type === 'RETURN') {
      const returns = await this.prisma.staffMaterialReturn.findMany({where,include:{movement:true},orderBy:{createdAt:'desc'},take:100});
      const details = await this.prisma.materialIssueDetail.findMany({
        where:{id:{in:returns.map(row=>row.issueDetailId)}},
        include:{materialLot:{include:lotInclude},location:{include:{branch:true}},issue:true},
      });
      for (const row of returns) {
        const detail = details.find(item=>item.id===row.issueDetailId);
        const sources = detail ? await this.trace(row.id,'RETURN',row.branchId,detail.materialLotId,row.issueDetailId) : [];
        const valid = detail && detail.issue.branchId===row.branchId && detail.location.branchId===row.branchId &&
          detail.location.branch.isActive && detail.location.locationType!=='FINISHED_GOODS' &&
          row.stockReserved && row.conditionConfirmed && ['SEALED','OPENED','OTHER'].includes(row.condition ?? '') &&
          this.traced(sources,row.quantity);
        rows.push({
          recordId:row.id,storage:'STAFF_RETURN',code:row.code,type:'RETURN',source:'ISSUED',status:row.status,
          materialCode:detail?.materialLot.material.code ?? '',materialName:detail?.materialLot.material.name ?? 'Không còn dữ liệu',
          lotCode:detail?.materialLot.lotCode ?? '',expiryDate:detail?.materialLot.expiryDate ?? null,
          unitName:detail?.materialLot.material.unit.name ?? '',locationName:detail?.location.name ?? '',
          branchCode:detail?.location.branch.code ?? '',quantity:row.quantity.toString(),
          acceptedQuantity:row.status==='APPROVED'?row.quantity.toString():null,qualityStatus:null,
          reason:row.note || 'Hoàn trả NVL đã lĩnh',decisionNote:row.decisionNote,createdAt:row.createdAt,processedAt:row.processedAt,
          issueCode:detail?.issue.issueCode ?? null,issueDetailId:row.issueDetailId,consumedQuantity:null,
          approvalBlockedReason:valid?null:missingSource,movement:row.movement,sourceDetails:sources,condition:row.condition,conditionConfirmed:row.conditionConfirmed,
        });
      }
    }
    return rows;
  }
}

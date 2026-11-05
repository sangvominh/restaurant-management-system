import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

/** Integration point: the future Admin adapter must authenticate and authorize the caller and branch. */
@Injectable()
export class KitchenWasteDecisionService {
 constructor(private readonly db: PrismaService) {}
 async pending(branchId: string) {
  return this.db.$queryRaw`SELECT w.code, w.quantity::text AS quantity, w.reason, w.created_at AS "createdAt", w.order_line_id AS "orderLineId", m.name, u.name AS unit, l.lot_code AS lot, s.name AS "actorName" FROM staff_kitchen_waste w JOIN material_lots l ON l.id=w.material_lot_id JOIN materials m ON m.id=l.material_id JOIN units u ON u.id=m.unit_id JOIN staff_users s ON s.id=w.actor_id WHERE w.branch_id=${branchId}::uuid AND w.status='PENDING' AND w.processing_defect_id IS NULL ORDER BY w.created_at`;
 }
 async decide(input: {branchId:string; code:string; decision:'APPROVED' | 'REJECTED'; decidedBy:string; reason?:string}) {
  const {branchId,code,decision} = input;
  const decidedBy = input.decidedBy?.trim();
  const note = input.reason?.trim() || null;
  if (!decidedBy || decidedBy.length > 200) throw new BadRequestException('Người duyệt không hợp lệ.');
  if (decision !== 'APPROVED' && decision !== 'REJECTED') throw new BadRequestException('Quyết định không hợp lệ.');
  if ((decision === 'REJECTED' && !note) || (note && note.length > 1000)) throw new BadRequestException('Lý do từ chối không hợp lệ.');
  return this.db.$transaction(async tx => {
   const rows=await tx.$queryRaw<{id:string; material_lot_id:string; quantity:Prisma.Decimal; status:string; processing_defect_id:string|null}[]>`SELECT id,material_lot_id,quantity,status,processing_defect_id FROM staff_kitchen_waste WHERE code=${code} AND branch_id=${branchId}::uuid FOR UPDATE`;
   const waste=rows[0]; if (!waste) throw new NotFoundException('Không tìm thấy phiếu hao hụt.');
   if (waste.processing_defect_id) throw new ConflictException('Hao hụt thuộc phiếu sản phẩm lỗi; xử lý trên phiếu tổng.');
   if (waste.status !== 'PENDING') throw new ConflictException('Phiếu đã được xử lý.');
   const count=decision === 'APPROVED'
    ? await tx.$executeRaw`UPDATE staff_kitchen_balances SET quantity=quantity-${waste.quantity},reserved_waste=reserved_waste-${waste.quantity} WHERE branch_id=${branchId}::uuid AND material_lot_id=${waste.material_lot_id}::uuid AND reserved_waste >= ${waste.quantity} AND quantity >= ${waste.quantity}`
    : await tx.$executeRaw`UPDATE staff_kitchen_balances SET reserved_waste=reserved_waste-${waste.quantity} WHERE branch_id=${branchId}::uuid AND material_lot_id=${waste.material_lot_id}::uuid AND reserved_waste >= ${waste.quantity}`;
   if (count !== 1) throw new ConflictException('Số lượng giữ của phiếu không còn hợp lệ.');
   await tx.$executeRaw`UPDATE staff_kitchen_waste SET status=${decision},decision_note=${note},decided_by=${decidedBy},processed_at=now() WHERE id=${waste.id}::uuid`;
   return {code,status:decision};
  }, {isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
 }
}

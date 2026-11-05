import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { isUsableLotExpiry } from '../warehouse/lot-expiry.js';

/** Admin must authenticate and authorize the branch before invoking this service. */
@Injectable()
export class KitchenReturnDecisionService {
 constructor(private readonly db:PrismaService) {}
 async pending(branchId:string) {
  return this.db.$queryRaw`SELECT r.code,r.quantity::text AS quantity,r.condition,r.condition_confirmed AS "conditionConfirmed",r.note,r.created_at AS "createdAt",m.name,u.name AS unit,l.lot_code AS lot,i.issue_code AS "issueCode",s.name AS "actorName" FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id JOIN material_issues i ON i.id=d.issue_id JOIN material_lots l ON l.id=d.material_lot_id JOIN materials m ON m.id=d.material_id JOIN units u ON u.id=d.unit_id JOIN staff_users s ON s.id=r.actor_id WHERE r.branch_id=${branchId}::uuid AND r.status='PENDING' ORDER BY r.created_at`;
 }
 async decide(input:{branchId:string; code:string; decision:'APPROVED'|'REJECTED'; decidedBy:string; reason?:string}) {
  const note=input.reason?.trim() || null; const decidedBy=input.decidedBy?.trim();
  if (!decidedBy || decidedBy.length > 200 || !['APPROVED','REJECTED'].includes(input.decision) || (input.decision === 'REJECTED' && !note) || (note && note.length > 1000)) throw new BadRequestException('Thông tin xử lý phiếu không hợp lệ.');
  return this.db.$transaction(async tx => {
   const locked=await tx.$queryRaw<{id:string}[]>`SELECT id FROM staff_material_returns WHERE code=${input.code} AND branch_id=${input.branchId}::uuid FOR UPDATE`;
   if (!locked.length) throw new NotFoundException('Không tìm thấy phiếu hoàn trả.');
   const r=await tx.staffMaterialReturn.findUniqueOrThrow({where:{id:locked[0].id}});
   if (r.status !== 'PENDING') throw new ConflictException('Phiếu đã được xử lý.');
   if (!r.stockReserved) throw new ConflictException('Phiếu cũ chưa được giữ tồn; cần đối chiếu trước khi xử lý.');
   const detail=await tx.materialIssueDetail.findUniqueOrThrow({where:{id:r.issueDetailId},include:{materialLot:true,location:true}});
   if (detail.location.branchId !== input.branchId) throw new ConflictException('Vị trí trả không thuộc chi nhánh.');
   if (input.decision === 'APPROVED' && (detail.materialLot.status !== 'ACTIVE' || !isUsableLotExpiry(detail.materialLot.expiryDate))) throw new BadRequestException('Lô đã hết hạn hoặc chưa có hạn, không thể nhập lại kho.');
   const changed=input.decision === 'APPROVED'
    ? await tx.$executeRaw`UPDATE staff_kitchen_balances SET quantity=quantity-${r.quantity},reserved_return=reserved_return-${r.quantity} WHERE branch_id=${input.branchId}::uuid AND material_lot_id=${detail.materialLotId}::uuid AND reserved_return>=${r.quantity} AND quantity>=${r.quantity}`
    : await tx.$executeRaw`UPDATE staff_kitchen_balances SET reserved_return=reserved_return-${r.quantity} WHERE branch_id=${input.branchId}::uuid AND material_lot_id=${detail.materialLotId}::uuid AND reserved_return>=${r.quantity}`;
   if (changed !== 1) throw new ConflictException('Lượng giữ của phiếu không còn hợp lệ.');
   let movementId: string | null = null;
   if (input.decision === 'APPROVED') {
    const b=await tx.materialBalance.upsert({where:{locationId_materialLotId:{locationId:detail.locationId,materialLotId:detail.materialLotId}},create:{locationId:detail.locationId,materialLotId:detail.materialLotId,quantity:r.quantity},update:{quantity:{increment:r.quantity}}});
    const movement=await tx.inventoryMovement.create({data:{materialLotId:detail.materialLotId,locationId:detail.locationId,movementType:'RETURN',quantityBefore:b.quantity.minus(r.quantity),quantityChange:r.quantity,quantityAfter:b.quantity}});
    movementId=movement.id;
   }
   await tx.staffMaterialReturn.update({where:{id:r.id},data:{movementId,status:input.decision,decisionNote:note,decidedBy,processedAt:new Date(),stockReserved:false}});
   return {code:r.code,status:input.decision};
  },{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
 }
}

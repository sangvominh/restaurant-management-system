import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

/** Admin must authenticate and authorize the branch before invoking. */
@Injectable()
export class ProcessingDefectDecisionService {
 constructor(private readonly db:PrismaService) {}
 async pending(branchId:string) {
  return this.db.$queryRaw`SELECT d.code,d.quantity::text,d.reason,d.created_at AS "createdAt",d.order_line_id AS "orderLineId",p.code AS "productionCode",s.name AS "actorName",COALESCE(l.name,pr.name) AS name,COALESCE((SELECT jsonb_agg(jsonb_build_object('name',m.name,'lot',ml.lot_code,'unit',u.name,'quantity',w.quantity::text) ORDER BY m.name,ml.lot_code) FROM staff_kitchen_waste w JOIN material_lots ml ON ml.id=w.material_lot_id JOIN materials m ON m.id=ml.material_id JOIN units u ON u.id=m.unit_id WHERE w.processing_defect_id=d.id),'[]'::jsonb) AS materials FROM staff_processing_defects d JOIN staff_users s ON s.id=d.actor_id LEFT JOIN order_lines l ON l.id=d.order_line_id LEFT JOIN production_orders p ON p.id=d.production_order_id LEFT JOIN boms b ON b.id=p.bom_id LEFT JOIN products pr ON pr.code=b.product_code WHERE d.branch_id=${branchId}::uuid AND d.status='PENDING' ORDER BY d.created_at`;
 }
 async decide(input:{branchId:string;code:string;decision:'APPROVED'|'REJECTED';decidedBy:string;reason?:string}) {
  const note=input.reason?.trim() || null; const decidedBy=input.decidedBy?.trim();
  if(!decidedBy || decidedBy.length>200 || !['APPROVED','REJECTED'].includes(input.decision) || (input.decision==='REJECTED' && !note) || (note && note.length>1000)) throw new BadRequestException('Thông tin quyết định không hợp lệ.');
  return this.db.$transaction(async tx=>{
   const rows=await tx.$queryRaw<{id:string;status:string;order_line_id:string|null;quantity:Prisma.Decimal}[]>`SELECT id,status,order_line_id,quantity FROM staff_processing_defects WHERE code=${input.code} AND branch_id=${input.branchId}::uuid FOR UPDATE`;
   const defect=rows[0]; if(!defect) throw new NotFoundException('Không tìm thấy phiếu báo lỗi.'); if(defect.status!=='PENDING') throw new ConflictException('Phiếu đã được xử lý.');
   if(input.decision==='APPROVED' && defect.order_line_id) {
    const lines=await tx.$queryRaw<{id:string}[]>`SELECT id FROM order_lines WHERE id=${defect.order_line_id}::uuid FOR UPDATE`;
    if(!lines.length) throw new ConflictException('Không tìm thấy món cần làm lại.');
    const line=await tx.orderLine.findUniqueOrThrow({where:{id:defect.order_line_id}});
    if(line.status!=='COOKING' || !defect.quantity.isInteger() || defect.quantity.gt(line.quantity)) throw new ConflictException('Món đã thay đổi hoặc số lượng lỗi không hợp lệ; cần đối chiếu trước khi duyệt.');
    const failed=defect.quantity.toNumber();
    if(failed===line.quantity) {
     await tx.orderLine.update({where:{id:line.id},data:{status:'QUEUED',cookingAt:null}});
     await tx.$executeRaw`UPDATE staff_processing_defects SET retry_order_line_id=${line.id}::uuid WHERE id=${defect.id}::uuid`;
    } else {
     await tx.orderLine.update({where:{id:line.id},data:{quantity:line.quantity-failed}});
     const retry=await tx.orderLine.create({data:{orderId:line.orderId,menuItemId:line.menuItemId,name:line.name,unitPrice:line.unitPrice,quantity:failed,note:line.note,status:'QUEUED'}});
     await tx.$executeRaw`UPDATE staff_processing_defects SET retry_order_line_id=${retry.id}::uuid WHERE id=${defect.id}::uuid`;
    }
   }
   const items=await tx.$queryRaw<{id:string;material_lot_id:string;quantity:Prisma.Decimal;status:string}[]>`SELECT id,material_lot_id,quantity,status FROM staff_kitchen_waste WHERE processing_defect_id=${defect.id}::uuid ORDER BY material_lot_id FOR UPDATE`;
   if(!items.length || items.some(x=>x.status!=='PENDING')) throw new ConflictException('Hao hụt liên quan không hợp lệ.');
   for(const item of items) {
    const count=input.decision==='APPROVED'
     ? await tx.$executeRaw`UPDATE staff_kitchen_balances SET quantity=quantity-${item.quantity},reserved_waste=reserved_waste-${item.quantity} WHERE branch_id=${input.branchId}::uuid AND material_lot_id=${item.material_lot_id}::uuid AND quantity>=${item.quantity} AND reserved_waste>=${item.quantity}`
     : await tx.$executeRaw`UPDATE staff_kitchen_balances SET reserved_waste=reserved_waste-${item.quantity} WHERE branch_id=${input.branchId}::uuid AND material_lot_id=${item.material_lot_id}::uuid AND reserved_waste>=${item.quantity}`;
    if(count!==1) throw new ConflictException('Lượng giữ không còn hợp lệ.');
   }
   await tx.$executeRaw`UPDATE staff_kitchen_waste SET status=${input.decision},decision_note=${note},decided_by=${decidedBy},processed_at=now() WHERE processing_defect_id=${defect.id}::uuid`;
   await tx.$executeRaw`UPDATE staff_processing_defects SET status=${input.decision},decision_note=${note},decided_by=${decidedBy},processed_at=now() WHERE id=${defect.id}::uuid`;
   return {code:input.code,status:input.decision};
  },{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
 }
}

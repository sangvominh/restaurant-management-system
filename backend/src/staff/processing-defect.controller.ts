import { Public } from '../common/auth.decorators.js';
import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '../generated/prisma/client.js';
import { AuthGuard, Roles, type StaffRequest } from '../auth/staff-auth.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { object, text, uuid } from './input.js';

@Public()
@Controller('api/staff/processing-defects')
@UseGuards(AuthGuard)
@Roles('KITCHEN','BARISTA','SUPERVISOR')
export class ProcessingDefectController {
 constructor(private readonly db:PrismaService) {}
 @Get() async list(@Req() req:StaffRequest) {
  return this.db.$queryRaw`SELECT d.code,d.quantity::text,d.reason,d.status,d.decision_note AS "decisionNote",d.created_at AS "createdAt",d.order_line_id AS "orderLineId",d.retry_order_line_id AS "retryOrderLineId",p.code AS "productionCode", COALESCE(l.name,pr.name) AS name,COALESCE((SELECT jsonb_agg(jsonb_build_object('name',m.name,'lot',ml.lot_code,'unit',u.name,'quantity',w.quantity::text) ORDER BY m.name,ml.lot_code) FROM staff_kitchen_waste w JOIN material_lots ml ON ml.id=w.material_lot_id JOIN materials m ON m.id=ml.material_id JOIN units u ON u.id=m.unit_id WHERE w.processing_defect_id=d.id),'[]'::jsonb) AS materials FROM staff_processing_defects d LEFT JOIN order_lines l ON l.id=d.order_line_id LEFT JOIN production_orders p ON p.id=d.production_order_id LEFT JOIN boms b ON b.id=p.bom_id LEFT JOIN products pr ON pr.code=b.product_code WHERE d.actor_id=${req.staff.id}::uuid AND d.branch_id=${req.staff.branchId}::uuid ORDER BY d.created_at DESC LIMIT 100`;
 }
 @Post() async create(@Req() req:StaffRequest,@Body() body:unknown) {
  const input=object(body); const reason=text(input.reason,'Lý do',1000); const kind=input.kind;
  if (kind !== 'ORDER' && kind !== 'PRODUCTION') throw new BadRequestException('Loại chế biến không hợp lệ.');
  const orderLineId=kind === 'ORDER' ? uuid(input.orderLineId) : null;
  const productionCode=kind === 'PRODUCTION' ? text(input.productionCode,'Lệnh sản xuất',50) : null;
  if (typeof input.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(input.quantity)) throw new BadRequestException('Số lượng lỗi không hợp lệ.');
  const quantity=new Prisma.Decimal(input.quantity); if (quantity.lte(0)) throw new BadRequestException('Số lượng lỗi phải lớn hơn 0.');
  if (!Array.isArray(input.materials) || !input.materials.length || input.materials.length > 50) throw new BadRequestException('Chọn nguyên liệu thực tế đã dùng.');
  const materials=input.materials.map(value=>{ const row=object(value); const lotId=uuid(row.lotId); if(typeof row.quantity !== 'string' || !/^(?:0|[1-9]\d{0,8})(?:\.\d{1,3})?$/.test(row.quantity)) throw new BadRequestException('Số lượng nguyên liệu không hợp lệ.'); const amount=new Prisma.Decimal(row.quantity); if(amount.lte(0)) throw new BadRequestException('Số lượng nguyên liệu phải lớn hơn 0.'); return {lotId,amount}; }).sort((a,b)=>a.lotId.localeCompare(b.lotId));
  if (new Set(materials.map(x=>x.lotId)).size !== materials.length) throw new BadRequestException('Mỗi lô chỉ chọn một lần.');
  return this.db.$transaction(async tx=>{
   let productionOrderId:string|null=null;
   if (orderLineId) {
    const line=await tx.orderLine.findFirst({where:{id:orderLineId,status:'COOKING',order:{invoice:{branchId:req.staff.branchId}}}});
    if(!line || quantity.gt(line.quantity)) throw new BadRequestException('Món không đang chế biến hoặc số lượng lỗi vượt số lượng món.');
    if (!quantity.isInteger()) throw new BadRequestException('Số lượng món lỗi phải là số nguyên.');
    const pending=await tx.$queryRaw<{count:bigint}[]>`SELECT COUNT(*) AS count FROM staff_processing_defects WHERE order_line_id=${line.id}::uuid AND status='PENDING'`;
    if (pending[0].count > 0n) throw new BadRequestException('Món đang có phiếu sự cố chờ xử lý.');
   } else {
    const order=await tx.productionOrder.findFirst({where:{code:productionCode!,branchId:req.staff.branchId,assignedEmployeeCode:req.staff.code,status:'IN_PROGRESS'}});
    if(!order || quantity.gt(order.quantity)) throw new BadRequestException('Lệnh không đang sản xuất hoặc số lượng lỗi vượt kế hoạch.');
    const marker=await tx.$queryRaw<{production_order_id:string}[]>`SELECT production_order_id FROM staff_kitchen_production_starts WHERE production_order_id=${order.id}::uuid`;
    if(!marker.length) throw new BadRequestException('Lệnh cấp trực tiếp từ kho cần đối chiếu nguyên liệu trước khi báo lỗi.');
    productionOrderId=order.id;
   }
   const code=`LOI-${randomUUID().replaceAll('-','').slice(0,12).toUpperCase()}`;
   const rows=await tx.$queryRaw<{id:string}[]>`INSERT INTO staff_processing_defects(code,actor_id,branch_id,order_line_id,production_order_id,quantity,reason) VALUES (${code},${req.staff.id}::uuid,${req.staff.branchId}::uuid,${orderLineId}::uuid,${productionOrderId}::uuid,${quantity},${reason}) RETURNING id`;
   for(const row of materials) {
    const changed=await tx.$executeRaw`UPDATE staff_kitchen_balances SET reserved_waste=reserved_waste+${row.amount} WHERE branch_id=${req.staff.branchId}::uuid AND material_lot_id=${row.lotId}::uuid AND quantity-reserved_waste-reserved_return-COALESCE((SELECT SUM(r.quantity) FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id WHERE r.branch_id=${req.staff.branchId}::uuid AND d.material_lot_id=${row.lotId}::uuid AND r.status='PENDING' AND NOT r.stock_reserved),0)>=${row.amount}`;
    if(changed !== 1) throw new BadRequestException('Nguyên liệu đã dùng vượt tồn bếp khả dụng.');
    const wasteCode=`HH-${randomUUID().replaceAll('-','').slice(0,12).toUpperCase()}`;
    await tx.$executeRaw`INSERT INTO staff_kitchen_waste(code,actor_id,branch_id,material_lot_id,order_line_id,quantity,reason,status,processing_defect_id) VALUES (${wasteCode},${req.staff.id}::uuid,${req.staff.branchId}::uuid,${row.lotId}::uuid,${orderLineId}::uuid,${row.amount},${reason},'PENDING',${rows[0].id}::uuid)`;
   }
   return {code,status:'PENDING'};
  },{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
 }
}

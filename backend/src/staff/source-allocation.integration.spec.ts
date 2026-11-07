import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProcessingDefectController } from './processing-defect.controller.js';
import { ProcessingDefectDecisionService } from './processing-defect-decision.service.js';
import { StaffService } from './staff.service.js';
import { StaffMaterialWasteController } from './material-waste.controller.js';
import { KitchenWasteDecisionService } from './kitchen-waste-decision.service.js';
import { StaffMaterialReturnController } from './material-return.controller.js';
import { KitchenReturnDecisionService } from './kitchen-return-decision.service.js';
import type { StaffRequest } from '../auth/staff-auth.guard.js';

describe.skipIf(!process.env.TEST_KITCHEN_DATABASE)('FIFO source allocation (PostgreSQL)',()=>{
 let db:PrismaService; let req:StaffRequest; let first:string; let second:string; let lotId:string;
 beforeAll(async()=>{
  db=new PrismaService(); await db.$connect(); const branchId='10000000-0000-4000-8000-000000000001';
  req={staff:{id:'10000000-0000-4000-8000-000000000201',branchId,role:'KITCHEN',code:'DEMO-KITCHEN'}} as StaffRequest;
  const unit=await db.unit.create({data:{name:'source-test-kg'}}); const category=await db.category.create({data:{code:'DM-SOURCE-TEST',name:'source-test',categoryType:'MATERIAL'}});
  const material=await db.material.create({data:{code:'SOURCE-TEST',name:'Nguồn thử',unitId:unit.id,categoryId:category.id}});
  const lot=await db.materialLot.create({data:{materialId:material.id,lotCode:'SOURCE-LOT',expiryDate:new Date('2099-12-31T00:00:00Z')}});lotId=lot.id;
  const location=await db.warehouseLocation.create({data:{branchId,name:'Source test',locationType:'GENERAL'}});
  const issue=async(code:string)=>{const i=await db.materialIssue.create({data:{issueCode:code,branchId,details:{create:{materialId:material.id,materialLotId:lot.id,locationId:location.id,unitId:unit.id,quantity:'10'}}},include:{details:true}});await db.staffAudit.create({data:{actorId:req.staff.id,action:'MATERIAL_REQUEST',targetId:i.id,detail:code}});await db.materialIssue.update({where:{id:i.id},data:{status:'APPROVED'}});return i.details[0].id;};
  first=await issue('SOURCE-A');second=await issue('SOURCE-B');
  const menu=await db.menuItem.create({data:{branchId,name:'Source dish',category:'Test',price:1}});
  await db.$executeRaw`INSERT INTO staff_demo_order_recipes(menu_item_id,material_id,quantity) VALUES (${menu.id}::uuid,${material.id}::uuid,12)`;
  const invoice=await db.invoice.create({data:{branchId,tableId:'10000000-0000-4000-8000-000000000101',guestName:'Source test'}});
  const order=await db.staffOrder.create({data:{invoiceId:invoice.id,createdById:req.staff.id,requestKey:'40000000-0000-4000-8000-000000000078'}});
  const line=await db.orderLine.create({data:{orderId:order.id,menuItemId:menu.id,name:'Source dish',unitPrice:1,quantity:1}});
  const service=new StaffService(db);await service.updateLine(req.staff,line.id,{status:'COOKING'});await service.updateLine(req.staff,line.id,{status:'READY'});
 });
 afterAll(async()=>{await db?.$disconnect();});
 it('allocates use, pending waste and return to receipts without double counting',async()=>{
  const source=async(id:string)=>(await db.$queryRaw<{available:string}[]>`SELECT available::text FROM staff_kitchen_sources WHERE issue_detail_id=${id}::uuid`)[0].available;
  expect(await source(first)).toBe('0.000');expect(await source(second)).toBe('8.000');
  const waste=new StaffMaterialWasteController(db), wasteDecision=new KitchenWasteDecisionService(db);
  const w=await waste.createKitchen(req,{lotId,quantity:'3',reason:'Hỏng'});expect(await source(second)).toBe('5.000');
  await wasteDecision.decide({branchId:req.staff.branchId,code:w.code,decision:'REJECTED',decidedBy:'admin',reason:'Kiểm tra lại'});expect(await source(second)).toBe('8.000');
  const returns=new StaffMaterialReturnController(db), returnDecision=new KitchenReturnDecisionService(db);
  expect((await returns.eligible(req)).find(x=>x.id===second)?.remaining).toBe('8');
  const r=await returns.create(req,{issueDetailId:second,quantity:'2',condition:'SEALED',conditionConfirmed:true});expect(await source(second)).toBe('6.000');
  await returnDecision.decide({branchId:req.staff.branchId,code:r.code,decision:'APPROVED',decidedBy:'admin'});expect(await source(second)).toBe('6.000');
  expect((await returns.eligible(req)).find(x=>x.id===second)?.remaining).toBe('6');
 });
 it('does not reserve more than the source when requests race',async()=>{
  const returns=new StaffMaterialReturnController(db), decisions=new KitchenReturnDecisionService(db);
  const input={issueDetailId:second,quantity:'4',condition:'SEALED',conditionConfirmed:true};
  const results=await Promise.allSettled([returns.create(req,input),returns.create(req,input)]);
  const succeeded=results.filter((x):x is PromiseFulfilledResult<{code:string;status:string}>=>x.status==='fulfilled');
  expect(succeeded).toHaveLength(1);
  await decisions.decide({branchId:req.staff.branchId,code:succeeded[0].value.code,decision:'REJECTED',decidedBy:'admin',reason:'Thử'});
  expect((await returns.eligible(req)).find(x=>x.id===second)?.remaining).toBe('6');
 });
 it('allocates and restores the source for an in-progress defect',async()=>{
  const branchId=req.staff.branchId;
  const menu=await db.menuItem.create({data:{branchId,name:'Defect source',category:'Test',price:1}});
  const invoice=await db.invoice.create({data:{branchId,tableId:'10000000-0000-4000-8000-000000000101',guestName:'Defect source'}});
  const order=await db.staffOrder.create({data:{invoiceId:invoice.id,createdById:req.staff.id,requestKey:'40000000-0000-4000-8000-000000000080'}});
  const line=await db.orderLine.create({data:{orderId:order.id,menuItemId:menu.id,name:'Defect source',unitPrice:1,quantity:1,status:'COOKING'}});
  const api=new ProcessingDefectController(db),decisions=new ProcessingDefectDecisionService(db);
  const source=async()=>(await db.$queryRaw<{available:string}[]>`SELECT available::text FROM staff_kitchen_sources WHERE issue_detail_id=${second}::uuid`)[0].available;
  const r=await api.create(req,{kind:'ORDER',orderLineId:line.id,quantity:'1',reason:'Hỏng',materials:[{lotId,quantity:'1'}]});
  expect(await source()).toBe('5.000');
  await decisions.decide({branchId,code:r.code,decision:'REJECTED',decidedBy:'admin',reason:'Kiểm tra lại'});
  expect(await source()).toBe('6.000');
 });
 it('preserves receipt order when timestamps are identical',async()=>{
  const branchId=req.staff.branchId;
  const material=await db.material.findUniqueOrThrow({where:{code:'SOURCE-TEST'}});
  const lot=await db.materialLot.create({data:{materialId:material.id,lotCode:'SAME-TIME',expiryDate:new Date('2099-12-31T00:00:00Z')}});
  const location=await db.warehouseLocation.findFirstOrThrow({where:{branchId,name:'Source test'}});
  const ids=await db.$transaction(async tx=>{
   const result:string[]=[];
   for (const code of ['SAME-A','SAME-B']) {
    const issue=await tx.materialIssue.create({data:{issueCode:code,branchId,details:{create:{materialId:material.id,materialLotId:lot.id,locationId:location.id,unitId:material.unitId,quantity:'10'}}},include:{details:true}});
    await tx.staffAudit.create({data:{actorId:req.staff.id,action:'MATERIAL_REQUEST',targetId:issue.id,detail:code}});
    await tx.materialIssue.update({where:{id:issue.id},data:{status:'APPROVED'}});result.push(issue.details[0].id);
   }
   await tx.$executeRaw`UPDATE staff_kitchen_balances SET quantity=quantity-12 WHERE branch_id=${branchId}::uuid AND material_lot_id=${lot.id}::uuid`;
   await tx.$executeRaw`SELECT staff_allocate_kitchen_source(${branchId}::uuid,${lot.id}::uuid,12,'ORDER','same-time-test')`;
   return result;
  });
  const sources=await db.$queryRaw<{id:string;available:string}[]>`SELECT issue_detail_id::text AS id,available::text FROM staff_kitchen_sources WHERE issue_detail_id IN (${ids[0]}::uuid,${ids[1]}::uuid)`;
  expect(sources.find(s=>s.id===ids[0])?.available).toBe('0.000');expect(sources.find(s=>s.id===ids[1])?.available).toBe('8.000');
 });
 it('keeps legacy balance unassigned and consumes it before a new receipt',async()=>{
  const branchId=req.staff.branchId;
  const material=await db.material.findUniqueOrThrow({where:{code:'SOURCE-TEST'}});
  const lot=await db.materialLot.create({data:{materialId:material.id,lotCode:'LEGACY-LOT',expiryDate:new Date('2099-12-31T00:00:00Z')}});
  await db.$executeRaw`INSERT INTO staff_kitchen_balances(branch_id,material_lot_id,quantity) VALUES (${branchId}::uuid,${lot.id}::uuid,5)`;
  const location=await db.warehouseLocation.findFirstOrThrow({where:{branchId,name:'Source test'}});
  const issue=await db.materialIssue.create({data:{issueCode:'SOURCE-LEGACY',branchId,details:{create:{materialId:material.id,materialLotId:lot.id,locationId:location.id,unitId:material.unitId,quantity:'10'}}},include:{details:true}});
  await db.staffAudit.create({data:{actorId:req.staff.id,action:'MATERIAL_REQUEST',targetId:issue.id,detail:issue.issueCode}});
  await db.materialIssue.update({where:{id:issue.id},data:{status:'APPROVED'}});
  const menu=await db.menuItem.create({data:{branchId,name:'Legacy dish',category:'Test',price:1}});
  await db.$executeRaw`INSERT INTO staff_demo_order_recipes(menu_item_id,material_id,quantity) VALUES (${menu.id}::uuid,${material.id}::uuid,7)`;
  const invoice=await db.invoice.create({data:{branchId,tableId:'10000000-0000-4000-8000-000000000101',guestName:'Legacy'}});
  const order=await db.staffOrder.create({data:{invoiceId:invoice.id,createdById:req.staff.id,requestKey:'40000000-0000-4000-8000-000000000079'}});
  const line=await db.orderLine.create({data:{orderId:order.id,menuItemId:menu.id,name:'Legacy dish',unitPrice:1,quantity:1}});
  // Force this test to use the legacy lot, as the original source lot is no longer available.
  await db.materialLot.update({where:{id:lotId},data:{status:'INACTIVE'}});
  const service=new StaffService(db);await service.updateLine(req.staff,line.id,{status:'COOKING'});await service.updateLine(req.staff,line.id,{status:'READY'});
  const source=await db.$queryRaw<{available:string}[]>`SELECT available::text FROM staff_kitchen_sources WHERE issue_detail_id=${issue.details[0].id}::uuid`;
  expect(source[0].available).toBe('8.000');
 });

});

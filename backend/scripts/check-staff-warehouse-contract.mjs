import 'dotenv/config';
import 'reflect-metadata';
import assert from 'node:assert/strict';
import { randomBytes, randomUUID } from 'node:crypto';
import { NestFactory } from '@nestjs/core';
import request from 'supertest';

const url = new URL(process.env.DATABASE_URL);
if (!['localhost', '127.0.0.1'].includes(url.hostname) ||
    url.pathname !== '/restaurant_integration_test') {
  throw new Error('Only the dedicated local restaurant_integration_test is allowed');
}
process.env.NODE_ENV = 'test';
const { AppModule } = await import('../dist/app.module.js');
const { PrismaService } = await import('../dist/prisma/prisma.service.js');
const { configureApp } = await import('../dist/main.js');
const { hashPassword, tokenHash } = await import('../dist/auth/password.js');
const app = await NestFactory.create(AppModule, { logger: false });
await configureApp(app);
await app.init();
const db = app.get(PrismaService);
assert.equal((await db.$queryRaw`SELECT current_database() AS name`)[0].name,
  'restaurant_integration_test');
const server = app.getHttpServer();
const ids = Object.fromEntries(['branch','unit','category','staff','material','lot',
  'location','balance','issue','detail','issueUnit'].map(name => [name, randomUUID()]));
const suffix = ids.branch.slice(0,8);
const results = { database: 'restaurant_integration_test', schemaReads: [],
  stockWaste: null, issuedReturn: null };
try {
  for (const path of ['/warehouse/inventory', '/warehouse/boms']) {
    const response = await request(server).get(path);
    assert.equal(response.status, 200, JSON.stringify(response.body));
    results.schemaReads.push({ path, status: response.status });
  }
  await db.branch.create({ data: { id:ids.branch, code:'IT-'+suffix, name:'Integration fixture' } });
  await db.unit.create({ data: { id:ids.unit, name:'kg' } });
  await db.unit.create({data:{id:ids.issueUnit,name:'g',baseUnitId:ids.unit,conversionFactor:'0.001'}});
  await db.category.create({ data: { id:ids.category, code:'DM-'+suffix,
    name:'Integration fixture', categoryType:'MATERIAL' } });
  await db.warehouseLocation.create({ data: { id:ids.location, branchId:ids.branch,
    name:'Integration fixture', locationType:'RAW_MATERIAL' } });
  await db.material.create({ data: { id:ids.material, code:'NVL-'+suffix,
    name:'Integration fixture', unitId:ids.unit, categoryId:ids.category } });
  await db.materialLot.create({ data: { id:ids.lot, materialId:ids.material,
    lotCode:'LOT-'+suffix, expiryDate:new Date('2099-12-31T00:00:00Z') } });
  await db.materialBalance.create({ data: { id:ids.balance,
    materialLotId:ids.lot, locationId:ids.location, quantity:'10' } });
  await db.staffUser.create({ data: { id:ids.staff, code:'IT-'+suffix,
    name:'Integration fixture', role:'KITCHEN', branchId:ids.branch,
    passwordHash:hashPassword(randomBytes(24).toString('hex')) } });
  const token = randomBytes(32).toString('hex');
  await db.staffSession.create({ data: { tokenHash:tokenHash(token),
    userId:ids.staff, expiresAt:new Date(Date.now()+60000) } });
  const cookie = 'staff_session='+token;

  // Batch 1: Staff submits stock waste; Admin only reads its pending list.
  const waste = await request(server).post('/api/staff/material-waste')
    .set('X-Staff-Request','1').set('Cookie',cookie)
    .send({ balanceId:ids.balance, quantity:'2', unit:'kg', reason:'Integration fixture' });
  assert.equal(waste.status, 201, JSON.stringify(waste.body));
  assert.equal(waste.body.status, 'PENDING');
  const stockAfterWaste = await db.materialBalance.findUniqueOrThrow({ where:{id:ids.balance} });
  assert.equal(stockAfterWaste.quantity.toString(), '10');
  const wasteList = await request(server).get('/warehouse/material-adjustments?type=WASTE&status=PENDING');
  assert.equal(wasteList.status, 200, JSON.stringify(wasteList.body));
  const wasteRow=await db.staffMaterialWaste.findUniqueOrThrow({where:{code:waste.body.code}});
  const wasteDetail=await request(server).get('/warehouse/material-adjustments/'+waste.body.code);
  assert.equal(wasteDetail.status,200);assert.equal(wasteDetail.body.data.recordId,wasteRow.id);
  assert.equal(await db.materialAdjustment.count({where:{code:waste.body.code}}),0);
  results.stockWaste = { sameRecord:true, sent:true, status:waste.body.status, stockUnchanged:true,
    adminReceived:wasteList.body.data.some(row => row.code===waste.body.code),
    staffStore:'StaffMaterialWaste', adminStore:'same StaffMaterialWaste record' };

  // A pre-approved issue and exact kitchen source are fixtures, not Admin approval calls.
  await db.materialIssue.create({ data:{id:ids.issue,issueCode:'IT-PX-'+suffix,
    branchId:ids.branch,status:'APPROVED',details:{create:{id:ids.detail,
      materialId:ids.material,materialLotId:ids.lot,locationId:ids.location,
      unitId:ids.issueUnit,quantity:'5000'}}} });
  await db.staffAudit.create({ data:{actorId:ids.staff,action:'MATERIAL_REQUEST',
    targetId:ids.issue,detail:'Integration fixture'} });
  await db.$executeRaw`INSERT INTO staff_kitchen_balances(branch_id,material_lot_id,quantity)
    VALUES (${ids.branch}::uuid,${ids.lot}::uuid,5)`;
  await db.$executeRaw`INSERT INTO staff_kitchen_receipts(issue_detail_id,branch_id,material_lot_id,quantity)
    VALUES (${ids.detail}::uuid,${ids.branch}::uuid,${ids.lot}::uuid,5)`;

  // Batch 2: Staff submits a return; Admin only reads its pending list.
  const returned = await request(server).post('/api/staff/material-returns')
    .set('X-Staff-Request','1').set('Cookie',cookie)
    .send({issueDetailId:ids.detail,quantity:'2',condition:'SEALED',
      conditionConfirmed:true,note:'Integration fixture'});
  assert.equal(returned.status, 201, JSON.stringify(returned.body));
  assert.equal(returned.body.status, 'PENDING');
  const stockAfterReturn = await db.materialBalance.findUniqueOrThrow({where:{id:ids.balance}});
  const kitchen = (await db.$queryRaw`SELECT quantity::text,reserved_return::text
    FROM staff_kitchen_balances WHERE branch_id=${ids.branch}::uuid
    AND material_lot_id=${ids.lot}::uuid`)[0];
  assert.equal(stockAfterReturn.quantity.toString(), '10');
  assert.equal(Number(kitchen.quantity), 5);
  assert.equal(Number(kitchen.reserved_return), 2);
  const returnList = await request(server).get('/warehouse/material-adjustments?type=RETURN&status=PENDING');
  assert.equal(returnList.status, 200, JSON.stringify(returnList.body));
  const returnRow=await db.staffMaterialReturn.findUniqueOrThrow({where:{code:returned.body.code}});
  const returnDetail=await request(server).get('/warehouse/material-adjustments/'+returned.body.code);
  assert.equal(returnDetail.status,200);assert.equal(returnDetail.body.data.recordId,returnRow.id);
  assert.equal(returnDetail.body.data.condition,'SEALED');
  assert.equal(await db.materialAdjustment.count({where:{code:returned.body.code}}),0);
  results.issuedReturn = {sameRecord:true,sent:true,status:returned.body.status,stockUnchanged:true,
    kitchenPhysicalQuantityUnchanged:true,reservedReturn:'2',
    adminReceived:returnList.body.data.some(row => row.code===returned.body.code),
    staffStore:'StaffMaterialReturn',adminStore:'same StaffMaterialReturn record'};
  assert.equal(await db.inventoryMovement.count({where:{materialLotId:ids.lot}}),0);

  // Batch 2: process the same stored document and verify both sides see its state.
  const checks = [];
  const process = (code,action,body) => request(server)
    .post('/warehouse/material-adjustments/'+code+'/'+action).send(body);
  const stock = async () => (await db.materialBalance.findUniqueOrThrow({where:{id:ids.balance}})).quantity.toString();
  const kitchenBalance = async () => (await db.$queryRaw`SELECT quantity::text,reserved_return::text,reserved_waste::text
    FROM staff_kitchen_balances WHERE branch_id=${ids.branch}::uuid AND material_lot_id=${ids.lot}::uuid`)[0];
  const staffPost = (path,body) => request(server).post('/api/staff/'+path)
    .set('X-Staff-Request','1').set('Cookie',cookie).send(body);
  async function createWaste(quantity) {
    const response=await staffPost('material-waste',{balanceId:ids.balance,quantity,unit:'kg',reason:'Integration fixture'});
    assert.equal(response.status,201,JSON.stringify(response.body));return response.body.code;
  }
  async function createReturn(quantity) {
    const response=await staffPost('material-returns',{issueDetailId:ids.detail,quantity,
      condition:'SEALED',conditionConfirmed:true,note:'Integration fixture'});
    assert.equal(response.status,201,JSON.stringify(response.body));return response.body.code;
  }
  async function createKitchenWaste() {
    const response=await staffPost('material-waste/kitchen',{lotId:ids.lot,quantity:'1',reason:'Integration fixture'});
    assert.equal(response.status,201,JSON.stringify(response.body));return response.body.code;
  }
  let response=await process(waste.body.code,'approve',{acceptedQuantity:'2'});
  assert.equal(response.status,200,JSON.stringify(response.body));
  assert.equal(await stock(),'8');
  const approvedWaste=await db.staffMaterialWaste.findUniqueOrThrow({where:{code:waste.body.code},include:{movement:true}});
  assert.equal(approvedWaste.id,wasteRow.id);assert.equal(approvedWaste.status,'APPROVED');
  assert.equal(approvedWaste.movement.quantityChange.toString(),'-2');
  assert.equal(approvedWaste.movementId,approvedWaste.movement.id);
  response=await request(server).get('/api/staff/material-waste').set('Cookie',cookie);
  assert.equal(response.body.find(row=>row.code===waste.body.code).status,'APPROVED');
  assert.equal((await process(waste.body.code,'approve',{acceptedQuantity:'2'})).status,409);
  assert.equal(await stock(),'8');
  checks.push('Stock waste: same record, Staff sees APPROVED, one decrement and linked movement, duplicate blocked');

  const rejectedKitchen=await createKitchenWaste();
  response=await request(server).get('/warehouse/material-adjustments/'+rejectedKitchen);
  assert.equal(response.status,200);assert.equal(response.body.data.sourceDetails[0].issueDetailId,ids.detail);
  assert.equal(response.body.data.approvalBlockedReason,null);
  response=await process(rejectedKitchen,'reject',{reason:'Integration rejection'});
  assert.equal(response.status,200,JSON.stringify(response.body));
  assert.equal(Number((await kitchenBalance()).quantity),5);
  assert.equal(Number((await kitchenBalance()).reserved_waste),0);
  checks.push('Kitchen waste rejection: reservation released, physical stock unchanged');

  response=await process(returned.body.code,'reject',{reason:'Integration rejection'});
  assert.equal(response.status,200,JSON.stringify(response.body));
  assert.equal(await stock(),'8');assert.equal(Number((await kitchenBalance()).quantity),5);
  assert.equal(Number((await kitchenBalance()).reserved_return),0);
  assert.equal((await process(returned.body.code,'reject',{reason:'Again'})).status,409);
  response=await request(server).get('/api/staff/material-returns').set('Cookie',cookie);
  assert.equal(response.body.find(row=>row.code===returned.body.code).status,'REJECTED');
  checks.push('Return rejection: same record/status on Staff, reservation/source released, no stock change');

  const acceptedReturn=await createReturn('2');
  assert.equal((await process(acceptedReturn,'approve',{acceptedQuantity:'2',qualityStatus:'UNACCEPTABLE'})).status,400);
  assert.equal((await process(acceptedReturn,'approve',{acceptedQuantity:'1',qualityStatus:'ACCEPTABLE'})).status,400);
  assert.equal(await stock(),'8');assert.equal(Number((await kitchenBalance()).quantity),5);
  response=await process(acceptedReturn,'approve',{acceptedQuantity:'2',qualityStatus:'ACCEPTABLE'});
  assert.equal(response.status,200,JSON.stringify(response.body));
  assert.equal(await stock(),'10');assert.equal(Number((await kitchenBalance()).quantity),3);
  assert.equal(Number((await kitchenBalance()).reserved_return),0);
  const accepted=await db.staffMaterialReturn.findUniqueOrThrow({where:{code:acceptedReturn},include:{movement:true}});
  assert.equal(accepted.status,'APPROVED');assert.equal(accepted.movement.quantityChange.toString(),'2');
  assert.equal((await process(acceptedReturn,'approve',{acceptedQuantity:'2',qualityStatus:'ACCEPTABLE'})).status,409);
  response=await staffPost('material-returns',{issueDetailId:ids.detail,quantity:'4',condition:'SEALED',conditionConfirmed:true});
  assert.equal(response.status,400);
  checks.push('Return approval: validated quality/full quantity, kitchen -2/warehouse +2 once, movement linked, excess return blocked');

  const acceptedKitchen=await createKitchenWaste();
  response=await process(acceptedKitchen,'approve',{acceptedQuantity:'1'});
  assert.equal(response.status,200,JSON.stringify(response.body));
  assert.equal(Number((await kitchenBalance()).quantity),2);
  assert.equal(Number((await kitchenBalance()).reserved_waste),0);
  assert.equal(await stock(),'10');
  assert.equal(await db.inventoryMovement.count({where:{materialLotId:ids.lot}}),2);
  checks.push('Issued waste approval: kitchen decreases once, warehouse not decremented again, no duplicate warehouse movement');

  const [first,second]=await Promise.all([createWaste('6'),createWaste('6')]);
  const approvals=await Promise.all([process(first,'approve',{acceptedQuantity:'6'}),process(second,'approve',{acceptedQuantity:'6'})]);
  assert.equal(approvals.filter(result=>result.status===200).length,1,JSON.stringify(approvals.map(r=>r.body)));
  assert.ok(approvals.every(result=>[200,400,409].includes(result.status)));
  assert.equal(await stock(),'4');
  const loser=approvals[0].status===200?second:first;
  response=await process(loser,'approve',{acceptedQuantity:'6'});
  assert.equal(response.status,400);
  const unchanged=await db.staffMaterialWaste.findUniqueOrThrow({where:{code:loser}});
  assert.equal(unchanged.status,'PENDING');assert.equal(unchanged.movementId,null);
  assert.equal((await process(loser,'reject',{reason:'Integration cleanup decision'})).status,200);
  checks.push('Concurrent approvals: one succeeds, no negative stock/500; insufficient-stock transaction rolls back status and movement');

  const rejectedStock=await createWaste('1');
  assert.equal((await process(rejectedStock,'approve',{acceptedQuantity:'0.5'})).status,400);
  assert.equal((await process(rejectedStock,'reject',{})).status,400);
  assert.equal((await process(rejectedStock,'reject',{reason:'Integration rejection'})).status,200);
  const rejected=await db.staffMaterialWaste.findUniqueOrThrow({where:{code:rejectedStock}});
  assert.equal(rejected.status,'REJECTED');assert.equal(rejected.decisionNote,'Integration rejection');
  assert.equal(await stock(),'4');
  checks.push('Rejection requires reason; original stock-waste document keeps rejection note; partial approval safely blocked');

  const collision=await db.materialAdjustment.create({data:{code:acceptedKitchen,type:'WASTE',source:'STOCK',
    materialLotId:ids.lot,locationId:ids.location,quantity:'1',reason:'Collision fixture'}});
  assert.equal((await request(server).get('/warehouse/material-adjustments/'+acceptedKitchen)).status,409);
  assert.equal((await process(acceptedKitchen,'reject',{reason:'Collision'})).status,409);
  await db.materialAdjustment.delete({where:{id:collision.id}});
  checks.push('Duplicate code across stores: explicit conflict, no wrong document processed');

  const untraced=await createKitchenWaste();
  const untracedRow=(await db.$queryRaw`SELECT id FROM staff_kitchen_waste WHERE code=${untraced}`)[0];
  await db.$executeRaw`DELETE FROM staff_kitchen_source_allocations WHERE event_key=${untracedRow.id}::text AND event_type='WASTE'`;
  response=await request(server).get('/warehouse/material-adjustments/'+untraced);
  assert.ok(response.body.data.approvalBlockedReason);
  assert.equal((await process(untraced,'approve',{acceptedQuantity:'1'})).status,409);
  assert.equal(await stock(),'4');assert.equal(Number((await kitchenBalance()).quantity),2);
  checks.push('Missing issued-source proof: BLOCKED, no invented settlement or stock mutation');

  response=await request(server).get('/warehouse/material-adjustments?type=RETURN&status=APPROVED');
  assert.equal(response.status,200);
  assert.ok(response.body.data.every(row=>row.type==='RETURN'&&row.status==='APPROVED'));
  assert.ok(response.body.data.some(row=>row.code===acceptedReturn));
  checks.push('Shared list type/status filter remains correct');

  // Both views must label source quantities in the base stock unit.
  response=await request(server).get('/api/staff/material-returns/eligible').set('Cookie',cookie);
  assert.equal(response.status,200);
  const eligible=response.body.find(row=>row.id===ids.detail);
  assert.equal(eligible.unit,'kg');assert.equal(eligible.issued,'5');
  response=await request(server).get('/api/staff/material-returns').set('Cookie',cookie);
  assert.ok(response.body.every(row=>row.unit==='kg'));
  checks.push('Issued 5000 g is displayed as 5 kg; return quantities/units agree between Staff and Admin');


  const expiredReturn=await createReturn('1');
  await db.materialLot.update({where:{id:ids.lot},data:{expiryDate:new Date('2000-01-01T00:00:00Z')}});
  assert.equal((await process(expiredReturn,'approve',{acceptedQuantity:'1',qualityStatus:'ACCEPTABLE'})).status,400);
  assert.equal(await stock(),'4');assert.equal(Number((await kitchenBalance()).quantity),2);
  assert.equal((await process(expiredReturn,'reject',{reason:'Expired fixture'})).status,200);
  await db.materialLot.update({where:{id:ids.lot},data:{expiryDate:new Date('2099-12-31T00:00:00Z')}});
  checks.push('Expired return cannot be approved; rejection releases only its hold');
  const original=await db.materialAdjustment.create({data:{code:'DC-'+suffix,type:'WASTE',source:'STOCK',
    materialLotId:ids.lot,locationId:ids.location,quantity:'1',reason:'Existing Warehouse API fixture'}});
  response=await request(server).get('/warehouse/material-adjustments/'+original.code);
  assert.equal(response.status,200);assert.equal(response.body.data.storage,undefined);
  response=await process(original.code,'approve',{acceptedQuantity:'1'});
  assert.equal(response.status,200,JSON.stringify(response.body));assert.equal(await stock(),'3');
  assert.equal((await db.materialAdjustment.findUniqueOrThrow({where:{id:original.id}})).status,'APPROVED');
  checks.push('Original MaterialAdjustment Warehouse documents still read and approve through unchanged business logic');


  const inactiveBranchWaste=await createKitchenWaste();
  await db.branch.update({where:{id:ids.branch},data:{isActive:false}});
  assert.equal((await process(inactiveBranchWaste,'approve',{acceptedQuantity:'1'})).status,400);
  assert.equal(await stock(),'3');assert.equal(Number((await kitchenBalance()).quantity),2);
  await db.branch.update({where:{id:ids.branch},data:{isActive:true}});
  checks.push('Inactive branch cannot process an issued waste; balances remain unchanged');
  results.processingChecks=checks;

  console.log(JSON.stringify(results,null,2));
} finally {
  try {
    // Delete only this run's UUID fixtures in the dedicated test database.
    await db.$transaction(async tx => {
      await tx.materialAdjustmentMovement.deleteMany({where:{adjustment:{materialLotId:ids.lot}}});
      await tx.materialAdjustment.deleteMany({where:{materialLotId:ids.lot}});
      await tx.staffMaterialReturn.deleteMany({where:{actorId:ids.staff}});
      await tx.staffMaterialWaste.deleteMany({where:{actorId:ids.staff}});
      await tx.$executeRaw`DELETE FROM staff_kitchen_source_allocations WHERE issue_detail_id=${ids.detail}::uuid`;
      await tx.$executeRaw`DELETE FROM staff_kitchen_waste WHERE branch_id=${ids.branch}::uuid AND material_lot_id=${ids.lot}::uuid`;
      await tx.$executeRaw`DELETE FROM staff_kitchen_sources WHERE issue_detail_id=${ids.detail}::uuid`;
      await tx.$executeRaw`DELETE FROM staff_kitchen_receipts WHERE issue_detail_id=${ids.detail}::uuid`;
      await tx.$executeRaw`DELETE FROM staff_kitchen_balances WHERE branch_id=${ids.branch}::uuid AND material_lot_id=${ids.lot}::uuid`;
      await tx.staffAudit.deleteMany({where:{actorId:ids.staff}});
      await tx.materialIssueDetail.deleteMany({where:{issueId:ids.issue}});
      await tx.materialIssue.deleteMany({where:{id:ids.issue}});
      await tx.staffSession.deleteMany({where:{userId:ids.staff}});
      await tx.staffUser.deleteMany({where:{id:ids.staff}});
      await tx.inventoryMovement.deleteMany({where:{materialLotId:ids.lot}});
      await tx.materialBalance.deleteMany({where:{id:ids.balance}});
      await tx.materialLot.deleteMany({where:{id:ids.lot}});
      await tx.material.deleteMany({where:{id:ids.material}});
      await tx.category.deleteMany({where:{id:ids.category}});
      await tx.unit.deleteMany({where:{id:ids.issueUnit}});
      await tx.unit.deleteMany({where:{id:ids.unit}});
      await tx.warehouseLocation.deleteMany({where:{id:ids.location}});
      await tx.branch.deleteMany({where:{id:ids.branch}});
    });
  } finally { await app.close(); }
}
if (!results.stockWaste?.adminReceived || !results.issuedReturn?.adminReceived) {
  console.error('CONTRACT GAP: Staff submitted PENDING documents, but the Admin request store does not contain them.');
  process.exitCode=2;
}

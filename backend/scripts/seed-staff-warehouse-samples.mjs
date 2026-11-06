import 'reflect-metadata';
import dotenv from 'dotenv';
import assert from 'node:assert/strict';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomBytes} from 'node:crypto';
import {NestFactory} from '@nestjs/core';
import request from 'supertest';

dotenv.config({path:resolve(dirname(fileURLToPath(import.meta.url)),'../.env'),quiet:true});
const url=new URL(process.env.DATABASE_URL);
assert.ok(['localhost','127.0.0.1'].includes(url.hostname),'Only local PostgreSQL is allowed');
url.pathname='/restaurant_integration_test';
process.env.DATABASE_URL=url.toString();
process.env.NODE_ENV='test';
const {AppModule}=await import('../dist/app.module.js');
const {PrismaService}=await import('../dist/prisma/prisma.service.js');
const {configureApp}=await import('../dist/main.js');
const {tokenHash}=await import('../dist/auth/password.js');
const app=await NestFactory.create(AppModule,{logger:false});
await configureApp(app);await app.init();
const db=app.get(PrismaService),server=app.getHttpServer();
const token=randomBytes(32).toString('hex'),sessionHash=tokenHash(token);
const prefix='DEMO10',created={suppliers:0,categories:0,materials:0,receipts:0,issues:0,waste:0,returns:0};
const items=[
 ['Thịt bò tươi','Thịt đỏ','kg',120,10,180000,90],
 ['Ức gà','Gia cầm','kg',90,15,85000,60],
 ['Tôm sú','Hải sản','kg',100,10,160000,45],
 ['Rau cải','Rau xanh','kg',80,10,18000,30],
 ['Cà rốt','Củ quả','kg',60,8,22000,75],
 ['Gạo thơm','Ngũ cốc','kg',50,8,24000,120],
 ['Nước mắm','Gia vị và nước chấm','lít',40,5,45000,180],
 ['Sữa tươi','Sữa và chế phẩm','lít',30,5,32000,60],
 ['Trứng gà','Trứng','quả',20,25,3500,14],
 ['Cam tươi','Nguyên liệu pha chế','kg',15,20,38000,7],
];
const code=(kind,index)=>kind+'-'+prefix+'-'+String(index+1).padStart(3,'0');
async function post(path,body,staff=false){
 let r=request(server).post(path);
 if(staff)r=r.set('X-Staff-Request','1').set('Cookie','staff_session='+token);
 const response=await r.send(body);
 if(![200,201].includes(response.status))throw Error(path+': '+response.status+' '+JSON.stringify(response.body));
 return response.body;
}
async function decide(code,type,status,quantity){
 if(status==='PENDING')return;
 await post('/warehouse/material-adjustments/'+code+'/'+(status==='APPROVED'?'approve':'reject'),
  status==='APPROVED'?{acceptedQuantity:quantity,...(type==='RETURN'?{qualityStatus:'ACCEPTABLE'}:{}),note:'Mẫu DEMO10: đã kiểm tra đủ số lượng và điều kiện'}:
  {reason:'Mẫu DEMO10: cần bổ sung thông tin xác minh trước khi xử lý'});
}
try{
 assert.equal((await db.$queryRaw`SELECT current_database() AS name`)[0].name,'restaurant_integration_test');
 const staff=await db.staffUser.findUniqueOrThrow({where:{code:'DEMO-KHO-STAFF'},include:{branch:true}});
 assert.equal(staff.branch.code,'DEMO-KHO');
 assert.ok(staff.isActive&&staff.branch.isActive);
 const oldBalances=await db.materialBalance.findMany({where:{materialLot:{material:{code:'NVL-DEMO-KHO'}}},orderBy:{id:'asc'}});
 const originalBalances=oldBalances.map(b=>[b.id,b.quantity.toString()]);
 const restaurantBefore=await db.product.count({where:{code:{startsWith:'DEMO-MON-'}}});
 await db.staffSession.create({data:{tokenHash:sessionHash,userId:staff.id,expiresAt:new Date(Date.now()+600000)}});
 const location=await db.warehouseLocation.findFirstOrThrow({where:{branchId:staff.branchId,name:'Kho nguyên liệu demo'}});
 const materialRows=[],balanceRows=[];
 for(let i=0;i<items.length;i++){
  const [name,group,unitName,opening,minStock,unitPrice,days]=items[i];
  const supplierCode=code('NCC',i),categoryCode=code('DM',i),materialCode=code('NVL',i),receiptCode=code('PN',i),lotCode=code('LO',i);
  if(!await db.supplier.findUnique({where:{code:supplierCode}})){
   await db.supplier.create({data:{code:supplierCode,name:'NCC mẫu '+String(i+1).padStart(2,'0')+' - '+group,phone:'00000000'+String(i+1).padStart(2,'0'),email:'ncc'+(i+1)+'@example.test',address:'Địa chỉ mô phỏng DEMO10'}});
   created.suppliers++;
  }
  const category=await db.category.findUnique({where:{code:categoryCode}});
  if(!category){await db.category.create({data:{code:categoryCode,name:group+' - DEMO10',categoryType:'MATERIAL'}});created.categories++;}
  const unit=await db.unit.upsert({where:{name:unitName},update:{},create:{name:unitName}});
  let material=await db.material.findUnique({where:{code:materialCode}});
  if(!material){
   const groupRow=await db.category.findUniqueOrThrow({where:{code:categoryCode}});
   material=await db.material.create({data:{code:materialCode,name:name+' - DEMO10',categoryId:groupRow.id,unitId:unit.id,minStock:String(minStock)}});
   created.materials++;
  }
  materialRows.push(material);
  if(!await db.goodsReceipt.findUnique({where:{receiptCode}})){
   const expiry=new Date(Date.now()+days*86400000).toISOString().slice(0,10);
   await post('/warehouse/receipts',{receiptCode,supplierCode,branchCode:staff.branch.code,note:'Phiếu nhập mẫu DEMO10 - '+name,details:[{materialCode,lotCode,expiryDate:expiry,locationId:location.id,locationName:location.name,unitName,quantity:String(opening),unitPrice:String(unitPrice)}]});
   created.receipts++;
  }
  const lot=await db.materialLot.findUniqueOrThrow({where:{materialId_lotCode:{materialId:material.id,lotCode}}});
  const balance=await db.materialBalance.findUniqueOrThrow({where:{locationId_materialLotId:{locationId:location.id,materialLotId:lot.id}}});
  balanceRows.push({...balance,lot,unitName});
 }
 const issueRows=[];
 const issueStatuses=['APPROVED','APPROVED','APPROVED','APPROVED','PENDING','PENDING','PENDING','REJECTED','REJECTED','REJECTED'];
 for(let i=0;i<10;i++){
  const stableCode=code('PX',i);
  let issue=await db.materialIssue.findUnique({where:{issueCode:stableCode},include:{details:true}});
  if(!issue){
   const result=await post('/api/staff/production-orders/material-requests',{items:[{balanceId:balanceRows[i].id,quantity:'10'}]},true);
   issue=await db.materialIssue.update({where:{issueCode:result.code},data:{issueCode:stableCode},include:{details:true}});
   await db.staffAudit.updateMany({where:{actorId:staff.id,action:'MATERIAL_REQUEST',targetId:issue.id},data:{detail:stableCode}});
   if(issueStatuses[i]==='APPROVED')await post('/warehouse/material-issues/'+stableCode+'/approve',{});
   else if(issueStatuses[i]==='REJECTED')await post('/warehouse/material-issues/'+stableCode+'/reject',{reason:'Mẫu DEMO10: số lượng chưa phù hợp nhu cầu, vui lòng điều chỉnh'});
   issue=await db.materialIssue.findUniqueOrThrow({where:{issueCode:stableCode},include:{details:true}});
   created.issues++;
  }
  issueRows.push(issue);
 }
 const sources=issueRows.filter(i=>i.status==='APPROVED').flatMap(i=>i.details.map(d=>({issue:i,detail:d})));
 assert.ok(sources.length>=4,'Need four approved source documents; existing statuses were preserved');
 const wasteStatuses=['PENDING','PENDING','APPROVED','REJECTED','PENDING','APPROVED','REJECTED','PENDING','APPROVED','REJECTED'];
 for(let i=0;i<10;i++){
  const stableCode=code('HH',i);
  const existing=i<5?await db.staffMaterialWaste.findUnique({where:{code:stableCode}}):
   (await db.$queryRaw`SELECT id FROM staff_kitchen_waste WHERE code=${stableCode}`)[0];
  if(existing)continue;
  const quantity=i<5&&i%2?'2':'1';
  let result;
  if(i<5){
   result=await post('/api/staff/material-waste',{balanceId:balanceRows[i].id,quantity,unit:balanceRows[i].unitName,reason:'Mẫu DEMO10: NVL hỏng trong kho, cần kiểm tra bao bì và chất lượng'},true);
   await db.staffMaterialWaste.update({where:{code:result.code},data:{code:stableCode}});
  }else{
   const source=sources[(i-5)%sources.length];
   result=await post('/api/staff/material-waste/kitchen',{lotId:source.detail.materialLotId,quantity,reason:'Mẫu DEMO10: NVL đã lĩnh bị đổ hoặc hỏng tại bếp'},true);
   await db.$executeRaw`UPDATE staff_kitchen_waste SET code=${stableCode} WHERE code=${result.code} AND actor_id=${staff.id}::uuid AND branch_id=${staff.branchId}::uuid`;
  }
  await decide(stableCode,'WASTE',wasteStatuses[i],quantity);created.waste++;
 }
 const returnStatuses=['PENDING','PENDING','PENDING','PENDING','APPROVED','APPROVED','APPROVED','REJECTED','REJECTED','REJECTED'];
 for(let i=0;i<10;i++){
  const stableCode=code('HT',i);
  if(await db.staffMaterialReturn.findUnique({where:{code:stableCode}}))continue;
  const source=sources[i%sources.length];
  const result=await post('/api/staff/material-returns',{issueDetailId:source.detail.id,quantity:'1',condition:i%3===0?'SEALED':i%3===1?'OPENED':'OTHER',conditionConfirmed:true,note:'Mẫu DEMO10: nguyên liệu dư còn đủ điều kiện hoàn trả, nguồn '+source.issue.issueCode},true);
  await db.staffMaterialReturn.update({where:{code:result.code},data:{code:stableCode}});
  await decide(stableCode,'RETURN',returnStatuses[i],'1');created.returns++;
 }
 const mismatch=await db.$queryRaw`SELECT b.id FROM material_balances b JOIN material_lots l ON l.id=b.material_lot_id JOIN materials m ON m.id=l.material_id LEFT JOIN (SELECT material_lot_id,location_id,SUM(quantity_change) AS quantity FROM inventory_movements GROUP BY material_lot_id,location_id) v ON v.material_lot_id=b.material_lot_id AND v.location_id=b.location_id WHERE m.code LIKE 'NVL-DEMO10-%' AND b.quantity<>COALESCE(v.quantity,0)`;
 assert.equal(mismatch.length,0,'Each demo balance must match its movements');
 const preserved=await db.materialBalance.findMany({where:{id:{in:oldBalances.map(b=>b.id)}},orderBy:{id:'asc'}});
 assert.deepEqual(preserved.map(b=>[b.id,b.quantity.toString()]),originalBalances);
 assert.equal(await db.product.count({where:{code:{startsWith:'DEMO-MON-'}}}),restaurantBefore);
 const stats={
  suppliers:await db.supplier.count({where:{code:{startsWith:'NCC-DEMO10-'}}}),
  categories:await db.category.count({where:{code:{startsWith:'DM-DEMO10-'}}}),
  materials:await db.material.count({where:{code:{startsWith:'NVL-DEMO10-'}}}),
  receipts:await db.goodsReceipt.count({where:{receiptCode:{startsWith:'PN-DEMO10-'}}}),
  issues:await db.materialIssue.groupBy({by:['status'],where:{issueCode:{startsWith:'PX-DEMO10-'}},_count:true}),
  waste:await db.$queryRaw`SELECT status,count(*)::int AS count FROM (SELECT status FROM staff_material_waste WHERE code LIKE 'HH-DEMO10-%' UNION ALL SELECT status FROM staff_kitchen_waste WHERE code LIKE 'HH-DEMO10-%') w GROUP BY status ORDER BY status`,
  returns:await db.staffMaterialReturn.groupBy({by:['status'],where:{code:{startsWith:'HT-DEMO10-'}},_count:true})
 };
 console.log(JSON.stringify({database:'restaurant_integration_test',branch:'DEMO-KHO',created,stats,balanceMismatches:mismatch.length,preservedExistingDemo:true},null,2));
}finally{
 try{await db.staffSession.deleteMany({where:{tokenHash:sessionHash}});}finally{await app.close();}
}

import 'dotenv/config';
import assert from 'node:assert/strict';
process.env.NODE_ENV='test';
const url=new URL(process.env.DATABASE_URL);
assert.ok(['localhost','127.0.0.1'].includes(url.hostname)&&url.pathname==='/restaurant_integration_test','Only local restaurant_integration_test is allowed');
const {PrismaService}=await import('../dist/prisma/prisma.service.js');
const {hashPassword}=await import('../dist/auth/password.js');
const db=new PrismaService();
try{
 await db.$connect();
 assert.equal((await db.$queryRaw`SELECT current_database() AS name`)[0].name,'restaurant_integration_test');
 const staff=await db.$transaction(async tx=>{
  const branch=await tx.branch.upsert({where:{code:'DEMO-KHO'},update:{},create:{code:'DEMO-KHO',name:'Chi nhánh demo Staff - Kho'}});
  const unit=await tx.unit.upsert({where:{name:'kg'},update:{},create:{name:'kg'}});
  const category=await tx.category.upsert({where:{code:'DM-DEMO-KHO'},update:{},create:{code:'DM-DEMO-KHO',name:'Nguyên liệu demo Staff - Kho',categoryType:'MATERIAL'}});
  const location=await tx.warehouseLocation.upsert({where:{branchId_name:{branchId:branch.id,name:'Kho nguyên liệu demo'}},update:{},create:{branchId:branch.id,name:'Kho nguyên liệu demo',locationType:'RAW_MATERIAL'}});
  const material=await tx.material.upsert({where:{code:'NVL-DEMO-KHO'},update:{},create:{code:'NVL-DEMO-KHO',name:'Thịt bò demo Staff - Kho',unitId:unit.id,categoryId:category.id,minStock:5}});
  for(const [lotCode,quantity] of [['LO-DEMO-KHO-A','100'],['LO-DEMO-KHO-B','30']]){
   const lot=await tx.materialLot.upsert({where:{materialId_lotCode:{materialId:material.id,lotCode}},update:{},create:{materialId:material.id,lotCode,expiryDate:new Date('2099-12-31')}});
   await tx.materialBalance.upsert({where:{locationId_materialLotId:{locationId:location.id,materialLotId:lot.id}},update:{},create:{locationId:location.id,materialLotId:lot.id,quantity}});
  }
  const existing=await tx.staffUser.findUnique({where:{code:'DEMO-KHO-STAFF'}});
  if(existing){assert.equal(existing.branchId,branch.id,'Existing demo account belongs to another branch');return {code:existing.code,created:false};}
  const user=await tx.staffUser.create({data:{code:'DEMO-KHO-STAFF',name:'Nhân viên demo Staff - Kho',role:'KITCHEN',branchId:branch.id,passwordHash:hashPassword('demo-password-2026')}});
  return {code:user.code,created:true};
 });
 console.log(JSON.stringify({database:'restaurant_integration_test',branch:'DEMO-KHO',staff:staff.code,created:staff.created,note:'Existing balances, requests and passwords are preserved.'},null,2));
}finally{await db.$disconnect();}

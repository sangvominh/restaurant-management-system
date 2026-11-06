
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
const root=process.cwd();
const require=createRequire(path.join(root,'backend/package.json'));
require('dotenv').config({path:path.join(root,'backend/.env'),quiet:true});
const {Client}=require('pg');
const url=new URL(process.env.DATABASE_URL);
assert.ok(['localhost','127.0.0.1'].includes(url.hostname));
assert.equal(url.pathname,'/restaurant_dev');
const apply=process.argv.includes('--apply');
const client=new Client({connectionString:url.toString()});
const qi=value=>'"'+value.replaceAll('"','""')+'"';
const legacy='warehouse_legacy_20261106';
const migrations=path.join(root,'backend/prisma/migrations');
const stamp=new Date().toISOString().replaceAll(/[:.]/g,'-');
const report={database:'restaurant_dev',applied:apply,legacySchema:legacy,migrations:[],preserved:[],unvalidatedForeignKeys:[]};
const metadata=[];
await client.connect();
try{
 assert.equal((await client.query('SELECT current_database() AS name')).rows[0].name,'restaurant_dev');
 await client.query('BEGIN');
 await client.query("SET LOCAL lock_timeout='5s'");
 await client.query("SET LOCAL statement_timeout='60s'");
 const tables=(await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE' AND table_name<>'_prisma_migrations' ORDER BY table_name")).rows.map(r=>r.table_name);
 await client.query('LOCK TABLE '+tables.map(t=>'public.'+qi(t)).join(',')+' IN ACCESS EXCLUSIVE MODE');
 const before=[];
 for(const table of tables){
  const columns=(await client.query("SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1 ORDER BY ordinal_position",[table])).rows.map(r=>r.column_name);
  const rows=(await client.query('SELECT row_to_json(t)::text AS value FROM (SELECT '+columns.map(qi).join(',')+' FROM public.'+qi(table)+') t')).rows.map(r=>r.value);
  before.push({table,columns,rows});
 }
 for(const table of ['material_adjustments','material_adjustment_details']){
  assert.equal(before.find(t=>t.table===table)?.rows.length,0,'Legacy adjustment table is not empty; conversion requires a reviewed mapping');
 }
 assert.equal((await client.query('SELECT count(*)::int AS count FROM pg_namespace WHERE nspname=$1',[legacy])).rows[0].count,0,'Legacy namespace already exists');
 await client.query('CREATE SCHEMA '+qi(legacy));
 await client.query('ALTER TABLE public.material_adjustment_details SET SCHEMA '+qi(legacy));
 await client.query('ALTER TABLE public.material_adjustments SET SCHEMA '+qi(legacy));

 async function productBaseline(){
  const columns=(await client.query("SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='products'")).rows.map(r=>r.column_name);
  for(const column of ['id','code','name','category','price','unit','image_url','description','status','created_at','updated_at'])assert.ok(columns.includes(column),'Missing products.'+column);
  await client.query('CREATE UNIQUE INDEX IF NOT EXISTS products_code_key ON products(code)');
  await client.query('CREATE INDEX IF NOT EXISTS products_category_status_idx ON products(category,status)');
  for(const [table,name] of [['boms','boms_product_code_fkey'],['finished_goods_balances','finished_goods_balances_product_code_fkey']]){
   const exists=(await client.query('SELECT 1 FROM pg_constraint WHERE conrelid=$1::regclass AND conname=$2',[table,name])).rowCount;
   if(!exists)await client.query('ALTER TABLE '+qi(table)+' ADD CONSTRAINT '+qi(name)+' FOREIGN KEY (product_code) REFERENCES products(code) ON DELETE RESTRICT ON UPDATE CASCADE NOT VALID');
   const orphan=(await client.query('SELECT count(*)::int AS count FROM '+qi(table)+' b LEFT JOIN products p ON p.code=b.product_code WHERE p.code IS NULL')).rows[0].count;
   if(orphan===0)await client.query('ALTER TABLE '+qi(table)+' VALIDATE CONSTRAINT '+qi(name));
   else report.unvalidatedForeignKeys.push({table,constraint:name,orphanRows:orphan});
  }
 }
 const applied=new Set((await client.query('SELECT migration_name FROM _prisma_migrations WHERE finished_at IS NOT NULL AND rolled_back_at IS NULL')).rows.map(r=>r.migration_name));
 for(const name of fs.readdirSync(migrations).sort()){
  const file=path.join(migrations,name,'migration.sql');
  if(!fs.existsSync(file)||applied.has(name))continue;
  const sql=fs.readFileSync(file,'utf8');
  if(name==='20261029200000_add_product_table'||name==='20261104000000_product_bom_link'){
   await productBaseline();
   report.migrations.push({name,mode:'Reconciled existing products and FK; no sample products or fabricated data inserted'});
  }else{
   await client.query(sql);
   report.migrations.push({name,mode:'Executed existing migration SQL'});
  }
  metadata.push(name);
 }
 // Verify every original row through its original columns, allowing only additive new rows.
 for(const original of before){
  const namespace=['material_adjustments','material_adjustment_details'].includes(original.table)?legacy:'public';
  const after=(await client.query('SELECT row_to_json(t)::text AS value FROM (SELECT '+original.columns.map(qi).join(',')+' FROM '+qi(namespace)+'.'+qi(original.table)+') t')).rows.map(r=>r.value);
  const remaining=new Map();
  for(const row of after)remaining.set(row,(remaining.get(row)||0)+1);
  for(const row of original.rows){
   assert.ok(remaining.get(row)>0,'Original row changed or lost in '+original.table);
   remaining.set(row,remaining.get(row)-1);
  }
  report.preserved.push({table:original.table,originalRows:original.rows.length,afterRows:after.length});
 }
 fs.writeFileSync(path.join(root,'backups','restaurant_dev_schema_plan_'+stamp+'.json'),JSON.stringify(report,null,2));
 await client.query(apply?'COMMIT':'ROLLBACK');
 if(apply)fs.writeFileSync(path.join(root,'backups','restaurant_dev_schema_resolve.json'),JSON.stringify({database:'restaurant_dev',migrations:metadata,report},null,2));
 console.log(JSON.stringify({mode:apply?'APPLIED':'DRY RUN ROLLED BACK',migrationCount:metadata.length,preservedTables:report.preserved.length,unvalidatedForeignKeys:report.unvalidatedForeignKeys},null,2));
}catch(error){
 await client.query('ROLLBACK').catch(()=>{});
 throw error;
}finally{await client.end();}

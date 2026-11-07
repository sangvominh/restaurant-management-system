import 'dotenv/config';
import { Client } from 'pg';
import { InventoryReportApi } from '../src/warehouse/api/inventory-report.api.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';
import type { Prisma } from '../src/generated/prisma/client.js';

describe.skipIf(process.env.RUN_REPORT_SQL_TESTS !== '1')('Report SQL: SELECT-only fixtures', () => {
  const db = new Client({ connectionString: process.env.DATABASE_URL });
  beforeAll(async () => { await db.connect(); await db.query('BEGIN READ ONLY'); });
  afterAll(async () => { await db.query('ROLLBACK'); await db.end(); });
  const move = (id: string,before: number,delta: number,created_at: string,movement_type='RECEIPT') =>
    ({id,quantity_before:String(before),quantity_change:String(delta),quantity_after:String(before+delta),created_at,movement_type});
  async function report(movements: ReturnType<typeof move>[],balance: number,product=false,linked=true) {
    const service = { $queryRaw: async (sql: Prisma.Sql) => {
      const n=sql.values.length+1;
      const prefix=`WITH units AS (SELECT 'u1' id,'kg' name),
        materials AS (SELECT 'm1' id,'NVL001' code,'Nguyên liệu' name,'u1' unit_id),
        material_lots AS (SELECT 'l1' id,'m1' material_id),
        material_balances AS (SELECT 'l1' material_lot_id,'loc1' location_id,$${n+1}::numeric quantity),
        products AS (SELECT 'TP001' code,'Thành phẩm' name,'phần' unit WHERE ${linked?'true':'false'}),
        finished_goods_balances AS (SELECT 'TP001' product_code,'loc1' location_id,$${n+1}::numeric quantity),
        inventory_movements AS (SELECT * FROM jsonb_to_recordset($${n}::jsonb) AS x(id text,material_lot_id text,location_id text,quantity_before numeric,quantity_change numeric,quantity_after numeric,movement_type text,created_at timestamptz)),
        finished_goods_movements AS (SELECT * FROM jsonb_to_recordset($${n}::jsonb) AS x(id text,product_code text,location_id text,quantity_before numeric,quantity_change numeric,quantity_after numeric,receipt_id text,issue_detail_id text,defect_id text,created_at timestamptz)), `;
      const fixture=JSON.stringify(movements.map(row=>({...row,material_lot_id:'l1',location_id:'loc1',product_code:'TP001',
        receipt_id:row.movement_type==='RECEIPT'?'r1':null,issue_detail_id:row.movement_type==='ISSUE'?'i1':null,defect_id:row.movement_type==='WASTE'?'d1':null})));
      return (await db.query(prefix+sql.text.replace(/^\s*WITH\s+/i,''),[...sql.values,fixture,String(balance)])).rows;
    }};
    return (await new InventoryReportApi(service as unknown as PrismaService).getReport({itemType:product?'PRODUCT':'MATERIAL',period:'MONTH',year:'2025',month:'3'})).data;
  }
  it('aggregates 150 movements without list truncation',async()=>{
    const moves=Array.from({length:150},(_,i)=>move(String(i).padStart(3,'0'),i,1,new Date(Date.parse('2025-03-15T00:00:00Z')+i*1000).toISOString()));
    expect((await report(moves,150)).rows[0]).toMatchObject({opening:'0',received:'150',closing:'150',historyComplete:true});
  });
  it('reconstructs historical endpoints and separates movement types',async()=>{
    const moves=[move('1',0,100,'2025-02-01T00:00:00Z'),move('2',100,-20,'2025-03-02T00:00:00Z','ISSUE'),
      move('3',80,-3,'2025-03-03T00:00:00Z','WASTE'),move('4',77,2,'2025-03-04T00:00:00Z','RETURN'),
      move('5',79,1,'2025-03-05T00:00:00Z','ADJUSTMENT'),move('6',80,10,'2025-04-02T00:00:00Z')];
    expect((await report(moves,90)).rows[0]).toMatchObject({opening:'100',received:'0',issued:'20',wasted:'3',returned:'2',otherChange:'1',closing:'80'});
  });
  it('uses inclusive Vietnam start and exclusive next-period midnight',async()=>{
    expect((await report([move('1',0,4,'2025-02-28T16:59:59Z'),move('2',4,6,'2025-02-28T17:00:00Z'),move('3',10,8,'2025-03-31T17:00:00Z')],18)).rows[0]).toMatchObject({opening:'4',received:'6',closing:'10'});
  });
  it('does not invent stock before a nonzero first snapshot',async()=>{
    expect((await report([move('1',20,10,'2025-03-10T00:00:00Z')],30)).rows[0]).toMatchObject({opening:null,closing:'30',historyComplete:false});
  });
  it('detects gaps in the movement chain',async()=>{
    expect((await report([move('1',0,10,'2025-03-10T00:00:00Z'),move('2',12,3,'2025-03-11T00:00:00Z')],15)).rows[0]).toMatchObject({opening:null,closing:null,historyComplete:false});
  });
  it('does not invent historical stock without movements',async()=>{
    expect((await report([],20)).rows[0]).toMatchObject({opening:null,closing:null,historyComplete:false});
  });
  it('classifies Product receipts, issues and stock defects',async()=>{
    expect((await report([move('1',0,10,'2025-03-10T00:00:00Z'),move('2',10,-2,'2025-03-11T00:00:00Z','ISSUE'),move('3',8,-1,'2025-03-12T00:00:00Z','WASTE')],7,true)).rows[0]).toMatchObject({opening:'0',received:'10',issued:'2',wasted:'1',closing:'7',unit:'phần'});
  });
  it('preserves orphan Product stock and warns instead of crashing',async()=>{
    const data=await report([move('1',0,10,'2025-03-10T00:00:00Z')],10,true,false);
    expect(data.rows[0]).toMatchObject({code:'TP001',missingMetadata:true,name:'Chưa liên kết sản phẩm'});
    expect(data.warnings.length).toBeGreaterThan(0);
  });
});

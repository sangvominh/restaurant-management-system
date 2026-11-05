import 'dotenv/config';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { KitchenWasteDecisionService } from '../src/staff/kitchen-waste-decision.service.js';
import { KitchenReturnDecisionService } from '../src/staff/kitchen-return-decision.service.js';
import { ProcessingDefectDecisionService } from '../src/staff/processing-defect-decision.service.js';

const [kind, action, code, ...reasonParts] = process.argv.slice(2);
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || !['/restaurant_dev','/staff_demo','/codex_fbseed_test'].includes(url.pathname)) throw new Error('Chỉ chạy trên database demo cục bộ.');
if (!['waste','return','defect'].includes(kind ?? '') || !['list','approve','reject'].includes(action ?? '')) throw new Error('Cú pháp: tsx scripts/feedback-demo-decision.ts waste|return|defect list|approve|reject [mã phiếu] [lý do]');
const db = new PrismaService();
try {
 const branch=await db.branch.findUniqueOrThrow({where:{code:'TEST-CN01'}});
 const service=kind==='waste'?new KitchenWasteDecisionService(db):kind==='return'?new KitchenReturnDecisionService(db):new ProcessingDefectDecisionService(db);
 if (action==='list') { const rows=await service.pending(branch.id) as {name?:string}[]; console.log(JSON.stringify(rows.filter(row=>['Thịt bò tươi','Ức gà','Rau củ hỗn hợp','Cá phi lê','Bò xào rau củ','Gà sốt tiêu','Cá sốt cà'].includes(row.name ?? '')),null,2)); }
 else {
  if (!code) throw new Error('Cần nhập mã phiếu.');
  const testOnly=kind==='waste'
   ? await db.$queryRaw<{ok:boolean}[]>`SELECT m.code IN ('NVL-101','NVL-102','NVL-103','NVL-104') AS ok FROM staff_kitchen_waste w JOIN material_lots l ON l.id=w.material_lot_id JOIN materials m ON m.id=l.material_id WHERE w.code=${code} AND w.branch_id=${branch.id}::uuid`
   : kind==='return'
   ? await db.$queryRaw<{ok:boolean}[]>`SELECT m.code IN ('NVL-101','NVL-102','NVL-103','NVL-104') AS ok FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id JOIN materials m ON m.id=d.material_id WHERE r.code=${code} AND r.branch_id=${branch.id}::uuid`
   : await db.$queryRaw<{ok:boolean}[]>`SELECT count(w.id)>0 AND bool_and(m.code IN ('NVL-101','NVL-102','NVL-103','NVL-104')) AS ok FROM staff_processing_defects d JOIN staff_kitchen_waste w ON w.processing_defect_id=d.id JOIN material_lots l ON l.id=w.material_lot_id JOIN materials m ON m.id=l.material_id WHERE d.code=${code} AND d.branch_id=${branch.id}::uuid`;
  if (!testOnly[0]?.ok) throw new Error('Chỉ được xử lý phiếu chứa nguyên liệu mẫu.');
  const result=await service.decide({branchId:branch.id,code,decision:action==='approve'?'APPROVED':'REJECTED',decidedBy:'DEMO-LOCAL',reason:reasonParts.join(' ')});
  console.log(JSON.stringify(result,null,2));
 }
} finally { await db.$disconnect(); }

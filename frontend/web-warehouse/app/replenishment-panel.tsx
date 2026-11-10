'use client';
import { useEffect, useState } from 'react';
import { api } from './catalog-api';
type Request = { id: string; quantity: string; requestedBy: { name: string }; saleLine: { productId: string; productName: string; product: { unit: { symbol: string } }; sale: { code: string; table: { name: string } | null } } };
export default function ReplenishmentPanel({ employees, changed }: { employees: { id: string; name: string }[]; changed: () => Promise<void> }) {
 const [rows,setRows]=useState<Request[]>([]), [assignees,setAssignees]=useState<Record<string,string>>({}), [busy,setBusy]=useState(false), [error,setError]=useState('');
 async function load(){setRows(await api<Request[]>('production/replenishments'));}
 useEffect(()=>{let active=true; const read=()=>api<Request[]>('production/replenishments').then(v=>{if(active)setRows(v);}).catch(e=>{if(active)setError(e instanceof Error?e.message:'Không tải được yêu cầu');}); void read();const timer=window.setInterval(()=>void read(),15000);return()=>{active=false;window.clearInterval(timer);};},[]);
 async function act(r:Request,reject=false){
   const note=reject?window.prompt('Lý do không thể bổ sung?'):null;
   if(reject&&!note?.trim())return;
   setBusy(true);setError('');
   try{
     if(reject)await api('production/replenishments/'+r.id+'/reject','POST',{note});
     else await api('production/orders','POST',{productId:r.saleLine.productId,quantity:r.quantity,assignedToId:assignees[r.id],replenishmentId:r.id});
     await load();await changed();
   }catch(e){setError(e instanceof Error?e.message:'Không xử lý được');}finally{setBusy(false);}
 }
 if(!rows.length&&!error)return null;
 return <section className="replenishment-panel"><h3>Yêu cầu bổ sung từ nhà hàng <small>{rows.length} chờ xử lý</small></h3>{error&&<p role="alert" className="error">{error}</p>}{rows.map(r=><div className="replenishment-row" key={r.id}><div><strong>{r.saleLine.productName} · {Number(r.quantity).toLocaleString('vi-VN')} {r.saleLine.product.unit.symbol}</strong><small>{r.saleLine.sale.table?.name||'Mang đi'} · {r.saleLine.sale.code} · {r.requestedBy.name}</small></div><select aria-label="Bếp nhận yêu cầu bổ sung" disabled={busy} value={assignees[r.id]||''} onChange={e=>setAssignees({...assignees,[r.id]:e.target.value})}><option value="">Chọn người nhận lệnh…</option>{employees.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select><button className="primary" disabled={busy||!assignees[r.id]} onClick={()=>void act(r)}>Lập lệnh bổ sung</button><button className="danger" disabled={busy} onClick={()=>void act(r,true)}>Từ chối</button></div>)}</section>;
}

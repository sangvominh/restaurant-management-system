'use client';
import { useState, type FormEvent } from 'react';
import { fmt, type SaleLine } from './sales-api';
export default function LineChange({ line, maximum, busy, apply }: { line: SaleLine; maximum: number; busy: boolean; apply: (body: { lineId: string; quantity: string; reason: string }) => Promise<boolean> }) {
 const [open,setOpen]=useState(false),[quantity,setQuantity]=useState(String(maximum)),[reason,setReason]=useState('');
 async function submit(e:FormEvent){e.preventDefault();if(await apply({lineId:line.id,quantity,reason})){setOpen(false);setReason('');}}
 return <div className="line-change"><button disabled={busy} onClick={()=>{setOpen(!open);setQuantity(String(maximum));}}>Giảm / bỏ món</button>{open&&<form onSubmit={submit}><fieldset disabled={busy}><label>Số lượng cần bỏ<input type="number" min="0.001" step="0.001" max={maximum} value={quantity} required onChange={e=>setQuantity(e.target.value)}/></label><small>Tối đa {fmt(maximum)} đang có trên đơn. Chỉ bỏ phần khách không dùng; lượng này được giải phóng để bán lại.</small><label>Lý do<input required maxLength={500} value={reason} placeholder="Hết món, khách đổi ý…" onChange={e=>setReason(e.target.value)}/></label><div className="dialog-actions"><button type="button" onClick={()=>setOpen(false)}>Quay lại</button><button className="danger">Xác nhận bỏ món</button></div></fieldset></form>}</div>;
}


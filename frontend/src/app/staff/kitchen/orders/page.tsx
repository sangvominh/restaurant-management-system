"use client";
import { BackLink } from "@/components/staff/context";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, Card, Notice, Toast, Icon, SearchInput, SortSelect } from "@/components/staff/ui";
import { ResourceState, useResource } from "@/components/staff/context";
import { api, dateTime, statuses, type Order, type Line } from "@/lib/api";
type Requirement = { code:string; name:string; unit:string; required:string; available:string; blockedExpiry:string; shortage:string };
type Stock = { id: string; name: string; lot: string; unit: string; quantity: string };
export default function KitchenPage() {
 const { data, error, reload } = useResource<Order[]>("staff/kitchen");
 const stock = useResource<Stock[]>("staff/production-orders/kitchen-inventory");
 useEffect(() => { const refresh=() => { if (document.visibilityState === "visible") reload(); }; const timer=window.setInterval(refresh,10000); window.addEventListener("focus",refresh); document.addEventListener("visibilitychange",refresh); return () => { window.clearInterval(timer); window.removeEventListener("focus",refresh); document.removeEventListener("visibilitychange",refresh); }; },[reload]);
 const [search,setSearch] = useState(""); const [sort,setSort] = useState("oldest");
 const [missing,setMissing] = useState<Requirement[]>([]); const shortageDialog = useRef<HTMLDialogElement>(null);
 useEffect(() => { const el=shortageDialog.current; if (!el) return; if (missing.length && !el.open) el.showModal(); else if (!missing.length && el.open) el.close(); }, [missing]);
 const [selected, setSelected] = useState<Line | null>(null); const dialog = useRef<HTMLDialogElement>(null);
 useEffect(() => { const el = dialog.current; if (!el) return; if (selected && !el.open) el.showModal(); else if (!selected && el.open) el.close(); }, [selected]);
 function closeDialog() { setSelected(null); setLot("none"); setQuantity(""); setReason(""); setExtraWaste([]); setFailure(""); }
 const [lot, setLot] = useState("none"); const [quantity, setQuantity] = useState(""); const [reason, setReason] = useState("");
 const [extraWaste,setExtraWaste] = useState<{lotId:string;quantity:string;reason:string}[]>([]);
 const [busy, setBusy] = useState(false); const [message, setMessage] = useState(""); const [failure, setFailure] = useState("");
 async function start(line: Line) {
  if (busy) return; setBusy(true); setFailure(""); setMessage("");
  try {
   const requirements = await api<Requirement[]>(`staff/lines/${encodeURIComponent(line.id)}/material-requirements`);
   const shortages = requirements.filter(item => Number(item.shortage) > 0);
   if (shortages.length) { setMissing(shortages); return; }
   await api(`staff/lines/${encodeURIComponent(line.id)}`, "PATCH", { status: "COOKING" });
   setMessage(`Đang chế biến ${line.name}.`); reload();
  } catch (e) { setFailure(e instanceof Error ? e.message : "Không thể bắt đầu món."); } finally { setBusy(false); }
 }
 async function update(line: Line, status: "COOKING" | "READY") {
  if (busy) return; setBusy(true); setFailure(""); setMessage("");
  try {
   const waste = lot && lot !== "none" ? [{ lotId: lot, quantity, reason }, ...extraWaste] : [];
   await api(`staff/lines/${encodeURIComponent(line.id)}`, "PATCH", { status, ...(status === "READY" ? { wastes: waste } : {}) });
   setMessage(status === "READY" ? `Đã hoàn thành ${line.name}${waste.length ? " và gửi phiếu hao hụt chờ duyệt." : "."}` : `Đang chế biến ${line.name}.`);
   setSelected(null); setLot("none"); setQuantity(""); setReason(""); setExtraWaste([]); reload(); stock.reload();
  } catch (e) {
   setFailure(e instanceof Error ? e.message : "Không thể cập nhật món.");
   if (status === "READY") {
    try { const items = await api<Requirement[]>(`staff/lines/${encodeURIComponent(line.id)}/material-requirements`); const shortages = items.filter(item => Number(item.shortage) > 0); if (shortages.length) setMissing(shortages); } catch { /* Giữ lỗi ban đầu nếu không thể tải danh sách thiếu. */ }
   }
  } finally { setBusy(false); }
 }
 return <div className="space-y-5">
  <BackLink href="/staff/kitchen"/><div className="stock-title-row"><h1>Món theo order</h1><Link href="/staff/production/history?type=ORDER&from=orders" className="btn btn-secondary">Lịch sử chế biến</Link><Link href="/staff/processing-defects" className="btn btn-danger">Báo lỗi chế biến</Link><button type="button" className="stock-icon-button stock-refresh" aria-label="Tải lại danh sách món" title="Tải lại" onClick={() => { reload(); stock.reload(); }}><Icon name="refresh"/></button></div>

  {message && <Toast key={message}>{message}</Toast>}{failure && !selected && <Toast key={failure} error>{failure}</Toast>}
  <div className="staff-search-toolbar"><SearchInput value={search} onChange={setSearch} label="Tìm món hoặc order" hint="Tên món, bàn hoặc mã order"/><SortSelect value={sort} onChange={setSort} label="Sắp xếp order" options={[["oldest","Cũ nhất"],["newest","Mới nhất"],["table","Tên bàn A–Z"]]}/></div>
  <ResourceState error={error} loading={!data && !error} retry={reload}/>
  {data?.length === 0 && <p className="muted">Chưa có món cần chế biến.</p>}
  {data?.filter(order => `${order.invoice.table.name} ${order.id} ${order.lines.map(line => line.name).join(" ")}`.toLocaleLowerCase("vi").includes(search.trim().toLocaleLowerCase("vi"))).sort((a,b) => sort === "table" ? a.invoice.table.name.localeCompare(b.invoice.table.name,"vi",{numeric:true}) : sort === "newest" ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map(order => <Card key={order.id}><h2>{order.invoice.table.name} · Order {order.id.slice(0, 8)}</h2><p className="muted">{dateTime(order.createdAt)}</p>{order.lines.filter(line => ["QUEUED", "COOKING", "READY"].includes(line.status)).map(line => <div className="detail-item" key={line.id}><div><strong>{line.name} × {line.quantity}</strong>{line.note && <small>{line.note}</small>}<small><Badge tone={line.status === "READY" ? "green" : "blue"}>{statuses[line.status]}</Badge></small></div>{line.status === "QUEUED" && <Button disabled={busy} onClick={() => void start(line)}>Bắt đầu</Button>}{line.status === "COOKING" && <Button disabled={busy} onClick={() => { setSelected(line); setFailure(""); }}>Hoàn thành</Button>}</div>)}</Card>)}
  <dialog ref={shortageDialog} className="stock-dialog" aria-labelledby="shortage-title" onClose={() => setMissing([])}>
   <button className="stock-close" type="button" aria-label="Đóng" onClick={() => setMissing([])}>×</button>
   <div className="detail-heading"><span>NGUYÊN LIỆU TẠI BẾP</span><h2 id="shortage-title">Chưa đủ nguyên liệu</h2><p>Cần cấp thêm để tiếp tục chế biến.</p></div>
   <div className="detail-items">{missing.map(item => <div className="detail-item" key={item.code}><div><strong>{item.name}</strong><small>Cần {item.required} {item.unit} · Có thể dùng {item.available} {item.unit} · Hết hạn/chưa có hạn {item.blockedExpiry} {item.unit}</small></div><strong>Thiếu {item.shortage} {item.unit}</strong></div>)}</div>
   <div className="stock-actions"><Link className="btn btn-primary" href="/staff/inventory" onClick={() => sessionStorage.setItem("staff-material-shortages", JSON.stringify(missing.map(item => ({ code:item.code, name:item.name, unit:item.unit, quantity:item.shortage }))))}>Yêu cầu xuất NVL</Link><Button type="button" secondary onClick={() => setMissing([])}>Đóng</Button></div>
  </dialog>
  <dialog ref={dialog} className="stock-dialog" aria-labelledby="complete-title" onCancel={e => { if (busy) e.preventDefault(); }} onClose={closeDialog}>
   <button className="stock-close" type="button" aria-label="Đóng" disabled={busy} onClick={closeDialog}>×</button>
   {selected && <><div className="detail-heading"><span>HOÀN THÀNH MÓN</span><h2 id="complete-title">Xác nhận hoàn thành</h2><p>{selected.name} × {selected.quantity}</p></div>
    <p className="muted">Nếu có nguyên liệu bị hỏng hoặc đổ trong lúc làm, ghi thêm bên dưới.</p>
    {failure && <Notice error>{failure}</Notice>}
    {stock.error && <ResourceState error={stock.error} loading={false} retry={stock.reload}/>}
    <form className="stock-form" onSubmit={e => { e.preventDefault(); void update(selected, "READY"); }}><label className="stock-label">Hao hụt<select required value={lot} onChange={e => setLot(e.target.value)}><option value="none">Không có hao hụt</option>{stock.data?.map(item => <option key={item.id} value={item.id}>{item.name} · {item.lot} · còn {item.quantity} {item.unit}</option>)}</select></label>{lot && lot !== "none" && <><label className="stock-label">Số lượng ({stock.data?.find(item => item.id === lot)?.unit})<input type="number" min="0.001" step="0.001" required value={quantity} onChange={e => setQuantity(e.target.value)}/></label><label className="stock-label">Lý do<textarea required maxLength={1000} value={reason} onChange={e => setReason(e.target.value)}/></label></>}{lot && lot !== "none" && <>{extraWaste.map((entry,index) => <fieldset className="stock-label" key={index}><legend>Hao hụt {index + 2}</legend><label className="stock-label">Nguyên liệu và lô<select required value={entry.lotId} onChange={e => setExtraWaste(rows => rows.map((row,i) => i === index ? {...row,lotId:e.target.value} : row))}><option value="">Chọn nguyên liệu</option>{stock.data?.map(item => <option key={item.id} value={item.id}>{item.name} · {item.lot} · {item.unit}</option>)}</select></label><label className="stock-label">Số lượng ({stock.data?.find(item => item.id === entry.lotId)?.unit ?? "đơn vị"})<input type="number" min="0.001" step="0.001" required value={entry.quantity} onChange={e => setExtraWaste(rows => rows.map((row,i) => i === index ? {...row,quantity:e.target.value} : row))}/></label><label className="stock-label">Lý do<textarea required maxLength={1000} value={entry.reason} onChange={e => setExtraWaste(rows => rows.map((row,i) => i === index ? {...row,reason:e.target.value} : row))}/></label><Button type="button" secondary onClick={() => setExtraWaste(rows => rows.filter((_,i) => i !== index))}>Xóa dòng</Button></fieldset>)}<Button type="button" secondary onClick={() => setExtraWaste(rows => [...rows,{lotId:"",quantity:"",reason:""}])}>Thêm nguyên liệu hao hụt</Button></>}<div className="stock-actions"><Button disabled={busy} type="submit">{busy ? "Đang lưu…" : "Xác nhận hoàn thành"}</Button><Button type="button" secondary disabled={busy} onClick={closeDialog}>Hủy</Button></div></form>
   </>}
  </dialog>
 </div>;
}

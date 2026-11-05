"use client";
import { BackLink } from "@/components/staff/context";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Badge, Card, Icon } from "@/components/staff/ui";
import { ResourceState, useResource } from "@/components/staff/context";
import { expiryStatus } from "@/lib/expiry";

type Stock = { id: string; name: string; code: string; lot: string; unit: string; quantity: string; totalQuantity: string; reservedWaste: string; reservedReturn: string; expiry: string | null };
export default function KitchenInventory() {
 const { data, error, reload } = useResource<Stock[]>("staff/production-orders/kitchen-inventory");
 const [search, setSearch] = useState(""); const [focused, setFocused] = useState(false); const [sort, setSort] = useState("name-asc");
 const [detail, setDetail] = useState<Stock | null>(null); const dialog = useRef<HTMLDialogElement>(null);
 useEffect(() => { if (detail && !dialog.current?.open) dialog.current?.showModal(); }, [detail]);
 const visible = data?.filter(item => `${item.name} ${item.code} ${item.lot}`.toLocaleLowerCase("vi").includes(search.trim().toLocaleLowerCase("vi"))).sort((a,b) => {
  const name = a.name.localeCompare(b.name, "vi") || a.lot.localeCompare(b.lot, "vi");
  if (sort === "name-desc") return -name;
  if (sort === "expiry-asc" || sort === "expiry-desc") {
   if (!a.expiry || !b.expiry) return a.expiry ? -1 : b.expiry ? 1 : name;
   const date = a.expiry.localeCompare(b.expiry); return (sort === "expiry-asc" ? date : -date) || name;
  }
  return name;
 });
 return <div className="space-y-5">
  <BackLink href="/staff/materials"/>
  <div className="stock-title-row"><h1>Tồn nguyên liệu tại bếp {data && <Badge tone="blue">{new Set(data.map(item => item.code)).size} loại</Badge>}</h1><button className="stock-icon-button stock-refresh" type="button" aria-label="Tải lại tồn bếp" title="Tải lại" onClick={reload}><Icon name="refresh"/></button></div>
  <div className="stock-actions"><Link href="/staff/inventory" className="btn btn-secondary">Xem tồn kho</Link></div>
  <p className="muted">Nguyên liệu đã được kho cấp cho bếp.</p>
  <div className="inventory-toolbar"><div className={`inventory-search ${focused || search ? "expanded" : ""}`}><Icon name="search"/><input type="search" aria-label="Tìm nguyên vật liệu" placeholder={focused || search ? "Tìm theo tên, mã hoặc lô" : "Tìm nguyên vật liệu"} value={search} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={e => setSearch(e.target.value)}/></div><label className="inventory-sort" title="Sắp xếp nguyên vật liệu"><Icon name="sort"/><select aria-label="Sắp xếp nguyên vật liệu" value={sort} onChange={e => setSort(e.target.value)}><option value="name-asc">Tên A–Z</option><option value="name-desc">Tên Z–A</option><option value="expiry-asc">Hạn dùng gần nhất</option><option value="expiry-desc">Hạn dùng xa nhất</option></select></label></div>
  <ResourceState error={error} loading={!data && !error} retry={reload}/>
  {data?.length === 0 && <p>Chưa có nguyên liệu được cấp vào bếp.</p>}
  {data && data.length > 0 && visible?.length === 0 && <p className="muted">Không tìm thấy nguyên vật liệu phù hợp.</p>}
  {visible?.map(item => <Card className="stock-card" key={item.id}><button type="button" className="stock-card-open" aria-label={`Xem chi tiết ${item.name}, lô ${item.lot}`} onClick={() => setDetail(item)}/><div className="stock-card-head"><strong className="stock-detail-link">{item.name}</strong></div><p className="stock-quantity">Có thể sử dụng: {expiryStatus(item.expiry).usable ? item.quantity : "0"} {item.unit}</p><p className="muted">Tổng tại bếp: {item.totalQuantity} {item.unit} · {item.code}</p>{(Number(item.reservedWaste) > 0 || Number(item.reservedReturn) > 0) && <p className="muted">Đang chờ duyệt: {Number(item.reservedWaste) > 0 && `hao hụt ${item.reservedWaste} ${item.unit}`}{Number(item.reservedWaste) > 0 && Number(item.reservedReturn) > 0 && " · "}{Number(item.reservedReturn) > 0 && `hoàn trả ${item.reservedReturn} ${item.unit}`}</p>}<p className="muted">Lô {item.lot} · Bếp</p><p className="muted">Hạn dùng: {item.expiry ? item.expiry.slice(0, 10) : "Chưa ghi"} · <Badge tone={expiryStatus(item.expiry).tone}>{expiryStatus(item.expiry).label}</Badge></p></Card>)}
  <dialog ref={dialog} className="stock-dialog" onClose={() => setDetail(null)} aria-labelledby="kitchen-stock-detail"><button className="stock-close" type="button" aria-label="Đóng" onClick={() => dialog.current?.close()}>×</button>{detail && <><div className="detail-heading"><span>NGUYÊN VẬT LIỆU</span><h2 id="kitchen-stock-detail">Chi tiết nguyên liệu</h2><p>{detail.name}</p></div><div className="detail-highlight"><span>Có thể sử dụng</span><strong>{expiryStatus(detail.expiry).usable ? detail.quantity : "0"} {detail.unit}</strong></div><dl className="detail-grid"><div><dt>Tổng tồn</dt><dd>{detail.totalQuantity} {detail.unit}</dd></div><div><dt>Hao hụt chờ duyệt</dt><dd>{detail.reservedWaste} {detail.unit}</dd></div><div><dt>Hoàn trả chờ duyệt</dt><dd>{detail.reservedReturn} {detail.unit}</dd></div><div><dt>Mã nguyên liệu</dt><dd>{detail.code}</dd></div><div><dt>Lô</dt><dd>{detail.lot}</dd></div><div><dt>Vị trí</dt><dd>Bếp</dd></div><div><dt>Hạn dùng</dt><dd>{detail.expiry ? detail.expiry.slice(0, 10) : "Chưa ghi"} · <Badge tone={expiryStatus(detail.expiry).tone}>{expiryStatus(detail.expiry).label}</Badge></dd></div></dl></>}</dialog>
 </div>;
}

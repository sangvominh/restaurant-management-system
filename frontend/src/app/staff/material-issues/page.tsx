"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Badge, Icon } from "@/components/staff/ui";
import { ResourceState, useResource } from "@/components/staff/context";
import { dateTime } from "@/lib/api";

type Issue = { code: string; status: string; createdAt: string; details: { name: string; lot: string; location: string; quantity: string; unit: string }[] };
const labels: Record<string, string> = { PENDING: "Chờ duyệt", APPROVED: "Đã duyệt", REJECTED: "Đã từ chối" };
export default function MaterialIssues() {
 const [detail, setDetail] = useState<Issue | null>(null);
 const [filter, setFilter] = useState("ALL");
 const [sort, setSort] = useState("newest");
 const dialog = useRef<HTMLDialogElement>(null);
 const openedLink = useRef(false);
 const { data, error, reload } = useResource<Issue[]>("staff/production-orders/material-requests");
 useEffect(() => { if (detail && !dialog.current?.open) dialog.current?.showModal(); }, [detail]);
 useEffect(() => {
  if (!data || openedLink.current) return;
  const code = new URLSearchParams(window.location.search).get("code");
  const issue = data.find(item => item.code === code);
  if (issue) { const timer = window.setTimeout(() => { openedLink.current = true; setDetail(issue); }, 0); return () => window.clearTimeout(timer); }
 }, [data]);
 useEffect(() => { const refresh = () => { if (document.visibilityState === "visible") reload(); }; window.addEventListener("focus", refresh); return () => window.removeEventListener("focus", refresh); }, [reload]);
 return <div className="space-y-5">
  <Link className="staff-back" href="/staff/inventory">← Tồn nguyên vật liệu</Link>
  <div className="stock-title-row"><h1>Phiếu đề nghị của tôi</h1><button className="stock-icon-button stock-refresh" type="button" aria-label="Tải lại danh sách phiếu" title="Tải lại" onClick={reload}><Icon name="refresh" /></button></div>
  <div className="issue-toolbar"><div className="status-filters">{[["ALL","Tất cả"],["PENDING","Chờ duyệt"],["APPROVED","Đã duyệt"],["REJECTED","Từ chối"]].map(([key,label]) => <button key={key} className={filter === key ? "active" : ""} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div><label className="inventory-sort" title="Sắp xếp phiếu"><Icon name="sort"/><select aria-label="Sắp xếp phiếu" value={sort} onChange={e => setSort(e.target.value)}><option value="newest">Mới nhất</option><option value="oldest">Cũ nhất</option><option value="code-asc">Mã phiếu A–Z</option><option value="code-desc">Mã phiếu Z–A</option></select></label></div>
  <ResourceState error={error} loading={!data && !error} retry={reload}/>
  {data?.length === 0 && <p>Chưa có phiếu đề nghị.</p>}
  {data?.filter(issue => filter === "ALL" || issue.status === filter).sort((a, b) => { const code = a.code.localeCompare(b.code, "vi"); if (sort === "code-asc") return code; if (sort === "code-desc") return -code; const time = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); return (sort === "oldest" ? time : -time) || code; }).map(issue => <button type="button" className="card issue-card" key={issue.code} onClick={() => setDetail(issue)} aria-label={`Xem chi tiết phiếu ${issue.code}`}>
   <span className="issue-card-top"><strong>{issue.code}</strong></span>
   <span className="issue-meta"><Badge tone={issue.status === "APPROVED" ? "green" : issue.status === "REJECTED" ? "red" : "amber"}>{labels[issue.status] ?? issue.status}</Badge><span>{dateTime(issue.createdAt)}</span></span>
   <span className="issue-preview-label">NGUYÊN LIỆU ĐỀ NGHỊ</span>
   <span className="issue-preview">{issue.details.slice(0, 3).map((item, i) => <span className="issue-item" key={i}><span><strong>{item.name}</strong><small>Lô {item.lot}</small></span><strong className="issue-item-quantity">{item.quantity} {item.unit}</strong></span>)}{issue.details.length > 3 && <span className="issue-more" aria-label={`Còn ${issue.details.length - 3} dòng nguyên liệu`}>•••</span>}</span>
  </button>)}
  <dialog ref={dialog} className="stock-dialog" onClose={() => setDetail(null)} aria-labelledby="issue-detail-title">
   <button className="stock-close" type="button" aria-label="Đóng" onClick={() => dialog.current?.close()}>×</button>
   {detail && <><div className="detail-heading"><span>PHIẾU ĐỀ NGHỊ XUẤT</span><h2 id="issue-detail-title">Chi tiết phiếu</h2><p>{detail.code}</p></div>
    <dl className="detail-grid"><div><dt>Trạng thái</dt><dd><Badge tone={detail.status === "APPROVED" ? "green" : detail.status === "REJECTED" ? "red" : "amber"}>{labels[detail.status] ?? detail.status}</Badge></dd></div><div><dt>Ngày tạo</dt><dd>{dateTime(detail.createdAt)}</dd></div></dl>
    <h3 className="detail-section-title">Nguyên liệu đề nghị <span className="detail-count">{detail.details.length}</span></h3>
    <div className="detail-items">{detail.details.map((item,i) => <div className="detail-item" key={i}><div><strong>{item.name}</strong><small>Lô {item.lot} · {item.location}</small></div><strong>{item.quantity} {item.unit}</strong></div>)}</div>
   </>}
  </dialog>
 </div>;
}

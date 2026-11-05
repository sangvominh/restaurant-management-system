"use client";
import { useEffect, useRef, useState } from "react";
import { Badge, Icon, SearchInput, SortSelect } from "@/components/staff/ui";
import { ResourceState, useResource } from "@/components/staff/context";
import { dateTime, money, statuses, type Invoice } from "@/lib/api";

export default function InvoicesPage() {
 const { data, error, reload } = useResource<Invoice[]>("staff/invoices");
 const [search, setSearch] = useState(""); const [sort,setSort] = useState("newest"); const [detail, setDetail] = useState<Invoice | null>(null); const dialog = useRef<HTMLDialogElement>(null);
 const [filter, setFilter] = useState<"ALL" | "OPEN" | "PAID">("ALL");
 useEffect(() => { if (detail && !dialog.current?.open) dialog.current?.showModal(); }, [detail]);
 const shown = data?.filter(invoice => (filter === "ALL" || invoice.status === filter) && `${invoice.table.name} ${invoice.guestName} ${invoice.id} ${invoice.orders.flatMap(o => o.lines).map(l => l.name).join(" ")}`.toLocaleLowerCase("vi").includes(search.trim().toLocaleLowerCase("vi"))).sort((a,b) => sort === "oldest" ? new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime() : sort === "total-desc" ? b.total-a.total : sort === "total-asc" ? a.total-b.total : new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
 return <div className="space-y-5">
  <div className="stock-title-row"><h1>Hóa đơn</h1><button type="button" className="stock-icon-button stock-refresh" aria-label="Tải lại hóa đơn" title="Tải lại" onClick={reload}><Icon name="refresh"/></button></div>
  <p className="muted">Theo dõi hóa đơn và trạng thái món tại chi nhánh. Thanh toán trên giao diện đang được hoàn thiện.</p>
  <div className="staff-search-toolbar"><SearchInput value={search} onChange={setSearch} label="Tìm hóa đơn" hint="Tên khách, bàn, mã hoặc món"/><SortSelect value={sort} onChange={setSort} label="Sắp xếp hóa đơn" options={[["newest","Mới nhất"],["oldest","Cũ nhất"],["total-desc","Tổng tiền cao nhất"],["total-asc","Tổng tiền thấp nhất"]]}/></div>
  <div className="status-filters">{([["ALL", "Tất cả"], ["OPEN", "Chưa thanh toán"], ["PAID", "Đã thanh toán"]] as const).map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}</div>
  <ResourceState error={error} loading={!data && !error} retry={reload}/>
  {shown?.length === 0 && <p className="muted">Không có hóa đơn phù hợp.</p>}
  {shown?.map(invoice => { const lines = invoice.orders.flatMap(order => order.lines); return <button type="button" className="card issue-card" key={invoice.id} onClick={() => setDetail(invoice)} aria-label={`Xem chi tiết hóa đơn ${invoice.table.name}, ${invoice.guestName}`}>
   <span className="issue-card-top"><strong>{invoice.table.name} · {invoice.guestName}</strong><Badge tone={invoice.status === "PAID" ? "green" : "amber"}>{invoice.status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}</Badge></span>
   <span className="issue-meta">{dateTime(invoice.createdAt)} · Mã {invoice.id.slice(0,8)}</span><span className="issue-preview">{lines.slice(0,3).map(line => <span className="issue-item" key={line.id}><span><strong>{line.quantity} × {line.name}</strong><small>{statuses[line.status] ?? line.status}</small></span><strong>{money(line.quantity * line.unitPrice)}</strong></span>)}{lines.length > 3 && <span className="issue-more" aria-label={`Còn ${lines.length - 3} dòng món`}>•••</span>}</span><span className="issue-item"><strong>Tổng cộng</strong><strong>{money(invoice.total)}</strong></span>
  </button>; })}
  <dialog ref={dialog} className="stock-dialog" onClose={() => setDetail(null)} aria-labelledby="invoice-detail-title"><button className="stock-close" type="button" aria-label="Đóng" onClick={() => dialog.current?.close()}>×</button>{detail && <><div className="detail-heading"><span>HÓA ĐƠN</span><h2 id="invoice-detail-title">Chi tiết hóa đơn</h2><p>{detail.table.name} · {detail.guestName}</p></div><dl className="detail-grid"><div><dt>Trạng thái</dt><dd><Badge tone={detail.status === "PAID" ? "green" : "amber"}>{detail.status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}</Badge></dd></div><div><dt>Ngày tạo</dt><dd>{dateTime(detail.createdAt)}</dd></div><div><dt>Mã hóa đơn</dt><dd>{detail.id.slice(0,8)}</dd></div><div><dt>Tổng cộng</dt><dd>{money(detail.total)}</dd></div>{detail.payment && <div><dt>Tiền khách đưa</dt><dd>{money(detail.payment.cashReceived)}</dd></div>}</dl><h3 className="detail-section-title">Danh sách món <span className="detail-count">{detail.orders.flatMap(order => order.lines).length}</span></h3><div className="detail-items">{detail.orders.flatMap(order => order.lines).map(line => <div className="detail-item" key={line.id}><div><strong>{line.quantity} × {line.name}</strong><small>{statuses[line.status] ?? line.status}{line.note && ` · ${line.note}`}</small></div><strong>{money(line.quantity * line.unitPrice)}</strong></div>)}</div></>}</dialog>
 </div>;
}

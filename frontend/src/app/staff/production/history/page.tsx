"use client";
import { useEffect, useRef, useState } from "react";
import { BackLink } from "@/components/staff/context";
import { Badge, Icon, SearchInput, SortSelect } from "@/components/staff/ui";
import { api, dateTime } from "@/lib/api";
import "../production.css";

type Source = "ALL" | "ORDER" | "PRODUCTION";
type Entry = {
  type: "ORDER" | "PRODUCTION"; code: string; title: string; reference: string;
  quantity: string; plannedQuantity: string; acceptedQuantity: string | null;
  rejectedQuantity: string | null; status: string; note: string | null;
  createdAt: string; employeeCode: string | null;
};
type ProductionReceipt = {
  receiptCode: string; orderCode: string; productCode: string; productName: string;
  plannedQuantity: string; reportedQuantity: string; acceptedQuantity: string | null;
  rejectedQuantity: string | null; status: string; note: string | null; createdAt: string;
  assignedEmployeeCode: string | null;
};
const sourceLabels: Record<Source, string> = { ALL: "Tất cả", ORDER: "Theo order", PRODUCTION: "Theo lệnh sản xuất" };
const statusLabels: Record<string, string> = {
  READY: "Hoàn thành món", SERVED: "Đã phục vụ", CANCELLED: "Đã hủy",
  PENDING: "Chờ duyệt", APPROVED: "Đã duyệt", REJECTED: "Từ chối",
};
const orderStatuses = ["READY", "SERVED", "CANCELLED"];
const productionStatuses = ["PENDING", "APPROVED", "REJECTED"];

export default function ProductionHistoryPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selected, setSelected] = useState<Entry | null>(null);
  const [source, setSource] = useState<Source>("ALL");
  const [origin, setOrigin] = useState("kitchen");
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [revision, setRevision] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSource = params.get("type");
    if (requestedSource === "ORDER" || requestedSource === "PRODUCTION") setSource(requestedSource);
    const requestedOrigin = params.get("from");
    if (requestedOrigin === "orders" || requestedOrigin === "production") setOrigin(requestedOrigin);
    setInitialized(true);
  }, []);
  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);
  useEffect(() => {
    if (!initialized) return;
    let active = true;
    setLoading(true);
    setError("");
    const requests: Promise<Entry[]>[] = [];
    if (source !== "PRODUCTION") requests.push(api<Omit<Entry, "type">[]>("staff/kitchen/history").then(rows => rows.map(row => ({ ...row, type: "ORDER" as const }))));
    if (source !== "ORDER") requests.push(api<ProductionReceipt[]>("staff/production-orders/history").then(rows => rows.map(row => ({
      type: "PRODUCTION" as const, code: row.receiptCode, title: row.productName,
      reference: `Lệnh ${row.orderCode} · ${row.productCode}`, quantity: row.reportedQuantity,
      plannedQuantity: row.plannedQuantity, acceptedQuantity: row.acceptedQuantity,
      rejectedQuantity: row.rejectedQuantity, status: row.status, note: row.note,
      createdAt: row.createdAt, employeeCode: row.assignedEmployeeCode,
    }))));
    Promise.all(requests).then(groups => {
      if (active) setEntries(groups.flat());
    }).catch(e => {
      if (active) setError(e instanceof Error ? e.message : "Không tải được lịch sử chế biến.");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [initialized, source, revision]);

  function changeSource(next: Source) {
    setSource(next);
    setStatus("ALL");
    const params = new URLSearchParams(window.location.search);
    params.set("type", next);
    if (origin !== "kitchen") params.set("from", origin);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  }
  const statusOptions = source === "ORDER" ? orderStatuses : source === "PRODUCTION" ? productionStatuses : [...orderStatuses, ...productionStatuses];
  const fallback = origin === "orders" ? "/staff/kitchen/orders" : origin === "production" ? "/staff/production" : "/staff/kitchen";
  const shown = entries
    .filter(item => (status === "ALL" || item.status === status) && `${item.code} ${item.title} ${item.reference} ${item.employeeCode ?? ""}`.toLocaleLowerCase("vi").includes(search.trim().toLocaleLowerCase("vi")))
    .sort((a, b) => sort === "oldest" ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() : sort === "code" ? a.code.localeCompare(b.code, "vi") : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return <div className="mrp-page">
    <BackLink href={fallback} />
    <div className="stock-title-row"><h1>Lịch sử chế biến</h1><button className="stock-icon-button stock-refresh" type="button" aria-label="Tải lại lịch sử chế biến" title="Tải lại" onClick={() => setRevision(value => value + 1)}><Icon name="refresh" /></button></div>
    <p className="mrp-hint">Lịch sử chế biến theo order và theo lệnh sản xuất trong chi nhánh.</p>
    <label className="stock-label">Loại lịch sử<select value={source} onChange={e => changeSource(e.target.value as Source)}>{Object.entries(sourceLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
    <div className="staff-search-toolbar"><SearchInput value={search} onChange={setSearch} label="Tìm lịch sử chế biến" hint="Mã phiếu, lệnh, bàn hoặc món" /><SortSelect value={sort} onChange={setSort} label="Sắp xếp lịch sử" options={[["newest", "Mới nhất"], ["oldest", "Cũ nhất"], ["code", "Mã A–Z"]]} /></div>
    <div className="mrp-filters">{[["ALL", "Tất cả"], ...statusOptions.map(key => [key, statusLabels[key]] as [string, string])].map(([key, label]) => <button key={key} aria-pressed={status === key} className={status === key ? "active" : ""} onClick={() => setStatus(key)}>{label}</button>)}</div>
    {loading && <p role="status">Đang tải…</p>}{error && <p role="alert" className="mrp-alert">{error}</p>}{!loading && !error && shown.length === 0 && <p className="mrp-hint">Chưa có kết quả chế biến phù hợp.</p>}
    {shown.map(item => <button type="button" className="card issue-card" key={`${item.type}-${item.code}`} onClick={() => setSelected(item)} aria-label={`Xem chi tiết ${item.title}`}>
      <span className="issue-card-top"><strong>{item.title}</strong><Badge tone={item.status === "APPROVED" || item.status === "READY" || item.status === "SERVED" ? "green" : item.status === "REJECTED" || item.status === "CANCELLED" ? "red" : "amber"}>{statusLabels[item.status] ?? item.status}</Badge></span>
      <span className="issue-meta">{dateTime(item.createdAt)} · {item.type === "ORDER" ? "Theo order" : `Phiếu ${item.code}`}</span>
      <span className="issue-item"><span><strong>{item.reference}</strong><small>{item.employeeCode ? `NV ${item.employeeCode}` : ""}</small></span><strong>{item.type === "ORDER" ? `× ${item.quantity}` : `Báo ${item.quantity}`}</strong></span>
    </button>)}
    <dialog ref={dialog} className="stock-dialog" onClose={() => setSelected(null)} aria-labelledby="production-history-detail">
      <button className="stock-close" type="button" aria-label="Đóng" onClick={() => dialog.current?.close()}>×</button>
      {selected && <><div className="detail-heading"><span>{selected.type === "ORDER" ? "MÓN THEO ORDER" : "ĐỢT CHẾ BIẾN"}</span><h2 id="production-history-detail">Chi tiết kết quả</h2><p>{selected.code}</p></div>
        <dl className="detail-grid"><div><dt>Trạng thái</dt><dd>{statusLabels[selected.status] ?? selected.status}</dd></div><div><dt>Thời gian</dt><dd>{dateTime(selected.createdAt)}</dd></div><div><dt>Thành phẩm</dt><dd>{selected.title}</dd></div><div><dt>{selected.type === "ORDER" ? "Order / bàn" : "Lệnh sản xuất"}</dt><dd>{selected.reference}</dd></div>{selected.employeeCode && <div><dt>Nhân viên phụ trách</dt><dd>{selected.employeeCode}</dd></div>}{selected.type === "ORDER" ? <div><dt>Số lượng món</dt><dd>{selected.quantity}</dd></div> : <><div><dt>Kế hoạch</dt><dd>{selected.plannedQuantity}</dd></div><div><dt>Báo đợt này</dt><dd>{selected.quantity}</dd></div><div><dt>Đã duyệt</dt><dd>{selected.acceptedQuantity ?? "Chưa duyệt"}</dd></div><div><dt>Không đạt</dt><dd>{selected.rejectedQuantity ?? "Chưa kiểm tra"}</dd></div></>}{selected.note && <div><dt>{selected.type === "ORDER" ? "Ghi chú món" : "Ghi chú kiểm tra"}</dt><dd>{selected.note}</dd></div>}</dl>
      </>}
    </dialog>
  </div>;
}

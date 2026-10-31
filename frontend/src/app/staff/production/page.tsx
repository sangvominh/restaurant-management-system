"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/staff/ui";
import Link from "next/link";
import "./production.css";

type Order = { code: string; productCode: string; quantity: string; status: string; materialStatus: string };
type Material = { materialCode: string; materialName: string; unitName: string; required: string; available: string; missing: string; status: string };
type Check = { canProduce: boolean; materials: Material[] };
type Movements = { movements: { materialCode: string; materialName: string; lotCode: string; locationName: string; unitName: string; quantityChange: string; createdAt: string }[] };
type Detail = Order & { branchName: string; materials: { materialCode: string; materialName: string; unitName: string; requiredQuantity: string }[] };
type Progress = { phase: string; assignedEmployeeCode: string | null };
const phases: Record<string, string> = { WAITING_CONFIRMATION: "Chờ xác nhận", WAITING_MATERIALS: "Chờ nguyên liệu", WAITING_ISSUE: "Chờ cấp nguyên liệu", WAITING_ASSIGNMENT: "Chờ giao nhân viên", READY_TO_START: "Sẵn sàng bắt đầu", PRODUCING: "Đang sản xuất", WAITING_APPROVAL: "Chờ duyệt", COMPLETED: "Hoàn thành", CANCELLED: "Đã hủy" };
const statuses: Record<string, string> = { NEW: "Mới tạo", PENDING: "Chờ thực hiện", IN_PROGRESS: "Đang thực hiện", COMPLETED: "Hoàn thành", CANCELLED: "Đã hủy", WAITING_APPROVAL: "Chờ duyệt", UNCHECKED: "Chưa kiểm tra", ENOUGH: "Đủ nguyên liệu", SHORTAGE: "Thiếu nguyên liệu", ISSUED: "Đã cấp nguyên liệu" };
async function request<T>(path: string, method = "GET"): Promise<T> {
  const response = await fetch(`/api/mrp/${path}`, { method, cache: "no-store" });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(typeof result.message === "string" ? result.message : "Không kết nối được API kho thử nghiệm.");
  return result.data as T;
}
export default function ProductionPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [check, setCheck] = useState<Check | null>(null);
  const [movements, setMovements] = useState<Movements | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  async function load() { try { setOrders(await request<Order[]>("production-orders")); setError(""); } catch (e) { setError(e instanceof Error ? e.message : "Không tải được lệnh."); } }
  useEffect(() => {
    let active = true;
    request<Order[]>("production-orders").then(data => { if (active) setOrders(data); }).catch(e => { if (active) setError(e instanceof Error ? e.message : "Không tải được lệnh."); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  async function action(actionName: "check-materials" | "start") {
    if (!selected || busy) return;
    setBusy(true); setError(""); setMessage("");
    try {
      if (actionName === "check-materials") { const result = await request<Check>(`production-orders/${encodeURIComponent(selected.code)}/check-materials`, "POST"); setCheck(result); setSelected({ ...selected, materialStatus: result.canProduce ? "ENOUGH" : "SHORTAGE" }); }
      else { await request(`production-orders/${encodeURIComponent(selected.code)}/start`, "POST"); setMessage(`Đã bắt đầu sản xuất lệnh ${selected.code}.`); setSelected(null); setCheck(null); }
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Thao tác thất bại."); }
    finally { setBusy(false); }
  }
  async function loadMovements() {
    if (!selected || busy) return;
    setBusy(true); setError("");
    try { setMovements(await request<Movements>(`production-orders/${encodeURIComponent(selected.code)}/material-movements`)); }
    catch (e) { setError(e instanceof Error ? e.message : "Không tải được lịch sử nguyên liệu."); }
    finally { setBusy(false); }
  }
  async function openOrder(order: Order) {
    setSelected(order); setCheck(null); setMovements(null); setDetail(null); setProgress(null); setError(""); setDetailLoading(true);
    try {
      const path = `production-orders/${encodeURIComponent(order.code)}`;
      const [d, p] = await Promise.all([request<Detail>(path), request<Progress>(`${path}/progress`)]);
      setDetail(d); setProgress(p); setSelected(d);
    } catch (e) { setError(e instanceof Error ? e.message : "Không tải được chi tiết lệnh."); }
    finally { setDetailLoading(false); }
  }
  const visible = orders.filter(o => (filter === "ALL" || o.status === filter) && `${o.code} ${o.productCode}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="mrp-page">
    {message && <p role="status" className="mrp-ok">{message}</p>}
    {selected ? <>
      <button className="mrp-back" onClick={() => { setSelected(null); setCheck(null); setError(""); }}>← Danh sách lệnh</button>
      <section className="mrp-card mrp-detail"><div className="mrp-top"><span>LỆNH SẢN XUẤT <strong>#{selected.code}</strong></span><span className="mrp-tag">{statuses[selected.status] ?? selected.status}</span></div><h1>{selected.productCode}</h1><p>Kế hoạch: <strong>{selected.quantity}</strong></p><p className="mrp-state">{statuses[selected.materialStatus] ?? selected.materialStatus}</p></section>
      {error && <p role="alert" className="mrp-alert">{error}</p>}
      {detailLoading && <p role="status">Đang tải chi tiết…</p>}
      {progress && <section className="mrp-card"><h2>Tiến độ lệnh</h2><p>{phases[progress.phase] ?? progress.phase}</p><p>Nhân viên được giao: {progress.assignedEmployeeCode ?? "Chưa giao"}</p></section>}
      <h2 className="mrp-heading">Bảng định lượng nguyên liệu</h2>
      {detail && !check && <section className="mrp-card"><h2>Nguyên liệu theo công thức</h2>{detail.materials.map(m => <p key={m.materialCode}>{m.materialName}: {m.requiredQuantity} {m.unitName}</p>)}</section>}
      {check ? <><p className={check.canProduce ? "mrp-ok" : "mrp-alert"}>{check.canProduce ? "Đủ nguyên liệu" : "Cảnh báo thiếu nguyên liệu tồn kho"}</p>{check.materials.map(m => <section key={m.materialCode} className={`mrp-card mrp-material ${m.status === "SHORTAGE" ? "missing" : ""}`}><div className="mrp-top"><strong>{m.materialName}</strong><span className="mrp-tag">{Number(m.missing) > 0 ? `Thiếu ${m.missing} ${m.unitName}` : "Đủ"}</span></div><div className="mrp-figures"><span>Lượng cần<br/><strong>{m.required} {m.unitName}</strong></span><span>Khả dụng<br/><strong>{m.available} {m.unitName}</strong></span><span>Còn thiếu<br/><strong>{m.missing} {m.unitName}</strong></span></div></section>)}</> : <p className="mrp-hint">{selected.materialStatus === "ISSUED" ? "Nguyên liệu đã được cấp cho lệnh." : "Chọn kiểm tra nguyên liệu để xem lượng cần và tồn khả dụng."}</p>}
      {selected.materialStatus === "ISSUED" && <><button className="mrp-secondary mrp-history-button" disabled={busy} onClick={() => void loadMovements()}>Xem nguyên liệu đã cấp</button>{movements && <section className="mrp-card"><h2>Lịch sử cấp nguyên liệu</h2>{movements.movements.length === 0 ? <p>Chưa có giao dịch.</p> : movements.movements.map((m, i) => <p key={`${m.materialCode}-${m.lotCode}-${i}`}>{m.materialName}: {Math.abs(Number(m.quantityChange))} {m.unitName} · Lô {m.lotCode} · {m.locationName}</p>)}</section>}</>}
      <div className="mrp-actions"><button className="mrp-secondary" disabled={busy || detailLoading || !["NEW", "PENDING"].includes(selected.status) || selected.materialStatus === "ISSUED"} onClick={() => void action("check-materials")}>Kiểm tra nguyên liệu</button><button className="mrp-primary" disabled={busy || detailLoading || progress?.phase !== "READY_TO_START"} onClick={() => void action("start")}>Bắt đầu sản xuất</button></div>
    </> : <>
      <Link className="mrp-back" href="/staff">← Trang chủ</Link>
      <h1>Lệnh sản xuất</h1><Link className="mrp-open" href="/staff/material-issues">Theo dõi phiếu xuất nguyên liệu →</Link><Link className="mrp-open" href="/staff/finished-goods">Theo dõi phiếu nhập thành phẩm →</Link><label className="mrp-search"><Icon name="search"/><input aria-label="Tìm mã lệnh hoặc sản phẩm" value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm mã lệnh, sản phẩm" /></label>
      <div className="mrp-filters">{[["ALL", "Tất cả"], ["NEW", "Mới tạo"], ["PENDING", "Chờ thực hiện"], ["IN_PROGRESS", "Đang thực hiện"], ["COMPLETED", "Hoàn thành"]].map(([key,label]) => <button key={key} aria-pressed={filter === key} className={filter === key ? "active" : ""} onClick={() => setFilter(key)}>{label}</button>)}</div>
      <section className="mrp-card mrp-summary"><h2><Icon name="fact_check"/> Tổng quan sản xuất</h2><div className="mrp-summary-grid"><div><strong>{orders.length}</strong><span>Lệnh sản xuất</span></div><div><strong>{orders.filter(o => o.materialStatus === "SHORTAGE").length}</strong><span>Thiếu nguyên liệu</span></div></div><button onClick={() => void load()}>↻ Tải lại</button></section>
      {error && <p role="alert" className="mrp-alert">{error}</p>}{loading && <p role="status">Đang tải lệnh…</p>}{!loading && visible.length === 0 && !error && <p className="mrp-hint">Không có lệnh phù hợp.</p>}
      {visible.map(order => <button key={order.code} className={`mrp-card mrp-order ${order.materialStatus === "SHORTAGE" ? "shortage" : ""}`} onClick={() => void openOrder(order)}><div className="mrp-top"><strong className="mrp-code">{order.code}</strong><span className="mrp-tag">{statuses[order.status] ?? order.status}</span></div><h2>{order.productCode}</h2><p>Số lượng: <strong>{order.quantity}</strong></p><div className={order.materialStatus === "SHORTAGE" ? "mrp-alert" : "mrp-state"}>{statuses[order.materialStatus] ?? order.materialStatus}</div><span className="mrp-open">Xem chi tiết lệnh →</span></button>)}
    </>}
  </div>;
}

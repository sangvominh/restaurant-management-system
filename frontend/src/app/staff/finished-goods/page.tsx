"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../production/production.css";
import { loadReceipts } from "../receipt-list";
type Receipt = { receiptCode: string; orderCode: string; productCode: string; branchCode: string; plannedQuantity: string; reportedQuantity: string; acceptedQuantity: string | null; status: string; note: string | null; createdAt: string };
const labels: Record<string, string> = { PENDING: "Chờ duyệt", APPROVED: "Đã duyệt", REJECTED: "Từ chối" };
export default function FinishedGoods() {
  const [status, setStatus] = useState("ALL");
  const [items, setItems] = useState<Receipt[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    loadReceipts<Receipt>("finished-goods-receipts", status).then(data => { if (active) { setItems(data); setError(""); } }).catch(e => { if (active) setError(e instanceof Error ? e.message : "Không tải được phiếu."); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [status]);
  return <div className="mrp-page"><Link className="staff-back" href="/staff/production">← Lệnh sản xuất</Link><h1>Phiếu nhập thành phẩm</h1><p className="mrp-hint">Danh sách thử nghiệm chưa lọc theo nhân viên hoặc chi nhánh.</p><div className="mrp-filters">{Object.entries({ ALL: "Tất cả", ...labels }).map(([key,label]) => <button key={key} aria-pressed={status === key} className={status === key ? "active" : ""} onClick={() => { if (key !== status) { setLoading(true); setItems([]); setStatus(key); } }}>{label}</button>)}</div>{loading && <p role="status">Đang tải…</p>}{error && <p role="alert" className="mrp-alert">{error}</p>}{!loading && !error && items.length === 0 && <p className="mrp-hint">Không có phiếu ở trạng thái này.</p>}{items.map(item => <section className="mrp-card mrp-detail" key={item.receiptCode}><div className="mrp-top"><strong className="mrp-code">{item.receiptCode}</strong><span className={`mrp-tag mrp-status-${item.status.toLowerCase()}`}>{labels[item.status] ?? item.status}</span></div><h2>{item.productCode}</h2><p>Lệnh: {item.orderCode} · Chi nhánh: {item.branchCode}</p><p>Kế hoạch: {item.plannedQuantity} · Báo hoàn thành: {item.reportedQuantity}</p>{item.acceptedQuantity !== null && <p>Đã chấp nhận: {item.acceptedQuantity}</p>}{item.note && <p>Ghi chú: {item.note}</p>}</section>)}</div>;
}

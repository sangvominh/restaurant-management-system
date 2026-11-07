"use client";

import { useEffect, useState } from "react";
import Pagination, { usePagination } from "@/components/shared/pagination";
import { warehouseRequest } from "@/services/api";

interface ReportRow {
  code: string; name: string; unit: string; opening: string | null; received: string; issued: string;
  wasted: string; returned: string; otherChange: string; closing: string | null; historyComplete: boolean;
}
interface ReportData {
  period: { start: string; end: string; asOf: string };
  rows: ReportRow[]; warnings: string[];
}
const numbers = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 3 });

export default function InventoryReport() {
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" }).format(new Date());
  const [itemType, setItemType] = useState("MATERIAL");
  const [period, setPeriod] = useState("MONTH");
  const [year, setYear] = useState(today.slice(0, 4));
  const [month, setMonth] = useState(String(Number(today.slice(5, 7))));
  const [quarter, setQuarter] = useState(String(Math.ceil(Number(today.slice(5, 7)) / 3)));
  const [search, setSearch] = useState("");
  const [data, setData] = useState<ReportData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setData(null); setError(""); setLoading(true);
    const query = new URLSearchParams({ itemType, period, year });
    if (period === "MONTH") query.set("month", month);
    if (period === "QUARTER") query.set("quarter", quarter);
    warehouseRequest<ReportData>("/reports/inventory?" + query, { signal: controller.signal })
      .then(result => { if (active) setData(result); })
      .catch(cause => { if (active) setError(cause instanceof Error ? cause.message : "Không tải được báo cáo."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; controller.abort(); };
  }, [itemType, period, year, month, quarter, reload]);
  const query = search.trim().toLocaleLowerCase("vi");
  const filtered = (data?.rows ?? []).filter(row => !query || [row.code, row.name].some(value => value.toLocaleLowerCase("vi").includes(query)));
  const pages = usePagination(filtered, [itemType, period, year, month, quarter, query].join("|"));
  const quantity = (value: string | null) => value === null ? "Chưa đủ lịch sử" : numbers.format(Number(value));
  return <>
    <div className="page-heading workspace-heading"><h1>Báo cáo nhập xuất tồn</h1><button className="button button-secondary" disabled={loading} onClick={() => setReload(value => value + 1)}>Tải lại</button></div>
    <div className="tabs-row" role="tablist" aria-label="Loại hàng báo cáo">
      {[["MATERIAL", "Nguyên vật liệu"], ["PRODUCT", "Thành phẩm"]].map(([value, label]) => <button key={value} role="tab" aria-selected={itemType === value} className={"tab-button " + (itemType === value ? "tab-active" : "")} onClick={() => setItemType(value)}>{label}</button>)}
    </div>
    <div className="panel report-filters">
      <label>Kỳ báo cáo<select aria-label="Kỳ báo cáo" value={period} onChange={event => setPeriod(event.target.value)}><option value="MONTH">Tháng</option><option value="QUARTER">Quý</option><option value="YEAR">Năm</option></select></label>
      <label>Năm<select aria-label="Năm báo cáo" value={year} onChange={event => setYear(event.target.value)}>{Array.from({ length: Number(today.slice(0, 4)) - 1999 }, (_, i) => Number(today.slice(0, 4)) - i).map(value => <option key={value} value={value}>{value}</option>)}</select></label>
      {period === "MONTH" && <label>Tháng<select aria-label="Tháng báo cáo" value={month} onChange={event => setMonth(event.target.value)}>{Array.from({ length: 12 }, (_, i) => i + 1).map(value => <option key={value} value={value}>Tháng {value}</option>)}</select></label>}
      {period === "QUARTER" && <label>Quý<select aria-label="Quý báo cáo" value={quarter} onChange={event => setQuarter(event.target.value)}>{[1,2,3,4].map(value => <option key={value} value={value}>Quý {value}</option>)}</select></label>}
      <label>Tìm mã/tên<input aria-label="Tìm trong báo cáo" placeholder="Mã hoặc tên NVL / thành phẩm" value={search} onChange={event => setSearch(event.target.value)}/></label>
    </div>
    {error && <p className="form-error" role="alert">{error}</p>}
    {data?.warnings.map(warning => <p className="report-warning" role="status" key={warning}>{warning}</p>)}
    {data && <p className="data-limit-note">Theo giờ Việt Nam, mọi vị trí kho. Báo cáo chụp lúc {new Date(data.period.asOf).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}. Với kỳ đang mở, tồn cuối là số dư hiện tại.</p>}
    <div className="panel workspace-table-panel fit-table-panel report-fit-panel">
      {loading ? <div className="inventory-empty" role="status">Đang tổng hợp báo cáo…</div> : !data ? <div className="inventory-empty">Chưa tải được báo cáo.</div> : !filtered.length ? <div className="inventory-empty">Không có dữ liệu phù hợp.</div> : <div className="table-wrap">
        <table className="data-table workspace-table report-table"><thead><tr>{["MÃ","TÊN","ĐƠN VỊ","TỒN ĐẦU","NHẬP","XUẤT","TỒN CUỐI / LƯU KHO"].map(label => <th key={label}>{label}</th>)}</tr></thead>
          <tbody>{pages.items.map(row => <tr key={row.code}><td data-label="Mã"><div className="fit-cell-value">{row.code}</div></td><td data-label="Tên"><div className="fit-cell-value">{row.name}</div></td><td data-label="Đơn vị"><div className="fit-cell-value">{row.unit}</div></td>{[row.opening,row.received,row.issued,row.closing].map((value,index) => <td key={index} data-label={["Tồn đầu","Nhập","Xuất","Tồn cuối / Lưu kho"][index]}><div className="fit-cell-value">{quantity(value)}</div></td>)}</tr>)}</tbody>
        </table><Pagination {...pages.controls}/>
      </div>}
    </div>
  </>;
}

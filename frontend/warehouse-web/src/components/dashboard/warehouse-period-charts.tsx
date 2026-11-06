"use client";

import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export interface PeriodSummary {
  label: string;
  from: string;
  to: string;
  amount: number | null;
  receiptCount: number | null;
  wasteCount: number | null;
  quantities: Record<string, number>;
}

const numbers = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 3 });
const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
const compact = new Intl.NumberFormat("vi-VN", { notation: "compact" });

function PeriodBars({ data, unit, color }: {
  data: Array<{ label: string; value: number | null }>;
  unit: string;
  color: string;
}) {
  const format = (value: number) => unit === "₫" ? money.format(value) : numbers.format(value) + " " + unit;
  return <>
    {data.every(item => item.value === null) ? <div className="inventory-empty">Chưa đủ dữ liệu để vẽ biểu đồ.</div> :
      <div className="period-chart" role="img" aria-label={"Biểu đồ theo kỳ, đơn vị " + unit}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eeeae5"/>
            <XAxis dataKey="label" tick={{ fontSize: 14 }} tickLine={false}/>
            <YAxis tick={{ fontSize: 13 }} tickFormatter={value => compact.format(value)} allowDecimals={unit !== "phiếu"} width={65}/>
            <Tooltip formatter={value => format(Number(value))} cursor={{ fill: "#f7f2ed" }}/>
            <Bar dataKey="value" name={unit === "₫" ? "Tiền nhập kho" : "Hao hụt đã duyệt"} fill={color} radius={[5, 5, 0, 0]} maxBarSize={64}/>
          </BarChart>
        </ResponsiveContainer>
      </div>}
    <ul className="period-chart-values">{data.map(item => <li key={item.label}><span>{item.label}</span><strong>{item.value === null ? "Chưa đủ dữ liệu" : format(item.value)}</strong></li>)}</ul>
  </>;
}

export default function WarehousePeriodCharts({ rows }: { rows: PeriodSummary[] }) {
  const [metric, setMetric] = useState("count");
  const units = [...new Set(rows.flatMap(row => Object.keys(row.quantities)))].sort();
  const wasteData = rows.map(row => ({
    label: row.label,
    value: row.wasteCount === null ? null : metric === "count" ? row.wasteCount : (row.quantities[metric] ?? 0),
  }));
  return <section className="warehouse-report-charts" aria-label="Báo cáo nhập kho và hao hụt">
    <div className="panel">
      <div className="panel-header"><h2>Tiền nhập kho</h2><span className="chart-unit">VNĐ</span></div>
      <PeriodBars data={rows.map(row => ({ label: row.label, value: row.amount }))} unit="₫" color="#b36a48"/>
      <p className="period-summary-note">Số lượng × đơn giá của phiếu đã ghi nhận.</p>
      {rows.some(row => row.amount === null) && <p className="form-error" role="alert">Chưa đủ dữ liệu một số kỳ: danh sách giới hạn 50 phiếu nhập hoặc không tải được chi tiết.</p>}
    </div>
    <div className="panel">
      <div className="panel-header"><h2>Hao hụt NVL</h2><label className="chart-unit">Thống kê<select aria-label="Đơn vị biểu đồ hao hụt" value={metric} onChange={event => setMetric(event.target.value)}>
        <option value="count">Số phiếu đã duyệt</option>
        {units.map(unit => <option key={unit} value={unit}>Số lượng ({unit})</option>)}
      </select></label></div>
      <PeriodBars data={wasteData} unit={metric === "count" ? "phiếu" : metric} color="#79968b"/>
      <p className="period-summary-note">Theo thời gian duyệt; gồm NVL trong kho và đã lĩnh. Tách theo đơn vị.</p>
      {rows.some(row => row.wasteCount === null) && <p className="form-error" role="alert">Chưa đủ dữ liệu một số kỳ: danh sách giới hạn 100 phiếu hao hụt hoặc thiếu dữ liệu phê duyệt.</p>}
    </div>
    <p className="period-summary-note period-summary-timing">Theo giờ Việt Nam. Các kỳ tính lũy kế đến hôm nay, không cộng ba cột với nhau.</p>
  </section>;
}

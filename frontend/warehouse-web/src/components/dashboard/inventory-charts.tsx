"use client";

import { useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis,
  Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts";
import type { InventoryItem } from "@/types/inventory";

const colors = ["#b36a48", "#78958a", "#d4ac66", "#7996ad", "#a88bab", "#a4ad72"];
const numbers = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 3 });

export default function InventoryCharts({ inventory }: { inventory: InventoryItem[] }) {
  const units = [...new Set(inventory.map(item => item.unit))].sort();
  const [unit, setUnit] = useState(units[0] ?? "");
  const materials = inventory.filter(item => item.unit === unit)
    .sort((a, b) => a.availableStock - b.availableStock)
    .slice(0, 8);
  const categoryCounts = new Map<string, number>();
  for (const item of inventory) {
    const category = item.category || "Chưa có danh mục";
    categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
  }
  const categories = [...categoryCounts].map(([name, value]) => ({ name, value }));

  return <section className="warehouse-charts" aria-label="Biểu đồ tồn kho hiện tại">
    <div className="panel">
      <div className="panel-header">
        <div><h2>Tồn khả dụng và mức tối thiểu</h2><p>Tối đa 8 NVL có tồn khả dụng thấp nhất trong cùng đơn vị.</p></div>
        {units.length > 0 && <label className="chart-unit">Đơn vị
          <select aria-label="Đơn vị biểu đồ tồn kho" value={unit} onChange={event => setUnit(event.target.value)}>
            {units.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>}
      </div>
      {!materials.length ? <div className="inventory-empty">Chưa có dữ liệu tồn kho để vẽ biểu đồ.</div> :
        <div className="warehouse-chart" role="img" aria-label={"Tồn khả dụng và mức tối thiểu theo " + unit}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={materials} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eeeae5"/>
              <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={value => numbers.format(value)}/>
              <YAxis type="category" dataKey="name" width={138} tick={{ fontSize: 12 }} tickFormatter={value => value.length > 20 ? value.slice(0, 19) + "…" : value}/>
              <Tooltip formatter={value => numbers.format(Number(value))}/>
              <Legend wrapperStyle={{ fontSize: 12 }}/>
              <Bar dataKey="availableStock" name={"Khả dụng (" + unit + ")"} fill="#b36a48" radius={[0, 4, 4, 0]}/>
              <Bar dataKey="minStock" name={"Tối thiểu (" + unit + ")"} fill="#9cb1a8" radius={[0, 4, 4, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>}
    </div>
    <div className="panel">
      <div className="panel-header"><div><h2>Nguyên vật liệu theo danh mục</h2><p>Số loại NVL, không cộng chung các đơn vị tồn kho.</p></div></div>
      {!categories.length ? <div className="inventory-empty">Chưa có dữ liệu danh mục để vẽ biểu đồ.</div> :
        <>
          <div className="warehouse-donut" role="img" aria-label={"Phân bố " + inventory.length + " loại nguyên vật liệu theo danh mục"}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categories} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="82%" paddingAngle={3}>
                  {categories.map((category, index) => <Cell key={category.name} fill={colors[index % colors.length]}/>)}
                </Pie>
                <Tooltip formatter={value => Number(value) + " loại NVL"}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="warehouse-chart-legend">
            {categories.map((category, index) => <li key={category.name}><span><i style={{ background: colors[index % colors.length] }}/>{category.name}</span><strong>{category.value} loại</strong></li>)}
          </ul>
        </>}
    </div>
  </section>;
}

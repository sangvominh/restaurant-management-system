"use client";
import { ActionLink, Badge, Card, Icon } from "@/components/staff/ui";
import { ResourceState, useResource, useStaff } from "@/components/staff/context";
import { money, type Overview } from "@/lib/api";
export default function Staff() {
  const { user } = useStaff();
  const { data, error, reload } = useResource<Overview>("staff/overview");
  const occupied = data?.tables.filter(table => table.invoices.length > 0).length ?? 0;
  const pending = data?.kitchen.flatMap(order => order.lines).filter(line => line.status === "QUEUED").length ?? 0;
  return <div className="space-y-5">
    <Card className="welcome-card"><div className="flex justify-between gap-4"><div><p className="muted text-xs mb-2">{user.branch.name}</p><h1>Xin chào, {user.name}</h1><p className="muted mt-2">Chúc bạn một ca làm việc hiệu quả.</p></div><Badge tone={data?.shift ? "green" : "gray"}>{data?.shift ? "Đang trong ca" : "Chưa vào ca"}</Badge></div></Card>
    <ResourceState error={error} loading={!data && !error} retry={reload} />
    {data && <div className="stats-grid">{[["table_restaurant", `${occupied} / ${data.tables.length}`, "Bàn đang phục vụ"], ["receipt_long", `${data.invoices.length}`, "Hóa đơn đang mở"], ["skillet", `${pending}`, "Món chờ bếp"], ...(data.revenue === null ? [] : [["payments", money(data.revenue), "Doanh thu hôm nay"]])].map(([icon, value, label]) => <Card key={label} className="stat-card"><span className="stat-icon stat-blue"><Icon name={icon} /></span><div className="mt-4"><strong className="metric">{value}</strong></div><p className="muted text-xs mt-1">{label}</p></Card>)}</div>}
    <div className="section-title"><h2>Thao tác nhanh</h2></div><div className="quick-actions">{user.role === "CASHIER" ? <ActionLink href="/staff/invoices"><Icon name="receipt_long" /> Xem hóa đơn</ActionLink> : <><ActionLink href="/staff/kitchen/orders"><Icon name="receipt_long" /> Món theo order</ActionLink><ActionLink href="/staff/production"><Icon name="skillet" /> Lệnh sản xuất</ActionLink><ActionLink href="/staff/inventory"><Icon name="warehouse" /> Tồn kho</ActionLink><ActionLink href="/staff/kitchen-inventory"><Icon name="inventory_2" /> Tồn bếp</ActionLink></>}</div>
  </div>;
}

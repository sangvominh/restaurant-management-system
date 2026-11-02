"use client";
import { useState } from "react";
import { Badge, Card } from "@/components/staff/ui";
import { ResourceState, useResource } from "@/components/staff/context";
import { dateTime, money, statuses, type Invoice } from "@/lib/api";

export default function InvoicesPage() {
  const { data, error, reload } = useResource<Invoice[]>("staff/invoices");
  const [filter, setFilter] = useState<"ALL" | "OPEN" | "PAID">("ALL");
  const shown = data?.filter(invoice => filter === "ALL" || invoice.status === filter);
  return <div className="space-y-5">
    <h1>Hóa đơn</h1>
    <p className="muted">Theo dõi hóa đơn và trạng thái món tại chi nhánh. Thanh toán trên giao diện đang được hoàn thiện.</p>
    <div className="status-filters">{([["ALL", "Tất cả"], ["OPEN", "Chưa thanh toán"], ["PAID", "Đã thanh toán"]] as const).map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}</div>
    <ResourceState error={error} loading={!data && !error} retry={reload}/>
    {shown?.length === 0 && <p className="muted">Không có hóa đơn phù hợp.</p>}
    {shown?.map(invoice => <Card key={invoice.id}>
      <div className="flex justify-between gap-4"><div><h2>{invoice.table.name} · {invoice.guestName}</h2><p className="muted mt-2">{dateTime(invoice.createdAt)} · Mã {invoice.id.slice(0,8)}</p></div><Badge tone={invoice.status === "PAID" ? "green" : "amber"}>{invoice.status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}</Badge></div>
      <div className="mt-4">{invoice.orders.flatMap(order => order.lines).map(line => <div key={line.id} className="flex justify-between gap-4 mt-2"><span>{line.quantity} × {line.name}{line.note && <span className="muted"> · {line.note}</span>}<br/><span className="muted">{statuses[line.status] ?? line.status}</span></span><span>{money(line.quantity * line.unitPrice)}</span></div>)}</div>
      <div className="flex justify-between gap-4 mt-4"><strong>Tổng cộng</strong><strong>{money(invoice.total)}</strong></div>
      {invoice.payment && <p className="muted mt-2">Tiền khách đưa: {money(invoice.payment.cashReceived)}</p>}
    </Card>)}
  </div>;
}

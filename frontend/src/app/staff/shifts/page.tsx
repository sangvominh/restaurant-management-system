"use client";
import { useEffect, useRef, useState } from "react";
import { Card, Badge, Button } from "@/components/staff/ui";
import { ResourceState, useResource, useStaff } from "@/components/staff/context";
import { dateTime, type Shift } from "@/lib/api";

export default function ShiftsPage() {
  const [selected, setSelected] = useState<Shift | null>(null); const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (selected && !dialog.current?.open) dialog.current?.showModal(); }, [selected]);
  const { user } = useStaff();
  const { data, error, reload } = useResource<Shift[]>("staff/shifts");
  const current = data?.find(shift => !shift.endedAt);
  return <div className="space-y-5">
    <h1>Ca làm việc</h1>
    <ResourceState error={error} loading={!data && !error} retry={reload} />
    {data && <>
      <Card>
        <div className="flex justify-between gap-4"><div><h2>Ca hiện tại</h2><p className="muted mt-2">{user.name} · {user.branch.name}</p></div><Badge tone={current ? "green" : "amber"}>{current ? "Đang trong ca" : "Chưa vào ca"}</Badge></div>
        {current ? <p className="mt-4">Bắt đầu: <strong>{dateTime(current.startedAt)}</strong></p> : <p className="muted mt-4">Hiện không có ca đang làm.</p>}
      </Card>
      <h2>Lịch sử ca gần đây</h2>
      {data.length === 0 && <p className="muted">Chưa có dữ liệu ca làm.</p>}
      {data.map(shift => <Card key={shift.id}><div className="flex justify-between gap-4"><strong>{dateTime(shift.startedAt)}</strong><Badge tone={shift.endedAt ? "blue" : "green"}>{shift.endedAt ? "Đã kết thúc" : "Đang làm"}</Badge></div>{shift.endedAt && <p className="muted mt-2">Kết thúc: {dateTime(shift.endedAt)}</p>}{shift.handoverNote && <p className="mt-2">Bàn giao: {shift.handoverNote}</p>}<Button secondary className="mt-4" onClick={() => setSelected(shift)}>Xem chi tiết</Button></Card>)}
    </>}
    <dialog ref={dialog} className="stock-dialog" onClose={() => setSelected(null)}><button className="stock-close" aria-label="Đóng" onClick={() => dialog.current?.close()}>×</button>{selected && <><h2>Chi tiết ca làm</h2><p className="muted">{user.name} · {user.branch.name}</p><p><Badge tone={selected.endedAt ? "blue" : "green"}>{selected.endedAt ? "Đã kết thúc" : "Đang làm"}</Badge></p><p>Bắt đầu: {dateTime(selected.startedAt)}</p><p>Kết thúc: {selected.endedAt ? dateTime(selected.endedAt) : "Chưa kết thúc"}</p><p>Bàn giao: {selected.handoverNote || "Không có ghi chú"}</p><Button secondary className="mt-4" onClick={() => dialog.current?.close()}>Đóng</Button></>}</dialog>
  </div>;
}

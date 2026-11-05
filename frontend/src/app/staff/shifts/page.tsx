"use client";
import { useEffect, useRef, useState } from "react";
import { Card, Badge, Icon } from "@/components/staff/ui";
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
      <div className="stock-title-row"><h2>Lịch sử ca gần đây</h2><button type="button" className="stock-icon-button stock-refresh" aria-label="Tải lại lịch sử ca" title="Tải lại" onClick={reload}><Icon name="refresh"/></button></div>
      {data.length === 0 && <p className="muted">Chưa có dữ liệu ca làm.</p>}
      {data.map(shift => <button type="button" className="card issue-card" key={shift.id} onClick={() => setSelected(shift)} aria-label={`Xem chi tiết ca bắt đầu ${dateTime(shift.startedAt)}`}><span className="issue-card-top"><strong>{dateTime(shift.startedAt)}</strong><Badge tone={shift.endedAt ? "blue" : "green"}>{shift.endedAt ? "Đã kết thúc" : "Đang làm"}</Badge></span>{shift.endedAt && <span className="issue-item">Kết thúc: {dateTime(shift.endedAt)}</span>}</button>)}
    </>}
    <dialog ref={dialog} className="stock-dialog" onClose={() => setSelected(null)} aria-labelledby="shift-detail-title"><button className="stock-close" type="button" aria-label="Đóng" onClick={() => dialog.current?.close()}>×</button>{selected && <><div className="detail-heading"><span>CA LÀM VIỆC</span><h2 id="shift-detail-title">Chi tiết ca làm</h2><p>{user.name} · {user.branch.name}</p></div><dl className="detail-grid"><div><dt>Trạng thái</dt><dd><Badge tone={selected.endedAt ? "blue" : "green"}>{selected.endedAt ? "Đã kết thúc" : "Đang làm"}</Badge></dd></div><div><dt>Bắt đầu</dt><dd>{dateTime(selected.startedAt)}</dd></div><div><dt>Kết thúc</dt><dd>{selected.endedAt ? dateTime(selected.endedAt) : "Chưa kết thúc"}</dd></div><div><dt>Bàn giao</dt><dd>{selected.handoverNote || "Không có ghi chú"}</dd></div></dl></>}</dialog>
  </div>;
}

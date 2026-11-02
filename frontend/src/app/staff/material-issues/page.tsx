"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Card, Button, Badge } from "@/components/staff/ui";
import { ResourceState, useResource } from "@/components/staff/context";
import { dateTime } from "@/lib/api";
type Issue = { code: string; status: string; createdAt: string; details: { name: string; lot: string; location: string; quantity: string; unit: string }[] };
const labels: Record<string, string> = { PENDING: "Chờ duyệt", APPROVED: "Đã duyệt", REJECTED: "Đã từ chối" };
export default function MaterialIssues() {
 const [detail, setDetail] = useState<Issue | null>(null); const dialog = useRef<HTMLDialogElement>(null);
 useEffect(() => { if (detail && !dialog.current?.open) dialog.current?.showModal(); }, [detail]);
 const [filter, setFilter] = useState("ALL");
 const { data, error, reload } = useResource<Issue[]>("staff/production-orders/material-requests");
 useEffect(() => { const refresh = () => { if (document.visibilityState === "visible") reload(); }; window.addEventListener("focus", refresh); return () => window.removeEventListener("focus", refresh); }, [reload]);
 return <div className="space-y-5"><Link className="staff-back" href="/staff/inventory">← Tồn nguyên vật liệu</Link><h1>Phiếu đề nghị của tôi</h1><Button secondary onClick={reload}>Tải lại</Button><div className="status-filters">{[["ALL","Tất cả"],["PENDING","Chờ duyệt"],["APPROVED","Đã duyệt"],["REJECTED","Từ chối"]].map(([key,label]) => <button key={key} className={filter === key ? "active" : ""} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div><ResourceState error={error} loading={!data && !error} retry={reload}/>{data?.length === 0 && <p>Chưa có phiếu đề nghị.</p>}{data?.filter(issue => filter === "ALL" || issue.status === filter).map(issue => <Card key={issue.code}><strong>{issue.code}</strong><p className="issue-meta"><Badge tone={issue.status === "APPROVED" ? "green" : issue.status === "REJECTED" ? "red" : "amber"}>{labels[issue.status] ?? issue.status}</Badge> <span>{dateTime(issue.createdAt)}</span></p>{issue.details.map((item, i) => <p key={i}>{item.name} · Lô {item.lot} · {item.quantity} {item.unit}</p>)}<Button secondary onClick={() => setDetail(issue)}>Xem chi tiết</Button></Card>)}<dialog ref={dialog} className="stock-dialog" onClose={() => setDetail(null)}><button className="stock-close" aria-label="Đóng" onClick={() => dialog.current?.close()}>×</button>{detail && <><h2>Chi tiết phiếu {detail.code}</h2><p>Trạng thái: {labels[detail.status] ?? detail.status}</p><p>Ngày tạo: {dateTime(detail.createdAt)}</p>{detail.details.map((item,i) => <p key={i}>{item.name} · Lô {item.lot} · {item.location} · {item.quantity} {item.unit}</p>)}</>}</dialog></div>;
}

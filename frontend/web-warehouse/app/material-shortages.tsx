'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api, can, type User } from './catalog-api';
type Report = { id: string; productionOrderId: string; quantity: string; reason: string; status: string; requestedAt: string; reviewNote: string | null; material: { name: string; unit: { symbol: string } }; productionOrder: { bom: { product: { name: string } } }; requestedBy: { name: string }; reviewedBy: { name: string } | null };
const names: Record<string, string> = { PENDING: 'Chờ tiếp nhận', PROCESSING: 'Đang bổ sung', RESOLVED: 'Đã sẵn sàng để đề nghị cấp', REJECTED: 'Không đáp ứng', CANCELLED: 'Đã rút' };
const announce = () => window.dispatchEvent(new Event('material-shortage-changed'));
export function ShortageReportForm({ orderId, materialId, name, unit, stock }: { orderId: string; materialId: string; name: string; unit: string; stock: number }) {
  const [quantity, setQuantity] = useState(''), [reason, setReason] = useState(''), [busy, setBusy] = useState(false), [message, setMessage] = useState('');
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setMessage('');
    try { await api('production/material-shortages', 'POST', { productionOrderId: orderId, materialId, quantity, reason }); setMessage('Đã gửi báo thiếu đến quản lý. Có thể xử lý NVL khác và quay lại sau khi kho bổ sung.'); setQuantity(''); setReason(''); announce(); }
    catch (e) { setMessage(e instanceof Error ? e.message : 'Không gửi được'); } finally { setBusy(false); }
  }
  return <details className="shortage-report"><summary>Báo thiếu {name} cho quản lý</summary><form onSubmit={submit}><fieldset disabled={busy}><p>Kho còn hạn: {stock.toLocaleString('vi-VN')} {unit}. Không có lô hoặc chưa đủ hàng thì báo tại đây.</p><label className="field">Số lượng cần kho chuẩn bị để cấp ({unit})<input required type="number" min="0.001" step="0.001" value={quantity} onChange={e => setQuantity(e.target.value)} /></label><label className="field">Lý do thiếu<textarea required maxLength={1000} rows={2} value={reason} onChange={e => setReason(e.target.value)} placeholder="Chưa nhập, hết hàng, chỉ còn lô hết hạn hoặc thiếu cho lệnh…" /></label><p className="footnote">Báo thiếu không giữ hàng hoặc trừ tồn. Kho có hàng rồi vẫn phải lập đề nghị cấp theo lô.</p>{message && <p role="status">{message}</p>}<button className="primary">{busy ? 'Đang gửi…' : 'Gửi báo thiếu NVL'}</button></fieldset></form></details>;
}
export default function MaterialShortages({ user, orderId }: { user: User; orderId?: string }) {
  const [rows, setRows] = useState<Report[]>([]), [error, setError] = useState(''), [busy, setBusy] = useState(false), [all, setAll] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const manager = can(user, 'production:manage', 'material:approve');
  const allowed = manager || can(user, 'material:request');
  const load = useCallback(async () => { if (!allowed) return; try { setRows(await api<Report[]>('production/material-shortages')); setError(''); } catch (e) { setError(e instanceof Error ? e.message : 'Không tải được báo thiếu'); } }, [allowed]);
  useEffect(() => { void load(); const timer = window.setInterval(() => void load(), 20000); const refresh = () => { void load(); }; window.addEventListener('material-shortage-changed', refresh); return () => { window.clearInterval(timer); window.removeEventListener('material-shortage-changed', refresh); }; }, [load]);
  async function review(r: Report, status: string) {
    if (!window.confirm('Xác nhận cập nhật báo thiếu?')) return;
    setBusy(true); setError('');
    try { await api(`production/material-shortages/${r.id}`, 'PUT', { status, reviewNote: notes[r.id] || '' }); await load(); announce(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Không cập nhật được'); } finally { setBusy(false); }
  }
  if (!allowed) return null;
  const relevant = rows.filter(r => !orderId || r.productionOrderId === orderId);
  const shown = relevant.filter(r => all || ['PENDING', 'PROCESSING'].includes(r.status));
  return <section className="execution-record shortage-panel"><div className="record-heading"><h3>Báo thiếu nguyên liệu</h3><button disabled={busy} onClick={() => void load()}>Tải lại</button></div><label className="worker-checkbox"><input type="checkbox" checked={all} onChange={e => setAll(e.target.checked)} />Xem cả báo thiếu đã kết thúc</label>{error && <p className="error" role="alert">{error}</p>}{!shown.length && <p>Không có báo thiếu chờ xử lý.</p>}{shown.map(r => <article className="execution-record" key={r.id}><strong>{r.material.name} · cần {Number(r.quantity).toLocaleString('vi-VN')} {r.material.unit.symbol}</strong><small>{r.productionOrder.bom.product.name} · Lệnh {r.productionOrderId.slice(0, 8)} · {r.requestedBy.name} · {new Date(r.requestedAt).toLocaleString('vi-VN')}</small><p>{names[r.status]} · {r.reason}</p>{r.reviewNote && <p>Phản hồi{r.reviewedBy ? ` (${r.reviewedBy.name})` : ''}: {r.reviewNote}</p>}{['PENDING', 'PROCESSING'].includes(r.status) && (manager ? <><label className="field">Phản hồi xử lý<input maxLength={1000} value={notes[r.id] || ''} onChange={e => setNotes({ ...notes, [r.id]: e.target.value })} placeholder="Nguồn bổ sung, tiến độ hoặc lý do không đáp ứng…" /></label><div className="actions"><button disabled={busy || !notes[r.id]?.trim()} onClick={() => void review(r, 'PROCESSING')}>Đang bổ sung</button><button disabled={busy || !notes[r.id]?.trim()} onClick={() => void review(r, 'RESOLVED')}>Đã sẵn sàng cấp</button><button disabled={busy || !notes[r.id]?.trim()} onClick={() => void review(r, 'REJECTED')}>Không đáp ứng</button></div></> : <button disabled={busy} onClick={() => void review(r, 'CANCELLED')}>Rút báo thiếu</button>)}</article>)}</section>;
}

'use client';
import { useCallback, useEffect, useState } from 'react';
import { api, can, type User } from './catalog-api';
import { Drawer } from './workspace-ui';
import { StatusBadge } from './status-ui';
import { DocumentTools } from './document-print';
import { statusInfo } from './status-ui';
import WorkerTicket from './worker-ticket';
import MaterialShortages from './material-shortages';
type Doc = { id: string; status: string; reason: string };
type Line = { id: string; requestedQuantity: string; issuedQuantity: string | null; lot: { id: string; materialId: string; code: string; material: { name: string; unit: { symbol: string } } }; returnLines: { id: string; quantity: string; return: Doc }[]; wasteLines: { id: string; quantity: string; waste: Doc }[] };
export type Detail = { order: { id: string; assignedAt: string; dueAt: string | null; status: string; quantity: string; assignedTo: { accountId: string | null }; bom: { outputQuantity: string; lines: { materialId: string; quantity: string; material: { name: string; unit: { symbol: string } } }[]; product: { name: string; unit: { symbol: string } } }; materialIssues: { id: string; status: string; reason: string; lines: Line[] }[]; runs: { id: string; status: string; actualQuantity: string; acceptedQuantity: string | null; inspectionNote: string | null }[] }; lots: { id: string; materialId: string; code: string; stock: string; daysRemaining: number | null; expiryDate: string | null; material: { status: string; name: string; unit: { symbol: string } } }[]; balances: { id: string; remaining: string }[] };
const fmt = (v: string | null) => Number(v || 0).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
export default function ExecutionPanel({ orderId, user, close, changed, overview }: { orderId: string; user: User; close: () => void; changed: () => Promise<void>; overview?: { assignedBy: string; assignedTo: string; dueAt: string | null; version: number; plan: { name: string; quantity: number; unit: string }[] } }) {
  const [data, setData] = useState<Detail>(), [error, setError] = useState(''), [busy, setBusy] = useState(false);
  const load = useCallback(async () => { try { setData(await api<Detail>(`production/orders/${orderId}/execution`)); } catch (e) { setError(e instanceof Error ? e.message : 'Không tải được'); } }, [orderId]);
  useEffect(() => { void load(); }, [load]);
  async function send(payload: object, confirm = false) {
    const command = payload as { action?: string; quantity?: string };
    const messages: Record<string, string> = {
      request: 'Gửi đề nghị cấp nguyên liệu? Kho chưa bị trừ cho đến khi duyệt.',
      approveIssue: 'Duyệt cấp đủ? Nguyên liệu sẽ được chuyển từ kho sang bếp.',
      rejectIssue: 'Từ chối đề nghị cấp nguyên liệu?',
      run: 'Ghi nhận sản lượng và tiêu hao thực tế? Nguyên liệu đã cấp sẽ được ghi nhận là đã sử dụng.',
      inspect: `Nghiệm thu ${command.quantity || '0'} thành phẩm đạt? Chỉ số lượng đạt được nhập tồn thành phẩm.`,
      return: 'Gửi đề nghị hoàn nguyên liệu dư? Chỉ khi kho duyệt mới tăng tồn kho.',
      waste: 'Gửi báo cáo hao hụt? Số lượng này sẽ được giữ lại để chờ duyệt.',
      approveReturn: 'Duyệt hoàn? Nguyên liệu sẽ được cộng lại vào kho.',
      rejectReturn: 'Từ chối hoàn? Số lượng giữ chờ duyệt được trả lại cho bếp xử lý.',
      approveWaste: 'Duyệt hao hụt nguyên liệu đã cấp? Không trừ kho nguyên liệu lần thứ hai.',
      rejectWaste: 'Từ chối báo cáo hao hụt?',
      complete: 'Đóng lệnh chế biến? Cần nghiệm thu và xử lý hết nguyên liệu dư trước khi đóng.',
    };
    if (confirm && !window.confirm(messages[command.action || ''] || 'Xác nhận thao tác?')) return false;
    setBusy(true); setError('');
    try { await api(`production/orders/${orderId}/execution`, 'POST', payload); await load(); await changed(); return true; }
    catch (e) { setError(e instanceof Error ? e.message : 'Không thực hiện được'); return false; }
    finally { setBusy(false); }
  }
  async function orderAction(action: 'receive' | 'cancel') {
    if (!window.confirm(action === 'receive' ? 'Nhận lệnh chế biến này?' : 'Hủy lệnh chưa nhận?')) return;
    setBusy(true); setError('');
    try { await api(`production/orders/${orderId}/${action}`, 'POST'); await load(); await changed(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Không thực hiện được'); } finally { setBusy(false); }
  }
  const lines = data?.order.materialIssues.filter(i => i.status === 'APPROVED').flatMap(i => i.lines) || [];
  const balance = (id: string) => data?.balances.find(b => b.id === id)?.remaining || '0';
  const mine = data?.order.assignedTo.accountId === user.id;
  const open = data && ['RECEIVED', 'IN_PROGRESS'].includes(data.order.status);
  const actions = [ ...(mine && open && can(user, 'material:request') ? [{ id: 'request', name: 'Yêu cầu cấp NVL' }, { id: 'return', name: 'Hoàn NVL dư' }] : []), ...(mine && open && can(user, 'production:perform') ? [{ id: 'run', name: 'Ghi nhận sản xuất' }] : []), ...(mine && open && can(user, 'waste:request') ? [{ id: 'waste', name: 'Báo hao hụt NVL đã cấp' }] : []) ];
  const closeReason = !data ? '' : !data.order.runs.length || data.order.runs.reduce((s, r) => s + Number(r.actualQuantity), 0) + 0.0000001 < Number(data.order.quantity) ? 'Chưa ghi đủ sản lượng theo lệnh.'
    : data.order.runs.some(r => r.status === 'PENDING') ? 'Còn lần chế biến chưa nghiệm thu.'
    : data.order.materialIssues.some(i => i.status === 'PENDING') ? 'Còn đề nghị cấp nguyên liệu chờ xử lý.'
    : lines.some(l => l.returnLines.some(r => r.return.status === 'PENDING') || l.wasteLines.some(w => w.waste.status === 'PENDING')) ? 'Còn phiếu hoàn hoặc hao hụt chờ duyệt.'
    : lines.some(l => Math.abs(Number(balance(l.id))) > 0.0000001) ? 'Còn nguyên liệu đã cấp chưa sử dụng, hoàn hoặc ghi nhận hao hụt.' : '';
  const waitingInspection = data?.order.runs.some(r => r.status === 'PENDING');
  return <Drawer title={data?.order.bom.product.name || 'Chi tiết lệnh'} onClose={close} locked={busy}>{error && <p className="error" role="alert">{error}</p>}{!data ? <p>Đang tải…</p> : <><DocumentTools disabled={busy} document={{ title: 'Lệnh chế biến', reference: orderId, status: statusInfo('order', data.order.status).label, fields: [['Thành phẩm', data.order.bom.product.name], ['Số lượng yêu cầu', `${fmt(data.order.quantity)} ${data.order.bom.product.unit.symbol}`], ['Người giao', overview?.assignedBy || ''], ['Người nhận', overview?.assignedTo || ''], ['Ngày giao', new Date(data.order.assignedAt).toLocaleString('vi-VN')], ['Hạn hoàn thành', data.order.dueAt ? new Date(data.order.dueAt).toLocaleString('vi-VN') : 'Không đặt']], columns: ['Nguyên liệu theo công thức', 'Nhu cầu dự kiến', 'Đơn vị'], rows: (overview?.plan || []).map(p => [p.name, Number(p.quantity).toLocaleString('vi-VN', { maximumFractionDigits: 3 }), p.unit]), note: `Công thức v${overview?.version || ''}. Nhu cầu trên là định mức dự kiến, không phải số đã cấp hoặc tiêu hao thực tế.`, signatures: ['Người giao lệnh', 'Người nhận lệnh'] }} /><div className="workflow-state"><StatusBadge area="order" code={data.order.status} />{waitingInspection && <span className="document-status pending">Có sản lượng chờ nghiệm thu</span>}</div><p>Yêu cầu: {fmt(data.order.quantity)} {data.order.bom.product.unit.symbol}.</p>{overview && <><p>Người giao: {overview.assignedBy}<br />Người nhận: {overview.assignedTo}<br />Hạn: {overview.dueAt ? new Date(overview.dueAt).toLocaleString('vi-VN') : 'Không đặt'}</p><details className="plan-summary"><summary>Nhu cầu nguyên liệu · Công thức v{overview.version}</summary>{overview.plan.map(p => <p key={p.name}>{p.name}: <strong>{Number(p.quantity).toLocaleString('vi-VN', { maximumFractionDigits: 3 })} {p.unit}</strong></p>)}</details></>}{data.order.status === 'NEW' && <div className="detail-actions">{mine && can(user, 'production:perform') && <button className="primary" disabled={busy} onClick={() => void orderAction('receive')}>Nhận lệnh chế biến</button>}{can(user, 'production:manage') && <button className="danger" disabled={busy} onClick={() => void orderAction('cancel')}>Hủy lệnh</button>}</div>}<h3>Cấp nguyên vật liệu</h3>{data.order.materialIssues.map(i => <div className="execution-record" key={i.id}><div className="record-heading"><strong>Phiếu cấp {i.id.slice(0, 8)}</strong><StatusBadge area="issue" code={i.status} /></div><p>{i.reason}</p>{i.lines.map(l => <p key={l.id}>{l.lot.material.name} / lô {l.lot.code}: yêu cầu {fmt(l.requestedQuantity)}, đã cấp {fmt(l.issuedQuantity)}, còn có thể sử dụng {fmt(balance(l.id))} {l.lot.material.unit.symbol}</p>)}{i.status === 'PENDING' && can(user, 'material:approve') && <div className="actions"><button className="primary" disabled={busy} onClick={() => void send({ action: 'approveIssue', targetId: i.id }, true)}>Cấp nguyên liệu cho bếp</button><button disabled={busy} onClick={() => void send({ action: 'rejectIssue', targetId: i.id }, true)}>Từ chối</button></div>}</div>)}<h3>Sản xuất và nghiệm thu</h3>{data.order.runs.map(r => <div className="execution-record" key={r.id}><div className="record-heading"><strong>Lần chế biến {r.id.slice(0, 8)}</strong><StatusBadge area="run" code={r.status} /></div><p>Đã làm: {fmt(r.actualQuantity)} · Đạt: {r.acceptedQuantity === null ? 'chưa xác nhận' : fmt(r.acceptedQuantity)}</p><p>{r.inspectionNote}</p>{r.status === 'PENDING' && can(user, 'production:inspect') && <Inspection busy={busy} actual={r.actualQuantity} save={(quantity, reason) => send({ action: 'inspect', targetId: r.id, quantity, reason }, true)} />}</div>)}<h3>Hoàn / hao hụt</h3>{lines.flatMap(l => [...l.returnLines.map(r => ({ ...r, doc: r.return, type: 'Return', name: 'Hoàn', right: 'material:approve' })), ...l.wasteLines.map(w => ({ ...w, doc: w.waste, type: 'Waste', name: 'Hao hụt', right: 'waste:approve' }))].map(d => <div className="execution-record" key={d.id}><div className="record-heading"><strong>{d.name} · {l.lot.material.name}</strong><StatusBadge area={d.type === 'Return' ? 'return' : 'waste'} code={d.doc.status} /></div><p>Lô {l.lot.code} · {fmt(d.quantity)} {l.lot.material.unit.symbol}</p><p>{d.doc.reason}</p>{d.doc.status === 'PENDING' && can(user, d.right) && <div className="actions"><button className="primary" disabled={busy} onClick={() => void send({ action: `approve${d.type}`, targetId: d.doc.id }, true)}>{d.type === 'Return' ? 'Nhận hoàn vào kho' : 'Xác nhận hao hụt'}</button><button disabled={busy} onClick={() => void send({ action: `reject${d.type}`, targetId: d.doc.id }, true)}>Từ chối</button></div>}</div>))}<MaterialShortages user={user} orderId={orderId} />{actions.length > 0 && <WorkerTicket data={data} actions={actions} busy={busy} sender={user.name} send={send} reload={load} />}{open && can(user, 'production:manage') && <div className="close-order"><button disabled={busy || !!closeReason} onClick={() => void send({ action: 'complete' }, true)}>Đóng lệnh chế biến</button>{closeReason && <small>{closeReason}</small>}</div>}</>}</Drawer>;
}
function Inspection({ busy, actual, save }: { busy: boolean; actual: string; save: (quantity: string, reason: string) => Promise<void> }) {
  const [quantity, setQuantity] = useState(actual), [note, setNote] = useState('');
  return <form onSubmit={e => { e.preventDefault(); void save(quantity, note); }}><fieldset disabled={busy}><label className="field">Số lượng đạt<input required type="number" min="0" max={actual} step="0.001" value={quantity} onChange={e => setQuantity(e.target.value)} /></label><label className="field">Nhận xét nghiệm thu<input required maxLength={1000} value={note} onChange={e => setNote(e.target.value)} /></label><button className="primary">Xác nhận nghiệm thu và nhập kho</button></fieldset></form>;
}

'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { api, can, type User } from './catalog-api';
import { Drawer } from './workspace-ui';
import { StatusBadge } from './status-ui';
import { DocumentTools } from './document-print';
import { statusInfo } from './status-ui';
import WorkerTicket from './worker-ticket';
import MaterialShortages from './material-shortages';
import { usePagination, Pagination } from './list-pagination';
import './execution-panel.css';
type Doc = { id: string; status: string; reason: string; requestedAt?: string; reportedAt?: string };
type Line = { id: string; requestedQuantity: string; issuedQuantity: string | null; lot: { id: string; materialId: string; code: string; material: { name: string; unit: { symbol: string } } }; returnLines: { id: string; quantity: string; return: Doc }[]; wasteLines: { id: string; quantity: string; waste: Doc }[] };
export type Detail = { order: { id: string; assignedAt: string; dueAt: string | null; status: string; quantity: string; assignedTo: { accountId: string | null }; bom: { outputQuantity: string; lines: { materialId: string; quantity: string; material: { name: string; unit: { symbol: string } } }[]; product: { name: string; unit: { symbol: string } } }; materialIssues: { id: string; requestedAt: string; status: string; reason: string; lines: Line[] }[]; runs: { id: string; recordedAt: string; status: string; actualQuantity: string; acceptedQuantity: string | null; inspectionNote: string | null }[] }; lots: { id: string; materialId: string; code: string; stock: string; daysRemaining: number | null; expiryDate: string | null; material: { status: string; name: string; unit: { symbol: string } } }[]; balances: { id: string; remaining: string }[] };
const fmt = (v: string | null) => Number(v || 0).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
export default function ExecutionPanel({ orderId, user, close, changed, overview }: { orderId: string; user: User; close: () => void; changed: () => Promise<void>; overview?: { assignedBy: string; assignedTo: string; dueAt: string | null; version: number; plan: { name: string; quantity: number; unit: string }[] } }) {
  const [data, setData] = useState<Detail>(), [error, setError] = useState(''), [saving, setBusy] = useState(false);
  const [loading, setLoading] = useState(false), sequence = useRef(0);
  const busy = saving || loading;
  const [tab, setTab] = useState<'work' | 'review' | 'history' | 'info'>(() => can(user, 'production:manage', 'material:approve', 'production:inspect', 'waste:approve') ? 'review' : 'work');
  const [expanded, setExpanded] = useState<string | null>(null), [shortageCount, setShortageCount] = useState(0);
  const [historySearch, setHistorySearch] = useState(''), [historyKind, setHistoryKind] = useState('');
  const load = useCallback(async () => {
    const request = ++sequence.current; setLoading(true); setError('');
    try { const result = await api<Detail>(`production/orders/${orderId}/execution`); if (request === sequence.current) setData(result); }
    catch (e) { if (request === sequence.current) { setData(undefined); setError(e instanceof Error ? e.message : 'Không tải được lệnh'); } }
    finally { if (request === sequence.current) setLoading(false); }
  }, [orderId]);
  useEffect(() => { void load(); return () => { sequence.current++; }; }, [load]);
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
  const open = !!data && ['RECEIVED', 'IN_PROGRESS'].includes(data.order.status);
  const actions = [
    ...(mine && open && can(user, 'material:request') ? [{ id: 'request', name: 'Cấp nguyên liệu' }] : []),
    ...(mine && open && can(user, 'production:perform') ? [{ id: 'run', name: 'Ghi sản lượng' }] : []),
    ...(mine && open && can(user, 'material:request') ? [{ id: 'return', name: 'Hoàn phần dư' }] : []),
    ...(mine && open && can(user, 'waste:request') ? [{ id: 'waste', name: 'Báo hao hụt' }] : []),
  ];
  const actual = data?.order.runs.reduce((s, r) => s + Number(r.actualQuantity), 0) || 0;
  const accepted = data?.order.runs.reduce((s, r) => s + Number(r.acceptedQuantity || 0), 0) || 0;
  const waiting = data?.order.runs.filter(r => r.status === 'PENDING').reduce((s, r) => s + Number(r.actualQuantity), 0) || 0;
  const remainingLines = lines.filter(l => Number(balance(l.id)) > 0);
  const closeReason = !data ? '' : shortageCount ? 'Còn báo thiếu nguyên liệu đang mở.'
    : !data.order.runs.length || actual + 0.0000001 < Number(data.order.quantity) ? 'Chưa ghi đủ sản lượng theo lệnh.'
    : waiting ? 'Còn sản lượng chưa nghiệm thu.'
    : data.order.materialIssues.some(i => i.status === 'PENDING') ? 'Còn đề nghị cấp nguyên liệu chờ xử lý.'
    : lines.some(l => l.returnLines.some(r => r.return.status === 'PENDING') || l.wasteLines.some(w => w.waste.status === 'PENDING')) ? 'Còn phiếu hoàn hoặc hao hụt chờ duyệt.'
    : lines.some(l => Math.abs(Number(balance(l.id))) > 0.0000001) ? 'Còn số dư nguyên liệu đã cấp cần đối chiếu, sử dụng, hoàn hoặc ghi hao hụt.' : '';
  type Entry = { key: string; id: string; area: 'issue' | 'run' | 'return' | 'waste'; title: string; status: string; at: string; note?: string | null; rows: string[]; actual?: string; approve?: string; reject?: string; allowed: boolean };
  const entries: Entry[] = [];
  for (const i of data?.order.materialIssues || []) entries.push({ key: 'issue-' + i.id, id: i.id, area: 'issue', title: 'Đề nghị cấp NVL', status: i.status, at: i.requestedAt, note: i.reason, rows: i.lines.map(l => l.lot.material.name + ' · ' + l.lot.code + ': đề nghị ' + fmt(l.requestedQuantity) + ', đã cấp ' + fmt(l.issuedQuantity) + ' ' + l.lot.material.unit.symbol), approve: 'approveIssue', reject: 'rejectIssue', allowed: can(user, 'material:approve') });
  for (const r of data?.order.runs || []) entries.push({ key: 'run-' + r.id, id: r.id, area: 'run', title: 'Ghi nhận chế biến', status: r.status, at: r.recordedAt, note: r.inspectionNote, rows: ['Đã làm ' + fmt(r.actualQuantity) + ' · Đạt ' + (r.acceptedQuantity === null ? 'chưa nghiệm thu' : fmt(r.acceptedQuantity)) + ' ' + data!.order.bom.product.unit.symbol], actual: r.actualQuantity, allowed: can(user, 'production:inspect') });
  const grouped = new Map<string, Entry>();
  for (const l of lines) for (const d of [
    ...l.returnLines.map(r => ({ ...r, doc: r.return, area: 'return' as const, title: 'Hoàn nguyên liệu', approve: 'approveReturn', reject: 'rejectReturn', right: 'material:approve' })),
    ...l.wasteLines.map(w => ({ ...w, doc: w.waste, area: 'waste' as const, title: 'Hao hụt nguyên liệu', approve: 'approveWaste', reject: 'rejectWaste', right: 'waste:approve' })),
  ]) {
    const key = d.area + '-' + d.doc.id;
    const entry: Entry = grouped.get(key) || { key, id: d.doc.id, area: d.area, title: d.title, status: d.doc.status, at: d.doc.requestedAt || d.doc.reportedAt || '', note: d.doc.reason, rows: [], approve: d.approve, reject: d.reject, allowed: can(user, d.right) };
    entry.rows.push(l.lot.material.name + ' · ' + l.lot.code + ': ' + fmt(d.quantity) + ' ' + l.lot.material.unit.symbol);
    grouped.set(key, entry);
  }
  entries.push(...grouped.values());
  const pending = entries.filter(e => e.status === 'PENDING').sort((a, b) => a.at.localeCompare(b.at));
  const completed = entries.filter(e => e.status !== 'PENDING').sort((a, b) => b.at.localeCompare(a.at));
  const filteredHistory = completed.filter(e => (!historyKind || historyKind === e.area) && (e.title + ' ' + e.id + ' ' + e.rows.join(' ') + ' ' + (e.note || '')).toLocaleLowerCase('vi').includes(historySearch.toLocaleLowerCase('vi')));
  const historyPage = usePagination(filteredHistory, historyKind + ':' + historySearch);
  const count = pending.length + shortageCount;
  const unit = data?.order.bom.product.unit.symbol || '';
  const activeKey = expanded === null && tab === 'review' ? pending[0]?.key : expanded;
  const next = data?.order.status === 'NEW' ? mine ? 'Nhận lệnh để bắt đầu chuẩn bị nguyên liệu.' : 'Đang chờ nhân viên được giao nhận lệnh.'
    : !open ? 'Lệnh đã kết thúc. Bạn có thể tra cứu lịch sử và in chứng từ.'
    : can(user, 'production:manage', 'material:approve', 'production:inspect', 'waste:approve') && count ? 'Có ' + count + ' phiếu/báo thiếu chờ xử lý. Mở từng phiếu để kiểm tra và xác nhận.'
    : mine ? remainingLines.length ? 'Bếp còn nguyên liệu: ghi sản lượng hoặc xử lý phần dư.' : 'Kiểm tra nguyên liệu theo công thức, lập đề nghị cấp hoặc báo thiếu.'
    : closeReason || 'Đủ điều kiện đóng lệnh.';
  function renderEntry(e: Entry, review: boolean) {
    const expanded = activeKey === e.key;
    return <article className={'order-entry' + (review ? ' is-pending' : '')} key={e.key}>
      <button className="order-entry-toggle" type="button" disabled={busy} aria-expanded={expanded} onClick={() => setExpanded(expanded ? '' : e.key)}>
        <span className={'order-entry-icon ' + e.area} aria-hidden="true">{e.area === 'issue' ? '↗' : e.area === 'return' ? '↙' : e.area === 'run' ? '✓' : '−'}</span>
        <span className="order-entry-title"><strong>{e.title}</strong><small>{e.rows.length === 1 ? e.rows[0] : e.rows.length + ' dòng nguyên liệu'}{e.at ? ' · ' + new Date(e.at).toLocaleString('vi-VN') : ''}</small></span>
        <StatusBadge area={e.area} code={e.status} /><span className="order-chevron" aria-hidden="true">{expanded ? '−' : '+'}</span>
      </button>
      <div hidden={!expanded} className="order-entry-body"><small>Phiếu {e.id}</small>{e.rows.map((row, i) => <p key={e.key + '-' + i}>{row}</p>)}{e.note && <p className="order-note">{e.note}</p>}
        {review && e.allowed && (e.area === 'run' ? <Inspection busy={busy} actual={e.actual!} save={(quantity, reason) => send({ action: 'inspect', targetId: e.id, quantity, reason }, true)} /> : <div className="order-review-actions"><button className="primary" disabled={busy} onClick={() => void send({ action: e.approve, targetId: e.id }, true)}>{e.area === 'issue' ? 'Xác nhận cấp đủ' : e.area === 'return' ? 'Nhận hoàn vào kho' : 'Xác nhận hao hụt'}</button><button className="danger" disabled={busy} onClick={() => void send({ action: e.reject, targetId: e.id }, true)}>Từ chối</button></div>)}
        {review && !e.allowed && <p className="order-note">Đã gửi · chờ người có quyền xử lý.</p>}
      </div>
    </article>;
  }
  return <Drawer title={data?.order.bom.product.name || 'Chi tiết lệnh'} onClose={close} locked={busy}><div className="order-workspace">
    {error && <p className="error" role="alert">{error}</p>}
    {!data ? loading ? <p role="status">Đang tải lệnh…</p> : <button onClick={() => void load()}>Thử tải lại lệnh</button> : <>
      <section className="order-overview"><div className="order-overview-top"><span>Lệnh {orderId.slice(0, 8)} · {overview?.assignedTo || 'Người nhận lệnh'}</span><StatusBadge area="order" code={data.order.status} /></div>
        <div className="order-numbers"><div><small>Yêu cầu</small><strong>{fmt(data.order.quantity)} <span>{unit}</span></strong></div><div><small>Đã làm</small><strong>{fmt(String(actual))}</strong></div><div><small>Đạt / nhập kho</small><strong>{fmt(String(accepted))}</strong></div><div><small>Chờ nghiệm thu</small><strong className={waiting ? 'order-amber' : ''}>{fmt(String(waiting))}</strong></div></div>
        <div className="order-next"><span aria-hidden="true">→</span><p>{next}</p>{data.order.status === 'NEW' && mine && can(user, 'production:perform') && <button className="primary" disabled={busy} onClick={() => void orderAction('receive')}>Nhận lệnh</button>}</div>
      </section>
      <div className="order-tabs" role="group" aria-label="Khu vực lệnh chế biến">{([
        ['work', 'Làm việc', null], ['review', 'Chờ xử lý', count], ['history', 'Lịch sử', completed.length], ['info', 'Thông tin & In', null],
      ] as const).map(([key, label, total]) => <button key={key} aria-pressed={tab === key} className={tab === key ? 'selected' : ''} disabled={busy} onClick={() => { setTab(key); setExpanded(null); }}>{label}{total !== null && total > 0 && <span className={key === 'review' ? 'pending-count' : ''}>{total}</span>}</button>)}</div>
      <div hidden={tab !== 'work'} className="order-tab-content">
        {actions.length > 0 ? <WorkerTicket data={data} actions={actions} busy={busy} sender={user.name} send={send} reload={load} onBusyChange={setBusy} /> : <div className="order-empty">{data.order.status === 'NEW' ? 'Nhân viên cần nhận lệnh trước khi lập phiếu.' : open ? 'Bạn đang xem lệnh. Các phiếu cần duyệt nằm ở Chờ xử lý.' : 'Lệnh đã kết thúc, không lập thêm phiếu.'}</div>}
        {lines.length > 0 && <details className="order-material-balances"><summary>Nguyên liệu tại bếp · {remainingLines.length} dòng còn số dư</summary><div className="table-wrap"><table><thead><tr><th>Nguyên liệu / Lô</th><th>Đã cấp</th><th>Còn có thể dùng / xử lý</th></tr></thead><tbody>{lines.map(l => <tr key={l.id}><td>{l.lot.material.name}<small>{l.lot.code}</small></td><td>{fmt(l.issuedQuantity)} {l.lot.material.unit.symbol}</td><td>{fmt(balance(l.id))} {l.lot.material.unit.symbol}</td></tr>)}</tbody></table></div><small>Phần đang chờ duyệt hoàn/hao hụt đã được giữ lại, không tính vào lượng có thể dùng.</small></details>}
      </div>
      <div hidden={tab !== 'review'} className="order-tab-content"><div className="order-section-heading"><div><h3>{mine && !can(user, 'production:manage', 'material:approve', 'production:inspect', 'waste:approve') ? 'Các phiếu đang chờ' : 'Phiếu cần xử lý'}</h3><p>Mở một phiếu để xem nội dung và thao tác.</p></div><button disabled={busy} onClick={() => void load()}>Tải lại</button></div>{!pending.length && !shortageCount && <div className="order-empty">Không có phiếu hoặc báo thiếu chờ xử lý.</div>}<div className="order-entry-list">{pending.map(e => renderEntry(e, true))}</div></div>
      <div hidden={tab !== 'history'} className="order-tab-content"><div className="order-history-controls"><input aria-label="Tìm lịch sử lệnh" placeholder="Tìm mã phiếu, nguyên liệu, lô…" value={historySearch} onChange={e => setHistorySearch(e.target.value)} /><select aria-label="Loại phiếu lịch sử" value={historyKind} onChange={e => setHistoryKind(e.target.value)}><option value="">Mọi loại phiếu</option><option value="issue">Cấp NVL</option><option value="run">Chế biến / nghiệm thu</option><option value="return">Hoàn NVL</option><option value="waste">Hao hụt</option></select></div><div className="order-entry-list">{historyPage.rows.map(e => renderEntry(e, false))}</div>{!filteredHistory.length && <div className="order-empty">Không có lịch sử phù hợp.</div>}<Pagination pager={historyPage} /></div>
      <div hidden={tab !== 'review' && tab !== 'history'} className="order-tab-content"><MaterialShortages user={user} orderId={orderId} view={tab === 'history' ? 'history' : 'active'} onCount={setShortageCount} onBusyChange={setBusy} /></div>
      <div hidden={tab !== 'info'} className="order-tab-content"><dl className="order-information"><div><dt>Người giao</dt><dd>{overview?.assignedBy || '—'}</dd></div><div><dt>Người nhận</dt><dd>{overview?.assignedTo || '—'}</dd></div><div><dt>Ngày giao</dt><dd>{new Date(data.order.assignedAt).toLocaleString('vi-VN')}</dd></div><div><dt>Hạn hoàn thành</dt><dd>{data.order.dueAt ? new Date(data.order.dueAt).toLocaleString('vi-VN') : 'Không đặt'}</dd></div></dl><h3>Công thức v{overview?.version || '—'} · nhu cầu dự kiến</h3><div className="table-wrap"><table><thead><tr><th>Nguyên liệu</th><th>Định mức cho lệnh</th></tr></thead><tbody>{data.order.bom.lines.map(l => <tr key={l.materialId}><td>{l.material.name}</td><td>{fmt(String(Number(l.quantity) * Number(data.order.quantity) / Number(data.order.bom.outputQuantity)))} {l.material.unit.symbol}</td></tr>)}</tbody></table></div>
      <DocumentTools disabled={busy} document={{ title: 'Lệnh chế biến', reference: orderId, status: statusInfo('order', data.order.status).label, fields: [['Thành phẩm', data.order.bom.product.name], ['Số lượng yêu cầu', fmt(data.order.quantity) + ' ' + unit], ['Người giao', overview?.assignedBy || ''], ['Người nhận', overview?.assignedTo || ''], ['Ngày giao', new Date(data.order.assignedAt).toLocaleString('vi-VN')], ['Hạn hoàn thành', data.order.dueAt ? new Date(data.order.dueAt).toLocaleString('vi-VN') : 'Không đặt']], columns: ['Nguyên liệu', 'Nhu cầu dự kiến', 'Đơn vị'], rows: data.order.bom.lines.map(l => [l.material.name, fmt(String(Number(l.quantity) * Number(data.order.quantity) / Number(data.order.bom.outputQuantity))), l.material.unit.symbol]), note: 'Định mức dự kiến, không phải tiêu hao thực tế.', signatures: ['Người giao lệnh', 'Người nhận lệnh'] }} />
      {data.order.status === 'NEW' && can(user, 'production:manage') && <button className="danger" disabled={busy} onClick={() => void orderAction('cancel')}>Hủy lệnh chưa nhận</button>}</div>
      {open && can(user, 'production:manage') && <div className="order-close-bar"><div><strong>Kết thúc lệnh</strong><small>{closeReason || 'Đã đủ điều kiện ghi nhận kết thúc.'}</small></div><button className={!closeReason ? 'primary' : ''} disabled={busy || !!closeReason} onClick={() => void send({ action: 'complete' }, true)}>Đóng lệnh chế biến</button></div>}
    </>}
  </div></Drawer>;
}
function Inspection({ busy, actual, save }: { busy: boolean; actual: string; save: (quantity: string, reason: string) => Promise<unknown> }) {
  const [quantity, setQuantity] = useState(actual), [note, setNote] = useState('');
  return <form className="order-inspection" onSubmit={e => { e.preventDefault(); void save(quantity, note); }}><fieldset disabled={busy}><div className="form-grid"><label className="field">Số lượng đạt<input required type="number" min="0" max={actual} step="0.001" value={quantity} onChange={e => setQuantity(e.target.value)} /></label><label className="field">Nhận xét nghiệm thu<input required maxLength={1000} value={note} onChange={e => setNote(e.target.value)} /></label></div><button className="primary">Nghiệm thu và nhập kho</button></fieldset></form>;
}

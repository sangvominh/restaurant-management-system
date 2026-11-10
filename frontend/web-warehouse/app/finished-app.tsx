'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api, can, type User } from './catalog-api';
import { DocumentCard, Drawer, Modal } from './workspace-ui';
import { usePagination, Pagination } from './list-pagination';
import { StatusBadge, statusInfo } from './status-ui';
import { DocumentTools } from './document-print';
import StockDashboard from './stock-dashboard';
import WarehouseReports from './warehouse-reports';
type Row = { id: string; code: string; name: string; unit: string; opening: string; incoming: string; outgoing: string; closing: string };
type SaleLine = { id: string; quantity: string; productName: string; product: { unit: { symbol: string } }; exportLines: { requestedQuantity: string; exportedQuantity: string | null; export: { status: string } }[] };
type Sale = { id: string; code: string; lines: SaleLine[] };
type Doc = { id: string; requestedAt: string; status: string; reason: string; sale: { code: string }; requestedBy: { name: string }; reviewedBy: { name: string } | null; lines: { id: string; requestedQuantity: string; exportedQuantity: string | null; saleLine: SaleLine }[] };
const fmt = (n: string | number) => Number(n).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
const left = (l: SaleLine) => Number(l.quantity) - l.exportLines.reduce((s, x) => s + (x.export.status === 'PENDING' ? Number(x.requestedQuantity) : x.export.status === 'APPROVED' ? Number(x.exportedQuantity || 0) : 0), 0);
function dates(year: number, period: string, index: number) {
  const month = period === 'year' ? 1 : period === 'quarter' ? (index - 1) * 3 + 1 : index;
  const last = period === 'year' ? 12 : period === 'quarter' ? month + 2 : month;
  return { start: `${year}-${String(month).padStart(2, '0')}-01`, end: `${year}-${String(last).padStart(2, '0')}-${new Date(year, last, 0).getDate()}` };
}
export default function FinishedApp({ mode, user }: { mode: 'exports' | 'finished' | 'report'; user: User }) {
  return mode === 'report' ? <WarehouseReports /> : mode === 'finished' ? <StockDashboard kind="products" user={user} /> : <FinishedWorkspace mode={mode} user={user} />;
}
function FinishedWorkspace({ mode, user }: { mode: 'exports' | 'finished' | 'report'; user: User }) {
  const [rows, setRows] = useState<Row[]>([]), [docs, setDocs] = useState<Doc[]>([]), [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState(''), [search, setSearch] = useState('');
  const [kind, setKind] = useState('materials'), [period, setPeriod] = useState('month'), [year, setYear] = useState(new Date().getFullYear()), [index, setIndex] = useState(new Date().getMonth() + 1);
  const [saleId, setSale] = useState(''), [reason, setReason] = useState(''), [quantities, setQuantities] = useState<Record<string, string>>({});
  const [creating, setCreating] = useState(false), [docId, setDocId] = useState<string>();
  const [applied, setApplied] = useState('');
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      if (mode === 'exports') { const [ds, ss] = await Promise.all([api<Doc[]>('exports'), can(user, 'export:request') ? api<Sale[]>('exports/sales') : Promise.resolve([])]); setDocs(ds); setSales(ss); }
      else if (mode === 'finished') setRows(await api<Row[]>('finished-stock'));
      else {
        const d = dates(year, period, index);
        setRows(await api<Row[]>(`stock-report?kind=${kind}&start=${d.start}&end=${d.end}`));
        setApplied(`${kind === 'materials' ? 'NVL' : 'Thành phẩm'} · ${d.start} → ${d.end}`);
      }
    } catch (e) { setError(e instanceof Error ? e.message : 'Không tải được'); }
    finally { setLoading(false); }
  }, [mode, user, year, period, index, kind]);
  useEffect(() => { void load(); }, [load]);
  async function create(e: FormEvent) {
    e.preventDefault(); if (!validRequest) { setError('Chọn ít nhất một món và nhập lượng còn được yêu cầu.'); return; } setBusy(true); setError('');
    try { await api('exports', 'POST', { saleId, reason, lines: requestedLines.map(l => ({ saleLineId: l.id, quantity: quantities[l.id] })) }); setQuantities({}); setReason(''); setCreating(false); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Không lưu được'); } finally { setBusy(false); }
  }
  async function review(id: string, action: string) {
    if (!window.confirm(action === 'approve' ? 'Duyệt xuất và ghi giảm tồn thành phẩm?' : 'Từ chối phiếu xuất?')) return;
    setBusy(true); setError('');
    try { await api(`exports/${id}/${action}`, 'POST'); await load(); } catch (e) { setError(e instanceof Error ? e.message : 'Không duyệt được'); } finally { setBusy(false); }
  }
  const [filter, setFilter] = useState('');
  const filteredRows = rows.filter(r => `${r.code} ${r.name}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')));
  const filteredDocs = docs.filter(d => `${d.sale.code} ${d.id}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')) && (!filter || d.status === filter));
  const rowPage = usePagination(filteredRows, `${mode}:${kind}:${period}:${year}:${index}:${search}`);
  const docPage = usePagination(filteredDocs, `exports:${search}:${filter}`);
  const activeDoc = docs.find(d => d.id === docId);
  const selected = sales.find(s => s.id === saleId);
  const requestedLines = selected?.lines.filter(l => Number(quantities[l.id]) > 0) || [];
  const validRequest = requestedLines.length > 0 && requestedLines.every(l => Number.isFinite(Number(quantities[l.id])) && Number(quantities[l.id]) <= Math.max(0, left(l)));
  return <><section className="panel">{mode === 'report' && <><div className="filters"><select aria-label="Kho" value={kind} onChange={e => setKind(e.target.value)}><option value="materials">Kho NVL</option><option value="products">Kho thành phẩm</option></select><select aria-label="Kỳ" value={period} onChange={e => { setPeriod(e.target.value); setIndex(1); }}><option value="month">Tháng</option><option value="quarter">Quý</option><option value="year">Năm</option></select><input aria-label="Năm" required type="number" min="2000" max="9999" value={year} onChange={e => { const n = Number(e.target.value); if (n >= 2000 && n <= 9999) setYear(n); }} />{period !== 'year' && <select aria-label="Tháng hoặc quý" value={index} onChange={e => setIndex(Number(e.target.value))}>{Array.from({ length: period === 'month' ? 12 : 4 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}</select>}</div><p className="report-period">{applied}</p></>}<div className="list-controls"><div className="filters"><button type="button" disabled={loading || busy} onClick={() => void load()}>Tải lại</button><input aria-label="Tìm kiếm" placeholder="Tìm mã, tên, đơn bán…" value={search} onChange={e => setSearch(e.target.value)} />{mode === 'exports' && <select aria-label="Trạng thái xuất" value={filter} onChange={e => setFilter(e.target.value)}><option value="">Mọi trạng thái</option>{['PENDING', 'APPROVED', 'REJECTED'].map(s => <option key={s} value={s}>{statusInfo('export', s).label}</option>)}</select>}</div>{mode === 'exports' && can(user, 'export:request') && <button className="primary" disabled={loading || busy || !!error || !sales.some(s => s.lines.some(l => left(l) > 0))} onClick={() => setCreating(true)}>+ Lập phiếu xuất</button>}</div>{error && <p className="error" role="alert">{error}</p>}{loading ? <p>Đang tải…</p> : mode !== 'exports' ? <div className="table-wrap"><table className="numeric-table"><thead><tr><th>Mã</th><th>Tên</th><th>Đơn vị</th>{mode === 'report' && <><th>Tồn đầu</th><th>Nhập</th><th>Xuất</th></>}<th>{mode === 'report' ? 'Tồn cuối' : 'Tồn hiện tại'}</th></tr></thead><tbody>{rowPage.rows.map(r => <tr key={r.id}><td>{r.code}</td><td>{r.name}</td><td>{r.unit}</td>{mode === 'report' && <><td>{fmt(r.opening)}</td><td>{fmt(r.incoming)}</td><td>{fmt(r.outgoing)}</td></>}<td>{fmt(r.closing)}</td></tr>)}</tbody></table>{!filteredRows.length && <p>Chưa có dữ liệu.</p>}</div> : <div className="document-grid">{docPage.rows.map(d => <DocumentCard key={d.id} type="Phiếu xuất thành phẩm" reference={d.id} title={`Đơn ${d.sale.code}`} status={statusInfo('export', d.status).label} tone={statusInfo('export', d.status).tone} onOpen={() => setDocId(d.id)} footer={<span>Phiếu {d.id.slice(0, 8)}</span>}><small>{new Date(d.requestedAt).toLocaleString('vi-VN')} · {d.requestedBy.name}</small><div className="document-lines">{d.lines.slice(0, 3).map(l => <div key={l.id}><span>{l.saleLine.productName}</span><strong>{fmt(l.requestedQuantity)} {l.saleLine.product.unit.symbol}</strong></div>)}{d.lines.length > 3 && <small>+ {d.lines.length - 3} thành phẩm khác</small>}</div></DocumentCard>)}{!filteredDocs.length && <p className="empty">Chưa có phiếu xuất.</p>}</div>}{!loading && <Pagination pager={mode === 'exports' ? docPage : rowPage} disabled={busy} />}</section>{activeDoc && <Drawer title={`Phiếu xuất · ${activeDoc.sale.code}`} locked={busy} onClose={() => setDocId(undefined)}>{error && <p className="error">{error}</p>}<DocumentTools disabled={busy} document={{ title: 'Phiếu xuất thành phẩm', reference: activeDoc.id, status: statusInfo('export', activeDoc.status).label, fields: [['Đơn bán', activeDoc.sale.code], ['Ngày đề nghị', new Date(activeDoc.requestedAt).toLocaleString('vi-VN')], ['Người đề nghị', activeDoc.requestedBy.name], ['Người duyệt', activeDoc.reviewedBy?.name || 'Chưa duyệt']], columns: ['Thành phẩm', 'Đơn vị', 'Đề nghị', 'Thực xuất'], rows: activeDoc.lines.map(l => [l.saleLine.productName, l.saleLine.product.unit.symbol, fmt(l.requestedQuantity), activeDoc.status === 'APPROVED' ? fmt(l.exportedQuantity || '0') : 'Chưa xuất']), note: activeDoc.reason, signatures: ['Người đề nghị', 'Người duyệt', 'Người giao', 'Người nhận'] }} /><div className="detail-overview"><StatusBadge area="export" code={activeDoc.status} /><p>Người lập: {activeDoc.requestedBy.name} · {new Date(activeDoc.requestedAt).toLocaleString('vi-VN')}</p>{activeDoc.reviewedBy && <p>Người duyệt: {activeDoc.reviewedBy.name}</p>}<p>{activeDoc.reason}</p></div><div className="table-wrap"><table><thead><tr><th>Thành phẩm</th><th>Yêu cầu</th><th>Đã xuất</th></tr></thead><tbody>{activeDoc.lines.map(l => <tr key={l.id}><td>{l.saleLine.productName}</td><td>{fmt(l.requestedQuantity)} {l.saleLine.product.unit.symbol}</td><td>{fmt(l.exportedQuantity || '0')}</td></tr>)}</tbody></table></div>{activeDoc.status === 'PENDING' && can(user, 'export:approve') && <div className="detail-actions"><button className="primary" disabled={busy} onClick={() => void review(activeDoc.id, 'approve')}>Duyệt xuất khỏi kho</button><button className="danger" disabled={busy} onClick={() => void review(activeDoc.id, 'reject')}>Từ chối phiếu</button></div>}</Drawer>}{mode === 'exports' && creating && can(user, 'export:request') && <Modal title="Đề nghị xuất thành phẩm" onClose={() => setCreating(false)} locked={busy}><p>Chọn đơn bán đã xác nhận và số lượng cần xuất.</p>{error && <p className="error">{error}</p>}<form onSubmit={create}><fieldset disabled={busy || loading}><label className="field">Đơn bán<select required value={saleId} onChange={e => { setSale(e.target.value); setQuantities({}); }}><option value="">Chọn…</option>{sales.filter(s => s.lines.some(l => left(l) > 0)).map(s => <option key={s.id} value={s.id}>{s.code}</option>)}</select></label>{selected?.lines.filter(l => left(l) > 0).map(l => <label className="field" key={l.id}>{l.productName} · còn được yêu cầu {fmt(Math.max(0, left(l)))} {l.product.unit.symbol}<input type="number" min="0" max={Math.max(0, left(l))} step="0.001" value={quantities[l.id] || ''} onChange={e => setQuantities({ ...quantities, [l.id]: e.target.value })} /></label>)}<label className="field">Lý do xuất<input required maxLength={1000} value={reason} onChange={e => setReason(e.target.value)} /></label><div className="dialog-actions"><button type="button" onClick={() => setCreating(false)}>Hủy</button><button className="primary" disabled={!selected || !validRequest}>Gửi đề nghị</button></div></fieldset></form></Modal>}</>;
}

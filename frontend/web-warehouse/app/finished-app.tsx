'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api, can, type User } from './catalog-api';
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
  const [rows, setRows] = useState<Row[]>([]), [docs, setDocs] = useState<Doc[]>([]), [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState(''), [search, setSearch] = useState('');
  const [kind, setKind] = useState('materials'), [period, setPeriod] = useState('month'), [year, setYear] = useState(new Date().getFullYear()), [index, setIndex] = useState(new Date().getMonth() + 1);
  const [saleId, setSale] = useState(''), [reason, setReason] = useState(''), [quantities, setQuantities] = useState<Record<string, string>>({});
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
    e.preventDefault(); setBusy(true); setError('');
    try { await api('exports', 'POST', { saleId, reason, lines: Object.entries(quantities).filter(([, q]) => Number(q) > 0).map(([saleLineId, quantity]) => ({ saleLineId, quantity })) }); setQuantities({}); setReason(''); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Không lưu được'); } finally { setBusy(false); }
  }
  async function review(id: string, action: string) {
    if (!window.confirm(action === 'approve' ? 'Duyệt xuất và ghi giảm tồn thành phẩm?' : 'Từ chối phiếu xuất?')) return;
    setBusy(true); setError('');
    try { await api(`exports/${id}/${action}`, 'POST'); await load(); } catch (e) { setError(e instanceof Error ? e.message : 'Không duyệt được'); } finally { setBusy(false); }
  }
  const selected = sales.find(s => s.id === saleId);
  return <><header><h1>{mode === 'exports' ? 'Xuất thành phẩm' : mode === 'finished' ? 'Tồn thành phẩm' : 'Báo cáo kho'}</h1><button disabled={loading || busy} onClick={() => void load()}>Tải lại</button></header><section className="panel">{mode === 'report' && <><div className="filters"><select aria-label="Kho" value={kind} onChange={e => setKind(e.target.value)}><option value="materials">Kho NVL</option><option value="products">Kho thành phẩm</option></select><select aria-label="Kỳ" value={period} onChange={e => { setPeriod(e.target.value); setIndex(1); }}><option value="month">Tháng</option><option value="quarter">Quý</option><option value="year">Năm</option></select><input aria-label="Năm" required type="number" min="2000" max="9999" value={year} onChange={e => { const n = Number(e.target.value); if (n >= 2000 && n <= 9999) setYear(n); }} />{period !== 'year' && <select aria-label="Tháng hoặc quý" value={index} onChange={e => setIndex(Number(e.target.value))}>{Array.from({ length: period === 'month' ? 12 : 4 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}</select>}</div><p>{applied}</p><p>Tồn cuối = tồn đầu + nhập − xuất. Theo ngày Việt Nam, chỉ tính biến động đã ghi sổ.</p></>}<input aria-label="Tìm kiếm" placeholder="Tìm mã, tên, đơn bán…" value={search} onChange={e => setSearch(e.target.value)} />{error && <p className="error" role="alert">{error}</p>}{loading ? <p>Đang tải…</p> : mode !== 'exports' ? <div className="table-wrap"><table><thead><tr><th>Mã</th><th>Tên</th><th>Đơn vị</th>{mode === 'report' && <><th>Tồn đầu</th><th>Nhập</th><th>Xuất</th></>}<th>{mode === 'report' ? 'Tồn cuối' : 'Tồn hiện tại'}</th></tr></thead><tbody>{rows.filter(r => `${r.code} ${r.name}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi'))).map(r => <tr key={r.id}><td>{r.code}</td><td>{r.name}</td><td>{r.unit}</td>{mode === 'report' && <><td>{fmt(r.opening)}</td><td>{fmt(r.incoming)}</td><td>{fmt(r.outgoing)}</td></>}<td>{fmt(r.closing)}</td></tr>)}</tbody></table>{!rows.length && <p>Chưa có dữ liệu.</p>}</div> : docs.filter(d => `${d.sale.code} ${d.id}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi'))).map(d => <div key={d.id}><h3>Phiếu {d.id.slice(0, 8)} · Đơn {d.sale.code}</h3><p>{({ PENDING: 'Chờ duyệt', APPROVED: 'Đã xuất', REJECTED: 'Từ chối' } as Record<string, string>)[d.status] || d.status} · Người lập: {d.requestedBy.name} · {new Date(d.requestedAt).toLocaleString('vi-VN')}</p><p>{d.reason}{d.reviewedBy ? ` · Người duyệt: ${d.reviewedBy.name}` : ''}</p>{d.lines.map(l => <p key={l.id}>{l.saleLine.productName}: yêu cầu {fmt(l.requestedQuantity)}, đã xuất {fmt(l.exportedQuantity || '0')} {l.saleLine.product.unit.symbol}</p>)}{d.status === 'PENDING' && can(user, 'export:approve') && <div className="actions"><button disabled={busy} onClick={() => void review(d.id, 'approve')}>Duyệt xuất đủ</button><button disabled={busy} onClick={() => void review(d.id, 'reject')}>Từ chối</button></div>}</div>)}</section>{mode === 'exports' && can(user, 'export:request') && <section className="panel"><h2>Đề nghị xuất thành phẩm</h2><p>Chọn đơn bán đã xác nhận. Nếu chưa có đơn, cần tạo qua phần bán hàng hoặc nhập dữ liệu mẫu sau.</p><form onSubmit={create}><fieldset disabled={busy || loading}><label className="field">Đơn bán<select required value={saleId} onChange={e => { setSale(e.target.value); setQuantities({}); }}><option value="">Chọn…</option>{sales.map(s => <option key={s.id} value={s.id}>{s.code}</option>)}</select></label>{selected?.lines.map(l => <label className="field" key={l.id}>{l.productName} · còn được yêu cầu {fmt(Math.max(0, left(l)))} {l.product.unit.symbol}<input type="number" min="0" max={Math.max(0, left(l))} step="0.001" value={quantities[l.id] || ''} onChange={e => setQuantities({ ...quantities, [l.id]: e.target.value })} /></label>)}<label className="field">Lý do xuất<input required maxLength={1000} value={reason} onChange={e => setReason(e.target.value)} /></label><button className="primary" disabled={!selected}>Gửi đề nghị</button></fieldset></form></section>}</>;
}

'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api, can, type User } from './catalog-api';
import { DocumentCard, Drawer, Modal } from './workspace-ui';
import { usePagination, Pagination } from './list-pagination';
import { DocumentTools } from './document-print';
import StockDashboard from './stock-dashboard';
import WarehouseReports from './warehouse-reports';
import StoreAdjustments from './store-adjustments';
type Product = { id: string; code: string; name: string; status: string; unit: { symbol: string }; warehouse: string; warehouseAvailable: string; stock: string };
type Doc = { id: string; requestedAt: string; approvedAt: string | null; status: string; reason: string; requestedBy: { name: string }; reviewedBy: { name: string } | null; lines: { id: string; quantity: string; product: Product; lotAllocations: { id: string; quantity: string; lot: { code: string; expiryDate: string } }[] }[] };
const fmt = (v: string | number) => Number(v).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
const state = (v: string) => ({ PENDING: 'Chờ duyệt', APPROVED: 'Đã bàn giao', REJECTED: 'Từ chối' }[v] || v);
export default function FinishedApp({ mode, user }: { mode: 'exports' | 'finished' | 'report'; user: User }) {
  return mode === 'report' ? <WarehouseReports /> : mode === 'finished' ? <StockDashboard kind="products" user={user} /> : <Transfers user={user} />;
}
function Transfers({ user }: { user: User }) {
  const [docs, setDocs] = useState<Doc[]>([]), [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const [search, setSearch] = useState(''), [filter, setFilter] = useState(''), [creating, setCreating] = useState(false), [selected, setSelected] = useState<string>();
  const [reason, setReason] = useState(''), [quantities, setQuantities] = useState<Record<string, string>>({});
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { const [d, p] = await Promise.all([api<Doc[]>('exports'), can(user, 'export:request') ? api<Product[]>('exports/products') : Promise.resolve([])]); setDocs(d); setProducts(p); }
    catch (e) { setError(e instanceof Error ? e.message : 'Không tải được phiếu'); } finally { setLoading(false); }
  }, [user]);
  useEffect(() => { const initial = window.setTimeout(() => void load(), 0); return () => window.clearTimeout(initial); }, [load]);
  async function create(e: FormEvent) {
    e.preventDefault(); const lines = Object.entries(quantities).filter(([, q]) => q.trim() !== '' && Number(q) !== 0).map(([productId, quantity]) => ({ productId, quantity }));
    if (!lines.length) { setError('Nhập ít nhất một thành phẩm cần chuyển'); return; }
    setBusy(true); setError('');
    try { const doc = await api<Doc>('exports', 'POST', { reason, lines }); setCreating(false); setSelected(doc.id); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Không lập được phiếu'); } finally { setBusy(false); }
  }
  async function review(doc: Doc, action: 'approve' | 'reject') {
    if (!window.confirm(action === 'approve' ? 'Xác nhận đã bàn giao đủ hàng? Kho giảm và cửa hàng tăng đúng số lượng trên phiếu.' : 'Từ chối phiếu chuyển này?')) return;
    setBusy(true); setError('');
    try { await api('exports/' + doc.id + '/' + action, 'POST'); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Không xử lý được phiếu'); } finally { setBusy(false); }
  }
  const shown = docs.filter(d => (!filter || d.status === filter) && (d.id + d.reason + d.requestedBy.name + d.lines.map(l => l.product.name).join(' ')).toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')));
  const pager = usePagination(shown, search + filter), doc = docs.find(d => d.id === selected);
  return <><section className="panel"><h2>Phiếu xuất thành phẩm để bán</h2><p className="hint">Lập theo nhu cầu chuẩn bị bán, không gắn đơn khách. Chờ duyệt giữ lượng tại kho; duyệt khi bàn giao thực tế.</p>
    <div className="list-controls"><div className="filters"><button disabled={busy || loading} onClick={() => void load()}>Tải lại</button><input placeholder="Tìm món, người lập, lý do hoặc mã phiếu…" aria-label="Tìm phiếu chuyển" value={search} onChange={e => setSearch(e.target.value)} /><select aria-label="Trạng thái phiếu" value={filter} onChange={e => setFilter(e.target.value)}><option value="">Mọi trạng thái</option>{['PENDING', 'APPROVED', 'REJECTED'].map(v => <option key={v} value={v}>{state(v)}</option>)}</select></div>{can(user, 'export:request') && <button className="primary" disabled={busy || loading || !!error} onClick={() => { setQuantities({}); setReason(''); setCreating(true); }}>+ Lập phiếu đề nghị xuất</button>}</div>
    {error && <p className="error" role="alert">{error}</p>}{loading ? <p>Đang tải…</p> : <><div className="document-grid">{pager.rows.map(d => <DocumentCard key={d.id} type="Phiếu chuyển" title={'Kho → Cửa hàng'} status={state(d.status)} tone={d.status === 'APPROVED' ? 'done' : d.status === 'PENDING' ? 'pending' : 'rejected'} footer={<span>{state(d.status)} · {d.id.slice(0, 8)}</span>} onOpen={() => setSelected(d.id)}><small>{new Date(d.requestedAt).toLocaleString('vi-VN')} · {d.requestedBy.name}</small><div className="document-lines">{d.lines.slice(0, 3).map(l => <div key={l.id}><span>{l.product.name}</span><strong>{fmt(l.quantity)} {l.product.unit.symbol}</strong></div>)}</div>{d.lines.length > 3 && <small>+ {d.lines.length - 3} thành phẩm</small>}<p>{d.reason}</p></DocumentCard>)}</div>{!shown.length && <p className="empty">Chưa có phiếu phù hợp.</p>}<Pagination pager={pager} /></>}
  </section>{can(user, 'export:approve') && <StoreAdjustments />}
  {creating && <Modal title="Lập phiếu đề nghị xuất thành phẩm để bán" locked={busy} onClose={() => setCreating(false)}><form onSubmit={create}><fieldset disabled={busy || loading}><p>Kho thành phẩm → Cửa hàng. Tự chọn lô còn hạn gần nhất trước (FEFO), bỏ lô hết hạn. Xem các lô đã giữ trong chi tiết phiếu sau khi gửi.</p><div className="table-wrap"><table><thead><tr><th>Thành phẩm</th><th>Kho còn chuyển được</th><th>Cửa hàng đang có</th><th>Đề nghị chuyển</th></tr></thead><tbody>{products.filter(p => p.status === 'ACTIVE').map(p => <tr key={p.id}><td>{p.name}<small>{p.code} · {p.unit.symbol}</small></td><td>{fmt(p.warehouseAvailable)}</td><td>{fmt(p.stock)}</td><td><input aria-label={'Chuyển ' + p.name} type="number" min="0" max={p.warehouseAvailable} step="0.001" placeholder="Số lượng" value={quantities[p.id] || ''} onChange={e => setQuantities({ ...quantities, [p.id]: e.target.value })} /></td></tr>)}</tbody></table></div><label>Lý do / ca bán<textarea required maxLength={1000} value={reason} onChange={e => setReason(e.target.value)} placeholder="Chuẩn bị bán ca trưa…" /></label>{error && <p className="error" role="alert">{error}</p>}<div className="dialog-actions"><button type="button" onClick={() => setCreating(false)}>Hủy</button><button className="primary">Gửi quản lý kho duyệt</button></div></fieldset></form></Modal>}
  {doc && !creating && <Drawer title={'Phiếu chuyển · ' + doc.id.slice(0, 8)} locked={busy} onClose={() => setSelected(undefined)}><p><strong>Kho thành phẩm → Cửa hàng</strong> · {state(doc.status)}</p><p>Người lập: {doc.requestedBy.name} · {new Date(doc.requestedAt).toLocaleString('vi-VN')}</p>{doc.reviewedBy && <p>Người xử lý: {doc.reviewedBy.name} · {doc.approvedAt && new Date(doc.approvedAt).toLocaleString('vi-VN')}</p>}<p>{doc.reason}</p><div className="table-wrap"><table><thead><tr><th>Thành phẩm</th><th>Số lượng chuyển</th></tr></thead><tbody>{doc.lines.map(l => <tr key={l.id}><td>{l.product.name}{l.lotAllocations?.map(a => <small key={a.id}>Lô {a.lot.code} · HSD {a.lot.expiryDate.slice(0, 10)} · {fmt(a.quantity)} {l.product.unit.symbol}</small>)}</td><td>{fmt(l.quantity)} {l.product.unit.symbol}</td></tr>)}</tbody></table></div><p className="hint">{doc.status === 'APPROVED' ? 'Đã ghi giảm kho và tăng cửa hàng. Bán hàng chỉ trừ lượng tại cửa hàng.' : doc.status === 'PENDING' ? 'Chưa thay đổi tồn hai nơi. Phiếu được duyệt toàn bộ hoặc từ chối.' : 'Không thay đổi tồn.'}</p>{error && <p className="error" role="alert">{error}</p>}{doc.status === 'PENDING' && can(user, 'export:approve') && <div className="dialog-actions"><button disabled={busy} onClick={() => void review(doc, 'reject')}>Từ chối</button><button disabled={busy} className="primary" onClick={() => void review(doc, 'approve')}>Duyệt xuất và ghi nhận bàn giao</button></div>}<DocumentTools disabled={busy} document={{ title: 'Phiếu xuất thành phẩm để bán', reference: doc.id, status: state(doc.status), draft: doc.status !== 'APPROVED', fields: [['Từ', 'Kho thành phẩm'], ['Đến', 'Cửa hàng'], ['Người lập', doc.requestedBy.name], ['Người duyệt', doc.reviewedBy?.name || 'Chưa xử lý'], ['Ngày lập', new Date(doc.requestedAt).toLocaleString('vi-VN')]], columns: ['Thành phẩm', 'Số lượng', 'Đơn vị'], rows: doc.lines.map(l => [l.product.name + (l.lotAllocations || []).map(a => '\nLô ' + a.lot.code + ' · HSD ' + a.lot.expiryDate.slice(0, 10) + ' · ' + fmt(a.quantity)).join(''), fmt(l.quantity), l.product.unit.symbol]), note: doc.reason, signatures: ['Người giao', 'Người nhận tại cửa hàng', 'Quản lý kho'] }} /></Drawer>}
  </>;
}


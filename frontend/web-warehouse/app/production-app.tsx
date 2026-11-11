'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api, can, type User } from './catalog-api';
import ExecutionPanel from './execution-panel';
import { DocumentCard, Drawer, Modal } from './workspace-ui';
import { usePagination, Pagination } from './list-pagination';
import FormulaLibrary from './formula-library';
import MaterialShortages from './material-shortages';
import { StatusBadge, statusInfo } from './status-ui';
type Item = { id: string; code: string; name: string; unit: { symbol: string }; status?: string };
type Bom = { id: string; version: number; outputQuantity: string; effectiveAt: string; status: string; productId: string; product: Item; lines: { materialId: string; quantity: string; material: Item }[] };
type Person = { id: string; code: string; name: string; accountId?: string };
type Order = { id: string; quantity: string; assignedAt: string; dueAt: string | null; status: string; bom: Bom; assignedBy: Person; assignedTo: Person; replenishments: { id: string; saleLine: { sale: { code: string; table: { name: string } | null } } }[] };
type Refs = { products: Item[]; materials: Item[]; employees: Person[] };
const fmt = (v: string | number) => Number(v).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
const currentBom = (boms: Bom[], productId: string) => boms.filter(b => b.productId === productId && b.status === 'ACTIVE' && new Date(b.effectiveAt) <= new Date()).sort((a, b) => Date.parse(b.effectiveAt) - Date.parse(a.effectiveAt) || b.version - a.version)[0];
const when = (v: string) => new Date(v).toLocaleString('vi-VN');
const local = (v: string) => { const d = new Date(v); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16); };
const labels: Record<string, string> = { DRAFT: 'Nháp · chưa áp dụng', CURRENT: 'Đang dùng cho lệnh mới', SCHEDULED: 'Chờ ngày hiệu lực', HISTORY: 'Phiên bản trước', NEW: 'Chờ nhân viên nhận', RECEIVED: 'Đã nhận · chờ chế biến', IN_PROGRESS: 'Đã ghi nhận sản lượng', COMPLETED: 'Đã đóng lệnh', CANCELLED: 'Đã hủy' };
export default function ProductionApp({ user, mode }: { user: User; mode: 'boms' | 'orders' }) {
  const [boms, setBoms] = useState<Bom[]>([]), [orders, setOrders] = useState<Order[]>([]);
  const [refs, setRefs] = useState<Refs>({ products: [], materials: [], employees: [] });
  const [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const [template, setTemplate] = useState<Bom>();
  const [selectedBomId, setSelectedBomId] = useState<string>();
  const [selectedOrder, setSelectedOrder] = useState<string>();
  const [search, setSearch] = useState(''), [filter, setFilter] = useState('');
  const [editing, setEditing] = useState<Bom | null | undefined>(), [newOrder, setNewOrder] = useState(false);
  const manage = can(user, 'production:manage'), bomManage = can(user, 'bom:manage');
  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true); setError('');
    try {
      const [bs, os, rs] = await Promise.all([
        can(user, 'bom:manage', 'production:manage') ? api<Bom[]>('production/boms') : Promise.resolve([]),
        mode === 'orders' ? api<Order[]>('production/orders') : Promise.resolve([]),
        can(user, 'bom:manage', 'production:manage') ? api<Refs>('production/references') : Promise.resolve({ products: [], materials: [], employees: [] }),
      ]);
      setBoms(bs); setOrders(os); setRefs(rs);
    } catch (e) { setError(e instanceof Error ? e.message : 'Không tải được dữ liệu'); }
    finally { if (!quiet) setLoading(false); }
  }, [mode, user]);
  useEffect(() => { const initial = window.setTimeout(() => void load(), 0); return () => window.clearTimeout(initial); }, [load]);
  useEffect(() => { if (mode !== 'orders' || busy || newOrder || editing !== undefined) return; const timer = setInterval(() => void load(true), 15000); return () => clearInterval(timer); }, [load, mode, busy, newOrder, editing]);
  async function action(path: string, method = 'POST', message: string) {
    if (!window.confirm(message)) return;
    setBusy(true); setError('');
    try { await api(path, method); await load(); } catch (e) { setError(e instanceof Error ? e.message : 'Không thực hiện được'); } finally { setBusy(false); }
  }
  const matches = (text: string, status: string) => text.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')) && (!filter || filter === status);
  const bomState = (b: Pick<Bom, 'id' | 'productId' | 'status' | 'effectiveAt'>) => b.status === 'DRAFT' ? 'DRAFT' : currentBom(boms, b.productId)?.id === b.id ? 'CURRENT' : new Date(b.effectiveAt) > new Date() ? 'SCHEDULED' : 'HISTORY';
  const filteredBoms = boms.filter(b => matches(`${b.product.code} ${b.product.name} ${b.version}`, bomState(b)));
  const filteredOrders = orders.filter(o => matches(`${o.id} ${o.bom.product.name} ${o.bom.product.code} ${o.assignedTo.name}`, o.status));
  const orderPage = usePagination(filteredOrders, `order:${search}:${filter}`);
  function createVersion(productId: string) {
    const base = currentBom(boms, productId) || boms.filter(b => b.productId === productId).sort((a, b) => b.version - a.version)[0];
    setTemplate(base); setEditing(null);
  }
  const activeOrder = orders.find(o => o.id === selectedOrder);
  const selectedBom = boms.find(b => b.id === selectedBomId);
  return <>{mode === 'orders' && can(user, 'production:manage', 'material:approve') && <MaterialShortages user={user} />}<section className="panel"><div className="list-controls"><div className="filters"><button type="button" disabled={loading || busy} onClick={() => void load()}>Tải lại</button><input aria-label="Tìm kiếm" placeholder={mode === 'boms' ? 'Tìm món, mã thành phẩm hoặc phiên bản…' : 'Tìm thành phẩm, người nhận, mã lệnh…'} value={search} onChange={e => setSearch(e.target.value)} /><select aria-label="Trạng thái" value={filter} onChange={e => setFilter(e.target.value)}><option value="">Mọi trạng thái</option>{(mode === 'boms' ? ['DRAFT', 'CURRENT', 'SCHEDULED', 'HISTORY'] : ['NEW', 'RECEIVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).map(s => <option key={s} value={s}>{labels[s]}</option>)}</select></div>{((mode === 'boms' && bomManage) || (mode === 'orders' && manage)) && <button className="primary" disabled={loading || busy || !!error} onClick={() => { setTemplate(undefined); if (mode === 'boms') setEditing(null); else setNewOrder(true); }}>+ {mode === 'boms' ? 'Tạo công thức' : 'Tạo lệnh'}</button>}</div>{error && <p className="error" role="alert">{error}</p>}{loading ? <p className="empty">Đang tải…</p> : mode === 'boms' ? <FormulaLibrary all={boms} filtered={filteredBoms} stateOf={bomState} open={setSelectedBomId} createVersion={createVersion} editable={bomManage} busy={busy} resetKey={`bom:${search}:${filter}`} autoExpand={!!search || !!filter} /> : <div className="document-grid">{orderPage.rows.map(o => <DocumentCard key={o.id} type="Lệnh chế biến" reference={o.id} title={o.bom.product.name} status={statusInfo('order', o.status).label} tone={statusInfo('order', o.status).tone} onOpen={() => setSelectedOrder(o.id)} footer={<span>Lệnh {o.id.slice(0, 8)}</span>}><div className="document-quantity">{fmt(o.quantity)} <small>{o.bom.product.unit.symbol}</small></div><p>Người nhận: <strong>{o.assignedTo.name}</strong></p><small>Giao {when(o.assignedAt)}</small><p className={o.dueAt && new Date(o.dueAt) < new Date() && !['COMPLETED', 'CANCELLED'].includes(o.status) ? 'danger' : ''}>Hạn: {o.dueAt ? when(o.dueAt) : 'Không đặt'}</p><small>Công thức v{o.bom.version}</small>{o.replenishments?.length > 0 && <small className="danger">Phục vụ: {o.replenishments.map(r => r.saleLine.sale.table?.name || r.saleLine.sale.code).join(', ')}</small>}</DocumentCard>)}</div>}{mode === 'orders' && !filteredOrders.length && !loading && <p className="empty">Không có kết quả phù hợp.</p>}{!loading && mode === 'orders' && <Pagination pager={orderPage} disabled={busy} />}</section>{selectedOrder && mode === 'orders' && <ExecutionPanel key={selectedOrder} orderId={selectedOrder} overview={activeOrder ? { assignedBy: activeOrder.assignedBy.name, assignedTo: activeOrder.assignedTo.name, dueAt: activeOrder.dueAt, version: activeOrder.bom.version, plan: activeOrder.bom.lines.map(l => ({ name: l.material.name, quantity: Number(l.quantity) * Number(activeOrder.quantity) / Number(activeOrder.bom.outputQuantity), unit: l.material.unit.symbol })) } : undefined} user={user} close={() => setSelectedOrder(undefined)} changed={load} />}{selectedBom && <Drawer title={`Công thức · ${selectedBom.product.name}`} onClose={() => setSelectedBomId(undefined)} locked={busy}>{error && <p className="error">{error}</p>}<StatusBadge area="bom" code={bomState(selectedBom)} /><div className="formula-meta"><strong>Định mức cho {fmt(selectedBom.outputQuantity)} {selectedBom.product.unit.symbol}</strong><span>Phiên bản v{selectedBom.version} · hiệu lực {when(selectedBom.effectiveAt)}</span></div><div className="table-wrap"><table><thead><tr><th>Nguyên liệu</th><th>Định mức</th></tr></thead><tbody>{selectedBom.lines.map(l => <tr key={l.materialId}><td>{l.material.name}</td><td>{fmt(l.quantity)} {l.material.unit.symbol}</td></tr>)}</tbody></table></div>{bomManage && selectedBom.status === 'DRAFT' && <div className="detail-actions"><button className="primary" disabled={busy} onClick={() => void action(`production/boms/${selectedBom.id}/activate`, 'POST', 'Áp dụng công thức? Sau đó không thể sửa/xóa.')}>Áp dụng công thức</button><button disabled={busy} onClick={() => { setSelectedBomId(undefined); setEditing(selectedBom); }}>Sửa nháp</button><button className="danger" disabled={busy} onClick={() => void action(`production/boms/${selectedBom.id}`, 'DELETE', 'Xóa công thức nháp?')}>Xóa nháp</button></div>}</Drawer>}{(editing !== undefined || newOrder) && <ProductionEditor key={editing?.id || template?.id || mode} mode={mode} bom={editing || null} template={template} refs={refs} boms={boms} close={() => { setEditing(undefined); setNewOrder(false); setTemplate(undefined); }} saved={load} />}</>;
}
function ProductionEditor({ mode, bom, template, refs, boms, close, saved }: { mode: 'boms' | 'orders'; bom: Bom | null; template?: Bom; refs: Refs; boms: Bom[]; close: () => void; saved: () => Promise<void> }) {
  const source = bom || template;
  const [productId, setProduct] = useState(source?.productId || '');
  const [amount, setAmount] = useState('1'), [effective, setEffective] = useState(local(bom?.effectiveAt || new Date().toISOString()));
  const [lines, setLines] = useState(source?.lines.map(l => ({ materialId: l.materialId, quantity: Number(source.outputQuantity) === 1 ? l.quantity : '' })) || [{ materialId: '', quantity: '' }]);
  const [assignee, setAssignee] = useState(''), [due, setDue] = useState('');
  const [busy, setBusy] = useState(false), [error, setError] = useState('');
  const selected = currentBom(boms, productId);
  const product = refs.products.find(p => p.id === productId);
  const nextVersion = Math.max(0, ...boms.filter(b => b.productId === productId).map(b => b.version)) + 1;
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError('');
    try {
      const data = mode === 'boms' ? { productId, effectiveAt: new Date(effective).toISOString(), lines } : { productId, expectedBomId: selected?.id, quantity: amount, assignedToId: assignee, dueAt: due ? new Date(due).toISOString() : null };
      await api(`production/${mode}${mode === 'boms' && bom ? `/${bom.id}` : ''}`, mode === 'boms' && bom ? 'PUT' : 'POST', data);
      await saved(); close();
    } catch (e) { setError(e instanceof Error ? e.message : 'Không lưu được'); } finally { setBusy(false); }
  }
  return <Modal title={mode === 'boms' ? 'Công thức nháp' : 'Tạo lệnh sản xuất'} onClose={close} locked={busy}><form onSubmit={submit}><fieldset disabled={busy}>
      <div className="form-grid">
        <label className="field">{mode === 'boms' ? 'Thành phẩm' : 'Thành phẩm cần sản xuất'}<select required disabled={mode === 'boms' && !!source} value={productId} onChange={e => setProduct(e.target.value)}><option value="">Chọn…</option>{refs.products.map(p => <option key={p.id} value={p.id}>{p.code} · {p.name} ({p.unit.symbol})</option>)}{source && !refs.products.some(p => p.id === source.productId) && <option value={source.productId}>{source.product.name} (ngừng sử dụng — chưa thể lưu)</option>}</select></label>
        {mode === 'boms' ? <label className="field">Có hiệu lực từ<input required type="datetime-local" value={effective} onChange={e => setEffective(e.target.value)} /></label> : <>
          <label className="field">Số lượng cần sản xuất<input required type="number" min="0.001" step="0.001" value={amount} onChange={e => setAmount(e.target.value)} /></label>
          <label className="field">Nhân viên bếp nhận lệnh<select required value={assignee} onChange={e => setAssignee(e.target.value)}><option value="">Chọn…</option>{refs.employees.map(p => <option key={p.id} value={p.id}>{p.code} · {p.name}</option>)}</select></label>
          <label className="field">Hạn hoàn thành (tùy chọn)<input type="datetime-local" value={due} onChange={e => setDue(e.target.value)} /></label>
        </>}
      </div>
      {mode === 'boms' ? <>
        <div className="formula-meta"><strong>Công thức cho 1 {product?.unit.symbol || source?.product.unit.symbol || 'đơn vị'}{product ? ` ${product.name}` : ''}</strong><span>{bom ? `Phiên bản v${bom.version}` : productId ? `Phiên bản dự kiến v${nextVersion} · tự cấp khi lưu` : 'Phiên bản tự cấp khi lưu'}</span>{template && <span>Định mức sao chép từ v{template.version} · có thể chỉnh sửa trước khi lưu</span>}</div>
        {source && Number(source.outputQuantity) !== 1 && <p className="hint">Công thức nguồn khai báo cho {fmt(source.outputQuantity)} đơn vị. Hãy nhập lại định mức cho 1 đơn vị.</p>}
        <h3 className="line-section-title">Nguyên liệu và định mức</h3>
        {lines.map((l, i) => <section className="entry-line" key={i}>
          <div className="entry-line-heading"><strong>Nguyên liệu {i + 1}</strong><button className="remove-line" type="button" disabled={lines.length === 1} aria-label={`Xóa nguyên liệu ${i + 1}`} onClick={() => setLines(lines.filter((_, j) => j !== i))}><span aria-hidden="true">×</span> Xóa dòng</button></div>
          <div className="form-grid"><label className="field">Nguyên liệu<select required value={l.materialId} onChange={e => setLines(lines.map((v, j) => j === i ? { ...v, materialId: e.target.value } : v))}><option value="">Chọn…</option>{source?.lines.find(x => x.materialId === l.materialId) && !refs.materials.some(m => m.id === l.materialId) && <option value={l.materialId}>{source.lines.find(x => x.materialId === l.materialId)!.material.name} (ngừng sử dụng — chọn NVL khác)</option>}{refs.materials.map(m => <option key={m.id} value={m.id}>{m.code} · {m.name} ({m.unit.symbol})</option>)}</select></label>
          <label className="field">Định mức ({refs.materials.find(m => m.id === l.materialId)?.unit.symbol || 'đơn vị cơ sở'})<input required type="number" min="0.001" step="0.001" placeholder="VD: 0.2" value={l.quantity} onChange={e => setLines(lines.map((v, j) => j === i ? { ...v, quantity: e.target.value } : v))} /></label></div>
        </section>)}
        <button className="add-line" type="button" disabled={lines.length >= 100} onClick={() => setLines([...lines, { materialId: '', quantity: '' }])}>+ Thêm nguyên liệu</button>
      </> : selected ? <div className="formula-meta"><strong>Công thức v{selected.version} · hiệu lực {when(selected.effectiveAt)}</strong><span>Nhu cầu dự kiến cho {fmt(amount || '0')} {product?.unit.symbol}:</span>{selected.lines.some(l => l.material.status === 'INACTIVE') && <span className="danger">Có NVL ngừng sử dụng; cần công thức mới trước khi giao lệnh.</span>}{selected.lines.map(l => <p key={l.materialId}>{l.material.name}: {fmt(Number(l.quantity) * Number(amount) / Number(selected.outputQuantity))} {l.material.unit.symbol}</p>)}</div> : productId && <p className="hint">Thành phẩm chưa có công thức được áp dụng và đến ngày hiệu lực.</p>}
      {error && <p className="error" role="alert">{error}</p>}
      <div className="dialog-actions"><button type="button" onClick={close}>Hủy</button><button className="primary" disabled={mode === 'orders' && (!selected || !selected.lines.length || selected.lines.some(l => l.material.status === 'INACTIVE'))}>{busy ? 'Đang lưu…' : mode === 'boms' ? 'Lưu nháp' : 'Giao lệnh'}</button></div>
    </fieldset></form>
  </Modal>;
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { api, money, fmt, dispatched, can, type User, type Product, type Sale, type DiningTable } from './sales-api';
import ServiceProgress from './service-progress';
import BillReceipt from './bill-receipt';
import { Drawer } from './document-ui';
type Line = { id?: string; productId: string; quantity: string; note: string };
export default function SaleEditor({ sale, products, close, saved, tables, initialTableId = '', user }: { sale: Sale | null; products: Product[]; close: () => void; saved: () => Promise<void>; tables: DiningTable[]; initialTableId?: string; user: User }) {
  const [current, setCurrent] = useState(sale), [tableId, setTableId] = useState(sale?.tableId || initialTableId);
  const [lines, setLines] = useState<Line[]>(sale?.lines.filter(l => !l.sentAt).map(l => ({ id: l.id, productId: l.productId, quantity: l.quantity, note: l.note })) || []);
  const [view, setView] = useState<'order' | 'bill' | 'cancel'>(sale && (!['DRAFT','CONFIRMED'].includes(sale.status) || !can(user,'sale:create')) ? 'bill' : 'order'), [method, setMethod] = useState('CASH');
  const [search, setSearch] = useState(''), [category, setCategory] = useState(''), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const currentRef = useRef(current);
  useEffect(()=>{currentRef.current=current;},[current]);
  const [remoteChange,setRemoteChange]=useState(false);
  const [stockProducts, setStockProducts] = useState(products);
  useEffect(() => {
    let active = true;
    async function refresh() {
      try {
        const [ps, orders] = await Promise.all([api<Product[]>('products'), current?.id ? api<Sale[]>('sales') : Promise.resolve([])]);
        if (!active) return; setStockProducts(ps);
        const fresh = orders.find(s => s.id === current?.id);
        if(fresh && currentRef.current && fresh.version > currentRef.current.version && JSON.stringify(currentRef.current.lines.filter(l=>!l.sentAt))!==JSON.stringify(fresh.lines.filter(l=>!l.sentAt)))setRemoteChange(true);
        if (fresh) setCurrent(prev => prev && fresh.version >= prev.version && JSON.stringify(prev.lines.filter(l => !l.sentAt)) === JSON.stringify(fresh.lines.filter(l => !l.sentAt)) ? fresh : prev);
      } catch { if (active) setError('Không cập nhật được tồn và tiến độ. Mở lại bàn để cập nhật trước khi thao tác.'); }
    }
    void refresh(); const timer = window.setInterval(() => void refresh(), 15000);
    return () => { active = false; window.clearInterval(timer); };
  }, [current?.id]);
  const editable = can(user,'sale:create') && (!current || ['DRAFT','CONFIRMED'].includes(current.status));
  useEffect(()=>{if(!editable)setView('bill');},[editable]);
  const [notice,setNotice]=useState(''),[cancelReason,setCancelReason]=useState('');
  const savedDraft = current?.lines.filter(l=>!l.sentAt).map(l=>({id:l.id,productId:l.productId,quantity:l.quantity,note:l.note})) || [];
  const dirty = JSON.stringify(savedDraft)!==JSON.stringify(lines);
  function dismiss(){if(!dirty || window.confirm('Món mới chưa lưu. Đóng và bỏ các thay đổi này?'))close();}
  const sent = current?.lines.filter(l => l.sentAt) || [];
  const price = (l: Line) => l.id ? current?.lines.find(x => x.id === l.id)?.unitPrice || '0' : stockProducts.find(p => p.id === l.productId)?.sellingPrice || '0';
  const product = (id: string) => stockProducts.find(p => p.id === id) || products.find(p=>p.id===id);
  const total = sent.reduce((v, l) => v + Number(l.quantity) * Number(l.unitPrice), 0) + lines.reduce((v, l) => v + (Number.isFinite(Number(l.quantity))?Number(l.quantity):0) * Number(price(l)), 0);
  function add(p: Product) {
    const index = lines.findIndex(l => l.productId === p.id && !l.note);
    if (index >= 0) setLines(lines.map((l, i) => i === index ? { ...l, quantity: String(Number(l.quantity) + 1) } : l));
    else if (lines.length < 100) setLines([...lines, { productId: p.id, quantity: '1', note: '' }]);
  }
  function change(i: number, patch: Partial<Line>) { setLines(lines.map((l, j) => i === j ? { ...l, ...patch } : l)); }
  async function reloadOrder(){
    if(!current || dirty&&!window.confirm('Có món mới chưa lưu. Nạp lại và bỏ thay đổi trên máy này?'))return;
    setBusy(true);setError('');
    try{const all=await api<Sale[]>('sales');const fresh=all.find(s=>s.id===current.id);if(!fresh)throw new Error('Không tìm thấy đơn');setCurrent(fresh);setLines(fresh.lines.filter(l=>!l.sentAt).map(l=>({id:l.id,productId:l.productId,quantity:l.quantity,note:l.note})));setRemoteChange(false);}catch(e){setError(e instanceof Error?e.message:'Không tải được đơn');}finally{setBusy(false);}
  }
  async function submit(send: boolean) {
    if (lines.some(l => !Number.isFinite(Number(l.quantity)) || Number(l.quantity) <= 0)) { setError('Số lượng món phải lớn hơn 0'); return; }
    if (send) {
      const shortages = [...new Set(lines.map(l => l.productId))].filter(id => lines.filter(l => l.productId === id).reduce((sum,l) => sum + Number(l.quantity),0) > Number(stockProducts.find(p => p.id === id)?.available || 0));
      if (shortages.length && !window.confirm('Có món vượt lượng sẵn: ' + shortages.map(id => product(id)?.name || id).join(', ') + '. Gửi đơn ở trạng thái chờ đáp ứng? Quản lý cần quyết định yêu cầu bổ sung.')) return;
    }
    setBusy(true); setError('');
    try {
      const result = await api<Sale>(current ? `sales/${current.id}` : 'sales', current ? 'PUT' : 'POST', { tableId: tableId || null, version: current?.version, lines });
      // Preserve the saved ID/version if sending fails; a retry must not create another order.
      setCurrent(result);
      setLines(result.lines.filter(l => !l.sentAt).map(l => ({ id: l.id, productId: l.productId, quantity: l.quantity, note: l.note })));
      if (send) { const sentOrder = await api<Sale>(`sales/${result.id}/send`, 'POST', { version: result.version }); setCurrent(sentOrder); setLines([]); }
      setStockProducts(await api<Product[]>('products'));
      await saved(); setNotice(send?'Đã gửi món mới đến bếp.':'Đã lưu đơn.');
    } catch (e) { setError(e instanceof Error ? e.message : 'Không lưu được đơn'); }
    finally { setBusy(false); }
  }
  async function serviceAction(action: 'serve' | 'replenish', lineId: string, quantity: string) {
    if (!current || !window.confirm(action === 'serve' ? 'Xác nhận đã mang '+fmt(quantity)+' đến khách?' : 'Yêu cầu chế biến bổ sung '+fmt(quantity)+'?')) return;
    setBusy(true); setError('');
    try { const result = await api<Sale>(`sales/${current.id}/${action}`, 'POST', { lineId, quantity, version: current.version }); setCurrent(result); setStockProducts(await api<Product[]>('products')); await saved(); }
    catch(e) { setError(e instanceof Error ? e.message : 'Không thực hiện được'); } finally { setBusy(false); }
  }
  async function changeLine(body: { lineId: string; quantity: string; reason: string; productId?: string; replacementQuantity?: string }) {
    if (!current) return false;
    const original = current.lines.filter(l=>!l.sentAt).map(l=>({id:l.id,productId:l.productId,quantity:l.quantity,note:l.note}));
    if (JSON.stringify(original)!==JSON.stringify(lines)) {setError('Lưu hoặc gửi món mới trước khi đổi/hủy món cũ');return false;}
    setBusy(true);setError('');
    try { const next = await api<Sale>(`sales/${current.id}/change-line`,'POST',{...body,version:current.version});setCurrent(next);setStockProducts(await api<Product[]>('products'));await saved();return true; }
    catch(e){setError(e instanceof Error?e.message:'Không hủy được');return false;}finally{setBusy(false);}
  }
  async function cancelOrder() {
    if(!current || !cancelReason.trim())return;
    setBusy(true);setError('');
    try{await api(`sales/${current.id}/cancel`,'POST',{reason:cancelReason,version:current.version});await saved();close();}
    catch(e){setError(e instanceof Error?e.message:'Không hủy được');}finally{setBusy(false);}
  }
  async function closeEmpty() {
    if (!current || !window.confirm('Đóng đơn không còn món tính tiền?')) return;
    setBusy(true);setError('');
    try{await api(`sales/${current.id}/cancel`,'POST',{reason:'Đơn đã hủy hết món',version:current.version});await saved();close();}catch(e){setError(e instanceof Error?e.message:'Không đóng được');}finally{setBusy(false);}
  }
  async function pay() {
    if (!current || !window.confirm('Đã đối chiếu với khách: món trên hóa đơn đúng thực tế, món không phục vụ đã đổi/hủy, và đã thu đủ ' + money(current.total) + '?')) return;
    setBusy(true); setError('');
    try { const paid = await api<Sale>(`sales/${current.id}/pay`, 'POST', { method, version:current.version }); setCurrent(paid); setLines([]); setView('bill'); setNotice('Đã thu tiền và đóng đơn. Có thể in bill tại đây.'); await saved(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Không thanh toán được'); } finally { setBusy(false); }
  }
  const payable = !!current && !current.payment && current.status === 'CONFIRMED' && Number(current.total)>0 && !current.lines.some(l => !l.sentAt) && !current.exports.some(e => e.status === 'PENDING');
  const shown = stockProducts.filter(p => (!category || p.category.name === category) && (p.name + ' ' + p.code).toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')));
  return <Drawer title={current?.table?.name || tables.find(t => t.id === tableId)?.name || 'Đơn mang đi'} onClose={dismiss} locked={busy}>{remoteChange&&<p className="remote-notice" role="status">Đơn đã được chỉnh sửa trên thiết bị khác. <button disabled={busy} onClick={()=>void reloadOrder()}>Nạp bản mới</button></p>}<div className="pos-mode">{editable && <button disabled={busy} className={view === 'order' ? 'active' : ''} onClick={() => setView('order')}>Gọi món</button>}<button disabled={busy} className={view === 'bill' ? 'active' : ''} onClick={() => setView('bill')}>Tính tiền</button>{editable && current && !current.exports.some(e=>['PENDING','APPROVED'].includes(e.status)) && <button className="danger pos-cancel" disabled={busy||dirty} onClick={()=>setView('cancel')}>Hủy đơn</button>}</div>{notice && <p className="sales-notice" role="status">{notice}</p>}{view === 'cancel' ? <div className="pos-bill"><form onSubmit={e=>{e.preventDefault();void cancelOrder();}}><fieldset disabled={busy}><h3>Hủy đơn {current?.table?.name||'mang đi'}</h3><label>Lý do hủy<textarea required maxLength={500} rows={3} value={cancelReason} onChange={e=>setCancelReason(e.target.value)} /></label>{error&&<p className="error" role="alert">{error}</p>}<div className="dialog-actions"><button type="button" onClick={()=>setView('order')}>Quay lại</button><button className="danger">Xác nhận hủy đơn</button></div></fieldset></form></div> : view === 'bill' ? <div className="pos-bill">{error && <p className="error" role="alert">{error}</p>}{!current ? <p>Lưu tạm hoặc gửi món để tạo đơn trước khi xem hóa đơn.</p> : <><BillReceipt sale={current} disabled={busy || dirty || remoteChange} />{current.lines.some(l=>l.changes?.length) && <details className="subtle-help"><summary>Lịch sử đổi / hủy món</summary>{current.lines.flatMap(l=>(l.changes||[]).map(c=><p key={c.id}><strong>{l.productName}</strong> · bỏ {fmt(c.quantity)} · {c.reason} · {c.changedBy.name} · {new Date(c.changedAt).toLocaleString('vi-VN')}</p>))}</details>}{JSON.stringify(lines) !== JSON.stringify(current.lines.filter(l => !l.sentAt).map(l => ({ id: l.id, productId: l.productId, quantity: l.quantity, note: l.note }))) && <p className="hint">Có thay đổi chưa lưu. Hóa đơn chỉ hiển thị dữ liệu đã lưu; quay lại Gọi món để lưu hoặc gửi.</p>}{current.status === 'CANCELLED' ? <p className="hint">Đơn đã hủy. Có thể xem lịch sử bên dưới.</p> : current.payment ? <p className="hint">Đã thanh toán {money(current.payment.amount)}</p> : <><p className="hint">{payable ? 'Đối chiếu món với khách trước khi xác nhận thu tiền.' : 'Xử lý món chưa gửi hoặc phiếu xuất cũ đang chờ trước khi đóng đơn.'}</p>{['DRAFT','CONFIRMED'].includes(current.status) && current.lines.every(l=>Number(l.quantity)===0) && can(user,'sale:create') && <button disabled={busy} onClick={()=>void closeEmpty()}>Đóng đơn không tính tiền</button>}{can(user, 'payment:create') && current.status === 'CONFIRMED' && <><label>Phương thức<select disabled={busy} value={method} onChange={e => setMethod(e.target.value)}><option value="CASH">Tiền mặt</option><option value="TRANSFER">Chuyển khoản</option></select></label><button className="primary" disabled={busy || !payable || JSON.stringify(lines) !== JSON.stringify(current.lines.filter(l => !l.sentAt).map(l => ({ id: l.id, productId: l.productId, quantity: l.quantity, note: l.note })))} onClick={() => void pay()}>Thu tiền / Đóng bàn</button></>}</>}</>}</div> : <div className="pos-workspace"><section className="pos-menu" aria-label="Thực đơn"><input autoComplete="off" aria-label="Tìm món" placeholder="Tìm món theo tên hoặc mã…" value={search} onChange={e => setSearch(e.target.value)} /><div className="pos-categories" aria-label="Nhóm món"><button className={!category ? 'is-active' : ''} onClick={() => setCategory('')}>Tất cả</button>{[...new Set(products.map(p => p.category.name))].map(c => <button className={category === c ? 'is-active' : ''} key={c} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="pos-menu-grid">{shown.map(p => <button disabled={busy || lines.length >= 100 && !lines.some(l => l.productId === p.id && !l.note)} key={p.id} onClick={() => add(p)} className="pos-menu-item"><strong>{p.name}</strong><span>{money(p.sellingPrice)}</span><small className={Number(p.available) <= 0 ? 'menu-out' : 'menu-ready'}>{Number(p.available) > 0 ? `Sẵn ${fmt(p.available)} ${p.unit.symbol}` : 'Cần chờ bổ sung'}</small></button>)}</div>{!shown.length && <p className="empty">Không tìm thấy món.</p>}</section><section className="pos-ticket" aria-label="Đơn hiện tại"><div className="pos-ticket-context">{current || initialTableId ? null : <label>Phục vụ tại<select disabled={busy} value={tableId} onChange={e => setTableId(e.target.value)}><option value="">Mang đi</option>{tables.filter(t => t.status === 'ACTIVE').map(t => <option value={t.id} key={t.id}>{t.area ? t.area + ' · ' : ''}{t.name}</option>)}</select></label>}</div><div className="pos-ticket-lines">{current && <ServiceProgress sale={current} products={stockProducts} user={user} busy={busy} act={serviceAction} change={changeLine} />}{lines.length > 0 && <h3>Món mới <span>· {lines.length}</span></h3>}{!lines.length && !sent.length && <p className="pos-empty">Bấm món bên trái để thêm vào đơn.</p>}{lines.map((l, i) => <div className="pos-ticket-item" key={l.id || i}><div className="pos-item-heading"><strong>{product(l.productId)?.name || current?.lines.find(x => x.id === l.id)?.productName}</strong><button disabled={busy} aria-label={`Bỏ ${product(l.productId)?.name || 'món'}`} className="pos-remove" onClick={() => setLines(lines.filter((_, j) => j !== i))}>×</button></div><div className="pos-item-quantity"><button disabled={busy || Number(l.quantity) <= 1} aria-label="Giảm số lượng" onClick={() => change(i, { quantity: String(Number(l.quantity) - 1) })}>−</button><input aria-label={`Số lượng ${product(l.productId)?.name || 'món'}`} disabled={busy} type="number" min="0.001" step="0.001" value={l.quantity} onChange={e => change(i, { quantity: e.target.value })} /><button disabled={busy} aria-label="Tăng số lượng" onClick={() => change(i, { quantity: String(Number(l.quantity) + 1) })}>+</button><strong>{money((Number.isFinite(Number(l.quantity))?Number(l.quantity):0) * Number(price(l)))}</strong></div><details className="pos-line-note"><summary>{l.note || 'Thêm ghi chú'}</summary><input disabled={busy} aria-label="Ghi chú món" className="pos-note" maxLength={500} placeholder="Ghi chú: không cay, ít muối…" value={l.note} onChange={e => change(i, { note: e.target.value })} /></details></div>)}</div><div className="pos-ticket-footer">{error && <p className="error" role="alert">{error}</p>}<div className="pos-total"><span>Tổng tiền</span><strong>{money(total)}</strong></div><div className="pos-submit"><button disabled={busy || !lines.length && !sent.length} onClick={() => void submit(false)}>Lưu tạm</button><button disabled={busy || !lines.length} className="primary" onClick={() => void submit(true)}>{busy ? 'Đang xử lý…' : 'Gửi bếp'}</button></div></div></section></div>}</Drawer>;
}


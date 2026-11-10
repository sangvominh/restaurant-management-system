'use client';
import { useEffect, useRef, useState } from 'react';
import { api, money, fmt, can, type User, type Product, type Sale, type DiningTable } from './sales-api';
import ConfirmedItems from './confirmed-items';
import OrderMenu from './order-menu';
import BillReceipt from './bill-receipt';
import { Drawer } from './document-ui';
import './order-entry.css';

type Line = { key: string; id?: string; productId: string; quantity: string; note: string };
const draftOf = (sale: Sale | null): Line[] => sale?.lines.filter(l => !l.sentAt).map(l => ({ key: l.id, id: l.id, productId: l.productId, quantity: l.quantity, note: l.note })) || [];
const payload = (lines: Line[]) => lines.map(({ id, productId, quantity, note }) => ({ id, productId, quantity, note }));
const signature = (lines: Line[]) => JSON.stringify(payload(lines));
const round = (n: number) => Math.round(n * 1000) / 1000;
const positive = (value: string) => /^\d{1,15}(\.\d{1,3})?$/.test(value) && Number(value) > 0;
const message = (e: unknown) => e instanceof Error ? e.message : 'Không thực hiện được';

export default function SaleEditor({ sale, products, close, saved, tables, initialTableId = '', user }: {
  sale: Sale | null; products: Product[]; close: () => void; saved: () => Promise<void>;
  tables: DiningTable[]; initialTableId?: string; user: User;
}) {
  const [current, setCurrent] = useState(sale), [lines, setLines] = useState<Line[]>(() => draftOf(sale));
  const [stockProducts, setStockProducts] = useState(products), [tableId, setTableId] = useState(sale?.tableId || initialTableId);
  const [view, setView] = useState<'order' | 'bill' | 'cancel'>(sale && (!['DRAFT', 'CONFIRMED'].includes(sale.status) || !can(user, 'sale:create')) ? 'bill' : 'order');
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState(''), [refreshError, setRefreshError] = useState('');
  const [remoteChange, setRemoteChange] = useState(false), [method, setMethod] = useState('CASH'), [cancelReason, setCancelReason] = useState('');
  const currentRef = useRef(current), linesRef = useRef(lines), busyRef = useRef(false), epoch = useRef(0), nextKey = useRef(0);
  function setDraft(next: Line[]) { linesRef.current = next; setLines(next); }
  function accept(next: Sale, resetDraft: boolean) { currentRef.current = next; setCurrent(next); if (resetDraft) setDraft(draftOf(next)); }
  function begin() { if (busyRef.current) return false; busyRef.current = true; epoch.current++; setBusy(true); setError(''); setNotice(''); return true; }
  function finish() { epoch.current++; busyRef.current = false; setBusy(false); }
  const dirty = signature(lines) !== signature(draftOf(current));
  const editable = can(user, 'sale:create') && (!current || ['DRAFT', 'CONFIRMED'].includes(current.status));
  const legacy = !!current?.exports.some(e => ['PENDING', 'APPROVED'].includes(e.status));
  const locked = busy || remoteChange || !editable || legacy;
  const confirmed = current?.lines.filter(l => l.sentAt && Number(l.quantity) > 0) || [];
  const selected = lines.reduce<Record<string, number>>((all, l) => { all[l.productId] = round((all[l.productId] || 0) + (positive(l.quantity) ? Number(l.quantity) : 0)); return all; }, {});
  const product = (id: string) => stockProducts.find(p => p.id === id);
  const price = (l: Line) => l.id ? current?.lines.find(x => x.id === l.id)?.unitPrice || '0' : product(l.productId)?.sellingPrice || '0';
  const draftTotal = lines.reduce((sum, l) => sum + (positive(l.quantity) ? Number(l.quantity) : 0) * Number(price(l)), 0);
  const confirmedTotal = confirmed.reduce((sum, l) => sum + Number(l.quantity) * Number(l.unitPrice), 0);
  const roomFor = (l: Line) => Math.max(0, round(Number(product(l.productId)?.available || 0) - (selected[l.productId] || 0) + (positive(l.quantity) ? Number(l.quantity) : 0)));
  const problems = lines.map(l => !positive(l.quantity) ? 'Nhập số lượng lớn hơn 0, tối đa 3 chữ số lẻ.' : !product(l.productId) ? 'Món đã ngừng bán; bỏ khỏi phần đang chọn.' : Number(l.quantity) > roomFor(l) ? 'Chỉ còn chọn được ' + fmt(roomFor(l)) + ' ' + product(l.productId)!.unit.symbol + ' cho dòng này.' : '');
  const title = current?.table?.name || tables.find(t => t.id === tableId)?.name || 'Mang đi';
  const payable = !!current && current.status === 'CONFIRMED' && !current.payment && !legacy && !dirty && !current.lines.some(l => !l.sentAt) && Number(current.total) > 0;
  useEffect(() => { if (!editable) setView('bill'); }, [editable]);

  // Discard polling responses that started before a write; preserve the local cart.
  useEffect(() => {
    let active = true;
    async function poll() {
      if (busyRef.current) return;
      const generation = epoch.current;
      try {
        const id = currentRef.current?.id;
        const [ps, orders] = await Promise.all([api<Product[]>('products'), id ? api<Sale[]>('sales') : Promise.resolve([])]);
        if (!active || busyRef.current || generation !== epoch.current) return;
        setStockProducts(ps); setRefreshError('');
        const fresh = orders.find(s => s.id === id), previous = currentRef.current;
        if (fresh && previous && fresh.version > previous.version) {
          if (signature(linesRef.current) !== signature(draftOf(previous))) setRemoteChange(true);
          else { currentRef.current = fresh; setCurrent(fresh); const next = draftOf(fresh); linesRef.current = next; setLines(next); setRemoteChange(false); }
        }
      } catch { if (active && generation === epoch.current) setRefreshError('Chưa cập nhật được tồn. Dùng Tải lại trước khi xác nhận.'); }
    }
    void poll(); const timer = window.setInterval(() => void poll(), 15000);
    return () => { active = false; window.clearInterval(timer); };
  }, [current?.id]);

  function dismiss() { if (!dirty || window.confirm('Bỏ các thay đổi chưa lưu trong phần đang chọn và đóng đơn?')) close(); }
  function change(key: string, patch: Partial<Line>) { setNotice(''); setError(''); setDraft(linesRef.current.map(l => l.key === key ? { ...l, ...patch } : l)); }
  function remove(key: string) { setNotice(''); setError(''); setDraft(linesRef.current.filter(l => l.key !== key)); }
  function add(p: Product) {
    if (locked) return;
    const previous = linesRef.current, chosen = previous.filter(l => l.productId === p.id).reduce((sum, l) => sum + (positive(l.quantity) ? Number(l.quantity) : 0), 0);
    const room = round(Number(p.available) - chosen);
    if (room <= 0) { setError('Đã chọn hết lượng còn bán của ' + p.name); return; }
    const line = previous.find(l => l.productId === p.id);
    if (line && !positive(line.quantity)) { setError('Sửa số lượng của ' + p.name + ' trong phần đang chọn trước.'); return; }
    const amount = Math.min(1, room);
    if (line) change(line.key, { quantity: String(round(Number(line.quantity) + amount)) });
    else if (previous.length < 100) { setNotice(''); setError(''); setDraft([...previous, { key: 'new-' + ++nextKey.current, productId: p.id, quantity: String(amount), note: '' }]); }
  }
  async function refreshAfterWrite() {
    const results = await Promise.allSettled([api<Product[]>('products'), saved()]);
    if (results[0].status === 'fulfilled') setStockProducts(results[0].value);
    setRefreshError(results.some(r => r.status === 'rejected') ? 'Thao tác đã lưu, nhưng chưa tải lại được toàn bộ dữ liệu. Bấm Tải lại.' : '');
  }
  async function reloadOrder() {
    if (busyRef.current || currentRef.current && dirty && !window.confirm('Nạp bản mới sẽ bỏ thay đổi chưa lưu trong phần đang chọn. Tiếp tục?')) return;
    if (!begin()) return;
    try {
      const [ps, orders] = await Promise.all([api<Product[]>('products'), currentRef.current ? api<Sale[]>('sales') : Promise.resolve([])]);
      setStockProducts(ps); setRefreshError('');
      if (currentRef.current) { const fresh = orders.find(s => s.id === currentRef.current!.id); if (!fresh) throw new Error('Không tìm thấy đơn'); accept(fresh, true); }
      setRemoteChange(false);
    } catch (e) { setError(message(e)); } finally { finish(); }
  }
  async function submit(confirm: boolean) {
    if (locked || !lines.length && !confirmed.length || confirm && !lines.length) return;
    const invalid = problems.find(Boolean);
    if (invalid) { setError(invalid); return; }
    if (!begin()) return;
    try {
      const result = await api<Sale>(current ? 'sales/' + current.id : 'sales', current ? 'PUT' : 'POST', { tableId: tableId || null, version: current?.version, confirm, lines: payload(lines) });
      accept(result, true); setRemoteChange(false);
      setNotice(confirm ? 'Đã xác nhận ' + lines.length + ' dòng món. Có thể gọi thêm hoặc chuyển sang Tính tiền.' : 'Đã lưu nháp. Món nháp chưa giữ lượng tại cửa hàng.');
      await refreshAfterWrite();
    } catch (e) {
      setError(message(e));
      try { setStockProducts(await api<Product[]>('products')); } catch { setRefreshError('Không tải được tồn mới.'); }
    } finally { finish(); }
  }
  async function changeLine(body: { lineId: string; quantity: string; reason: string }) {
    if (!current || locked || !begin()) return false;
    try {
      const next = await api<Sale>('sales/' + current.id + '/change-line', 'POST', { ...body, version: current.version });
      accept(next, false); setNotice('Đã cập nhật món xác nhận. Các món đang chọn vẫn được giữ trên màn hình.');
      await refreshAfterWrite(); return true;
    } catch (e) { setError(message(e)); return false; } finally { finish(); }
  }
  async function cancelOrder(reason: string) {
    if (!current || locked || !reason.trim() || !begin()) return;
    try { const next = await api<Sale>('sales/' + current.id + '/cancel', 'POST', { reason, version: current.version }); accept(next, true); setView('bill'); await refreshAfterWrite(); }
    catch (e) { setError(message(e)); } finally { finish(); }
  }
  async function pay() {
    if (!current || !payable || remoteChange || busyRef.current || !window.confirm('Xác nhận các món trên hóa đơn đúng thực tế và đã thu đủ ' + money(current.total) + '?')) return;
    if (!begin()) return;
    try { const paid = await api<Sale>('sales/' + current.id + '/pay', 'POST', { method, version: current.version }); accept(paid, true); setView('bill'); setNotice('Đã thu tiền và đóng đơn.'); await refreshAfterWrite(); }
    catch (e) { setError(message(e)); } finally { finish(); }
  }

  return <Drawer title={'Đơn bán · ' + title} onClose={dismiss} locked={busy}>
    <div className="pos-mode">{editable && <button disabled={busy} className={view === 'order' ? 'active' : ''} aria-pressed={view === 'order'} onClick={() => setView('order')}>Chọn món</button>}<button disabled={busy} className={view === 'bill' ? 'active' : ''} aria-pressed={view === 'bill'} onClick={() => setView('bill')}>Tính tiền</button><button disabled={busy} className="order-refresh" onClick={() => void reloadOrder()}>Tải lại</button>{editable && current && !legacy && <button className="danger pos-cancel" disabled={busy || remoteChange} onClick={() => setView('cancel')}>Hủy đơn</button>}</div>
    {remoteChange && <div className="remote-notice" role="alert">Đơn đã được sửa ở nơi khác. Các món đang chọn chưa bị xóa. <button disabled={busy} onClick={() => void reloadOrder()}>Nạp bản mới</button></div>}
    {notice && <p className="sales-notice" role="status">{notice}</p>}{error && <p className="error order-global-error" role="alert">{error}</p>}{refreshError && <p className="order-refresh-error" role="status">{refreshError}</p>}
    {view === 'cancel' ? <div className="pos-bill"><form onSubmit={e => { e.preventDefault(); void cancelOrder(cancelReason); }}><fieldset disabled={busy || remoteChange}><h3>Hủy đơn · {title}</h3><p>Chỉ hủy khi khách không dùng các món của đơn này. Lượng đã giữ được giải phóng; không ghi doanh thu.</p>{dirty && <p className="hint">Các món đang chọn chưa lưu cũng sẽ bị bỏ khi hủy đơn.</p>}<label>Lý do hủy<textarea required maxLength={500} rows={3} value={cancelReason} onChange={e => setCancelReason(e.target.value)} /></label><div className="dialog-actions"><button type="button" onClick={() => setView('order')}>Quay lại</button><button className="danger" disabled={!cancelReason.trim()}>Xác nhận hủy đơn</button></div></fieldset></form></div>
    : view === 'bill' ? <div className="pos-bill">
      {!current ? <div className="order-empty-state"><h3>Chưa có đơn được lưu</h3><p>Xác nhận các món đang chọn để tạo đơn, sau đó thu tiền tại đây.</p>{editable && <button onClick={() => setView('order')}>Quay lại chọn món</button>}</div> : <>
        <BillReceipt sale={current} disabled={busy || dirty || remoteChange} />
        {current.lines.some(l => l.changes.length) && <details className="subtle-help"><summary>Lịch sử giảm / bỏ món</summary>{current.lines.flatMap(l => l.changes.map(c => <p key={c.id}><strong>{l.productName}</strong> · bỏ {fmt(c.quantity)} · {c.reason} · {c.changedBy.name} · {new Date(c.changedAt).toLocaleString('vi-VN')}</p>))}</details>}
        {current.status === 'CANCELLED' ? <p className="hint">Đơn đã hủy, không thu tiền.</p> : current.payment ? <p className="hint">Đã thanh toán {money(current.payment.amount)}.</p> : <>
          {(dirty || current.lines.some(l => !l.sentAt)) && <div className="order-payment-warning"><p>{dirty ? 'Có món đang chọn chưa lưu. ' : 'Có món mới lưu nháp. '}Cần xác nhận hoặc bỏ các món này trước khi thu tiền.</p>{editable && <button onClick={() => setView('order')}>Kiểm tra món đang chọn</button>}</div>}
          {legacy && <p className="error">Đơn dùng phiếu xuất bán cũ; dùng đơn mới cho luồng tồn cửa hàng.</p>}
          {['DRAFT', 'CONFIRMED'].includes(current.status) && current.lines.every(l => Number(l.quantity) === 0) && can(user, 'sale:create') && <button disabled={busy || remoteChange} onClick={() => void cancelOrder('Đơn đã bỏ hết món, không tính tiền')}>Đóng đơn không tính tiền</button>}
          {can(user, 'payment:create') && <div className="order-payment"><label>Phương thức thanh toán<select disabled={busy || remoteChange} value={method} onChange={e => setMethod(e.target.value)}><option value="CASH">Tiền mặt</option><option value="TRANSFER">Chuyển khoản</option></select></label><button className="primary" disabled={busy || remoteChange || !payable} onClick={() => void pay()}>Thu {money(current.total)} / đóng đơn</button><small>Kiểm tra món và tổng tiền với khách trước khi xác nhận.</small></div>}
        </>}
      </>}
    </div> : <div className="pos-workspace">
      <OrderMenu products={stockProducts} selected={selected} disabled={locked} full={lines.length >= 100} add={add} />
      <section className="pos-ticket" aria-label="Món của đơn"><div className="pos-ticket-context">{!current && !initialTableId ? <label>Đơn cho<select disabled={locked} value={tableId} onChange={e => setTableId(e.target.value)}><option value="">Mang đi</option>{tables.filter(t => t.status === 'ACTIVE').map(t => <option key={t.id} value={t.id}>{t.area ? t.area + ' · ' : ''}{t.name}</option>)}</select></label> : <strong>{title}</strong>}</div>
        <div className="pos-ticket-lines"><section className="choosing-order"><div className="order-section-label"><h3>{confirmed.length ? 'Đang chọn thêm' : 'Đang chọn'}</h3><span>{lines.length} dòng món</span></div><p className="order-section-help">{lines.length ? 'Chưa xác nhận, có thể sửa hoặc bỏ ngay tại đây.' : confirmed.length ? 'Chọn món từ thực đơn để gọi thêm.' : 'Chọn một món từ thực đơn để bắt đầu.'}</p>
          {lines.map((l, i) => {
            const p = product(l.productId), name = p?.name || current?.lines.find(x => x.id === l.id)?.productName || 'Món đã ngừng bán';
            const q = positive(l.quantity) ? Number(l.quantity) : 0, left = Math.max(0, round(roomFor(l) - q));
            return <article className={'pos-ticket-item' + (problems[i] ? ' has-problem' : '')} key={l.key}><div className="pos-item-heading"><div><strong>{name}</strong><small>{money(price(l))} / {p?.unit.symbol || current?.lines.find(x => x.id === l.id)?.product.unit.symbol}</small></div><button disabled={locked} className="pos-remove" aria-label={'Bỏ ' + name + ' đang chọn'} onClick={() => remove(l.key)}>Bỏ</button></div>
              <div className="pos-item-quantity"><button disabled={locked || !q} aria-label={'Giảm ' + name} onClick={() => q <= 1 ? remove(l.key) : change(l.key, { quantity: String(round(q - 1)) })}>−</button><input aria-label={'Số lượng ' + name} aria-invalid={!!problems[i]} disabled={locked} type="number" min="0.001" max={roomFor(l)} step="0.001" value={l.quantity} onChange={e => change(l.key, { quantity: e.target.value })} /><button disabled={locked || !q || left <= 0} aria-label={'Tăng ' + name} onClick={() => change(l.key, { quantity: String(round(q + Math.min(1, left))) })}>+</button><strong>{money(q * Number(price(l)))}</strong></div>
              {problems[i] && <p className="order-line-error" role="status">{problems[i]}</p>}<details className="pos-line-note"><summary>{l.note ? 'Ghi chú: ' + l.note : 'Thêm ghi chú'}</summary><input disabled={locked} aria-label={'Ghi chú ' + name} maxLength={500} placeholder="Ví dụ: ít cay…" value={l.note} onChange={e => change(l.key, { note: e.target.value })} /></details>
            </article>;
          })}
        </section>{current && <ConfirmedItems sale={current} products={stockProducts} user={user} busy={locked} change={changeLine} />}</div>
        <div className="pos-ticket-footer">{lines.length > 0 && <div className="order-subtotal"><span>Món đang chọn</span><strong>{money(draftTotal)}</strong></div>}{confirmed.length > 0 && <div className="order-subtotal"><span>Món đã xác nhận</span><strong>{money(confirmedTotal)}</strong></div>}<div className="pos-total"><span>{lines.length ? 'Tổng đơn dự kiến' : 'Tổng đơn'}</span><strong>{money(confirmedTotal + draftTotal)}</strong></div><div className="pos-submit"><button disabled={locked || !dirty || !lines.length && !confirmed.length || problems.some(Boolean)} onClick={() => void submit(false)}>Lưu nháp</button><button className="primary" disabled={locked || !lines.length || problems.some(Boolean)} onClick={() => void submit(true)}>{busy ? 'Đang xử lý…' : confirmed.length ? 'Xác nhận món thêm' : 'Xác nhận gọi món'}</button></div><small className="order-save-help">{current && !lines.length && !confirmed.length ? 'Đơn không còn món đang chọn. Dùng Hủy đơn nếu khách không dùng gì.' : 'Lưu nháp chưa giữ hàng. Xác nhận món mới giữ lượng cho đơn.'}</small></div>
      </section>
    </div>}
  </Drawer>;
}



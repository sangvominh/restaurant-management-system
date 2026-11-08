'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api, can, type CatalogItem, type User } from './catalog-api';
interface ReceiptLine { id: string; quantity: string; unitPrice: string; lot: { id: string; code: string; expiryDate: string | null; material: CatalogItem } }
interface Receipt { id: string; code: string; status: string; receivedAt: string; note: string | null; supplierId: string; supplier: CatalogItem; createdBy: { name: string; accountId: string | null }; lines: ReceiptLine[] }
interface Stock { id: string; code: string; name: string; status: string; minStock: string; quantity: string; unitName: string; symbol: string }
interface Lot { id: string; code: string; expiryDate: string | null; quantity: string }
interface References { suppliers: CatalogItem[]; materials: CatalogItem[] }
const number = (value: string | number) => Number(value).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
const money = (value: number) => value.toLocaleString('vi-VN', { maximumFractionDigits: 2 }) + ' ₫';
const date = (value: string) => new Date(value).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
const day = (value: string | null) => value ? new Date(value).toLocaleDateString('vi-VN', { timeZone: 'UTC' }) : 'Không có';
export default function InventoryApp({ user, mode }: { user: User; mode: 'receipts' | 'inventory' }) {
  const [receipts, setReceipts] = useState<Receipt[]>([]); const [stock, setStock] = useState<Stock[]>([]);
  const [references, setReferences] = useState<References>({ suppliers: [], materials: [] });
  const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState(''); const [filter, setFilter] = useState('');
  const [editing, setEditing] = useState<Receipt | null | undefined>();
  const [selected, setSelected] = useState<Stock>(); const [lots, setLots] = useState<Lot[]>([]); const [lotLoading, setLotLoading] = useState(false);
  const create = can(user, 'receipt:create'), post = can(user, 'receipt:post');
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      if (mode === 'receipts') {
        const [list, refs] = await Promise.all([api<Receipt[]>('receipts'), create ? api<References>('receipts/references') : Promise.resolve({ suppliers: [], materials: [] })]);
        setReceipts(list); setReferences(refs);
      } else { setStock(await api<Stock[]>('inventory')); setSelected(undefined); setLots([]); }
    } catch (err) { setError(err instanceof Error ? err.message : 'Không tải được dữ liệu'); }
    finally { setLoading(false); }
  }, [mode, create]);
  useEffect(() => { void load(); }, [load]);
  async function action(receipt: Receipt, remove = false) {
    if (!window.confirm(remove ? `Xóa phiếu nháp ${receipt.code}?` : `Ghi sổ ${receipt.code} và tăng tồn kho? Sau đó không thể sửa/xóa phiếu.`)) return;
    setBusy(true); setError('');
    try { await api(`receipts/${receipt.id}${remove ? '' : '/post'}`, remove ? 'DELETE' : 'POST'); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Thao tác thất bại'); }
    finally { setBusy(false); }
  }
  async function showLots(row: Stock) {
    setSelected(row); setLots([]); setLotLoading(true); setError('');
    try { setLots(await api<Lot[]>(`inventory/${row.id}/lots`)); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không tải được lô'); }
    finally { setLotLoading(false); }
  }
  const receiptRows = receipts.filter(r => `${r.code} ${r.supplier.name} ${r.createdBy.name}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')) && (!filter || r.status === filter));
  const stockRows = stock.filter(r => `${r.code} ${r.name}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')) && (!filter || (filter === 'LOW' ? Number(r.quantity) < Number(r.minStock) : Number(r.quantity) > 0)));
  return <><header><div><p className="eyebrow">KHO VÀ SẢN XUẤT</p><h1>{mode === 'receipts' ? 'Nhập kho nguyên vật liệu' : 'Tồn kho nguyên vật liệu'}</h1></div><button disabled={loading || busy} onClick={() => void load()}>Tải lại</button></header><section className="panel"><div className="toolbar"><div><h2>{mode === 'receipts' ? 'Phiếu nhập theo lô' : 'Tồn hiện tại trong kho'}</h2><p>{mode === 'receipts' ? 'Lưu nháp để kiểm tra. Chỉ ghi sổ mới tăng tồn kho.' : 'Tính từ biến động đã ghi nhận; bao gồm cả lô hết hạn còn trong kho.'}</p></div>{mode === 'receipts' && create && <button className="primary" disabled={loading || busy || !!error || !references.suppliers.length || !references.materials.length} onClick={() => setEditing(null)}>+ Lập phiếu nhập</button>}</div>
    {mode === 'receipts' && create && !loading && (!references.suppliers.length || !references.materials.length) && <p className="hint">Cần có NVL và NCC đang hoạt động trước khi lập phiếu.</p>}
    <div className="filters"><input aria-label="Tìm kiếm phiếu hoặc NVL" value={search} onChange={e => setSearch(e.target.value)} placeholder={mode === 'receipts' ? 'Tìm số phiếu, NCC, người lập…' : 'Tìm mã hoặc tên NVL…'} /><select aria-label="Bộ lọc nhập tồn" value={filter} onChange={e => setFilter(e.target.value)}><option value="">Tất cả</option>{mode === 'receipts' ? <><option value="DRAFT">Nháp</option><option value="POSTED">Đã ghi sổ</option></> : <><option value="LOW">Dưới tồn tối thiểu</option><option value="POSITIVE">Có tồn</option></>}</select></div>
    {error && <p className="error" role="alert">{error}</p>}{loading ? <p className="empty" role="status">Đang tải dữ liệu…</p> : mode === 'receipts' ? <div className="table-wrap"><table><thead><tr><th>Phiếu / Ngày lập hoặc ghi sổ</th><th>NCC / Người lập</th><th>Chi tiết / Tổng tiền</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{receiptRows.map(r => <tr key={r.id}><td><strong>{r.code}</strong><small>{date(r.receivedAt)}</small></td><td>{r.supplier.name}<small>{r.createdBy.name}</small></td><td><strong>{money(r.lines.reduce((sum, l) => sum + Number(l.quantity) * Number(l.unitPrice), 0))}</strong><details><summary>{r.lines.length} dòng NVL</summary>{r.lines.map(l => <p key={l.id}>{l.lot.material.name} · lô {l.lot.code}<br />{number(l.quantity)} {l.lot.material.unit?.symbol} × {money(Number(l.unitPrice))}<br /><small>HSD: {day(l.lot.expiryDate)}</small></p>)}{r.note && <p>Ghi chú: {r.note}</p>}</details></td><td><span className={`status ${r.status === 'POSTED' ? 'active' : ''}`}>{r.status === 'POSTED' ? 'Đã ghi sổ' : 'Nháp'}</span></td><td><div className="actions">{r.status === 'DRAFT' && <>{create && (r.createdBy.accountId === user.id || post) && <><button disabled={busy} onClick={() => setEditing(r)}>Sửa</button><button disabled={busy} className="danger" onClick={() => void action(r, true)}>Xóa</button></>}{post && <button className="primary" disabled={busy} onClick={() => void action(r)}>Ghi sổ</button>}</>}</div></td></tr>)}{!receiptRows.length && <tr><td colSpan={5} className="empty">Chưa có phiếu phù hợp.</td></tr>}</tbody></table></div> : <div className="table-wrap"><table><thead><tr><th>Mã / Tên NVL</th><th>Đơn vị</th><th>Tồn trong kho</th><th>Tồn tối thiểu</th><th>Chi tiết</th></tr></thead><tbody>{stockRows.map(r => <tr key={r.id}><td><strong>{r.name}</strong><small>{r.code}{r.status === 'INACTIVE' ? ' · Ngừng sử dụng' : ''}</small></td><td>{r.unitName}</td><td><strong className={Number(r.quantity) < Number(r.minStock) ? 'danger' : ''}>{number(r.quantity)}</strong></td><td>{number(r.minStock)}</td><td><button disabled={lotLoading} onClick={() => void showLots(r)}>Xem lô</button></td></tr>)}{!stockRows.length && <tr><td colSpan={5} className="empty">Chưa có NVL phù hợp.</td></tr>}</tbody></table></div>}</section>
    {mode === 'inventory' && selected && <section className="panel" style={{ marginTop: 20 }}><div className="toolbar"><h2>Các lô · {selected.code} · {selected.name}</h2><button onClick={() => setSelected(undefined)}>Đóng</button></div>{lotLoading ? <p role="status">Đang tải lô…</p> : <div className="table-wrap"><table><thead><tr><th>Mã lô</th><th>Hạn sử dụng</th><th>Tồn ({selected.symbol})</th></tr></thead><tbody>{lots.map(l => <tr key={l.id}><td>{l.code}</td><td>{day(l.expiryDate)}{l.expiryDate && l.expiryDate.slice(0, 10) < new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date()) && <small className="danger">Đã hết hạn</small>}</td><td>{number(l.quantity)}</td></tr>)}{!lots.length && <tr><td colSpan={3} className="empty">Chưa có lô.</td></tr>}</tbody></table></div>}</section>}
    {editing !== undefined && <ReceiptEditor receipt={editing} refs={references} close={() => setEditing(undefined)} saved={load} />}</>;
}
interface FormLine { materialId: string; lotCode: string; expiryDate: string; quantity: string; unitPrice: string }
const blankLine = (): FormLine => ({ materialId: '', lotCode: '', expiryDate: '', quantity: '', unitPrice: '0' });
function ReceiptEditor({ receipt, refs, close, saved }: { receipt: Receipt | null; refs: References; close: () => void; saved: () => Promise<void> }) {
  const [code, setCode] = useState(receipt?.code || ''); const [supplierId, setSupplierId] = useState(receipt?.supplierId || ''); const [note, setNote] = useState(receipt?.note || '');
  const [lines, setLines] = useState<FormLine[]>(receipt?.lines.map(l => ({ materialId: l.lot.material.id, lotCode: l.lot.code, expiryDate: l.lot.expiryDate?.slice(0, 10) || '', quantity: l.quantity, unitPrice: l.unitPrice })) || [blankLine()]);
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  function update(index: number, field: keyof FormLine, value: string) { setLines(rows => rows.map((row, i) => i === index ? { ...row, [field]: value } : row)); }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try { await api(receipt ? `receipts/${receipt.id}` : 'receipts', receipt ? 'PUT' : 'POST', { code, supplierId, note, lines }); await saved(); close(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không lưu được phiếu'); }
    finally { setBusy(false); }
  }
  return <div className="overlay"><section className="dialog" role="dialog" aria-modal="true" aria-labelledby="receipt-title"><div className="dialog-heading"><h2 id="receipt-title">{receipt ? 'Sửa phiếu nhập nháp' : 'Lập phiếu nhập'}</h2><button disabled={busy} onClick={close} aria-label="Đóng">×</button></div><form onSubmit={submit}><fieldset disabled={busy}><div className="form-grid"><div className="field"><label htmlFor="receipt-code">Số phiếu</label><input id="receipt-code" required maxLength={50} value={code} onChange={e => setCode(e.target.value)} /></div><div className="field"><label htmlFor="receipt-supplier">Nhà cung cấp</label><select id="receipt-supplier" required value={supplierId} onChange={e => setSupplierId(e.target.value)}><option value="">Chọn NCC…</option>{refs.suppliers.map(s => <option key={s.id} value={s.id}>{s.code} · {s.name}</option>)}</select></div></div><p className="hint">Mã lô được quản lý theo từng NVL. Nếu dùng lại lô có sẵn, hạn sử dụng phải khớp; để trống hạn sẽ giữ hạn của lô đó.</p>{lines.map((line, i) => <section className="receipt-line" key={i}><h3>Dòng {i + 1}</h3><div className="form-grid"><div className="field"><label htmlFor={`material-${i}`}>Nguyên vật liệu</label><select id={`material-${i}`} required value={line.materialId} onChange={e => update(i, 'materialId', e.target.value)}><option value="">Chọn NVL…</option>{refs.materials.map(m => <option key={m.id} value={m.id}>{m.code} · {m.name} ({m.unit?.symbol})</option>)}</select></div><div className="field"><label htmlFor={`lot-${i}`}>Mã lô</label><input id={`lot-${i}`} required maxLength={50} value={line.lotCode} onChange={e => update(i, 'lotCode', e.target.value)} /></div><div className="field"><label htmlFor={`expiry-${i}`}>Hạn sử dụng (không bắt buộc)</label><input id={`expiry-${i}`} type="date" value={line.expiryDate} onChange={e => update(i, 'expiryDate', e.target.value)} /></div><div className="field"><label htmlFor={`quantity-${i}`}>Số lượng ({refs.materials.find(m => m.id === line.materialId)?.unit?.symbol || 'đơn vị cơ sở'})</label><input id={`quantity-${i}`} required type="number" min="0.001" step="0.001" value={line.quantity} onChange={e => update(i, 'quantity', e.target.value)} /></div><div className="field"><label htmlFor={`price-${i}`}>Đơn giá (VND / đơn vị cơ sở)</label><input id={`price-${i}`} required type="number" min="0" step="0.01" value={line.unitPrice} onChange={e => update(i, 'unitPrice', e.target.value)} /></div></div><button type="button" disabled={lines.length === 1} onClick={() => setLines(rows => rows.filter((_, j) => j !== i))}>Bỏ dòng</button></section>)}<button type="button" disabled={lines.length >= 100} onClick={() => setLines([...lines, blankLine()])}>+ Thêm dòng</button><div className="field" style={{ marginTop: 18 }}><label htmlFor="receipt-note">Ghi chú</label><input id="receipt-note" maxLength={1000} value={note} onChange={e => setNote(e.target.value)} /></div><p>Tổng tiền: <strong>{money(lines.reduce((sum, l) => sum + Number(l.quantity || 0) * Number(l.unitPrice || 0), 0))}</strong></p>{error && <p className="error" role="alert">{error}</p>}<div className="dialog-actions"><button type="button" onClick={close}>Hủy</button><button className="primary">{busy ? 'Đang lưu…' : 'Lưu nháp'}</button></div></fieldset></form></section></div>;
}

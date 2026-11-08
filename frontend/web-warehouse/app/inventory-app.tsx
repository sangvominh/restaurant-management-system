'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api, can, type CatalogItem, type User } from './catalog-api';
import { DocumentCard, Drawer } from './workspace-ui';
import { usePagination, Pagination } from './list-pagination';
import { StatusBadge, statusInfo } from './status-ui';
import { DocumentTools } from './document-print';
import LabelPrint, { type StockLabel } from './label-print';
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
  const [label, setLabel] = useState<StockLabel>();
  const [receipts, setReceipts] = useState<Receipt[]>([]); const [stock, setStock] = useState<Stock[]>([]);
  const [references, setReferences] = useState<References>({ suppliers: [], materials: [] });
  const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState(''); const [filter, setFilter] = useState('');
  const [receiptId, setReceiptId] = useState<string>();
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
  const activeReceipt = receipts.find(r => r.id === receiptId);
  const receiptRows = receipts.filter(r => `${r.code} ${r.supplier.name} ${r.createdBy.name}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')) && (!filter || r.status === filter));
  const stockRows = stock.filter(r => `${r.code} ${r.name}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')) && (!filter || (filter === 'LOW' ? Number(r.quantity) < Number(r.minStock) : Number(r.quantity) > 0)));
  const receiptPage = usePagination(receiptRows, `receipts:${search}:${filter}`);
  const stockPage = usePagination(stockRows, `stock:${search}:${filter}`);
  const lotPage = usePagination(lots, selected?.id || '');
  return <><section className="panel">
    {mode === 'receipts' && create && !loading && (!references.suppliers.length || !references.materials.length) && <p className="hint">Cần có NVL và NCC đang hoạt động trước khi lập phiếu.</p>}
    <div className="list-controls"><div className="filters"><input aria-label="Tìm kiếm phiếu hoặc NVL" value={search} onChange={e => setSearch(e.target.value)} placeholder={mode === 'receipts' ? 'Tìm số phiếu, NCC, người lập…' : 'Tìm mã hoặc tên NVL…'} /><select aria-label="Bộ lọc nhập tồn" value={filter} onChange={e => setFilter(e.target.value)}><option value="">Tất cả</option>{mode === 'receipts' ? <><option value="DRAFT">Nháp · chưa nhập kho</option><option value="POSTED">Đã nhập kho</option></> : <><option value="LOW">Dưới tồn tối thiểu</option><option value="POSITIVE">Có tồn</option></>}</select></div>{mode === 'receipts' && create && <button className="primary" disabled={loading || busy || !!error || !references.suppliers.length || !references.materials.length} onClick={() => setEditing(null)}>+ Lập phiếu nhập</button>}</div>
    {error && <p className="error" role="alert">{error}</p>}{loading ? <p className="empty" role="status">Đang tải dữ liệu…</p> : mode === 'receipts' ? <div className="document-grid">{receiptPage.rows.map(r => <DocumentCard key={r.id} type="Phiếu nhập" title={r.code} status={statusInfo('receipt', r.status).label} tone={statusInfo('receipt', r.status).tone} onOpen={() => setReceiptId(r.id)} footer={<strong>{money(r.lines.reduce((sum, l) => sum + Number(l.quantity) * Number(l.unitPrice), 0))}</strong>}><p className="document-party">{r.supplier.name}</p><small>{date(r.receivedAt)} · {r.createdBy.name}</small><div className="document-lines">{r.lines.slice(0, 3).map(l => <div key={l.id}><span>{l.lot.material.name}</span><strong>{number(l.quantity)} {l.lot.material.unit?.symbol}</strong></div>)}{r.lines.length > 3 && <small>+ {r.lines.length - 3} nguyên liệu khác</small>}</div></DocumentCard>)}{!receiptRows.length && <p className="empty">Chưa có phiếu phù hợp.</p>}</div> : <div className="table-wrap"><table><thead><tr><th>Mã / Tên NVL</th><th>Đơn vị</th><th>Tồn trong kho</th><th>Tồn tối thiểu</th><th className="row-actions-cell">Thao tác</th></tr></thead><tbody>{stockPage.rows.map(r => <tr key={r.id}><td><strong>{r.name}</strong><small>{r.code}{r.status === 'INACTIVE' ? ' · Ngừng sử dụng' : ''}</small></td><td>{r.unitName}</td><td><strong className={Number(r.quantity) < Number(r.minStock) ? 'danger' : ''}>{number(r.quantity)}</strong></td><td>{number(r.minStock)}</td><td className="row-actions-cell"><button className="row-primary" disabled={lotLoading} onClick={() => void showLots(r)}>Xem lô</button></td></tr>)}{!stockRows.length && <tr><td colSpan={5} className="empty">Chưa có NVL phù hợp.</td></tr>}</tbody></table></div>}{!loading && <Pagination pager={mode === 'receipts' ? receiptPage : stockPage} disabled={busy} />}</section>
    {mode === 'inventory' && selected && <Drawer title={`Các lô · ${selected.name}`} onClose={() => setSelected(undefined)}>
      <div className="detail-overview"><p>{selected.code} · Tồn trong kho: <strong>{number(selected.quantity)} {selected.symbol}</strong></p></div>
      {error && <p className="error">{error}</p>}{lotLoading ? <p role="status">Đang tải lô…</p> : <><div className="table-wrap"><table><thead><tr><th>Mã lô</th><th>Hạn sử dụng</th><th>Tồn ({selected.symbol})</th><th className="row-actions-cell">Tem dán</th></tr></thead><tbody>{lotPage.rows.map(l => <tr key={l.id}><td>{l.code}</td><td>{day(l.expiryDate)}{l.expiryDate && l.expiryDate.slice(0, 10) < new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()) && <small className="danger">Hết hạn · không được cấp</small>}</td><td>{number(l.quantity)}</td><td className="row-actions-cell"><button className="row-primary" onClick={() => { setSelected(undefined); setLabel({ reference: l.id, name: selected.name, code: l.code, kind: 'Lô nguyên liệu', expiry: l.expiryDate }); }}>In tem lô</button></td></tr>)}</tbody></table></div><Pagination pager={lotPage} /></>}
    </Drawer>}
    {label && <Drawer title="In tem lô nguyên liệu" onClose={() => setLabel(undefined)}><LabelPrint label={label} /></Drawer>}{activeReceipt && <Drawer title={activeReceipt.code} onClose={() => setReceiptId(undefined)} locked={busy}>
      {error && <p className="error" role="alert">{error}</p>}
      <DocumentTools disabled={busy} document={{ title: 'Phiếu nhập kho', reference: activeReceipt.code, status: statusInfo('receipt', activeReceipt.status).label, draft: activeReceipt.status === 'DRAFT', fields: [['Nhà cung cấp', activeReceipt.supplier.name], ['Ngày lập / nhập', date(activeReceipt.receivedAt)], ['Người lập', activeReceipt.createdBy.name]], columns: ['Nguyên liệu / Lô / HSD', 'Đơn vị', 'Số lượng', 'Đơn giá', 'Thành tiền'], rows: activeReceipt.lines.map(l => [`${l.lot.material.name}\nLô: ${l.lot.code}\nHSD: ${day(l.lot.expiryDate)}`, l.lot.material.unit?.symbol || '', number(l.quantity), money(Number(l.unitPrice)), money(Number(l.quantity) * Number(l.unitPrice))]), totals: [['Tổng tiền', money(activeReceipt.lines.reduce((s, l) => s + Number(l.quantity) * Number(l.unitPrice), 0))]], note: activeReceipt.note, signatures: ['Người giao hàng', 'Người nhận hàng', 'Người lập phiếu'] }} /><div className="detail-overview"><StatusBadge area="receipt" code={activeReceipt.status} /><h3>{activeReceipt.supplier.name}</h3><p>{date(activeReceipt.receivedAt)} · Người lập: {activeReceipt.createdBy.name}</p></div>
      <div className="table-wrap"><table><thead><tr><th>Nguyên liệu / Lô / HSD</th><th>Số lượng</th><th>Đơn giá</th></tr></thead><tbody>{activeReceipt.lines.map(l => <tr key={l.id}><td><strong>{l.lot.material.name}</strong><small>{l.lot.code}</small><small>HSD: {day(l.lot.expiryDate)}</small></td><td>{number(l.quantity)} {l.lot.material.unit?.symbol}</td><td>{money(Number(l.unitPrice))}</td></tr>)}</tbody></table></div>
      <p className="detail-total">Tổng tiền <strong>{money(activeReceipt.lines.reduce((s, l) => s + Number(l.quantity) * Number(l.unitPrice), 0))}</strong></p>{activeReceipt.note && <p>{activeReceipt.note}</p>}
      {activeReceipt.status === 'DRAFT' && <div className="detail-actions">{post && <button className="primary" disabled={busy} onClick={() => void action(activeReceipt)}>Xác nhận nhập kho</button>}{create && (activeReceipt.createdBy.accountId === user.id || post) && <><button disabled={busy} onClick={() => { setReceiptId(undefined); setEditing(activeReceipt); }}>Sửa phiếu</button><button className="danger" disabled={busy} onClick={() => void action(activeReceipt, true)}>Xóa nháp</button></>}</div>}
    </Drawer>}
    {editing !== undefined && <ReceiptEditor receipt={editing} refs={references} close={() => setEditing(undefined)} saved={load} />}</>;
}
interface FormLine { id?: string; materialId: string; lotCode: string; expiryDate: string; quantity: string; unitPrice: string }
const blankLine = (): FormLine => ({ materialId: '', lotCode: '', expiryDate: '', quantity: '', unitPrice: '0' });
function ReceiptEditor({ receipt, refs, close, saved }: { receipt: Receipt | null; refs: References; close: () => void; saved: () => Promise<void> }) {
  const [supplierId, setSupplierId] = useState(receipt?.supplierId || ''); const [note, setNote] = useState(receipt?.note || '');
  const [lines, setLines] = useState<FormLine[]>(receipt?.lines.map(l => ({ id: l.id, materialId: l.lot.material.id, lotCode: l.lot.code, expiryDate: l.lot.expiryDate?.slice(0, 10) || '', quantity: l.quantity, unitPrice: l.unitPrice })) || [blankLine()]);
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  function update(index: number, field: keyof FormLine, value: string) { setLines(rows => rows.map((row, i) => i === index ? { ...row, [field]: value } : row)); }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try { await api(receipt ? `receipts/${receipt.id}` : 'receipts', receipt ? 'PUT' : 'POST', { supplierId, note, lines: lines.map(l => ({ id: l.id, materialId: l.materialId, expiryDate: l.expiryDate, quantity: l.quantity, unitPrice: l.unitPrice })) }); await saved(); close(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không lưu được phiếu'); }
    finally { setBusy(false); }
  }
  return <div className="overlay editor-screen"><section className="dialog" role="dialog" aria-modal="true" aria-labelledby="receipt-title"><div className="dialog-heading"><h2 id="receipt-title">{receipt ? 'Sửa phiếu nhập nháp' : 'Lập phiếu nhập'}</h2><button disabled={busy} onClick={close} aria-label="Đóng">×</button></div><form onSubmit={submit}><fieldset disabled={busy}><p className="auto-meta"><strong>{receipt?.code || 'Phiếu nhập mới'}</strong><span>{receipt ? 'Số phiếu do hệ thống cấp' : 'Số phiếu và mã lô tự cấp khi lưu'}</span></p><div className="form-grid"><div className="field"><label htmlFor="receipt-supplier">Nhà cung cấp</label><select id="receipt-supplier" required value={supplierId} onChange={e => setSupplierId(e.target.value)}><option value="">Chọn NCC…</option>{refs.suppliers.map(s => <option key={s.id} value={s.id}>{s.code} · {s.name}</option>)}</select></div></div><p className="hint">Mỗi dòng nhập tạo một lô tiếp nhận nội bộ mới, mã tự cấp khi lưu. Cùng NVL nhưng khác hạn sử dụng thì thêm dòng riêng.</p>{lines.map((line, i) => <section className="receipt-line" key={i}><div className="entry-line-heading"><div><strong>Nguyên liệu {i + 1}</strong><small>{receipt?.lines.some(l => l.id === line.id && l.lot.material.id === line.materialId) ? `Lô ${line.lotCode}` : 'Lô mới · tự cấp mã khi lưu'}</small></div><button className="remove-line" type="button" disabled={lines.length === 1} aria-label={`Xóa nguyên liệu ${i + 1}`} onClick={() => setLines(rows => rows.filter((_, j) => j !== i))}><span aria-hidden="true">×</span> Xóa dòng</button></div><div className="form-grid"><div className="field"><label htmlFor={`material-${i}`}>Nguyên vật liệu</label><select id={`material-${i}`} required value={line.materialId} onChange={e => update(i, 'materialId', e.target.value)}><option value="">Chọn NVL…</option>{refs.materials.map(m => <option key={m.id} value={m.id}>{m.code} · {m.name} ({m.unit?.symbol})</option>)}</select></div><div className="field"><label htmlFor={`expiry-${i}`}>Hạn sử dụng (không bắt buộc)</label><input id={`expiry-${i}`} type="date" value={line.expiryDate} onChange={e => update(i, 'expiryDate', e.target.value)} /></div><div className="field"><label htmlFor={`quantity-${i}`}>Số lượng ({refs.materials.find(m => m.id === line.materialId)?.unit?.symbol || 'đơn vị cơ sở'})</label><input id={`quantity-${i}`} required type="number" min="0.001" step="0.001" value={line.quantity} onChange={e => update(i, 'quantity', e.target.value)} /></div><div className="field"><label htmlFor={`price-${i}`}>Đơn giá (VND / đơn vị cơ sở)</label><input id={`price-${i}`} required type="number" min="0" step="0.01" value={line.unitPrice} onChange={e => update(i, 'unitPrice', e.target.value)} /></div></div></section>)}<button className="add-line" type="button" disabled={lines.length >= 100} onClick={() => setLines([...lines, blankLine()])}>+ Thêm nguyên liệu</button><div className="field" style={{ marginTop: 18 }}><label htmlFor="receipt-note">Ghi chú</label><input id="receipt-note" maxLength={1000} value={note} onChange={e => setNote(e.target.value)} /></div><p>Tổng tiền: <strong>{money(lines.reduce((sum, l) => sum + Number(l.quantity || 0) * Number(l.unitPrice || 0), 0))}</strong></p>{error && <p className="error" role="alert">{error}</p>}<div className="dialog-actions"><button type="button" onClick={close}>Hủy</button><button className="primary">{busy ? 'Đang lưu…' : 'Lưu nháp'}</button></div></fieldset></form></section></div>;
}

'use client';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { api, can, readRights, type Kind, type CatalogItem, type User } from './catalog-api';
import InventoryApp from './inventory-app';
import ProductionApp from './production-app';
import FinishedApp from './finished-app';
import ProductReceipts from './product-receipts';
import { NavIcon, Drawer, Modal } from './workspace-ui';
import { usePagination, Pagination } from './list-pagination';
import { StatusBadge } from './status-ui';
import LabelPrint, { type StockLabel } from './label-print';
const titles: Record<Kind, string> = { units: 'Đơn vị tính', categories: 'Phân loại', materials: 'Nguyên vật liệu', suppliers: 'Nhà cung cấp', products: 'Thành phẩm' };
type Data = Record<Kind, CatalogItem[]>;
const initialData: Data = { units: [], categories: [], materials: [], suppliers: [], products: [] };
const format = (value?: string) => Number(value || 0).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
export default function WarehouseApp({ user, logout, busy }: { user: User; logout: () => Promise<void>; busy: boolean }) {
  const pages = (Object.keys(titles) as Kind[]).filter(key => can(user, 'catalog:manage', 'product:manage') && can(user, ...readRights[key]));
  const [operation, setOperation] = useState<'catalog' | 'productReceipts' | 'receipts' | 'inventory' | 'boms' | 'orders' | 'exports' | 'finished' | 'report'>(can(user, 'production:manage') && !can(user, 'catalog:manage') ? 'orders' : can(user, 'production:perform') && !can(user, 'production:manage', 'catalog:manage') ? 'orders' : can(user, 'receipt:create', 'receipt:post') ? 'receipts' : can(user, 'bom:manage') ? 'boms' : can(user, 'production:manage', 'material:approve', 'production:inspect', 'waste:approve', 'material:request', 'waste:request') ? 'orders' : can(user, 'receipt:create', 'receipt:post') ? 'receipts' : can(user, 'inventory:view') ? 'inventory' : can(user, 'export:request', 'export:approve') ? 'exports' : can(user, 'report:stock') ? 'report' : can(user, 'material:view') ? 'orders' : 'catalog');
  const [section, setSection] = useState<Kind>(can(user, 'product:manage') && !can(user, 'catalog:manage') ? 'products' : pages[0] || 'units');
  const [data, setData] = useState<Data>(initialData);
  const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const [search, setSearch] = useState(''); const [filter, setFilter] = useState('');
  const [label, setLabel] = useState<StockLabel>();
  const [formulaProductId, setFormulaProductId] = useState<string>();
  const [editing, setEditing] = useState<CatalogItem | null | undefined>(); const [deleting, setDeleting] = useState<string>();
  const pageKey = pages.join(',');
  const sequence = useRef(0);
  const load = useCallback(async () => {
    const request = ++sequence.current; setLoading(true); setError('');
    try {
      const entries = await Promise.all(pageKey.split(',').filter(Boolean).map(async key => [key, await api<CatalogItem[]>(`catalog/${key}`)] as const));
      if (request === sequence.current) setData({ ...initialData, ...Object.fromEntries(entries) });
    } catch (err) { if (request === sequence.current) setError(err instanceof Error ? err.message : 'Không tải được dữ liệu'); }
    finally { if (request === sequence.current) setLoading(false); }
  }, [pageKey]);
  useEffect(() => { const pending = sequence; const initial = window.setTimeout(() => { if (operation === 'catalog') void load(); }, 0); return () => { window.clearTimeout(initial); pending.current++; }; }, [load, operation]);
  const editable = section === 'products' ? can(user, 'catalog:manage', 'product:manage') : can(user, 'catalog:manage');
  const rows = data[section].filter(row => `${row.code || ''} ${row.name} ${row.symbol || ''} ${row.category?.name || ''}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')) && (!filter || (section === 'categories' ? row.objectType : row.status) === filter));
  const pager = usePagination(rows, `${section}:${search}:${filter}`);
  async function remove(row: CatalogItem) {
    if (!window.confirm(`Xóa ${row.name}? Bản ghi đã được sử dụng trong nghiệp vụ sẽ không xóa được.`)) return;
    setDeleting(row.id); setError('');
    try { await api(`catalog/${section}/${row.id}`, 'DELETE'); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không xóa được'); }
    finally { setDeleting(undefined); }
  }
  function navigate(key: Kind) { setOperation('catalog'); setSection(key); setSearch(''); setFilter(''); }
  const formulaProduct = data.products.find(p => p.id === formulaProductId);
  const hasState = ['materials', 'suppliers', 'products'].includes(section);
  const groups = [
    { id: 'stock' as const, title: 'Kho hàng', items: [
      { key: 'orders', label: 'Phiếu cấp / hoàn NVL', show: can(user, 'material:view') && !can(user, 'production:manage', 'production:perform', 'production:inspect', 'material:approve', 'waste:approve', 'material:request', 'waste:request') },
      { key: 'productReceipts', label: 'Nhập thành phẩm trực tiếp', show: can(user, 'receipt:create', 'receipt:post') },
      { key: 'receipts', label: 'Nhập nguyên liệu', show: can(user, 'receipt:create', 'receipt:post') },
      { key: 'inventory', label: 'Tồn nguyên liệu', show: can(user, 'inventory:view') },
      { key: 'finished', label: 'Tồn thành phẩm', show: can(user, 'inventory:view') },
      { key: 'exports', label: 'Xuất TP sang cửa hàng', show: can(user, 'export:request', 'export:approve') },
    ] },
    { id: 'kitchen' as const, title: 'Khu làm việc chế biến', items: [
      { key: 'orders', label: 'Lệnh chế biến', show: can(user, 'production:manage', 'production:perform', 'material:approve', 'production:inspect', 'waste:approve', 'material:request', 'waste:request') },
      { key: 'boms', label: 'Công thức', show: can(user, 'bom:manage', 'production:manage') },
    ] },
    { id: 'catalog' as const, title: 'Danh mục', items: pages.map(key => ({ key, label: titles[key], show: true })) },
    { id: 'report' as const, title: 'Báo cáo', items: [{ key: 'report', label: 'Thống kê & kế hoạch', show: can(user, 'report:stock') }] },
  ].map(g => ({ ...g, items: g.items.filter(i => i.show) })).filter(g => g.items.length);
  const activeGroup = groups.find(g => operation === 'catalog' ? g.id === 'catalog' : g.items.some(i => i.key === operation)) || groups[0];
  function openItem(key: string) {
    if (key in titles) navigate(key as Kind);
    else setOperation(key as Exclude<typeof operation, 'catalog'>);
  }

  return <div className="warehouse-shell"><div className="workspace-bar"><div className="workspace-brand">Kho & Chế biến</div><nav className="workspace-groups" aria-label="Nhóm công việc">{groups.map(g => <button key={g.id} className={activeGroup?.id === g.id ? 'selected' : ''} aria-current={activeGroup?.id === g.id ? 'page' : undefined} onClick={() => openItem(g.items[0].key)}><NavIcon name={g.id} />{g.title}</button>)}</nav><div className="workspace-profile"><span><strong>{user.name}</strong><small>{user.username}</small></span><button disabled={busy} onClick={() => void logout()}>Đăng xuất</button></div></div><nav className="workspace-tabs" aria-label="Chức năng">{activeGroup?.items.map(i => <button key={i.key} className={(operation === 'catalog' ? section === i.key : operation === i.key) ? 'selected' : ''} aria-current={(operation === 'catalog' ? section === i.key : operation === i.key) ? 'page' : undefined} onClick={() => openItem(i.key)}>{i.label}</button>)}</nav>{operation === 'catalog' ? <main><h1 className="sr-only">{titles[section]}</h1>
    <section className="panel">
    {['materials', 'products'].includes(section) && (!data.units.length || !data.categories.some(c => c.objectType === (section === 'materials' ? 'MATERIAL' : 'PRODUCT'))) && !loading && !error && <p className="hint">Cần tạo đơn vị tính và phân loại phù hợp trước khi thêm {section === 'materials' ? 'NVL' : 'thành phẩm'}.</p>}
    <div className="list-controls"><div className="filters"><button type="button" disabled={loading || !!deleting} onClick={() => void load()}>Tải lại</button><input aria-label="Tìm kiếm" placeholder="Tìm mã, tên hoặc phân loại…" value={search} onChange={e => setSearch(e.target.value)} />{section !== 'units' && <select aria-label="Bộ lọc" value={filter} onChange={e => setFilter(e.target.value)}><option value="">{section === 'categories' ? 'Mọi loại đối tượng' : 'Mọi trạng thái'}</option>{section === 'categories' ? <><option value="MATERIAL">Nguyên vật liệu</option><option value="PRODUCT">Thành phẩm</option></> : <><option value="ACTIVE">Hoạt động</option><option value="INACTIVE">Ngừng sử dụng</option></>}</select>}</div>{editable && <button className="primary" disabled={loading || !!error || (['materials', 'products'].includes(section) && (!data.units.length || !data.categories.some(c => c.objectType === (section === 'materials' ? 'MATERIAL' : 'PRODUCT'))))} onClick={() => setEditing(null)}>+ Thêm mới</button>}</div>
    {error && <p className="error" role="alert">{error}</p>}{loading ? <p className="empty" role="status">Đang tải dữ liệu…</p> : <div className="table-wrap"><table><thead><tr><th>{section === 'units' ? 'Ký hiệu' : section === 'categories' ? 'Loại đối tượng' : 'Mã'}</th><th>Tên</th>{['materials', 'products'].includes(section) && <><th>Đơn vị / Phân loại</th></>}{section === 'products' && <th>Công thức hiện hành</th>}{section === 'suppliers' && <th>Liên hệ</th>}{hasState && <th>Trạng thái</th>}{(editable || ['materials', 'products'].includes(section)) && <th className="row-actions-cell">Thao tác</th>}</tr></thead><tbody>{pager.rows.map(row => <tr key={row.id}><td>{section === 'units' ? row.symbol : section === 'categories' ? row.objectType === 'MATERIAL' ? 'Nguyên vật liệu' : 'Thành phẩm' : row.code}</td><td><strong>{row.name}</strong></td>{['materials', 'products'].includes(section) && <><td>{row.unit?.name}<small>{row.category?.name}</small></td></>}{section === 'products' && <td>{row.currentBom ? <><button className="formula-link" onClick={() => setFormulaProductId(row.id)}>Công thức v{row.currentBom.version} →</button>{row.currentBom.lines.some(l => l.material.status !== 'ACTIVE') && <small className="danger">Có nguyên liệu ngừng sử dụng</small>}</> : <small className="formula-missing">Chưa có công thức hiệu lực<small>Chưa thể giao chế biến</small></small>}</td>}{section === 'suppliers' && <td>{row.phone || '—'}<small>{row.address}</small></td>}{hasState && <td><StatusBadge area="catalog" code={row.status || 'INACTIVE'} /></td>}{(editable || ['materials', 'products'].includes(section)) && <td className="row-actions-cell"><div className="row-actions">{['materials', 'products'].includes(section) && <button className="row-primary" onClick={() => setLabel({ reference: row.id, name: row.name, code: row.code || row.id, kind: section === 'materials' ? 'Nguyên liệu' : 'Thành phẩm' })}>In tem</button>}{editable && <>{row.canEdit !== false && <button className="row-primary" disabled={!!deleting} onClick={() => setEditing(row)}>{'Sửa thông tin'}</button>}{row.canDelete !== false && <button className="row-delete" title={`Xóa ${row.name}`} aria-label={`Xóa ${row.name}`} disabled={!!deleting} onClick={() => void remove(row)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7" /></svg></button>}{row.canEdit === false && row.canDelete === false && <small>Đã sử dụng · chỉ xem</small>}</>}</div></td>}</tr>)}{!rows.length && <tr><td colSpan={8} className="empty">{error ? 'Không tải được dữ liệu.' : 'Chưa có dữ liệu phù hợp.'}</td></tr>}</tbody></table></div>}<Pagination pager={pager} disabled={loading || !!deleting} /></section>
  </main> : <main><h1 className="sr-only">{activeGroup?.items.find(i => i.key === operation)?.label}</h1>{operation === 'productReceipts' ? <ProductReceipts user={user} /> : operation === 'exports' || operation === 'finished' || operation === 'report' ? <FinishedApp key={operation} mode={operation} user={user} /> : operation === 'boms' || operation === 'orders' ? <ProductionApp key={operation} user={user} mode={operation} /> : <InventoryApp key={operation} user={user} mode={operation} />}</main>}{label && <Drawer title="In tem mặt hàng" onClose={() => setLabel(undefined)}><LabelPrint label={label} /></Drawer>}{formulaProduct?.currentBom && <Drawer title={`Công thức hiện hành · ${formulaProduct.name}`} onClose={() => setFormulaProductId(undefined)}><div className="formula-meta"><strong>Phiên bản v{formulaProduct.currentBom.version} · Định mức cho {format(formulaProduct.currentBom.outputQuantity)} {formulaProduct.unit?.symbol}</strong><span>Hiệu lực từ {new Date(formulaProduct.currentBom.effectiveAt).toLocaleString('vi-VN')}</span></div><div className="table-wrap"><table><thead><tr><th>Nguyên liệu</th><th>Định mức</th></tr></thead><tbody>{formulaProduct.currentBom.lines.map(l => <tr key={l.id}><td>{l.material.name}{l.material.status !== 'ACTIVE' && <small className="danger">Ngừng sử dụng</small>}</td><td>{format(l.quantity)} {l.material.unit.symbol}</td></tr>)}</tbody></table></div></Drawer>}{editing !== undefined && <Editor key={section + ':' + (editing?.id || 'new')} kind={section} item={editing} data={data} close={() => setEditing(undefined)} saved={load} />}</div>;
}

function Editor({ kind, item, data, close, saved }: { kind: Kind; item: CatalogItem | null; data: Data; close: () => void; saved: () => Promise<void> }) {
  const [values, setValues] = useState<Record<string, string>>({ supplyType: item?.supplyType || 'PRODUCED', name: item?.name || '', code: item?.code || '', symbol: item?.symbol || '', objectType: item?.objectType || 'MATERIAL', unitId: item?.unitId || '', categoryId: item?.categoryId || '', status: item?.status || 'ACTIVE', phone: item?.phone || '', address: item?.address || '' });
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  function field(name: string, label: string, options?: { value: string; label: string }[], optional = false, step?: string) {
    const locked = !!item && ((['materials', 'products'].includes(kind) && ['code', 'name', 'unitId', 'supplyType'].includes(name)) || (kind === 'suppliers' && ['code', 'name'].includes(name)) || (kind === 'categories' && name === 'objectType' && item.canDelete === false));
    if (locked) return null;
    return <div className={`field field-${name}`} key={name}><label htmlFor={`field-${name}`}>{label}{optional ? ' (không bắt buộc)' : ''}</label>{options ? <select id={`field-${name}`} disabled={locked} required={!optional} value={values[name]} onChange={e => setValues({ ...values, [name]: e.target.value })}><option value="">Chọn…</option>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select> : <input id={`field-${name}`} readOnly={locked} required={!optional} maxLength={name === 'symbol' || name === 'phone' ? 20 : name === 'address' ? 500 : 200} value={values[name]} type={step ? 'number' : 'text'} min={step ? '0' : undefined} step={step} onChange={e => setValues({ ...values, [name]: e.target.value })} />}</div>;
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    const body = kind === 'units' ? { name: values.name, symbol: values.symbol } : kind === 'categories' ? { name: values.name, objectType: values.objectType } : kind === 'suppliers' ? { ...(item ? { code: values.code } : {}), name: values.name, phone: values.phone, address: values.address, status: values.status } : { ...(!item && ['materials', 'products'].includes(kind) ? {} : { code: values.code }), name: values.name, unitId: values.unitId, categoryId: values.categoryId, status: values.status, ...(kind === 'products' ? { supplyType: values.supplyType } : {}) };
    try { await api(item ? `catalog/${kind}/${item.id}` : `catalog/${kind}`, item ? 'PUT' : 'POST', body); await saved(); close(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không lưu được dữ liệu'); }
    finally { setBusy(false); }
  }
  return <Modal title={`${item ? 'Cập nhật' : 'Thêm mới'} · ${titles[kind]}`} onClose={close} locked={busy}><form onSubmit={submit}><fieldset disabled={busy}>{!item && kind === 'products' && <p className="auto-meta"><span>Mã thành phẩm tự cấp khi lưu. Chọn nguồn đúng ngay khi tạo; nguồn không đổi sau khi lưu. Giá bán được quản lý nhà hàng thiết lập tại web nhà hàng.</span></p>}{item && ['materials', 'products', 'suppliers'].includes(kind) && <p className="auto-meta"><strong>{item.name}</strong><span>{item.code}{item.unit ? ` · ${item.unit.name}` : ''}{kind === 'products' ? item.supplyType === 'PURCHASED' ? ' · Nhập trực tiếp' : ' · Tự chế biến' : ''}</span></p>}<div className={`form-grid catalog-fields catalog-${kind}`}>{!['units', 'categories'].includes(kind) && !!item && field('code', 'Mã')}{field('name', kind === 'products' ? 'Tên thành phẩm' : 'Tên')}{kind === 'units' && field('symbol', 'Ký hiệu')}{kind === 'categories' && field('objectType', 'Dành cho', [{ value: 'MATERIAL', label: 'Nguyên vật liệu' }, { value: 'PRODUCT', label: 'Thành phẩm' }])}{['materials', 'products'].includes(kind) && <>{field('unitId', 'Đơn vị cơ sở', data.units.map(u => ({ value: u.id, label: `${u.name} (${u.symbol})` })))}{field('categoryId', 'Phân loại', data.categories.filter(c => c.objectType === (kind === 'materials' ? 'MATERIAL' : 'PRODUCT')).map(c => ({ value: c.id, label: c.name })))}</>}{kind === 'products' && field('supplyType', 'Nguồn thành phẩm', [{ value: 'PRODUCED', label: 'Tự chế biến: cần công thức và nghiệm thu' }, { value: 'PURCHASED', label: 'Nhập trực tiếp: không qua chế biến' }])}{kind === 'suppliers' && <>{field('phone', 'Điện thoại', undefined, true)}{field('address', 'Địa chỉ', undefined, true)}</>}{!['units', 'categories'].includes(kind) && field('status', 'Trạng thái', [{ value: 'ACTIVE', label: 'Hoạt động' }, { value: 'INACTIVE', label: 'Ngừng sử dụng' }])}</div>{error && <p className="error" role="alert">{error}</p>}<div className="dialog-actions"><button type="button" onClick={close}>Hủy</button><button className="primary">{busy ? 'Đang lưu…' : 'Lưu'}</button></div></fieldset></form></Modal>;
}

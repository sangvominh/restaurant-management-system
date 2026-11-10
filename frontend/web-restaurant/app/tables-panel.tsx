'use client';
import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { api, can, money, type DiningTable, type Sale, type User } from './sales-api';
import AreaEditor, { type Area } from './area-editor';
import { Drawer } from './document-ui';
export default function TablesPanel({ tables, sales, user, loading, saved, open, create }: { tables: DiningTable[]; sales: Sale[]; user: User; loading: boolean; saved: () => Promise<void>; open: (sale: Sale) => void; create: (id: string) => void }) {
  const [areaEditing, setAreaEditing] = useState<Area | null | undefined>(), [now, setNow] = useState(Date.now());
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(timer); }, []);
  const [areas, setAreas] = useState<Area[]>([]), [area, setArea] = useState(''), [custom, setCustom] = useState(false);
  const [editing, setEditing] = useState<DiningTable | null | undefined>(), [selected, setSelected] = useState<string>(), [busy, setBusy] = useState(false), [error, setError] = useState('');
  useEffect(() => { let alive = true; api<Area[]>('areas').then(a => { if (alive) setAreas(a); }).catch(e => { if (alive) setError(e instanceof Error ? e.message : 'Không tải được khu vực'); }); return () => { alive = false; }; }, []);
  const names = [...new Set([...areas.map(a => a.name), ...tables.map(t => t.area)])];
  const currentArea = names.includes(area) ? area : names[0] || 'Chung';
  const own = tables.filter(t => t.area === currentArea);
  const floor = areas.find(a => a.name === currentArea) || { name: currentArea, columns: 8, rows: 4, color: '#42688b' };
  async function removeArea() {
    if (!window.confirm('Xóa khu vực '+currentArea+'? Khu vực phải không còn bàn.')) return;
    setBusy(true);setError('');
    try{await api('areas/'+encodeURIComponent(currentArea),'DELETE');setAreas(await api<Area[]>('areas'));await saved();}
    catch(e){setError(e instanceof Error?e.message:'Không xóa được');}finally{setBusy(false);}
  }
  const cells = floor.columns * floor.rows;
  async function move(x: number, y: number) {
    const t = tables.find(t => t.id === selected); if (!t) return;
    setBusy(true); setError('');
    try { await api('tables/' + t.id, 'PUT', { ...t, x, y }); await saved(); setSelected(undefined); } catch(e) { setError(e instanceof Error ? e.message : 'Không di chuyển được'); } finally { setBusy(false); }
  }
  return <section className="panel"><div className="floor-toolbar"><div className="floor-areas" aria-label="Khu vực">{names.map(name => <button style={{ borderBottom: `3px solid ${areas.find(a => a.name === name)?.color || '#42688b'}` }} className={currentArea === name ? 'active' : ''} key={name} onClick={() => { setArea(name); setSelected(undefined); }}>{name}</button>)}</div>{can(user, 'sale:create') && <button className={custom ? 'primary' : ''} onClick={() => { setCustom(!custom); setSelected(undefined); }}>{custom ? 'Xong tùy chỉnh' : 'Tùy chỉnh sơ đồ'}</button>}</div><div className={custom ? "floor-editor-layout" : ""}>{custom && <aside className="floor-settings"><h2>Tùy chỉnh sơ đồ</h2><div className="area-overview"><strong>{currentArea}</strong><span style={{background:floor.color}} /><small>{floor.columns} cột × {floor.rows} hàng · {cells} vị trí</small></div><button disabled={busy} onClick={() => setAreaEditing(null)}>+ Khu vực</button><button disabled={busy || !areas.length} onClick={() => setAreaEditing(floor)}>Tên, màu và kích thước</button><button className="danger" disabled={busy || !areas.length} onClick={() => void removeArea()}>Xóa khu vực</button><hr /><button disabled={busy} onClick={() => setEditing(null)}>+ Thêm bàn vào {currentArea}</button><p>Chọn bàn rồi bấm ô trống để di chuyển. Chọn “Sửa bàn” để đổi tên, khu vực hoặc ngừng sử dụng.</p>{selected && <button disabled={busy} onClick={() => setEditing(tables.find(t => t.id === selected))}>Sửa / xóa bàn đã chọn</button>}</aside>}{error && <p className="error" role="alert">{error}</p>}{loading ? <p role="status">Đang tải sơ đồ…</p> : <div className="floor-scroll"><div className={custom ? 'floor-plan editing' : 'floor-plan'} style={{ gridTemplateColumns: `repeat(${floor.columns}, 110px)`, gridTemplateRows: `repeat(${floor.rows}, 108px)`, '--floor-color': floor.color } as CSSProperties}>{Array.from({ length: cells }, (_, i) => {
    const x = i % floor.columns, y = Math.floor(i / floor.columns), t = own.find(t => t.x === x && t.y === y);
    if (!t) return custom ? <button key={i} disabled={busy || !selected} className="floor-empty" aria-label={`Di chuyển tới cột ${x + 1}, hàng ${y + 1}`} onClick={() => void move(x, y)}><span aria-hidden="true">+</span></button> : <div key={i} />;
    if (t.status !== 'ACTIVE' && !custom) return <div key={i} />;
    const active = sales.find(s => s.tableId === t.id && ['DRAFT','CONFIRMED'].includes(s.status));
    return <button key={i} className={`floor-table ${active ? 'occupied' : ''} ${selected === t.id ? 'chosen' : ''} ${t.status !== 'ACTIVE' ? 'disabled-table' : ''}`} disabled={busy || !custom && !active && !can(user, 'sale:create')} onClick={() => custom ? setSelected(t.id) : active ? open(active) : create(t.id)} aria-label={`${t.name} · ${active ? 'Đang phục vụ' : 'Trống'}`}><strong>{t.name}</strong><small>{t.status !== 'ACTIVE' ? 'Ngừng sử dụng' : active ? money(active.total) : 'Trống'}</small>{active && <small className="table-elapsed">{Math.floor(Math.max(0,now-new Date(active.createdAt).getTime())/3600000) > 0 ? Math.floor(Math.max(0,now-new Date(active.createdAt).getTime())/3600000)+" giờ " : ""}{Math.floor(Math.max(0,now-new Date(active.createdAt).getTime())/60000)%60} phút</small>}</button>;
  })}</div></div>}</div><div className="floor-legend"><span>○ Bàn trống</span><span>● Đang phục vụ</span></div>{!own.length && !loading && <p className="empty">{custom ? 'Thêm bàn vào khu vực rồi bố trí trên sơ đồ.' : 'Khu vực chưa có bàn. Mở Tùy chỉnh sơ đồ để thêm.'}</p>}{editing !== undefined && <TableEditor table={editing} areas={names} initialArea={currentArea} saved={saved} close={() => setEditing(undefined)} />}{areaEditing !== undefined && <AreaEditor area={areaEditing} close={() => setAreaEditing(undefined)} saved={async () => { const a = await api<Area[]>('areas'); setAreas(a); await saved(); }} />}</section>;
}
function TableEditor({ table, areas, initialArea, saved, close }: { table: DiningTable | null; areas: string[]; initialArea: string; saved: () => Promise<void>; close: () => void }) {
  const [name, setName] = useState(table?.name || ''), [area, setArea] = useState(table?.area || initialArea), [status, setStatus] = useState(table?.status || 'ACTIVE'), [busy, setBusy] = useState(false), [error, setError] = useState('');
  async function submit(e: FormEvent) { e.preventDefault(); setBusy(true); setError(''); try { await api(table ? 'tables/' + table.id : 'tables', table ? 'PUT' : 'POST', { name, area, status }); await saved(); close(); } catch(e) { setError(e instanceof Error ? e.message : 'Không lưu được bàn'); } finally { setBusy(false); } }
  return <Drawer title={table ? 'Sửa bàn' : 'Thêm bàn'} onClose={close} locked={busy}><form onSubmit={submit}><fieldset disabled={busy}><label>Tên bàn<input required maxLength={60} value={name} onChange={e => setName(e.target.value)} /></label><label>Khu vực<select value={area} onChange={e => setArea(e.target.value)}>{areas.map(a => <option key={a}>{a}</option>)}</select></label><label>Trạng thái<select value={status} onChange={e => setStatus(e.target.value)}><option value="ACTIVE">Sử dụng</option><option value="INACTIVE">Ngừng sử dụng</option></select></label>{error && <p className="error" role="alert">{error}</p>}<button className="primary">{busy ? 'Đang lưu…' : 'Lưu bàn'}</button>{table && <button className="danger" type="button" disabled={busy} onClick={async () => { if (!window.confirm('Xóa bàn chưa sử dụng này?')) return; setBusy(true); try { await api('tables/'+table.id,'DELETE'); await saved(); close(); } catch(e) { setError(e instanceof Error ? e.message : 'Không xóa được'); } finally { setBusy(false); } }}>Xóa bàn</button>}</fieldset></form></Drawer>;
}


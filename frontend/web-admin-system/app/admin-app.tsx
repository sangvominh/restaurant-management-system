'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api, type Entry, type Permission, type Section } from './admin-api';

const titles: Record<Section, string> = { accounts: 'Tài khoản', roles: 'Vai trò và quyền', employees: 'Thông tin người sử dụng' };
const states: Record<string, string> = { ACTIVE: 'Hoạt động', LOCKED: 'Đã khóa', INACTIVE: 'Ngừng hoạt động' };
type Data = Record<Section, Entry[]>;

export default function AdminApp() {
  const [section, setSection] = useState<Section>('accounts');
  const [data, setData] = useState<Data>({ accounts: [], roles: [], employees: [] });
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [editing, setEditing] = useState<Entry | null | undefined>();
  const [deleting, setDeleting] = useState<string>();

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const [accounts, roles, employees, definitions] = await Promise.all([
        api<Entry[]>('accounts'), api<Entry[]>('roles'), api<Entry[]>('employees'), api<Permission[]>('permissions'),
      ]);
      setData({ accounts, roles, employees }); setPermissions(definitions);
    } catch (err) { setError(err instanceof Error ? err.message : 'Không kết nối được backend'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function remove(row: Entry) {
    if (!window.confirm(section === 'accounts' ? 'Xóa tài khoản này? Thông tin người sử dụng và giao dịch được giữ lại.' : 'Xóa bản ghi này?')) return;
    setDeleting(row.id); setError('');
    try { await api(`${section}/${row.id}`, 'DELETE'); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không thể xóa'); }
    finally { setDeleting(undefined); }
  }
  const rows = data[section].filter(row => {
    const text = [row.username, row.name, row.code, row.email, row.role?.name, row.employee?.name].filter(Boolean).join(' ').toLocaleLowerCase('vi');
    return text.includes(search.toLocaleLowerCase('vi')) && (!filter || row.status === filter);
  });

  return <div className="admin-shell">
    <aside><div className="brand"><span>A</span><div>Admin server<small>MRP Nhà hàng</small></div></div>
      <nav>{(Object.keys(titles) as Section[]).map(key => <button key={key} className={section === key ? 'selected' : ''} onClick={() => { setSection(key); setSearch(''); setFilter(''); }}>{titles[key]}</button>)}</nav>
      <p className="aside-note">Quản trị tài khoản và quyền sử dụng hệ thống.</p>
    </aside>
    <main><header><div><p className="eyebrow">QUẢN TRỊ HỆ THỐNG</p><h1>{titles[section]}</h1></div><button onClick={() => void load()} disabled={loading}>Tải lại</button></header>
      <div className="stats">{(Object.keys(titles) as Section[]).map(key => <button key={key} onClick={() => { setSection(key); setSearch(''); setFilter(''); }}><span>{titles[key]}</span><strong>{data[key].length}</strong></button>)}</div>
      <section className="panel"><div className="toolbar"><div><h2>Danh sách {titles[section].toLocaleLowerCase('vi')}</h2><p>{section === 'accounts' ? 'Mỗi tài khoản có một vai trò và có thể liên kết một người sử dụng.' : section === 'roles' ? 'Chọn các quyền được cấp cho tài khoản sử dụng vai trò này.' : 'Thông tin tối thiểu phục vụ cấp tài khoản và giao việc.'}</p></div>
        <button className="primary" disabled={loading || !!error || (section === 'accounts' && !data.roles.length)} onClick={() => setEditing(null)}>+ Thêm mới</button></div>
      {section === 'accounts' && !data.roles.length && !loading && !error && <p className="hint">Chưa có vai trò. Mở <button className="text-button" onClick={() => setSection('roles')}>Vai trò và quyền</button> để tạo trước khi cấp tài khoản.</p>}
      <div className="filters"><input aria-label="Tìm kiếm" placeholder="Tìm mã, tên, email hoặc vai trò…" value={search} onChange={e => setSearch(e.target.value)} />{section !== 'roles' && <select aria-label="Lọc trạng thái" value={filter} onChange={e => setFilter(e.target.value)}><option value="">Mọi trạng thái</option><option value="ACTIVE">Hoạt động</option><option value={section === 'accounts' ? 'LOCKED' : 'INACTIVE'}>{section === 'accounts' ? 'Đã khóa' : 'Ngừng hoạt động'}</option></select>}</div>
      {error && <p className="error" role="alert">{error}</p>}
      {loading ? <p role="status" className="empty">Đang tải dữ liệu…</p> : <div className="table-wrap"><table><thead><tr>{(section === 'accounts' ? ['Tên đăng nhập', 'Người sử dụng', 'Vai trò', 'Trạng thái'] : section === 'roles' ? ['Vai trò', 'Quyền được cấp', 'Số tài khoản'] : ['Mã / Họ tên', 'Liên hệ', 'Tài khoản', 'Trạng thái']).map(name => <th key={name}>{name}</th>)}<th>Thao tác</th></tr></thead><tbody>
        {rows.map(row => <tr key={row.id}>{section === 'accounts' ? <><td><strong>{row.username}</strong></td><td>{row.employee ? `${row.employee.code} · ${row.employee.name}` : 'Chưa liên kết'}</td><td>{row.role?.name}</td><td><span className={`status ${row.status === 'ACTIVE' ? 'active' : ''}`}>{states[row.status || '']}</span></td></> : section === 'roles' ? <><td><strong>{row.name}</strong><small>{row.description}</small></td><td className="permission-summary">{row.permissions?.map(p => p.permission.name).join(', ') || 'Chưa cấp quyền'}</td><td>{row._count?.accounts || 0}</td></> : <><td><strong>{row.name}</strong><small>{row.code}</small></td><td>{row.email || '—'}<small>{row.phone}</small></td><td>{data.accounts.find(a => a.id === row.accountId)?.username || 'Chưa có'}</td><td><span className={`status ${row.status === 'ACTIVE' ? 'active' : ''}`}>{states[row.status || '']}</span></td></>}
          <td><div className="actions"><button onClick={() => setEditing(row)}>Sửa</button><button className="danger" disabled={deleting === row.id} onClick={() => void remove(row)}>{deleting === row.id ? 'Đang xóa…' : 'Xóa'}</button></div></td></tr>)}
        {!rows.length && <tr><td className="empty" colSpan={section === 'roles' ? 4 : 5}>{error ? 'Không tải được danh sách.' : 'Chưa có dữ liệu phù hợp.'}</td></tr>}
      </tbody></table></div>}<p className="count">{rows.length} bản ghi</p></section>
      <p className="footnote">Giai đoạn hiện tại chưa bật đăng nhập và kiểm tra quyền truy cập API.</p>
    </main>
    {editing !== undefined && <Editor section={section} entry={editing} data={data} permissions={permissions} close={() => setEditing(undefined)} saved={load} />}
  </div>;
}

function Editor({ section, entry, data, permissions, close, saved }: {
  section: Section; entry: Entry | null; data: Data; permissions: Permission[]; close: () => void; saved: () => Promise<void>;
}) {
  const [values, setValues] = useState<Record<string, string>>({
    username: entry?.username || '', password: '', roleId: entry?.roleId || '', employeeId: entry?.employee?.id || '',
    status: entry?.status || 'ACTIVE', code: entry?.code || '', name: entry?.name || '',
    email: entry?.email || '', phone: entry?.phone || '', description: entry?.description || '',
  });
  const [selected, setSelected] = useState(entry?.permissions?.map(p => p.permission.code) || []);
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  function field(name: string, title: string, options?: { value: string; label: string }[], optional = false, type = 'text') {
    return <div className="field" key={name}><label htmlFor={name}>{title}{optional ? ' (không bắt buộc)' : ''}</label>{options ? <select id={name} value={values[name]} required={!optional} onChange={e => setValues({ ...values, [name]: e.target.value })}><option value="">Chọn…</option>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select> : <input id={name} type={type} autoComplete={name === 'password' ? 'new-password' : undefined} minLength={name === 'password' ? 8 : undefined} maxLength={name === 'password' ? 128 : undefined} required={!optional} value={values[name]} onChange={e => setValues({ ...values, [name]: e.target.value })} />}</div>;
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    const payload = section === 'accounts' ? { username: values.username, password: values.password, roleId: values.roleId, employeeId: values.employeeId || null, status: values.status }
      : section === 'roles' ? { name: values.name, description: values.description, permissions: selected }
      : { code: values.code, name: values.name, email: values.email, phone: values.phone, status: values.status };
    try { await api(entry ? `${section}/${entry.id}` : section, entry ? 'PUT' : 'POST', payload); await saved(); close(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không lưu được dữ liệu'); }
    finally { setBusy(false); }
  }
  return <div className="overlay"><section className="dialog" role="dialog" aria-modal="true" aria-labelledby="editor-title"><div className="dialog-heading"><h2 id="editor-title">{entry ? 'Cập nhật' : 'Thêm mới'} · {titles[section]}</h2><button disabled={busy} onClick={close} aria-label="Đóng">×</button></div><form onSubmit={submit}><fieldset disabled={busy}><div className="form-grid">
    {section === 'accounts' ? <>{field('username', 'Tên đăng nhập')}{field('password', entry ? 'Mật khẩu mới' : 'Mật khẩu', undefined, !!entry, 'password')}{field('roleId', 'Vai trò', data.roles.map(r => ({ value: r.id, label: r.name || '' })))}{field('employeeId', 'Người sử dụng', data.employees.filter(e => !e.accountId || e.accountId === entry?.id).map(e => ({ value: e.id, label: `${e.code} · ${e.name}` })), true)}</> : section === 'roles' ? <>{field('name', 'Tên vai trò')}{field('description', 'Mô tả', undefined, true)}</> : <>{field('code', 'Mã người sử dụng')}{field('name', 'Họ tên')}{field('email', 'Email', undefined, true, 'email')}{field('phone', 'Điện thoại', undefined, true)}</>}
    {section !== 'roles' && field('status', 'Trạng thái', [{ value: 'ACTIVE', label: 'Hoạt động' }, { value: section === 'accounts' ? 'LOCKED' : 'INACTIVE', label: section === 'accounts' ? 'Đã khóa' : 'Ngừng hoạt động' }])}</div>
    {section === 'accounts' && <p className="hint">Mật khẩu từ 8 ký tự. Khi sửa, để trống để giữ mật khẩu hiện tại. Tạo hồ sơ tại mục Thông tin người sử dụng nếu chưa có.</p>}
    {section === 'roles' && <div className="permission-groups">{[...new Set(permissions.map(p => p.group))].map(group => <section key={group}><h3>{group}</h3>{permissions.filter(p => p.group === group).map(p => <label className="check" key={p.code}><input type="checkbox" checked={selected.includes(p.code)} onChange={e => setSelected(e.target.checked ? [...selected, p.code] : selected.filter(code => code !== p.code))} />{p.name}</label>)}</section>)}</div>}
    {error && <p className="error" role="alert">{error}</p>}<div className="dialog-actions"><button type="button" onClick={close}>Hủy</button><button className="primary" type="submit">{busy ? 'Đang lưu…' : 'Lưu'}</button></div>
  </fieldset></form></section></div>;
}

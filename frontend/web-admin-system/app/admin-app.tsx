'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api, type Entry, type Permission, type Section, type AdminUser } from './admin-api';
import { Pagination, usePagination } from './list-pagination';
import { Drawer, Icon } from './admin-ui';
import RoleTemplateManager from './role-template-manager';
import RolePermissions, { permissionAreas, type RolePreset } from './role-permissions';

const titles: Record<Section, string> = { accounts: 'Tài khoản', roles: 'Vai trò và quyền', employees: 'Người sử dụng' };
const states: Record<string, string> = { ACTIVE: 'Hoạt động', LOCKED: 'Đã khóa', INACTIVE: 'Ngừng hoạt động' };
type Data = Record<Section, Entry[]>;

export default function AdminApp({ user, logout, logoutBusy }: { user: AdminUser; logout: () => Promise<void>; logoutBusy: boolean }) {
  const [section, setSection] = useState<Section>('accounts');
  const [data, setData] = useState<Data>({ accounts: [], roles: [], employees: [] });
  const [roleMode, setRoleMode] = useState<'roles' | 'templates'>('roles');
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
  useEffect(() => { const initial = window.setTimeout(() => void load(), 0); return () => window.clearTimeout(initial); }, [load]);
  function navigate(key: Section) { setSection(key); setSearch(''); setFilter(''); }
  async function remove(row: Entry) {
    const label = row.username || row.name || row.code || '';
    if (!window.confirm(`Xóa “${label}”?${section === 'accounts' ? ' Thông tin người sử dụng và giao dịch được giữ lại.' : ''}`)) return;
    setDeleting(row.id); setError('');
    try { await api(`${section}/${row.id}`, 'DELETE'); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không thể xóa'); }
    finally { setDeleting(undefined); }
  }
  const rows = data[section].filter(row => {
    const text = [row.username, row.name, row.code, row.email, row.phone, row.role?.name, row.employee?.code, row.employee?.name, row.description].filter(Boolean).join(' ').toLocaleLowerCase('vi');
    return text.includes(search.trim().toLocaleLowerCase('vi')) && (!filter || row.status === filter);
  });
  const pager = usePagination(rows, JSON.stringify([section, search, filter]));
  function roleSummary(row: Entry) {
    const codes = row.permissions?.map(p => p.permission.code) || [];
    if (codes.includes('*')) return <span className="access-badge">Toàn hệ thống</span>;
    const groups = permissionAreas(codes);
    return <div className="permission-summary">{groups.slice(0, 3).map(group => <span className="group-chip" key={group}>{group}</span>)}{groups.length > 3 && <span className="group-chip" title={groups.slice(3).join(', ')}>+{groups.length - 3} nhóm</span>}<small>{codes.length ? `${codes.length} quyền được cấp` : 'Chưa cấp quyền'}</small></div>;
  }
  return <div className="admin-shell">
    <header className="app-header"><span className="brand">Quản trị hệ thống</span><div className="admin-profile"><div><strong>{user.name}</strong><small>{user.username}</small></div><button className="icon-button" disabled={logoutBusy} onClick={() => void logout()} aria-label={logoutBusy ? 'Đang đăng xuất' : 'Đăng xuất'} title="Đăng xuất"><Icon name="logout" /></button></div></header>
    <nav className="section-nav" aria-label="Quản trị">{(Object.keys(titles) as Section[]).map(key => <button key={key} aria-current={section === key ? 'page' : undefined} className={section === key ? 'selected' : ''} onClick={() => navigate(key)}><Icon name={key} /><span>{titles[key]}</span><span className="nav-count">{loading ? '…' : data[key].length}</span></button>)}</nav>
    <main><h1 className="sr-only">{titles[section]}</h1>
      {section === 'roles' && <nav className="role-mode-tabs" aria-label="Quản lý vai trò"><button disabled={loading || !!error} className={roleMode === 'roles' ? 'selected' : ''} aria-pressed={roleMode === 'roles'} onClick={() => setRoleMode('roles')}>Vai trò đang sử dụng</button><button disabled={loading || !!error} className={roleMode === 'templates' ? 'selected' : ''} aria-pressed={roleMode === 'templates'} onClick={() => setRoleMode('templates')}>Mẫu vai trò</button></nav>}
      {section === 'roles' && roleMode === 'templates' ? <RoleTemplateManager permissions={permissions} /> : <section aria-label={titles[section]} className="panel">
        {section === 'roles' && <p className="hint">Tạo vai trò theo vị trí: Quản lý kho, Trưởng bếp, Nhân viên chế biến, Phục vụ, Thu ngân… Chọn mẫu sẽ điền sẵn quyền phù hợp; không cần tự tích từng ô.</p>}
        <div className="list-controls"><div className="search-field"><Icon name="search" /><input aria-label={`Tìm ${titles[section].toLocaleLowerCase('vi')}`} placeholder={section === 'accounts' ? 'Tìm tên đăng nhập, người sử dụng, vai trò…' : section === 'roles' ? 'Tìm vai trò…' : 'Tìm mã, họ tên, email, điện thoại…'} value={search} onChange={e => setSearch(e.target.value)} /></div>
        {section !== 'roles' && <select aria-label="Lọc trạng thái" value={filter} onChange={e => setFilter(e.target.value)}><option value="">Mọi trạng thái</option><option value="ACTIVE">Hoạt động</option><option value={section === 'accounts' ? 'LOCKED' : 'INACTIVE'}>{section === 'accounts' ? 'Đã khóa' : 'Ngừng hoạt động'}</option></select>}
        <button className="primary create-button" disabled={loading || !!error || !!deleting || (section === 'accounts' && !data.roles.length)} onClick={() => setEditing(null)}><Icon name="plus" />{section === 'accounts' ? 'Thêm tài khoản' : section === 'roles' ? 'Tạo vai trò từ mẫu' : 'Thêm người sử dụng'}</button></div>
        {section === 'accounts' && !data.roles.length && !loading && !error && <p className="hint">Cần tạo vai trò trước khi cấp tài khoản. <button className="text-button" onClick={() => navigate('roles')}>Tạo vai trò</button></p>}
        {error && <div className="error" role="alert">{error} <button className="text-button" disabled={loading || !!deleting} onClick={() => void load()}>Thử lại</button></div>}
        {loading ? <p role="status" className="empty">Đang tải dữ liệu…</p> : <div className="table-wrap"><table><thead><tr>{(section === 'accounts' ? ['Tên đăng nhập', 'Người sử dụng', 'Vai trò', 'Trạng thái'] : section === 'roles' ? ['Vai trò', 'Phạm vi truy cập', 'Tài khoản'] : ['Người sử dụng', 'Liên hệ', 'Tài khoản', 'Trạng thái']).map(name => <th scope="col" key={name}>{name}</th>)}<th scope="col" className="action-cell"><span className="sr-only">Thao tác</span></th></tr></thead><tbody>
        {pager.rows.map(row => <tr key={row.id}>{section === 'accounts' ? <><td><div className="identity"><span className="avatar" aria-hidden="true">{(row.username || '?').slice(0, 1).toUpperCase()}</span><div><strong>{row.username}</strong>{row.id === user.id && <small className="self-label">Tài khoản của bạn</small>}</div></div></td><td>{row.employee ? <><span>{row.employee.name}</span><small>{row.employee.code}</small></> : <span className="muted">Chưa liên kết</span>}</td><td><span className="role-name">{row.role?.name || '—'}</span></td><td><Status value={row.status} /></td></> : section === 'roles' ? <><td><strong>{row.name}</strong>{row.description && <small className="row-description">{row.description}</small>}</td><td>{roleSummary(row)}</td><td><span className="number">{row._count?.accounts || 0}</span></td></> : <><td><div className="identity"><span className="avatar" aria-hidden="true">{(row.name || '?').slice(0, 1).toUpperCase()}</span><div><strong>{row.name}</strong><small>{row.code}</small></div></div></td><td>{row.email || <span className="muted">Chưa có email</span>}{row.phone && <small>{row.phone}</small>}</td><td>{data.accounts.find(a => a.id === row.accountId)?.username || <span className="muted">Chưa có tài khoản</span>}</td><td><Status value={row.status} /></td></>}
          <td className="action-cell"><div className="actions"><button disabled={!!deleting} onClick={() => setEditing(row)}><Icon name="edit" />Chỉnh sửa</button><button className="icon-button danger" disabled={!!deleting || (section === 'accounts' && row.id === user.id)} onClick={() => void remove(row)} aria-label={`Xóa ${row.username || row.name || row.code}`} title={section === 'accounts' && row.id === user.id ? 'Không thể xóa tài khoản đang đăng nhập' : 'Xóa'}><Icon name="trash" /></button></div></td></tr>)}
        {!rows.length && <tr><td className="empty" colSpan={section === 'roles' ? 4 : 5}><Icon name={section} /><strong>{error ? 'Không tải được danh sách' : search || filter ? 'Không tìm thấy kết quả' : 'Chưa có dữ liệu'}</strong>{search || filter ? <button className="text-button" onClick={() => { setSearch(''); setFilter(''); }}>Bỏ tìm kiếm và bộ lọc</button> : <span>{section === 'accounts' ? 'Thêm tài khoản để cấp quyền truy cập hệ thống.' : section === 'roles' ? 'Tạo vai trò và chọn các quyền cần thiết.' : 'Thêm hồ sơ để liên kết tài khoản và giao việc.'}</span>}</td></tr>}
        </tbody></table></div>}
        {!loading && <Pagination pager={pager} disabled={!!deleting} />}
      </section>}
    </main>
    {editing !== undefined && <Editor key={section + ':' + (editing?.id || 'new')} section={section} entry={editing} data={data} permissions={permissions} close={() => setEditing(undefined)} saved={load} />}
  </div>;
}
function Status({ value }: { value?: string }) {
  return <span className={`status ${value === 'ACTIVE' ? 'active' : value === 'LOCKED' ? 'locked' : 'inactive'}`}><span aria-hidden="true" />{states[value || ''] || value || '—'}</span>;
}

function Editor({ section, entry, data, permissions, close, saved }: {
  section: Section; entry: Entry | null; data: Data; permissions: Permission[]; close: () => void; saved: () => Promise<void>;
}) {
  const [values, setValues] = useState<Record<string, string>>({
    username: entry?.username || '', password: '', roleId: entry?.roleId || '', employeeId: entry?.employee?.id || '',
    status: entry?.status || 'ACTIVE', code: entry?.code || '', name: entry?.name || '',
    email: entry?.email || '', phone: entry?.phone || '', description: entry?.description || '',
  });
  const [selected, setSelected] = useState(entry?.permissions?.map(p => p.permission.code).filter(code => permissions.some(p => p.code === code)) || []);
  function applyPreset(preset: RolePreset) {
    setValues(v => ({ ...v, name: entry ? v.name : preset.name, description: preset.description }));
  }
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
  return <Drawer title={`${entry ? 'Cập nhật' : 'Thêm'} ${titles[section].toLocaleLowerCase('vi')}`} onClose={close} locked={busy}><form onSubmit={submit}><fieldset disabled={busy}><div className="form-grid">
    {section === 'accounts' ? <>{field('username', 'Tên đăng nhập')}{field('password', entry ? 'Mật khẩu mới' : 'Mật khẩu', undefined, !!entry, 'password')}{field('roleId', 'Vai trò', data.roles.map(r => ({ value: r.id, label: r.name || '' })))}{field('employeeId', 'Người sử dụng', data.employees.filter(e => !e.accountId || e.accountId === entry?.id).map(e => ({ value: e.id, label: `${e.code} · ${e.name}` })), true)}</> : section === 'roles' ? <>{field('name', 'Tên vai trò')}{field('description', 'Mô tả', undefined, true)}</> : <>{field('code', 'Mã người sử dụng')}{field('name', 'Họ tên')}{field('email', 'Email', undefined, true, 'email')}{field('phone', 'Điện thoại', undefined, true)}</>}
    {section !== 'roles' && field('status', 'Trạng thái', [{ value: 'ACTIVE', label: 'Hoạt động' }, { value: section === 'accounts' ? 'LOCKED' : 'INACTIVE', label: section === 'accounts' ? 'Đã khóa' : 'Ngừng hoạt động' }])}</div>
    {section === 'accounts' && <p className="hint">Mật khẩu tối thiểu 8 ký tự. Khi cập nhật, để trống để giữ mật khẩu hiện tại.</p>}
    {section === 'accounts' && values.roleId && (() => { const role = data.roles.find(r => r.id === values.roleId); const codes = role?.permissions?.map(p => p.permission.code) || []; return <div className="hint"><strong>Vai trò: {role?.name}</strong><small>{role?.description}</small><small>{codes.includes('*') ? 'Toàn hệ thống' : permissionAreas(codes).join(' · ') || 'Chưa cấp quyền'}</small></div>; })()}

    {section === 'roles' && <RolePermissions permissions={permissions} selected={selected} onChange={setSelected} onApply={applyPreset} />}
    {error && <p className="error" role="alert">{error}</p>}<div className="dialog-actions"><button type="button" onClick={close}>Hủy</button><button className="primary" type="submit">{busy ? 'Đang lưu…' : 'Lưu'}</button></div>
  </fieldset></form></Drawer>;
}

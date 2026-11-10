'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api, type Permission } from './admin-api';
import { Drawer } from './admin-ui';
import { PermissionChecklist, type RolePreset } from './role-permissions';
import './role-permissions.css';
const workspaces = ['Kho & Chế biến', 'Quản lý nhà hàng', 'Admin system'];
export default function RoleTemplateManager({ permissions }: { permissions: Permission[] }) {
  const [rows, setRows] = useState<RolePreset[]>([]), [loading, setLoading] = useState(true), [error, setError] = useState(''), [editing, setEditing] = useState<RolePreset>(), [resetting, setResetting] = useState(''), [notice, setNotice] = useState('');
  const load = useCallback(async () => { setLoading(true); setError(''); try { setRows(await api<RolePreset[]>('role-presets')); } catch (e) { setError(e instanceof Error ? e.message : 'Không tải được mẫu'); } finally { setLoading(false); } }, []);
  useEffect(() => { void load(); }, [load]);
  async function reset(p: RolePreset) {
    if (!window.confirm('Khôi phục mẫu ' + p.name + ' về mặc định? Vai trò và tài khoản hiện có không thay đổi.')) return;
    setResetting(p.id); setNotice(''); setError('');
    try { await api('role-presets/' + p.id, 'DELETE'); await load(); setNotice('Đã khôi phục mẫu mặc định.'); } catch (e) { setError(e instanceof Error ? e.message : 'Không khôi phục được'); } finally { setResetting(''); }
  }
  return <section className="template-manager"><div className="role-guide"><strong>Mẫu dùng để tạo hoặc điền quyền cho vai trò</strong><p>Sửa mẫu chỉ thay đổi các lần chọn mẫu tiếp theo. Các vai trò đã tạo và tài khoản đang dùng giữ nguyên quyền.</p></div><div className="template-toolbar"><button disabled={loading || !!resetting} onClick={() => void load()}>Tải lại mẫu</button></div>{error && <p className="error" role="alert">{error}</p>}{notice && <p className="hint" role="status">{notice}</p>}{loading ? <p role="status">Đang tải mẫu vai trò…</p> : workspaces.map(w => <section className="role-preset-group" key={w}><h3>{w}</h3><div className="role-preset-grid">{rows.filter(p => p.workspace === w).map(p => <article className="template-card" key={p.id}><strong>{p.name}</strong><small>{p.description || 'Chưa có mô tả'}</small><p>{p.permissions.includes('*') ? 'Toàn quyền hệ thống' : p.permissions.length + ' quyền'} · {p.customized ? 'Đã tùy chỉnh' : 'Mặc định'}</p><div className="actions"><button disabled={!!resetting} onClick={() => { setNotice(''); setEditing(p); }}>Sửa mẫu</button>{p.customized && <button disabled={!!resetting} onClick={() => void reset(p)}>Khôi phục mặc định</button>}</div></article>)}</div></section>)}{editing && <TemplateEditor key={editing.id} preset={editing} permissions={permissions} close={() => setEditing(undefined)} saved={async () => { setNotice('Đã lưu mẫu. Các vai trò đang sử dụng không thay đổi.'); await load(); }} />}</section>;
}
function TemplateEditor({ preset, permissions, close, saved }: { preset: RolePreset; permissions: Permission[]; close: () => void; saved: () => Promise<void> }) {
  const [name, setName] = useState(preset.name), [description, setDescription] = useState(preset.description), [workspace, setWorkspace] = useState(preset.workspace), [selected, setSelected] = useState(preset.permissions), [busy, setBusy] = useState(false), [error, setError] = useState('');
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError('');
    try { await api('role-presets/' + preset.id, 'PUT', { name, description, workspace, permissions: selected }); await saved(); close(); } catch (e) { setError(e instanceof Error ? e.message : 'Không lưu được mẫu'); } finally { setBusy(false); }
  }
  return <Drawer title={'Sửa mẫu · ' + preset.name} locked={busy} onClose={close}><form onSubmit={submit}><fieldset disabled={busy}><p className="hint">Bạn đang sửa mẫu điền quyền, không sửa vai trò đang cấp cho tài khoản.</p><div className="form-grid"><label className="field">Tên mẫu<input required maxLength={100} value={name} onChange={e => setName(e.target.value)} /></label><label className="field">Web làm việc chính<select required value={workspace} onChange={e => setWorkspace(e.target.value)}>{workspaces.map(w => <option key={w}>{w}</option>)}</select></label></div><label className="field">Mô tả<input maxLength={500} value={description} onChange={e => setDescription(e.target.value)} /></label><p><strong>{selected.includes('*') ? 'Toàn quyền hệ thống' : selected.length + ' quyền được chọn'}</strong></p><PermissionChecklist permissions={permissions} selected={selected} onChange={setSelected} />{error && <p className="error" role="alert">{error}</p>}<div className="dialog-actions"><button type="button" onClick={close}>Hủy</button><button className="primary">{busy ? 'Đang lưu…' : 'Lưu mẫu'}</button></div></fieldset></form></Drawer>;
}

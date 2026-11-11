'use client';
import { useCallback, useEffect, useState } from 'react';
import { api, type Permission } from './admin-api';
import './role-permissions.css';
export type RolePreset = { id: string; customized?: boolean; name: string; description: string; workspace: string; permissions: string[] };
const areas = [
  { name: 'Kho & giao nhận', codes: ['catalog:manage', 'inventory:view', 'receipt:create', 'receipt:post', 'material:view', 'material:approve', 'waste:approve', 'export:request', 'export:approve'] },
  { name: 'Điều phối & chế biến', codes: ['bom:manage', 'production:manage', 'production:perform', 'production:inspect', 'material:request', 'waste:request'] },
  { name: 'Phục vụ & thanh toán', codes: ['sale:view', 'sale:create', 'store:manage', 'payment:create', 'dining:manage', 'product:price', 'product:manage'] },
  { name: 'Báo cáo', codes: ['report:stock', 'report:sales'] },
  { name: 'Quản trị hệ thống', codes: ['*', 'account:manage', 'employee:manage'] },
];
export function permissionAreas(codes: string[]) { return areas.filter(a => a.codes.some(c => codes.includes(c))).map(a => a.name); }
export default function RolePermissions({ permissions, selected, onChange, onApply }: { permissions: Permission[]; selected: string[]; onChange: (codes: string[]) => void; onApply: (preset: RolePreset) => void }) {
  const [presets, setPresets] = useState<RolePreset[]>([]), [loading, setLoading] = useState(true), [error, setError] = useState(''), [advanced, setAdvanced] = useState(false);
  const [chosen, setChosen] = useState('');
  const load = useCallback(async () => { setLoading(true); setError(''); try { const rows = await api<RolePreset[]>('role-presets'); if (!rows.length) throw new Error('Backend chưa trả về mẫu vai trò. Kiểm tra backend và tải lại.'); setPresets(rows.map(p => ({ ...p, workspace: p.workspace || (p.name === 'Admin hệ thống' ? 'Admin system' : ['Quản lý nhà hàng', 'Nhân viên phục vụ', 'Thu ngân'].includes(p.name) ? 'Quản lý nhà hàng' : 'Kho & Chế biến') }))); } catch (e) { setError(e instanceof Error ? e.message : 'Không tải được mẫu vai trò'); } finally { setLoading(false); } }, []);
  useEffect(() => { const initial = window.setTimeout(() => void load(), 0); return () => window.clearTimeout(initial); }, [load]);
  const full = selected.includes('*');
  const same = (p: RolePreset) => p.permissions.length === selected.length && p.permissions.every(c => selected.includes(c));
  const picked = presets.find(p => p.id === chosen), matching = picked && same(picked) ? picked : presets.find(same);
  function choose(p: RolePreset) { setChosen(p.id); onChange([...p.permissions]); onApply(p); }
  return <section className="role-permissions" aria-label="Chọn quyền theo vị trí"><div className="role-guide"><strong>Chọn vị trí người dùng sẽ đảm nhiệm</strong><p>Chọn một mẫu để điền quyền. Có thể chỉnh thêm nếu kiêm nhiệm. Chỉ áp dụng cho tài khoản sau khi bấm Lưu vai trò.</p></div>{loading && <p role="status">Đang tải các vị trí…</p>}{error && <div className="error" role="alert">{error}<button type="button" onClick={() => void load()}>Tải lại mẫu</button><small>Vẫn có thể chỉnh quyền thủ công bên dưới. Mẫu không bị ẩn khi tải lỗi.</small></div>}{['Kho & Chế biến', 'Quản lý nhà hàng', 'Admin system'].map(workspace => {
    const rows = presets.filter(p => p.workspace === workspace);
    return rows.length ? <div className="role-preset-group" key={workspace}><h3>{workspace}</h3><div className="role-preset-grid">{rows.map(p => <button type="button" key={p.id} aria-pressed={same(p)} className={'role-preset' + (same(p) ? ' is-selected' : '')} onClick={() => choose(p)}><span><strong>{p.name}</strong>{same(p) && <em>Đang chọn</em>}</span><small>{p.description}</small></button>)}</div></div> : null;
  })}<div className="role-selection" aria-live="polite"><strong>{full ? 'Toàn quyền hệ thống' : matching ? 'Quyền theo mẫu: ' + matching.name : selected.length ? 'Quyền tùy chỉnh · ' + selected.length + ' quyền' : 'Chưa chọn quyền'}</strong>{matching && <small>Nơi làm việc chính: {matching.workspace}</small>}{!matching && picked && <small>Đã điều chỉnh từ mẫu {picked.name}.</small>}{full ? <p>Truy cập và quản trị toàn hệ thống. Không cần tích thêm các quyền nghiệp vụ.</p> : selected.length > 0 ? <div className="role-preview">{areas.map(a => {
    const granted = permissions.filter(p => a.codes.includes(p.code) && selected.includes(p.code));
    return granted.length ? <div key={a.name}><h4>{a.name}</h4><ul>{granted.map(p => <li key={p.code}>{p.name}</li>)}</ul></div> : null;
  })}</div> : <p>Ví dụ: chọn Nhân viên chế biến cho tài khoản nhận lệnh và ghi nhận chế biến.</p>}</div><button type="button" className="role-custom-toggle" aria-expanded={advanced} onClick={() => setAdvanced(!advanced)}>{advanced ? 'Thu gọn chỉnh quyền' : 'Chỉnh từng quyền / thêm quyền kiêm nhiệm'}</button>{advanced && <PermissionChecklist permissions={permissions} selected={selected} onChange={onChange} />}</section>;
}
export function PermissionChecklist({ permissions, selected, onChange }: { permissions: Permission[]; selected: string[]; onChange: (codes: string[]) => void }) {
  const full = selected.includes('*');
  function toggle(code: string, checked: boolean) { onChange(code === '*' && checked ? ['*'] : checked ? [...new Set([...selected, code])] : selected.filter(c => c !== code)); }
  const groups = [...areas, { name: 'Quyền khác', codes: permissions.filter(p => !areas.some(a => a.codes.includes(p.code))).map(p => p.code) }];
  return <div className="role-custom"><p>Web làm việc chính là thông tin hướng dẫn. Quyền được chọn mới quyết định các chức năng được sử dụng.</p>{full && <p className="hint">Toàn quyền hệ thống đã bao gồm mọi chức năng. Bỏ chọn để cấp các quyền riêng.</p>}{groups.filter(a => a.codes.some(code => permissions.some(p => p.code === code))).map(a => <section className="role-check-group" key={a.name}><h3>{a.name}</h3>{a.name === 'Quản trị hệ thống' && <small>Admin server hiện dùng toàn quyền hệ thống; quyền quản trị riêng lẻ chưa mở quyền đăng nhập Admin.</small>}{permissions.filter(p => a.codes.includes(p.code)).map(p => <label className="check" key={p.code}><input type="checkbox" disabled={full && p.code !== '*'} checked={selected.includes(p.code)} onChange={e => toggle(p.code, e.target.checked)} />{p.name}</label>)}</section>)}</div>;
}


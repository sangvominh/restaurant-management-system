'use client';
import { useEffect, useState, type FormEvent } from 'react';
import AdminApp from './admin-app';
import { api, TOKEN_KEY, type AdminUser } from './admin-api';

export default function AdminSession() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    const ended = () => { setUser(null); setError('Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại.'); };
    window.addEventListener('admin-session-ended', ended);
    const profile = sessionStorage.getItem(TOKEN_KEY) ? api<AdminUser>('auth/me') : Promise.resolve(null);
    profile.then(value => { if (active) setUser(value); })
      .catch(err => { if (active) setError(err instanceof Error ? err.message : 'Không xác nhận được phiên đăng nhập'); })
      .finally(() => { if (active) setReady(true); });
    return () => { active = false; window.removeEventListener('admin-session-ended', ended); };
  }, [retry]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    try {
      const result = await api<{ token: string; user: AdminUser }>('auth/login', 'POST', {
        username: form.get('username'), password: form.get('password'),
      });
      sessionStorage.setItem(TOKEN_KEY, result.token); setUser(result.user);
    } catch (err) { setError(err instanceof Error ? err.message : 'Không kết nối được backend'); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true); setError('');
    try { await api('auth/logout', 'POST'); sessionStorage.removeItem(TOKEN_KEY); setUser(null); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không thể đăng xuất, vui lòng thử lại'); }
    finally { setBusy(false); }
  }
  if (!ready) return <div className="login-screen"><p role="status">Đang kiểm tra phiên đăng nhập…</p></div>;
  if (user) return <><AdminApp user={user} logout={logout} logoutBusy={busy} />{error && <p className="session-error error" role="alert">{error}</p>}</>;
  return <div className="login-screen"><section className="login-card"><div className="brand"><span>A</span><div>Admin server<small>MRP Nhà hàng</small></div></div><h1>Đăng nhập quản trị</h1><p className="login-description">Sử dụng tài khoản có quyền System Admin.</p><form onSubmit={login}><fieldset disabled={busy}><div className="field"><label htmlFor="login-username">Tên đăng nhập</label><input id="login-username" name="username" autoComplete="username" required maxLength={100} /></div><div className="field"><label htmlFor="login-password">Mật khẩu</label><input id="login-password" name="password" type="password" autoComplete="current-password" required maxLength={128} /></div>{error && <p role="alert" className="error">{error}</p>}<button type="submit" className="primary">{busy ? 'Đang đăng nhập…' : 'Đăng nhập'}</button></fieldset></form><p className="login-description">Nếu DB mới, chạy lệnh khởi tạo Admin trước khi đăng nhập.</p><button className="text-button" onClick={() => { setReady(false); setError(''); setRetry(value => value + 1); }}>Kiểm tra lại kết nối</button></section></div>;
}

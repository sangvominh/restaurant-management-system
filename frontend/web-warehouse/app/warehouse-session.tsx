'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { api, TOKEN_KEY, type User } from './catalog-api';
import WarehouseApp from './warehouse-app';
export default function WarehouseSession() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    const ended = () => { setUser(null); setError('Phiên đã kết thúc, vui lòng đăng nhập lại.'); };
    window.addEventListener('warehouse-session-ended', ended);
    const profile = sessionStorage.getItem(TOKEN_KEY) ? api<User>('auth/me') : Promise.resolve(null);
    profile.then(value => { if (active) setUser(value); })
      .catch(err => { if (active) setError(err instanceof Error ? err.message : 'Không kết nối được backend'); })
      .finally(() => { if (active) setReady(true); });
    return () => { active = false; window.removeEventListener('warehouse-session-ended', ended); };
  }, [retry]);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget); setBusy(true); setError('');
    try { const result = await api<{ token: string; user: User }>('auth/login', 'POST', { username: data.get('username'), password: data.get('password') }); sessionStorage.setItem(TOKEN_KEY, result.token); setUser(result.user); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không kết nối được backend'); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true); setError('');
    try { await api('auth/logout', 'POST'); sessionStorage.removeItem(TOKEN_KEY); setUser(null); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không đăng xuất được'); }
    finally { setBusy(false); }
  }
  if (!ready) return <div className="login-screen"><p role="status">Đang kiểm tra phiên…</p></div>;
  if (user) return <><WarehouseApp user={user} logout={logout} busy={busy} />{error && <p className="error session-error" role="alert">{error}</p>}</>;
  return <div className="login-screen"><section className="login-card"><div className="brand"><span>K</span><div>Kho và sản xuất<small>MRP Nhà hàng</small></div></div><h1>Đăng nhập kho</h1><p className="login-description">Dùng tài khoản được cấp từ Admin server.</p><form onSubmit={login}><fieldset disabled={busy}><div className="field"><label htmlFor="username">Tên đăng nhập</label><input id="username" name="username" autoComplete="username" required maxLength={100} /></div><div className="field"><label htmlFor="password">Mật khẩu</label><input id="password" name="password" type="password" autoComplete="current-password" required maxLength={128} /></div>{error && <p className="error" role="alert">{error}</p>}<button className="primary">{busy ? 'Đang đăng nhập…' : 'Đăng nhập'}</button></fieldset></form><button className="text-button" style={{ marginTop: 18 }} onClick={() => { setReady(false); setError(''); setRetry(value => value + 1); }}>Kiểm tra lại phiên</button></section></div>;
}

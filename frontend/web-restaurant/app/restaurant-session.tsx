'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { api, TOKEN, type User } from './sales-api';
import SalesApp from './sales-app';
export default function RestaurantSession() {
  const [user, setUser] = useState<User | null>(null), [ready, setReady] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    const ended = () => { setUser(null); setError('Phiên đã kết thúc, vui lòng đăng nhập lại.'); };
    window.addEventListener('restaurant-session-ended', ended);
    (sessionStorage.getItem(TOKEN) ? api<User>('auth/me') : Promise.resolve(null)).then(u => { if (active) setUser(u); }).catch(e => { if (active) setError(e instanceof Error ? e.message : 'Không kết nối được backend'); }).finally(() => { if (active) setReady(true); });
    return () => { active = false; window.removeEventListener('restaurant-session-ended', ended); };
  }, []);
  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const values = new FormData(e.currentTarget); setBusy(true); setError('');
    try { const r = await api<{ token: string; user: User }>('auth/login', 'POST', { username: values.get('username'), password: values.get('password') }); sessionStorage.setItem(TOKEN, r.token); setUser(r.user); }
    catch (e) { setError(e instanceof Error ? e.message : 'Không đăng nhập được'); } finally { setBusy(false); }
  }
  async function logout() { setBusy(true); setError(''); try { await api('auth/logout', 'POST'); sessionStorage.removeItem(TOKEN); setUser(null); } catch (e) { setError(e instanceof Error ? e.message : 'Không đăng xuất được'); } finally { setBusy(false); } }
  if (!ready) return <div className="login-screen">Đang kiểm tra phiên…</div>;
  if (user) return <><SalesApp user={user} logout={logout} logoutBusy={busy} />{error && <p className="error session-error">{error}</p>}</>;
  return <div className="login-screen"><section className="login-card"><p className="eyebrow">NHÀ HÀNG / BÁN HÀNG</p><h1>Đăng nhập</h1><p>Dùng tài khoản được cấp từ Admin System.</p><form onSubmit={login}><fieldset disabled={busy}><label>Tên đăng nhập<input name="username" autoComplete="username" required maxLength={100} /></label><label>Mật khẩu<input name="password" type="password" autoComplete="current-password" required maxLength={128} /></label>{error && <p className="error" role="alert">{error}</p>}<button className="primary">{busy ? 'Đang đăng nhập…' : 'Đăng nhập'}</button></fieldset></form></section></div>;
}

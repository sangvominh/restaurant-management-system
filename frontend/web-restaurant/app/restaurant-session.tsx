'use client';
import LoginView from './login-view';
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
  useEffect(() => {
    document.title = user ? `${user.roleName || user.username} · ${user.username} | Nhà hàng` : 'Đăng nhập | Nhà hàng';
  }, [user]);
  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const values = new FormData(e.currentTarget); setBusy(true); setError('');
    try { const r = await api<{ token: string; user: User }>('auth/login', 'POST', { username: String(values.get('username') || '').trim(), password: values.get('password') }); sessionStorage.setItem(TOKEN, r.token); setUser(r.user); }
    catch (e) { setError(e instanceof Error ? e.message : 'Không đăng nhập được'); } finally { setBusy(false); }
  }
  async function logout() { setBusy(true); setError(''); try { await api('auth/logout', 'POST'); sessionStorage.removeItem(TOKEN); setUser(null); } catch (e) { setError(e instanceof Error ? e.message : 'Không đăng xuất được'); } finally { setBusy(false); } }
  if (!ready) return <LoginView variant="restaurant" ready={false} busy={busy} error="" onSubmit={login} />;
  if (user) return <><SalesApp user={user} logout={logout} logoutBusy={busy} />{error && <p className="error session-error">{error}</p>}</>;
  return <LoginView variant="restaurant" busy={busy} error={error} onSubmit={login} />;
}


'use client';
import LoginView from './login-view';
import { useEffect, useState, type FormEvent } from 'react';
import { api, TOKEN_KEY, type User } from './catalog-api';
import WarehouseApp from './warehouse-app';
export default function WarehouseSession() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    const ended = () => { setUser(null); setError('Phiên đã kết thúc, vui lòng đăng nhập lại.'); };
    window.addEventListener('warehouse-session-ended', ended);
    const profile = sessionStorage.getItem(TOKEN_KEY) ? api<User>('auth/me') : Promise.resolve(null);
    profile.then(value => { if (active) setUser(value); })
      .catch(err => { if (active) setError(err instanceof Error ? err.message : 'Không kết nối được backend'); })
      .finally(() => { if (active) setReady(true); });
    return () => { active = false; window.removeEventListener('warehouse-session-ended', ended); };
  }, []);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget); setBusy(true); setError('');
    try { const result = await api<{ token: string; user: User }>('auth/login', 'POST', { username: String(data.get('username') || '').trim(), password: data.get('password') }); sessionStorage.setItem(TOKEN_KEY, result.token); setUser(result.user); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không kết nối được backend'); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true); setError('');
    try { await api('auth/logout', 'POST'); sessionStorage.removeItem(TOKEN_KEY); setUser(null); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không đăng xuất được'); }
    finally { setBusy(false); }
  }
  if (!ready) return <LoginView variant="warehouse" ready={false} busy={busy} error="" onSubmit={login} />;
  if (user) return <><WarehouseApp user={user} logout={logout} busy={busy} />{error && <p className="error session-error" role="alert">{error}</p>}</>;
  return <LoginView variant="warehouse" busy={busy} error={error} onSubmit={login} />;
}


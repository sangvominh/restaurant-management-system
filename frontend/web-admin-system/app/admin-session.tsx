'use client';
import LoginView from './login-view';
import { useEffect, useState, type FormEvent } from 'react';
import AdminApp from './admin-app';
import { api, TOKEN_KEY, type AdminUser } from './admin-api';

export default function AdminSession() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    const ended = () => { setUser(null); setError('Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại.'); };
    window.addEventListener('admin-session-ended', ended);
    const profile = sessionStorage.getItem(TOKEN_KEY) ? api<AdminUser>('auth/me') : Promise.resolve(null);
    profile.then(value => { if (active) setUser(value); })
      .catch(err => { if (active) setError(err instanceof Error ? err.message : 'Không xác nhận được phiên đăng nhập'); })
      .finally(() => { if (active) setReady(true); });
    return () => { active = false; window.removeEventListener('admin-session-ended', ended); };
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    try {
      const result = await api<{ token: string; user: AdminUser }>('auth/login', 'POST', {
        username: String(form.get('username') || '').trim(), password: form.get('password'),
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
  if (!ready) return <LoginView variant="admin" ready={false} busy={busy} error="" onSubmit={login} />;
  if (user) return <><AdminApp user={user} logout={logout} logoutBusy={busy} />{error && <p className="session-error error" role="alert">{error}</p>}</>;
  return <LoginView variant="admin" busy={busy} error={error} onSubmit={login} />;
}


'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Result, Spin } from 'antd';
import { apiFetch, clearSession, getToken, saveSession, type AuthUser } from '@/lib/api';
import { allowed, WarehouseUser } from '@/lib/auth';
import { canEnterPortal, portal } from '@/lib/portal';
import AppShell from '@/components/layout/app-shell';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const pathname = usePathname();
  useEffect(() => {
    let cancelled = false;
    setReady(false); setError(false); setUser(null);
    if (!getToken()) { setReady(true); return; }
    (async () => {
      try {
        const response = await apiFetch('/api/auth/me');
        if (!response.ok) throw new Error();
        const fresh: AuthUser = await response.json();
        const token = getToken();
        if (!cancelled && token) { setUser(fresh); saveSession(token, fresh); }
      } catch { if (!cancelled) setError(true); }
      finally { if (!cancelled) setReady(true); }
    })();
    return () => { cancelled = true; };
  }, [pathname, retry]);
  async function logout() {
    try { await apiFetch('/api/auth/logout', { method: 'POST' }); } catch { /* always clear local state */ }
    clearSession(); setUser(null); setError(false);
  }
  if (!ready) return <div style={{ padding: 64 }}><Spin /></div>;
  if (error) return <Result status="error" title="Không xác nhận được phiên đăng nhập" extra={<Button onClick={() => setRetry(r => r + 1)}>Thử lại</Button>} />;
  if (!user) return <Result status="info" title="Vui lòng đăng nhập" extra={<Link href="/login">Đăng nhập</Link>} />;
  if (!canEnterPortal(user)) return <Result status="403" title={`Bạn chưa có quyền vào ${portal.title}`} extra={<Button onClick={logout}>Đăng xuất</Button>} />;
  const page = portal.pages.find(page => pathname === page.path || pathname.startsWith(page.path + '/'));
  const canView = pathname === '/' || (!!page && allowed(user, ...page.permissions));
  return <WarehouseUser.Provider value={user}><div className="warehouse-portal"><AppShell>
    {canView ? children : <Result status="403" title="Bạn chưa được cấp quyền chức năng này" />}
  </AppShell></div></WarehouseUser.Provider>;
}

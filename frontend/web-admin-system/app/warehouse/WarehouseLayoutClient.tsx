'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Alert, Button, Result, Spin } from 'antd';
import { apiFetch, clearSession, getToken, isSystemAdmin, saveSession, type AuthUser } from '@/warehouse/session';
import { allowed, WarehouseUser, WAREHOUSE_PAGES } from '@/warehouse/auth';
import AppShell from '@/warehouse/components/layout/app-shell';

export default function WarehouseLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const pathname = usePathname();
  useEffect(() => {
    let cancelled = false;
    setReady(false); setError(false);
    setUser(null);
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
  if (!ready) return <div style={{ padding: 64 }}><Spin tip="Đang xác nhận phiên đăng nhập" /></div>;
  if (error) return <Result status="error" title="Không xác nhận được phiên đăng nhập"
    extra={<Button onClick={() => setRetry(r => r + 1)}>Thử lại</Button>} />;
  if (!user) return <Result status="info" title="Vui lòng đăng nhập" extra={<Link href="/login">Đăng nhập</Link>} />;
  if (!isSystemAdmin(user) && user.portal !== 'warehouse') return <Result status="403" title="Bạn chưa có quyền Kho / Nhà hàng" extra={<Button onClick={logout}>Đăng xuất</Button>} />;
  const nav = WAREHOUSE_PAGES.filter(p => allowed(user, ...p.permissions));
  const page = WAREHOUSE_PAGES.find(p => pathname === p.path || pathname.startsWith(p.path + '/'));
  const canView = pathname === '/warehouse' || (!!page && allowed(user, ...page.permissions));
  return <WarehouseUser.Provider value={user}><div className="warehouse-portal">
    <AppShell>
        {canView ? children : <Result status="403" title="Bạn chưa được cấp quyền chức năng này" />}
          {!nav.length && <Alert type="info" title="Vai trò chưa được cấp chức năng đang hỗ trợ trong warehouse. Liên hệ System Admin." />}
    </AppShell>
  </div></WarehouseUser.Provider>;
}

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Menu, Button, message, theme, Result, Spin } from 'antd';
import {
  AppstoreOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  DatabaseOutlined,
  SettingOutlined,
  FileSearchOutlined,
  CloudServerOutlined,
  BarChartOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import { AuthUser, apiFetch, clearSession, getToken, hasPermission, isSystemAdmin, saveSession } from '../lib/api';

const { Header, Sider, Content } = Layout;

// Mỗi mục menu ứng với một trang và (các) quyền được phép vào trang đó.
const NAV = [
  { key: '/', icon: <AppstoreOutlined />, label: 'Tổng quan', perms: ['dashboard:view'] },
  { key: '/reports', icon: <BarChartOutlined />, label: 'Báo cáo tổng hợp', perms: ['report:view'] },
  { key: '/accounts', icon: <TeamOutlined />, label: 'Quản lý Tài khoản', perms: ['account:manage'] },
  { key: '/roles', icon: <SafetyCertificateOutlined />, label: 'Phân quyền & Vai trò', perms: ['role:manage'] },
  { key: '/categories', icon: <DatabaseOutlined />, label: 'Danh mục chung', perms: ['category:manage'] },
  { key: '/settings', icon: <SettingOutlined />, label: 'Cấu hình hệ thống', perms: ['setting:manage'] },
  { key: '/logs', icon: <FileSearchOutlined />, label: 'Nhật ký hệ thống', perms: ['audit:view'] },
  { key: '/backup', icon: <CloudServerOutlined />, label: 'Sao lưu & Phục hồi', perms: ['backup:manage'] },
];

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const { token: { colorBgContainer } } = theme.useToken();

  // Chỉ render trang quản trị sau khi server xác nhận vai trò; không tin quyền trong localStorage.
  useEffect(() => {
    if (!getToken()) {
      router.replace('/login');
      return;
    }
    setReady(false);
    setError(null);
    let cancelled = false;
    (async () => {
      try {
        const res = await apiFetch('/api/auth/me');
        if (!res.ok) throw new Error('Không xác nhận được phiên đăng nhập. Vui lòng đăng nhập lại.');
        const fresh: AuthUser = await res.json();
        const token = getToken();
        if (!cancelled && token) {
          saveSession(token, fresh);
          setUser(fresh);
        }
      } catch {
        if (!cancelled) setError('Không xác nhận được quyền truy cập. Kiểm tra kết nối và thử lại.');
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname, router, retry]);

  const allowedNav = useMemo(
    () => NAV.filter((n) => hasPermission(user, ...n.perms)),
    [user],
  );
  const current = NAV.find((n) => n.key === pathname);
  const canViewPage = !current || hasPermission(user, ...current.perms);

  const handleLogout = async () => {
    // Báo backend đóng phiên (ghi giờ đăng xuất, vô hiệu token). Lỗi mạng cũng không chặn đăng xuất.
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch {
      /* bỏ qua */
    }
    clearSession();
    message.info('Đã đăng xuất hệ thống!');
    router.replace('/login');
  };

  const siderWidth = 240;
  const collapsedWidth = 80;

  if (!ready) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Result status="error" title="Chưa xác nhận được quyền truy cập" subTitle={error}
      extra={<Button onClick={() => setRetry((value) => value + 1)}>Thử lại</Button>} />;
  }

  if (!isSystemAdmin(user)) {
    return <Result status="403" title="Khu vực dành riêng cho System Admin"
      subTitle="Tài khoản của bạn sử dụng ứng dụng theo vai trò được cấp và không được truy cập trang quản trị hệ thống."
      extra={<Button onClick={handleLogout}>Đăng xuất</Button>} />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Button
        type="primary"
        shape="circle"
        icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'fixed',
          top: '50%',
          transform: 'translateY(-50%)',
          left: collapsed ? collapsedWidth - 16 : siderWidth - 16,
          zIndex: 101,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          transition: 'left 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={siderWidth}
        collapsedWidth={collapsedWidth}
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }}
      >
        <div
          style={{
            height: 40,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            transition: 'all 0.2s',
            fontSize: collapsed ? 12 : 16,
          }}
        >
          {!collapsed ? 'ADMIN ROOT' : 'AR'}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={allowedNav.map(({ key, icon, label }) => ({ key, icon, label }))}
          onClick={(e) => router.push(e.key)}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? collapsedWidth : siderWidth, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 99,
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ margin: 0, color: 'black', fontSize: '18px' }}>System Admin Dashboard</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ lineHeight: 1.2, textAlign: 'right' }}>
              <div style={{ fontWeight: 600, color: '#1c1612' }}>{user?.name}</div>
              <div style={{ fontSize: 12, color: '#8a7d70' }}>{user?.role}</div>
            </div>
            <Button type="default" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </Header>

        <Content style={{ margin: '24px', overflow: 'initial' }}>
          {canViewPage ? (
            children
          ) : (
            <Result
              status="403"
              title="Không có quyền truy cập"
              subTitle="Vai trò của bạn không được phép xem trang này. Liên hệ quản trị viên nếu cần."
              extra={
                allowedNav[0] ? (
                  <Button type="primary" onClick={() => router.push(allowedNav[0].key)}>
                    Về trang được phép
                  </Button>
                ) : undefined
              }
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

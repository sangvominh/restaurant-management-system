'use client';
import { Button, Result } from 'antd';
import { apiFetch, clearSession } from '../lib/api';
export default function AccessDenied() {
  return <Result status="403" title="Tài khoản chưa được cấp khu vực này"
    subTitle="Trang đăng nhập System Admin chỉ dành cho quản trị hệ thống. Kho / Nhà hàng, Nhân viên và Khách hàng sử dụng đăng nhập riêng của ứng dụng tương ứng."
    extra={<Button onClick={async () => {
      try { await apiFetch('/api/auth/logout', { method: 'POST' }); } catch { /* allow local logout */ }
      clearSession(); window.location.href = '/login';
    }}>Đăng xuất</Button>} />;
}

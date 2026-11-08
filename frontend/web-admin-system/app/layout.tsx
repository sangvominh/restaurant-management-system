import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './admin.css';
export const metadata: Metadata = {
  title: 'Admin server — MRP Nhà hàng',
  description: 'Quản lý tài khoản, vai trò và người sử dụng',
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="vi"><body>{children}</body></html>;
}

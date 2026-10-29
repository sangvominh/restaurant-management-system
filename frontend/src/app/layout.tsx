import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Restaurant Admin',
  description: 'Hệ thống quản lý nhà hàng',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, fontFamily: 'sans-serif', background: '#f5f5f5' }}>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '32px' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}


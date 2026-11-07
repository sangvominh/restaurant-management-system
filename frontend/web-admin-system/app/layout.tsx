import './globals.css';
import { RestaurantBrandingProvider } from './lib/restaurant-branding';

export const metadata = {
  title: 'Hệ thống Quản lý MRP Nhà hàng',
};

// Layout gốc chỉ có html/body để trang /login không bị bọc sidebar.
// Giao diện quản trị nằm ở app/(admin)/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, padding: 0 }}><RestaurantBrandingProvider>{children}</RestaurantBrandingProvider></body>
    </html>
  );
}

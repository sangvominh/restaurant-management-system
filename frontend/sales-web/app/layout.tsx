import { RestaurantBrandingProvider } from '@/lib/restaurant-branding';
import '@/app/globals.css';
export const metadata = { title: 'Quản lý Bán hàng' };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="vi"><body style={{ margin: 0, fontFamily: 'Arial, Helvetica, sans-serif' }}><RestaurantBrandingProvider>{children}</RestaurantBrandingProvider></body></html>;
}

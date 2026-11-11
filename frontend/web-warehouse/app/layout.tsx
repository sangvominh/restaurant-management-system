import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './warehouse.css';
export const metadata: Metadata = { title: 'Kho & Chế biến' };
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="vi"><body>{children}</body></html>;
}

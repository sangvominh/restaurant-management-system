import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './restaurant.css';
export const metadata: Metadata = { title: 'Bán hàng — Nhà hàng' };
export default function Layout({ children }: { children: ReactNode }) { return <html lang="vi"><body>{children}</body></html>; }

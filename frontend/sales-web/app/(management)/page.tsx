'use client';
import Link from 'next/link';
import { portal } from '@/lib/portal';
import { allowed, useWarehouseUser } from '@/lib/auth';
export default function SalesHome() {
  const user = useWarehouseUser();
  return <section className="panel" style={{ padding: 28 }}>
    <h1>Quản lý Bán hàng</h1>
    <p>Các chức năng hiện có: sản phẩm, công thức BOM và vận hành thành phẩm.</p>
    <p>Quản lý bán hàng đầy đủ (bàn, đơn hàng, thanh toán và báo cáo bán hàng) chưa hoàn thiện trên web này.</p>
    <ul>{portal.pages.filter(page => allowed(user, ...page.permissions)).map(page => <li key={page.path}><Link href={page.path}>{page.label}</Link></li>)}</ul>
  </section>;
}

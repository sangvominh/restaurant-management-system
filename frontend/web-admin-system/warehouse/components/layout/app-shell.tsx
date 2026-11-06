"use client";

import Link from "next/link";
import { allowed, useWarehouseUser, WAREHOUSE_PAGES } from '@/warehouse/auth';
import { apiFetch, clearSession } from '@/warehouse/session';
import { useRestaurantBranding } from '@/app/lib/restaurant-branding';
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  AlertTriangle, Archive, Bell, Boxes, ChartNoAxesCombined, ChevronDown, ChevronLeft,
  ChevronRight, ClipboardList, Factory, FileClock, FileInput, FileOutput, LayoutDashboard,
  LogOut, Menu, PackageCheck, PackageOpen, PanelLeftClose, Search, Settings2, ShieldCheck,
  ShoppingBasket, Soup, Truck, UtensilsCrossed, X,
} from "lucide-react";

const groups = [
  { label: "TỔNG QUAN", items: [{ title: "Dashboard", href: "/", icon: LayoutDashboard }] },
  { label: "QUẢN LÝ KHO", items: [
    { title: "Tồn kho nguyên vật liệu", href: "/inventory", icon: Boxes },
    { title: "Tồn kho thành phẩm", href: "/finished-goods", icon: PackageCheck },
    { title: "Nhập kho", href: "/receipts", icon: FileInput },
    { title: "Duyệt xuất nguyên vật liệu", href: "/material-issues", icon: FileOutput },
    { title: "Duyệt xuất thành phẩm", href: "/finished-issues", icon: PackageOpen },
    { title: "Hao hụt / Hư hỏng", href: "/losses", icon: AlertTriangle },
    { title: "Quản lý món ăn", href: "/products", icon: UtensilsCrossed },
  ] },
  { label: "SẢN XUẤT MRP", items: [
    { title: "Công thức BOM", href: "/bom", icon: Soup },
    { title: "Lệnh sản xuất", href: "/production", icon: Factory },
    { title: "Theo dõi sản xuất", href: "/production-tracking", icon: ChartNoAxesCombined },
  ] },
  { label: "BÁO CÁO", items: [
    { title: "Báo cáo nhập – xuất – tồn", href: "/reports", icon: ChartNoAxesCombined },
    { title: "Lịch sử giao dịch kho", href: "/transactions", icon: FileClock },
  ] },
];

const pageTitles: Record<string, string> = Object.fromEntries(groups.flatMap((g) => g.items.map((item) => [item.href, item.title])));

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname().replace(/^\/warehouse(?=\/|$)/, '') || '/';
  const user = useWarehouseUser();
  const { restaurantName } = useRestaurantBranding();
  const initials = user?.name.split(/\s+/).filter(Boolean).slice(-2).map(word => word[0]).join('').toUpperCase() || '';
  const visibleGroups = groups.map(group => ({ ...group, items: group.items.filter(item => item.href === '/' || WAREHOUSE_PAGES.some(page => page.path === '/warehouse' + item.href && allowed(user, ...page.permissions))) })).filter(group => group.items.length);
  async function logout() {
    try { await apiFetch('/api/auth/logout', { method: 'POST' }); } catch { /* still clear local session */ }
    clearSession(); window.location.href = '/warehouse';
  }
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const title = pageTitles[pathname] ?? (pathname.startsWith("/inventory/") ? "Chi tiết nguyên vật liệu" : "Dashboard");
  return <div className="app-frame">
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""} ${mobileOpen ? "sidebar-mobile-open" : ""}`}>
      <div className="brand-row"><button className="brand-mark" style={{border:0,padding:0}} onClick={() => setCollapsed(false)} aria-label="Mở rộng menu"><ShoppingBasket size={19} strokeWidth={2.4} /></button>{!collapsed && <div className="brand-copy"><strong title={restaurantName} style={{fontSize:restaurantName.length>16?15:23,maxWidth:145,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.2}}>{restaurantName}</strong><span>RESTAURANT GROUP</span></div>}<button className="icon-button collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label="Thu gọn menu"><PanelLeftClose size={17} /></button><button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Đóng menu"><X size={18} /></button></div>
      {!collapsed && <div className="module-label"><span className="module-dot" /> QUẢN LÝ KHO <ChevronDown size={14} /></div>}
      <nav className="side-nav">
        {visibleGroups.map((group) => <div className="nav-group" key={group.label}><div className="nav-group-label">{!collapsed ? group.label : <span className="nav-divider" />}</div>{group.items.map(({ title: itemTitle, href, icon: Icon }) => <Link key={href} href={href === '/' ? '/warehouse' : '/warehouse' + href} title={collapsed ? itemTitle : undefined} onClick={() => setMobileOpen(false)} className={`nav-item ${pathname === href ? "nav-item-active" : ""}`}><Icon size={18} strokeWidth={1.8} /><span>{itemTitle}</span></Link>)}</div>)}
      </nav>
      <div className="sidebar-bottom"><div className="warehouse-card"><div className="warehouse-icon"><Archive size={16} /></div>{!collapsed && <div><strong>Kho / Nhà hàng</strong><span>{user?.role}</span></div>}<ChevronRight className="warehouse-arrow" size={15} /></div><button className="nav-item settings-item" onClick={() => void logout()} title="Đăng xuất"><LogOut size={18} /><span>Đăng xuất</span></button><div className="sidebar-user"><div className="avatar">{initials}</div>{!collapsed && <div className="sidebar-user-copy"><strong>{user?.name}</strong><span>{user?.role}</span></div>}{!collapsed && <ChevronDown size={15} className="user-chevron" />}</div></div>
    </aside>
    {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Đóng menu" />}
    <div className="main-column">
      <header className="topbar"><button className="icon-button mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Mở menu"><Menu size={20} /></button><div className="breadcrumbs"><span>Kho vận</span><ChevronRight size={14} /><strong>{title}</strong></div><div className="topbar-actions"><label className="search-box"><Search size={16} /><input placeholder="Tìm kiếm..." aria-label="Tìm kiếm" /><kbd>⌘ K</kbd></label><div className="top-divider" /><button className="branch-select"><span className="branch-dot" /> Tất cả chi nhánh <ChevronDown size={14} /></button><div className="notification-wrap"><button className="icon-button notification-button" aria-label="Thông báo" onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={18} /><i /></button>{notificationsOpen && <div className="notification-popover"><strong>Thông báo</strong><p>Chưa có thông báo mới.</p></div>}</div><div className="top-avatar">{initials}</div></div></header>
      <main className="page-content">{children}</main>
      <footer className="app-footer"><span>© {new Date().getFullYear()} {restaurantName}</span><span><i className="live-dot" /> Phiên đăng nhập được bảo vệ <span className="footer-separator">·</span> Bản quyền nội bộ</span></footer>
    </div>
  </div>;
}

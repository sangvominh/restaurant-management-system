"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  AlertTriangle, Archive, Bell, Boxes, ChartNoAxesCombined, ChevronDown, ChevronLeft,
  ChevronRight, ClipboardList, Factory, FileClock, FileInput, FileOutput, LayoutDashboard,
  Menu, PackageCheck, PackageOpen, PanelLeftClose, Search, Settings2, ShieldCheck,
  ShoppingBasket, Soup, Truck, X,
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
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const title = pageTitles[pathname] ?? (pathname.startsWith("/inventory/") ? "Chi tiết nguyên vật liệu" : "Dashboard");
  return <div className="app-frame">
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""} ${mobileOpen ? "sidebar-mobile-open" : ""}`}>
      <div className="brand-row"><div className="brand-mark"><ShoppingBasket size={19} strokeWidth={2.4} /></div>{!collapsed && <div className="brand-copy"><strong>mộc</strong><span>RESTAURANT GROUP</span></div>}<button className="icon-button collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label="Thu gọn menu"><PanelLeftClose size={17} /></button><button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Đóng menu"><X size={18} /></button></div>
      {!collapsed && <div className="module-label"><span className="module-dot" /> QUẢN LÝ KHO <ChevronDown size={14} /></div>}
      <nav className="side-nav">
        {groups.map((group) => <div className="nav-group" key={group.label}><div className="nav-group-label">{!collapsed ? group.label : <span className="nav-divider" />}</div>{group.items.map(({ title: itemTitle, href, icon: Icon }) => <Link key={href} href={href} title={collapsed ? itemTitle : undefined} onClick={() => setMobileOpen(false)} className={`nav-item ${pathname === href ? "nav-item-active" : ""}`}><Icon size={18} strokeWidth={1.8} /><span>{itemTitle}</span>{itemTitle === "Duyệt xuất nguyên vật liệu" && !collapsed && <span className="nav-count">2</span>}</Link>)}</div>)}
      </nav>
      <div className="sidebar-bottom"><div className="warehouse-card"><div className="warehouse-icon"><Archive size={16} /></div>{!collapsed && <div><strong>Kho trung tâm</strong><span>Quận 1, TP. Hồ Chí Minh</span></div>}<ChevronRight className="warehouse-arrow" size={15} /></div><button className="nav-item settings-item"><Settings2 size={18} /><span>Cài đặt hệ thống</span></button><div className="sidebar-user"><div className="avatar">HN</div>{!collapsed && <div className="sidebar-user-copy"><strong>Hoàng Nam</strong><span>Quản lý kho</span></div>}{!collapsed && <ChevronDown size={15} className="user-chevron" />}</div></div>
    </aside>
    {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Đóng menu" />}
    <div className="main-column">
      <header className="topbar"><button className="icon-button mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Mở menu"><Menu size={20} /></button><div className="breadcrumbs"><span>Kho vận</span><ChevronRight size={14} /><strong>{title}</strong></div><div className="topbar-actions"><label className="search-box"><Search size={16} /><input placeholder="Tìm kiếm..." aria-label="Tìm kiếm" /><kbd>⌘ K</kbd></label><div className="top-divider" /><button className="branch-select"><span className="branch-dot" /> Tất cả chi nhánh <ChevronDown size={14} /></button><div className="notification-wrap"><button className="icon-button notification-button" aria-label="Thông báo" onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={18} /><i /></button>{notificationsOpen && <div className="notification-popover"><strong>Thông báo</strong><p><span className="notice-dot red" /> 3 nguyên vật liệu sắp dưới định mức</p><p><span className="notice-dot amber" /> 2 phiếu xuất đang chờ duyệt</p><small>Vừa cập nhật</small></div>}</div><div className="top-avatar">HN</div></div></header>
      <main className="page-content">{children}</main>
      <footer className="app-footer"><span>© 2026 Mộc Restaurant Group</span><span><i className="live-dot" /> Dữ liệu mô phỏng <span className="footer-separator">·</span> Bản quyền nội bộ</span></footer>
    </div>
  </div>;
}

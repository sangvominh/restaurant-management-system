"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  Archive,
  Bell,
  Boxes,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileClock,
  FileInput,
  FileOutput,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  Search,
  ShieldCheck,
  ShoppingBasket,
  Truck,
  X,
} from "lucide-react";


import { getInventory, getInventoryAlerts } from "@/services/inventory.service";
import type { InventoryItem } from "@/types/inventory";

function WarehouseToolbar() {
  const [query, setQuery] = useState("");
  const [materials, setMaterials] = useState<InventoryItem[] | null>(null);
  const [alerts, setAlerts] = useState<InventoryItem[] | null>(null);
  const [open, setOpen] = useState<"search" | "alerts" | null>(null);
  const [loading, setLoading] = useState<"search" | "alerts" | null>(null);
  const [error, setError] = useState("");
  const busy = useRef(false);
  async function load(kind: "search" | "alerts") {
    if (busy.current) return;
    setOpen(kind);
    setError("");
    if (kind === "search" && materials !== null) return;
    busy.current = true;
    setLoading(kind);
    try {
      if (kind === "search") setMaterials(await getInventory());
      else setAlerts(await getInventoryAlerts());
    } catch (cause) {
      if (kind === "alerts") setAlerts(null);
      setError(cause instanceof Error ? cause.message : "Không thể tải dữ liệu.");
    } finally { setLoading(null); busy.current = false; }
  }
  const quantity = (value: number) => new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 20 }).format(value);
  const results = (materials ?? []).filter(item => [item.code, item.name].some(value => value.toLocaleLowerCase("vi").includes(query.trim().toLocaleLowerCase("vi"))));
  return <div className="topbar-actions warehouse-tools" onKeyDown={event => { if (event.key === "Escape") setOpen(null); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}>
    <div className="toolbar-lookup">
      <label className="search-box"><Search size={16}/><input disabled={loading === "alerts"} aria-label="Tra cứu nguyên vật liệu" placeholder="Tra cứu nguyên vật liệu" value={query} onFocus={() => void load("search")} onChange={event => { setQuery(event.target.value); setOpen("search"); }}/></label>
      {open === "search" && <div className="notification-popover toolbar-results">
        <strong>Kết quả nguyên vật liệu</strong>
        {loading === "search" ? <p role="status">Đang tải…</p> : error ? <><p className="form-error" role="alert">{error}</p><button className="button button-secondary" onClick={() => void load("search")}>Thử lại</button></> : results.length === 0 ? <p>Không tìm thấy nguyên vật liệu.</p> : <><span>{results.length} kết quả</span>{results.slice(0, 10).map(item => <Link key={item.code} href={"/inventory/" + encodeURIComponent(item.code)} onClick={() => setOpen(null)}><strong>{item.code} · {item.name}</strong><small>Khả dụng: {quantity(item.availableStock)} {item.unit}</small></Link>)}{results.length > 10 && <small>Nhập thêm ký tự để thu hẹp kết quả.</small>}</>}
      </div>}
    </div>
    <div className="top-divider"/>
    <div className="notification-wrap">
      <button className="icon-button notification-button" disabled={loading === "search"} aria-label="Thông báo tồn thấp" aria-expanded={open === "alerts"} onClick={() => { if (open === "alerts") setOpen(null); else void load("alerts"); }}><Bell size={18}/></button>
      {open === "alerts" && <div className="notification-popover toolbar-results">
        <strong>Cảnh báo tồn thấp{alerts !== null && !loading && !error ? " (" + alerts.length + ")" : ""}</strong>
        {loading === "alerts" ? <p role="status">Đang tải cảnh báo…</p> : error ? <><p className="form-error" role="alert">{error}</p><button className="button button-secondary" onClick={() => void load("alerts")}>Thử lại</button></> : alerts?.length === 0 ? <p>Không có cảnh báo tồn thấp.</p> : alerts?.map(item => <Link key={item.code} href={"/inventory/" + encodeURIComponent(item.code)} onClick={() => setOpen(null)}><strong>{item.code} · {item.name}</strong><small>Khả dụng: {quantity(item.availableStock)} / tối thiểu: {quantity(item.minStock)} {item.unit}</small></Link>)}
      </div>}
    </div>
    <div className="top-avatar">AK</div>
  </div>;
}

const groups = [
  {
    label: "TỔNG QUAN",
    items: [{ title: "Dashboard", href: "/", icon: LayoutDashboard }],
  },
  {
    label: "ADMIN KHO",
    items: [
      { title: "Tồn kho nguyên vật liệu", href: "/inventory", icon: Boxes },
      { title: "Nhà cung cấp", href: "/suppliers", icon: Truck },
      {
        title: "Danh mục & nguyên vật liệu",
        href: "/materials",
        icon: Archive,
      },
      { title: "Nhập kho NVL", href: "/receipts", icon: FileInput },
      {
        title: "Duyệt xuất nguyên vật liệu",
        href: "/material-issues",
        icon: FileOutput,
      },
      { title: "Hao hụt / Hư hỏng NVL", href: "/losses", icon: AlertTriangle },
      { title: "Hoàn trả NVL", href: "/returns", icon: FileInput },
      {
        title: "Báo cáo tồn kho",
        href: "/reports",
        icon: ChartNoAxesCombined,
      },
      {
        title: "Lịch sử giao dịch kho",
        href: "/transactions",
        icon: FileClock,
      },
    ],
  },
];

const pageTitles: Record<string, string> = Object.fromEntries(
  groups.flatMap((g) => g.items.map((item) => [item.href, item.title])),
);

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeGroup = groups.find((group) =>
    group.items.some(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    ),
  );
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const title =
    pageTitles[pathname] ??
    (pathname.startsWith("/inventory/")
      ? "Chi tiết nguyên vật liệu"
      : "Dashboard");
  return (
    <div className="app-frame">
      <aside
        className={`sidebar ${collapsed ? "sidebar-collapsed" : ""} ${mobileOpen ? "sidebar-mobile-open" : ""}`}
      >
        <div className="brand-row">
          <div className="brand-mark">
            <ShoppingBasket size={19} strokeWidth={2.4} />
          </div>
          {!collapsed && (
            <div className="brand-copy">
              <strong>mộc</strong>
              <span>RESTAURANT GROUP</span>
            </div>
          )}
          <button
            className="icon-button collapse-button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Thu gọn menu"
          >
            <PanelLeftClose size={17} />
          </button>
          <button
            className="icon-button mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Đóng menu"
          >
            <X size={18} />
          </button>
        </div>
        {!collapsed && (
          <div className="module-label">
            <span className="module-dot" /> ADMIN KHO
          </div>
        )}
        <nav className="side-nav">
          {groups.map((group) => (
            <div className="nav-group" key={group.label}>
              <div className="nav-group-label">
                {!collapsed ? group.label : <span className="nav-divider" />}
              </div>
              {group.items.map(({ title: itemTitle, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  title={collapsed ? `${group.label} · ${itemTitle}` : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-item ${pathname === href ? "nav-item-active" : ""}`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{itemTitle}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="warehouse-card">
            <div className="warehouse-icon">
              <Archive size={16} />
            </div>
            {!collapsed && (
              <div>
                <strong>Phân hệ Admin Kho</strong>
                <span>Quản lý nguyên vật liệu</span>
              </div>
            )}
            <ChevronRight className="warehouse-arrow" size={15} />
          </div>
          <div className="sidebar-user">
            <div className="avatar">AK</div>
            {!collapsed && (
              <div className="sidebar-user-copy">
                <strong>Admin Kho</strong>
                <span>Quản lý kho</span>
              </div>
            )}
            {!collapsed && <ChevronDown size={15} className="user-chevron" />}
          </div>
        </div>
      </aside>
      {mobileOpen && (
        <button
          className="mobile-scrim"
          onClick={() => setMobileOpen(false)}
          aria-label="Đóng menu"
        />
      )}
      <div className="main-column">
        <header className="topbar">
          <button
            className="icon-button mobile-menu-button"
            onClick={() => setMobileOpen(true)}
            aria-label="Mở menu"
          >
            <Menu size={20} />
          </button>
          <div className="breadcrumbs">
            <span>{activeGroup?.label ?? "TỔNG QUAN"}</span>
            <ChevronRight size={14} />
            <strong>{title}</strong>
          </div>
          <WarehouseToolbar/>
        </header>
        <main className="page-content">{children}</main>
        <footer className="app-footer">
          <span>© 2026 Mộc Restaurant Group</span>
          <span>
            <i className="live-dot" />{" "}
            Nguồn dữ liệu: Backend{" "}
            <span className="footer-separator">·</span> Bản quyền nội bộ
          </span>
        </footer>
      </div>
    </div>
  );
}

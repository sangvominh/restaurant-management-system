"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { brand } from "@/config/brand";
import { Icon } from "@/components/staff/ui";
import { screens } from "./data";
import { route } from "./shared";
import {
  Dashboard,
  Tables,
  Ordering,
  Kitchen,
  Payment,
  Shift,
  OrderDetail,
  Login,
} from "./screens";
import { Transfer, Split, Cancel } from "./extra-screens";
export default function PreviewApp({ screen }: { screen: string }) {
  const router = useRouter();
  const [notice, setNotice] = useState(false);
  const current = screens.find((s) => s.id === screen) || screens[1];
  const inform = () => setNotice(true);
  const views: Record<string, React.ReactNode> = {
    login: <Login inform={inform} />,
    dashboard: <Dashboard />,
    tables: <Tables inform={inform} />,
    order: <Ordering inform={inform} />,
    kitchen: <Kitchen inform={inform} />,
    payment: <Payment inform={inform} />,
    shift: <Shift inform={inform} />,
    "order-detail": <OrderDetail inform={inform} />,
    transfer: <Transfer inform={inform} />,
    split: <Split inform={inform} />,
    cancel: <Cancel inform={inform} />,
  };
  const nav = screens.filter((s) =>
    ["dashboard", "tables", "order", "kitchen", "shift"].includes(s.id),
  );
  return (
    <div className={`preview-app ${screen === "login" ? "is-login" : ""}`}>
      <aside className="preview-sidebar">
        <Link href={route("dashboard")} className="sidebar-brand">
          <span className="brand-icon">
            <Icon name="restaurant" />
          </span>
          <span>
            <strong>{brand.name}</strong>
            <small>STAFF OPERATIONS</small>
          </span>
        </Link>
        <p className="sidebar-caption">KHÔNG GIAN LÀM VIỆC</p>
        <nav aria-label="Tất cả màn hình">
          {screens
            .filter((s) => s.id !== "login")
            .map((s) => (
              <Link
                href={route(s.id)}
                key={s.id}
                className={current.id === s.id ? "active" : ""}
              >
                <Icon name={s.icon} />
                {s.short}
                {["transfer", "split", "cancel"].includes(s.id) && (
                  <span className="nav-dot" />
                )}
              </Link>
            ))}
        </nav>
        <div className="sidebar-bottom">
          <span className="preview-tag">UI PREVIEW</span>
          <p>
            Ocean Blue Ops
            <br />
            <span className="muted">11 màn hình · Mobile-first</span>
          </p>
          <Link href={route("login")}>
            <Icon name="logout" />
            Màn hình đăng nhập
          </Link>
        </div>
      </aside>
      <div className="preview-workspace">
        <div className="preview-banner">
          <span>
            <span className="preview-dot" />
            Bản xem trước{" "}
            <span className="banner-detail">
              · Dữ liệu mẫu, chưa ghi nhận nghiệp vụ
            </span>
          </span>
          <select
            aria-label="Chọn màn hình xem trước"
            value={current.id}
            onChange={(e) => router.push(route(e.target.value))}
          >
            {screens.map((s, i) => (
              <option key={s.id} value={s.id}>
                {String(i + 1).padStart(2, "0")}. {s.label}
              </option>
            ))}
          </select>
        </div>
        {screen !== "login" && (
          <header className="preview-header">
            <div className="mobile-brand brand-icon">
              <Icon name="restaurant" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="mobile-brand-text">{brand.name} · CN1</span>
                <span className="desktop-breadcrumb">
                  Không gian nhân viên <Icon name="chevron_right" />
                </span>
                <span className="role-badge">Phục vụ</span>
              </div>
              <h1>{current.short}</h1>
            </div>
            <div className="header-date">
              <Icon name="calendar_today" />
              Thứ Hai, 26 tháng 10
            </div>
            <button
              className="notification-button"
              aria-label="Xem thông báo mẫu"
              onClick={inform}
            >
              <Icon name="notifications" />
              <span>3</span>
            </button>
            <Link
              href={route("shift")}
              aria-label="Tài khoản mẫu Nguyễn Văn Tuấn"
              className="avatar"
            >
              T
            </Link>
          </header>
        )}
        <main
          className={`preview-main ${screen === "order" ? "has-mobile-cart" : ""}`}
          key={current.id}
        >
          {views[current.id]}
        </main>
        {screen !== "login" && (
          <nav className="bottom-nav" aria-label="Điều hướng chính">
            {nav.map((s) => (
              <Link
                href={route(s.id)}
                key={s.id}
                className={current.id === s.id ? "nav-active" : ""}
              >
                <Icon name={s.icon} />
                <span>{s.short}</span>
              </Link>
            ))}
          </nav>
        )}
        <footer className="preview-footer">
          <span>{brand.name} · Ocean Blue Ops</span>
          <span>Giao diện tham khảo từ Google Stitch · Dữ liệu minh họa</span>
        </footer>
      </div>
      {notice && (
        <div className="preview-toast" role="status">
          <span className="toast-icon">
            <Icon name="info" />
          </span>
          <div>
            <strong>Thao tác chỉ để xem trước</strong>
            <p>
              Chưa kết nối nghiệp vụ. Không có đơn, thanh toán, phê duyệt hoặc
              dữ liệu thực tế nào được ghi nhận.
            </p>
          </div>
          <button
            aria-label="Đóng thông báo"
            className="icon-button"
            onClick={() => setNotice(false)}
          >
            <Icon name="close" />
          </button>
        </div>
      )}
    </div>
  );
}

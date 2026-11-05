"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { api, ApiError, roles, type User } from "@/lib/api";
import { brand } from "@/config/brand";
import { Button, Icon, Notice, Toast } from "./ui";
const Context = createContext<{
  user: User;
  revision: number;
  refresh: () => void;
  previousPath: string | null;
} | null>(null);
export function useStaff() {
  const context = useContext(Context);
  if (!context) throw new Error("Missing staff context");
  return context;
}
export function useResource<T>(path: string) {
  const [state, setState] = useState<{ data?: T; error?: ApiError }>({});
  const [revision, setRevision] = useState(0);
  const sharedRevision = useContext(Context)?.revision;
  useEffect(() => {
    let active = true;
    api<T>(path)
      .then((data) => {
        if (active) setState({ data });
      })
      .catch((error) => {
        if (active)
          setState({
            error:
              error instanceof ApiError
                ? error
                : new ApiError(
                    0,
                    "Không thể kết nối máy chủ. Kiểm tra backend và mạng.",
                  ),
          });
      });
    return () => {
      active = false;
    };
  }, [path, revision, sharedRevision]);
  const reload = useCallback(() => setRevision((r) => r + 1), []);
  return { ...state, reload };
}
export function useAction() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { refresh } = useStaff();
  useEffect(() => { if (!message && !error) return; const timer = setTimeout(() => { setMessage(""); setError(""); }, 5000); return () => clearTimeout(timer); }, [message, error]);
  const run = async (work: () => Promise<unknown>, success: string) => {
    if (busy) return false;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await work();
      setMessage(success);
      refresh();
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể xử lý.");
      return false;
    } finally {
      setBusy(false);
    }
  };
  return {
    busy,
    run,
    feedback: (
      <>
        {error && <Toast key={error} error>{error}</Toast>}
        {message && <Toast key={message}>{message}</Toast>}
      </>
    ),
  };
}
export function ResourceState({
  error,
  loading,
  retry,
}: {
  error?: ApiError;
  loading: boolean;
  retry: () => void;
}) {
  if (error)
    return (
      <Notice error>
        {error.message}{" "}
        {error.status === 401 ? (
          <Link href="/staff/login" className="underline">
            Đăng nhập lại
          </Link>
        ) : (
          <button className="underline ml-2" onClick={retry}>
            Thử lại
          </button>
        )}
      </Notice>
    );
  return loading ? (
    <p role="status" className="muted py-8 text-center">
      Đang tải dữ liệu…
    </p>
  ) : null;
}
const nav = [
  ["home", "Trang chủ", "/staff"],
  ["grid_view", "Sơ đồ bàn", "/staff/tables"],
  ["restaurant_menu", "Gọi món", "/staff/orders/new"],
  ["skillet", "Bếp KDS", "/staff/kitchen"],
  ["warehouse", "Nguyên vật liệu", "/staff/materials"],
  ["outbox", "Thành phẩm", "/staff/finished-issues"],
  ["schedule", "Ca làm", "/staff/shifts"],
];
function isStaffNavActive(path: string, href: string) {
  if (href === "/staff") return path === href;
  if (href === "/staff/finished-issues") return ["/staff/finished-issues", "/staff/finished-defects", "/staff/finished-goods"].some(p => path === p || path.startsWith(`${p}/`));
  if (href === "/staff/kitchen") return path === "/staff/kitchen" || path.startsWith("/staff/kitchen/") || path === "/staff/production" || path.startsWith("/staff/production/");
  if (href === "/staff/materials") return ["/staff/materials", "/staff/inventory", "/staff/kitchen-inventory", "/staff/material-issues", "/staff/material-waste", "/staff/material-returns", "/staff/reports", "/staff/processing-defects"].some(p => path === p || path.startsWith(`${p}/`));
  return path === href || path.startsWith(`${href}/`);
}
export function StaffShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const lastPath = useRef<string | null>(null);
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  useEffect(() => { if (lastPath.current !== path) { setPreviousPath(lastPath.current); lastPath.current = path; } }, [path]);
  const isLogin = path === "/staff/login";
  const session = useResource<User>("auth/me");
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => setRevision((r) => r + 1), []);
  useEffect(() => {
    if (!isLogin && session.error?.status === 401)
      router.replace("/staff/login");
  }, [isLogin, session.error, router]);
  if (isLogin) return children;
  if (!session.data)
    return (
      <main className="max-w-lg mx-auto p-6">
        <ResourceState
          error={session.error}
          loading={!session.error}
          retry={session.reload}
        />
      </main>
    );
  const user = session.data;
  const visibleNav = user.role === "CASHIER" ? [["home", "Trang chủ", "/staff"], ["receipt_long", "Hóa đơn", "/staff/invoices"], ["schedule", "Ca làm", "/staff/shifts"]] : nav;
  return (
    <Context.Provider value={{ user, revision, refresh, previousPath }}>
      <div className="staff-app">
        <header className="staff-header">
          <Link href="/staff" aria-label="Trang chủ" className="brand-icon staff-header-brand">
            <Icon name="restaurant" />
          </Link>
          <div className="min-w-0 flex-1 staff-header-brand">
            <div className="flex flex-wrap items-center gap-2">
              <strong>{brand.name}</strong>
              <BadgeRole role={user.role} />
            </div>
            <p className="muted text-xs truncate">{user.branch.name}</p>
          </div>
          <button
            aria-label="Tải lại dữ liệu"
            className="icon-button"
            onClick={refresh}
          >
            <Icon name="sync" />
          </button>
          <details className="staff-account">
            <summary className="avatar" aria-label="Tài khoản nhân viên">{user.name.charAt(0)}</summary>
            <div className="staff-account-menu">
              <strong>{user.name}</strong>
              <Button secondary onClick={async () => { await api("auth/logout", "POST"); window.location.assign("/staff/login"); }}>Đăng xuất</Button>
            </div>
          </details>
        </header>
        <aside className="staff-sidebar">
          <Link href="/staff" className="staff-sidebar-brand">
            <span className="brand-icon"><Icon name="restaurant" /></span>
            <span className="staff-sidebar-brand-copy"><span className="staff-sidebar-brand-heading"><strong>{brand.name}</strong><BadgeRole role={user.role} /></span><small>{user.branch.name}</small></span>
          </Link>
          <p className="staff-sidebar-title">ĐIỀU HƯỚNG</p>{visibleNav.map(([icon, label, href]) => <Link key={href} href={href} className={isStaffNavActive(path, href) ? "staff-side-link active" : "staff-side-link"}><Icon name={icon}/><span>{label}</span></Link>)}</aside><main className="staff-main">{children}</main>
        <nav className="bottom-nav" aria-label="Điều hướng nhân viên">
          {visibleNav.map(([icon, label, href]) => (
            <Link
              key={href}
              href={href}
              className={
                isStaffNavActive(path, href)
                  ? "nav-active"
                  : ""
              }
            >
              <Icon name={icon} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </Context.Provider>
  );
}

export function BackLink({ href }: { href: string }) {
  const context = useContext(Context);
  const router = useRouter();
  return <button type="button" className="staff-back" onClick={() => context?.previousPath?.startsWith('/staff') && context.previousPath !== '/staff/login' ? router.back() : router.push(href)}>← Quay lại</button>;
}
function BadgeRole({ role }: { role: User["role"] }) {
  return <span className="role-badge">{roles[role]}</span>;
}

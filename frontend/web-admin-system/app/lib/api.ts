/**
 * Điểm gọi API duy nhất của web admin: tự gắn JWT, tự đưa về /login khi hết phiên,
 * và gom cách đọc thông báo lỗi của server (kể cả lỗi kiểm tra dữ liệu dạng mảng).
 *
 * Lưu ý bảo mật: token lưu ở localStorage nên script chèn vào trang (XSS) đọc được.
 * Chấp nhận được cho đồ án; bản thật nên dùng cookie httpOnly.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export type SessionScope = 'system-admin' | 'warehouse';
const SESSION_KEYS = {
  'system-admin': { token: 'system_admin_access_token', user: 'system_admin_auth_user' },
  warehouse: { token: 'warehouse_access_token', user: 'warehouse_auth_user' },
} as const;

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  isSystemAdmin: boolean;
  portal?: string;
}

export function isSystemAdmin(user: AuthUser | null): boolean {
  return user?.isSystemAdmin === true && user.permissions.includes('*');
}

export function getToken(scope: SessionScope = 'system-admin'): string | null {
  try {
    return localStorage.getItem(SESSION_KEYS[scope].token);
  } catch {
    return null;
  }
}

export function getUser(scope: SessionScope = 'system-admin'): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEYS[scope].user);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function saveSession(token: string, user: AuthUser, scope: SessionScope = 'system-admin') {
  try {
    localStorage.setItem(SESSION_KEYS[scope].token, token);
    localStorage.setItem(SESSION_KEYS[scope].user, JSON.stringify(user));
  } catch {
    /* trình duyệt chặn lưu trữ: phiên sẽ mất khi tải lại trang */
  }
}

export function clearSession(scope: SessionScope = 'system-admin') {
  try {
    localStorage.removeItem(SESSION_KEYS[scope].token);
    localStorage.removeItem(SESSION_KEYS[scope].user);
  } catch {
    /* bỏ qua */
  }
}

/** Admin có '*' (toàn quyền); người khác cần ít nhất một quyền trong danh sách. */
export function hasPermission(user: AuthUser | null, ...required: string[]): boolean {
  if (!user) return false;
  if (isSystemAdmin(user)) return true;
  return required.some((p) => user.permissions.includes(p));
}

export async function apiFetch(path: string, init: RequestInit = {}, scope: SessionScope = 'system-admin'): Promise<Response> {
  const headers = new Headers(init.headers);
  const token = getToken(scope);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });

  // Mỗi khu vực chỉ xóa phiên của chính nó; Warehouse không dùng login System Admin.
  const isLogin = path === '/api/auth/login' || path === '/api/auth/system-admin/login';
  if (res.status === 401 && typeof window !== 'undefined' && !isLogin) {
    clearSession(scope);
    window.location.href = scope === 'warehouse' ? '/warehouse' : '/login';
  }
  return res;
}

/** Lấy thông báo lỗi từ response của NestJS (string hoặc mảng), không có thì dùng `fallback`. */
export async function readError(res: Response, fallback: string): Promise<string> {
  try {
    const body = await res.json();
    const m = body?.message;
    if (Array.isArray(m) && m.length) return m.join('; ');
    if (typeof m === 'string' && m) return m;
  } catch {
    /* body không phải JSON */
  }
  return fallback;
}

/**
 * Điểm gọi API duy nhất của web admin: tự gắn JWT, tự đưa về /login khi hết phiên,
 * và gom cách đọc thông báo lỗi của server (kể cả lỗi kiểm tra dữ liệu dạng mảng).
 *
 * Lưu ý bảo mật: token lưu ở localStorage nên script chèn vào trang (XSS) đọc được.
 * Chấp nhận được cho đồ án; bản thật nên dùng cookie httpOnly.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const SESSION_KEYS = { token: 'account_access_token', user: 'account_auth_user' };

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

export function getToken(): string | null {
  try {
    return localStorage.getItem(SESSION_KEYS.token);
  } catch {
    return null;
  }
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEYS.user);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function saveSession(token: string, user: AuthUser) {
  try {
    localStorage.setItem(SESSION_KEYS.token, token);
    localStorage.setItem(SESSION_KEYS.user, JSON.stringify(user));
  } catch {
    /* trình duyệt chặn lưu trữ: phiên sẽ mất khi tải lại trang */
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEYS.token);
    localStorage.removeItem(SESSION_KEYS.user);
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

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });

  // Một phiên tài khoản dùng chung cho các khu vực quản trị.
  const isLogin = path === '/api/auth/login' || path === '/api/auth/system-admin/login';
  if (res.status === 401 && typeof window !== 'undefined' && !isLogin) {
    clearSession();
    window.location.href = '/login';
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

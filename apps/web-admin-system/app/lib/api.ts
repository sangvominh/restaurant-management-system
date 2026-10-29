/**
 * Điểm gọi API duy nhất của web admin: tự gắn JWT, tự đưa về /login khi hết phiên,
 * và gom cách đọc thông báo lỗi của server (kể cả lỗi kiểm tra dữ liệu dạng mảng).
 *
 * Lưu ý bảo mật: token lưu ở localStorage nên script chèn vào trang (XSS) đọc được.
 * Chấp nhận được cho đồ án; bản thật nên dùng cookie httpOnly.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'auth_user';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function saveSession(token: string, user: AuthUser) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    /* trình duyệt chặn lưu trữ: phiên sẽ mất khi tải lại trang */
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('isAuthenticated'); // khóa cũ của bản trước
  } catch {
    /* bỏ qua */
  }
}

/** Admin có '*' (toàn quyền); người khác cần ít nhất một quyền trong danh sách. */
export function hasPermission(user: AuthUser | null, ...required: string[]): boolean {
  if (!user) return false;
  if (user.permissions.includes('*')) return true;
  return required.some((p) => user.permissions.includes(p));
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });

  // 401 ở bất kỳ API nào (trừ chính trang đăng nhập) = hết phiên / bị khóa -> về /login.
  if (res.status === 401 && typeof window !== 'undefined' && !path.startsWith('/api/auth/login')) {
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

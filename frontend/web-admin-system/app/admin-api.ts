export type Section = 'accounts' | 'roles' | 'employees';
export interface Entry {
  id: string; username?: string; name?: string; code?: string;
  roleId?: string; status?: string; description?: string | null;
  email?: string | null; phone?: string | null; accountId?: string | null;
  role?: { id: string; name: string };
  employee?: { id: string; code: string; name: string } | null;
  permissions?: { permission: { code: string; name: string } }[];
  _count?: { accounts: number };
}
export interface Permission { code: string; name: string; group: string }
export interface AdminUser { id: string; username: string; name: string }
export const TOKEN_KEY = 'restaurant_admin_session';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${API_URL}/api/admin/${path}`, {
    method, cache: 'no-store',
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body === undefined ? {} : { 'Content-Type': 'application/json' }) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({ message: 'Máy chủ trả về phản hồi không hợp lệ' }));
  if (response.status === 401 && path !== 'auth/login') {
    sessionStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event('admin-session-ended'));
  }
  if (!response.ok) throw new Error(Array.isArray(result.message) ? result.message.join('; ') : result.message || 'Thao tác thất bại');
  return result as T;
}

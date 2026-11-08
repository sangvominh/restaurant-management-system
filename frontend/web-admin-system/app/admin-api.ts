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
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(`${API_URL}/api/admin/${path}`, {
    method, cache: 'no-store',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(Array.isArray(result.message) ? result.message.join('; ') : result.message || 'Thao tác thất bại');
  return result as T;
}

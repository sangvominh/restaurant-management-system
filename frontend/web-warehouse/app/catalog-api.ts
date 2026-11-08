export type Kind = 'units' | 'categories' | 'materials' | 'suppliers' | 'products';
export interface CatalogItem {
  id: string; name: string; code?: string; symbol?: string; objectType?: string;
  unitId?: string; categoryId?: string; unit?: { name: string; symbol: string }; category?: { name: string };
  minStock?: string; sellingPrice?: string; status?: string; phone?: string | null; address?: string | null;
  currentBom?: { id: string; version: number; outputQuantity: string; effectiveAt: string; lines: { id: string; quantity: string; material: { name: string; status: string; unit: { symbol: string } } }[] } | null;
}
export interface User { id: string; username: string; name: string; permissions: string[] }
export const TOKEN_KEY = 'warehouse_session';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${API_URL}/api/warehouse/${path}`, {
    method, cache: 'no-store',
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body === undefined ? {} : { 'Content-Type': 'application/json' }) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({ message: 'Phản hồi từ backend không hợp lệ' }));
  if (response.status === 401 && path !== 'auth/login') {
    sessionStorage.removeItem(TOKEN_KEY); window.dispatchEvent(new Event('warehouse-session-ended'));
  }
  if (!response.ok) throw new Error(Array.isArray(result.message) ? result.message.join('; ') : result.message || 'Thao tác thất bại');
  return result as T;
}
export function can(user: User, ...rights: string[]) { return user.permissions.includes('*') || rights.some(code => user.permissions.includes(code)); }
export const readRights: Record<Kind, string[]> = {
  units: ['catalog:manage', 'inventory:view', 'product:manage', 'production:perform'],
  categories: ['catalog:manage', 'inventory:view', 'product:manage', 'production:perform'],
  materials: ['catalog:manage', 'inventory:view', 'production:perform'],
  suppliers: ['catalog:manage', 'receipt:create'],
  products: ['catalog:manage', 'inventory:view', 'product:manage', 'production:perform', 'sale:view'],
};

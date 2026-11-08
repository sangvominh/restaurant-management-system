export type User = { id: string; username: string; name: string; permissions: string[] };
export type Product = { id: string; code: string; name: string; sellingPrice: string; stock: string; unit: { symbol: string }; category: { name: string } };
export type SaleLine = { id: string; productId: string; productName: string; quantity: string; unitPrice: string; product: { unit: { symbol: string } } };
export type ExportDoc = { id: string; status: string; requestedAt: string; reason: string; requestedBy: { name: string }; reviewedBy: { name: string } | null; lines: { id: string; saleLineId: string; requestedQuantity: string; exportedQuantity: string | null }[] };
export type Sale = { id: string; code: string; status: string; createdAt: string; total: string; createdBy: { name: string }; lines: SaleLine[]; exports: ExportDoc[]; payment: { amount: string; method: string; status: string; paidAt: string } | null };
export const TOKEN = 'restaurant_session';
export const can = (u: User, ...rights: string[]) => u.permissions.includes('*') || rights.some(p => u.permissions.includes(p));
export const fmt = (v: string | number) => Number(v).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
export const money = (v: string | number) => Number(v).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 2 });
export const statuses: Record<string, string> = { DRAFT: 'Nháp', CONFIRMED: 'Đã xác nhận', COMPLETED: 'Đã thanh toán', CANCELLED: 'Đã hủy', PENDING: 'Chờ kho duyệt', APPROVED: 'Đã xuất', REJECTED: 'Từ chối' };
export function dispatched(sale: Sale, lineId: string, reserve = false) { return sale.exports.reduce((n, e) => n + e.lines.filter(l => l.saleLineId === lineId).reduce((s, l) => s + (e.status === 'APPROVED' ? Number(l.exportedQuantity || 0) : reserve && e.status === 'PENDING' ? Number(l.requestedQuantity) : 0), 0), 0); }
export async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const token = sessionStorage.getItem(TOKEN);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/restaurant/${path}`, { method, cache: 'no-store', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body === undefined ? {} : { 'Content-Type': 'application/json' }) }, body: body === undefined ? undefined : JSON.stringify(body) });
  const result = await response.json().catch(() => ({ message: 'Phản hồi không hợp lệ' }));
  if (response.status === 401 && path !== 'auth/login') { sessionStorage.removeItem(TOKEN); window.dispatchEvent(new Event('restaurant-session-ended')); }
  if (!response.ok) throw new Error(Array.isArray(result.message) ? result.message.join('; ') : result.message || 'Thao tác thất bại');
  return result as T;
}

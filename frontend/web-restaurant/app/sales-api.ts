export type User = { id: string; username: string; name: string; roleName?: string; permissions: string[] };
export type Product = { available: string; allocations: { lots?: { lotId: string; code: string; expiryDate: string; quantity: string }[]; lineId: string; ready: string; missing: string; pending: string }[]; id: string; code: string; name: string; sellingPrice: string; stock: string; unit: { symbol: string }; category: { name: string } };
export type DiningTable = { x: number; y: number; id: string; name: string; area: string; status: string };
export type SaleLine = { lotMovements?: { id: string; quantity: string; lot: { code: string; expiryDate: string } }[]; changes: { id: string; changedAt: string; previousQuantity: string; quantity: string; reason: string; replacementLineId: string | null; changedBy: { name: string } }[]; replenishments: { id: string; quantity: string; status: string; note: string; productionOrder: { id: string; status: string; dueAt: string | null; assignedTo: { name: string }; assignedBy: { name: string }; runs: { status: string; actualQuantity: string; acceptedQuantity: string | null }[] } | null }[]; note: string; sentAt: string | null; batch: number | null; id: string; productId: string; productName: string; quantity: string; unitPrice: string; product: { unit: { symbol: string } } };
export type ExportDoc = { id: string; status: string; requestedAt: string; reason: string; requestedBy: { name: string }; reviewedBy: { name: string } | null; lines: { id: string; saleLineId: string; requestedQuantity: string; exportedQuantity: string | null }[] };
export type Sale = { closedAt: string | null; version: number; tableId: string | null; table: DiningTable | null; id: string; code: string; status: string; createdAt: string; total: string; createdBy: { id: string; name: string }; lines: SaleLine[]; exports: ExportDoc[]; payment: { amount: string; method: string; status: string; paidAt: string } | null };
export const TOKEN = 'restaurant_session';
export const can = (u: User, ...rights: string[]) => u.permissions.includes('*') || rights.some(p => u.permissions.includes(p));
export const fmt = (v: string | number) => Number(v).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
export const money = (v: string | number) => Number(v).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 2 });
export const statuses: Record<string, string> = { DRAFT: 'Nháp', CONFIRMED: 'Đang phục vụ', COMPLETED: 'Đã thanh toán', CANCELLED: 'Đã hủy', PENDING: 'Chờ kho duyệt', APPROVED: 'Đã xuất', REJECTED: 'Từ chối' };
export function dispatched(sale: Sale, lineId: string, reserve = false) { return sale.exports.reduce((n, e) => n + e.lines.filter(l => l.saleLineId === lineId).reduce((s, l) => s + (e.status === 'APPROVED' ? Number(l.exportedQuantity || 0) : reserve && e.status === 'PENDING' ? Number(l.requestedQuantity) : 0), 0), 0); }
export async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const token = sessionStorage.getItem(TOKEN);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/restaurant/${path}`, { method, cache: 'no-store', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body === undefined ? {} : { 'Content-Type': 'application/json' }) }, body: body === undefined ? undefined : JSON.stringify(body) });
  const result = await response.json().catch(() => ({ message: 'Phản hồi không hợp lệ' }));
  if (response.status === 401 && path !== 'auth/login' && token && sessionStorage.getItem(TOKEN) === token) { sessionStorage.removeItem(TOKEN); window.dispatchEvent(new Event('restaurant-session-ended')); }
  if (!response.ok) throw new Error(Array.isArray(result.message) ? result.message.join('; ') : result.message || 'Thao tác thất bại');
  return result as T;
}

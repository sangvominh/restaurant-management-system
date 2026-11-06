import { apiFetch as authenticatedFetch } from '@/warehouse/session';

export type FinishedGoodsDefect = {
  code: string;
  branchCode: string;
  branchName: string;
  productCode: string;
  productName: string;
  quantity: string;
  reason: string;
  deductFromStock: boolean;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
};

export async function fetchFinishedGoodsDefects(status?: string) {
  const query = status && status !== 'ALL' ? `?status=${encodeURIComponent(status)}` : '';
  const response = await authenticatedFetch(`/warehouse/finished-goods-defects${query}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Không tải được phiếu báo thành phẩm lỗi');
  const result = await response.json();
  return result.data as FinishedGoodsDefect[];
}

async function post(path: string, body?: unknown) {
  const response = await authenticatedFetch(`${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.message ?? 'Không thể xử lý phiếu báo thành phẩm lỗi');
  }
}

export function approveFinishedGoodsDefect(code: string) {
  return post(`/warehouse/finished-goods-defects/${encodeURIComponent(code)}/approve`);
}

export function rejectFinishedGoodsDefect(code: string, reason = 'Không được quản lý chấp thuận') {
  return post(`/warehouse/finished-goods-defects/${encodeURIComponent(code)}/reject`, { reason });
}

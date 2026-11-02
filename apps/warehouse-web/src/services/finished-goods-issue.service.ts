const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

export type FinishedGoodsIssue = {
  code: string;
  branchCode: string;
  shiftCode: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  note?: string | null;
  createdAt: string;
  details: { productCode: string; productName: string; requestedQuantity: string; approvedQuantity: string | null }[];
};

export async function fetchFinishedGoodsIssueBranches() {
  const response = await fetch(`${API_BASE}/warehouse/finished-goods-issue-branches`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Không tải được danh sách chi nhánh');
  const result = await response.json();
  return result.data as { code: string; name: string }[];
}

export async function fetchFinishedGoodsIssues(status?: string) {
  const query = status && status !== 'ALL' ? `?status=${encodeURIComponent(status)}` : '';
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/warehouse/finished-goods-issues${query}`, { cache: 'no-store' });
  } catch {
    throw new Error(`Không kết nối được backend tại ${API_BASE}. Hãy kiểm tra backend và cấu hình CORS.`);
  }
  if (!response.ok) throw new Error('Không tải được phiếu xuất thành phẩm');
  const result = await response.json();
  return (result.data ?? []) as FinishedGoodsIssue[];
}

export async function approveFinishedGoodsIssue(code: string, quantities?: Record<string, string>) {
  const response = await fetch(`${API_BASE}/warehouse/finished-goods-issues/${encodeURIComponent(code)}/approve`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ quantities }) });
  if (!response.ok) throw new Error((await response.json()).message ?? 'Không duyệt được phiếu');
}

export async function createFinishedGoodsIssue(input: { branchCode: string; shiftCode?: string; items: { productCode: string; quantity: string }[] }) {
  const response = await fetch(`${API_BASE}/warehouse/finished-goods-issues`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
  if (!response.ok) throw new Error((await response.json()).message ?? 'Không tạo được phiếu xuất');
  return response.json();
}

export async function rejectFinishedGoodsIssue(code: string) {
  const response = await fetch(`${API_BASE}/warehouse/finished-goods-issues/${encodeURIComponent(code)}/reject`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reason: 'Không được quản lý chấp thuận' }) });
  if (!response.ok) throw new Error((await response.json()).message ?? 'Không từ chối được phiếu');
}

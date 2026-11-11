export type StatusArea = 'receipt' | 'order' | 'issue' | 'run' | 'return' | 'waste' | 'export' | 'catalog' | 'bom';
const entries: Record<StatusArea, Record<string, [string, string]>> = {
  receipt: { DRAFT: ['Nháp · chưa nhập kho', 'draft'], POSTED: ['Đã nhập kho', 'done'] },
  order: { NEW: ['Chờ nhân viên nhận', 'pending'], RECEIVED: ['Đã nhận · chờ chế biến', 'info'], IN_PROGRESS: ['Đã ghi nhận sản lượng', 'info'], COMPLETED: ['Đã đóng lệnh', 'done'], CANCELLED: ['Đã hủy', 'muted'] },
  issue: { PENDING: ['Chờ kho cấp', 'pending'], APPROVED: ['Đã cấp nguyên liệu', 'done'], REJECTED: ['Đã từ chối cấp', 'rejected'] },
  run: { PENDING: ['Chờ nghiệm thu', 'pending'], INSPECTED: ['Đã nghiệm thu', 'done'] },
  return: { PENDING: ['Chờ duyệt hoàn', 'pending'], APPROVED: ['Đã hoàn về kho', 'done'], REJECTED: ['Đã từ chối hoàn', 'rejected'] },
  waste: { PENDING: ['Chờ duyệt hao hụt', 'pending'], APPROVED: ['Đã ghi nhận hao hụt', 'done'], REJECTED: ['Đã từ chối hao hụt', 'rejected'] },
  export: { PENDING: ['Chờ kho duyệt xuất', 'pending'], APPROVED: ['Đã xuất khỏi kho', 'done'], REJECTED: ['Đã từ chối xuất', 'rejected'] },
  catalog: { ACTIVE: ['Đang sử dụng', 'done'], INACTIVE: ['Ngừng sử dụng', 'muted'] },
  bom: { DRAFT: ['Nháp · chưa áp dụng', 'draft'], CURRENT: ['Đang dùng cho lệnh mới', 'done'], SCHEDULED: ['Chưa đến ngày hiệu lực', 'pending'], HISTORY: ['Phiên bản trước', 'muted'] },
};
export function statusInfo(area: StatusArea, code: string) { const [label, tone] = entries[area][code] || [code, 'muted']; return { label, tone }; }
export function StatusBadge({ area, code }: { area: StatusArea; code: string }) { const { label, tone } = statusInfo(area, code); return <span className={`document-status ${tone}`}><span className="status-dot" aria-hidden="true" />{label}</span>; }

'use client';
import { useState } from 'react';
export function usePagination<T>(rows: T[], resetKey: string, initialSize = 12) {
  const [state, setState] = useState({ key: resetKey, page: 1, size: initialSize });
  const pages = Math.max(1, Math.ceil(rows.length / state.size));
  const page = state.key === resetKey ? Math.min(state.page, pages) : 1;
  const start = (page - 1) * state.size;
  return { rows: rows.slice(start, start + state.size), total: rows.length, page, pages, size: state.size, start, setPage: (page: number) => setState({ key: resetKey, page: Math.max(1, Math.min(page, pages)), size: state.size }), setSize: (size: number) => setState({ key: resetKey, page: 1, size }) };
}
export function Pagination({ pager, disabled = false }: { pager: ReturnType<typeof usePagination>; disabled?: boolean }) {
  const { total, page, pages, size, start, setPage, setSize } = pager;
  return <div className="pagination"><span aria-live="polite">{total ? `${start + 1}–${Math.min(start + size, total)} / ${total}` : '0 kết quả'}</span><label>Hiển thị<select aria-label="Số kết quả mỗi trang" disabled={disabled} value={size} onChange={e => setSize(Number(e.target.value))}>{[12, 24, 48].map(n => <option key={n} value={n}>{n} / trang</option>)}</select></label><nav aria-label="Phân trang"><button disabled={disabled || page <= 1} onClick={() => setPage(1)} aria-label="Trang đầu">«</button><button disabled={disabled || page <= 1} onClick={() => setPage(page - 1)} aria-label="Trang trước">‹</button><span>Trang {page} / {pages}</span><button disabled={disabled || page >= pages} onClick={() => setPage(page + 1)} aria-label="Trang sau">›</button><button disabled={disabled || page >= pages} onClick={() => setPage(pages)} aria-label="Trang cuối">»</button></nav></div>;
}

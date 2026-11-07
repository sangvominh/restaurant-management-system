"use client";

import { useState } from "react";

export function usePagination<T>(items: T[], resetKey = "", pageSize = 10) {
  const [state, setState] = useState({ key: resetKey, page: 1 });
  if (state.key !== resetKey) setState({ key: resetKey, page: 1 });
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const page = state.key === resetKey ? Math.min(state.page, pageCount) : 1;
  return {
    items: items.slice((page - 1) * pageSize, page * pageSize),
    controls: { page, pageCount, pageSize, total: items.length, onPageChange: (next: number) => setState({ key: resetKey, page: Math.max(1, Math.min(next, pageCount)) }) },
  };
}

export default function Pagination({ page, pageCount, pageSize, total, onPageChange, limit }: {
  page: number; pageCount: number; pageSize: number; total: number; onPageChange: (page: number) => void; limit?: number;
}) {
  return <nav className="list-pagination" aria-label="Phân trang">
    <span aria-live="polite">Hiển thị {total ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, total)} / {total}{limit !== undefined && total >= limit && <small className="pagination-limit">API trả tối đa {limit} kết quả, chưa phải toàn bộ dữ liệu.</small>}</span>
    <div><button type="button" className="button button-secondary" aria-label="Trang trước" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Trước</button>
      <span>Trang {page} / {pageCount}</span>
      <button type="button" className="button button-secondary" aria-label="Trang sau" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>Sau</button></div>
  </nav>;
}

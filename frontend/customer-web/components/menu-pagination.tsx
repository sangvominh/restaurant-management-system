"use client";

import { useState } from "react";

export const DEFAULT_PAGE_SIZE = 8;

export interface PaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  pageSize: number;
  setPage: (nextPage: number) => void;
}

/**
 * Quản lý phân trang phía client (8 món/trang).
 * Tự động quay về trang 1 khi khóa lọc (resetKey) thay đổi.
 */
export function useMenuPagination<T>(
  allItems: T[],
  resetKey: string,
  pageSize = DEFAULT_PAGE_SIZE,
): PaginationResult<T> {
  const [state, setState] = useState<{
    key: string;
    page: number;
  }>({
    key: resetKey,
    page: 1,
  });

  const total = allItems.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page =
    state.key === resetKey ? Math.min(Math.max(1, state.page), totalPages) : 1;

  const startIndex = (page - 1) * pageSize;
  const items = allItems.slice(startIndex, startIndex + pageSize);

  const setPage = (nextPage: number) => {
    const clamped = Math.max(1, Math.min(nextPage, totalPages));
    setState({ key: resetKey, page: clamped });
  };

  return {
    items,
    total,
    page,
    totalPages,
    pageSize,
    setPage,
  };
}

interface MenuPaginationProps<T> {
  pager: PaginationResult<T>;
  scrollTargetId?: string;
}

function buildPageNumbers(
  current: number,
  totalPages: number,
): (number | "dots")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }
  const pages: (number | "dots")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(totalPages - 1, current + 1);

  if (left > 2) pages.push("dots");
  for (let p = left; p <= right; p++) {
    pages.push(p);
  }
  if (right < totalPages - 1) pages.push("dots");
  pages.push(totalPages);
  return pages;
}

export function MenuPagination<T>({
  pager,
  scrollTargetId,
}: MenuPaginationProps<T>) {
  const { page, totalPages, setPage } = pager;

  if (totalPages <= 1) return null;

  const handleGoPage = (targetPage: number) => {
    if (targetPage === page || targetPage < 1 || targetPage > totalPages) return;
    setPage(targetPage);
    if (typeof window !== "undefined") {
      if (scrollTargetId) {
        const el = document.getElementById(scrollTargetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const pageTokens = buildPageNumbers(page, totalPages);

  return (
    <div className="flex justify-center pt-1">
      <nav
        aria-label="Phân trang danh sách món"
        className="inline-flex max-w-full flex-wrap items-center justify-center rounded-lg border border-[#dfd3c4] bg-white px-2 py-1 shadow-2xs select-none"
      >
        <button
          type="button"
          onClick={() => handleGoPage(1)}
          disabled={page <= 1}
          aria-label="Trang đầu"
          title="Trang đầu"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold text-[#3f332b] transition-colors hover:bg-[#f6efe7] disabled:cursor-not-allowed disabled:text-[#c2b5aa] disabled:hover:bg-transparent"
        >
          «
        </button>
        <button
          type="button"
          onClick={() => handleGoPage(page - 1)}
          disabled={page <= 1}
          aria-label="Trang trước"
          title="Trang trước"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold text-[#3f332b] transition-colors hover:bg-[#f6efe7] disabled:cursor-not-allowed disabled:text-[#c2b5aa] disabled:hover:bg-transparent"
        >
          ‹
        </button>

        <span
          aria-hidden="true"
          className="mx-1 h-4 w-px shrink-0 bg-[#ebe2d6]"
        />

        {pageTokens.map((token, index) =>
          token === "dots" ? (
            <span
              key={`dots-${index}`}
              className="px-1 text-[13px] font-semibold text-[#8a7a70]"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={token}
              type="button"
              onClick={() => handleGoPage(token)}
              aria-current={token === page ? "page" : undefined}
              aria-label={`Trang ${token}`}
              className={`inline-flex h-7 min-w-[26px] items-center justify-center rounded-md px-1.5 text-[13px] tabular-nums transition-colors ${
                token === page
                  ? "bg-[#fceee6] font-extrabold text-[#a33f10]"
                  : "font-medium text-[#5e4f45] hover:bg-[#f6efe7] hover:text-[#1f1712]"
              }`}
            >
              {token}
            </button>
          ),
        )}

        <span
          aria-hidden="true"
          className="mx-1 h-4 w-px shrink-0 bg-[#ebe2d6]"
        />

        <button
          type="button"
          onClick={() => handleGoPage(page + 1)}
          disabled={page >= totalPages}
          aria-label="Trang sau"
          title="Trang sau"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold text-[#3f332b] transition-colors hover:bg-[#f6efe7] disabled:cursor-not-allowed disabled:text-[#c2b5aa] disabled:hover:bg-transparent"
        >
          ›
        </button>
        <button
          type="button"
          onClick={() => handleGoPage(totalPages)}
          disabled={page >= totalPages}
          aria-label="Trang cuối"
          title="Trang cuối"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold text-[#3f332b] transition-colors hover:bg-[#f6efe7] disabled:cursor-not-allowed disabled:text-[#c2b5aa] disabled:hover:bg-transparent"
        >
          »
        </button>
      </nav>
    </div>
  );
}

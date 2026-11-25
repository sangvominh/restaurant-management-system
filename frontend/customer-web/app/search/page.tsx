"use client";

import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { MenuPagination, useMenuPagination } from "@/components/menu-pagination";
import { ProductCard } from "@/components/product-card";
import {
  ApiErrorState,
  EmptyStateCard,
  ProductGridSkeleton,
} from "@/components/ui-states";
import { ApiError, fetchCategories, fetchProducts } from "@/lib/api";
import type { CategoryItem, ProductItem } from "@/lib/types";

interface SearchWorkspaceProps {
  initialQuery: string;
  initialCategoryId: string;
}

function SearchWorkspace({
  initialQuery,
  initialCategoryId,
}: SearchWorkspaceProps) {
  const [inputValue, setInputValue] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [selectedCategoryId, setSelectedCategoryId] =
    useState(initialCategoryId);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [filterEpoch, setFilterEpoch] = useState(0);

  // Debounce từ khóa khi người dùng gõ tìm kiếm (giữ mượt bộ gõ tiếng Việt)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveQuery((prev) => {
        const next = inputValue.trim();
        if (prev !== next) {
          setFilterEpoch((ep) => ep + 1);
        }
        return next;
      });
    }, 280);
    return () => window.clearTimeout(timer);
  }, [inputValue]);

  // Đồng bộ URL trên thanh địa chỉ mà không làm mất focus ô nhập
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (activeQuery) params.set("q", activeQuery);
    if (selectedCategoryId) params.set("categoryId", selectedCategoryId);
    const qs = params.toString();
    const nextUrl = qs ? `/search?${qs}` : "/search";
    window.history.replaceState(window.history.state, "", nextUrl);
  }, [activeQuery, selectedCategoryId]);

  // Tải danh sách danh mục cho bộ lọc
  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const data = await fetchCategories(controller.signal);
        setCategories(data);
      } catch {
        // Lỗi kết nối chính sẽ hiển thị ở luồng tải kết quả món ăn
      }
    }
    void loadCategories();
    return () => controller.abort();
  }, [reloadKey]);

  // Gọi API tìm kiếm món kết hợp cùng bộ lọc danh mục
  useEffect(() => {
    const controller = new AbortController();
    async function runSearch() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(
          {
            categoryId: selectedCategoryId || undefined,
            q: activeQuery || undefined,
          },
          controller.signal,
        );
        setProducts(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(
          err instanceof ApiError
            ? err.message
            : "Đã xảy ra lỗi khi tìm kiếm món ăn.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    void runSearch();
    return () => controller.abort();
  }, [activeQuery, selectedCategoryId, reloadKey]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilterEpoch((ep) => ep + 1);
    setActiveQuery(inputValue.trim());
  };

  const handleResetFilters = () => {
    setFilterEpoch((ep) => ep + 1);
    setInputValue("");
    setActiveQuery("");
    setSelectedCategoryId("");
  };

  const handleSelectCategory = (categoryId: string) => {
    setFilterEpoch((ep) => ep + 1);
    setSelectedCategoryId(categoryId);
  };

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === selectedCategoryId) ?? null,
    [categories, selectedCategoryId],
  );

  const hasFilters = Boolean(activeQuery || selectedCategoryId);
  const pager = useMenuPagination(
    products,
    `${filterEpoch}::${activeQuery}::${selectedCategoryId}`,
    8,
  );

  return (
    <div className="mx-auto w-full max-w-[1480px] space-y-6 px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
      {/* Khung tìm kiếm nổi bật trên đầu trang */}
      <section className="rounded-2xl border border-[#e8dfd3] bg-white p-4 shadow-[0_3px_18px_rgba(31,23,18,0.03)] sm:p-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-bold tracking-wider text-[#a33f10] uppercase">
            Tìm kiếm thực đơn • bbqhouse
          </p>
          <h1 className="mt-1 text-xl font-extrabold tracking-tight text-[#1f1712] sm:text-2xl">
            Khám phá hương vị yêu thích
          </h1>
          <p className="mt-1 text-xs text-[#6e6056]">
            Nhập tên món ăn và kết hợp lọc theo danh mục để tìm món nhanh chóng.
          </p>

          <form
            onSubmit={handleSubmit}
            role="search"
            className="mt-4 flex flex-col gap-2 sm:flex-row"
          >
            <div className="relative flex-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#8d7d72]"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập tên món ăn (ví dụ: Sườn, Ức bò, Salad...)"
                aria-label="Tìm theo tên món ăn"
                className="h-10 w-full rounded-xl border border-[#ded1c1] bg-[#fcfaf7] pr-9 pl-10 text-xs font-medium text-[#1f1712] placeholder:text-[#98877b] focus:border-[#a33f10] focus:bg-white focus:outline-none sm:text-sm"
              />
              {inputValue ? (
                <button
                  type="button"
                  onClick={() => {
                    setFilterEpoch((ep) => ep + 1);
                    setInputValue("");
                    setActiveQuery("");
                  }}
                  aria-label="Xóa từ khóa tìm kiếm"
                  className="absolute top-1/2 right-2.5 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#ede4d9] text-xs font-bold text-[#5e4f45] hover:bg-[#dfd2c3]"
                >
                  ×
                </button>
              ) : null}
            </div>

            <button
              type="submit"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-[#a33f10] px-5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#87320b] sm:text-sm"
            >
              Tìm món
            </button>
          </form>
        </div>

        {/* Bộ lọc danh mục đặt ngay bên dưới ô tìm kiếm */}
        <div className="mt-4 border-t border-[#efe6db] pt-3.5">
          <div className="no-scrollbar -mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-0.5 sm:flex-wrap sm:justify-center">
            <span className="shrink-0 text-xs font-bold text-[#75665c]">
              Danh mục:
            </span>
            <button
              type="button"
              onClick={() => handleSelectCategory("")}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                !selectedCategoryId
                  ? "border-[#a33f10] bg-[#a33f10] text-white"
                  : "border-[#dfd3c4] bg-[#faf6f0] text-[#4f4138] hover:bg-[#efe6db]"
              }`}
            >
              Tất cả
            </button>
            {categories.map((cat) => {
              const active = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    active
                      ? "border-[#a33f10] bg-[#a33f10] text-white"
                      : "border-[#dfd3c4] bg-[#faf6f0] text-[#4f4138] hover:bg-[#efe6db]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Thông tin số lượng kết quả & danh sách thẻ kèm phân trang */}
      <section id="search-results-top" aria-live="polite" className="space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-extrabold text-[#1f1712] sm:text-base">
              {loading
                ? "Đang tìm món ăn..."
                : `Tìm thấy ${products.length} món phù hợp`}
            </h2>
            {activeQuery ? (
              <span className="rounded-full bg-[#fceee6] px-2.5 py-0.5 text-xs font-semibold text-[#a33f10]">
                Từ khóa: “{activeQuery}”
              </span>
            ) : null}
            {selectedCategory ? (
              <span className="rounded-full bg-[#efe7dc] px-2.5 py-0.5 text-xs font-semibold text-[#5a4a3f]">
                {selectedCategory.name}
              </span>
            ) : null}
          </div>

          {hasFilters ? (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#a33f10] hover:underline"
            >
              Xóa bộ lọc
            </button>
          ) : null}
        </div>

        {error ? (
          <ApiErrorState
            message={error}
            onRetry={() => setReloadKey((prev) => prev + 1)}
          />
        ) : loading ? (
          <ProductGridSkeleton count={8} />
        ) : products.length === 0 ? (
          <EmptyStateCard
            title="Không tìm thấy món ăn phù hợp"
            description={
              hasFilters
                ? "Không có món nào khớp với từ khóa hoặc danh mục đang chọn. Vui lòng thử từ khóa khác hoặc đặt lại bộ lọc."
                : "Thực đơn hiện chưa có món ăn mở bán."
            }
            actionLabel={hasFilters ? "Đặt lại tìm kiếm & bộ lọc" : undefined}
            onAction={hasFilters ? handleResetFilters : undefined}
          />
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 max-[350px]:grid-cols-1 sm:gap-4 lg:grid-cols-4">
              {pager.items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  highlightQuery={activeQuery}
                />
              ))}
            </div>

            <MenuPagination pager={pager} scrollTargetId="search-results-top" />
          </div>
        )}
      </section>
    </div>
  );
}

function SearchRouteReader() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.trim() || "";
  const categoryId = searchParams.get("categoryId")?.trim() || "";

  // Khi điều hướng từ ô tìm nhanh trên Header với từ khóa mới, cập nhật lại workspace
  return (
    <SearchWorkspace
      key={`${q}::${categoryId}`}
      initialQuery={q}
      initialCategoryId={categoryId}
    />
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1480px] px-4 py-6 sm:px-6 lg:px-10">
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <SearchRouteReader />
    </Suspense>
  );
}

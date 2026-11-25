"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { MenuPagination, useMenuPagination } from "@/components/menu-pagination";
import { ProductCard } from "@/components/product-card";
import {
  ApiErrorState,
  EmptyStateCard,
  ProductGridSkeleton,
} from "@/components/ui-states";
import { ApiError, fetchCategories, fetchProducts } from "@/lib/api";
import type { CategoryItem, ProductItem } from "@/lib/types";

function MenuScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get("categoryId")?.trim() || "";

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [filterEpoch, setFilterEpoch] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      setLoadingCategories(true);
      try {
        const data = await fetchCategories(controller.signal);
        setCategories(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(
          err instanceof ApiError
            ? err.message
            : "Không thể tải danh sách danh mục.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCategories(false);
        }
      }
    }
    void loadCategories();
    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      setLoadingProducts(true);
      setError(null);
      try {
        const data = await fetchProducts(
          selectedCategoryId ? { categoryId: selectedCategoryId } : undefined,
          controller.signal,
        );
        setProducts(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(
          err instanceof ApiError
            ? err.message
            : "Không thể tải danh sách món ăn.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoadingProducts(false);
        }
      }
    }
    void loadProducts();
    return () => controller.abort();
  }, [selectedCategoryId, reloadKey]);

  const handleSelectCategory = (categoryId: string) => {
    setFilterEpoch((prev) => prev + 1);
    if (!categoryId) {
      router.replace("/menu", { scroll: false });
    } else {
      router.replace(`/menu?categoryId=${encodeURIComponent(categoryId)}`, {
        scroll: false,
      });
    }
  };

  const totalCatalogProducts = useMemo(
    () => categories.reduce((sum, cat) => sum + cat.productCount, 0),
    [categories],
  );

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.id === selectedCategoryId) ?? null,
    [categories, selectedCategoryId],
  );

  // Sắp xếp danh sách món theo thứ tự nhóm danh mục trước khi phân trang (8–10 món/trang)
  const categoryOrderMap = useMemo(() => {
    const map = new Map<string, number>();
    categories.forEach((cat, index) => map.set(cat.id, index));
    return map;
  }, [categories]);

  const orderedProducts = useMemo(() => {
    if (products.length === 0) return [];
    return [...products].sort((a, b) => {
      const rankA = categoryOrderMap.get(a.category.id) ?? 999;
      const rankB = categoryOrderMap.get(b.category.id) ?? 999;
      if (rankA !== rankB) return rankA - rankB;
      return a.name.localeCompare(b.name, "vi");
    });
  }, [products, categoryOrderMap]);

  const pager = useMenuPagination(
    orderedProducts,
    `${filterEpoch}::${selectedCategoryId}`,
    8,
  );

  // Gom các món thuộc trang hiện tại theo nhóm danh mục
  const groupedSections = useMemo(() => {
    if (pager.items.length === 0) return [];
    const byCategory = new Map<
      string,
      { id: string; name: string; displayOrder: number; items: ProductItem[] }
    >();

    for (const item of pager.items) {
      const existing = byCategory.get(item.category.id);
      if (existing) {
        existing.items.push(item);
      } else {
        const catRank = categoryOrderMap.get(item.category.id);
        byCategory.set(item.category.id, {
          id: item.category.id,
          name: item.category.name,
          displayOrder: catRank !== undefined ? catRank + 1 : byCategory.size + 1,
          items: [item],
        });
      }
    }

    return [...byCategory.values()];
  }, [pager.items, categoryOrderMap]);

  const isLoading = loadingCategories || loadingProducts;

  return (
    <div className="mx-auto w-full max-w-[1480px] space-y-6 px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
      {/* Khung tiêu đề Danh mục món ăn */}
      <section
        id="menu-top"
        className="rounded-2xl border border-[#e8dfd3] bg-gradient-to-r from-[#f7efe4] via-[#fbf7f2] to-white p-4 sm:p-5.5"
      >
        <div className="flex flex-col justify-between gap-3.5 lg:flex-row lg:items-center">
          <div className="space-y-1">
            <p className="text-[11px] font-bold tracking-wider text-[#a33f10] uppercase">
              Thực đơn bbqhouse • Cập nhật trực tiếp
            </p>
            <h1 className="text-xl font-extrabold tracking-tight text-[#1f1712] sm:text-2xl">
              Danh mục món ăn
            </h1>
            <p className="max-w-xl text-xs leading-relaxed text-[#6e6056]">
              Chọn nhóm món bên dưới để xem nhanh các món thịt hun khói, món phụ
              ăn kèm và đồ uống đang phục vụ tại cửa hàng.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3.5 self-start rounded-xl border border-[#e8dfd3] bg-white px-3.5 py-2 shadow-2xs sm:gap-5 lg:self-auto">
            <div>
              <span className="block text-[10.5px] text-[#8a7a70]">
                Tổng số món
              </span>
              <strong className="text-sm font-extrabold tabular-nums text-[#1f1712] sm:text-base">
                {totalCatalogProducts} món
              </strong>
            </div>
            <div className="h-7 w-px bg-[#e8dfd3]" />
            <div>
              <span className="block text-[10.5px] text-[#8a7a70]">
                Nhóm thực đơn
              </span>
              <strong className="text-sm font-extrabold tabular-nums text-[#1f1712] sm:text-base">
                {categories.length} nhóm
              </strong>
            </div>
          </div>
        </div>

        {/* Thanh chọn danh mục ở trên */}
        <div className="mt-4 border-t border-[#eadfd2] pt-3.5">
          <div
            role="tablist"
            aria-label="Chọn danh mục món ăn"
            className="no-scrollbar -mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-0.5 sm:flex-wrap"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!selectedCategoryId}
              onClick={() => handleSelectCategory("")}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                !selectedCategoryId
                  ? "border-[#a33f10] bg-[#a33f10] text-white shadow-xs"
                  : "border-[#dfd3c4] bg-white text-[#4f4138] hover:bg-[#f4ece2]"
              }`}
            >
              <span>Tất cả</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10.5px] tabular-nums ${
                  !selectedCategoryId
                    ? "bg-white/20 text-white"
                    : "bg-[#f2e9de] text-[#786659]"
                }`}
              >
                {totalCatalogProducts}
              </span>
            </button>

            {categories.map((cat) => {
              const active = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "border-[#a33f10] bg-[#a33f10] text-white shadow-xs"
                      : "border-[#dfd3c4] bg-white text-[#4f4138] hover:bg-[#f4ece2]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10.5px] font-bold tabular-nums ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-[#f2e9de] text-[#786659]"
                    }`}
                  >
                    {cat.productCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Danh sách món ăn chia theo từng nhóm bên dưới + Phân trang */}
      {error ? (
        <ApiErrorState
          message={error}
          onRetry={() => setReloadKey((prev) => prev + 1)}
        />
      ) : isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : groupedSections.length === 0 ? (
        <EmptyStateCard
          title={
            selectedCategory
              ? `Danh mục "${selectedCategory.name}" hiện chưa có món mở bán`
              : "Thực đơn hiện chưa có món ăn"
          }
          description={
            selectedCategory
              ? "Bạn có thể chuyển sang xem toàn bộ thực đơn để chọn các nhóm món khác đang phục vụ."
              : "Nhà hàng đang cập nhật thực đơn mới. Vui lòng quay lại sau."
          }
          actionLabel={selectedCategoryId ? "Xem tất cả danh mục" : undefined}
          onAction={
            selectedCategoryId ? () => handleSelectCategory("") : undefined
          }
        />
      ) : (
        <div className="space-y-6">
          <div className="space-y-7">
            {groupedSections.map((section) => (
              <section
                key={section.id}
                aria-labelledby={`cat-heading-${section.id}`}
                className="space-y-3"
              >
                <div className="flex items-baseline justify-between gap-3 border-b border-[#e8dfd3] pb-2">
                  <div className="flex min-w-0 items-baseline gap-2">
                    <span className="text-[11px] font-extrabold tabular-nums text-[#a33f10]">
                      {String(section.displayOrder).padStart(2, "0")}
                    </span>
                    <h2
                      id={`cat-heading-${section.id}`}
                      className="truncate text-base font-extrabold text-[#1f1712] sm:text-lg"
                    >
                      {section.name}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 max-[350px]:grid-cols-1 sm:gap-4 lg:grid-cols-4">
                  {section.items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <MenuPagination pager={pager} scrollTargetId="menu-top" />
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1480px] px-4 py-6 sm:px-6 lg:px-10">
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <MenuScreen />
    </Suspense>
  );
}

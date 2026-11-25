"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProductImage } from "@/components/product-image";
import {
  ApiErrorState,
  EmptyStateCard,
  ProductGridSkeleton,
} from "@/components/ui-states";
import { ApiError, fetchCategories, fetchProducts } from "@/lib/api";
import type { CategoryItem, ProductItem } from "@/lib/types";

/**
 * Loại trừ các loại nước ngọt đóng lon/chai phổ thông và nước suối khỏi Trang chủ.
 * Chỉ giữ thức uống nếu là món pha chế đặc trưng riêng của quán (ví dụ phục vụ theo ly).
 */
function isCommercialDrinkExcludedFromHome(product: ProductItem): boolean {
  const catName = product.category.name.toLowerCase();
  const prodName = product.name.toLowerCase();
  const unitSym = product.unit.symbol.trim().toLowerCase();

  const commercialDrinkRegex =
    /coca|pepsi|sting|sprite|7up|fanta|mirinda|nước suối|nuoc suoi|aquafina|lavie|dasani|đóng chai|dong chai|nước ngọt|nuoc ngot|soda lon/i;

  if (commercialDrinkRegex.test(prodName)) {
    return true;
  }

  const isDrinkCategory = /đồ uống|do uong|thức uống|thuc uong|nước|nuoc/i.test(
    catName,
  );
  if (isDrinkCategory && (unitSym === "lon" || unitSym === "chai")) {
    return true;
  }

  return false;
}

/**
 * Xếp hạng ưu tiên món Best Seller cho nhà hàng BBQ (ưu tiên nhóm Thịt hun khói / món chính).
 */
function scoreBestSeller(product: ProductItem): number {
  const catName = product.category.name.toLowerCase();
  const prodName = product.name.toLowerCase();
  let score = 0;

  if (/hun khói|thịt|bbq|nướng|món chính/i.test(catName)) {
    score += 100;
  }
  if (/brisket|ức bò/i.test(prodName)) {
    score += 40;
  } else if (/sườn/i.test(prodName)) {
    score += 32;
  } else if (/gà tây/i.test(prodName)) {
    score += 24;
  } else if (/heo xé/i.test(prodName)) {
    score += 18;
  } else if (/xúc xích/i.test(prodName)) {
    score += 12;
  }

  if (product.imageUrl) score += 5;

  return score;
}

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHomeData() {
      setLoading(true);
      setError(null);
      try {
        const [cats, prods] = await Promise.all([
          fetchCategories(controller.signal),
          fetchProducts(undefined, controller.signal),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(
          err instanceof ApiError
            ? err.message
            : "Đã xảy ra lỗi khi tải dữ liệu thực đơn.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadHomeData();
    return () => controller.abort();
  }, [reloadKey]);

  // Lọc bỏ nước ngọt đóng lon/chai và nước suối khỏi Trang chủ
  const curatedDishes = useMemo(() => {
    const filtered = products.filter(
      (item) => !isCommercialDrinkExcludedFromHome(item),
    );
    return filtered.length > 0 ? filtered : products;
  }, [products]);

  // 4 món Best Seller chủ lực cho khối Bento (1 thẻ lớn trái + 3 thẻ ngang phải)
  const bestSellers = useMemo(() => {
    if (curatedDishes.length === 0) return [];
    return [...curatedDishes]
      .sort(
        (a, b) =>
          scoreBestSeller(b) - scoreBestSeller(a) ||
          a.name.localeCompare(b.name, "vi"),
      )
      .slice(0, 4);
  }, [curatedDishes]);

  // Các món ngon đặc trưng khác (không trùng với 4 món Best Seller bên trên)
  const signatureDishes = useMemo(() => {
    const bestSellerIds = new Set(bestSellers.map((item) => item.id));
    const remaining = curatedDishes.filter(
      (item) => !bestSellerIds.has(item.id),
    );
    return [...remaining]
      .sort((a, b) => {
        const aImg = a.imageUrl ? 1 : 0;
        const bImg = b.imageUrl ? 1 : 0;
        if (bImg !== aImg) return bImg - aImg;
        return a.name.localeCompare(b.name, "vi");
      })
      .slice(0, 4);
  }, [curatedDishes, bestSellers]);

  const topBestSeller = bestSellers[0] ?? null;
  const sideBestSellers = bestSellers.slice(1, 4);

  return (
    <div className="mx-auto w-full max-w-[1480px] space-y-8 px-4 py-5 sm:space-y-9 sm:px-6 sm:py-6 lg:px-10">
      {/* 1. Banner Giới thiệu sơ lược về nhà hàng bbqhouse */}
      <section className="overflow-hidden rounded-2xl border border-[#4a2d1d] bg-gradient-to-r from-[#2c1b12] via-[#432718] to-[#5a3420] p-5 text-[#fff8f1] shadow-[0_10px_28px_rgba(31,23,18,0.12)] sm:p-7">
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-2.5 lg:col-span-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f5b78e]/35 bg-white/10 px-3 py-0.5 text-[11px] font-bold tracking-wider text-[#f8c19d] uppercase">
              Giới thiệu về bbqhouse • Smokehouse &amp; Grill
            </span>

            <h1 className="text-xl font-extrabold leading-snug tracking-tight text-white sm:text-2xl lg:text-3xl">
              Nghệ thuật BBQ hun khói chậm từ gỗ sồi tự nhiên
            </h1>

            <p className="max-w-3xl text-xs leading-relaxed text-[#ebd9c8] sm:text-sm">
              <strong className="font-bold text-white">bbqhouse</strong> chuyên
              phục vụ các phần thịt ức bò, sườn heo và xúc xích được ướp gia vị
              tự nhiên, hun khói chậm nhiều giờ bằng gỗ sồi để giữ trọn độ mềm
              mọng, kết hợp cùng các món ăn kèm nhà làm chuẩn bị tươi mới theo
              mẻ mỗi ngày.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-semibold text-[#f3decb]">
              <span className="rounded-lg border border-white/15 bg-white/8 px-2.5 py-1">
                🔥 Hun khói gỗ sồi 8–12 giờ
              </span>
              <span className="rounded-lg border border-white/15 bg-white/8 px-2.5 py-1">
                🥩 Chế biến tươi theo mẻ cố định
              </span>
              <span className="rounded-lg border border-white/15 bg-white/8 px-2.5 py-1">
                🥗 Món kèm &amp; sốt BBQ nhà làm
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
            <Link
              href="/menu"
              className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-[#c94e16] px-5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#ad400f] sm:w-auto sm:text-sm lg:w-52"
            >
              <span>Xem thực đơn</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/search"
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-white/25 bg-white/10 px-5 text-xs font-semibold text-[#fff6ee] transition-colors hover:bg-white/18 sm:w-auto lg:w-52"
            >
              <span>Tìm món nhanh</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Xử lý lỗi kết nối API nếu có */}
      {error ? (
        <ApiErrorState
          message={error}
          onRetry={() => setReloadKey((prev) => prev + 1)}
        />
      ) : loading ? (
        <ProductGridSkeleton count={8} />
      ) : products.length === 0 ? (
        <EmptyStateCard
          title="Thực đơn đang được cập nhật"
          description="Hiện chưa có món ăn nào mở bán trên hệ thống. Vui lòng quay lại sau."
        />
      ) : (
        <>
          {/* 2. Khối Bento Best Seller (Giới thiệu nổi bật, không hiện giá và trạng thái tồn) */}
          {topBestSeller ? (
            <section
              aria-labelledby="home-bestseller-heading"
              className="space-y-3.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2
                  id="home-bestseller-heading"
                  className="text-lg font-extrabold text-[#1f1712] sm:text-xl"
                >
                  Best Seller
                </h2>
                <Link
                  href={`/menu?categoryId=${encodeURIComponent(topBestSeller.category.id)}`}
                  className="text-xs font-bold text-[#a33f10] hover:underline"
                >
                  Xem thêm →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                {/* Thẻ lớn bên trái: Top 1 Best Seller */}
                <Link
                  href={`/menu/${topBestSeller.id}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#e5d5c3] bg-white p-3.5 shadow-[0_4px_18px_rgba(31,23,18,0.05)] transition-all hover:border-[#cfaea0] hover:shadow-[0_8px_24px_rgba(31,23,18,0.08)] lg:col-span-5"
                >
                  <div>
                    <div className="relative overflow-hidden rounded-xl">
                      <ProductImage
                        imageUrl={topBestSeller.imageUrl}
                        alt={topBestSeller.name}
                        categoryName={topBestSeller.category.name}
                        className="aspect-[16/10] w-full"
                      />
                      <div className="pointer-events-none absolute top-2.5 left-2.5">
                        <span className="rounded-full bg-[#a33f10] px-2.5 py-0.5 text-[10.5px] font-extrabold text-white shadow-xs">
                          ★ TOP 1 BEST SELLER
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-[11px] font-bold text-[#a33f10]">
                        {topBestSeller.category.name}
                      </span>
                      <h3 className="mt-0.5 text-base font-extrabold text-[#1f1712] transition-colors group-hover:text-[#a33f10] sm:text-lg">
                        {topBestSeller.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#6b5d53]">
                        {topBestSeller.description?.trim()
                          ? topBestSeller.description.trim()
                          : "Phần thịt hun khói chậm bằng gỗ sồi tự nhiên đậm hương vị đặc trưng nhất tại bbqhouse."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#efe6db] pt-3 text-xs font-bold text-[#a33f10]">
                    <span>Xem chi tiết món</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </div>
                </Link>

                {/* 3 thẻ ngang bên phải: Best Seller chủ lực */}
                <div className="grid grid-cols-1 gap-3 lg:col-span-7">
                  {sideBestSellers.map((item) => (
                    <Link
                      key={item.id}
                      href={`/menu/${item.id}`}
                      className="group flex items-center gap-3 rounded-xl border border-[#e8dfd3] bg-white p-2.5 shadow-[0_2px_10px_rgba(31,23,18,0.03)] transition-all hover:border-[#d5beaa] hover:shadow-[0_6px_18px_rgba(31,23,18,0.06)] sm:gap-4 sm:p-3"
                    >
                      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg sm:h-22 sm:w-28">
                        <ProductImage
                          imageUrl={item.imageUrl}
                          alt={item.name}
                          categoryName={item.category.name}
                          className="h-full w-full"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="rounded bg-[#fceee6] px-2 py-0.5 text-[10px] font-bold text-[#a33f10]">
                              Best Seller
                            </span>
                            <span className="truncate text-[11px] text-[#7b6b60]">
                              {item.category.name}
                            </span>
                          </div>

                          <h3 className="line-clamp-1 text-sm font-extrabold text-[#1f1712] transition-colors group-hover:text-[#a33f10] sm:text-[15px]">
                            {item.name}
                          </h3>

                          <p className="line-clamp-1 text-xs text-[#6e6056]">
                            {item.description?.trim()
                              ? item.description.trim()
                              : "Món nướng hun khói đặc trưng được thực khách yêu thích."}
                          </p>
                        </div>

                        <span className="hidden shrink-0 items-center gap-1 rounded-lg bg-[#faf5ee] px-2.5 py-1.5 text-xs font-bold text-[#a33f10] transition-colors group-hover:bg-[#fceee6] sm:inline-flex">
                          <span>Khám phá</span>
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* 3. Món ngon giới thiệu trên Trang chủ (không hiện giá và trạng thái tồn) */}
          {signatureDishes.length > 0 ? (
            <section
              aria-labelledby="home-signature-heading"
              className="space-y-3.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2
                  id="home-signature-heading"
                  className="text-lg font-extrabold text-[#1f1712] sm:text-xl"
                >
                  Món ngon
                </h2>
                <Link
                  href="/menu"
                  className="text-xs font-bold text-[#a33f10] hover:underline"
                >
                  Xem thực đơn →
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 max-[350px]:grid-cols-1 sm:gap-4 lg:grid-cols-4">
                {signatureDishes.map((product) => (
                  <Link
                    key={product.id}
                    href={`/menu/${product.id}`}
                    className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#e8dfd3] bg-white p-2.5 shadow-[0_2px_10px_rgba(31,23,18,0.03)] transition-all hover:border-[#d8c4b0] hover:shadow-[0_6px_18px_rgba(31,23,18,0.07)] sm:p-3"
                  >
                    <div className="overflow-hidden rounded-lg">
                      <ProductImage
                        imageUrl={product.imageUrl}
                        alt={product.name}
                        categoryName={product.category.name}
                        className="aspect-[16/10] w-full"
                      />
                    </div>

                    <div className="mt-2.5 flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-[10.5px] font-bold text-[#a33f10]">
                        {product.category.name}
                      </span>
                      <h3 className="mt-0.5 line-clamp-2 text-[13.5px] font-bold leading-snug text-[#1f1712] transition-colors group-hover:text-[#a33f10] sm:text-sm">
                        {product.name}
                      </h3>
                      {product.description?.trim() ? (
                        <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-[#75665c]">
                          {product.description.trim()}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {/* 4. Lối vào nhanh các danh mục thực đơn */}
          {categories.length > 0 ? (
            <section
              aria-labelledby="home-categories-heading"
              className="space-y-3 border-t border-[#e8dfd3] pt-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2
                  id="home-categories-heading"
                  className="text-base font-extrabold text-[#1f1712] sm:text-lg"
                >
                  Khám phá theo nhóm thực đơn
                </h2>
                <Link
                  href="/menu"
                  className="text-xs font-bold text-[#a33f10] hover:underline"
                >
                  Mở tất cả ({products.length} món) →
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2.5 max-[350px]:grid-cols-1 sm:grid-cols-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/menu?categoryId=${encodeURIComponent(cat.id)}`}
                    className="flex items-center justify-between gap-2 rounded-xl border border-[#e5d9ca] bg-white px-3.5 py-2.5 text-xs font-bold text-[#3f332b] shadow-2xs transition-all hover:border-[#c89f83] hover:bg-[#fdf7f0]"
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="shrink-0 rounded-full bg-[#f4ece2] px-2 py-0.5 text-[11px] font-bold tabular-nums text-[#7b6759]">
                      {cat.productCount} món
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}

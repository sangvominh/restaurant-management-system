"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ProductImage } from "@/components/product-image";
import { ApiErrorState, EmptyStateCard } from "@/components/ui-states";
import { useCart } from "@/context/cart-context";
import { ApiError, fetchProductById } from "@/lib/api";
import {
  formatAvailableCount,
  formatServingUnit,
  formatVnd,
  getMaxOrderableQty,
  parseMoney,
} from "@/lib/format";
import type { ProductItem } from "@/lib/types";

function ProductDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1360px] px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
      <div className="mb-4 h-4 w-48 animate-pulse rounded bg-[#efe6db]" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-7">
        <div className="aspect-[16/11] w-full animate-pulse rounded-2xl bg-[#efe6db] lg:col-span-6" />
        <div className="space-y-3.5 rounded-2xl border border-[#e8dfd3] bg-white p-5 sm:p-6 lg:col-span-6">
          <div className="h-5 w-28 animate-pulse rounded-full bg-[#efe6db]" />
          <div className="h-7 w-3/4 animate-pulse rounded bg-[#efe6db]" />
          <div className="h-6 w-36 animate-pulse rounded bg-[#efe6db]" />
          <div className="h-16 w-full animate-pulse rounded-xl bg-[#f4ede4]" />
          <div className="h-10 w-full animate-pulse rounded-xl bg-[#efe6db]" />
        </div>
      </div>
    </div>
  );
}

function ProductDetailScreen() {
  const params = useParams<{ id: string }>();
  const productId = typeof params?.id === "string" ? params.id : "";

  const { getItemQuantity, addItem } = useCart();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!productId) return;
    const controller = new AbortController();

    async function loadDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(productId, controller.signal);
        setProduct(data);
        setQuantity(1);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(
          err instanceof ApiError
            ? err
            : new ApiError("Không thể tải thông tin chi tiết món ăn.", 0),
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadDetail();
    return () => controller.abort();
  }, [productId, reloadKey]);

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 2000);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    if (error.statusCode === 404 || error.statusCode === 400) {
      return (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <EmptyStateCard
            title="Không tìm thấy món ăn"
            description="Món ăn này không tồn tại hoặc hiện đã ngừng phục vụ trên thực đơn."
            actionLabel="Quay lại danh mục món"
            actionHref="/menu"
          />
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <ApiErrorState
          message={error.message}
          onRetry={() => setReloadKey((prev) => prev + 1)}
        />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const maxOrderable = getMaxOrderableQty(product);
  const qtyInCart = getItemQuantity(product.id);
  const remainingCanAdd = Math.max(0, maxOrderable - qtyInCart);
  const isAvailable = product.inStock && maxOrderable >= 1;
  const clampedQuantity =
    remainingCanAdd > 0 ? Math.min(quantity, remainingCanAdd) : 1;
  const unitPrice = parseMoney(product.sellingPrice);
  const linePreviewTotal = unitPrice * clampedQuantity;
  const servingUnit = formatServingUnit(product.unit);
  const availableCount = formatAvailableCount(product.available);

  const handleAddToCart = () => {
    if (!isAvailable || remainingCanAdd < 1) return;
    const added = addItem(product, clampedQuantity);
    if (added) {
      setJustAdded(true);
      setQuantity(1);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1360px] space-y-4 px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
      {/* Đường dẫn quay lại Thực đơn */}
      <nav
        aria-label="Đường dẫn trang"
        className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#75665c]"
      >
        <Link
          href="/menu"
          className="inline-flex items-center gap-1 font-semibold text-[#4f4138] hover:text-[#a33f10]"
        >
          <span aria-hidden="true">←</span>
          <span>Thực đơn</span>
        </Link>
        <span>/</span>
        <Link
          href={`/menu?categoryId=${encodeURIComponent(product.category.id)}`}
          className="hover:text-[#a33f10]"
        >
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="truncate font-bold text-[#1f1712]">{product.name}</span>
      </nav>

      {/* Bố cục 2 cột trên Desktop (ảnh trái, thông tin phải) & xếp dọc trên Điện thoại (ảnh trước, thông tin sau) */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-7">
        {/* Cột trái: Ảnh món ăn */}
        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-[#e8dfd3] bg-white p-2 shadow-[0_4px_20px_rgba(31,23,18,0.04)] sm:p-2.5">
            <div className="relative overflow-hidden rounded-xl">
              <ProductImage
                imageUrl={product.imageUrl}
                alt={product.name}
                categoryName={product.category.name}
                dimmed={!isAvailable}
                className="aspect-[16/11] w-full"
              />
              <div className="absolute top-2.5 left-2.5">
                {isAvailable ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1f1712]/80 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                    Đang phục vụ
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-[#8f2d1e] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs">
                    Tạm hết món
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Tên, giá, mô tả, chọn số lượng và nút Thêm vào giỏ */}
        <div className="rounded-2xl border border-[#e8dfd3] bg-white p-4.5 shadow-[0_4px_20px_rgba(31,23,18,0.04)] sm:p-6 lg:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-[#fceee6] px-2.5 py-0.5 text-[11px] font-bold text-[#a33f10]">
              {product.category.name}
            </span>
            <span className="font-mono text-[11px] text-[#8a7a70]">
              Mã món: {product.code}
            </span>
          </div>

          <h1 className="mt-2.5 text-xl font-extrabold leading-snug text-[#1f1712] sm:text-2xl">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-baseline gap-1.5">
            <span className="text-xl font-extrabold tabular-nums text-[#a33f10] sm:text-2xl">
              {formatVnd(product.sellingPrice)}
            </span>
            <span className="text-xs font-medium text-[#75665c] sm:text-sm">
              / {servingUnit.label}
            </span>
          </div>

          {/* Trạng thái phục vụ từ API */}
          <div className="mt-3">
            {isAvailable ? (
              <div className="inline-flex flex-wrap items-center gap-1.5 rounded-lg border border-[#d6eadc] bg-[#f2fbf5] px-3 py-1.5 text-xs font-semibold text-[#23663a]">
                <span>Trạng thái: Còn phục vụ</span>
                {servingUnit.isCountableNative && availableCount >= 1 ? (
                  <>
                    <span>•</span>
                    <span>
                      Còn lại: {availableCount} {servingUnit.label}
                    </span>
                  </>
                ) : null}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#f1cbc3] bg-[#fff4f2] px-3 py-1.5 text-xs font-bold text-[#992f1e]">
                <span>
                  Món này hiện tạm hết phục vụ — vui lòng chọn món khác trong
                  thực đơn.
                </span>
              </div>
            )}
          </div>

          {/* Mô tả món */}
          <div className="mt-4.5 border-t border-[#efe6db] pt-4">
            <h2 className="text-xs font-bold text-[#1f1712] sm:text-sm">
              Mô tả món ăn
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-[#6b5d53] sm:text-[13px]">
              {product.description?.trim()
                ? product.description
                : "Món ăn được chế biến theo mẻ tiêu chuẩn tại bbqhouse và bảo quản đúng hạn sử dụng. Hiện chưa có mô tả chi tiết cho món này."}
            </p>
          </div>

          {/* Thông báo món đã có trong giỏ */}
          {qtyInCart > 0 ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#f1d3c1] bg-[#fdf5ef] px-3.5 py-2 text-xs text-[#7c3512]">
              <span>
                Đã có <strong>{qtyInCart}</strong> {servingUnit.label} món này
                trong giỏ hàng.
              </span>
              <Link href="/cart" className="font-bold underline">
                Mở giỏ hàng →
              </Link>
            </div>
          ) : null}

          {/* Bộ chọn số lượng nguyên & nút Thêm vào giỏ */}
          <div className="mt-5 border-t border-[#efe6db] pt-4.5">
            {!isAvailable ? (
              <button
                type="button"
                disabled
                className="flex h-10 w-full cursor-not-allowed items-center justify-center rounded-xl bg-[#ebe4dc] px-5 text-xs font-bold text-[#8a7a70] sm:text-sm"
              >
                Tạm hết món
              </button>
            ) : remainingCanAdd < 1 ? (
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-[#9a4a17]">
                  Bạn đã thêm tối đa số lượng khả dụng của món này vào giỏ hàng.
                </p>
                <Link
                  href="/cart"
                  className="flex h-10 w-full items-center justify-center rounded-xl bg-[#a33f10] px-5 text-xs font-bold text-white transition-colors hover:bg-[#87320b] sm:text-sm"
                >
                  Xem giỏ hàng ({qtyInCart})
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <div
                  aria-label="Chọn số lượng món"
                  className="inline-flex h-10 items-center justify-between rounded-xl border border-[#dfd3c4] bg-[#faf6f0] p-1 sm:w-34"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    disabled={clampedQuantity <= 1}
                    aria-label="Giảm số lượng"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-base font-bold text-[#3f332b] shadow-2xs transition-colors hover:bg-[#f2e8dc] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-sm font-extrabold tabular-nums text-[#1f1712]">
                    {clampedQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(remainingCanAdd, prev + 1),
                      )
                    }
                    disabled={clampedQuantity >= remainingCanAdd}
                    aria-label="Tăng số lượng"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-base font-bold text-[#3f332b] shadow-2xs transition-colors hover:bg-[#f2e8dc] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#a33f10] px-5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#87320b] sm:text-sm"
                >
                  {justAdded ? (
                    <span>✓ Đã thêm vào giỏ hàng</span>
                  ) : (
                    <span>
                      Thêm vào giỏ — {formatVnd(linePreviewTotal)}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailScreen />
    </Suspense>
  );
}

"use client";

import Link from "next/link";
import { ProductImage } from "@/components/product-image";
import { EmptyStateCard } from "@/components/ui-states";
import { useCart } from "@/context/cart-context";
import { formatServingUnit, formatVnd } from "@/lib/format";

export default function CartPage() {
  const {
    items,
    totalQuantity,
    subtotal,
    setItemQuantity,
    incrementItem,
    removeItem,
    clearCart,
  } = useCart();

  return (
    <div className="mx-auto w-full max-w-[1480px] space-y-5 px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
      {/* Tiêu đề trang Giỏ hàng */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-[#fceee6] px-2.5 py-0.5 text-[11px] font-bold text-[#a33f10]">
              ĐƠN HÀNG CỦA BẠN
            </span>
            <span className="text-xs font-medium text-[#75665c]">
              • {totalQuantity} món đã chọn
            </span>
          </div>
          <h1 className="mt-1.5 text-xl font-extrabold tracking-tight text-[#1f1712] sm:text-2xl">
            Giỏ hàng
          </h1>
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#a33f10] hover:underline"
        >
          <span aria-hidden="true">←</span>
          <span>Tiếp tục chọn món</span>
        </Link>
      </div>

      {items.length === 0 ? (
        <EmptyStateCard
          title="Giỏ hàng của bạn đang trống"
          description="Hãy mở thực đơn để chọn các món thịt hun khói, món ăn kèm hoặc đồ uống yêu thích vào giỏ hàng."
          actionLabel="Xem thực đơn"
          actionHref="/menu"
        />
      ) : (
        /* Desktop: danh sách món bên trái, khung tạm tính bên phải. Điện thoại: tạm tính dưới danh sách */
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Danh sách món trong giỏ */}
          <section
            aria-label="Danh sách món trong giỏ hàng"
            className="space-y-3 lg:col-span-8"
          >
            {items.map((item) => {
              const lineTotal = item.unitPrice * item.quantity;
              const reachedMax =
                item.maxQuantity !== null && item.quantity >= item.maxQuantity;

              return (
                <article
                  key={item.productId}
                  className="flex gap-3 rounded-xl border border-[#e8dfd3] bg-white p-3 shadow-[0_2px_10px_rgba(31,23,18,0.03)] sm:gap-3.5 sm:p-4"
                >
                  <Link
                    href={`/menu/${item.productId}`}
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-20"
                  >
                    <ProductImage
                      imageUrl={item.imageUrl}
                      alt={item.name}
                      categoryName={item.categoryName}
                      className="h-full w-full"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/menu/${item.productId}`}
                          className="line-clamp-2 text-[13.5px] font-bold text-[#1f1712] hover:text-[#a33f10] sm:text-sm"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-[11.5px] text-[#75665c]">
                          Đơn giá: {formatVnd(item.unitPrice)} /{" "}
                          {
                            formatServingUnit({
                              name: item.unitName,
                              symbol: item.unitSymbol,
                            }).label
                          }
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Xóa món ${item.name} khỏi giỏ hàng`}
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-[#9a3b2b] transition-colors hover:bg-[#fff0ed]"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                        <span className="hidden sm:inline">Xóa</span>
                      </button>
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex h-8 items-center rounded-lg border border-[#dfd3c4] bg-[#faf6f0] p-0.5">
                        <button
                          type="button"
                          onClick={() =>
                            setItemQuantity(item.productId, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label={`Giảm số lượng ${item.name}`}
                          className="flex h-6.5 w-6.5 items-center justify-center rounded-md bg-white text-xs font-bold text-[#3f332b] transition-colors hover:bg-[#efe6db] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="min-w-7 px-1 text-center text-xs font-extrabold tabular-nums text-[#1f1712]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => incrementItem(item.productId)}
                          disabled={reachedMax}
                          aria-label={`Tăng số lượng ${item.name}`}
                          className="flex h-6.5 w-6.5 items-center justify-center rounded-md bg-white text-xs font-bold text-[#3f332b] transition-colors hover:bg-[#efe6db] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="block text-sm font-extrabold tabular-nums text-[#a33f10]">
                          {formatVnd(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* Khung tạm tính bên phải (Desktop) / bên dưới (Điện thoại) */}
          <aside
            aria-label="Tạm tính giỏ hàng"
            className="rounded-2xl border border-[#e8dfd3] bg-white p-4.5 shadow-[0_4px_20px_rgba(31,23,18,0.04)] sm:p-5 lg:sticky lg:top-20 lg:col-span-4"
          >
            <h2 className="text-base font-extrabold text-[#1f1712]">
              Tóm tắt tạm tính
            </h2>

            <div className="mt-3.5 space-y-2 rounded-xl bg-[#f9f4ed] p-3.5 text-xs">
              <div className="flex items-center justify-between gap-2 text-[#6e6056]">
                <span>Số loại món</span>
                <strong className="font-bold tabular-nums text-[#1f1712]">
                  {items.length} loại
                </strong>
              </div>
              <div className="flex items-center justify-between gap-2 text-[#6e6056]">
                <span>Tổng số lượng</span>
                <strong className="font-bold tabular-nums text-[#1f1712]">
                  {totalQuantity} món
                </strong>
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-[#e6dbce] pt-2 text-[#6e6056]">
                <span>Tạm tính món ăn</span>
                <strong className="font-bold tabular-nums text-[#1f1712]">
                  {formatVnd(subtotal)}
                </strong>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-[#efe6db] pt-3.5">
              <div>
                <span className="block text-xs font-bold text-[#1f1712] sm:text-sm">
                  Tổng tạm tính
                </span>
                <span className="text-[10.5px] text-[#8a7a70]">
                  Tính theo đơn giá hiện tại
                </span>
              </div>
              <strong className="text-xl font-extrabold tabular-nums text-[#a33f10]">
                {formatVnd(subtotal)}
              </strong>
            </div>

            <div className="mt-5 space-y-2">
              <Link
                href="/menu"
                className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-[#a33f10] px-4 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#87320b] sm:text-sm"
              >
                <span>Chọn thêm món khác</span>
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="flex h-9 w-full items-center justify-center rounded-xl border border-[#e3d6c7] bg-white px-3.5 text-xs font-semibold text-[#7a685c] transition-colors hover:border-[#d6b9ae] hover:bg-[#fff5f2] hover:text-[#9a3b2b]"
              >
                Xóa toàn bộ giỏ hàng
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

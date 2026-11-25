"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCart } from "@/context/cart-context";
import {
  formatServingUnit,
  formatVnd,
  getMaxOrderableQty,
} from "@/lib/format";
import type { ProductItem } from "@/lib/types";
import { ProductImage } from "./product-image";

interface ProductCardProps {
  product: ProductItem;
  highlightQuery?: string;
}

function renderHighlightedText(text: string, query?: string): ReactNode {
  const trimmed = query?.trim();
  if (!trimmed) return text;

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "ig");
  const parts = text.split(regex);
  if (parts.length <= 1) return text;

  return parts.map((part, index) =>
    part.toLowerCase() === trimmed.toLowerCase() ? (
      <mark
        key={`${part}-${index}`}
        className="rounded bg-[#fce3d2] px-1 text-[#8f340a]"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export function ProductCard({ product, highlightQuery }: ProductCardProps) {
  const { getItemQuantity, addItem, incrementItem, decrementItem } = useCart();

  const maxOrderable = getMaxOrderableQty(product);
  const isAvailable = product.inStock && maxOrderable >= 1;
  const qtyInCart = getItemQuantity(product.id);
  const servingUnit = formatServingUnit(product.unit);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#e8dfd3] bg-white p-2.5 shadow-[0_2px_10px_rgba(31,23,18,0.03)] transition-all hover:border-[#d8c4b0] hover:shadow-[0_6px_18px_rgba(31,23,18,0.07)] sm:p-3">
      {/* Khung ảnh món ăn + nhãn trạng thái phục vụ */}
      <Link
        href={`/menu/${product.id}`}
        className="relative block overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a33f10]"
      >
        <ProductImage
          imageUrl={product.imageUrl}
          alt={product.name}
          categoryName={product.category.name}
          dimmed={!isAvailable}
          className="aspect-[16/10] w-full"
        />
        <div className="pointer-events-none absolute top-2 left-2 flex flex-wrap gap-1">
          {isAvailable ? (
            <span className="rounded-full bg-[#1f1712]/75 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
              Đang phục vụ
            </span>
          ) : (
            <span className="rounded-full bg-[#8f2d1e] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
              Tạm hết món
            </span>
          )}
        </div>
      </Link>

      {/* Tên món & mô tả ngắn */}
      <div className="mt-2.5 flex min-w-0 flex-1 flex-col">
        <Link
          href={`/menu/${product.id}`}
          className="line-clamp-2 text-[13.5px] font-bold leading-snug text-[#1f1712] transition-colors group-hover:text-[#a33f10] sm:text-sm"
        >
          {renderHighlightedText(product.name, highlightQuery)}
        </Link>

        {product.description?.trim() ? (
          <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-[#75665c]">
            {product.description.trim()}
          </p>
        ) : null}

        {/* Giá bán & thao tác thêm vào giỏ */}
        <div className="mt-auto flex flex-col gap-2 pt-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <span className="block truncate text-[13.5px] font-extrabold tabular-nums text-[#1f1712] sm:text-sm">
              {formatVnd(product.sellingPrice)}
            </span>
            <span className="block truncate text-[10.5px] text-[#8a7a70]">
              / {servingUnit.label}
            </span>
          </div>

          {!isAvailable ? (
            <button
              type="button"
              disabled
              className="inline-flex h-8 w-full shrink-0 cursor-not-allowed items-center justify-center rounded-lg bg-[#ede6de] px-2.5 text-[11.5px] font-semibold text-[#8c7d72] sm:w-auto"
            >
              Tạm hết món
            </button>
          ) : qtyInCart > 0 ? (
            <div className="inline-flex h-8 w-full shrink-0 items-center justify-between rounded-lg border border-[#e4cdb9] bg-[#fdf5ef] p-0.5 sm:w-auto sm:justify-center">
              <button
                type="button"
                onClick={() => decrementItem(product.id)}
                aria-label={`Giảm số lượng ${product.name}`}
                className="flex h-6.5 w-6.5 items-center justify-center rounded-md text-sm font-bold text-[#a33f10] transition-colors hover:bg-[#f7e2d3]"
              >
                −
              </button>
              <span className="min-w-6 px-1 text-center text-xs font-bold tabular-nums text-[#1f1712]">
                {qtyInCart}
              </span>
              <button
                type="button"
                onClick={() => incrementItem(product.id)}
                disabled={qtyInCart >= maxOrderable}
                aria-label={`Tăng số lượng ${product.name}`}
                className="flex h-6.5 w-6.5 items-center justify-center rounded-md bg-[#a33f10] text-sm font-bold text-white transition-colors hover:bg-[#87320b] disabled:cursor-not-allowed disabled:opacity-45"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addItem(product, 1)}
              className="inline-flex h-8 w-full shrink-0 items-center justify-center gap-1 rounded-lg bg-[#a33f10] px-2.5 text-[11.5px] font-semibold text-white shadow-xs transition-colors hover:bg-[#87320b] sm:w-auto"
            >
              <span aria-hidden="true" className="text-xs leading-none">
                +
              </span>
              <span>Thêm vào giỏ</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

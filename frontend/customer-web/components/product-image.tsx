"use client";

import { useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import { resolveProductImageUrl } from "@/lib/format";

interface ProductImageProps {
  imageUrl: string | null | undefined;
  alt: string;
  categoryName?: string;
  className?: string;
  dimmed?: boolean;
}

export function ProductImage({
  imageUrl,
  alt,
  categoryName,
  className = "",
  dimmed = false,
}: ProductImageProps) {
  const resolvedSrc = resolveProductImageUrl(imageUrl, API_BASE_URL);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const showRealImage = Boolean(resolvedSrc && failedSrc !== resolvedSrc);

  return (
    <div
      className={`relative overflow-hidden bg-[#f2e8dc] select-none ${className}`}
    >
      {showRealImage ? (
        // Dùng thẻ img tiêu chuẩn vì nhà hàng có thể nhập URL ảnh từ bất kỳ tên miền nào
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedSrc!}
          alt={alt}
          loading="lazy"
          onError={() => setFailedSrc(resolvedSrc)}
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            dimmed ? "grayscale-[45%] opacity-75" : ""
          }`}
        />
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#f8efe4] via-[#f2e3d2] to-[#e9d3bc] p-3 text-center ${
            dimmed ? "opacity-70 grayscale-[35%]" : ""
          }`}
          aria-label={`Ảnh minh họa mặc định cho ${alt}`}
        >
          <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 text-[#a33f10] shadow-xs ring-1 ring-[#e4cbb4]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4.5 w-4.5"
              aria-hidden="true"
            >
              <path d="M12 3c1.5 2.4 3 4.2 3 6.5a3 3 0 1 1-6 0C9 7.2 10.5 5.4 12 3Z" />
              <path d="M5 14h14" />
              <path d="M6.5 14a5.5 5.5 0 0 0 11 0" />
              <path d="M9 19.5 7.5 21" />
              <path d="M15 19.5 16.5 21" />
            </svg>
          </div>
          <span className="line-clamp-1 max-w-full text-[11px] font-semibold text-[#6f4b36]">
            {categoryName || "Thực đơn BBQ"}
          </span>
          <span className="mt-0.5 text-[10px] text-[#8d6e5a]">
            Chưa có ảnh món
          </span>
        </div>
      )}
    </div>
  );
}

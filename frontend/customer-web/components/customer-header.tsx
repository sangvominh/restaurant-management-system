"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/context/cart-context";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ" },
  { href: "/menu", label: "Danh mục món" },
  { href: "/search", label: "Tìm món" },
] as const;

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/menu") {
    return pathname === "/menu" || pathname.startsWith("/menu/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function CustomerHeader() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const { totalQuantity } = useCart();
  const [quickQuery, setQuickQuery] = useState("");

  const handleQuickSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = quickQuery.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#e8dfd3] bg-[#f9f6f1]/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-10">
        {/* Thương hiệu Nhà hàng BBQ */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a33f10]"
        >
          <span className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg bg-[#a33f10] text-white shadow-xs">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4.5 w-4.5"
              aria-hidden="true"
            >
              <path d="M12 2c1.8 2.6 3.5 4.7 3.5 7.4a3.5 3.5 0 1 1-7 0C8.5 6.7 10.2 4.6 12 2Z" />
              <path d="M4 14h16" />
              <path d="M6 14a6 6 0 0 0 12 0" />
              <path d="M8.5 20 7 22" />
              <path d="M15.5 20 17 22" />
            </svg>
          </span>
          <div className="min-w-0">
            <span className="block truncate text-[15px] font-extrabold tracking-tight text-[#1f1712] sm:text-base">
              bbqhouse
            </span>
            <span className="hidden truncate text-[10px] font-medium text-[#7b6b60] sm:block">
              Smokehouse &amp; Grill
            </span>
          </div>
        </Link>

        {/* Điều hướng chính trên Desktop */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  active
                    ? "bg-[#a33f10] text-white shadow-xs"
                    : "text-[#54463d] hover:bg-[#efe6db] hover:text-[#1f1712]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Ô tìm nhanh (Desktop) + Nút Giỏ hàng */}
        <div className="flex shrink-0 items-center gap-2">
          <form
            onSubmit={handleQuickSearch}
            role="search"
            className="relative hidden lg:block"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#8d7d72]"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Tìm món nhanh..."
              aria-label="Tìm món nhanh"
              className="h-9 w-48 rounded-full border border-[#e3d8ca] bg-white pr-3.5 pl-8.5 text-[13px] text-[#1f1712] placeholder:text-[#96867a] focus:border-[#a33f10] focus:outline-none xl:w-54"
            />
          </form>

          <Link
            href="/cart"
            aria-label={`Giỏ hàng, hiện có ${totalQuantity} món`}
            className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold text-white shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a33f10] ${
              pathname === "/cart"
                ? "bg-[#7d2d09] ring-2 ring-[#f3cdb9]"
                : "bg-[#a33f10] hover:bg-[#87320b]"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Giỏ hàng</span>
            <span className="inline-flex min-w-4.5 items-center justify-center rounded-full bg-white/20 px-1.5 py-0.5 text-[11px] font-bold tabular-nums">
              {totalQuantity}
            </span>
          </Link>
        </div>
      </div>

      {/* Thanh điều hướng gọn cho Điện thoại (không tràn ngang) */}
      <nav
        aria-label="Điều hướng di động"
        className="border-t border-[#ede4d8] bg-[#fdfbf8] px-3 py-1.5 md:hidden"
      >
        <div className="mx-auto grid w-full max-w-[1480px] grid-cols-3 gap-1.5">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-center rounded-full px-2 py-1.5 text-center text-xs font-semibold transition-colors ${
                  active
                    ? "bg-[#a33f10] text-white shadow-xs"
                    : "bg-[#f3ece3] text-[#54463d] hover:bg-[#e8dfd3]"
                }`}
              >
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

export function CustomerFooter() {
  return (
    <footer className="mt-10 border-t border-[#e8dfd3] bg-[#f4ede4]">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-1.5 px-4 py-4.5 text-xs text-[#6e6056] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <div>
          <p className="text-[13px] font-bold text-[#1f1712]">
            bbqhouse — Nghệ Thuật Thịt Hun Khói Gỗ Sồi &amp; Thực Đơn Tươi Mỗi Ngày
          </p>
          <p className="mt-0.5 text-[11px]">
            Chế biến theo mẻ tiêu chuẩn nhà hàng • Phục vụ tại bàn &amp; mang đi
          </p>
        </div>
        <p className="text-[11px] font-medium text-[#7b6b60]">
          Giờ mở cửa hằng ngày: 10:00 – 22:00
        </p>
      </div>
    </footer>
  );
}

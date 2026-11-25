import type { Metadata } from "next";
import { Suspense } from "react";
import { CustomerFooter, CustomerHeader } from "@/components/customer-header";
import { CartProvider } from "@/context/cart-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "bbqhouse — Thực đơn & Giỏ hàng",
  description:
    "Khám phá thực đơn thịt hun khói gỗ sồi, Best Seller và các món ngon đặc trưng tại bbqhouse.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[#f9f6f1] text-[#1f1712]">
        <CartProvider>
          <Suspense
            fallback={
              <div className="h-14 border-b border-[#e8dfd3] bg-[#f9f6f1]" />
            }
          >
            <CustomerHeader />
          </Suspense>
          <main className="flex-1">{children}</main>
          <CustomerFooter />
        </CartProvider>
      </body>
    </html>
  );
}

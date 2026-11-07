import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/warehouse/components/layout/app-shell";

export const metadata: Metadata = {
  title: "Kho vận | Quản lý nhà hàng",
  description: "Hệ thống quản lý kho và sản xuất MRP",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body><AppShell>{children}</AppShell></body></html>;
}

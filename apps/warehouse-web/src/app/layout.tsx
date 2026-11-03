import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "Admin Kho | Mộc Nhà hàng",
  description: "Hệ thống quản lý kho nguyên vật liệu",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body><AppShell>{children}</AppShell></body></html>;
}

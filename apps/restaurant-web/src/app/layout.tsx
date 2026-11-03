import type { Metadata } from "next";
import "./globals.css";
import Admin from "@/components/admin";

export const metadata: Metadata = { title: "Nhà hàng | Quản trị thành phẩm", description: "Quản lý thành phẩm, công thức và phê duyệt sản xuất" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body><Admin>{children}</Admin></body></html>;
}

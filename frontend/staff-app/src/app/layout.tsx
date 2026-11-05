/* eslint-disable @next/next/no-page-custom-font -- App Router root layout shares these fonts across all routes. */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { brand } from "@/config/brand";
export const metadata: Metadata = {
  title: `${brand.name} · Staff`,
  description: brand.description,
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0077b6",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

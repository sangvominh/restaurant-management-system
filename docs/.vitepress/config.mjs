import { defineConfig } from "vitepress";
import { readFileSync } from "node:fs";
const pages = JSON.parse(readFileSync(new URL("../navigation.json", import.meta.url), "utf8"));
const groups = [...new Set(pages.map((p) => p.group))];
export default defineConfig({
  lang: "vi-VN",
  title: "Restaurant OS",
  description: "Hướng dẫn chạy, kiến trúc, nghiệp vụ và kiểm thử hệ thống quản lý nhà hàng",
  srcDir: "content",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    siteTitle: "Restaurant OS",
    nav: [
      { text: "Trang chủ", link: "/" },
      { text: "Chạy dự án", link: "/bat-dau/chay-du-an" },
      { text: "Luồng chính", link: "/nghiep-vu/luong-nghiep-vu" },
      { text: "Yêu cầu ba môn", link: "/do-an/yeu-cau-ba-mon" },
      { text: "Duy trì website", link: "/duy-tri/xuat-ban" },
    ],
    sidebar: groups.map((group) => ({
      text: group,
      collapsed: group !== "Bắt đầu",
      items: pages
        .filter((p) => p.group === group)
        .map((p) => ({ text: p.title, link: p.path === "index.md" ? "/" : "/" + p.path.replace(/\.md$/, "") })),
    })),
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: "Tìm kiếm", buttonAriaLabel: "Tìm tài liệu" },
              modal: {
                noResultsText: "Không tìm thấy",
                resetButtonTitle: "Xóa tìm kiếm",
                footer: { selectText: "chọn", navigateText: "di chuyển", closeText: "đóng" },
              },
            },
          },
        },
      },
    },
    outline: { level: [2, 3], label: "Trong trang này" },
    docFooter: { prev: "Trang trước", next: "Đọc tiếp" },
    lastUpdated: { text: "Cập nhật từ Git" },
    sidebarMenuLabel: "Mục lục",
    returnToTopLabel: "Lên đầu trang",
    darkModeSwitchLabel: "Giao diện tối",
    footer: {
      message: "Tài liệu hệ thống quản lý nhà hàng",
    },
  },
});

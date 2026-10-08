---
id: BASE-7
specStatus: Nền tảng
codeStatus: Không biểu thị tiến độ code
owner: Nhóm dự án
reviewed: '2026-10-08'
summary: Xuất bản tài liệu
---

# Xuất bản tài liệu

Website được build từ thư mục `docs/`. Chạy `npm run build` trước khi push lên branch triển khai.

| Cấu hình | Cloudflare Pages | Cloudflare Workers Builds |
|---|---|---|
| Root directory | `docs` | `docs` |
| Build command | `npm run build` | `npm run build` |
| Output | `.vitepress/dist` | Theo `wrangler.jsonc` |
| Deploy command | Pages tự triển khai | `npx wrangler deploy` |
| Node | `NODE_VERSION=22` | `NODE_VERSION=22` |

Kết nối repo và chọn branch `main` trên Cloudflare. Nếu dùng Workers, tên Worker phải khớp `docs/wrangler.jsonc`. Chỉ ghi nhận URL công khai sau khi deployment thành công.

Sau khi triển khai, kiểm tra trang chủ, trang con và tìm kiếm. Nếu lỗi, xem log build/deploy; kiểm tra root directory, metadata, mục lục và liên kết.

Chỉ đặt nội dung được phép công khai trong `content/`.

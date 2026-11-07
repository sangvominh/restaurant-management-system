---
title: Duy trì website
description: Sửa tài liệu, kiểm tra và build website đã triển khai trên Cloudflare.
---

# Duy trì website

## Cập nhật nội dung

Sửa trang trong `docs/content/`. Riêng [Chạy dự án](/bat-dau/chay-du-an) lấy trực tiếp từ `README.md` ở root repository bằng Markdown include; sửa README để cập nhật cả hai nơi.

Mỗi trang có frontmatter `title` và `description`. Khi thêm hoặc xóa trang, cập nhật `docs/navigation.json` và các liên kết liên quan. Chỉ ghi nội dung đang cần và có căn cứ trong code hoặc đề môn học; không dùng tài liệu như kho lưu kế hoạch chưa chốt.

Trong thư mục `docs`:

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`build` kiểm tra metadata và mục lục, sau đó VitePress kiểm tra liên kết và xuất website vào `.vitepress/dist`. CI cũng chạy build khi nội dung docs hoặc README gốc thay đổi.

## Cấu hình Cloudflare hiện có

Giữ root directory là `docs`, build command là `npm run build`, Node.js 22 theo `.node-version`. Với Pages, output directory là `.vitepress/dist`. Với Workers Builds, cấu hình assets và tên Worker `restaurant-project-docs` nằm trong `wrangler.jsonc`; deploy command là `npx wrangler deploy`.

Sau khi deployment hoàn tất, kiểm tra trang chủ, trang con, menu và tìm kiếm. Nội dung đưa vào `content/` sẽ được xuất bản; không đưa `.env`, mật khẩu hoặc dữ liệu backup vào đây.

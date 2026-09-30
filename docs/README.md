# Cổng tài liệu Restaurant OS

Nguồn hiện hành: `content/`. Bắt đầu ở `content/start/read-first.md`.

```sh
cd docs
npm ci
npm run dev
```

- `npm run build`: kiểm tra, sinh bản tổng hợp và build website.
- `npm run preview`: xem bản build tại địa chỉ terminal in ra.
- `npm run export`: cập nhật `PROJECT_HANDBOOK.md` từ nguồn hiện hành.
- `navigation.json`: mục lục có chủ đích, không liệt kê file ngẫu nhiên.

Cloudflare Pages: root `docs`, build `npm run build`, output `.vitepress/dist`, production `main`, `NODE_VERSION=22`.

Đọc `content/contributing/cloudflare.md` để thiết lập lần đầu.

`archive/handbook-before-portal.md` lưu nguyên bản tài liệu trước khi chuyển cấu trúc. `project-handbook.html` là bản web một file cũ, không còn nguồn để cập nhật. Hai bản này không được VitePress xuất bản.

Bộ ngữ cảnh AI tối ưu token chưa được tạo; kế hoạch nằm ở `content/contributing/ai-context.md`.

# Tài liệu dự án

Nội dung website nằm trong `content/`, mục lục nằm trong `navigation.json`.

- [Phạm vi hiện tại](content/bat-dau/pham-vi.md).
- [Chạy dự án](../README.md): website lấy trực tiếp nội dung README này.
- [Kiến trúc và dữ liệu](content/bat-dau/kien-truc.md).
- [Luồng nghiệp vụ](content/nghiep-vu/luong-nghiep-vu.md).
- [Yêu cầu ba môn](content/do-an/yeu-cau-ba-mon.md).
- [Kiểm thử](content/duy-tri/kiem-thu.md).
- [Duy trì website và Cloudflare](content/duy-tri/xuat-ban.md).

Trong thư mục `docs`:

```sh
npm ci
npm run dev
npm run build
```

Build tạo website tại `.vitepress/dist`. Cấu hình Cloudflare Workers hiện có nằm trong `wrangler.jsonc`.

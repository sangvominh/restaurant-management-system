# restaurant-management-system

## Tài liệu dự án

Bắt đầu tại [Lộ trình đọc](docs/content/start/read-first.md). Nội dung hiện hành nằm trong `docs/content/`; bản tổng hợp được sinh tự động, không chỉnh sửa riêng.

```sh
cd docs
npm ci
npm run dev
```

- [Cách thêm/cập nhật tài liệu](docs/content/contributing/writing.md)
- [Mẫu đặc tả tính năng](docs/content/contributing/feature-template.md)
- [Hướng dẫn Cloudflare Pages](docs/content/contributing/cloudflare.md)

Chạy `npm run build` trong `docs` trước khi push. Cloudflare sẽ tự xuất bản khi kết nối GitHub được thiết lập; hiện chưa ghi nhận URL production.

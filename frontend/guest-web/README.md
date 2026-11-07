# Guest Web

Chạy từ root repository bằng `npm run dev:guest`, mở http://localhost:3005 . Đây là khung Next.js; trang hiện tại chưa triển khai nghiệp vụ khách hàng.

## Tài nguyên cần giữ

- `DESIGN.md`: token và quy tắc thiết kế.
- `stitch-screens/`: HTML và ảnh tham chiếu cho xác nhận bàn, giỏ hàng, gọi thêm món, trạng thái đơn và hóa đơn. Đây là tài liệu thiết kế, không phải trang đang được Next.js phục vụ.
- `app/`, `next.config.ts`, `package.json`, TypeScript và các cấu hình build: cần để phát triển ứng dụng.
- `public/next.svg`, `public/vercel.svg`: trang template hiện tại còn dùng.

Đã bỏ ba SVG mẫu không dùng và lockfile con. Cài các workspace bằng `npm ci` tại root, dùng package-lock.json chung.

Không coi trang template hoặc ảnh thiết kế là tính năng đã chạy. Xem [hướng dẫn kiểm thử toàn hệ thống](../../docs/TESTING.md).

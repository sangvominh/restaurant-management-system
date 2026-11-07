# Restaurant Staff Frontend

Next.js + React + TypeScript + Tailwind CSS. Thiết kế Ocean Blue Ops, tên thương hiệu lấy từ `src/config/brand.ts`.

## Xem giao diện trước

Yêu cầu Node.js 24 LTS (khuyến nghị), npm.

```sh
cd frontend/staff-app
npm ci
npm run dev -- --port 3003
```

Mở http://localhost:3003/preview/dashboard. Có đủ 11 màn hình; chọn bằng menu bên trái trên desktop hoặc hộp chọn trên đầu trang ở điện thoại. Màn hình đăng nhập mẫu: http://localhost:3003/preview/login.

Các route preview: `login`, `dashboard`, `tables`, `order`, `kitchen`, `payment`, `shift`, `order-detail`, `transfer`, `split`, `cancel` dưới `/preview/`.

**Đây là dữ liệu mẫu, không gọi API hoặc ghi nhận nghiệp vụ.** Giỏ món, bộ lọc, chọn bàn, phương thức thu tiền và phân bổ món chỉ thay đổi trạng thái giao diện. Nút gửi, thanh toán, bàn giao, hủy/đổi và phê duyệt hiển thị thông báo chưa kết nối. Không nhập thông tin đăng nhập thật vào trang preview.

Trên điện thoại cùng Wi-Fi, mở `http://<IP-LAN-của-MacBook>:3003/preview/dashboard`. Dev server lắng nghe `0.0.0.0`; không dùng `localhost` trên điện thoại. Cho phép Node qua macOS Firewall nếu đang chặn kết nối.

Ảnh món ăn tham chiếu các URL gốc từ Stitch; có hình dự phòng nếu không tải được. Font Inter và Material Symbols cần truy cập Google Fonts.

```sh
npm run lint
npm run typecheck
npm run build
```

`/staff` kết nối backend local. Xem hướng dẫn chạy PostgreSQL, backend, dữ liệu demo và frontend trong [README gốc](../../README.md).

## Trạng thái kiểm tra bản preview

- 11 route preview trả HTTP 200 và có nhãn dữ liệu mẫu.
- Đã xem giao diện trên trình duyệt, thử khung 390px và kiểm tra tăng số lượng món / thông báo chưa kết nối.
- ESLint đạt, không còn cảnh báo sau khi sửa cấu hình font trong root layout.
- Hiện trạng và cách kiểm thử bản tích hợp hiện tại: xem [README gốc](../../README.md) và [hướng dẫn test](../../docs/TESTING.md). Các kết quả preview ở trên không thay thế nghiệm thu nghiệp vụ.

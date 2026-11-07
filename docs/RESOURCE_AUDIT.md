# Rà soát DB, volume, backup, env và Guest — 07/11/2026

## Quyết định theo bằng chứng

| Nhóm | Hiện trạng | Xử lý |
| --- | --- | --- |
| `restaurant-integrated_postgres_data` | DB phát triển đang được backend dùng | Giữ nguyên; không reset |
| `restaurant-demo_postgres_data` và container/network `restaurant-demo` | Chỉ chứa dữ liệu seed v1, đã dừng, dựng lại được | Đã dọn bằng `npm run demo:clean` |
| `restaurant-management-system_postgres_data` | Volume dự án cũ, không gắn với container nào | Giữ vì chưa xác định nội dung; không kết luận dữ liệu vô giá trị chỉ từ việc không có container |
| Volume dự án khác (`tlc_*`, `todopractice_*`) | Ngoài hệ thống nhà hàng hiện tại | Không đụng tới |
| `demo_materials`, `demo_invoices`, `demo_stock_movements` trong DB phát triển | Cả ba có marker `system-admin-demo-v1`; view báo cáo hiện đã đọc nghiệp vụ thật | Dọn bằng migration có marker, transaction, không CASCADE; có checkpoint trước thao tác |
| `backups/*.dump` | Hai checkpoint khác nhau, không phải bản trùng | Giữ bản trước hợp nhất tài khoản và bản trước dọn bảng demo; tổng dung lượng dưới 1 MB |
| `backend/.env` | Compose dùng cho khóa JWT và cấu hình/bootstrap local | Giữ; không in nội dung hoặc đưa vào Git |
| `backend/.env.example` | Mẫu cấu hình cho thành viên mới | Giữ |
| `.env.example` tại root | Rỗng 0 byte; quy trình chỉ dùng backend/.env.example | Đã xóa sau khi leader duyệt |
| `backend/prisma/migrations/` | Toàn bộ chuỗi migration active, gồm 43 thư mục sau lần bổ sung này | Giữ; số lượng nhiều không phải lý do để xóa hoặc sửa checksum |
| `Guest DESIGN.md` và `stitch-screens/` | Token thiết kế, 5 cặp HTML/ảnh có nội dung riêng | Giữ cho bước triển khai Guest; không tính là tính năng đang chạy |
| Guest `public/next.svg`, `public/vercel.svg` | Trang template còn import trực tiếp | Giữ cho tới khi thay trang template |
| Guest `file.svg`, `globe.svg`, `window.svg` | Không tìm thấy tham chiếu trong app hiện tại | Đã xóa sau khi leader duyệt |
| Lockfile con Guest/Staff | Root package-lock.json đã quản lý các workspace | Đã xóa bản con; giữ root lockfile |
| `.next`, `dist`, `node_modules`, tsbuildinfo local | Có thể tái tạo, đã được Git ignore | Không coi là source cần lưu; chưa xóa cache/dependencies vì sẽ phải tạo lại khi test |

Không có lý do để xóa migration active hoặc cấu hình cần chạy chỉ để làm thư mục trông ít file hơn. Không chạy Docker volume prune vì máy còn các dự án khác.

## Hai bản backup cần giữ

- `restaurant_dev-2026-11-07T04-47-09-374Z.dump`: checkpoint trước hợp nhất tài khoản/công thức và nâng cấp nền tảng.
- `restaurant_dev-2026-11-07T05-13-45-794Z.dump`: checkpoint sau nâng cấp, trước dọn ba bảng báo cáo mẫu.

Hai tệp nằm trong backups đã được Git ignore. Chỉ cân nhắc bỏ checkpoint cũ sau khi thống nhất thời gian giữ và đã nghiệm thu khả năng phục hồi; chúng có cấu trúc DB khác nhau, không phải hai lần lưu vô nghĩa.

## Sáu file đã xóa theo phê duyệt

Leader đã duyệt rõ danh sách sáu file dưới đây; đã xóa đúng phạm vi, không có file nào ngoài danh sách:

1. `.env.example` (ở root, rỗng).
2. `frontend/guest-web/public/file.svg`.
3. `frontend/guest-web/public/globe.svg`.
4. `frontend/guest-web/public/window.svg`.
5. `frontend/guest-web/package-lock.json`.
6. `frontend/staff-app/package-lock.json`.

Volume DB cũ, backup, `.env` thật và tài nguyên thiết kế Guest được giữ nguyên.

## Kiểm thử sau dọn

- `npm run check` đạt: build, 52 unit và 50 E2E; TypeScript ba frontend đạt. 18 ca integration legacy vẫn skip, chưa được tính là PASS.
- Hai ca E2E mới kiểm tra xóa đúng bảng có marker và giữ nguyên bảng cùng tên không có marker.
- Xác minh DB thật sau áp dụng: 43 migration hoàn tất; cả ba bảng demo không còn; hai view báo cáo vẫn đọc dữ liệu nghiệp vụ. Backend/DB healthy. Không còn container/volume restaurant-demo.
- Cả hai dump đều được pg_restore đọc danh mục archive thành công; đây là kiểm tra cấu trúc backup, chưa phải diễn tập phục hồi toàn bộ.
- Sau khi xóa sáu file đã duyệt: npm ci dry-run dùng root lockfile đạt; TypeScript của Guest và Staff đạt. Root lockfile, cấu hình backend, 43 migration active và thiết kế Guest được giữ nguyên.
- Hướng dẫn chạy test tự động, browser, kiểm thử thủ công và các phần UI chưa triển khai: [TESTING.md](TESTING.md).

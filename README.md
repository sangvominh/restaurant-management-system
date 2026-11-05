# Restaurant Management System

Bản tích hợp `feat/restaurant_v2` gồm ba giao diện riêng, dùng chung Backend:

| Phân hệ | Thư mục | Cổng |
| --- | --- | --- |
| Admin Kho | `frontend/warehouse-web` | 3001 |
| Admin Nhà hàng | `frontend/restaurant-web` | 3002 |
| Nhân viên | `frontend/staff-app` | 3003 |
| Backend NestJS + Prisma | `backend` | 3000 |

Xem [hướng dẫn tích hợp, kiểm thử và các luồng chưa liên thông](README_INTEGRATION.md).

Hao hụt/hoàn trả Staff → Admin Kho: [kết quả nối cùng bản ghi và kiểm thử DB test](README_SHARED_MATERIAL_ADJUSTMENTS.md).

**Chưa chạy migration/seed lên DB dùng chung.** Cần thống nhất Product/BOM và contract xuất/báo lỗi thành phẩm trước khi kiểm thử thông suốt. Không tự chạy script reset/setup demo vào DB dùng chung.

Tài liệu phân hệ: [Warehouse](README_WAREHOUSE_COMPLETION.md), [contract Warehouse–Staff](README_WAREHOUSE_STAFF_CONTRACT.md), [Staff](frontend/staff-app/README.md).

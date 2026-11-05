# Restaurant Management System

Bản tích hợp `feat/restaurant_v2` gồm ba giao diện riêng, dùng chung Backend:

| Phân hệ | Thư mục | Cổng |
| --- | --- | --- |
| Admin Kho | `apps/warehouse-web` | 3001 |
| Admin Nhà hàng | `apps/restaurant-web` | 3002 |
| Nhân viên | `frontend` | 3003 |
| Backend NestJS + Prisma | `backend` | 3000 |

Xem [hướng dẫn tích hợp, kiểm thử và các luồng chưa liên thông](README_INTEGRATION.md).

**Chưa chạy migration/seed lên DB dùng chung.** Cần thống nhất Product/BOM và contract hao hụt/hoàn trả, xuất/báo lỗi thành phẩm trước khi kiểm thử thông suốt. Không tự chạy script reset/setup demo vào DB dùng chung.

Tài liệu phân hệ: [Warehouse](README_WAREHOUSE_COMPLETION.md), [contract Warehouse–Staff](README_WAREHOUSE_STAFF_CONTRACT.md), [Staff](frontend/README.md).

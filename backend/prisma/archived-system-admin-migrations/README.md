# Migration trùng lịch sử

Các migration ở đây được giữ nguyên từ `feat/system-admin`, nhưng không được Prisma chạy lại.
`develop` đã có baseline và các migration kho tương đương ở thời điểm sớm hơn
(xem `docs/warehouse-migration-map.json`). Chạy cả hai bộ sẽ tạo trùng bảng.

Bộ đang hoạt động ở `../migrations` dùng lịch sử develop, bổ sung bảng System Admin
với tên `system_admin_categories` ngay từ đầu và thêm portal mà không đổi tên bảng
`categories` của kho. Cấu hình tích hợp dùng volume Docker riêng, dành cho DB local mới.
Không dùng bộ này để tự động nâng cấp DB cũ của nhánh system-admin; cần đối chiếu
`_prisma_migrations` và lập phương án chuyển đổi riêng trước.

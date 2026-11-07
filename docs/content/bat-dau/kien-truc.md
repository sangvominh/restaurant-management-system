---
title: Kiến trúc và dữ liệu
description: Một backend, một database, frontend độc lập và các nguồn dữ liệu nghiệp vụ.
---

# Kiến trúc và dữ liệu

## Ranh giới ứng dụng

`backend/` là API NestJS duy nhất, kết nối PostgreSQL bằng Prisma. Mỗi thư mục ứng dụng trong `frontend/` có code, dependency và lockfile riêng; không dùng npm Workspaces hoặc import code từ frontend khác.

Bốn web quản lý gọi API qua `NEXT_PUBLIC_API_URL`. Staff dùng proxy Next.js với `API_INTERNAL_URL`; cả API nhân viên và API kho đều trỏ về cùng backend. Guest hiện chưa có luồng API nghiệp vụ.

Docker Compose chỉ có `db` và `backend`. Build backend chỉ dùng thư mục `backend/`. Migration và seed chạy thủ công; bật API không tự thay đổi schema hoặc nạp dữ liệu. Xem [cách chạy](/bat-dau/chay-du-an) để biết lệnh và cổng của từng web.

## Tài khoản và quyền

- `Account` liên kết `Role`; nhân viên vận hành có `StaffUser` liên kết tài khoản, vị trí và chi nhánh.
- Bốn web quản lý lưu phiên riêng. Backend xác minh tài khoản, phiên và quyền; không tin quyền do frontend tự gửi.
- System Admin được xác định bằng vai trò hệ thống và quyền `*`. API `/api/admin/*` chỉ dành cho System Admin.
- Giá trị portal `warehouse` ở backend hiện phục vụ cả vai trò Kho và Nhà hàng; hai frontend vẫn độc lập.
- Đổi mật khẩu, khóa tài khoản hoặc đổi quyền sẽ thu hồi các phiên liên quan. Seed không ghi đè mật khẩu và quyền đã có.

Quyền cụ thể nằm trong `backend/src/common/permissions.ts` và khai báo trên controller. Không duy trì một ma trận API sao chép riêng dễ lệch code.

## Nguồn dữ liệu

| Phần | Nguồn chính |
| --- | --- |
| Tài khoản và quyền | `accounts`, `roles`, `login_logs` |
| Nhân viên | `staff_users` liên kết `accounts` |
| Kho nguyên liệu | Material, lô, số dư và `inventory_movements` |
| Sản phẩm và công thức | Product, Bom, BomDetail; MenuItem liên kết BOM |
| Bán hàng | Invoice, StaffOrder, OrderLine, Payment |
| Kho bếp | Các bảng `staff_kitchen_*` và sổ phân bổ theo nguồn lĩnh |
| Báo cáo | View đọc giao dịch thanh toán và biến động kho |

Kho chính và kho bếp là hai nơi giữ tồn trong cùng database. Cấp nguyên liệu từ kho cho bếp là chuyển tồn; không ghi thêm một lần trừ cho cùng sự kiện.

## Prisma, migration và seed

- Cấu hình: `backend/prisma.config.ts`; schema: `backend/prisma/schema.prisma`.
- Giữ lịch sử trong `backend/prisma/migrations` để dựng DB mới và nâng cấp DB đã có.
- Các model kho bếp có `@@ignore` vẫn được SQL trực tiếp hoặc trigger DB sử dụng.
- Migration `20261107000400_remove_unused_staff_inventory` dọn năm bảng ledger Ingredient/StockBatch cũ. Nếu còn bản ghi, migration dừng để dữ liệu được xử lý trước.
- `backend/src/prisma/seed.ts` tạo Admin, vai trò và dữ liệu nền tối thiểu. Fixture trong `backend/test/fixtures` chỉ dành cho DB kiểm thử.

## Sao lưu

Backup JSON của Admin chứa dữ liệu quản trị và mật khẩu băm; không chứa toàn bộ kho, đơn hàng hoặc hóa đơn. Muốn sao lưu toàn PostgreSQL phải dùng công cụ database như `pg_dump`. Volume PostgreSQL giữ dữ liệu khi dừng hoặc tạo lại container; không xóa volume để cập nhật code.

# Danh sách chờ xóa sau chuẩn hóa

Bộ duyệt tự động đã từ chối lệnh xóa diện rộng. **Chưa xóa các đường dẫn dưới đây.** Các ứng dụng cũ đã bị loại khỏi npm workspaces, các lệnh seed cũ bị bỏ khỏi package.json; quy trình chính thức chỉ dùng README gốc. Không dùng các file cũ để chạy hoặc nạp dữ liệu.

Phạm vi xin xóa chỉ là mã nguồn/tài liệu cũ trong repository; không gồm database/volume đang dùng, backups, `.env`, `.git` hoặc tài nguyên thiết kế của Guest. Git giữ lịch sử mã nguồn.

## Ứng dụng/bản đóng gói trùng

- `frontend/warehouse-web/` (toàn bộ thư mục; quản trị kho chính thức ở web-admin-system/warehouse).
- `frontend/restaurant-web/` (toàn bộ thư mục; màn hình mới đã chuyển vào web-admin-system/app/warehouse/restaurant).
- `frontend/web-admin-system/Dockerfile` (frontend chạy local).
- `frontend/web-admin-system/app.zip` (bản đóng gói trùng source).
- `backend/tsconfig.build.tsbuildinfo` (artifact build đã có trong gitignore).

## Đường chạy Docker và seed cũ

- `docker-compose.apps.yml` (đã gộp backend vào docker-compose.yml duy nhất).
- `scripts/docker-apps.mjs`.
- `scripts/staff-compose-seed.sh`.
- `scripts/staff-demo-reset.sh`.
- `scripts/staff-demo-setup.sh`.
- `scripts/report-views-contract.sql` (template đã thay bằng migration view thật).
- `scripts/db-backup.sh`, `scripts/db-restore.sh` (cấu hình container cũ; backup chính thức là db:backup).
- `backend/prisma/seed.ts`, `backend/prisma/seed.js`.
- `backend/prisma/seed-inventory.sql`, `backend/prisma/seed-restaurant-web.sql`.
- `backend/prisma/staff-demo-cases.sql`, `backend/prisma/staff-demo-kitchen.sql`, `backend/prisma/staff-demo-menu.sql`, `backend/prisma/staff-demo-production.sql`, `backend/prisma/staff-demo-roles.sql`.
- `backend/scripts/check-staff-warehouse-contract.mjs`, `backend/scripts/check-staff-warehouse-material-issues.mjs` (thay bằng test fixtures/E2E).
- `backend/scripts/dev-staff-warehouse.mjs`, `backend/scripts/feedback-demo-decision.ts`.
- `backend/scripts/seed-staff-warehouse-demo.mjs`, `backend/scripts/seed-staff-warehouse-samples.mjs`.
- `backend/src/report/report.demo.ts` (HTTP/UI demo đã bỏ; không còn import).
- `backend/prisma/archived-system-admin-migrations/` (toàn bộ thư mục, là bản sao trùng; không phải migration active).

## Giữ lại

- `backend/prisma/migrations/`: lịch sử migration active, cần để dựng DB mới và nâng cấp DB đang dùng.
- `backend/scripts/docker-init.mjs`: chỉ migrate.
- `backend/scripts/database.mjs`: bootstrap hoặc demo có kiểm tra môi trường.
- `backend/src/prisma/seed-admin.ts`, `backend/src/prisma/seed-demo.ts`: hai nguồn dữ liệu có chủ đích.
- `scripts/project.mjs`, `scripts/check.mjs`: giao diện vận hành/check chính thức.
- Test và tài liệu nghiệp vụ/handbook có nội dung riêng: không xóa chỉ vì không được runtime import.

Việc xóa file chờ duyệt không thay đổi dữ liệu trong PostgreSQL. Các bảng demo báo cáo cũ trong DB phát triển cũng chưa bị xóa; đã ngừng sử dụng để tránh nhầm với báo cáo giao dịch thật.

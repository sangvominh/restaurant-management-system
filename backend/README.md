# Backend System Admin

NestJS + Prisma 7.10.1 + PostgreSQL, ESM/NodeNext và Vitest; tương thích nền develop tại `7c70254`.

Hướng dẫn migration, phân quyền và hợp đồng báo cáo: [System Admin Prisma](../docs/system-admin-prisma.md).

## Chạy cả backend, frontend và database bằng Docker

Mở Docker Desktop, chuẩn bị `backend/.env` nếu chưa có (xem [hướng dẫn Docker](../docs/docker.md)), dừng backend/frontend npm cũ rồi chạy tại thư mục gốc:

```powershell
npm.cmd run docker:up
```

Mở http://localhost:3000/login. Lệnh tự dùng override giữ dữ liệu trên máy nếu có, áp dụng migration và chỉ seed khi chưa có Admin dùng được. Không cần mở hai terminal chạy backend/frontend nữa. Xem trạng thái bằng `npm.cmd run docker:ps`, dừng bằng `npm.cmd run docker:stop`.

## Chạy phát triển bằng npm trên máy

`docker-compose.yml` dùng nguyên cấu hình nhóm: PostgreSQL 17.11, service `db`, cổng `127.0.0.1:5433`, database `restaurant_dev`. File chính này chỉ chạy database; cách dưới đây chạy backend/frontend bằng npm. Bản Docker đầy đủ dùng thêm `docker-compose.apps.yml` qua các script ở trên.

Nếu đã có volume PostgreSQL 16 từ bản cũ hoặc dữ liệu System Admin PostgreSQL 17 cần giữ, xem mục Docker trong [hướng dẫn](../docs/system-admin-prisma.md#docker-dùng-chung-với-nhóm) trước khi chạy. Không dùng dữ liệu PostgreSQL 16 để khởi động PostgreSQL 17. Máy đã có dữ liệu 17 có thể dùng `docker-compose.override.yml` riêng để giữ đúng volume; file này không được commit.

Tại thư mục gốc:

```sh
npm ci
docker compose up -d --wait
```

Nếu chưa có `backend/.env`, sao chép từ `backend/.env.example`, đặt `JWT_SECRET`, `SEED_ADMIN_EMAIL` và `SEED_DEFAULT_PASSWORD` riêng. Kết nối database từ backend chạy trên máy:

```env
DATABASE_URL=postgresql://restaurant:local_dev_only@127.0.0.1:5433/restaurant_dev?schema=public
```

Nếu đã có `.env`, giữ các thiết lập riêng và chỉ kiểm tra kết nối; không chép đè file đang dùng.

Trong `backend/`, với database Prisma mới:

```sh
npm run db:migrate
npm run prisma:generate
npm run db:seed
npm run start:dev
```

Backend cổng 3001; frontend cổng 3000. Trong PowerShell dùng `npm.cmd` nếu execution policy chặn `npm.ps1`.

Portal và mọi API `/api/admin/*` chỉ dành cho System Admin. Vai trò thường chỉ được cấp các quyền nghiệp vụ qua checkbox; mặc định theo phân công kho, nhà hàng, nhân viên và khách hàng. API login chung vẫn xác thực các tài khoản khác để các app nghiệp vụ dùng sau khi tích hợp.

Nếu đã chạy bản Prisma trước đó, dừng server, chạy `npm run db:migrate`, rồi khởi động lại và đăng nhập lại. Migration mới chuyển các mặc định cũ, bảo toàn quyền nghiệp vụ đã tùy chỉnh và thu hồi phiên cũ. Xem tài liệu để biết chi tiết chuyển khóa quyền.

Không chạy migration mới trực tiếp lên database TypeORM cũ; xem hướng dẫn chuyển đổi trước. Database develop đã có bảng chi nhánh/bàn cần kiểm tra và đánh dấu baseline theo tài liệu.

## Kiểm tra

```sh
npm run prisma:validate
npm run build
npm test
npm run test:e2e
npm run lint
```

E2E dùng PostgreSQL trong bộ nhớ, không cần Docker hay database thật. Bộ test kiểm tra tài khoản, quyền, thu hồi JWT, phục hồi quản trị và báo cáo từ hai view dùng chung.

## Báo cáo

`GET /api/admin/reports/revenue`, `/stock`, `/stock/materials` đọc `public.v_report_revenue` và `public.v_report_stock`. Khi chưa nối nguồn thật, API trả `ready:false`. Mẫu SQL nằm trong `scripts/report-views-contract.sql` ở thư mục gốc. Không tự nạp dữ liệu demo lúc khởi động.

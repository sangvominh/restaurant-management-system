# Backend System Admin

NestJS + Prisma 7.10.1 + PostgreSQL, ESM/NodeNext và Vitest; tương thích nền develop tại `7c70254`.

Hướng dẫn migration, phân quyền và hợp đồng báo cáo: [System Admin Prisma](../docs/system-admin-prisma.md).

## Bắt đầu

Tại thư mục gốc:

```sh
npm ci
docker compose -f docker-compose.system-admin.yml up -d
```

Sao chép `backend/.env.example` thành `backend/.env`, đặt `DATABASE_URL`, `JWT_SECRET`, `SEED_ADMIN_EMAIL` và `SEED_DEFAULT_PASSWORD` riêng.

Trong `backend/`, với database Prisma mới:

```sh
npm run db:migrate
npm run prisma:generate
npm run db:seed
npm run start:dev
```

Backend cổng 3001; frontend cổng 3000. Trong PowerShell dùng `npm.cmd` nếu execution policy chặn `npm.ps1`.

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

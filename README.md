# Restaurant Management System

Một backend NestJS và một PostgreSQL chạy bằng Docker Compose. Sáu frontend Next.js độc lập gọi về backend này: Admin server, Nhân sự, Kho, Bán hàng, Staff và Guest.

## Chạy lần đầu

Cần Node.js 24, npm và Docker Desktop. Các lệnh Docker bên dưới chạy từ root repository.

Nếu chưa có backend/.env, copy backend/.env.example thành backend/.env. Đặt JWT_SECRET, SEED_ADMIN_EMAIL và SEED_DEFAULT_PASSWORD trong file;
lệnh tạo JWT_SECRET, (chạy lệnh để tạo và copy vào .env)

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

```powershell
# 1. Bật PostgreSQL.
docker compose up -d db

# 2. Build image backend: cài dependency và biên dịch TypeScript.
docker compose build backend

# 3. Bạn chủ động áp dụng migration vào DB.
docker compose run --rm backend npm run db:migrate

# 4. Chỉ khi cần tạo tài khoản chủ và dữ liệu nền tối thiểu.
docker compose run --rm backend npm run db:seed

# 5. Bật API.
docker compose up -d backend
```

## Chạy hằng ngày

```powershell
docker compose up -d db
docker compose up -d backend
```

Chỉ chạy lại docker compose build backend khi sửa code hoặc dependency backend; sau đó docker compose up -d backend. Chỉ chạy db:migrate khi có migration mới. Backend hiện chạy node dist/main.js, không có watch/hot reload trong Docker.

Frontend: mở terminal trong thư mục web cần làm, chạy `npm ci` lần đầu rồi `npm run dev`. Chỉ cần cài và mở web bạn đang làm. Cổng mặc định đã đặt trong package.json của từng web.

| Web | Thư mục terminal | Địa chỉ |
| --- | --- | --- |
| Admin server | frontend/web-admin-system | `http://localhost:3004/login` |
| Nhân sự | frontend/hr-web | `http://localhost:3006/login` |
| Kho | frontend/warehouse-web | `http://localhost:3001/login` |
| Bán hàng | frontend/sales-web | `http://localhost:3002/login` |
| Nhân viên | frontend/staff-app | `http://localhost:3003/staff/login` |
| Khách | frontend/guest-web | `http://localhost:3005` |

Các web quản lý gọi API `http://localhost:3000`; có thể copy `.env.example` thành `.env.local` để đổi `NEXT_PUBLIC_API_URL`. Staff dùng `API_INTERNAL_URL` để proxy cả API Staff và API kho về cùng backend. Bỏ biến API 3010 cũ trong terminal hoặc .env.local nếu còn. Guest hiện vẫn là template, chưa có luồng gọi API nghiệp vụ.

Ví dụ chạy riêng web Kho từ root, tương tự cho các giao diện khác:

```powershell
cd frontend/warehouse-web
npm ci
npm run dev
```
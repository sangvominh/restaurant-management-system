# Restaurant Management System

Bản tích hợp local trên `develop`: đã merge `feat/system-admin` rồi `feat/warehouse_ver2`, ưu tiên incoming khi conflict. Xem [đánh giá 6 phân hệ](docs/PROJECT_STATUS.md) trước khi tiếp tục phát triển.

## Cách chạy thống nhất

Backend NestJS và PostgreSQL chạy bằng Docker Compose. Các frontend Next.js chạy local. Cần Node.js 24 LTS, npm và Docker Desktop đã bật Linux engine.

Chạy mọi lệnh dưới đây tại thư mục gốc repository, trừ khi có ghi khác.

### 1. Chuẩn bị môi trường

PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Chỉ copy nếu chưa có `backend/.env`. Gán chuỗi vừa tạo vào `JWT_SECRET`, đổi `SEED_ADMIN_EMAIL` và `SEED_DEFAULT_PASSWORD` (ít nhất 8 ký tự). Không commit `.env`. Compose tự thay `DATABASE_URL` sang hostname `db`; URL `127.0.0.1:5433` trong file mẫu dành cho công cụ chạy từ máy host.

### 2. Chạy backend + DB

```powershell
npm run docker:up
npm run docker:ps
```

Hoặc dùng Compose trực tiếp:

```powershell
docker compose -f docker-compose.yml -f docker-compose.apps.yml up -d --build --wait --wait-timeout 180
```

Mặc định chỉ chạy `db`, `backend-init`, `backend`. Frontend Docker cũ nằm trong profile `legacy-frontend`, không bật trong quy trình này.

`backend-init` chạy migration, tạo các vai trò và tài khoản System Admin đầu tiên từ `.env`. Lần chạy sau giữ nguyên tài khoản/mật khẩu và quyền đã có. Job init kết thúc với mã 0 là bình thường; backend và DB phải healthy.

- API/health: http://localhost:3000/ (trả `Hello World!`).
- PostgreSQL từ máy host: `127.0.0.1:5433`, database `restaurant_dev`, user `restaurant`, password `local_dev_only`.
- Compose project: `restaurant-integrated`, volume: `restaurant-integrated_postgres_data`. Đây là DB local tích hợp riêng, không tự lấy dữ liệu từ volume của nhánh cũ.
- Đổi cổng host nếu cần: `$env:DB_PORT="5434"` hoặc `$env:API_PORT="3010"` trước khi chạy. Nếu đổi API_PORT, cập nhật các biến frontend bên dưới và khởi động lại frontend.

Bộ migration đã hợp nhất hai lịch sử cho DB local mới; các bản tạo bảng trùng được giữ tại `backend/prisma/archived-system-admin-migrations`. Không áp dụng tự động vào DB đang dùng từ nhánh khác. Xem [ghi chú migration](backend/prisma/archived-system-admin-migrations/README.md). Không cần reset DB hay dùng `db push` để khởi động.

### 3. Chạy frontend local

```powershell
npm ci
```

Mở terminal riêng cho mỗi giao diện cần xem:

| Phân hệ | Lệnh từ root | Địa chỉ | Lưu ý |
| --- | --- | --- | --- |
| Admin hệ thống | `npm run dev:system` | http://localhost:3004/login | Đăng nhập bằng email/mật khẩu seed trong `.env` |
| Kho/nhà hàng có JWT | dùng cùng `dev:system` | http://localhost:3004/warehouse | Tài khoản portal `warehouse`; tạo từ quản trị hệ thống |
| Admin kho riêng | `npm run dev:warehouse` | http://localhost:3001 | Giao diện cũ; chưa truyền JWT, API có thể trả 401 |
| Admin nhà hàng riêng | `npm run dev:restaurant` | http://localhost:3002 | Chưa nối đăng nhập JWT; API có thể trả 401 |
| App nhân viên (web) | `npm run dev:staff` | http://localhost:3003/staff/login | Dùng `staff_users`/cookie, chưa dùng tài khoản admin |
| Web khách | `npm run dev:guest` | http://localhost:3005 | Hiện là trang khởi tạo Next.js |

App khách native/mobile riêng chưa có trong checkout tích hợp. App nhân viên có trang thiết kế tại `/preview/dashboard`; `/staff/login` mới là luồng dùng API. DB mới chỉ seed System Admin và vai trò, chưa có chi nhánh, nguyên liệu, menu, nhân viên hay dữ liệu giao dịch demo. Không coi trang preview là nghiệp vụ đã chạy.

Frontend mặc định trỏ đến API `3000`. Khi đổi cổng API, tạo `.env.local` trong frontend tương ứng:

```dotenv
# frontend/web-admin-system/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3000

# frontend/warehouse-web/.env.local và frontend/restaurant-web/.env.local
API_BASE_URL=http://localhost:3000

# frontend/staff-app/.env.local
API_INTERNAL_URL=http://127.0.0.1:3000
```

Mỗi file chỉ cần biến của chính frontend đó. Staff proxy giữ URL `/api/auth/*` ở trình duyệt và chuyển sang `/api/staff-auth/*` để không trùng đăng nhập JWT của admin. Các endpoint `/api/staff/*` vẫn kiểm tra cookie và quyền nhân viên.

### 4. Kiểm tra và dừng

```powershell
Invoke-RestMethod http://localhost:3000/
npm run docker:logs
npm run docker:stop
npm run docker:down
```

`docker:stop` giữ container; `docker:down` bỏ container/network và giữ volume dữ liệu. Không thêm `-v` nếu cần giữ DB. Frontend dừng bằng Ctrl+C trong terminal tương ứng.

Nếu DB/API không healthy, xem log của job init trước:

```powershell
docker compose -f docker-compose.yml -f docker-compose.apps.yml logs --tail 100 backend-init backend db
```

Lỗi cổng bận: đổi cổng host hoặc dừng tiến trình/container đang chiếm cổng. Lỗi migration trên DB cũ: dừng lại và kiểm tra lịch sử `_prisma_migrations`; không tự xóa dữ liệu hay đánh dấu migration đã chạy.

## Kiểm tra mã nguồn

```powershell
npm run build --workspace backend
npm run test --workspace backend
npm run test:e2e --workspace backend
npm run typecheck --workspace warehouse-web
npm run typecheck --workspace restaurant-web
npm run typecheck --workspace restaurant-staff
npx tsc --noEmit -p frontend/web-admin-system/tsconfig.json
```

E2E System Admin dùng PostgreSQL nhúng PGlite, không dùng DB Compose. Một số test Staff cần DB integration riêng và có điều kiện skip; xem kết quả thực tế trong [báo cáo](docs/PROJECT_STATUS.md).

Các README cũ mô tả từng lần bàn giao và có thể dùng cổng/auth trước merge. Với bản tích hợp hiện tại, dùng README này làm hướng dẫn chạy chính.

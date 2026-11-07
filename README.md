# Restaurant Management System

Backend NestJS chia module, một PostgreSQL và một hệ tài khoản. Backend + DB chạy Docker; frontend chạy local. Nguồn chuẩn về kiến trúc và dữ liệu: [FOUNDATION.md](docs/FOUNDATION.md).

## Chạy môi trường phát triển

Cần Node.js 24 LTS, npm và Docker Desktop dùng Linux engine. Chạy lệnh từ root repository.

```powershell
npm ci
# Chỉ copy nếu chưa có backend/.env:
Copy-Item backend/.env.example backend/.env
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Trong `backend/.env`, đặt `JWT_SECRET` bằng chuỗi ngẫu nhiên, `SEED_ADMIN_EMAIL` và `SEED_DEFAULT_PASSWORD` của chủ hệ thống. Không commit file này.

```powershell
npm run dev:up
npm run db:bootstrap
npm run dev:status
```

`dev:up` build image, chạy migration và khởi động API/DB. **Không seed khi khởi động.** `db:bootstrap` tạo dữ liệu nền và chủ hệ thống đầu tiên; chạy lại giữ mật khẩu, quyền và tài khoản đã có.

Mở terminal riêng cho frontend cần dùng:

| Lệnh | URL | Phạm vi |
| --- | --- | --- |
| `npm run dev:admin` | http://localhost:3004/login | Một cổng quản trị cho hệ thống, kho và nhà hàng |
| `npm run dev:staff` | http://localhost:3003/staff/login | Nhân viên: phục vụ, bếp, pha chế, thu ngân, quản lý ca |
| `npm run dev:guest` | http://localhost:3005 | Khung web khách, chưa có nghiệp vụ khách hoàn chỉnh |

Chủ hệ thống vào `/`, `/warehouse` và `/warehouse/restaurant` bằng cùng phiên đăng nhập. Kho/nhà hàng đăng nhập tại `/login`, chức năng hiển thị theo quyền. Tạo tài khoản có quyền `staff:access` và hồ sơ nhân viên (mã, vị trí, chi nhánh) tại trang Tài khoản để dùng Staff. Staff đăng nhập bằng email hoặc mã nhân viên, dùng cùng mật khẩu; khóa/đổi mật khẩu/đổi quyền từ quản trị sẽ thu hồi phiên.

API: http://localhost:3000/ . PostgreSQL host: `127.0.0.1:5433`, database `restaurant_dev`, user `restaurant`, password local `local_dev_only`. `backend-init` exit 0 là bình thường; `db` và `backend` cần healthy. Compose project/volume vẫn là `restaurant-integrated` / `restaurant-integrated_postgres_data`.

## Demo chung, dựng lại được

Demo dùng project **restaurant-demo** riêng, API `3010`, DB `5434`, database `restaurant_demo`. Lệnh dưới xóa và dựng lại **chỉ volume demo**, không sửa DB phát triển:

```powershell
$env:DEMO_PASSWORD = 'mat-khau-local-cua-ban-it-nhat-8-ky-tu'
npm run demo:rebuild
```

Demo v1 có 1 chi nhánh, 1 bàn, 1 kho, nhà cung cấp, gạo 20 kg có phiếu nhập và sổ biến động, món cơm giá 15.000đ và BOM 0,1 kg/phần. Tồn bếp và hóa đơn ban đầu trống: phải yêu cầu/duyệt cấp NVL, chế biến và thu tiền qua nghiệp vụ thật.

| Email | Vai trò / mã Staff |
| --- | --- |
| `owner@demo.local` | Chủ hệ thống |
| `warehouse@demo.local` | Quản lý kho |
| `restaurant@demo.local` | Quản lý nhà hàng |
| `service@demo.local` | Phục vụ / `SERVICE` |
| `kitchen@demo.local` | Bếp / `KITCHEN` |
| `cashier@demo.local` | Thu ngân / `CASHIER` |
| `supervisor@demo.local` | Quản lý ca / `SUPERVISOR` |

Tất cả dùng mật khẩu bạn vừa đặt trong `DEMO_PASSWORD`. Không có mật khẩu demo hardcode.

Để frontend dùng API demo, tạo các file local (đã được Git ignore):

```dotenv
# frontend/web-admin-system/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3010
```

```dotenv
# frontend/staff-app/.env.local
API_INTERNAL_URL=http://127.0.0.1:3010
```

Khởi động lại frontend sau khi đổi env. Xóa hai file local này hoặc đổi về cổng `3000` để quay lại DB phát triển.

## Lệnh vận hành chính thức

| Lệnh | Tác động |
| --- | --- |
| `npm run dev:up` | Build và khởi động backend/DB phát triển; áp dụng migration |
| `npm run dev:status` | Trạng thái container phát triển |
| `npm run dev:logs` | Theo dõi log; Ctrl+C để thoát |
| `npm run dev:stop` | Dừng container phát triển, giữ dữ liệu |
| `npm run dev:down` | Bỏ container/network phát triển, giữ volume |
| `npm run db:migrate` | Chạy job migration từ image đã build |
| `npm run db:bootstrap` | Tạo dữ liệu nền và chủ hệ thống; không nạp demo |
| `npm run db:backup` | Sao lưu đầy đủ DB phát triển vào `backups/*.dump` |
| `npm run demo:rebuild` | Dựng lại môi trường demo riêng |
| `npm run demo:stop` | Dừng demo, giữ volume |
| `npm run check` | Build, unit/E2E, TypeScript các frontend chính thức |

Frontend dừng bằng Ctrl+C. Kiểm tra API bằng `Invoke-RestMethod http://localhost:3000/`. Nếu migration lỗi, xem `dev:logs`; không tự reset DB hoặc đánh dấu migration đã chạy. Backup JSON trong giao diện chỉ phục vụ dữ liệu quản trị; bản dump từ `db:backup` mới gồm toàn bộ nghiệp vụ.

## Quy tắc dữ liệu và phát triển

- Bootstrap: `backend/src/prisma/seed-admin.ts`. Demo duy nhất: `backend/src/prisma/seed-demo.ts`.
- Test tự tạo fixture; bộ E2E nền tảng dùng PostgreSQL nhúng PGlite, không dùng DB Compose. Một số test integration cũ có điều kiện skip khi không có DB test riêng; xem [giới hạn và kiểm chứng](docs/FOUNDATION.md).
- Không nạp demo qua HTTP hoặc trang Báo cáo. Báo cáo đọc thanh toán và sổ biến động kho thật.
- Thay đổi schema có migration; thay đổi API cập nhật nơi gọi và test trong cùng thay đổi. Không seed/reset DB dùng chung từ nhánh cá nhân.
- Chỉ có 3 frontend trong npm workspace. Các bản standalone kho/nhà hàng và script cũ đã được xóa theo [nhật ký dọn dẹp](docs/CLEANUP_PENDING.md).

Tài liệu bàn giao trước đợt chuẩn hóa là tài liệu lịch sử. Dùng README này làm nguồn duy nhất cho cách chạy hiện tại.

# Chạy System Admin bằng Docker

`docker-compose.yml` giữ nguyên database của nhóm. `docker-compose.apps.yml` bổ sung backend, frontend và job `backend-init`. Script chạy tự ghép cả hai file và thêm override riêng nếu máy có, để giữ đúng volume dữ liệu hiện tại.

## Chuẩn bị một lần

1. Cài Docker Desktop và Node.js (để chạy script npm), mở Docker Desktop, đợi Engine running.
2. Nếu chưa có `backend/.env`, sao chép từ `backend/.env.example`. Đặt `JWT_SECRET` ngẫu nhiên, `SEED_ADMIN_EMAIL` và `SEED_DEFAULT_PASSWORD` riêng. Có thể tạo khóa bằng `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`. Không chép đè `.env` đã dùng.
3. Nếu máy có dữ liệu PostgreSQL 16 hoặc dữ liệu Prisma cũ, đọc [cách giữ đúng volume PostgreSQL 17](system-admin-prisma.md#docker-dùng-chung-với-nhóm) trước khi chạy. Script tự đọc `docker-compose.override.yml` hoặc `.yaml` nếu có; không đưa file riêng này lên GitHub.
4. Dừng backend/frontend chạy bằng npm ở cổng 3001/3000 trước khi chạy bản Docker.

Không cần chạy `npm ci` trên máy để khởi động bản Docker: các thư viện và Prisma Client được cài/tạo trong quá trình build Linux. Thư viện Windows, `.env`, backup và build cũ được loại khỏi build context bằng `.dockerignore`.

## Chạy toàn bộ

Tại thư mục gốc dự án:

```powershell
npm.cmd run docker:up
```

Trên macOS/Linux có thể dùng `npm run docker:up`. Lệnh build lại khi cần, khởi động và đợi các dịch vụ sẵn sàng; lần đầu cần tải image/thư viện nên lâu hơn. Sau khi hoàn tất:

| Thành phần | Địa chỉ / trạng thái |
| --- | --- |
| Frontend | http://localhost:3000/login |
| Backend | http://localhost:3001 |
| PostgreSQL | 127.0.0.1:5433 |
| `backend-init` | Kết thúc `Exited (0)` là bình thường |

Job khởi tạo đợi PostgreSQL healthy, áp dụng migration rồi kiểm tra Admin. Chỉ khi chưa có System Admin đang hoạt động và có mật khẩu, job mới gọi seed để tạo Admin đầu tiên theo biến môi trường. Nếu đã có Admin, mật khẩu, tài khoản và quyền tùy chỉnh được giữ nguyên. Nếu dữ liệu cũ không cho tạo được Admin hợp lệ, job dừng và không tự ghi đè tài khoản/vai trò.

Backend đợi job thành công rồi chạy, frontend đợi backend healthy. Seed không tự nạp dữ liệu báo cáo demo. Với database develop đã có bảng nền nhưng chưa có lịch sử Prisma migration, cần kiểm tra/baseline theo [hướng dẫn migration](system-admin-prisma.md#migration), không tự đánh dấu bỏ qua migration.

## Kiểm tra và dừng

```powershell
npm.cmd run docker:ps
npm.cmd run docker:logs
```

`db`, `backend`, `frontend` phải có trạng thái healthy; `backend-init` kết thúc mã 0. Nhấn Ctrl+C để thoát xem log, các dịch vụ vẫn chạy nền.

```powershell
npm.cmd run docker:stop
```

Lệnh này dừng các dịch vụ trong stack. Chạy lại bằng `npm.cmd run docker:up`.

```powershell
npm.cmd run docker:down
```

Lệnh này gỡ container/network của stack và giữ volume database. Script không sử dụng `--volumes` hoặc `--remove-orphans`, nên database PostgreSQL 16 cũ không bị xóa.

`docker compose up -d` vẫn chỉ chạy database theo file chung của nhóm. Dùng các script `docker:*` khi muốn thao tác đầy đủ backend/frontend và tự áp dụng override giữ dữ liệu.

## Kết nối và thay cổng

Backend trong container luôn dùng `db:5432`, khác URL `127.0.0.1:5433` khi chạy backend trên máy. Compose ghi đè URL cho container, không sửa `backend/.env` của bạn.

Frontend gọi API từ trình duyệt, nên địa chỉ mặc định là `http://localhost:3001`, không phải tên container `backend`. Địa chỉ công khai này được build vào JavaScript; đổi nó cần build lại frontend. Biến bí mật chỉ truyền vào backend/job lúc chạy, không đưa vào image/frontend.

Nếu cần dùng cổng khác, đặt các biến tương ứng trong terminal PowerShell trước khi chạy (chỉ ảnh hưởng terminal đó):

```powershell
$env:API_PORT = '3101'
$env:WEB_PORT = '3100'
$env:NEXT_PUBLIC_API_URL = 'http://localhost:3101'
$env:WEB_ORIGIN = 'http://localhost:3100'
npm.cmd run docker:up
```

Sau đó mở http://localhost:3100/login. Cần đổi đồng thời địa chỉ API công khai và origin giao diện như ví dụ. Các cổng mặc định chỉ mở trên loopback của máy, cấu hình này dành cho chạy thử cục bộ.

## Sửa code

Đây là bản build chạy ổn định để thử nghiệm/trình diễn, không mount source để tự reload. Sau khi sửa code, chạy lại `npm.cmd run docker:up` để build lại các phần thay đổi. Khi cần dev có tự reload, có thể dừng stack và dùng cách chạy npm trên máy; hướng dẫn đó vẫn có trong backend README.

Docker không ghép chức năng kho/hóa đơn của nhánh khác, không chia sẻ database qua Internet và không chuyển dữ liệu thử lên GitHub.

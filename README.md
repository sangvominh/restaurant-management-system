# Restaurant Management System — System Admin

Hướng dẫn cho nhóm lấy code, chạy thử và cập nhật phần **Admin Hệ Thống** trên nhánh `feat/system-admin`.

Phần này có quản lý tài khoản, vai trò/phân quyền và báo cáo tổng hợp. Backend dùng NestJS + Prisma + PostgreSQL; frontend dùng Next.js. Có thể chạy cả frontend, backend và database bằng một lệnh.

> Đã cấu hình trên máy từ trước? Mở Docker Desktop, vào thư mục dự án và chạy `npm.cmd run docker:up`, rồi mở **http://localhost:3000/login**. Nếu muốn lấy code mới, làm theo mục **Cập nhật phiên bản** bên dưới.

## 1. Chuẩn bị

- **Git** để lấy và cập nhật source code.
- **Node.js 24.x**, kèm npm, để chạy các lệnh hỗ trợ. Các image ứng dụng cũng dùng Node.js 24.
- **Docker Desktop** đang mở và hiện `Engine running`.
- Terminal PowerShell trong VS Code hoặc Windows Terminal.

Các lệnh dưới đây chạy tại **thư mục gốc**, nơi có `package.json` và `docker-compose.yml`. Trên macOS/Linux, thay `npm.cmd` bằng `npm` và dùng lệnh sao chép file tương ứng.

## 2. Cài lần đầu trên máy mới

### Bước 1 — Lấy đúng nhánh

```powershell
git clone --branch feat/system-admin --single-branch https://github.com/sangvominh/restaurant-management-system.git
cd restaurant-management-system
```

Nếu đã có thư mục dự án, không cần clone lại. Kiểm tra nhánh bằng `git branch --show-current`; hướng dẫn này áp dụng cho `feat/system-admin`. Không kéo nhánh này trực tiếp vào nhánh công việc khác để thay cho bước tích hợp của nhóm.

### Bước 2 — Tạo cấu hình riêng

Chỉ sao chép khi **chưa có** `backend/.env`:

```powershell
if (-not (Test-Path -LiteralPath backend/.env)) {
    Copy-Item -LiteralPath backend/.env.example -Destination backend/.env
}
```

Mở `backend/.env`, giữ cấu hình kết nối mẫu và thay các giá trị sau:

| Biến | Cần điền gì? |
| --- | --- |
| `JWT_SECRET` | Chuỗi ngẫu nhiên dùng để ký phiên đăng nhập. Thay giá trị mẫu bằng chuỗi vừa tạo bên dưới. |
| `SEED_ADMIN_EMAIL` | Email muốn dùng cho tài khoản System Admin đầu tiên trên máy này. |
| `SEED_DEFAULT_PASSWORD` | Mật khẩu riêng cho Admin đầu tiên, ít nhất 8 ký tự và không quá 72 byte UTF-8. Thay mật khẩu mẫu trước khi chạy. |

Tạo chuỗi ngẫu nhiên cho `JWT_SECRET`:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Sao chép kết quả vào giá trị `JWT_SECRET`, rồi lưu `.env`. File này chỉ ở máy của mỗi người, không đưa lên GitHub. Không chép đè `.env` đã dùng khi cập nhật code.

### Bước 3 — Kiểm tra database cũ nếu có

**Máy mới hoàn toàn** có thể sang bước 4.

Nếu từng chạy PostgreSQL 16, bản System Admin cũ hoặc database `develop` đã có dữ liệu, đọc [hướng dẫn giữ dữ liệu và migration](docs/system-admin-prisma.md#docker-dùng-chung-với-nhóm) trước khi chạy. Không dùng volume PostgreSQL 16 để khởi động PostgreSQL 17.

`docker-compose.override.yml` là cấu hình giữ volume riêng của từng máy và được Git bỏ qua. Nếu máy bạn đã có file này, script sẽ tự sử dụng; thành viên khác không cần sao chép volume của máy bạn.

### Bước 4 — Khởi động toàn bộ

Nếu backend/frontend cũ đang chạy bằng npm trên cổng 3001/3000, nhấn **Ctrl+C** ở các terminal đó trước.

```powershell
npm.cmd run docker:up
```

Lần đầu cần Internet để tải image và thư viện, nên có thể mất vài phút. **Không cần chạy `npm ci` trên máy để dùng bản Docker**; thư viện được cài khi build image.

Lệnh tự thực hiện:

1. Chạy PostgreSQL và đợi database sẵn sàng.
2. Áp dụng migration để tạo/cập nhật cấu trúc dữ liệu.
3. Tạo Admin đầu tiên nếu database chưa có Admin dùng được.
4. Chạy backend, rồi frontend.

### Bước 5 — Mở giao diện và đăng nhập

Mở trình duyệt, nhập **http://localhost:3000/login**.

Docker chạy nền nên không nhất thiết in một dòng link như khi chạy `npm run dev`. Bạn tự mở địa chỉ trên sau khi lệnh hoàn tất.

Trên database mới, đăng nhập bằng `SEED_ADMIN_EMAIL` và `SEED_DEFAULT_PASSWORD` đã đặt ở bước 2. Với database đã có Admin, dùng tài khoản/mật khẩu hiện tại: thay mật khẩu seed trong `.env` **không đổi mật khẩu tài khoản đã tồn tại**.

## 3. Các lệnh dùng hằng ngày

| Việc cần làm | Lệnh tại thư mục gốc |
| --- | --- |
| Build và chạy toàn bộ, hoặc chạy lại sau khi sửa code | `npm.cmd run docker:up` |
| Xem trạng thái | `npm.cmd run docker:ps` |
| Xem log để tìm lỗi | `npm.cmd run docker:logs` |
| Dừng các dịch vụ, giữ container và dữ liệu | `npm.cmd run docker:stop` |
| Gỡ container của stack, giữ volume dữ liệu | `npm.cmd run docker:down` |

Nhấn **Ctrl+C** để thoát chế độ xem log; các dịch vụ vẫn chạy nền.

Trạng thái mong đợi sau khi chạy:

| Dịch vụ | Trạng thái đúng | Địa chỉ |
| --- | --- | --- |
| `frontend` | `healthy` | http://localhost:3000/login |
| `backend` | `healthy` | http://localhost:3001 |
| `db` | `healthy` | `127.0.0.1:5433` |
| `backend-init` | **`Exited (0)`** | Job đã khởi tạo xong, không cần chạy liên tục. |

`docker compose up -d` chỉ chạy database theo file chung của nhóm. Muốn chạy cả BE/FE và dùng đúng override riêng, dùng các lệnh `docker:*` ở trên.

## 4. Cập nhật phiên bản khi đã có dự án

1. Vào thư mục gốc, kiểm tra nhánh và những file đang sửa:

   ```powershell
   git branch --show-current
   git status
   ```

   Nhánh phải là `feat/system-admin`. Nếu đang sửa code, giữ lại công việc của mình trước khi cập nhật; không dùng `reset --hard` để bỏ qua thay đổi hoặc xung đột.

2. Lấy code mới của đúng nhánh:

   ```powershell
   git pull --ff-only origin feat/system-admin
   ```

   Nếu Git báo nhánh đã phân kỳ hoặc không thể fast-forward, dừng bước cập nhật và cùng người phụ trách xử lý; không force ghi đè lịch sử.

3. Nếu `.env.example` có biến mới, bổ sung vào `.env` hiện tại; giữ mật khẩu, khóa và cấu hình riêng của máy.

4. Build và chạy phiên bản mới:

   ```powershell
   npm.cmd run docker:up
   npm.cmd run docker:ps
   ```

5. Mở lại http://localhost:3000/login. Nếu phiên cũ bị thu hồi sau migration hoặc đổi quyền, đăng nhập lại.

Bản Docker không tự reload khi sửa source. Mỗi lần sửa code cần chạy lại `docker:up` để build phần thay đổi. Các lệnh cập nhật này không xóa volume database; không dùng `down -v` để cập nhật code.

## 5. Cách sử dụng phần System Admin

### Quản lý tài khoản

Vào **Quản lý Tài khoản** để thêm, sửa, xóa, khóa/mở khóa hoặc đặt lại mật khẩu. Khi tạo tài khoản, chọn vai trò muốn gán. Hệ thống bảo vệ tài khoản Admin cuối cùng và chặn tự khóa/xóa tài khoản đang dùng.

### Phân quyền và vai trò

1. Vào **Phân quyền & Vai trò**, tạo mới hoặc sửa một vai trò thường.
2. Có thể chọn **Mẫu quyền theo vai trò** để điền checkbox ban đầu.
3. Tick/bỏ tick các chức năng nghiệp vụ mong muốn, rồi lưu.
4. Tải lại trang để kiểm tra lựa chọn đã được lưu, sau đó gán vai trò cho tài khoản.

Các mẫu có nhóm quyền Kho, Nhà hàng, Nhân viên và Khách hàng. Mẫu chỉ là cấu hình ban đầu; System Admin vẫn chỉnh checkbox được. Duyệt xuất **nguyên vật liệu** và duyệt xuất **thành phẩm** là hai quyền riêng.

Chỉ System Admin được vào portal này và quản lý tài khoản/phân quyền. Vai trò thường chỉ được cấp quyền nghiệp vụ, không được cấp quyền truy cập khu vực System Admin. Khi quyền thay đổi, các phiên liên quan bị thu hồi; người dùng phải đăng nhập lại để nhận quyền mới.

### Báo cáo tổng hợp

Vào **Báo cáo tổng hợp**, chọn tháng/quý/năm, xem doanh thu hoặc nhập–xuất–tồn, chi tiết số lượng từng nguyên vật liệu và xuất CSV.

Nếu hiện **Chưa có nguồn dữ liệu cho báo cáo**, có thể bấm **Nạp dữ liệu mẫu** để thử. Nhãn **Đang dùng dữ liệu mẫu** cho biết đây là demo. Dữ liệu hóa đơn và kho thật sẽ được kết nối khi tích hợp các module; xem [hợp đồng dữ liệu báo cáo](scripts/report-views-contract.sql).

## 6. Các tình huống thường gặp

| Hiện tượng | Cách hiểu / xử lý |
| --- | --- |
| Chạy xong không thấy link | Tự mở http://localhost:3000/login. Docker chạy nền. |
| Mở `/login` nhưng tự vào dashboard | Trình duyệt còn phiên System Admin hợp lệ. Bấm Đăng xuất hoặc dùng cửa sổ ẩn danh mới để thử form đăng nhập. |
| Tài khoản kho/nhà hàng/nhân viên không vào được portal | Đúng thiết kế: portal này chỉ dành cho System Admin. App của các vai trò khác tích hợp sau. |
| `backend-init` hiện `Exited (0)` | Bình thường, job đã hoàn tất. Nếu mã khác 0, xem log. |
| Báo thiếu `backend/.env` | Thực hiện bước tạo cấu hình riêng; không commit `.env`. |
| Báo cổng 3000/3001 đã được dùng | Dừng BE/FE chạy npm bằng Ctrl+C hoặc xem [hướng dẫn đổi cổng](docs/docker.md#kết-nối-và-thay-cổng). |
| Báo lỗi Docker Engine | Mở Docker Desktop, đợi Engine running rồi thử lại. |
| Database báo không tương thích phiên bản hoặc cần baseline | Xem [hướng dẫn Docker/migration](docs/system-admin-prisma.md). Không xóa volume hoặc tự đánh dấu bỏ qua migration để hết lỗi. |
| Báo orphan `restaurant_postgres` | Có thể là container PostgreSQL 16 cũ được giữ lại. Không xóa container/volume khi chưa xác định dữ liệu cần giữ. |
| Đăng nhập vẫn không được sau khi đổi mật khẩu seed | Mật khẩu seed không ghi đè tài khoản đã có. Dùng mật khẩu hiện tại hoặc nhờ System Admin đặt lại. |

Muốn gửi lỗi cho nhóm, kèm bước vừa thực hiện và phần log lỗi từ `npm.cmd run docker:logs`. Không gửi mật khẩu, token hoặc toàn bộ `.env`.

## 7. Kiểm thử khi phát triển

Nếu muốn chạy bộ test trên máy, cần cài thư viện trước. Phần này là tùy chọn, không bắt buộc để chạy bằng Docker:

```powershell
npm.cmd ci
npm.cmd test --workspace backend
npm.cmd run test:e2e --workspace backend
```

Test E2E dùng database tạm trong bộ nhớ, không sửa dữ liệu PostgreSQL đang dùng. Cách chạy backend/frontend có tự reload khi sửa code nằm trong [backend README](backend/README.md).

## 8. Phạm vi hiện tại và tài liệu cho nhóm

**Đã triển khai:** tài khoản, vai trò/phân quyền, bảo vệ khu vực System Admin, xử lý và giao diện báo cáo theo kỳ, chạy BE/FE/database bằng Docker. Ngoài ra có các màn hình quản trị hiện có như cấu hình, nhật ký và sao lưu/phục hồi.

**Chờ tích hợp:** áp dụng tài khoản/quyền vào API kho/nhà hàng/nhân viên/khách hàng của các thành viên khác; nối báo cáo với hóa đơn và giao dịch kho thật. Danh mục checkbox không tự tạo các nghiệp vụ này.

Cùng file Docker không đồng nghĩa cùng dữ liệu: mỗi máy có database trong volume riêng. Tài khoản và dữ liệu thử trên máy một người không tự xuất hiện khi người khác pull code.

| File / thư mục | Vai trò |
| --- | --- |
| [docker-compose.yml](docker-compose.yml) | Cấu hình PostgreSQL chung của nhóm. |
| [docker-compose.apps.yml](docker-compose.apps.yml) | Backend, frontend và job khởi tạo. |
| [backend/.env.example](backend/.env.example) | Mẫu biến môi trường để mỗi máy tạo `.env` riêng. |
| [backend/](backend/) | Source API NestJS, Prisma và migration. |
| [apps/web-admin-system/](apps/web-admin-system/) | Giao diện Next.js của System Admin. |
| [docs/docker.md](docs/docker.md) | Docker chi tiết, đổi cổng, quản lý stack. |
| [docs/system-admin-prisma.md](docs/system-admin-prisma.md) | Migration, giữ dữ liệu, danh mục quyền và cách tích hợp. |

Khi đổi lệnh chạy, cổng hoặc biến môi trường, cập nhật README này và tài liệu liên quan trong cùng thay đổi. Không đưa `.env`, override riêng, backup hoặc dữ liệu thử lên GitHub.

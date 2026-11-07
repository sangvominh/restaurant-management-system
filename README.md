# Restaurant Management System — System Admin + Kho / Nhà hàng

Bản System Admin tích hợp backend/giao diện từ `feat/warehouse_ver1` (commit `797f8d6`). Nhánh làm việc tại thư mục dự án chính: `feat/system-admin`. Cùng một NestJS API, một database Prisma/PostgreSQL và một ứng dụng Next.js có hai khu vực.

## Cấu trúc thư mục

```text
restaurant-management-system/
├── frontend/
│   └── web-admin-system/
├── backend/
├── scripts/
├── docs/
└── package.json
```

Thư mục `apps` đã đổi thành `frontend`. Khi cập nhật từ bản cũ để chạy bằng npm trên máy, chạy `npm.cmd ci` tại thư mục gốc để tạo lại liên kết workspace theo đường dẫn mới. Các lệnh `--workspace web-admin-system` và `npm.cmd run docker:up` giữ nguyên. Tên file `docker-compose.apps.yml` là tên cấu hình chạy các ứng dụng, không phải đường dẫn thư mục; file này vẫn được dùng.

## Đăng nhập và sử dụng

**/login chỉ dành cho System Admin**. Kho / Nhà hàng dùng trang đăng nhập riêng do nhóm phụ trách Warehouse xây dựng; đợt này chưa tạo hoặc nối trang đó. Tài khoản, vai trò và quyền vẫn do System Admin quản lý.

| Vai trò / khu vực được gán | Sau đăng nhập | Giới hạn |
| --- | --- | --- |
| System Admin | / | Quản trị tài khoản, vai trò, báo cáo, cấu hình, nhật ký, backup. Không vào warehouse hay gọi API nghiệp vụ kho. |
| Kho / Nhà hàng, khu vực Warehouse | Chờ nối login riêng; giữ /warehouse | Menu, trang và API theo checkbox của vai trò khi có phiên Warehouse hợp lệ. Không dùng /login System Admin. |
| Nhân viên / Khách hàng | App riêng chưa tích hợp | Không đăng nhập System Admin; có quyền trùng không tự cho phép vào warehouse. |

Chưa có phiên Warehouse thì `/warehouse` chỉ thông báo đang chờ kết nối login riêng, không chuyển sang login System Admin. Phiên hai khu vực lưu riêng, đăng xuất/hết phiên bên này không xóa phiên bên kia. Phiên trình duyệt dùng chung của bản cũ không được tự chuyển sang phiên mới; System Admin cần đăng nhập lại một lần. Không đổi mật khẩu, tài khoản hay quyền đã lưu trong database. Hợp đồng để nhóm nối tiếp ở [tài liệu tích hợp](docs/integration.md#đăng-nhập-riêng-và-điểm-nối-warehouse).

Trong **Phân quyền & Vai trò**, chọn khu vực đăng nhập và tick các quyền nghiệp vụ. Kho và Nhà hàng đều chọn **Warehouse — Kho / Nhà hàng**. Có thể chọn mẫu quyền ban đầu rồi tự tick/bỏ tick. Quyền không cố định theo tên vai trò: nếu chủ động cấp BOM cho một vai trò Kho, vai trò đó được dùng BOM. Thay đổi quyền/khu vực, đổi vai trò tài khoản hoặc khóa tài khoản sẽ thu hồi phiên; cần đăng nhập lại.

Đổi tên tại **Cấu hình hệ thống → Tên nhà hàng / Doanh nghiệp → Lưu cấu hình**. Tên dùng chung cho đăng nhập, sidebar/header và dashboard System Admin, logo/footer warehouse và tiêu đề tab. Tab lưu cấu hình cập nhật ngay; các phiên khác tự tải lại tên khoảng mỗi 5 giây khi đang xem, hoặc khi quay lại tab. Không cần đăng xuất hay build Docker lại chỉ để đổi tên. Các app khác khi tích hợp có thể đọc `GET /api/public/branding`, chỉ trả tên nhà hàng.

## Chuẩn bị

- Docker Desktop đang hiện Engine running.
- Node.js 24.x và npm để chạy các lệnh hỗ trợ. Không cần cài dependency trên host khi chỉ dùng Docker.
- Terminal mở tại **thư mục gốc dự án**, nơi có package.json và docker-compose.yml: `C:\Users\PC\restaurant-management-system` trên máy hiện tại.
- Lệnh dưới đây dùng PowerShell. macOS/Linux thay npm.cmd bằng npm.

Nếu chưa có backend/.env, tạo một lần:

```powershell
if (-not (Test-Path -LiteralPath backend/.env)) {
    Copy-Item -LiteralPath backend/.env.example -Destination backend/.env
}
```

Đặt JWT_SECRET ngẫu nhiên, SEED_ADMIN_EMAIL và SEED_DEFAULT_PASSWORD riêng. Mật khẩu từ 8 ký tự, tối đa 72 byte UTF-8. Có thể tạo khóa bằng:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Không chép đè .env đã dùng. Nếu database đã có Admin, mật khẩu seed không thay mật khẩu hiện tại.

## Chạy và dừng

```powershell
npm.cmd run docker:up
npm.cmd run docker:ps
```

Mặc định mở **http://localhost:3000/login**, API cổng 3001, PostgreSQL cổng 5433. Script dùng thêm docker-compose.apps.yml và tự đọc override riêng của máy. Docker chạy nền nên bạn tự mở địa chỉ trên.

Máy hiện tại chạy từ **`C:\Users\PC\restaurant-management-system`**, dùng override riêng: **http://localhost:3200/login**, API 3201, PostgreSQL 5545. Override giữ Compose project và volume PostgreSQL của bản tích hợp đang dùng, nên tài khoản/quyền vẫn còn. Các bản trong `backups/` chỉ lưu tham chiếu; tiếp tục sửa và chạy ở thư mục dự án chính. Máy khác không có override dùng cổng mặc định ở trên.

| Lệnh | Công dụng |
| --- | --- |
| npm.cmd run docker:up | Build và chạy toàn bộ |
| npm.cmd run docker:ps | Xem trạng thái |
| npm.cmd run docker:logs | Xem log; Ctrl+C chỉ thoát xem log |
| npm.cmd run docker:stop | Dừng dịch vụ, giữ dữ liệu |
| npm.cmd run docker:down | Gỡ container của stack, giữ volume |

Frontend, backend, db cần healthy; **backend-init Exited (0)** là bình thường. Không dùng down -v để cập nhật. docker compose up -d chỉ dùng file database chung; dùng docker:up để chạy cả hai giao diện và API.

## Database và nâng cấp

Thử trên database riêng trước. Giữ nguyên ba migration System Admin đã phát hành; thêm migration đổi tên danh mục quản trị sang **system_admin_categories**, giữ dữ liệu, sau đó bổ sung bảng kho. Hai bên dùng chung branches/restaurant_tables, không tạo lại các bảng này lần thứ hai.

- Database trắng: Docker tự migrate rồi tạo Admin đầu tiên.
- Database System Admin có đúng lịch sử migration cũ: đã kiểm thử đường nâng cấp giữ danh mục/chi nhánh/quyền. Sao lưu toàn database và kiểm tra kế hoạch trước khi áp dụng vào dữ liệu chung.
- Database đã chạy nhánh kho độc lập: **chưa hỗ trợ chạy trực tiếp chuỗi migration này** vì lịch sử và danh mục khác nhau. Cần kế hoạch chuyển dữ liệu/baseline riêng; không tự đánh dấu toàn bộ migration thành đã chạy.
- Không gắn volume PostgreSQL 16 vào image PostgreSQL 17.

Xem [tích hợp và migration](docs/integration.md), [Docker](docs/docker.md), [lịch sử nền System Admin](docs/system-admin-prisma.md).

## Phạm vi đã nối

- Tài khoản, vai trò và checkbox dùng chung; đăng nhập System Admin riêng, giữ kiểm tra portal ở cả UI và API. Login Warehouse chờ nhóm phụ trách.
- Warehouse: tồn nguyên liệu/chi tiết, nhập nguyên liệu, duyệt/từ chối xuất nguyên liệu, lịch sử nguyên liệu.
- Nhà hàng: xem/tìm/lọc/sắp xếp sản phẩm, BOM, tồn thành phẩm, duyệt/từ chối xuất thành phẩm.
- Các trang nghiệp vụ trên dùng API/database thật của bản tích hợp. Warehouse giữ sidebar, header, dashboard dạng thẻ/biểu đồ và bảng theo thiết kế gốc; dữ liệu tổng quan lấy từ các API tài khoản được phép đọc, không dùng số liệu mock làm số liệu thật.
- Giữ các chức năng System Admin và hợp đồng báo cáo đã có. Chưa nối số liệu kho/hóa đơn vào báo cáo tổng hợp.

Nguồn được cung cấp chưa có API/UI CRUD nhà cung cấp/nguyên liệu hoàn chỉnh. Checkbox supplier:manage/material:manage được giữ để nối module phụ trách sau; không hiển thị chức năng giả. Các API quy trình sản xuất, duyệt nhập sau sản xuất, thành phẩm lỗi/hao hụt và CRUD sản phẩm giữ source nhưng **đang đóng** vì chưa thống nhất quyền tương ứng. Không dùng quyền duyệt xuất để mở luôn quyền duyệt nhập/lỗi.

Chưa triển khai liên kết nhân viên–tài khoản, phân vùng chi nhánh hay app nhân viên/khách hàng. Vì vậy chưa đưa bản này lên môi trường dữ liệu thật như hệ thống đã hoàn tất toàn bộ phân quyền. Chi tiết từng API nằm trong [bảng quyền](docs/warehouse-api-permissions.md).

## Kiểm thử và cập nhật

Kiểm thử phát triển trên host:

```powershell
npm.cmd ci
npm.cmd test --workspace backend
npm.cmd run test:e2e --workspace backend
npm.cmd run lint --workspace backend
npm.cmd run build --workspace web-admin-system
```

Backend E2E dùng database PGlite tạm, không sửa PostgreSQL đang chạy. Test trình duyệt kiểm tra login System Admin, từ chối vai trò thường, phiên riêng, checkbox, giới hạn portal và thu hồi phiên trên stack thử riêng. Các test Warehouse tạo phiên qua API hiện có để kiểm tra điểm nối, không đại diện cho trang login Warehouse đã hoàn thành; xem [cách chạy](docs/integration.md#kiểm-thử-trình-duyệt).

Khi cập nhật: kiểm tra git status và đúng nhánh, lưu công việc đang sửa, lấy đúng phiên bản nhóm đã phát hành, bổ sung biến .env mới nếu cần rồi chạy lại docker:up. Không tự pull nhánh khác vào nhánh đang làm hoặc force ghi đè lịch sử. Bản Docker cần build lại sau khi sửa source.

.env, override riêng, backup, kết quả Playwright và dữ liệu thử không đưa lên GitHub. Cùng Docker không đồng nghĩa cùng dữ liệu: mỗi máy có volume riêng.

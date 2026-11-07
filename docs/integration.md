# Tích hợp System Admin với Kho / Nhà hàng

## Kiến trúc

Một backend NestJS, một Prisma schema, một database và một frontend Next.js. Frontend nằm tại `frontend/web-admin-system/`; giao diện kho/nhà hàng được đặt tại `frontend/web-admin-system/warehouse/`. Các route /warehouse/* sử dụng lại sản phẩm, BOM và thành phần tồn kho từ nguồn 797f8d6. Không mở thêm một server Next riêng cho warehouse.

Backend giữ module auth/admin/audit/backup/report và thêm WarehouseModule/ProductsModule. AuthGuard toàn cục xác nhận JWT, phiên lưu trong database, trạng thái tài khoản và phiên bản quyền. RequireSystemAdmin bảo vệ khu vực quản trị; RequireWarehouse bảo vệ cả controller nghiệp vụ. System Admin có wildcard vẫn bị chặn tại warehouse. Route nghiệp vụ thiếu metadata quyền bị từ chối mặc định.

Role.portal lưu system, warehouse, employee hoặc customer. Chỉ role hệ thống có thể sử dụng khu vực system; DTO tạo/sửa vai trò thường không chấp nhận portal system. Tên vai trò không quyết định quyền. Các mẫu và seed khởi tạo portal phù hợp; đổi portal hoặc checkbox thu hồi mọi phiên của vai trò. Giao diện xác nhận /api/auth/me trước khi mount nội dung, không quyết định quyền dựa trên thông tin localStorage tự sửa.

## Đăng nhập riêng và điểm nối Warehouse

`/login` chỉ phục vụ System Admin, gọi `POST /api/auth/system-admin/login` với `{email,password}`. Backend kiểm tra vai trò hệ thống trước khi tạo phiên thành công/ký JWT; vai trò thường nhận 403 kể cả mật khẩu đúng. Sai thông tin hoặc tài khoản khóa nhận 401. Không tạo form, route login hay endpoint login riêng Warehouse trong đợt này.

Giữ `POST /api/auth/login` hiện có là API xác thực nền cho các app tích hợp sau; nó không phải trang login Warehouse đã hoàn thành. Nhóm Warehouse cần nối giao diện riêng, kiểm tra `GET /api/auth/me` xác nhận `portal === 'warehouse'` và `isSystemAdmin === false`, rồi sử dụng đúng các API quyền đã thống nhất. API nghiệp vụ vẫn kiểm tra tài khoản/quyền/portal ở server, không chỉ dựa vào frontend.

Nếu tiếp tục dùng giao diện `/warehouse` trong app này, sau xác thực gọi `saveSession(accessToken,user)` từ `@/warehouse/session` rồi chuyển vào `/warehouse`. Module này chỉ dùng `warehouse_access_token`/`warehouse_auth_user`, tự gắn JWT và xóa đúng phiên Warehouse khi hết hạn. Chưa có phiên thì `/warehouse` thông báo chờ nối login riêng; logout/401 quay về trạng thái này, không chuyển sang `/login`. Không có link hoặc form đăng nhập mới cho Warehouse. Nếu dùng app/origin riêng, nhóm phải lưu phiên ở app đó và dùng cùng hợp đồng JWT/quyền; localStorage không chia sẻ giữa origin.

System Admin dùng `system_admin_access_token`/`system_admin_auth_user`. Hai khu vực không đọc/xóa phiên của nhau, kể cả chạy cùng origin. Các khóa chung `access_token`/`auth_user` từ bản cũ bị bỏ qua, cần đăng nhập lại; tài khoản, mật khẩu, checkbox và schema không thay đổi. Thay đổi quyền/khóa tài khoản vẫn thu hồi các phiên liên quan như trước. Token vẫn lưu localStorage; chưa chuyển sang cookie HttpOnly trong đợt này.

## Migration và bảo toàn dữ liệu

Giữ nguyên checksum ba migration System Admin cũ. 20261102000000_prepare_warehouse_integration đổi tên bảng danh mục, index và sequence sang system_admin_categories; thêm portal, bảo toàn quyền đã tick và thu hồi phiên cũ. Các migration kho được nối tiếp theo thứ tự trong [warehouse-migration-map.json](warehouse-migration-map.json), giữ SQL gốc, bỏ migration init tạo lại branches/restaurant_tables. Bảng categories của kho dùng UUID; danh mục quản trị vẫn ID số.

Đã kiểm thử database trắng và nâng cấp từ lịch sử System Admin. Trước khi nâng cấp dữ liệu nhóm cần dump/kiểm tra restore trên database riêng. Chưa có công cụ chuyển tự động database kho độc lập sang lịch sử tích hợp. Không chạy migrate deploy vào database kho cũ rồi tự đánh dấu bỏ qua lỗi bảng trùng.

Backup JSON System Admin giữ phiên bản 1, thêm portal vào role; backup cũ thiếu portal được suy ra theo vai trò mặc định. Preview kiểm tra portal hợp lệ. Restore chỉ thao tác tài khoản/vai trò/system_admin_categories/cấu hình và thu hồi phiên; không xóa bảng categories/kho. Không thử restore vào database chung.

## Quyền đã nối và phần chờ

Xem [ma trận API](warehouse-api-permissions.md). API danh mục hỗ trợ BOM chỉ trả thông tin nguyên liệu/sản phẩm cần cấu hình, không tự mở toàn bộ API tồn kho/sản phẩm cho tài khoản chỉ có BOM. Nhập kho có endpoint lựa chọn nhà cung cấp, chi nhánh, lô và vị trí để tạo phiếu bằng UI thật.

Các nghiệp vụ chưa chốt quyền được đánh dấu integration:pending, không nằm trong danh mục checkbox và không cấp được qua API vai trò/backup. Chưa mở quy trình sản xuất, duyệt nhập thành phẩm, thành phẩm lỗi/hao hụt hoặc CRUD sản phẩm. Source gốc được giữ để tích hợp khi nhóm chốt quyền. Module CRUD nhà cung cấp/nguyên liệu không có đầy đủ trong nhánh nguồn, không được viết thay người phụ trách trong đợt này.

Chưa có phạm vi chi nhánh gắn với tài khoản hoặc quan hệ employee. Quyền hiện kiểm tra loại thao tác trong portal; không tuyên bố đã cô lập dữ liệu từng chi nhánh. Báo cáo System Admin vẫn đọc hai view theo scripts/report-views-contract.sql, chưa tự tạo view trỏ sang dữ liệu kho.

## Chạy tại thư mục dự án chính

Thư mục làm việc: `C:\Users\PC\restaurant-management-system`, nhánh `feat/system-admin`. Frontend ở `frontend/web-admin-system`; backend ở `backend`. Bản tại `backups/system-admin-warehouse` giữ lại để tham chiếu, không còn là nơi sửa/chạy dự án chính.

Override riêng tại thư mục chính giữ Compose project `rms-system-admin-warehouse-integration`, UI 3200, API 3201, PostgreSQL 5545 và dùng volume có sẵn `rms-system-admin-warehouse-integration_postgres_data` (external). Vì vậy chuyển nơi chứa source không tạo database thay thế hoặc đổi tài khoản/quyền. Mở Docker Desktop rồi dùng `npm.cmd run docker:up` tại thư mục chính; mở http://localhost:3200/login. Dừng bằng `npm.cmd run docker:stop`. Các cấu hình này được Git bỏ qua; máy khác mặc định 3000/3001/5433 theo README và tự cấu hình cổng/volume riêng.

Lần chuyển source về thư mục chính giữ cấu hình local của bản tích hợp; cấu hình và source gốc trước khi chuyển được lưu tại `backups/before-main-workspace-*`. Không restore các bản này vào database để cập nhật source. Admin hiện có giữ mật khẩu đã đặt; biến seed chỉ tạo Admin khi chưa có tài khoản quản trị dùng được. Không sao chép private .env/volume từ máy người khác.

## Kiểm thử trình duyệt

Tên nhà hàng lấy từ `system_settings.restaurant_name` qua `GET /api/public/branding` (chỉ tên, không trả cấu hình liên hệ). Chỉ System Admin sửa qua API settings hiện có. Provider chung cập nhật giao diện sau khi lưu, thông báo các tab cùng trình duyệt và kiểm tra lại mỗi 5 giây trên tab đang hiển thị; các máy/phiên khác lấy cùng nguồn. Dữ liệu tên không lưu cứng trong localStorage và phản hồi không được cache. App khác cần dùng endpoint này để đồng bộ tên; chưa tự thay code ở repo/app ngoài bản tích hợp.

Chỉ chạy trên stack test riêng; test tạo tài khoản/vai trò tạm qua API rồi dọn chúng, có phát sinh nhật ký. Cần frontend/backend đang chạy và một System Admin dùng được. Cài dependency npm ci ở gốc trước.

```powershell
$env:E2E_WEB_URL='http://localhost:3200'
$env:E2E_API_URL='http://localhost:3201'
$env:E2E_ADMIN_EMAIL='<email Admin của database thử>'
$env:E2E_ADMIN_PASSWORD='<mật khẩu database thử>'
# Máy Windows có Edge:
$env:PLAYWRIGHT_CHANNEL='msedge'
npm.cmd run test:browser --workspace web-admin-system
```

Máy không dùng Edge có thể cài Chromium bằng npx playwright install chromium trong frontend/web-admin-system, bỏ PLAYWRIGHT_CHANNEL. Chưa đặt thông tin Admin thì bộ test được skip; skip không phải kết quả kiểm thử thành công. Không đưa kết quả test, trace hoặc mật khẩu vào commit.

Backend có 13 unit test và 42 E2E/API/migration test. Test browser gồm 13 ca cho đăng nhập riêng System Admin, từ chối tài khoản Kho/Nhà hàng tại form Admin, bỏ qua phiên chung cũ, cách ly phiên/logout, menu theo quyền, chặn portal, đổi quyền/khóa, checkbox trên UI, lỗi API không được giả thành lưu thành công, bố cục desktop/mobile và đồng bộ tên nhà hàng. Test Warehouse tạo phiên qua API xác thực hiện có rồi lưu bằng khóa riêng để kiểm tra điểm nối, không xác nhận login Warehouse đã hoàn thành. Bộ test không thay thế kiểm thử toàn bộ nghiệp vụ kho hay kiểm tra tính đồng thời của từng luồng sản xuất.

# System Admin: Prisma + ESM

Nền tương thích `develop` tại commit `7c70254`: NestJS, PostgreSQL, Prisma 7.10.1, ESM/NodeNext và Vitest. Các model `Branch` và `RestaurantTable` giữ nguyên. Công việc này chỉ chuyển lớp dữ liệu của System Admin và chuẩn bị hợp đồng báo cáo; không triển khai kho, BOM hay hóa đơn.

## Chạy với database phát triển mới

1. Từ thư mục gốc, chạy `npm ci`. Trong PowerShell có thể dùng `npm.cmd`.
2. Chạy `docker compose -f docker-compose.system-admin.yml up -d`. File này dùng PostgreSQL 17, cổng 5433 và volume riêng. Không thay đổi volume/database TypeORM cũ. Nếu đã có PostgreSQL của nhóm, dùng database đó theo kế hoạch migration bên dưới; không cần chạy thêm container trùng cổng.
3. Sao chép `backend/.env.example` thành `backend/.env`; đặt `DATABASE_URL`, `JWT_SECRET` ngẫu nhiên và mật khẩu seed riêng. Backend mặc định cổng 3001 để frontend cổng 3000 tiếp tục hoạt động.
4. Từ `backend/`, chạy:

```sh
npm run prisma:generate
npm run db:migrate
npm run db:seed
npm run start:dev
```

Seed chỉ tạo vai trò mặc định, một tài khoản Admin theo `SEED_ADMIN_EMAIL`, và cấu hình mặc định. Seed không đổi mật khẩu/quyền đã tồn tại, không in mật khẩu ra log. Khởi động server không tự tạo tài khoản demo.

Frontend: `npm run dev --workspace web-admin-system`. API giữ `/api/admin/*`, `/api/auth/*`, tên vai trò dạng chuỗi trong response và ID số cho dữ liệu Admin.

## Migration

- `20261030000000_develop_baseline` tạo đúng hai bảng chi nhánh/bàn của develop.
- `20261030000100_system_admin` chỉ bổ sung bảng tài khoản, vai trò, nhật ký, danh mục chung, cấu hình và khóa ngoại. Không tạo bảng nghiệp vụ kho/hóa đơn.
- Mọi thao tác migration phải trỏ đúng `DATABASE_URL`. Không chạy các migration này trực tiếp lên database TypeORM cũ có bảng cùng tên nhưng khác cấu trúc.
- Nếu database của nhóm đã có đúng hai bảng nền và dữ liệu: sao lưu, kiểm tra schema khớp baseline trước; sau đó đánh dấu baseline đã áp dụng bằng lệnh sau, rồi `npm run db:migrate`:

```sh
npx prisma migrate resolve --applied 20261030000000_develop_baseline --config prisma7.config.ts
```

Với dữ liệu TypeORM cần giữ: xuất JSON quản trị v1 từ phiên bản cũ trước khi chuyển; tạo database Prisma mới, migrate và seed, sau đó xem trước/phục hồi JSON. Khôi phục giữ ID tài khoản, liên kết lại vai trò theo tên. Nếu trùng ID với danh tính khác, API từ chối; cần lên kế hoạch chuyển dữ liệu thay vì sửa ID tùy ý. JSON chỉ chứa dữ liệu quản trị, không thay thế bản sao lưu toàn PostgreSQL. Không tự chạy chuyển đổi lên database thật trong thay đổi này.

## Mô hình tài khoản và quyền

- `Account.roleId` tham chiếu `Role.id`, không lưu tên vai trò tự do trong database. API vẫn trả `role: string` cho frontend cũ.
- `username` và `phone` là tùy chọn; email được chuẩn hóa chữ thường. Mật khẩu băm không được đưa vào response tài khoản, đăng nhập hay `/me`.
- Admin hệ thống có `*`. Vai trò thường không được tự cấp `*` qua API.
- Người được ủy quyền `account:manage` chỉ quản lý tài khoản thường. Gán/đổi vai trò còn yêu cầu `role:manage`; chỉ được gán tập quyền thường trong phạm vi quyền của người thực hiện.
- Chỉ Admin hệ thống quản lý tài khoản có quyền quản trị và phục hồi dữ liệu tài khoản/quyền. `backup:manage` được ủy quyền cho phép xuất bản sao lưu, không cho phép nâng quyền bằng phục hồi JSON.
- Không tự đổi phân công BOM/kho/nhà hàng. Nhóm nghiệp vụ dùng lại khóa quyền đã thống nhất và gắn `@RequirePermissions(...)` trên API của họ.
- Guard JWT áp dụng toàn cục. Route công khai của module mới phải khai báo `@Public()`. Token phải thuộc phiên đăng nhập tồn tại, đúng tài khoản và đúng phiên bản phiên.
- Đổi/đặt lại mật khẩu, khóa/mở khóa, đổi vai trò/email/quyền hoặc phục hồi thu hồi các phiên liên quan. Token cũ không sống lại sau mở khóa. Token phiên bản cũ trước chuyển đổi phải đăng nhập lại.
- Các thay đổi tài khoản/vai trò/phục hồi dùng khóa transaction chung để bảo vệ Admin cuối cùng khi có nhiều request đồng thời. Khóa này chỉ áp dụng các đường ghi quản trị đi qua `PrismaService.adminTransaction`.

## Sao lưu quản trị

Giữ định dạng JSON v1 để đọc bản sao lưu cũ. Xuất sử dụng snapshot nhất quán; tệp có mật khẩu băm nên cần cất giữ riêng.

Phục hồi cập nhật/chèn tài khoản theo ID, khóa tài khoản không có trong tệp, giữ nhật ký và thu hồi mọi phiên đăng nhập. Không xóa toàn bộ tài khoản để tránh làm mất liên kết với nghiệp vụ. Bảng chi nhánh, bàn, kho, hóa đơn không nằm trong JSON và không bị phục hồi. Khóa ngoại nghiệp vụ khi nhóm bổ sung cần sử dụng `Restrict` nếu không cho phép xóa tài khoản đã phát sinh giao dịch; API trả 409 để chuyển sang khóa tài khoản.

## Kết nối báo cáo thật

Hai view trong schema `public` là ranh giới dữ liệu; không tự suy đoán bảng nghiệp vụ của nhóm:

| View | Cột bắt buộc |
| --- | --- |
| `v_report_revenue` | `paid_at timestamptz`, `amount numeric` |
| `v_report_stock` | `occurred_at timestamptz`, `material_id int/uuid/text`, `material_name text`, `unit text`, `movement_type text`, `quantity numeric`, `value numeric` |

Mỗi dòng revenue là một hóa đơn đã thanh toán, không nhân bản do join chi tiết/thanh toán. Mỗi dòng stock là một biến động đã thực sự tác động tồn kho, không phải phiếu đề nghị/chờ duyệt. `movement_type` nhận `import`, `export`, `waste`; số lượng và giá trị luôn dương, đã quy đổi đơn vị cơ sở. Không đưa cùng một lần trừ nguyên liệu vào cả xuất kho và chế biến. Tồn đầu được dựng từ lịch sử trước kỳ; dữ liệu chuyển đổi phải chứa số dư đầu tương ứng. `value` cần dùng phương pháp tính giá đã thống nhất với nhóm kho.

Kỳ tính theo `Asia/Ho_Chi_Minh`: tháng/quý trong năm được chọn; theo năm hiển thị 5 năm đến năm được chọn. Tổng hợp kho tính bằng giá trị VND, chi tiết từng NVL tính số lượng theo đơn vị riêng. `materialId` được trả dưới dạng chuỗi để hỗ trợ UUID và ID số lớn. Khi chưa có view, API trả `ready:false`; giao diện hiển thị thiếu nguồn dữ liệu, không dựng số liệu giả.

`scripts/report-views-contract.sql` là mẫu cần đổi tên bảng/cột theo module thật. Demo chỉ chạy khi người có quyền chủ động nạp; các đối tượng demo được đánh dấu bằng comment `system-admin-demo-v1`. Nạp/xóa demo từ chối nếu có nguồn thật, kể cả khi chỉ một trong hai nguồn là dữ liệu thật. Hai view không được tự động tạo từ demo khi migrate/khởi động.

## Kiểm tra

```sh
npm run prisma:validate --workspace backend
npm run build --workspace backend
npm test --workspace backend
npm run test:e2e --workspace backend
npm run lint --workspace backend
```

E2E khởi tạo PostgreSQL WASM (PGlite) trong bộ nhớ và dùng `@prisma/adapter-pg` qua cổng loopback ngẫu nhiên. Chỉ nạp migration vào database tạm của test, không dùng `DATABASE_URL` thật. Test chạy qua bản ESM được tsc biên dịch để kiểm tra decorator metadata, guard và validation như ứng dụng thật. Test này không thay thế kiểm thử tải hoặc kiểm thử đồng thời trên PostgreSQL nhiều process.

## Đưa thay đổi vào develop

Nhánh feat hiện có lịch sử gốc riêng. Chuẩn bị một nhánh từ develop rồi đưa các file chức năng, schema/migration và dependencies của System Admin sang. Giữ tài liệu, cấu hình và module của nhóm; không chép đè toàn repository hoặc ép gộp lịch sử không liên quan. Chưa có thao tác commit, push hay merge trong thay đổi hiện tại.

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
- `20261031000000_role_permission_policy` chuyển quyền theo phân công mới. Chỉ các vai trò có đúng tên và toàn bộ tập quyền mặc định cũ được đổi sang mặc định mới. Vai trò đã tùy chỉnh giữ quyền nghiệp vụ; khóa quyền cũ được chuyển và mọi quyền quản trị bị loại khỏi vai trò thường. Migration bổ sung vai trò mặc định còn thiếu, giữ ID/mật khẩu và thu hồi các phiên cũ.
- Mọi thao tác migration phải trỏ đúng `DATABASE_URL`. Không chạy các migration này trực tiếp lên database TypeORM cũ có bảng cùng tên nhưng khác cấu trúc.
- Nếu database của nhóm đã có đúng hai bảng nền và dữ liệu: sao lưu, kiểm tra schema khớp baseline trước; sau đó đánh dấu baseline đã áp dụng bằng lệnh sau, rồi `npm run db:migrate`:

```sh
npx prisma migrate resolve --applied 20261030000000_develop_baseline --config prisma7.config.ts
```

Với dữ liệu TypeORM cần giữ: xuất JSON quản trị v1 từ phiên bản cũ trước khi chuyển; tạo database Prisma mới, migrate và seed, sau đó xem trước/phục hồi JSON. Khôi phục giữ ID tài khoản, liên kết lại vai trò theo tên. Nếu trùng ID với danh tính khác, API từ chối; cần lên kế hoạch chuyển dữ liệu thay vì sửa ID tùy ý. JSON chỉ chứa dữ liệu quản trị, không thay thế bản sao lưu toàn PostgreSQL. Không tự chạy chuyển đổi lên database thật trong thay đổi này.

## Mô hình tài khoản và quyền

- `Account.roleId` tham chiếu `Role.id`, không lưu tên vai trò tự do trong database. API vẫn trả `role: string` cho frontend cũ.
- `username` và `phone` là tùy chọn; email được chuẩn hóa chữ thường. Mật khẩu băm không được đưa vào response tài khoản, đăng nhập hay `/me`.
- System Admin được server xác định bằng cả `Role.isSystem = true` và quyền `*`; tên vai trò hay cờ giả trong JWT/client không tạo đặc quyền. API login và `/me` trả `isSystemAdmin` để giao diện sử dụng.
- Toàn bộ controller `/api/admin/*` khai báo `@RequireSystemAdmin()`. Chỉ System Admin được quản lý tài khoản, vai trò, phân quyền, báo cáo, cấu hình, danh mục chung, nhật ký và sao lưu/phục hồi. Quyền quản trị không được ủy quyền; kể cả dữ liệu cũ còn chứa `account:manage`, `role:manage`, `report:view` hoặc `backup:manage`, vai trò thường vẫn nhận 403.
- Danh mục checkbox chỉ có 15 quyền nghiệp vụ theo bảng phân công. System Admin được tick/bỏ tick mọi quyền nghiệp vụ cho vai trò thường, không khóa theo tên vai trò. Backend từ chối wildcard, quyền quản trị, khóa cũ và khóa không tồn tại trong request tạo/sửa vai trò.
- Quyền mặc định chỉ dùng cho vai trò mới hoặc khi người dùng chủ động chọn mẫu trên giao diện. Seed và khởi động không ghi đè checkbox đã lưu. `GET /api/admin/roles/defaults` cung cấp mẫu; chọn mẫu chỉ đổi checkbox của form, chưa lưu cho tới khi bấm lưu.
- Nhóm nghiệp vụ sử dụng các khóa bên dưới và gắn `@RequirePermissions(...)` trên API của họ khi tích hợp. Thay đổi hiện tại chỉ khai báo quyền, không xây API kho, BOM, thành phẩm, ca làm, khách hàng hay nối dữ liệu thật.
- Guard JWT áp dụng toàn cục. Route công khai của module mới phải khai báo `@Public()`. Token phải thuộc phiên đăng nhập tồn tại, đúng tài khoản và đúng phiên bản phiên.
- Đổi/đặt lại mật khẩu, khóa/mở khóa, đổi vai trò/email/quyền hoặc phục hồi thu hồi các phiên liên quan. Token cũ không sống lại sau mở khóa. Token phiên bản cũ trước chuyển đổi phải đăng nhập lại.
- Các thay đổi tài khoản/vai trò/phục hồi dùng khóa transaction chung để bảo vệ Admin cuối cùng khi có nhiều request đồng thời. Khóa này chỉ áp dụng các đường ghi quản trị đi qua `PrismaService.adminTransaction`.

| Vai trò mặc định | Quyền nghiệp vụ |
| --- | --- |
| Quản lý kho | `supplier:manage`, `material:manage`, `inventory:import`, `inventory:approve-export`, `inventory:view` |
| Quản lý nhà hàng | `product:view`, `bom:manage`, `finished-goods:approve-export` |
| Nhân viên (bếp / pha chế / thu ngân) | `shift:view`, `inventory:view`, `inventory:request-export`, `production:create`, `finished-goods:request-export` |
| Khách hàng | `menu:view`, `order:create`, `order:view` |

`inventory:approve-export` chỉ duyệt nguyên vật liệu, không bao gồm xuất thành phẩm. `product:view` chỉ xem/tìm kiếm/lọc/sắp xếp; không có quyền CRUD sản phẩm trong đặc tả. `order:view` là xem đơn của chính khách đó; nhóm đơn hàng phải kiểm tra chủ sở hữu khi tích hợp. `order:create` bao gồm chọn món, giỏ hàng và thanh toán. Các quyền này không thay thế điều kiện nghiệp vụ (phiếu đã duyệt, ca hiện tại, số lượng tồn, v.v.).

Portal này chỉ cho System Admin đăng nhập vào giao diện. Layout chờ xác nhận `/api/auth/me` trước khi render các trang; không tin quyền trong localStorage và không hiển thị trang quản trị khi xác nhận thất bại. Tài khoản thường vẫn có thể xác thực bằng API login chung để các app nghiệp vụ sử dụng sau này, nhưng không có quyền truy cập portal hay API quản trị.

### Cập nhật bản đã chạy và kiểm tra checkbox

1. Dừng backend/frontend đang chạy, kiểm tra `DATABASE_URL` trỏ đúng database Prisma phát triển.
2. Từ thư mục gốc chạy `npm.cmd run db:migrate --workspace backend` rồi khởi động lại backend/frontend. Không cần seed lại để chuyển các vai trò cũ; migration đã bổ sung vai trò nghiệp vụ còn thiếu. Tất cả tài khoản phải đăng nhập lại.
3. Đăng nhập System Admin, mở Phân quyền & Vai trò, sửa một vai trò thường. Có thể chọn mẫu, tick thêm/bỏ tick và lưu; tải lại trang để kiểm tra lựa chọn được giữ.
4. Tạo tài khoản mang vai trò đó. Thử đăng nhập tại `/login`: portal báo chỉ dành cho System Admin. Không tự chuyển đến app khác khi các module chưa tích hợp.
5. Quyền nghiệp vụ đã lưu có thể kiểm tra bằng API login chung và `/api/auth/me`; các API `/api/admin/*` luôn trả 403 cho tài khoản thường. Khi đổi checkbox, các phiên cũ bị thu hồi.

Migration không được tự chạy mỗi lần khởi động. Vai trò `Thu ngân` đã tồn tại được giữ để không mất liên kết tài khoản; nếu vẫn dùng đúng quyền mặc định cũ thì được chuyển sang nhóm quyền Nhân viên. Seed database mới tạo đúng năm vai trò: System Admin, Quản lý kho, Quản lý nhà hàng, Nhân viên, Khách hàng.

## Sao lưu quản trị

Giữ định dạng JSON v1 để đọc bản sao lưu cũ. Xuất sử dụng snapshot nhất quán; tệp có mật khẩu băm nên cần cất giữ riêng.

Khi đọc backup cũ, `product:manage` được chuyển thành `product:view`; `production:request` được tách thành đề nghị nguyên vật liệu, tạo thành phẩm và đề nghị thành phẩm. Quyền quản trị trên vai trò thường bị loại bỏ; bản xem trước hiển thị cảnh báo cho những vai trò được chuyển. Quyền không tồn tại và wildcard trên vai trò thường vẫn bị từ chối.

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

# Web Admin Nhà hàng Mộc — Hướng dẫn bàn giao phân quyền

## Chạy local

Cách chạy giống cấu hình của nhóm: PostgreSQL chạy bằng Docker Compose; backend và frontend chạy trực tiếp trên máy. Cần Docker Desktop, Docker Compose, Node.js từ 24.15.0 trong dòng 24 và npm.

Tại thư mục gốc, khởi động database:

```bash
docker compose up -d db
```

PostgreSQL mặc định ở `127.0.0.1:5433`, database `restaurant_dev`, user `restaurant`, mật khẩu `local_dev_only`. Dữ liệu nằm trong volume và được giữ khi chạy `docker compose down`; `docker compose down -v` sẽ xóa dữ liệu.

Nếu cổng `5433` đã được ứng dụng khác dùng, chọn cổng trống, ví dụ:

```bash
DB_PORT=5434 docker compose up -d db
```

Sau đó đổi cổng trong `DATABASE_URL` ở `backend/.env` cho khớp. Cổng này chỉ thay đổi cách kết nối từ máy, không đổi cổng PostgreSQL bên trong container.

Cài và cấu hình backend:

```bash
cd backend
npm ci
cp -n .env.example .env
# Nếu dùng DB_PORT=5434, sửa localhost:5433 thành localhost:5434 trong .env
npm run prisma:generate
npm run db:migrate
npm run start:dev
```

Backend chạy ở `http://localhost:3001`. Để tạo dữ liệu demo nhân viên, dừng ở bước trước `npm run start:dev`, sau đó chạy từ thư mục gốc:

```bash
./scripts/staff-compose-seed.sh
```

Script tự xác định cổng của database Compose đang chạy, rồi chạy migration và nạp dữ liệu mẫu vào database đó; chỉ dùng với dữ liệu local/demo. Chạy lại không đặt lại toàn bộ trạng thái đã thao tác.

Mở terminal khác để chạy app nhân viên:

```bash
cd frontend
npm ci
npm run dev -- --port 3002
```

Mở [app nhân viên](http://localhost:3002/staff/login). Các tài khoản `DEMO-KITCHEN`, `DEMO-BARISTA` và `DEMO-CASHIER` dùng mật khẩu demo `demo-password-2026`. Xem [chi tiết dữ liệu demo](docs/notes/staff-demo.md).

Admin/kho là ứng dụng riêng ở `apps/warehouse-web/`. Để chạy cùng backend trên cổng 3001, cấu hình `API_BASE_URL=http://localhost:3001` trong `apps/warehouse-web/.env.local`, rồi chạy:

```bash
cd apps/warehouse-web
npm ci
npm run dev -- --port 3003
```

Mở `http://localhost:3003`. Một số chức năng kho vẫn dùng dữ liệu giả lập hoặc chưa được phân quyền đầy đủ; không dùng cấu hình demo cho dữ liệu thật.

## Kiểm tra trước khi làm tiếp

```bash
cd backend
npm run lint
npm run test
npm run test:e2e
npm run build
npx prisma validate
npx prisma migrate status

cd ../apps/warehouse-web
npm run build
```

Test hiện có khá mỏng: unit tests chủ yếu kiểm tra dependency wiring, còn e2e kiểm tra `GET /`. Khi làm phân quyền, cần thêm test 401/403, kiểm tra branch scope, và test quyền cho từng thao tác duyệt/ghi kho.

## Luồng Admin hiện có

| Nghiệp vụ                                     | API chính                                                 | Lưu trữ                                                                   |
| --------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| Quản lý món/thành phẩm                        | `/products` GET/POST/PATCH/DELETE                         | `Product`                                                                 |
| Công thức món                                 | `/warehouse/boms` và `/warehouse/boms/:code`              | `Bom`, `BomDetail`                                                        |
| Lệnh sản xuất và ghi nhận thành phẩm làm xong | `/warehouse/production-orders` và `/:code/finished-goods` | `ProductionOrder`, `FinishedGoodsReceipt`                                 |
| Duyệt nhập sau sản xuất                       | `/warehouse/finished-goods-receipts`                      | `FinishedGoodsReceipt`, `FinishedGoodsBalance`, `FinishedGoodsMovement`   |
| Duyệt phiếu xuất món theo ca                  | `/warehouse/finished-goods-issues`                        | `FinishedGoodsIssue`, `FinishedGoodsIssueDetail`, `FinishedGoodsMovement` |
| Duyệt báo thành phẩm lỗi                      | `/warehouse/finished-goods-defects`                       | `FinishedGoodsDefect`, có thể ghi `FinishedGoodsMovement` âm              |
| Tồn nguyên liệu/lịch sử                       | `/warehouse/inventory`, `/warehouse/inventory-movements`  | `MaterialBalance`, `InventoryMovement`                                    |

Phiếu xuất thành phẩm do app nhân viên gửi bằng `POST /warehouse/finished-goods-issues`; Admin chỉ xem và duyệt/từ chối. Ca hiện lưu bằng `shiftCode` dạng chuỗi, chưa có bảng `Shift` hay hệ thống mở/đóng ca.

App nhân viên có thể gửi báo thành phẩm lỗi bằng `POST /warehouse/finished-goods-defects` với dữ liệu cơ bản:

```json
{
  "branchCode": "TEST-CN01",
  "productCode": "TP001",
  "quantity": "1",
  "reason": "Món bị hỏng"
}
```

Backend tự đặt `deductFromStock` dựa trên tồn của món tại chi nhánh ở thời điểm gửi. Admin xem `GET /warehouse/finished-goods-defects?status=PENDING`, sau đó gọi `/:code/approve` hoặc `/:code/reject`. Cần phối hợp với nhóm app nhân viên về cách lấy `branchCode` từ phiên đăng nhập; sau khi có tài khoản, không nên tin branch do client tự gửi.

## Gợi ý triển khai phân quyền

### 1. Chốt hợp đồng danh tính với repo nhân viên

Trước khi tạo bảng user hoặc login riêng, thống nhất với nhóm app nhân viên:

- issuer, audience, thời hạn và cách refresh token;
- claim định danh: `sub`/`userId`, `employeeCode`, `role`, `branchIds`;
- mã nhân viên và chi nhánh được cấp từ nguồn nào;
- xử lý nhân viên đổi chi nhánh, nghỉ việc, khóa tài khoản.

Trong repo hiện chưa có `User`, `Employee`, `Role`, `Permission`, module auth, password hash, JWT strategy, guard hoặc decorator quyền. `assignedEmployeeCode` trên lệnh sản xuất hiện chỉ là chuỗi, chưa phải quan hệ khóa ngoại.

### 2. Tạo guard phía API trước

Khuyến nghị NestJS `JwtAuthGuard` + `RolesGuard`/permission guard, gắn trực tiếp vào controller/action. Không chỉ ẩn menu hoặc nút trên Next.js: gọi thẳng API vẫn phải bị chặn. Không chấp nhận `role`, `employeeCode` hay `branchId` quyền hạn từ body/query để quyết định quyền.

Quyền nghiệp vụ cần tối thiểu:

| Quyền                               | Admin nhà hàng/kho |                    Nhân viên |
| ----------------------------------- | -----------------: | ---------------------------: |
| Đọc món và BOM                      |                 Có |            Đọc món cần thiết |
| Tạo/sửa món và BOM                  |                 Có |                        Không |
| Gửi báo hoàn thành sản xuất         |     Không/giám sát |      Có, theo lệnh được giao |
| Tạo phiếu xuất thành phẩm theo ca   |              Không | Có, trong chi nhánh được cấp |
| Duyệt/từ chối phiếu xuất thành phẩm |                 Có |                        Không |
| Gửi báo thành phẩm lỗi              |              Không |                           Có |
| Duyệt/từ chối thành phẩm lỗi        |                 Có |                        Không |
| Xem tồn kho                         |    Có theo phạm vi |   Chỉ phần cần cho công việc |

Đây là đề xuất theo luồng nghiệp vụ, chưa phải cấu hình quyền đã code. Chốt tên role/permission với nhóm trước khi migration.

### 3. Phạm vi chi nhánh và ghi nhận người thao tác

Các phiếu kho mang `branchId`, nhưng API hiện không có user context. Sau khi thêm auth:

- lấy người thao tác và chi nhánh từ token/quan hệ nhân viên;
- kiểm tra `branchId` của phiếu với chi nhánh được cấp trên từng request;
- lưu `createdBy`, `approvedBy`, `rejectedBy` hoặc audit log;
- chặn nhân viên duyệt phiếu do chính mình tạo nếu nghiệp vụ yêu cầu tách nhiệm vụ;
- giữ các cập nhật tồn và ghi movement trong cùng transaction.

### 4. Bảo vệ frontend

`apps/warehouse-web/src/components/layout/app-shell.tsx` đang hiển thị tên/role tĩnh. Thay bằng thông tin từ session; bảo vệ route để trải nghiệm người dùng tốt, đồng thời vẫn dựa vào API guard làm ranh giới bảo mật. CORS hiện chỉ cho phép localhost; cấu hình allowlist theo domain khi triển khai thật.

## Trạng thái và lưu ý dữ liệu

- Prisma schema: `backend/prisma/schema.prisma`; migration: `backend/prisma/migrations/`.
- `npx prisma migrate status` là kiểm tra trạng thái; `migrate deploy` áp dụng migration lên database cấu hình hiện tại.
- `20261031120000_add_finished_goods_issue` là migration rỗng giữ chỗ; bảng phiếu xuất theo ca được tạo ở migration `20261101090000_finished_goods_issue_by_shift`.
- `WasteRequest` vẫn đại diện phần không đạt tạo trong luồng duyệt nhập sau sản xuất. `FinishedGoodsDefect` là phiếu báo lỗi độc lập từ app nhân viên; không gộp hai khái niệm khi thêm quyền.
- Một số màn khác ngoài chức năng bàn giao (Dashboard, nhập nguyên liệu, duyệt xuất nguyên liệu, báo cáo) vẫn còn mock ở frontend. Các API backend cho nhiều luồng kho đã có Prisma; cần đối chiếu phạm vi trước khi mở rộng kết nối UI.
- Dữ liệu `TEST-CN01` và tồn thử `TP001` có thể đang tồn tại trong database local để test. Không coi đây là dữ liệu production.

## Điểm vào mã nguồn

- API routes: `backend/src/warehouse/warehouse.controller.ts`, `backend/src/products/products.controller.ts`.
- Luồng nghiệp vụ: `backend/src/warehouse/api/`, `backend/src/products/products.service.ts`.
- Prisma client/service: `backend/src/prisma/prisma.service.ts`.
- Schema: `backend/prisma/schema.prisma`.
- Admin UI sản phẩm/BOM: `apps/warehouse-web/src/app/products/page.tsx`, `apps/warehouse-web/src/app/bom/page.tsx`.
- Admin duyệt xuất/lỗi: `apps/warehouse-web/src/components/workspace.tsx`.

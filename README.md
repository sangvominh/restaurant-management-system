# Restaurant Management System

**Bắt đầu đọc ở đây.** Code đã được gom và nền tảng chạy/dữ liệu đã được chuẩn hóa. **Sản phẩm chưa hoàn tất**: không phải tất cả luồng nghiệp vụ đã thao tác được qua giao diện.

## Bạn nên đọc theo thứ tự nào?

1. **README này**: hiểu dự án hiện có gì, đã thay đổi gì và cách chạy hằng ngày.
2. **[Hướng dẫn test](docs/TESTING.md)**: dựng demo riêng, lấy tài khoản, chạy test và kiểm tra từng phân hệ. Đây là tài liệu tiếp theo bạn cần đọc để xem tận tay hệ thống.
3. **[Chuẩn nền tảng](docs/FOUNDATION.md)**: đọc khi cần giao việc hoặc sửa tài khoản, schema, quyền, BOM và dữ liệu chung.

Không cần đọc ngay RESOURCE_AUDIT.md hay CLEANUP_PENDING.md: chúng là nhật ký rà soát/dọn dẹp, không phải hướng dẫn bắt đầu. Bảy README bàn giao cũ ở root đã được bỏ; lịch sử vẫn có trong Git.

## Hiện trạng sáu phần của dự án

| Phần | Đã có | Còn thiếu / chưa được nghiệm thu |
| --- | --- | --- |
| Admin hệ thống | Tài khoản/hồ sơ nhân viên, vai trò/quyền, cấu hình, nhật ký, báo cáo, backup quản trị | Chưa phải bộ quản trị hoàn chỉnh cho mọi nghiệp vụ; giới hạn chi nhánh theo tài khoản quản lý còn thiếu |
| Admin kho | Nằm trong cổng quản trị chung: tồn NVL, nhập, duyệt xuất, lịch sử; có API vật tư/nhà cung cấp/điều chỉnh | Một số API chưa có màn hình tương ứng; cần nghiệm thu thêm các tình huống kho |
| Admin nhà hàng | Sản phẩm/BOM và màn hình quản lý thành phẩm | Sản xuất nhiều mẻ, hao hụt và toàn bộ vòng đời thành phẩm chưa được nghiệm thu đầy đủ |
| Nhân viên | Web Staff: đăng nhập, ca, NVL/cấp phát, tồn bếp, KDS, xem hóa đơn; API gọi món và thu tiền | UI sơ đồ bàn và gọi món còn ComingSoon; UI thanh toán chưa hoàn thiện. Chưa có app native riêng |
| App khách | Chưa có project native/mobile riêng | Chưa triển khai |
| Web khách | Khung Next.js và bộ thiết kế HTML/ảnh | Trang chạy hiện tại vẫn là template; chưa có nghiệp vụ khách hoạt động |

Luồng **nhập NVL → cấp bếp → gọi món → dùng BOM → phục vụ → tiền mặt → báo cáo** đã có kiểm thử API xuyên suốt. Điều này chưa có nghĩa là có thể đi hết luồng bằng UI Staff.

Kiểm tra gần nhất: build và TypeScript đạt; **52 unit + 50 E2E đạt**, 18 integration legacy còn skip; 3 browser test quản trị đã đạt. Test skip và màn preview không được tính là tính năng đã nghiệm thu.

## Những gì đã thay đổi trong đợt vừa rồi

- Gộp `feat/system-admin` và `feat/warehouse_ver2` vào nền `develop`, ưu tiên incoming khi conflict.
- Gom hệ thống/kho/nhà hàng về **một frontend quản trị**. Giữ Staff và Guest riêng: tổng cộng 3 frontend, dùng chung một backend và PostgreSQL.
- Thống nhất **Accounts** quản lý mật khẩu, trạng thái và phiên. Staff liên kết hồ sơ với Account; khóa/đổi mật khẩu/đổi quyền thu hồi phiên. Công thức gọi món dùng BOM, báo cáo đọc giao dịch thật.
- Tách **bootstrap**, **demo** và **test**. Khởi động không tự seed tài khoản. Demo có DB riêng, có thể dựng lại; test chính tự tạo DB nhúng.
- Bỏ frontend trùng, script/seed cũ, migration bản sao, ba bảng báo cáo giả và các file mẫu không dùng. Giữ DB phát triển, cấu hình cần chạy, migration active, backup và thiết kế Guest.

Phạm vi vừa làm là **gom code và chuẩn hóa nền tảng**, chưa phải hoàn thiện tất cả tính năng. Các thay đổi đã được commit local trên `develop`; chưa push origin trong đợt làm việc này.

## Cấu trúc cần biết

```text
backend/                    API NestJS, Prisma và migration active
frontend/web-admin-system/  Admin hệ thống + Kho + Nhà hàng
frontend/staff-app/         Web nhân viên
frontend/guest-web/         Khung web khách và thiết kế
scripts/                    Lệnh vận hành và kiểm tra chính thức
docs/TESTING.md              Hướng dẫn test + checklist nghiệm thu
docs/FOUNDATION.md           Quy tắc dữ liệu và ranh giới module
```

## Chạy môi trường phát triển

Cần Node.js 24, npm, Docker Desktop bật Linux engine. Chạy từ root repository.

```powershell
npm ci
# Chỉ tạo file cấu hình khi chưa có:
if (-not (Test-Path backend/.env)) {
  Copy-Item backend/.env.example backend/.env
}
```

Đặt JWT_SECRET ngẫu nhiên, SEED_ADMIN_EMAIL và SEED_DEFAULT_PASSWORD trong `backend/.env`. Giữ file `.env` đang có; không commit thông tin bí mật. Sau đó:

```powershell
npm run dev:up
npm run db:bootstrap
npm run dev:status
```

`dev:up` build và khởi động backend/DB, áp dụng migration. `db:bootstrap` tạo dữ liệu nền và chủ hệ thống đầu tiên; chạy lại không đổi mật khẩu/quyền đã có.

Mỗi frontend chạy trong một terminal riêng:

| Lệnh | Địa chỉ | Điểm vào |
| --- | --- | --- |
| `npm run dev:admin` | http://localhost:3004/login | Owner vào `/`; Kho vào `/warehouse`; Nhà hàng có `/warehouse/restaurant` |
| `npm run dev:staff` | http://localhost:3003/staff/login | Tài khoản có quyền staff:access và hồ sơ nhân viên |
| `npm run dev:guest` | http://localhost:3005 | Trang khung Guest |

API phát triển: http://localhost:3000/ . PostgreSQL: `127.0.0.1:5433`, DB `restaurant_dev`, user `restaurant`, mật khẩu local `local_dev_only`. Compose project/volume: `restaurant-integrated` / `restaurant-integrated_postgres_data`.

DB phát triển không được tự nạp đủ món/nhân viên demo. **Muốn xem thử và nghiệm thu, làm theo [TESTING.md](docs/TESTING.md)**: demo riêng dùng API 3010, DB 5434 và có tài khoản/dữ liệu mẫu thống nhất. Nếu frontend trỏ nhầm API, dữ liệu và tài khoản sẽ khác nhau; hướng dẫn test có cách đặt biến môi trường đúng cho từng terminal.

## Bộ lệnh dùng hằng ngày

| Lệnh | Mục đích |
| --- | --- |
| `npm run dev:up` | Build/chạy backend + DB phát triển |
| `npm run dev:status` / `npm run dev:logs` | Xem trạng thái / log |
| `npm run dev:stop` / `npm run dev:down` | Dừng / bỏ container phát triển; đều giữ volume dữ liệu |
| `npm run db:bootstrap` | Tạo dữ liệu nền và chủ hệ thống đầu tiên |
| `npm run db:migrate` | Chạy migration từ image đã build |
| `npm run db:backup` | Dump toàn bộ DB phát triển vào backups |
| `npm run demo:rebuild` | Dựng lại demo riêng, cần DEMO_PASSWORD |
| `npm run demo:stop` / `npm run demo:clean` | Dừng giữ dữ liệu / xóa môi trường demo |
| `npm run check` | Build, unit/E2E và TypeScript |

Frontend dừng bằng Ctrl+C. Backup JSON trong giao diện chỉ gồm dữ liệu quản trị; dump từ db:backup mới bao gồm toàn bộ nghiệp vụ.

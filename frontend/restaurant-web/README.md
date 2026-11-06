# Dữ liệu mẫu restaurant-web

Các màn hình quản lý món, tồn thành phẩm, duyệt phiếu và xử lý hao hụt lấy dữ liệu từ backend dùng chung. Bộ dữ liệu thử nghiệm nằm ở [`backend/prisma/seed-restaurant-web.sql`](../../backend/prisma/seed-restaurant-web.sql), dùng cho PostgreSQL local ở cổng `5433`.

## Nạp dữ liệu

Đảm bảo PostgreSQL đã chạy và các migration đã được áp dụng. Tại thư mục gốc repository, chạy trong PowerShell:

```powershell
Get-Content -Raw .\backend\prisma\seed-restaurant-web.sql | docker compose exec -T db psql -U restaurant -d restaurant_dev
```

Sau đó mở `restaurant-web`, giữ mã chi nhánh mặc định `BR001` và làm mới dữ liệu.

## Tình huống có sẵn

- Tồn thành phẩm mẫu tại `Kho thành phẩm` cho các mã `TEST-MON-001` đến `TEST-MON-003`.
- Ba món và BOM mẫu, cùng nguyên vật liệu và tồn nguyên liệu để thử lập công thức.
- Hai phiếu `PENDING` có thể thao tác duyệt/từ chối; một phiếu `REJECTED` để thử lọc.
- Các phiếu hao hụt ở trạng thái `PENDING`, `APPROVED`, và `REJECTED`.

Script có thể chạy lại và không ghi đè các bản ghi trùng mã. Các thay đổi đã thao tác trên dữ liệu mẫu (ví dụ duyệt phiếu) không tự được đặt lại khi chạy lại script.

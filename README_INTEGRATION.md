> Tài liệu lịch sử trước chuẩn hóa. Chuẩn hiện tại: [FOUNDATION](docs/FOUNDATION.md); cách chạy theo README gốc.

# Bản tích hợp feat/restaurant_v2

## Trạng thái

Đã lấy code từ `feat/restaurant_v1` (4a8d524) và `feat/staff-app` (64cc8eb), xử lý xung đột trên worktree riêng. Bản gộp được lưu trên `feat/restaurant_v2` bằng merge commit để giữ lịch sử hai nhánh nguồn. Hai nhánh nguồn và thay đổi CSS đang staged ở workspace Staff gốc được giữ nguyên.

Các ứng dụng giao diện nằm trong `frontend/` tại thư mục gốc dự án.

| Giao diện | Thư mục | Cổng mặc định |
| --- | --- | --- |
| Admin Kho | `frontend/warehouse-web` | 3001 |
| Admin Nhà hàng | `frontend/restaurant-web` | 3002 |
| Nhân viên | `frontend/staff-app` | 3003 |
| Backend chung | `backend` | 3000 |

Hai giao diện Admin giữ nguyên code của Restaurant. Staff giữ code của Staff và bổ sung bản sửa header sticky chưa commit từ workspace gốc. Không thay logic duyệt hao hụt/hoàn trả của Admin Kho.

## Phần đã ghép

- Controller, Service và Module đăng ký đủ API hai nhánh: 68 cặp method/path Warehouse, không trùng.
- Giữ Category.code, MaterialAdjustment, MaterialUsageSettlement, MaterialAdjustmentMovement của Restaurant.
- Bổ sung model/quan hệ và migration Staff; giữ báo cáo chế biến nhiều đợt và FinishedGoodsReceipt dạng một-nhiều.
- BOM giữ tên món productName của Restaurant cùng chức năng phiên bản/cập nhật của Staff; bản sao phiên bản giữ productName.
- Duyệt xuất NVL giữ kiểm tra chi nhánh/đơn vị/tồn của Kho cùng kiểm tra hạn lô cấp cho Staff.
- Seed danh mục có code; fixture Unit Test được cập nhật theo schema gộp.
- Đồng nhất proxy Staff về Backend 3000; sửa start:prod về dist/main.js theo tsconfig.build.json.

## Kiểm tra đã chạy

| Kiểm tra | Kết quả |
| --- | --- |
| Prisma generate | PASS, client sinh tại worktree mới |
| Backend typecheck / Nest build | PASS |
| Backend Unit Test | 79 PASS; 9 SKIPPED trong 2 suite PostgreSQL opt-in |
| Khởi tạo DI AppModule với Prisma giả | PASS: Warehouse, Staff, Products |
| Typecheck ba giao diện | PASS |
| Build Warehouse / Restaurant / Staff | PASS |
| So sánh endpoint Warehouse hai nguồn | Không thiếu endpoint, không trùng method/path |
| So sánh source UI hai Admin | Giữ nguyên Restaurant |
| E2E / luồng ghi DB / thao tác UI thực tế | Chưa chạy trong lượt tích hợp này |

Unit Test chạy với DATABASE_URL giả ở cổng 1, bỏ TEST_KITCHEN_DATABASE, không kết nối DB thật. Các suite PostgreSQL không được bật. Không dùng kết quả build để kết luận luồng nghiệp vụ đã PASS.

## Tình trạng luồng và phần cần thống nhất

| Luồng | Hiện trạng / hướng xử lý tiếp |
| --- | --- |
| Staff gửi đề nghị lĩnh NVL → Kho | Dùng chung MaterialIssue; trigger Staff nhận tồn bếp nằm trong migration. Chưa kiểm thử giao dịch PostgreSQL của bản gộp. |
| Staff báo chế biến → duyệt nhập thành phẩm | Dùng chung ProductionOrder/FinishedGoodsReceipt; cần test đủ nhiều đợt, duyệt/từ chối và tiêu hao theo lô. |
| Hao hụt / hoàn trả NVL | Đã nối Staff → Admin trên bản ghi nguồn, không tạo bản sao; giữ phiếu Warehouse cũ. Đã kiểm thử trên DB test; xem [báo cáo hiện tại](README_SHARED_MATERIAL_ADJUSTMENTS.md). |
| Xuất / báo lỗi thành phẩm | Staff gửi FinishedGoodsIssue/FinishedGoodsDefect/staff_processing_defects; UI Restaurant đang đọc FinishedGoodsReceipt/WasteRequest. Cần nối đúng danh sách và API duyệt, tránh hiểu nhầm duyệt nhập là duyệt xuất. |
| Tạo món và BOM | Restaurant hiện tạo món bằng POST /warehouse/boms với productName. Schema Staff bổ sung FK productCode → Product.code: tạo mã món mới chưa có trong Product sẽ bị chặn. Cần thống nhất form tạo Product + BOM hoặc contract tạo đồng thời, không tự gán giá/nhóm món giả. |
| Tiêu hao MRP | ProductionOrder cấp từ kho tổng và Staff cấp vào bếp là hai đường khác nhau. Chưa tự ghép/cấp cả hai cho cùng nhu cầu; cần đối chiếu để tránh trừ hai lần. |

**BLOCKED triển khai trên DB hiện có:** migration `20261029200000_add_product_table` thêm FK trước khi tạo dữ liệu Product và chỉ có seed vài mã cố định. Nếu DB có BOM/tồn thành phẩm với mã khác, migration có thể lỗi. Cần kiểm kê mã, mapping tên/giá/nhóm món và kế hoạch chuyển đổi trước khi áp dụng; không sửa checksum migration cũ hoặc tự tạo dữ liệu giả. Cũng cần đối chiếu lịch sử migration thực tế của hai nhánh.

Chưa chạy migration, seed, reset hay thay đổi dữ liệu DB dùng chung. Không tạo container/database/volume.

## Chạy local sau khi nhóm xác nhận DB tương thích

Chạy từ **thư mục gốc dự án**, mỗi tiến trình một terminal. Không chạy script setup/reset/seed tự động của Staff vào DB dùng chung.

1. Backend: cấu hình backend/.env với DATABASE_URL đã được nhóm duyệt và PORT=3000, rồi:
   `cd backend` → `npm ci` → `npm run prisma:generate` → `npm run start:dev`.
2. Admin Kho: `cd frontend/warehouse-web` → `npm ci` → `npm run dev`.
3. Admin Nhà hàng: `cd frontend/restaurant-web` → `npm ci` → `npm run dev`.
4. Staff: `cd frontend/staff-app` → `npm ci` → `npm run dev`; mở http://localhost:3003/staff/login.

Admin dùng API_BASE_URL, Staff dùng API_INTERNAL_URL; mặc định đều về Backend 3000. Nếu backend/.env cũ còn PORT=3001, cần đổi sang 3000 hoặc override cổng và proxy đồng bộ.

## Kiểm tra Git

- Workspace gốc vẫn ở feat/staff-app với duy nhất CSS header đã staged từ trước.
- feat/restaurant_v1 vẫn 4a8d524; feat/staff-app vẫn 64cc8eb.
- Merge commit có hai cha: Restaurant 4a8d524 và Staff 64cc8eb; xem bằng `git log -1 --format="%h %p %s"`.
- Kiểm tra trạng thái bằng `git status`; xem thay đổi so với Restaurant bằng `git diff feat/restaurant_v1...feat/restaurant_v2 --stat`.
- Các luồng ghi ở mục chưa liên thông vẫn cần tích hợp tiếp; commit bản gộp không đồng nghĩa đã nghiệm thu các luồng này.

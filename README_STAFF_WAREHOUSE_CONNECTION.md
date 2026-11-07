> Tài liệu lịch sử trước chuẩn hóa. Chuẩn hiện tại: [FOUNDATION](docs/FOUNDATION.md); cách chạy theo README gốc.

# Kết nối Staff và Admin Kho

Phạm vi: lĩnh/xuất NVL, hao hụt NVL trong kho/đã lĩnh, hoàn trả NVL.
Không triển khai hoặc chỉnh sửa Restaurant Web.

## Cách hoạt động

- Staff gửi phiếu PENDING; Kho đọc và xử lý đúng bản ghi gốc.
- Lĩnh NVL dùng MaterialIssue; hao hụt/hoàn trả dùng lớp nối SharedMaterialAdjustmentApi đã có.
- Chỉ khi Kho duyệt mới cập nhật tồn theo nghiệp vụ. Từ chối giữ lý do trả về Staff.
- Các danh sách phiếu tự tải lại mỗi 10 giây khi trang hiển thị và khi cửa sổ nhận focus.
- Chi tiết phiếu đang mở phía Staff cập nhật theo danh sách mới.
- Staff chọn được nguồn hao hụt: đang trong kho hoặc đã lĩnh tại bếp.
- Các màn Staff khác giữ hành vi useResource mặc định; không bật polling toàn ứng dụng.

## Bản chạy kiểm thử hiện tại

- Staff: http://localhost:3003
- Kho: http://localhost:3004
- Backend chung: http://127.0.0.1:3020
- Database: restaurant_integration_test trên PostgreSQL hiện có.
- Nhân viên: DEMO-KHO-STAFF / demo-password-2026, vai trò KITCHEN, chi nhánh DEMO-KHO.
- Không đổi backend/.env, không ghi restaurant_dev/restaurant_staff_demo.
- Không tạo container, database, volume hoặc chạy migration trong đợt này.

## Chạy lại

Cách khuyến nghị, chạy tại thư mục gốc repository:

    WAREHOUSE_PORT=3004 npm run dev:staff-warehouse

Lệnh này chọn restaurant_integration_test và khởi động Backend 3020, Staff 3003, Kho 3004 với cùng URL API. Không sửa .env, không migrate/seed tự động và không khởi động Restaurant Web. Dừng các tiến trình Staff/Kho/demo cũ trước nếu cổng đang bận.

Nếu chạy riêng npm run dev mà không đặt API_INTERNAL_URL, Staff sẽ đọc .env.local hiện tại và gọi Backend 3000. Backend 3000 đang dùng restaurant_dev chưa có bảng tài khoản/phiên Staff, nên có thể trả HTTP 500 “Không thể truy cập dữ liệu”. Tài khoản demo nằm trong DB test, không phải restaurant_dev.

Các cách chạy từng tiến trình dưới đây dành cho terminal đã đặt đúng biến môi trường:

Backend: đặt DATABASE_URL của terminal tới restaurant_integration_test, PORT=3020.
Chạy npm run prisma:generate, npm run build, rồi npm run start:prod.
Không dùng DATABASE_URL mặc định restaurant_dev cho kiểm thử có ghi dữ liệu.

Trong terminal Staff (Git Bash):

    cd frontend/staff-app
    API_INTERNAL_URL=http://127.0.0.1:3020 npm run dev

Trong terminal Kho (Git Bash):

    cd frontend/warehouse-web
    API_BASE_URL=http://127.0.0.1:3020 npm run dev

Hai URL phải cùng trỏ một Backend. Đây là biến môi trường cho process, không cần sửa .env.

## Kiểm thử

Trong backend, với DATABASE_URL đã đặt tới DB test:

    node scripts/check-staff-warehouse-material-issues.mjs
    node scripts/check-staff-warehouse-contract.mjs

Các script khóa tên DB và dọn fixture UUID riêng; bảo toàn dữ liệu demo đã có.
Fixture tương tác: node scripts/seed-staff-warehouse-demo.mjs.
Script demo không đặt lại mật khẩu, số dư hay phiếu khi chạy lại.

Kết quả 06/11/2026:
- 10 Unit Test liên quan lĩnh NVL/hạn sử dụng: PASS.
- HTTP regression: 4 nhóm lĩnh NVL + 14 nhóm hao hụt/hoàn trả: PASS.
- Backend build, typecheck/build hai frontend: PASS.
- Browser: Staff gửi lĩnh 5 kg -> Kho duyệt -> Staff thấy APPROVED.
- Browser: Staff gửi hao hụt STOCK 1 kg -> Kho từ chối -> Staff thấy đúng lý do.
- Browser: Staff gửi hoàn trả 1 kg từ phiếu lĩnh -> Kho xác nhận chất lượng/duyệt -> Staff thấy APPROVED và phản hồi.
- Phần hao hụt ISSUED, chống duyệt trùng, rollback và hai request đồng thời được kiểm tra bằng HTTP regression, không đánh dấu là đã thao tác tất cả trên UI.
- Các bản ghi tương tác demo được giữ để người dùng xem; fixture tự động đã dọn.

Chưa commit/push/merge.

## Bộ mẫu DEMO10

Tại thư mục gốc repository:

    node backend/scripts/seed-staff-warehouse-samples.mjs

Script chỉ chọn PostgreSQL local và database restaurant_integration_test. Cần backend đã build, tài khoản DEMO-KHO-STAFF và chi nhánh DEMO-KHO đã có.

Mỗi nhóm có 10 bản ghi mới: nhà cung cấp, danh mục NVL, NVL/lô, phiếu nhập, phiếu lĩnh, hao hụt và hoàn trả. Mã chứa DEMO10; dùng chi nhánh DEMO-KHO và vị trí Kho nguyên liệu demo.

- Phiếu lĩnh: 3 PENDING, 4 APPROVED, 3 REJECTED.
- Hao hụt: 4 PENDING, 3 APPROVED, 3 REJECTED; gồm 5 STOCK và 5 ISSUED.
- Hoàn trả: 4 PENDING, 3 APPROVED, 3 REJECTED.
- Trứng và cam có tồn dưới mức tối thiểu để xem cảnh báo.
- Phiếu được tạo/xử lý qua API hiện có; số dư đối chiếu khớp movement.
- Chạy lại không tạo trùng hoặc đặt lại phiếu đã xử lý; không đổi mật khẩu hay số dư demo cũ.
- Không bổ sung dữ liệu Restaurant Web hoặc ghi vào restaurant_dev/restaurant_staff_demo.

Đã kiểm tra trên trình duyệt: Staff thấy 11 loại NVL (10 mới + 1 cũ), Kho thấy các phiếu hoàn trả DEMO10 chờ duyệt.

## Sửa thời gian xử lý phiếu (06/11/2026)

- Staff hiển thị riêng giờ tạo và giờ duyệt/từ chối cho phiếu lĩnh, hao hụt và hoàn trả; giữ múi giờ Asia/Ho_Chi_Minh.
- API đọc hao hụt/hoàn trả bổ sung processedAt từ bản ghi hiện có, gồm nguồn STOCK và ISSUED.
- Phiếu lĩnh bổ sung processedAt nullable và lưu cùng trạng thái; rollback/duyệt trùng không ghi đè thời gian.
- Migration 20261106030000_material_issue_processed_at chỉ áp dụng vào restaurant_integration_test, chưa áp dụng vào restaurant_dev/restaurant_staff_demo.
- Phiếu lĩnh cũ chưa có thời gian xử lý hiển thị “Chưa ghi nhận”, không suy đoán từ giờ tạo.
- Kiểm chứng: 5 Unit Test PASS; HTTP regression hao hụt/hoàn trả và phiếu lĩnh PASS (fixture tạo trước khi xử lý 20 phút); Backend build, Staff typecheck/build PASS; Prisma validate/diff khớp DB test.
- Trình duyệt: HT-DEMO10-003 hiện giờ tạo 09:30, giờ duyệt 09:48; cả ba màn có nhãn thời gian riêng.

## Tránh gọi nhầm cổng Docker (06/11/2026)

Docker hiện giữ 127.0.0.1:3000 cho frontend và 127.0.0.1:3001 cho backend. Staff chạy riêng đọc .env.local trỏ API_INTERNAL_URL về 3000 sẽ gọi nhầm frontend, nhận HTML 404 ở /api/auth/login và hiện “Không thể xử lý yêu cầu”.

Lệnh Git Bash, chạy tại thư mục gốc:

    WAREHOUSE_PORT=3004 npm run dev:staff-warehouse

PowerShell:

    $env:WAREHOUSE_PORT = '3004'
    npm run dev:staff-warehouse

Dừng các tiến trình Staff/Kho/demo cũ bằng Ctrl+C trước khi chạy. WAREHOUSE_PORT chọn cổng giao diện Kho; mặc định vẫn là 3001 nếu không đặt biến. Không cần thay đổi .env hoặc Docker.

Địa chỉ: Staff http://localhost:3003/staff/login, Kho http://localhost:3004, Backend demo 3020. Cả hai dùng restaurant_integration_test. Không khởi động thêm Backend mặc định cổng 3000 cho bộ demo này.

Đã kiểm tra: đăng nhập HTTP 201; me, tồn kho Staff, hoàn trả Staff và phiếu chung Kho đều HTTP 200; trình duyệt đăng nhập thành công và vào dashboard. Không đổi mật khẩu hoặc dữ liệu nghiệp vụ.

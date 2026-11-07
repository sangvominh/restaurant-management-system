> Tài liệu lịch sử trước chuẩn hóa. Chuẩn hiện tại: [FOUNDATION](docs/FOUNDATION.md); cách chạy theo README gốc.

# Phiếu NVL dùng chung giữa Staff và Admin Kho

## Kết quả

Staff và Admin Kho đọc/xử lý cùng bản ghi gốc. Không tạo bản sao phiếu sang bảng khác.

| Nguồn phiếu | Bản ghi chung | Cách xử lý |
| --- | --- | --- |
| Hao hụt trong kho | StaffMaterialWaste | Duyệt giảm kho đúng một lần; movement liên kết trực tiếp phiếu |
| Hao hụt đã lĩnh tại bếp | staff_kitchen_waste | Dùng lượng giữ và phân bổ nguồn sẵn có; giảm bếp, không trừ kho tổng lần hai |
| Hoàn trả đã lĩnh | StaffMaterialReturn | Duyệt giảm bếp/cộng kho; movement liên kết trực tiếp phiếu |
| Phiếu Warehouse cũ | MaterialAdjustment | Giữ nguyên nghiệp vụ và ràng buộc quyết toán cũ |

Đây là dùng chung bản ghi, không ép mọi loại phiếu vào một bảng mới. Staff xem trạng thái Admin cập nhật ngay trên phiếu đã gửi. Các bản ghi hủy thành phẩm/processing defect thuộc Admin Nhà hàng không được nhập vào danh sách này.

## API và các đợt đã kiểm thử

1. Đợt đọc: GET /warehouse/material-adjustments và GET /warehouse/material-adjustments/:code hợp nhất response từ các phiếu gốc; lọc loại/trạng thái, xem đúng UUID nguồn, phát hiện mã trùng.
2. Đợt xử lý: POST /warehouse/material-adjustments/:code/approve và POST /warehouse/material-adjustments/:code/reject xử lý đúng nguồn. Tái sử dụng service giữ/tất toán tồn bếp đang có; giữ nguyên MaterialAdjustmentApi cũ.
3. Đợt đơn vị: GET /api/staff/material-returns và GET /api/staff/material-returns/eligible trả số lượng theo đơn vị tồn gốc, thống nhất với Admin. Ví dụ phiếu lĩnh 5000 g được thể hiện là 5 kg khi đơn vị tồn là kg.

Không đổi URL/body API Staff gửi phiếu; không đổi giao diện, yêu cầu chế biến, BOM, ProductionOrder hoặc ca làm.

## An toàn dữ liệu và giới hạn

- Gửi phiếu giữ nguyên tồn vật lý; ISSUED giữ lượng khả dụng trong sổ bếp như cơ chế hiện có.
- Nguồn cấp phát không đủ tin cậy thì BLOCKED; không tự tạo settlement, không mặc định tiêu hao bằng 0.
- Từ chối bắt buộc lý do; nhả lượng giữ theo service hiện có.
- Chống duyệt lại, trừ âm, xung đột đồng thời và rollback khi thiếu tồn.
- Phiếu Staff hỗ trợ duyệt toàn bộ số đề nghị; sửa số lượng thực nhận khác đề nghị trả 400. Phiếu MaterialAdjustment cũ giữ khả năng xử lý như trước.
- Hai bảng có cùng mã phiếu thì trả 409 để đối chiếu; không tự chọn một bản ghi.
- Người xử lý trong service Staff hiện được ghi bằng định danh dịch vụ warehouse-api; chưa bổ sung phân hệ xác thực tài khoản Admin.
- Chưa đánh dấu PASS giao diện hoặc triển khai lên DB đang phục vụ các giao diện.

## Migration chỉ đã chạy trên DB test

Database: restaurant_integration_test, PostgreSQL local hiện có. Tổng cộng 33 migration đã áp dụng.

- 20261105170000_staff_stock_waste_decision: thêm decision_note, processed_at, movement_id nullable và FK movement cho phiếu hao hụt kho.
- 20261105171000_staff_return_movement: thêm movement_id nullable và FK cho phiếu hoàn trả.

Không viết lại dữ liệu phiếu cũ hoặc sửa migration lịch sử. Không migrate/seed/reset restaurant_dev hoặc restaurant_staff_demo; không tạo container/volume.

## Kiểm thử

- Typecheck và build Backend: PASS.
- Unit Test: 79 PASS, 9 SKIPPED (hai suite PostgreSQL opt-in không bật).
- Test migration biệt lập: 4 PASS; vẫn tái hiện rủi ro FK Product khi nâng cấp BOM cũ.
- 14 nhóm HTTP regression bằng session thật + fixture UUID riêng: cùng bản ghi/mã/trạng thái, không sao chép; gửi không thay tồn; duyệt/từ chối ba nguồn; số lượng/đơn vị g/kg; chống trùng/thiếu tồn/âm tồn; hai request đồng thời; rollback; nguồn thiếu và mã trùng; hạn sử dụng; chi nhánh; phiếu MaterialAdjustment cũ.
- Fixture và schema tạm được dọn sau chạy. Không sử dụng các tiến trình Backend đang nối DB demo để gửi dữ liệu test.

Công cụ: backend/scripts/check-staff-warehouse-contract.mjs (khóa target restaurant_integration_test) và backend/test/integration-schema.e2e-spec.ts.

## File triển khai chính

- backend/src/warehouse/api/shared-material-adjustment.api.ts: lớp nối và xử lý trên bản ghi nguồn.
- backend/src/warehouse/warehouse.service.ts, warehouse.module.ts: wiring.
- backend/src/staff/material-return.controller.ts: thống nhất số lượng/đơn vị hai GET.
- backend/src/staff/kitchen-return-decision.service.ts: lưu movementId vào phiếu gốc.
- backend/prisma/schema.prisma và hai migration metadata trên.
- backend/src/warehouse/warehouse.service.spec.ts: cập nhật kiểu dependency test.

Chưa commit/push. Phần yêu cầu chế biến và ca làm để giai đoạn sau theo phân công nhóm.

# Nghiệm thu giao diện Admin Kho

Phạm vi được xác nhận: chỉ frontend/warehouse-web, nhánh develop. Các thay đổi Backend có sẵn trước lượt này được giữ nguyên.

## Sáu yêu cầu

1. Đã bỏ dòng eyebrow phụ ở tất cả component có sử dụng; giữ tiêu đề chính và điều hướng.
2. Danh sách phiếu nhập được chuyển vào popup “Lịch sử nhập kho”, mở từ trang và từ form nhập. Giữ bộ lọc NCC/chi nhánh/ngày, tải lại và xem phiếu. Có loading, empty, error, đóng và cuộn; form nhập không bị khởi tạo lại.
3. Bỏ nút và cột xem chi tiết ở bảng Tồn kho NVL. Giữ trang/API chi tiết cho các chức năng khác, tìm kiếm, lọc và cảnh báo.
4. Báo cáo hiển thị “Tồn kho hiện tại”, chú thích ngắn và bộ lọc chi nhánh. Không giả lập báo cáo theo kỳ.
5. Dashboard dùng Recharts đã có: 4 KPI, biểu đồ khả dụng/mức tối thiểu theo từng đơn vị và donut số loại NVL theo danh mục. Không cộng chung số lượng khác đơn vị; không vẽ xu hướng từ lịch sử bị giới hạn.
6. Tăng chữ nhỏ khoảng 1–2px trong CSS riêng Warehouse; kiểm tra desktop 1440×900 và mobile 390×844, sửa nhãn tra cứu header trên mobile, hỗ trợ cuộn bảng/popup.

## File giao diện

- src/app/globals.css — font, popup, biểu đồ và responsive.
- src/components/dashboard/warehouse-dashboard.tsx — KPI, loading và bố cục biểu đồ.
- src/components/dashboard/inventory-charts.tsx — biểu đồ client mới từ dữ liệu API.
- src/components/inventory/inventory-list.tsx — bỏ eyebrow, cột/nút chi tiết.
- src/components/inventory/inventory-detail.tsx — chỉ bỏ eyebrow.
- src/components/layout/app-shell.tsx — nhãn báo cáo và liên kết tra cứu responsive.
- src/components/warehouse/receipt-management.tsx — popup lịch sử, trạng thái lỗi riêng; giữ nguyên submit nhập kho.
- src/components/warehouse/warehouse-history.tsx — tên/nhãn tồn kho hiện tại, bỏ cảnh báo dài.
- src/components/warehouse/material-management.tsx — chỉ bỏ eyebrow.
- src/components/warehouse/supplier-management.tsx — chỉ bỏ eyebrow.
- src/components/warehouse/material-issue-management.tsx — chỉ bỏ eyebrow.
- UI_REVIEW.md — báo cáo này.

## Kiểm thử

- Frontend typecheck: PASS sau từng nhóm và sau thay đổi cuối.
- Frontend production build: PASS.
- UI thực tế: Dashboard, tồn kho/tìm kiếm, báo cáo, lịch sử giao dịch; popup lịch sử hiển thị 3 phiếu thật, lọc theo ngày không có kết quả, lỗi NCC không tồn tại và xem chi tiết PN003.
- UI bản nháp: mã phiếu và ghi chú được giữ sau khi mở/đóng lịch sử; không gửi form.
- UI thêm/sửa: mở/đóng form NCC, NVL, danh mục; mở chi tiết, modal duyệt và modal từ chối xuất NVL; lý do từ chối vẫn bắt buộc.
- Hao hụt và hoàn trả: xác nhận trạng thái rỗng đúng dữ liệu restaurant_dev.
- Responsive: biểu đồ và popup vừa màn hình; không tràn chiều ngang document ở mobile. Bảng dài cuộn trong vùng chứa.
- Số liệu Dashboard tại thời điểm kiểm tra: 10 NVL, 6 cảnh báo, 1 phiếu xuất chờ, 3 phiếu nhập; tổng donut khớp 10 NVL.
- Không thực hiện thêm/sửa/lưu phiếu hoặc duyệt/từ chối ghi DB trong lượt kiểm thử UI này. Không đánh dấu đã kiểm thử trọn nghiệp vụ ghi dữ liệu.
- Đã so sánh diff Backend với mốc đầu lượt: không đổi.

## Giới hạn API

Lịch sử giao dịch hiện chỉ tối đa 100 dòng; danh sách phiếu nhập và phiếu xuất chờ tối đa 50. Không đủ để khẳng định báo cáo tháng/quý/năm đầy đủ hoặc dựng xu hướng lịch sử chính xác. KPI phiếu có nêu giới hạn 50; màn báo cáo chỉ dùng số dư hiện tại.

Không sửa Backend, schema, migration, database, dependency hay phân hệ khác. Không commit/push/merge.

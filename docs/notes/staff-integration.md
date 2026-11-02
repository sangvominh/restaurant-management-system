# Tích hợp app nhân viên và kho

- Dùng mô hình nguyên liệu, lô, tồn kho, BOM và lệnh sản xuất của nhánh kho làm nguồn chính.
- Tạm ngừng ghi nhận chế biến qua API đơn món cũ vì luồng đó trừ kho riêng; chưa xoá dữ liệu cũ.
- Kho hiện giảm tồn khi cấp nguyên liệu cho lệnh hoặc duyệt phiếu xuất; hai luồng cần đối chiếu để tránh cấp trùng.
- Dự kiến quản lý giao lệnh, nhân viên báo hoàn thành; quản lý duyệt nhập và xuất thành phẩm. Các quyết định này cần nhóm đối chiếu.
- API kho chưa có xác thực/phân quyền đầy đủ; không dùng với dữ liệu thật cho đến khi bảo vệ API.
- Migration đã thử trên database mới; chưa có phương án nâng cấp database cũ có dữ liệu.
- Phiếu hoàn trả và cách ghi nhận hao hụt sau khi xuất cần làm rõ và bổ sung.

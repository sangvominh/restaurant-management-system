# BOM và lệnh sản xuất

- Quyền `bom:manage`: tạo/sửa/xóa BOM nháp, áp dụng BOM. BOM đã áp dụng không sửa/xóa; thay định mức bằng phiên bản mới.
- Quyền `production:manage`: xem toàn bộ lệnh, chọn BOM đã áp dụng và đến ngày hiệu lực, giao cho nhân viên có quyền `production:perform`, hủy lệnh chưa nhận.
- Quyền `production:perform`: xem và nhận lệnh của mình.
- Người tạo BOM/giao lệnh cần hồ sơ người sử dụng đang hoạt động liên kết tài khoản.

Ví dụ: BOM đầu ra 10 phần, cần 2 kg gà. Lệnh 25 phần hiển thị nhu cầu 5 kg gà. Dùng đơn vị cơ sở, chưa quy đổi đơn vị.

Thao tác: tạo BOM → thêm NVL/định mức → lưu nháp → áp dụng → tạo lệnh → đăng nhập người nhận → nhận lệnh.

Trạng thái lệnh: NEW (chưa nhận), RECEIVED (đã nhận), CANCELLED (hủy). Tạo/nhận lệnh chưa làm thay đổi tồn kho. Cấp NVL, ghi nhận sản xuất và nghiệm thu là bước tiếp theo.

Không thay schema, không cần migration cho phần này.

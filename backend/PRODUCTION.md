# BOM và lệnh sản xuất

- Quyền `bom:manage`: tạo/sửa/xóa BOM nháp, áp dụng BOM. BOM đã áp dụng không sửa/xóa; thay định mức bằng phiên bản mới.
- Quyền `production:manage`: xem toàn bộ lệnh, chọn thành phẩm và số lượng, giao cho nhân viên có quyền `production:perform`, hủy lệnh chưa nhận. Backend tự chọn công thức ACTIVE có ngày hiệu lực mới nhất không vượt hiện tại; cùng ngày giờ thì chọn phiên bản cao hơn. Bản nháp/tương lai không được chọn. Lệnh lưu bomId nên đổi công thức không làm thay đổi lệnh cũ.
- Quyền `production:perform`: xem và nhận lệnh của mình.
- Người tạo BOM/giao lệnh cần hồ sơ người sử dụng đang hoạt động liên kết tài khoản.
- Phiên bản tự cấp bằng số cao nhất đã lưu của thành phẩm + 1 (tính cả nháp/tương lai) trong transaction có khóa. Sửa nháp giữ phiên bản và thành phẩm cũ. Số hiển thị trước khi lưu chỉ là dự kiến; bản lưu là số chính thức. Xóa bản nháp cao nhất có thể khiến số đó được cấp lại, không phải chuỗi chứng từ liên tục.

Ví dụ: công thức cho 1 phần cần 0,2 kg gà. Lệnh 25 phần hiển thị nhu cầu 5 kg gà. Công thức mới cố định đầu ra bằng 1 đơn vị cơ sở; chưa quy đổi đơn vị.

Công thức cũ đã áp dụng vẫn giữ nguyên đầu ra và được tính theo tỷ lệ chính xác như trước. Khi sửa BOM nháp cũ có đầu ra khác 1, cần nhập lại định mức từng NVL cho 1 đơn vị trước khi lưu/áp dụng. Không tự chuyển dữ liệu hoặc làm tròn các công thức cũ. Các bản ACTIVE cũ là lịch sử; bản được dùng cho lệnh mới được xác định theo quy tắc ngày hiệu lực ở trên.

Thao tác: tạo BOM → thêm NVL/định mức → lưu nháp → áp dụng → tạo lệnh → đăng nhập người nhận → nhận lệnh.

Trạng thái lệnh: NEW (chưa nhận), RECEIVED (đã nhận), CANCELLED (hủy). Tạo/nhận lệnh chưa làm thay đổi tồn kho. Cấp NVL, ghi nhận sản xuất và nghiệm thu là bước tiếp theo.

Không thay schema, không cần migration cho phần này.

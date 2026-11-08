# Xuất thành phẩm và báo cáo kho

- `export:request`: chọn đơn bán đã xác nhận, nhập lượng xuất từng dòng, ghi lý do và gửi đề nghị. Phiếu chờ không trừ tồn nhưng giữ số lượng còn được xuất của đơn.
- `export:approve`: duyệt xuất đủ hoặc từ chối. Duyệt kiểm tra tồn, trạng thái thành phẩm và số lượng đơn; ghi sổ một lần, không sửa phiếu đã duyệt.
- `inventory:view`: xem tồn thành phẩm từ các biến động đã ghi sổ.
- `report:stock`: nhập–xuất–tồn NVL/thành phẩm theo tháng, quý, năm, ngày Việt Nam. Không cộng gộp các đơn vị khác nhau; không có báo cáo giá trị tiền.

NVL: chỉ biến động vào/ra TRONG_KHO ảnh hưởng báo cáo kho. Cấp là xuất, hoàn là nhập. Tiêu hao/hao hụt tại bếp không trừ kho lần nữa.

Thành phẩm: NHAP_SAN_XUAT tăng tồn qua nghiệm thu; XUAT_BAN và các biến động xuất khác giảm tồn. Không còn nhánh nhập trực tiếp thành phẩm mua về.

Chỉ đơn bán CONFIRMED được đề nghị/duyệt xuất. Tạo và xác nhận đơn tại web Restaurant (cổng 3002), không tạo đơn trong web Kho. Đơn COMPLETED đã thanh toán không được xuất thêm. Danh mục nguyên liệu và thành phẩm vẫn riêng, kết nối qua BOM và lệnh chế biến.

Kiểm tra: nghiệm thu 9 phần → tồn 9; đề nghị xuất 4 → tồn vẫn 9; duyệt → tồn 5. Báo cáo kỳ chứa hai nghiệp vụ phải có nhập 9, xuất 4, tồn cuối 5 nếu tồn đầu 0.

Không đổi schema, không cần migration. Chưa chạy build/test hoặc truy cập DB.

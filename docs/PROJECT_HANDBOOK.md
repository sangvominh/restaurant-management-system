# HỒ SƠ DỰ ÁN — HỆ THỐNG QUẢN LÝ NHÀ HÀNG

> Bản tổng hợp tự sinh. Chỉnh sửa các trang trong docs/content/, không sửa trực tiếp file này. Chạy `npm run export` trong thư mục docs để đồng bộ.

## Giao diện

1. **Web Admin hệ thống**: dành cho Admin, quản lý tài khoản, phân quyền, danh mục và cấu hình nhà hàng.
2. **Web quản lý kho**: dành cho quản lý kho, nhà cung cấp, nhập kho, công thức, giao sản xuất, duyệt phiếu và báo cáo kho.
3. **Web quản lý nhà hàng**: dành cho quản lý nhà hàng, theo dõi đơn, bàn, thực đơn, doanh thu và báo cáo bán hàng.
4. **Web khách tại bàn**: dành cho khách vãng lai, quét QR, xem menu, gọi thêm, theo dõi món và xem hóa đơn.
5. **App nhân viên**: dành cho bếp, phục vụ và thu ngân, nhận và xử lý yêu cầu theo vai trò.
6. **App khách thành viên**: dành cho khách đã đăng ký, đặt bàn trước, xem lịch sử, điểm và ưu đãi.

### Nguyên tắc đã thống nhất

- Đặt bàn giữ một bàn cụ thể theo chi nhánh và khung giờ; hỗ trợ yêu cầu mã/loại bàn và ghi chú.
- QR định danh bàn. Nhân viên xác nhận đơn và kiểm tra khách tại bàn ngoài phần mềm.
- Hóa đơn theo khách; gọi thêm vào hóa đơn chưa thanh toán. Khách vãng lai không bắt buộc có tài khoản.
- Không có bước mở/đóng phiên phục vụ hoặc bắt cập nhật tiến độ từng món.
- Trừ kho khi chế biến; quản lý hàng kho theo lô và hạn sử dụng.
- Nhập nguyên liệu theo nghiệp vụ thông thường, không tự thêm tầng phê duyệt.

Giao hàng, HRM, CRM đầy đủ và các tích hợp nâng cao chưa thuộc phạm vi ban đầu. Chính sách thanh toán, ưu đãi và điểm được chốt khi làm phần liên quan.

---

## Luồng nghiệp vụ chính

### Phục vụ khách

1. Khách đặt bàn theo chi nhánh và khung giờ, hoặc đến trực tiếp.
2. Nhân viên hướng dẫn khách vào bàn. Khách quét QR, xem menu và gửi món.
3. Nhân viên tiếp nhận và xác nhận đơn.
4. Bếp chế biến; ghi nhận nguyên liệu sử dụng và giảm tồn theo lô.
5. Khách gọi thêm vào hóa đơn của mình chưa thanh toán; đơn mới vẫn qua xác nhận.
6. Thu ngân kiểm tra hóa đơn và ghi nhận thanh toán.

Mỗi hóa đơn phải nhận diện đúng khách, kể cả khi nhiều khách ngồi chung bàn. Cách nhận diện khách vãng lai và thao tác ghi nhận chế biến sẽ được thiết kế khi làm tính năng.

### Kho và sản xuất

1. Nhận nguyên liệu, lập phiếu nhập theo chi nhánh, số lượng, lô và hạn sử dụng.
2. Quản lý lập công thức, đề nghị sản xuất và giao nhân viên.
3. Nhân viên kiểm tra nguyên liệu, lập đề nghị xuất; quản lý duyệt theo nghiệp vụ MRP.
4. Ghi nhận nguyên liệu dùng khi chế biến và thành phẩm tạo ra.
5. Nhân viên đề nghị xuất thành phẩm để bán; quản lý duyệt và xem báo cáo kho.

Một lượng nguyên liệu chỉ được trừ một lần giữa luồng gọi món và MRP. Không trừ kho khi gửi đơn, xác nhận đơn hoặc thanh toán.

### Phân tích dữ liệu

Dữ liệu bán hàng và kho → xử lý → tính KPI → trình bày kết quả và đo thực nghiệm. Bắt đầu với doanh thu, món bán và lượng nguyên liệu sử dụng; công nghệ và quy mô dữ liệu chọn theo yêu cầu môn.

---

## Yêu cầu ba môn

### SE

Mục tiêu là sản phẩm phần mềm tốt; chưa có đề riêng để đối chiếu thang điểm. Khi làm chức năng, ghi đầu vào, xử lý, đầu ra và cách kiểm thử để dùng cho báo cáo.

### HTTTDN — MRP

Theo đề: nhóm tối đa 5 người. Lịch chấm ghi trong đề là 09–22/11/2026, cần xác nhận nếu giảng viên thay đổi.

| Phần          | Điểm | Cần có                                                                  |
| ------------- | ---: | ----------------------------------------------------------------------- |
| Báo cáo       |   40 | Giới thiệu/khảo sát, phân tích, thiết kế, cài đặt/hướng dẫn và tổng kết |
| CSDL và Admin |   30 | CSDL, phương án sao lưu/phục hồi, khu Admin riêng                       |
| MRP           |   30 | Quản lý kho và nghiệp vụ nhân viên                                      |

Chức năng bắt buộc:

- Admin: xem, tìm kiếm thường/nâng cao, sắp xếp/lọc sản phẩm và nhà cung cấp; thêm/xóa/phân quyền tài khoản.
- Kho: nhập nguyên liệu, duyệt xuất nguyên liệu và thành phẩm; quản lý công thức, đề nghị số lượng sản xuất và giao nhân viên.
- Nhân viên: nhận yêu cầu, kiểm tra nguyên liệu, đề nghị xuất, tạo thành phẩm và đề nghị xuất để bán.
- Thống kê nguyên liệu/thành phẩm theo tháng, quý, năm.

Hồ sơ cần có khảo sát ít nhất 15 câu hỏi và kết quả thực tế; sơ đồ chức năng, ngữ cảnh, luồng dữ liệu mức đỉnh; CSDL và giao diện; cài đặt, chuyển đổi nếu có và hướng dẫn; kế hoạch 15 tuần và tỷ lệ đóng góp. Nộp báo cáo in và bộ điện tử gồm thông tin nhóm, source, báo cáo, SQL; chuẩn bị tài khoản và dữ liệu demo.

### Big Data

Nhóm dự kiến chọn **Processing → Analytics**. Cần:

- Xác định quy trình con và quan hệ với bước trước/sau.
- Mô tả nguồn, schema, định dạng, quy mô dữ liệu và ví dụ input/output.
- Giải thích công nghệ, kiến trúc và luồng dữ liệu.
- Chứng minh ít nhất hai đặc trưng Big Data bằng dữ liệu/thực nghiệm.
- Demo chạy lại được, có log, kết quả và số đo xử lý.
- Nộp PDF, source/config/README, dữ liệu mẫu hoặc script sinh dữ liệu, minh chứng và phân công.

Đề không ấn định số bản ghi tối thiểu hay bắt buộc dự báo. Cần xác nhận mốc nộp với giảng viên vì đề dùng cả tên giữa kỳ/cuối kỳ. Nhóm phải hiểu và giải thích phần nộp; ghi nhận việc dùng AI khi sử dụng đáng kể.

### Nguồn đối chiếu

HTTTDN: https://docs.google.com/document/d/1uA6sPDF73jaTq9T4zimlma_7zdsbPXdU/edit
Big Data: https://docs.google.com/document/d/15u4iYv0xGjes4d_iRYiGbatHpnv6UX_I/edit

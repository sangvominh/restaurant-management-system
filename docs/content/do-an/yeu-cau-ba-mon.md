---
id: BASE-5
specStatus: Nền tảng
codeStatus: Không biểu thị tiến độ code
owner: Nhóm dự án
reviewed: "2026-10-08"
summary: Yêu cầu ba môn
---

# Yêu cầu ba môn

## SE

Mục tiêu là sản phẩm phần mềm tốt; chưa có đề riêng để đối chiếu thang điểm. Khi làm chức năng, ghi đầu vào, xử lý, đầu ra và cách kiểm thử để dùng cho báo cáo.

## HTTTDN — MRP

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

## Big Data

Nhóm dự kiến chọn **Processing → Analytics**. Cần:

- Xác định quy trình con và quan hệ với bước trước/sau.
- Mô tả nguồn, schema, định dạng, quy mô dữ liệu và ví dụ input/output.
- Giải thích công nghệ, kiến trúc và luồng dữ liệu.
- Chứng minh ít nhất hai đặc trưng Big Data bằng dữ liệu/thực nghiệm.
- Demo chạy lại được, có log, kết quả và số đo xử lý.
- Nộp PDF, source/config/README, dữ liệu mẫu hoặc script sinh dữ liệu, minh chứng và phân công.

Đề không ấn định số bản ghi tối thiểu hay bắt buộc dự báo. Cần xác nhận mốc nộp với giảng viên vì đề dùng cả tên giữa kỳ/cuối kỳ. Nhóm phải hiểu và giải thích phần nộp; ghi nhận việc dùng AI khi sử dụng đáng kể.

## Nguồn đối chiếu

HTTTDN: https://docs.google.com/document/d/1uA6sPDF73jaTq9T4zimlma_7zdsbPXdU/edit
Big Data: https://docs.google.com/document/d/15u4iYv0xGjes4d_iRYiGbatHpnv6UX_I/edit

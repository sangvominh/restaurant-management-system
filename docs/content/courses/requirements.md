---
id: "HDB-03"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Yêu cầu ba môn"
---

# 3. Yêu cầu nghiệm thu của từng môn

<DocMeta />

## 3.1 SE

**[CHỐT] Không có file đề riêng; mục tiêu được cung cấp là làm một sản phẩm phần mềm tốt.** Không có căn cứ để tự đặt thang điểm chính thức.

Kế hoạch nhóm yêu cầu mỗi chức năng được phân rã thành chức năng con, có đầu vào, xử lý, đầu ra, dữ liệu lưu và lưu đồ. Tài liệu/kiểm thử triển khai nên giữ cách mô tả này để hỗ trợ báo cáo.

## 3.2 HTTTDN

**[ĐỀ MÔN] Nhóm tối đa 5 người; lịch chấm trong file: tuần 10–11, từ 09/11/2026 đến 22/11/2026.** Đây là lịch ghi trong đề, chưa xác nhận thay đổi về sau.

| Nhóm tiêu chí | Điểm tối đa | Nội dung |
|---|---:|---|
| Báo cáo | 40 | Giới thiệu và khảo sát 10; phân tích 10; thiết kế CSDL/giao diện 10; cài đặt/hướng dẫn 5; tổng kết 5 |
| CSDL và Admin | 30 | CSDL 10, gồm phương án sao lưu/phục hồi; giao diện Admin 20 |
| Nghiệp vụ lựa chọn: MRP | 30 | Quản lý kho 20; nhân viên 10 |

Hồ sơ cần có:

- Giới thiệu doanh nghiệp, hoạt động, mô hình, nhân sự.
- Khảo sát HTTT ít nhất 15 câu hỏi, tổng kết kết quả và kết luận. Chưa có thông tin xác nhận doanh nghiệp khảo sát cụ thể; không tự tạo kết quả khảo sát như dữ liệu thật.
- Bài toán chi tiết; sơ đồ chức năng, sơ đồ ngữ cảnh, luồng dữ liệu mức đỉnh.
- Lược đồ CSDL gắn với phân tích; mô tả bảng và thuộc tính; hình ảnh và mô tả giao diện.
- Phương án cài đặt, chuyển đổi từ hệ thống cũ nếu có; hướng dẫn sử dụng; ưu/nhược điểm và hướng phát triển.
- Kế hoạch làm việc 15 tuần, nội dung và tỷ lệ đóng góp từng thành viên.
- Báo cáo in; bộ nộp điện tử gồm `readme.txt` thông tin nhóm, source code, báo cáo, script SQL.
- Dữ liệu demo đầy đủ, tài khoản kiểm thử và các giao dịch/công việc mẫu.

Admin bắt buộc có khu vực riêng, xem/tìm kiếm/tìm nâng cao/sắp xếp/lọc sản phẩm và nhà cung cấp, thêm/xóa/phân quyền account. Kế hoạch mở rộng thêm sửa/khóa tài khoản, log và thao tác backup/restore. Đề yêu cầu phương án backup/restore trong báo cáo; không được nhầm rằng đề bắt buộc tất cả phải là nút chức năng trên web.

MRP bắt buộc giữ các khả năng:

1. Quản lý nhập nguyên liệu, duyệt xuất nguyên liệu và thành phẩm.
2. Quản lý công thức sản phẩm, đề nghị số lượng cần sản xuất và giao nhân viên.
3. Nhân viên nhận yêu cầu, kiểm tra nguyên liệu, lập đề nghị xuất, tạo thành phẩm và đề nghị xuất thành phẩm để bán.
4. Thống kê nguyên liệu/thành phẩm theo tháng, quý, năm.

DFD mức sâu hơn, use case/activity/sequence, WebSocket, hao hụt và quy đổi đơn vị xuất hiện trong kế hoạch; không phải tất cả được liệt kê thành tiêu chí bắt buộc riêng trong đề.

## 3.3 Big Data

**[ĐỀ MÔN] Chọn một quy trình con trong pipeline. [KẾ HOẠCH] Nhóm chọn Processing → Analytics.**

Chuỗi tổng quát trong đề: Sources → Ingestion → Storage → Processing → Analytics → Presentation → Decision/Action. Phần nhóm chọn tập trung biến dữ liệu đã xử lý/chuẩn bị thành KPI, truy vấn hoặc mô hình có kết quả và diễn giải. Các bước bổ trợ phục vụ demo không đồng nghĩa cam kết triển khai toàn bộ pipeline sản xuất.

Yêu cầu bắt buộc:

- Chỉ rõ ranh giới quy trình, quan hệ với bước trước/sau.
- Nêu ít nhất hai đặc trưng Big Data phù hợp trong Volume, Velocity, Variety, Veracity hoặc nhu cầu phân tán/mở rộng; giải thích bằng dữ liệu và thực nghiệm.
- Mô tả nguồn, cách lấy, schema, định dạng, số bản ghi/dung lượng, tốc độ nếu có; có ví dụ input/output.
- Giải thích vai trò và lý do chọn từng công nghệ.
- Sơ đồ kiến trúc/data-flow, nơi lưu/xử lý và giao diện dữ liệu giữa các bước.
- Demo có log, kết quả, thời gian xử lý hoặc chỉ số phù hợp; người khác chạy lại được.
- Nộp báo cáo PDF, source/config/README, dữ liệu mẫu hoặc script sinh dữ liệu, minh chứng và phân công.

Đề không ấn định số bản ghi tối thiểu, không bắt buộc tất cả công nghệ gợi ý và không bắt buộc dự báo. Chỉ phân tích tệp nhỏ bằng Pandas hoặc vẽ biểu đồ từ vài giao dịch không tự chứng minh đáp ứng Big Data.

Thang điểm ghi ở mục đánh giá giữa kỳ: hệ thống 2,5; thiết kế/kỹ thuật 2; thực nghiệm 2; đặc trưng Big Data/mở rộng 1,5; phân tích 1; báo cáo/tái lập 1. Báo cáo được khuyến nghị khoảng 30 trang A4 không tính phần phụ. File dùng xen kẽ tên giữa kỳ/cuối kỳ; cần xác nhận mốc nộp với giảng viên thay vì tự suy ra hai lần nộp.

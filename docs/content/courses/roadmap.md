---
id: "HDB-13"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Phân công & lộ trình"
---

# 13. Phân công và trình tự triển khai

<DocMeta />

## 13.1 Phân công gốc trong kế hoạch SE

| Thành viên | Module trong kế hoạch gốc |
|---|---|
| Võ Minh Sang | Tài khoản, phân quyền, bàn và thực đơn |
| Nguyễn Huỳnh Hoàng Vũ | Đặt bàn và phiên phục vụ |
| Nguyễn Tấn Phát | Gọi món và xử lý tại bếp |
| Nguyễn Văn Hiền Nhân | Thanh toán và hóa đơn |
| Thái Quang Hiểu | Báo cáo và thành viên |

Đây là phân công được ghi trong tài liệu nguồn, chưa xác nhận còn nguyên sau khi ghép ba môn. Chưa có phân công Big Data chi tiết. Một người có thể làm phần code phục vụ nhiều môn; báo cáo cần phản ánh đóng góp thực tế.

Kế hoạch HTTTDN giai đoạn đầu giao Phát mô tả bài toán, Hiểu vẽ sơ đồ, Sang CSDL/SQL, Vũ UI Admin và hỗ trợ dữ liệu mẫu, Nhân UI quản lý/nhân viên. Các task backend/frontend tiếp theo chưa có căn cứ để gán hết cho từng người.

## 13.2 Các mốc cũ cần xác nhận lại

Kế hoạch HTTTDN có mốc 27/09/2026 cho task 1/4 và 01/10/2026 cho task 2/3. Đây là mốc trong kế hoạch, không phải bằng chứng task đã hoàn thành. Không suy ra tiến độ chỉ từ ngày hoặc trạng thái trong PDF.

Kế hoạch nhóm ghi cập nhật thứ Năm, hoàn thành/minh chứng trước 21:00 Chủ nhật. Áp dụng thực tế theo thống nhất hiện tại của nhóm; tài liệu này không tự thực thi chế tài hay gửi báo cáo cho thành viên.

## 13.3 Thứ tự phát triển đề xuất

| Giai đoạn | Việc làm | Điều kiện hoàn thành |
|---|---|---|
| A. Nền tảng | NestJS, PostgreSQL, web shell, migration, seed, auth/permission, OpenAPI | Đăng nhập các vai trò; API chặn đúng quyền; người khác chạy lại được |
| B. Dữ liệu gốc | Bàn, menu, nhà cung cấp, hàng kho, đơn vị | CRUD có validate, lọc, trạng thái hoạt động và dữ liệu mẫu |
| C. Luồng phục vụ | Phiên, đặt bàn, order, bếp, cập nhật tức thời | Một phiên gọi nhiều lần; bếp xử lý và khách thấy đúng trạng thái |
| D. Luồng MRP | Nhập, BOM, lệnh, đề nghị, duyệt, hoàn tất, xuất, hao hụt | Đối soát được tồn; retry/duyệt cạnh tranh không sai số |
| E. Hóa đơn/thành viên | Chính sách tiền, thanh toán, đóng phiên, tích điểm | Tổng tiền đúng; thanh toán/điểm không lặp |
| F. Tích hợp POS–kho | Chốt rồi nối điểm tiêu hao | Một nghiệp vụ chỉ trừ lượng liên quan một lần |
| G. Phân tích | Data contract, export, dataset mở rộng, KPI, thực nghiệm | Chạy độc lập; KPI đối soát được; minh chứng theo đề |
| H. Bàn giao | Báo cáo, hướng dẫn, SQL, demo, phân công thực tế | Đủ hồ sơ từng môn và một kịch bản demo xuyên suốt |

C, D và chuẩn bị G có thể được các thành viên thực hiện song song sau khi hợp đồng dùng chung ổn định. Đây là gợi ý tổ chức công việc, không phải ủy quyền triển khai tự động.

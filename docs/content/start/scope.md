---
id: "HDB-02"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Phạm vi sản phẩm"
---

# 2. Phạm vi sản phẩm và các giao diện

<DocMeta />

## 2.1 Các bề mặt sử dụng

| Giao diện | Người dùng | Công việc chính | Mức độ |
|---|---|---|---|
| Web Admin hệ thống | Admin | Tài khoản, phân quyền, danh mục, cấu hình nhà hàng, quản trị dữ liệu | CHỐT về trách nhiệm HTTTDN; chi tiết theo kế hoạch |
| Web nghiệp vụ quản lý | Quản lý kho/nhà hàng | Nhập kho, công thức, giao sản xuất, duyệt phiếu, báo cáo | KẾ HOẠCH và ĐỀ MÔN MRP |
| App nhân viên | Bếp, phục vụ, thu ngân | Nhận/xử lý yêu cầu và thực hiện nghiệp vụ theo vai trò | KẾ HOẠCH |
| Web khách vãng lai | Khách tại bàn | Quét QR, xem menu, gọi thêm, theo dõi món, xem hóa đơn | KẾ HOẠCH |
| App khách thành viên | Khách đăng ký | Chức năng khách, đặt bàn trước, lịch sử, điểm và ưu đãi | KẾ HOẠCH |

**Ranh giới quan trọng:** HTTTDN sở hữu trách nhiệm quản trị trong cách chia đồ án; điều đó không có nghĩa Admin hệ thống và quản lý kho là cùng một vai trò. Đề HTTTDN yêu cầu giao diện Admin tách biệt với giao diện quản lý nghiệp vụ. Có thể triển khai cùng một web với khu vực, layout và quyền riêng; không bắt buộc tách server chỉ vì yêu cầu giao diện.

## 2.2 Phạm vi cơ sở trong kế hoạch

- Tài khoản, xác thực và phân quyền.
- Khu vực, bàn, sức chứa, mã QR; thực đơn và trạng thái món.
- Đặt bàn, check-in, phiên phục vụ.
- Gọi món, gọi thêm, cập nhật tiến độ bếp, thông báo phục vụ.
- Hóa đơn, khuyến mãi, VAT, thanh toán, đóng phiên.
- Thành viên, điểm tích lũy, lịch sử sử dụng.
- Nhà cung cấp, nguyên liệu, đơn vị tính, công thức, nhập/xuất kho.
- Lệnh sản xuất, thành phẩm, duyệt đề nghị, hao hụt.
- Báo cáo vận hành, báo cáo kho và phân tích Big Data.

## 2.3 Không mặc nhiên đưa vào phạm vi bắt buộc

- HRM đầy đủ: chấm công, lương, nghỉ phép; CRM đầy đủ: khảo sát/đánh giá khách hàng. Đề HTTTDN cho chọn một nhánh và nhóm chọn MRP.
- Giao hàng, mang đi, tích hợp đơn vị vận chuyển, hệ thống quảng cáo: bản kết hợp có nhắc mua online/quảng cáo nhưng chưa mô tả đủ.
- Nhiều chi nhánh, nhiều doanh nghiệp thuê chung hệ thống.
- Cổng thanh toán cụ thể, hóa đơn điện tử có giá trị pháp lý, quy tắc thuế áp dụng thực tế.
- Kafka, Hadoop, Spark, Kubernetes, microservices hoặc bất kỳ công cụ nào chỉ vì tên xuất hiện trong ví dụ đề môn.

Các mục này có thể được bổ sung sau; hiện không được tự mở rộng backlog thành yêu cầu bắt buộc.

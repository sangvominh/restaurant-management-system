---
id: BASE-3
specStatus: Nền tảng
codeStatus: Không biểu thị tiến độ code
owner: Nhóm dự án
reviewed: '2026-10-08'
summary: Luồng nghiệp vụ chính
---

# Luồng nghiệp vụ chính

## Phục vụ khách

1. Khách đặt bàn theo chi nhánh và khung giờ, hoặc đến trực tiếp.
2. Nhân viên hướng dẫn khách vào bàn. Khách quét QR, xem menu và gửi món.
3. Nhân viên tiếp nhận và xác nhận đơn.
4. Bếp chế biến; ghi nhận nguyên liệu sử dụng và giảm tồn theo lô.
5. Khách gọi thêm vào hóa đơn của mình chưa thanh toán; đơn mới vẫn qua xác nhận.
6. Thu ngân kiểm tra hóa đơn và ghi nhận thanh toán.

Mỗi hóa đơn phải nhận diện đúng khách, kể cả khi nhiều khách ngồi chung bàn. Cách nhận diện khách vãng lai và thao tác ghi nhận chế biến sẽ được thiết kế khi làm tính năng.

## Kho và sản xuất

1. Nhận nguyên liệu, lập phiếu nhập theo chi nhánh, số lượng, lô và hạn sử dụng.
2. Quản lý lập công thức, đề nghị sản xuất và giao nhân viên.
3. Nhân viên kiểm tra nguyên liệu, lập đề nghị xuất; quản lý duyệt theo nghiệp vụ MRP.
4. Ghi nhận nguyên liệu dùng khi chế biến và thành phẩm tạo ra.
5. Nhân viên đề nghị xuất thành phẩm để bán; quản lý duyệt và xem báo cáo kho.

Một lượng nguyên liệu chỉ được trừ một lần giữa luồng gọi món và MRP. Không trừ kho khi gửi đơn, xác nhận đơn hoặc thanh toán.

## Phân tích dữ liệu

Dữ liệu bán hàng và kho → xử lý → tính KPI → trình bày kết quả và đo thực nghiệm. Bắt đầu với doanh thu, món bán và lượng nguyên liệu sử dụng; công nghệ và quy mô dữ liệu chọn theo yêu cầu môn.

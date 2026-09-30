---
id: "HDB-16"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Quyết định còn mở"
---

# 16. Danh sách quyết định còn mở

<DocMeta />

| Mã | Cần chốt | Ảnh hưởng | Có thể làm trước |
|---|---|---|---|
| D01 | Thao tác/tác nhân quyết định tiêu hao, phân loại món, hủy/hoàn | Tích hợp POS–MRP | Dịch vụ kho và phiếu MRP độc lập |
| D02 | Một nhà hàng hay nhiều chi nhánh | Khóa dữ liệu, quyền và báo cáo | Đề xuất mô hình cơ sở một nhà hàng, cần xác nhận trước schema rộng |
| D03 | ORM, runtime, package manager, cách đóng gói apps | Skeleton và CI | Thiết kế module/DTO |
| D04 | Cơ chế QR, mở phiên và xác thực khách tại bàn | Chống gọi món nhầm/trái phép | Danh mục bàn và menu |
| D05 | Giờ đặt bàn, check-in, no-show, đặt món trước | Reservation/session | Mô hình dữ liệu và API draft |
| D06 | Tiền bàn, VAT, ưu đãi, làm tròn, tách hóa đơn | Billing | Khung tính tiền với chính sách tách riêng |
| D07 | Thanh toán điện tử thật hay mô phỏng, provider | Payment | Adapter và luồng tiền mặt sau chốt quyền |
| D08 | Luật tích điểm/đổi điểm/hủy điểm | Membership | Lịch sử khách và sổ điểm |
| D09 | Giá vốn, định giá hao hụt, lô/hạn dùng, tồn an toàn | Báo cáo tiền và kho nâng cao | Báo cáo lượng |
| D10 | Công nghệ/dataset/quy mô/lịch chạy Big Data | Thực nghiệm và triển khai | KPI, data contract, tập kiểm chứng nhỏ |
| D11 | Dự báo nhập kho có nằm trong bản nộp đầu không | Phạm vi analytics | KPI mô tả và dữ liệu tiêu thụ |
| D12 | Phân công cập nhật và deadline từng môn | Tiến độ và báo cáo | Dùng phân công cũ như tham khảo |
| D13 | Doanh nghiệp khảo sát và dữ liệu khảo sát thật | Báo cáo HTTTDN | Soạn câu hỏi, chưa giả lập kết quả thật |
| D14 | Online/mang đi/giao hàng/quảng cáo | Phạm vi SE | Luồng phục vụ tại bàn |

Tài liệu đủ để bắt đầu nền tảng và các module đã rõ. Các dòng D01–D14 phải được quyết định khi công việc chạm đến chúng; không có tài liệu nào có thể biến thông tin chưa cung cấp thành yêu cầu chính thức.

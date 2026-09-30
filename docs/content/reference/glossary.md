---
id: "HDB-04"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Thuật ngữ"
---

# 4. Thuật ngữ chung

<DocMeta />

| Thuật ngữ | Nghĩa trong dự án |
|---|---|
| Reservation / Đặt bàn | Giữ chỗ cho một thời điểm/khung giờ; chưa phải phiên ăn đang diễn ra |
| Dining session / Phiên phục vụ | Một lượt phục vụ tại bàn; tập hợp các lần gọi món và thanh toán |
| Order / Lần gọi món | Một lần gửi yêu cầu; một phiên có thể gọi nhiều lần |
| Order item / Dòng món | Một món với số lượng, ghi chú và trạng thái xử lý riêng |
| Menu item / Món bán | Đối tượng khách chọn trên thực đơn, có giá bán |
| Inventory item / Hàng kho | Nguyên liệu, bán thành phẩm hoặc thành phẩm được theo dõi tồn |
| BOM / Công thức định lượng | Các thành phần và lượng cần để tạo một lượng sản phẩm đầu ra |
| Production order / Lệnh sản xuất | Yêu cầu làm số lượng sản phẩm, có người phụ trách và trạng thái |
| Stock document / Phiếu kho | Chứng từ đề nghị/nhập/xuất/hao hụt theo nghiệp vụ |
| Stock movement / Biến động kho | Dòng ghi nhận tăng/giảm tồn thực sự, có nguồn nghiệp vụ |
| Invoice / Hóa đơn | Bản chốt tính tiền của phiên theo quy tắc giá/ưu đãi/thuế |
| Payment / Thanh toán | Lần thanh toán hoặc kết quả thanh toán gắn với hóa đơn |
| KPI | Chỉ số có định nghĩa, khoảng thời gian, nguồn dữ liệu và cách tính rõ |

Không đồng nhất món bán với nguyên liệu hoặc thành phẩm. Một món có thể được làm theo order hoặc dùng hàng làm sẵn; cách ánh xạ và thời điểm trừ tồn đang mở.

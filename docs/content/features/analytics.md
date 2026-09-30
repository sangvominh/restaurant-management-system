---
id: "HDB-12"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Big Data & KPI"
---

# 12. Thiết kế phạm vi Big Data

<DocMeta />

## 12.1 Câu hỏi phân tích theo kế hoạch

1. Doanh thu thay đổi theo ngày/tuần/tháng thế nào?
2. Món nào bán nhiều hoặc đóng góp doanh thu cao?
3. Khung giờ nào có nhiều giao dịch/khách/món?
4. Có thể ước lượng nhu cầu nhập nguyên liệu từ tốc độ tiêu thụ không?

Ba câu đầu là KPI kế hoạch; câu thứ tư là phần dự báo nhóm mong muốn, cần xác định dữ liệu và cách đánh giá trước khi cam kết chất lượng.

## 12.2 Hợp đồng dữ liệu đầu vào đề xuất

| Dataset | Khóa và trường quan trọng | Mục đích |
|---|---|---|
| paid_invoice_lines | invoice_id, line_id, menu_item_id, quantity, các khoản tiền, paid_at, status | Doanh thu và sức bán |
| order_activity | order_id, item_id, session_id, created_at, started_at, ready_at, status | Tải vận hành và thời gian xử lý |
| inventory_movements | movement_id, item_id, quantity_base, reason, posted_at, source_id | Nhập/xuất/tiêu hao |
| inventory_snapshots | item_id, as_of, quantity_base | Mức tồn theo thời điểm |
| menu_bom_reference | menu_item_id, bom_version, thành phần/định lượng, thời gian hiệu lực | Ước tính nhu cầu nguyên liệu khi quan hệ đã chốt |

Mỗi lần export có `schema_version`, `extracted_at`, cửa sổ dữ liệu và số bản ghi. Loại thông tin liên hệ không cần thiết; dùng ID thay cho tên/điện thoại khi phân tích không cần nhận dạng.

**[ĐỀ XUẤT]** Bắt đầu bằng snapshot theo lô có thể chạy lại; định dạng CSV/Parquet và công cụ xử lý cần chốt. Không ép phụ thuộc streaming khi câu hỏi và đề không yêu cầu.

## 12.3 Định nghĩa KPI phải có trước khi tính

| KPI | Định nghĩa cơ sở đề xuất | Điểm cần xác nhận |
|---|---|---|
| Doanh thu thuần bán món | Tiền món trên hóa đơn đã thanh toán sau giảm giá, chưa VAT | Phân bổ giảm giá toàn hóa đơn; hoàn tiền; phí bàn |
| Số món bán | Tổng quantity của dòng món hợp lệ thuộc hóa đơn đã thanh toán | Bán theo combo, món tặng |
| Khung giờ cao điểm | Số order hoặc số món theo giờ tạo order | Không lẫn với doanh thu theo giờ thanh toán |
| Tồn cuối kỳ | Tồn đầu + tổng nhập − tổng xuất − hao hụt | Đảm bảo hao hụt không đã nằm trong tổng xuất được trừ lần nữa |
| Thời gian bếp | ready_at − started_at cho dòng hoàn tất | Dòng thiếu thời điểm hoặc hủy |
| Nhu cầu nhập dự kiến | Nhu cầu tiêu thụ dự kiến so với tồn khả dụng và chính sách bổ sung | Lead time, tồn an toàn, phương pháp dự báo |

Dashboard hiển thị kỳ báo cáo, định nghĩa chỉ số, thời điểm dữ liệu cập nhật và bộ lọc. Kết quả phân tích trễ không được dùng thay số dư kho tức thời khi duyệt phiếu.

## 12.4 Chứng minh Big Data và tái lập

- Chuẩn bị dữ liệu nghiệp vụ demo và bộ dữ liệu thực nghiệm mở rộng riêng; công bố rõ dữ liệu thật, công khai hay mô phỏng.
- Nếu sinh dữ liệu: cố định seed, tham số số ngày/số giao dịch, phân phối hợp lý và tỷ lệ lỗi/trùng nếu dùng để thử chất lượng dữ liệu.
- Đo nhiều mức tải phù hợp máy; báo cáo số dòng, dung lượng, thời gian, tài nguyên/cấu hình và kết quả kiểm tra đúng.
- Chứng minh ít nhất hai đặc trưng bằng tình huống và bằng chứng, không chỉ ghi tên “Volume/Variety”.
- Kiểm tra KPI trên tập nhỏ biết đáp án; đối soát tổng tiền/số lượng với nguồn.
- Dự báo nếu làm phải chia thời gian train/test, có baseline và chỉ số sai số; không dùng dữ liệu tương lai để dự báo quá khứ.
- README của phần phân tích phải cho phép tạo input, chạy xử lý và lấy output khi ứng dụng chính chưa chạy.

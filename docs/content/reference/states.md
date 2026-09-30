---
id: "HDB-07"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Trạng thái & bất biến"
---

# 7. Trạng thái và các bất biến

<DocMeta />

Các mã trạng thái dưới đây là **[ĐỀ XUẤT] hợp đồng ban đầu**, ngoại trừ quy tắc nghiệp vụ đã ghi trong kế hoạch/đề. Cần thống nhất trước khi tạo schema và frontend phụ thuộc.

| Đối tượng | Trạng thái đề xuất | Quy tắc chuyển chính |
|---|---|---|
| Reservation | CONFIRMED, CHECKED_IN, CANCELLED, NO_SHOW | Chỉ đặt chưa check-in được hủy; NO_SHOW cần chính sách thời gian |
| Session | OPEN, CHECKOUT_PENDING, CLOSED, CANCELLED | Không nhận order khi đóng; điều kiện khóa gọi món lúc tính tiền cần chốt |
| Order item | NEW, PREPARING, READY, CANCELLED | NEW → PREPARING → READY; NEW → CANCELLED |
| Production order | DRAFT, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED | Không hoàn tất lặp; hủy sau xuất nguyên liệu cần xử lý tồn riêng |
| Tình trạng nguyên liệu | UNCHECKED, SUFFICIENT, INSUFFICIENT | Trường riêng, không trộn với trạng thái sản xuất |
| Phiếu đề nghị xuất/hao hụt | DRAFT, SUBMITTED, APPROVED, REJECTED, CANCELLED | Duyệt một lần từ SUBMITTED; hủy không làm đổi tồn |
| Phiếu nhập | DRAFT, POSTED, CANCELLED | Chỉ POSTED tăng tồn; không áp dụng nhầm luồng duyệt xuất |
| Invoice | DRAFT, ISSUED, PAID, VOID | Không sửa tiền hóa đơn đã thanh toán |
| Payment | PENDING, SUCCEEDED, FAILED | Callback lặp không tạo thanh toán/điểm lặp |

Bất biến cần bảo vệ cả khi nhiều người thao tác đồng thời:

- Không có hai phiên OPEN cho cùng bàn theo mô hình một bàn/một phiên cơ sở.
- Không chấp nhận đặt bàn trùng khung thời gian theo quy tắc nhóm chọn.
- Giá, tổng tiền, quyền và chủ sở hữu được kiểm tra ở backend.
- Một chứng từ được ghi sổ tối đa một lần; không âm tồn do hai lần duyệt cạnh tranh.
- Mỗi thay đổi tồn có movement và chứng từ nguồn; số dư và lịch sử phải cập nhật nguyên tử.
- Xác nhận sản xuất không trừ lại nguyên liệu đã xuất.
- Đổi công thức không làm thay đổi ngược định lượng của lệnh đã phát hành.
- Thanh toán, tích điểm và thông báo không được tạo tác động lặp khi retry.

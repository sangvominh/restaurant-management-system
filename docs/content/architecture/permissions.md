---
id: "HDB-05"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Vai trò & phân quyền"
---

# 5. Vai trò và phân quyền

<DocMeta />

**[ĐỀ XUẤT] Dùng quyền thao tác phía backend; giao diện chỉ hiển thị phần phù hợp. Ẩn menu không thay thế kiểm tra quyền API.**

| Vai trò | Quyền nghiệp vụ chính | Giới hạn |
|---|---|---|
| Admin hệ thống | Tài khoản, vai trò, danh mục và cấu hình | Không mặc nhiên được duyệt mọi giao dịch tài chính/kho chỉ vì là Admin |
| Quản lý kho | Công thức, nhập kho, giao lệnh, duyệt xuất/hao hụt, báo cáo kho | Phải tuân thủ trạng thái phiếu và kiểm tra tồn |
| Bếp / Nhân viên sản xuất | Nhận món/lệnh, cập nhật tiến độ, đề nghị xuất và hao hụt | Không tự duyệt phiếu do mình lập theo luồng MRP |
| Phục vụ | Theo dõi bàn, tạo đơn hộ khách, nhận thông báo món xong | Không sửa cấu hình hệ thống hoặc xác nhận thanh toán nếu chưa có quyền |
| Thu ngân | Check-in theo quy trình, hóa đơn, nhận thanh toán, đóng phiên | Không tự điều chỉnh kho |
| Khách thành viên | Đặt bàn, gọi món trong phiên hợp lệ, lịch sử và điểm của mình | Không xem giao dịch/tài khoản khách khác |
| Khách vãng lai | Menu, gọi món và theo dõi trong phiên được cấp quyền | Không có quyền đặt bàn/thành viên chỉ từ QR công khai |

**[MỞ]** Ai quản lý bàn/thực đơn/khuyến mãi trong vận hành hằng ngày; một tài khoản có được nhiều vai trò; quản lý nhà hàng có tách quản lý kho không. Trước khi mở quyền rộng, nhóm cần duyệt ma trận chi tiết. Tên vai trò trên là mô hình phối hợp từ các kế hoạch, không phải schema đã có.

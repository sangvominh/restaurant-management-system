---
id: BASE-2
specStatus: Nền tảng
codeStatus: Không biểu thị tiến độ code
owner: Nhóm dự án
reviewed: '2026-10-08'
summary: Phạm vi sản phẩm
---

# Giao diện

1. **Web Admin hệ thống**: dành cho Admin, quản lý tài khoản, phân quyền, danh mục và cấu hình nhà hàng.
2. **Web quản lý kho**: dành cho quản lý kho, nhà cung cấp, nhập kho, công thức, giao sản xuất, duyệt phiếu và báo cáo kho.
3. **Web quản lý nhà hàng**: dành cho quản lý nhà hàng, theo dõi đơn, bàn, thực đơn, doanh thu và báo cáo bán hàng.
4. **Web khách tại bàn**: dành cho khách vãng lai, quét QR, xem menu, gọi thêm, theo dõi món và xem hóa đơn.
5. **App nhân viên**: dành cho bếp, phục vụ và thu ngân, nhận và xử lý yêu cầu theo vai trò.
6. **App khách thành viên**: dành cho khách đã đăng ký, đặt bàn trước, xem lịch sử, điểm và ưu đãi.

## Nguyên tắc đã thống nhất

- Đặt bàn giữ một bàn cụ thể theo chi nhánh và khung giờ; hỗ trợ yêu cầu mã/loại bàn và ghi chú.
- QR định danh bàn. Nhân viên xác nhận đơn và kiểm tra khách tại bàn ngoài phần mềm.
- Hóa đơn theo khách; gọi thêm vào hóa đơn chưa thanh toán. Khách vãng lai không bắt buộc có tài khoản.
- Không có bước mở/đóng phiên phục vụ hoặc bắt cập nhật tiến độ từng món.
- Trừ kho khi chế biến; quản lý hàng kho theo lô và hạn sử dụng.
- Nhập nguyên liệu theo nghiệp vụ thông thường, không tự thêm tầng phê duyệt.

Giao hàng, HRM, CRM đầy đủ và các tích hợp nâng cao chưa thuộc phạm vi ban đầu. Chính sách thanh toán, ưu đãi và điểm được chốt khi làm phần liên quan.

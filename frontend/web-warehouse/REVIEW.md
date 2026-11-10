# Rà soát web kho — 10/11/2026

Đã đọc luồng giao diện và đối chiếu controller/service: đăng nhập, phân quyền, danh mục, nhập kho, tồn/lô, BOM, lệnh, cấp/hoàn NVL, chế biến/nghiệm thu, hao hụt, báo thiếu, bổ sung từ nhà hàng, xuất TP, báo cáo và in/tem.

## Đã sửa

- Quyền chỉ đề nghị NVL/hao hụt: đồng bộ đăng nhập, menu và danh sách lệnh được giao.
- Danh mục tải lại khi quay về; phản hồi cũ không ghi đè lần tải mới. Vai trò chỉ quản lý TP mở đúng danh mục TP.
- Phiếu nháp có NVL/NCC ngừng dùng: hiển thị rõ lựa chọn cũ và yêu cầu chọn lại, tránh ô chọn trống khó hiểu.
- Sửa/xóa phiếu nhập nháp: dọn lô mồ côi của chính phiếu nếu không còn bất kỳ liên kết nào. Không xóa lịch sử lô đã phát sinh.
- Công thức có NVL ngừng dùng: cảnh báo và chặn giao lệnh ngay trên form. Bản sao BOM của TP ngừng dùng vẫn hiển thị được tên nguồn.
- Lệnh tải lỗi: có nút thử lại; không cho tiếp tục ghi nghiệp vụ trên chi tiết cũ. Dòng tiêu hao đã không còn khả dụng không gửi ngầm theo form cũ.
- Lô đã cấp ngoài BOM ở dữ liệu cũ: vẫn lấy thông tin để xử lý hoàn/hao hụt.
- Gửi báo thiếu, hủy lô, lưu ngưỡng: khóa đóng phiếu và thao tác liên quan trong khi lưu.
- Báo thiếu: tính cả lượng đã cấp sau thời điểm báo, trừ phần hoàn, để không bắt nhập lại số đã giao cho bếp.
- Xuất TP: không gửi phiếu rỗng; chỉ chọn dòng/đơn còn lượng được yêu cầu; không gửi lượng của đơn đã chọn trước đó.
- Tồn/nhập/xuất/BOM/danh mục: có tải lại; báo cáo không mở chi tiết cũ khi đang tải/lỗi. Hộp thoại không tự đóng khi kéo chọn chữ ra ngoài.
- Phản hồi 401 trễ của token cũ không xóa token mới. Danh sách báo thiếu/bổ sung hạn chế phản hồi cũ và lỗi tải đã hết.

## Khi chạy lại, ưu tiên thử

1. Đăng nhập bằng quản lý, nhân viên bếp và vai trò chỉ có một nhóm quyền.
2. Sửa nháp sau khi NVL/NCC ngừng dùng; thay dòng rồi xóa nháp; kiểm tra lô không phát sinh còn được dọn.
3. Mở công thức có NVL ngừng dùng, tạo phiên bản từ công thức cũ.
4. Ghi sản lượng một phần, cập nhật số dư, thử hoàn/hao hụt và gửi báo thiếu; không đóng được phiếu lúc đang lưu.
5. Báo thiếu → bổ sung → duyệt cấp → kết thúc báo thiếu, kể cả khi kho không còn đủ vì vừa cấp.
6. Xuất TP: để trống lượng, yêu cầu một phần, từ chối rồi lập lại; đơn đã yêu cầu đủ không còn chọn được.
7. Ngắt/kết nối lại backend và tải lại; chuyển màn hình nhanh; kéo chọn chữ ra ngoài hộp thoại.

Chưa chạy build, test tự động, thao tác trình duyệt hay DB. Không đổi schema/migration.

Quy tắc hiện giữ: chỉ hủy lệnh chưa nhận; đóng lệnh dựa trên đủ sản lượng thực tế và đã nghiệm thu, không bắt mọi sản phẩm đều đạt; TP chưa có lô/HSD. Đây là phạm vi nghiệp vụ hiện tại, cần thiết kế thêm nếu muốn mở rộng.

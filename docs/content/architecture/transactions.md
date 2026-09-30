---
id: "HDB-11"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Transaction & vận hành"
---

# 11. Transaction, an toàn dữ liệu và vận hành

<DocMeta />

## 11.1 Duyệt phiếu xuất/hao hụt

**[ĐỀ XUẤT]** Trong một transaction:

1. Kiểm tra quyền và khóa/kiểm tra phiên bản chứng từ.
2. Xác nhận chứng từ còn SUBMITTED và chưa ghi sổ.
3. Quy đổi tất cả dòng sang đơn vị cơ sở; gộp nhu cầu cùng hàng.
4. Khóa số dư các hàng theo thứ tự ổn định; kiểm tra đủ tồn.
5. Ghi movement, cập nhật số dư, đổi trạng thái và ghi actor/thời gian.
6. Commit toàn bộ hoặc rollback toàn bộ; sau commit mới thông báo.

Unique constraint và kiểm tra trạng thái phải ngăn hai request cùng duyệt thành công. Với lỗi ở bất kỳ dòng nào, không được trừ một phần chứng từ.

## 11.2 Thanh toán và điểm

Reference của nhà cung cấp/callback được kiểm tra và khử lặp. Hóa đơn đã trả không phát sinh điểm lần hai khi khách refresh hoặc hệ thống retry. Nếu hoàn tiền được đưa vào phạm vi, phải thiết kế bút toán bù điểm và trạng thái tương ứng trước khi hỗ trợ.

## 11.3 Xác thực, log và sao lưu

- Hash mật khẩu; không lưu plaintext hoặc ghi mật khẩu/token vào log.
- Validate DTO, kiểm tra quyền đối tượng, giới hạn thử đăng nhập; cấu hình secret ngoài source code.
- Khóa tài khoản phải có hiệu lực với các request tiếp theo theo cơ chế token/session đã chọn, không chỉ chặn lần login mới.
- Log có requestId; audit cho duyệt phiếu, thay quyền, sửa cấu hình và thao tác nhạy cảm.
- Xác định người được backup/restore, nơi lưu và quy trình khôi phục. Demo phục hồi trên môi trường thử nghiệm, ghi lại kết quả đối soát.
- Không tự triển khai restore dữ liệu đang vận hành từ một nút bấm thiếu kiểm soát.

# Bán lượng đã chuẩn bị

Xem luồng và cách cập nhật schema tại [KHO-BEP-VAN-HANH.md](../../backend/KHO-BEP-VAN-HANH.md).

- Chỉ bán hàng đã được kho duyệt chuyển sang cửa hàng.
- Bấm món sẽ thêm/tăng một dòng đang chọn, kể cả khi dòng đã có ghi chú. Thẻ món trừ ngay lượng đang chọn và chặn tăng vượt lượng còn bán.
- **Đang chọn** có thể sửa trực tiếp; **Đã xác nhận** chỉ giảm/bỏ kèm lý do. Gọi thêm không sửa lại các món đã xác nhận.
- **Lưu nháp** chưa giữ hàng. **Xác nhận gọi món** lưu và giữ lượng trong cùng giao dịch; nếu thiếu tồn, không lưu dở một đơn nháp mới.
- Có thay đổi từ tab khác: giữ giỏ đang nhập và yêu cầu nạp bản mới trước khi ghi. Không thu tiền khi còn món nháp hoặc thay đổi chưa lưu.
- Nếu còn 3 khi khách gọi 5: trao đổi bán 3 hoặc đổi món. Hết thì ngừng nhận món đó.
- Không ghi số lượng đã phục vụ. Trước thanh toán, đối chiếu với khách và giảm/bỏ phần không dùng (có lý do).
- Thu tiền trừ tồn cửa hàng và đóng đơn trong cùng giao dịch. Không tạo phiếu kho theo từng đơn khách.
- Quản lý nhà hàng dùng **Tồn cửa hàng** để xem hàng nhận và gửi đề nghị hoàn / hao hụt; quản lý kho duyệt.
- Không còn Bếp / Ra món hoặc Yêu cầu chế biến bổ sung tại web bán hàng. Bếp làm lệnh theo kế hoạch tại web Kho & Chế biến.


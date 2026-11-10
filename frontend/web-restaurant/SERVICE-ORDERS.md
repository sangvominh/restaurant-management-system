# Bàn và đơn phục vụ

Trong thư mục backend, chạy:

```sh
npx prisma migrate deploy --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

Khởi động lại backend, mở web bán hàng.

1. Bàn phục vụ → Thêm bàn (ví dụ Bàn 05, Tầng 1).
2. Mở bàn → chọn món, số lượng, ghi chú → Lưu món chưa gửi.
3. Mở đơn của bàn → Gửi món chưa gửi. Dòng món hiển thị đợt 1.
4. Ghi món / gọi thêm → thêm món → lưu → gửi tiếp. Chỉ món mới có đợt 2; dòng đợt 1 giữ nguyên.
5. Mở đơn mang đi tại Đơn bán → Tạo đơn → chọn Mang đi.

Một bàn chỉ có một đơn nháp/đang phục vụ. Thanh toán hoặc hủy đơn giải phóng bàn. Mã đơn tự sinh. Dòng chưa gửi được sửa/xóa; dòng đã gửi giữ nguyên ID, giá, số lượng và ghi chú. Hai người cùng sửa: bản lưu cũ bị từ chối, cần mở lại biểu mẫu.

Hiện “gửi món” ghi nhận đợt gửi trong dữ liệu; chưa có màn hình bếp nhận/làm/xong món. Xuất kho và thanh toán vẫn theo luồng cũ; chỉ món đã gửi được đề nghị xuất và tính vào nhu cầu tồn thành phẩm. Yêu cầu bổ sung sang sản xuất là bước tiếp theo.

Migration chuyển các dòng đơn cũ không còn nháp thành đợt 1. Không tự sinh dữ liệu mẫu.

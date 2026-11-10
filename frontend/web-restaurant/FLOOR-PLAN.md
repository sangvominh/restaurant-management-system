# Sơ đồ và thanh toán

Trong backend, chạy migration và generate rồi khởi động lại:

```sh
npx prisma migrate deploy --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

- Bàn phục vụ: chọn khu vực, bấm toàn bộ hình bàn để mở gọi món.
- Tùy chỉnh sơ đồ: tạo khu vực một lần; thêm bàn chọn khu vực từ danh sách. Chọn bàn rồi bấm ô trống để di chuyển; Sửa bàn để đổi tên/khu vực/trạng thái. Vị trí được lưu DB.
- Gọi món: chọn món, Gửi món để xác nhận đợt mới. Lưu tạm giữ món chưa gửi.
- Hóa đơn / Thanh toán: xem đơn đã lưu, in tạm tính, đề nghị xuất lượng còn thiếu, ghi nhận thu tiền khi xuất đủ và không có phiếu chờ. Sau thanh toán bàn được giải phóng. Điều kiện xuất kho cũ chưa thay đổi.
- Thay đổi chưa lưu không được đưa vào hóa đơn.

ERD bổ sung DiningArea(name TEXT PK). DiningTable.area tham chiếu DiningArea.name (RESTRICT khi xóa, CASCADE khi đổi tên); thêm x, y INTEGER NOT NULL DEFAULT 0. Khu vực cũ được giữ lại; khu vực trống chuyển thành Chung. Sơ đồ dùng lưới 8 cột, vị trí x/y tính từ 0. Đây là sơ đồ bố trí đơn giản, chưa mô phỏng kích thước phòng.

## Cập nhật luồng ra món

- Cấp quyền sale:prepare (Bếp nhận và xác nhận ra món), đăng nhập lại. Tài khoản chỉ làm bếp vào thẳng Bếp / Ra món.
- Gửi bếp → yêu cầu xuất hiện ở Bếp / Ra món. Bếp nhập số lượng sẵn sàng và xác nhận. Hệ thống ghi phiếu xuất đã duyệt và trừ thành phẩm trong cùng giao dịch. Quyền này bao gồm quyền xác nhận bàn giao thành phẩm; chỉ cấp cho người chịu trách nhiệm ra món.
- Nhân viên tại bàn thấy Sẵn sàng mang ra → xác nhận Đã phục vụ. Không cần lập phiếu xuất riêng cho từng món trong luồng mới.
- Phiếu xuất cũ đang chờ duyệt vẫn phải được xử lý trước khi ra cùng dòng món, tránh xuất hai lần.
- Gọi thêm chỉ gửi các dòng mới. Tính tiền cho xem/in tạm tính, chọn tiền mặt/chuyển khoản, xác nhận thu đủ và đóng bàn khi phục vụ đủ.
- Sơ đồ: sửa khu vực để đổi tên/màu và số hàng/cột. Không thu nhỏ khi có bàn nằm ngoài kích thước mới. Xóa khu vực sau khi chuyển/xóa các bàn. Bàn đã có lịch sử chỉ ngừng sử dụng; bàn chưa có lịch sử được xóa.
- Số phút trên bàn tính từ lúc lưu đơn đầu tiên; cập nhật mỗi 30 giây.
- ERD: DiningArea thêm columns INTEGER DEFAULT 8, rows INTEGER DEFAULT 4, color TEXT DEFAULT '#42688b', đều NOT NULL.


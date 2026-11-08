# Web bán hàng nhà hàng

Chạy local cổng 3002, backend cổng 3000, PostgreSQL dùng chung với Admin/Kho.

```powershell
cd frontend/web-restaurant
npm install
npm run dev
```

Mở http://localhost:3002. Nếu backend dùng địa chỉ khác, tạo `.env.local` theo `.env.example`.

Backend cần CORS_ORIGIN có http://localhost:3002. Restart backend nếu vừa sửa cấu hình; phiên cũ sẽ phải đăng nhập lại.

## Quyền

- Nhân viên bán hàng: sale:view, sale:create, export:request.
- Thu ngân: sale:view, payment:create.
- Quản lý nhà hàng: cả bốn quyền trên. Admin toàn quyền cũng truy cập được.
- Người lập đơn và gửi đề nghị xuất cần tài khoản liên kết hồ sơ người sử dụng ACTIVE.

## Sử dụng

1. Thành phẩm và tồn: xem giá/tồn thực tế; thiếu hàng vẫn lập đơn được, kho chỉ duyệt xuất khi đủ tồn.
2. Tạo đơn nháp, nhập mã và số lượng; lưu rồi xác nhận. Chỉ sửa đơn nháp.
3. Chi tiết đơn: gửi đề nghị xuất từng dòng (có thể xuất nhiều đợt). Kho duyệt ở web Warehouse, quay lại bấm Tải lại để thấy kết quả.
4. Khi đã xuất đủ và hết phiếu chờ: ghi nhận đã thu đủ bằng tiền mặt/chuyển khoản. Hệ thống lưu Payment và chuyển đơn sang COMPLETED, không trừ tồn thêm.
5. Chỉ hủy đơn chưa thanh toán và không có phiếu xuất chờ/đã duyệt. Nếu phiếu xuất bị từ chối, có thể gửi đề nghị mới hoặc hủy đơn.

Giá và tên thành phẩm lưu tại thời điểm thêm vào đơn; sửa số lượng không thay giá. Tổng tiền do backend tính và làm tròn 2 số lẻ ở tổng cuối. Không tự kiểm chứng giao dịch ngân hàng; nút thanh toán là xác nhận của thu ngân đã nhận tiền. Chưa hỗ trợ thanh toán từng phần, hoàn hàng/hoàn tiền.

## Kiểm tra nhanh

Kho có 10 phần, giá 50.000: tạo đơn 4 phần → tổng 200.000 → xác nhận → đề nghị xuất 4 → tồn vẫn 10 → kho duyệt → tồn 6 → thu ngân ghi thu 200.000 → đơn đã thanh toán, tồn vẫn 6.

Thử sửa đơn đã xác nhận, xuất vượt lượng đơn, thanh toán trước khi xuất đủ hoặc thanh toán lại: phải bị chặn. Đổi giá danh mục sau khi lưu đơn: đơn cũ giữ giá. Tài khoản thu ngân không được lập đơn/đề nghị xuất, tài khoản bán hàng không có payment:create không được thu tiền.

Không đổi Prisma/schema, không cần migration. Phần này không tạo dữ liệu mẫu.

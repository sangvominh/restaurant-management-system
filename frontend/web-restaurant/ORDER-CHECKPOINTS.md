# Các mốc kiểm soát bán hàng

Chạy trong backend, rồi khởi động lại:

```sh
npx prisma migrate deploy --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

- Gửi bếp: xác nhận món mới, lưu người gửi/thời điểm. Gọi thêm thành đợt riêng.
- Bếp: Xong món cho toàn bộ lượng còn lại. Ra từng phần là lựa chọn phụ.
- Mang ra: theo dõi tùy chọn, thu gọn trong dòng món; không chặn thanh toán.
- Đổi/hủy món đã gửi: chỉ phần chưa ra món. Nhập số lượng, lý do, có thể chọn món thay thế. Món mới tự gửi thành đợt mới. Hủy không hoàn tồn vì phần được phép hủy chưa xuất. Có lệnh bổ sung đang chạy hoặc phiếu xuất chờ thì xử lý chúng trước.
- Thu tiền: thu ngân đối chiếu món và tiền thực nhận. Backend không bắt đánh dấu phục vụ; tự ghi xuất phần chưa được ghi trước đó, không trừ hai lần. Vẫn kiểm tra đủ tồn và không còn ngoại lệ đang xử lý. Không tự đánh dấu khách đã nhận món.
- Hủy hết món: Đóng đơn không tính tiền, không tạo thanh toán 0 đồng.
- Bếp có danh sách đổi/hủy 24 giờ để biết yêu cầu đã thay đổi.

ERD: thêm SaleLineChange (id, changedAt, previousQuantity, quantity là lượng bị bỏ, reason, saleLineId, replacementLineId nullable, changedById). Hai FK dòng món cùng tham chiếu SaleLine; changedById tham chiếu Employee. SaleLine thêm sentById, Payment thêm receivedById, Sale thêm closedAt và closedById. Các FK người đều tham chiếu Employee; nullable cho dữ liệu cũ.

Ví dụ kiểm tra: gọi gà ×2, canh ×1 → gửi → canh hết thì hủy canh với lý do → không đánh dấu trả gà → tính tiền 2 phần gà → đóng bàn. Kiểm tra lịch sử hủy và tồn gà chỉ giảm 2. Nếu bếp đã ghi ra 1 phần gà thì chốt chỉ ghi xuất thêm 1.

Phần đã ra món nhưng khách không trả tiền cần nghiệp vụ miễn phí/hao hụt/hoàn tiền riêng, chưa thuộc thao tác hủy phần chưa làm này. Chưa thêm màn hình đối soát ca trong đợt sửa này.

# Nhập kho và tồn NVL

Không thay đổi schema, không cần migration mới. Khởi động lại backend và tải lại frontend kho cổng 3001.

## Quyền

- receipt:create: xem phiếu và lập phiếu nhập; sửa/xóa phiếu nháp của mình.
- receipt:post: xem và ghi sổ phiếu nhập. Nếu có thêm receipt:create, được sửa/xóa phiếu nháp của người khác.
- inventory:view: xem tồn NVL và chi tiết lô.
- System Admin có toàn quyền. Tài khoản lập phiếu phải được liên kết với người sử dụng đang hoạt động trong Admin; không cần quyền Admin để lập phiếu.

## Luồng thao tác

1. Nhập kho NVL → Lập phiếu nhập: số phiếu, NCC, ghi chú và các dòng NVL/mã lô/hạn/số lượng/đơn giá.
2. Lưu nháp: chưa tăng tồn. Có thể sửa/xóa trước khi ghi sổ.
3. Người có quyền Ghi sổ kiểm tra chi tiết rồi xác nhận: hệ thống tạo biến động BEN_NGOAI → TRONG_KHO và chuyển phiếu thành POSTED trong cùng transaction.
4. Tồn kho NVL: xem số dư theo từng NVL/đơn vị; Xem lô để xem hạn và số dư từng lô. Có lọc dưới tồn tối thiểu và có tồn.

Ví dụ tự nhập: 5 kg thịt gà, đơn giá 80.000 VND/kg → lưu nháp chưa có tồn → ghi sổ tăng tồn 5 kg, tổng phiếu 400.000 VND.

Số lượng lớn hơn 0, tối đa 3 số lẻ; đơn giá không âm, tối đa 2 số lẻ. Không trùng NVL/mã lô trong cùng phiếu. Lô đã có được dùng lại; nếu nhập hạn phải khớp, để trống giữ hạn cũ. NCC/NVL ngừng dùng hoặc lô hết hạn không được ghi sổ. Hạn dùng được xét theo ngày Việt Nam.

Ghi sổ lấy thời điểm thực ghi nhận làm ngày nhập theo ERD. Không cho sửa/xóa phiếu POSTED hoặc ghi lại lần hai. Tồn tính từ MaterialMovement, không từ phiếu nháp và không có bảng số dư mới. Tồn tổng vẫn bao gồm lô đã hết hạn còn trong kho để không làm biến mất hàng vật lý.

API: /api/warehouse/receipts (GET/POST), /receipts/:id (PUT/DELETE), /receipts/:id/post (POST), /receipts/references (GET), /inventory (GET), /inventory/:id/lots (GET). Đều có kiểm tra quyền ở backend.

Chưa có cấp NVL, BOM, sản xuất hoặc hoàn/hủy trong đợt này. Cách tính tồn đã tính cả các luồng vào/ra TRONG_KHO để dùng tiếp khi xây các phần đó.

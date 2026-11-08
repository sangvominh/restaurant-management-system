# Nhập kho và tồn NVL

Nhập kho chỉ nhập nguyên vật liệu theo lô. Đã bỏ phân loại nguồn thành phẩm và nhánh nhập trực tiếp thành phẩm mua về.

Sau thay đổi này, chạy trong backend:

```powershell
npx prisma migrate deploy --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

Khởi động lại backend. Giữ migration cũ và dùng migration 20261109090000_remove_direct_product_receipts để đảo schema. Nếu DB còn dòng nhập trực tiếp TP hoặc biến động NHAP_MUA, migration dừng thay vì tự xóa chứng từ; cần xử lý các bản ghi đó trước. Không tự chuyển một chứng từ TP thành NVL vì sẽ làm thay đổi lịch sử tồn.

## Quyền

- receipt:create: xem phiếu và lập phiếu nhập; sửa/xóa phiếu nháp của mình.
- receipt:post: xem và ghi sổ phiếu nhập. Nếu có thêm receipt:create, được sửa/xóa phiếu nháp của người khác.
- inventory:view: xem tồn NVL và chi tiết lô.
- System Admin có toàn quyền. Tài khoản lập phiếu phải được liên kết với người sử dụng đang hoạt động trong Admin; không cần quyền Admin để lập phiếu.

## Luồng thao tác

1. Nhập kho → Lập phiếu nhập: chọn NCC, ghi chú; mỗi dòng chọn NVL, HSD (nếu có), số lượng và đơn giá. Số phiếu và mã lô tự cấp khi lưu nháp. Nếu chưa có mặt hàng, tạo tại Danh mục rồi quay lại sửa phiếu nháp.
2. Lưu nháp: chưa tăng tồn. Có thể sửa/xóa trước khi ghi sổ.
3. Người có quyền Ghi sổ kiểm tra chi tiết rồi xác nhận: hệ thống tạo biến động BEN_NGOAI → TRONG_KHO và chuyển phiếu thành POSTED trong cùng transaction.
4. Tồn kho NVL: xem số dư theo từng NVL/đơn vị; Xem lô để xem hạn và số dư từng lô. Có lọc dưới tồn tối thiểu và có tồn.

Ví dụ tự nhập: 5 kg thịt gà, đơn giá 80.000 VND/kg → lưu nháp chưa có tồn → ghi sổ tăng tồn 5 kg, tổng phiếu 400.000 VND.

Số lượng lớn hơn 0, tối đa 3 số lẻ; đơn giá không âm, tối đa 2 số lẻ. Mỗi dòng nhập tạo một lô mới; không nhập bổ sung lô cũ. Cùng NVL khác hạn thì thêm dòng riêng. Sửa nháp giữ số phiếu và mã lô của dòng không đổi NVL; đổi NVL hoặc thêm dòng sẽ cấp lô mới. Với lô dữ liệu cũ dùng chung/đã có phát sinh, sửa nháp tạo lô riêng, không thay thông tin lô đang được dùng. NCC/NVL ngừng dùng hoặc lô hết hạn không được ghi sổ. Hạn dùng được xét theo ngày Việt Nam. Phiếu/lô cũ không bị đổi mã hàng loạt. Hoàn từ bếp vẫn trả về đúng lô đã cấp.

Ghi sổ lấy thời điểm thực ghi nhận làm ngày nhập theo ERD. Không cho sửa/xóa phiếu POSTED hoặc ghi lại lần hai. Tồn tính từ MaterialMovement, không từ phiếu nháp và không có bảng số dư mới. Tồn tổng vẫn bao gồm lô đã hết hạn còn trong kho để không làm biến mất hàng vật lý.

API: /api/warehouse/receipts (GET/POST), /receipts/:id (PUT/DELETE), /receipts/:id/post (POST), /receipts/references (GET), /inventory (GET), /inventory/:id/lots (GET). Đều có kiểm tra quyền ở backend.

Chưa có cấp NVL, BOM, sản xuất hoặc hoàn/hủy trong đợt này. Cách tính tồn đã tính cả các luồng vào/ra TRONG_KHO để dùng tiếp khi xây các phần đó.

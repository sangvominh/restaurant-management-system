## Danh mục nền
Đơn vị tính, phân loại, NVL, NCC, thành phẩm: thêm/sửa/xóa, tìm kiếm và lọc phù hợp.
Đăng nhập bằng tài khoản từ Admin; backend kiểm tra quyền xem/sửa.
Chặn sai phân loại, số âm, mã trùng và xóa dữ liệu đã được sử dụng.

## Nhập kho: phiếu nhập theo lô, ghi sổ, xem tồn.
Phiếu nhập theo lô: thêm, sửa, xóa phiếu nháp; nhiều dòng NVL, hạn sử dụng, số lượng và đơn giá.
Ghi sổ: tăng tồn một lần; phiếu đã ghi sổ không được sửa/xóa.
Xem tồn: theo NVL và từng lô, có lọc dưới tồn tối thiểu.
Tách quyền lập phiếu, ghi sổ và xem tồn.

## lỗi đã chặn:
Xóa đơn vị demo_unused → được.
Xóa đơn vị kg → bị chặn vì NVL/TP đang sử dụng.
Xóa vai trò “DEMO · Vai trò chưa dùng” → được.
Xóa vai trò “DEMO · Quản lý kho” → bị chặn vì có tài khoản dùng.
Đổi phân loại “DEMO · Thịt cá” sang thành phẩm → bị chặn.
Tạo NVL trùng mã DEMO-NVL001 → báo trùng.
Nhập tồn tối thiểu âm hoặc giá bán âm → bị từ chối.
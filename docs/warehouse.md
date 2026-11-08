## Danh mục nền
Đơn vị tính, phân loại, NVL, NCC, thành phẩm: thêm/sửa/xóa, tìm kiếm và lọc phù hợp.
Đăng nhập bằng tài khoản từ Admin; backend kiểm tra quyền xem/sửa.
Chặn sai phân loại, số âm, mã trùng và xóa dữ liệu đã được sử dụng.

## Nhập kho: phiếu nhập theo lô, ghi sổ, xem tồn.
Phiếu nhập theo lô: thêm, sửa, xóa phiếu nháp; nhiều dòng NVL, hạn sử dụng, số lượng và đơn giá.
Ghi sổ: tăng tồn một lần; phiếu đã ghi sổ không được sửa/xóa.
Xem tồn: theo NVL và từng lô, có lọc dưới tồn tối thiểu.
Tách quyền lập phiếu, ghi sổ và xem tồn.

## BOM và lệnh sản xuất.
BOM: tạo/sửa/xóa nháp, khai báo phiên bản, định mức, ngày hiệu lực; áp dụng rồi thì khóa sửa/xóa.
Lệnh sản xuất: chọn BOM có hiệu lực, nhập số lượng, giao nhân viên bếp, đặt hạn hoàn thành, xem nhu cầu nguyên liệu.
Nhân viên bếp: chỉ thấy và nhận lệnh của mình. Quản lý được hủy lệnh chưa nhận.

## Cấp NVL → sản xuất → nghiệm thu → hoàn/hao hụt.
Bếp yêu cầu NVL theo lô → kho duyệt cấp hoặc từ chối.
Bếp ghi sản lượng và lượng nguyên liệu thực tế đã dùng.
Nghiệm thu số lượng đạt → ghi tăng tồn thành phẩm đạt.
Bếp lập hoàn NVL dư hoặc báo hao hụt → kho duyệt, ghi sổ.
Quản lý hoàn thành lệnh khi đã nghiệm thu và xử lý hết NVL dư.

## Xuất TP và báo cáo kho.
Xuất thành phẩm: lập phiếu theo đơn bán, duyệt xuất hoặc từ chối; chặn vượt tồn, vượt lượng đơn bán và duyệt trùng.
Tồn thành phẩm: tính từ số đã nghiệm thu và đã xuất.
Báo cáo kho: nhập–xuất–tồn NVL/thành phẩm theo tháng, quý, năm.

## lỗi đã chặn:
Xóa đơn vị demo_unused → được.
Xóa đơn vị kg → bị chặn vì NVL/TP đang sử dụng.
Xóa vai trò “DEMO · Vai trò chưa dùng” → được.
Xóa vai trò “DEMO · Quản lý kho” → bị chặn vì có tài khoản dùng.
Đổi phân loại “DEMO · Thịt cá” sang thành phẩm → bị chặn.
Tạo NVL trùng mã DEMO-NVL001 → báo trùng.
Nhập tồn tối thiểu âm hoặc giá bán âm → bị từ chối.
# Danh mục nền

Backend cổng 3000, frontend frontend/web-warehouse cổng 3001. Chạy npm run dev trong frontend; khởi động lại backend sau khi cập nhật CORS_ORIGIN. Không đổi schema, không cần migration mới.

Đăng nhập bằng System Admin hoặc tài khoản đã cấp quyền từ web Admin:

- catalog:manage: thêm/sửa/xóa toàn bộ danh mục nền.
- inventory:view: xem đơn vị, phân loại, NVL và TP.
- product:manage: xem đơn vị/phân loại và quản lý thành phẩm.
- production:perform: xem đơn vị, phân loại, NVL và TP.
- receipt:create: xem nhà cung cấp.
- sale:view: xem thành phẩm.

Trình tự nhập dữ liệu:

1. Đơn vị tính: ví dụ Kilôgam / kg, Phần / phan.
2. Phân loại: chọn dành cho NVL hoặc thành phẩm.
3. NVL: mã, tên, đơn vị cơ sở, phân loại, tồn tối thiểu, trạng thái.
4. NCC: mã, tên, điện thoại, địa chỉ, trạng thái.
5. TP: mã, tên, đơn vị cơ sở, phân loại, giá bán, trạng thái.

Chưa có nhập kho, lô, tồn thực tế, BOM, sản xuất hoặc bán hàng. Tồn tối thiểu là ngưỡng cảnh báo, không phải tồn thực tế.

Số lượng không âm, tối đa 3 số lẻ; giá bán không âm, tối đa 2 số lẻ. Phân loại phải đúng NVL/TP. Mã/ký hiệu trùng và bản ghi đã được tham chiếu sẽ bị DB từ chối. Không đổi loại đối tượng của phân loại đang dùng hoặc đơn vị cơ sở của NVL/TP đã phát sinh nghiệp vụ. Có thể ngừng sử dụng NVL, NCC, TP thay vì xóa.

API: /api/warehouse/auth/login, /me, /logout; /api/warehouse/catalog/units, /categories, /materials, /suppliers, /products. GET đọc, POST tạo, PUT /:id sửa, DELETE /:id xóa. Mọi API danh mục kiểm tra phiên và quyền tại backend.

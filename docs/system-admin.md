lần đầu chạy: npm run admin:init để tạo tài khoản admin system
sau đó chạy backend lên: npm run start:dev

chức năng ở phần này:
Tài khoản: thêm/sửa/xóa, khóa/mở khóa, đổi mật khẩu, liên kết người sử dụng.
Vai trò và quyền: thêm/sửa/xóa, chọn quyền theo nhóm.
Thông tin người sử dụng: thêm/sửa/xóa, tìm kiếm và lọc trạng thái.

Đăng nhập/đăng xuất Admin, hiển thị người đang đăng nhập.
Bảo vệ toàn bộ API Admin: chỉ tài khoản hoạt động có quyền * được truy cập.
Tài khoản bị khóa/xóa, đổi mật khẩu hoặc mất quyền sẽ phải đăng nhập lại.
Chặn tự khóa/xóa hoặc đổi vai trò của chính mình.
Giữ các chức năng quản lý tài khoản, vai trò và người sử dụng.
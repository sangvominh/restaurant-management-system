# Admin server

## Khởi động

1. Bật PostgreSQL, chạy migration và generate Prisma Client nếu chưa làm.
2. Đặt INITIAL_ADMIN_USERNAME và INITIAL_ADMIN_PASSWORD trong backend/.env.
3. Trong backend chạy npm run admin:init để tạo Admin đầu tiên. Chạy lại không đặt lại mật khẩu.
4. Chạy backend và frontend Admin, mở frontend cổng 3004 rồi đăng nhập.

Không cần thêm dependency hoặc thay đổi schema cho phần đăng nhập.

## Sử dụng

- Tài khoản: thêm/sửa/xóa, chọn vai trò, liên kết hồ sơ, khóa/mở khóa, đặt mật khẩu mới.
- Vai trò: tạo và chọn các quyền hệ thống hỗ trợ; mỗi tài khoản có một vai trò.
- Người sử dụng: thông tin tối thiểu để cấp tài khoản và xác định người thực hiện công việc.
- Đổi mật khẩu của mình bằng nút Sửa ở dòng tài khoản đang đăng nhập. Để trống mật khẩu thì giữ nguyên.

Chỉ tài khoản ACTIVE có quyền * và hồ sơ nhân viên còn hoạt động (nếu có liên kết) được vào Admin. Các API quản trị đều kiểm tra tại backend. Không tự khóa/xóa, đổi vai trò hoặc ngừng hoạt động hồ sơ của chính mình. Không gỡ quyền * khỏi vai trò đang có quyền này.

Phiên lưu trong bộ nhớ backend, có hạn 8 giờ. Refresh frontend giữ phiên trong cùng tab; khởi động lại backend thì đăng nhập lại. Đổi mật khẩu, khóa/xóa tài khoản, đổi vai trò/quyền hoặc ngừng hoạt động nhân viên làm phiên không còn hợp lệ ở yêu cầu kế tiếp. Đăng xuất kết thúc phiên hiện tại.

Backend mặc định cổng 3000, frontend cổng 3004. Nếu đổi cổng/frontend origin, cập nhật CORS_ORIGIN của backend; đổi API URL bằng NEXT_PUBLIC_API_URL của frontend.

Các quyền kho/sản xuất/bán hàng đang được quản lý như dữ liệu phân quyền; việc áp dụng vào API nghiệp vụ sẽ làm khi triển khai các module tương ứng.

# Khởi tạo Admin

Thêm INITIAL_ADMIN_USERNAME và INITIAL_ADMIN_PASSWORD vào backend/.env. Mật khẩu từ 8 đến 128 ký tự, không commit .env.

Sau khi đã generate Prisma Client và chạy migration, chạy trong backend:

```powershell
npm run admin:init
```

Lệnh build backend rồi tạo quyền toàn hệ thống, vai trò System Admin và tài khoản. Không tạo nhân viên hoặc giao dịch mẫu. Toàn bộ ghi DB nằm trong một transaction.

Chạy lại giữ nguyên mật khẩu và trạng thái Admin đã có. Trùng tài khoản thường hoặc vai trò đang dùng không có toàn quyền thì báo lỗi, không tự nâng quyền. Muốn đổi mật khẩu dùng màn hình Tài khoản; đổi .env không đổi mật khẩu trong DB.

Khi dựng lại DB: generate client → migration → admin:init → khởi động backend.

Lệnh này chỉ khởi tạo dữ liệu. Sau đó mở frontend Admin và đăng nhập bằng tài khoản vừa tạo. Phiên hết hạn sau 8 giờ hoặc khi backend khởi động lại.

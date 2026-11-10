# Mẫu vai trò

Admin → Vai trò và quyền → **Mẫu vai trò** → Sửa mẫu. Đổi tên, mô tả, web làm việc chính và các quyền rồi Lưu mẫu. Có thể khôi phục mặc định.

- Mẫu là bộ quyền để điền form, không phải vai trò gắn với tài khoản.
- Sửa/khôi phục mẫu không đổi quyền hoặc phiên đăng nhập của tài khoản hiện có.
- Muốn đổi quyền tài khoản: sang **Vai trò đang sử dụng**, sửa vai trò, chọn lại mẫu và Lưu vai trò. Những tài khoản cùng vai trò sẽ nhận thay đổi và cần đăng nhập lại.
- Web làm việc chính là hướng dẫn; quyền cụ thể quyết định truy cập.
- Tám mẫu có ID cố định; mặc định nằm trong code, phần tùy chỉnh lưu bảng cấu hình `RoleTemplate`. Restart backend giữ tùy chỉnh; DB mới dùng lại mẫu mặc định.

Trước khi chạy chức năng mới, dừng backend rồi tự chạy tại thư mục `backend`:

```powershell
npx prisma db push --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

Sau đó chạy lại backend và tải lại web Admin. Chưa tự chạy build/test hay cập nhật DB trong đợt này.

# Admin server

Web riêng cho quản trị hệ thống, tài khoản, vai trò, cấu hình, nhật ký, báo cáo tổng hợp và backup. Chỉ Admin server/Owner được đăng nhập.

Trong `frontend/web-admin-system`, chạy `npm ci` lần đầu rồi `npm run dev`, mở http://localhost:3004/login. Dependency, lockfile và code nằm riêng trong web này. API mặc định http://localhost:3000; cấu hình bằng `NEXT_PUBLIC_API_URL` trong `.env.local` nếu cần.

Kho, Bán hàng và Nhân sự là các web riêng. Xem [README root](../../README.md) và [hướng dẫn test](../../docs/content/duy-tri/kiem-thu.md).

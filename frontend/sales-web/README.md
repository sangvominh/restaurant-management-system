# Quản lý Bán hàng

Trong thư mục web này:

```powershell
npm ci
npm run dev
```

Mở http://localhost:3002/login. Chạy `npm run build` để build, `npm run typecheck` để kiểm tra TypeScript.

Code, dependency và lockfile nằm riêng trong web này; không import từ frontend khác. API mặc định http://localhost:3000; copy `.env.example` thành `.env.local` để đổi `NEXT_PUBLIC_API_URL` nếu cần. Tài khoản và quyền do backend quản lý; frontend không có seed riêng.

Xem [README root](../../README.md) và [hướng dẫn test](../../docs/content/duy-tri/kiem-thu.md).

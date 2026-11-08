# Quản lý Kho

Trong thư mục web này:

```powershell
npm ci
npm run dev
```

Mở http://localhost:3001/login. Chạy `npm run build` để build, `npm run typecheck` để kiểm tra TypeScript.

Code, dependency và lockfile nằm riêng trong web này; không import từ frontend khác. API mặc định http://localhost:3000; copy `.env.example` thành `.env.local` để đổi `NEXT_PUBLIC_API_URL` nếu cần. Tài khoản và quyền do backend quản lý; frontend không có seed riêng.

Hai chức năng chọn lọc từ `feat/warehouse_v3`, dùng quyền `inventory:view`:

- `/inventory-report`: nhập, xuất, hao hụt, hoàn trả và tồn đầu/cuối theo tháng, quý, năm cho NVL và thành phẩm. Tổng hợp mọi vị trí kho theo giờ Việt Nam; mốc tồn không xác minh được từ lịch sử sẽ được ghi rõ.
- `/production-capacity`: chọn chi nhánh để xem số thành phẩm tối đa có thể làm theo BOM đang hoạt động mới nhất và NVL còn hạn. Mỗi sản phẩm tính riêng; kết quả không giữ chỗ hay trừ tồn.

Xem [README root](../../README.md) và [hướng dẫn test](../../docs/content/duy-tri/kiem-thu.md).

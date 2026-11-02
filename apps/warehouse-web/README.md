# Web quản lý kho Mộc

Frontend Next.js App Router độc lập. Trang tồn kho nguyên vật liệu và chi tiết mặt hàng đọc dữ liệu thật từ Inventory API; các phân hệ khác tiếp tục dùng dữ liệu mẫu.

## Chạy ứng dụng

```bash
cd apps/warehouse-web
npm install
npm run dev
```

Sao chép `.env.example` thành `.env.local` nếu cần đổi địa chỉ Backend, sau đó chạy Backend tại `http://localhost:3000` và Frontend tại `http://localhost:3001`. Dùng `npm run build` để tạo production build và `npm run start` để chạy bản build.

## Màn hình

- Dashboard: KPI, biểu đồ nhập – xuất, tồn thấp, phiếu chờ duyệt, hàng sắp hết hạn và tiến độ sản xuất.
- Tồn kho nguyên vật liệu: GET trực tiếp `/warehouse/inventory` và `/warehouse/inventory/:code`, lọc/tìm kiếm/sắp xếp/phân trang ở trình duyệt, xem chi tiết lô và vị trí. API danh sách hiện không lọc theo chi nhánh nên trang này không giả lập bộ lọc chi nhánh.
- Tồn kho thành phẩm: dữ liệu mẫu, tìm kiếm, phân loại, lọc chi nhánh, phân trang, xem chi tiết.
- Nhập kho: danh sách phiếu, tạo bản nháp với nhiều dòng nguyên vật liệu.
- Duyệt xuất nguyên vật liệu / thành phẩm: tabs theo trạng thái, xem chi tiết, mô phỏng duyệt hoặc từ chối.
- Công thức BOM: danh sách và form công thức nhiều dòng.
- Lệnh sản xuất, theo dõi sản xuất, hao hụt, báo cáo nhập – xuất – tồn, lịch sử giao dịch.

Các thao tác ngoài đọc Inventory API chỉ cập nhật state phía trình duyệt. Mock data và kiểu dữ liệu nằm trong `src/mock/` và `src/types/`; `src/services/inventory.service.ts` chứa hai GET Inventory, còn `src/services/warehouse-service.ts` giữ dữ liệu mock cho các phân hệ khác.

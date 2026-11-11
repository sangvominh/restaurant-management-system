# Quản lý nhà hàng

Chế biến trước theo kế hoạch → kho thành phẩm → bàn giao cửa hàng → bán lượng đã nhận. Không nấu thêm theo từng đơn khách.

## Cài lần đầu

Cần Node.js 24 và Docker Desktop. Các lệnh dưới chạy tại thư mục gốc dự án.

```powershell
docker compose up -d db
npm --prefix backend install
npm --prefix frontend/web-admin-system install
npm --prefix frontend/web-warehouse install
npm --prefix frontend/web-restaurant install
```

Tạo `backend/.env` từ `backend/.env.example` nếu chưa có. Giữ cấu hình DB local trong mẫu; tự đặt `INITIAL_ADMIN_USERNAME` và `INITIAL_ADMIN_PASSWORD` (8–128 ký tự). Không đưa file .env lên Git.

Sau đó chạy:

```powershell
cd backend
.\node_modules\.bin\prisma.cmd db push --config prisma7.config.ts
.\node_modules\.bin\prisma.cmd generate --config prisma7.config.ts
npm run admin:init
cd ..
```

`admin:init` có build backend và tạo Admin ban đầu. Chạy lại giữ nguyên tài khoản đã có; đổi mật khẩu trong web Admin, không đổi bằng .env.

## Chạy hằng ngày

Tại gốc dự án, bật DB bằng `docker compose up -d db`. Mỗi lệnh dưới chạy trong **một terminal riêng**:

```powershell
npm --prefix backend run start:dev
npm --prefix frontend/web-admin-system run dev
npm --prefix frontend/web-warehouse run dev
npm --prefix frontend/web-restaurant run dev
```

- Admin: http://localhost:3004
- Kho & Chế biến: http://localhost:3001
- Nhà hàng: http://localhost:3002
- Backend: http://localhost:3000

Frontend mặc định gọi backend local. Nếu đổi địa chỉ, đặt `NEXT_PUBLIC_API_URL` trong .env.local của frontend và thêm địa chỉ frontend vào `CORS_ORIGIN` trong backend/.env, rồi chạy lại ứng dụng.

## Tạo người dùng

Admin → tạo vai trò theo mẫu → tạo người sử dụng đang hoạt động → tạo tài khoản, gắn vai trò và liên kết người sử dụng đó.

- Chọn đúng mẫu: quản lý kho, nhân viên kho, trưởng bếp, chế biến, quản lý nhà hàng, phục vụ hoặc thu ngân.
- Sửa mẫu không đổi vai trò đang dùng; muốn đổi quyền, áp dụng mẫu vào vai trò rồi lưu. Tài khoản đăng nhập lại.
- Quyền nghiệm thu cho phép nghiệm thu cả sản lượng tự làm; Admin quyết định có cấp kiêm nhiệm hay không.

## Thao tác chính

1. **Danh mục kho:** tạo đơn vị, phân loại, NCC, NVL và thành phẩm. Chọn nguồn TP ngay khi tạo: Tự chế biến hoặc Nhập trực tiếp. Mã tự cấp; mã/tên/đơn vị/nguồn TP không đổi sau khi tạo.
2. **Nhập NVL:** lập phiếu theo lô và HSD → ghi sổ mới tăng tồn. Chỉnh tồn tối thiểu tại Tồn nguyên liệu.
3. **Tự chế biến:** tạo công thức cho **1 đơn vị TP** → áp dụng → giao lệnh → nhân viên nhận → đề nghị cấp NVL → kho duyệt → ghi sản lượng và tiêu hao → nghiệm thu kèm NSX/HSD. Phần đạt tạo lô TP; hoàn/hao hụt NVL dư và xử lý hết phiếu chờ trước khi đóng lệnh.
4. **Nhập TP trực tiếp:** chọn NCC, hàng nhập sẵn, mã lô riêng của lần nhận, NSX/HSD, lượng và đơn giá → lưu nháp → ghi sổ tăng kho TP. Không lập BOM/lệnh chế biến. Nhập theo đơn vị cơ sở, ví dụ 24 lon, chưa có tự quy đổi thùng.
5. **Xuất TP sang cửa hàng:** nhân viên kho lập đề nghị → quản lý duyệt khi bàn giao. Kho giảm, cửa hàng tăng, không tạo doanh thu. Tự ưu tiên lô còn hạn gần nhất (FEFO); xem mã lô/HSD trong chi tiết phiếu.
6. **Bán hàng:** quản lý nhà hàng thiết lập giá bán → mở bàn hoặc đơn mang đi → chọn món → xác nhận → thu tiền. Nháp chưa giữ hàng; xác nhận giữ lượng; thanh toán mới trừ cửa hàng, không trừ kho lần nữa. Gọi thêm chỉ xác nhận món mới; giảm/bỏ món đã xác nhận cần lý do. Không ghi số lượng đã phục vụ.
7. **Hoàn/hủy TP:** tại kho, mở mặt hàng trong Tồn TP để xem/hủy lô; tại cửa hàng, chọn lô rồi đề nghị hoàn hoặc hao hụt, quản lý kho duyệt. Hoàn tăng lại kho; hủy không tăng kho. HSD đến hết ngày Việt Nam; hết hạn không được chuyển/bán/hoàn, phải hủy thực tế. Lô hết tồn/hủy vẫn có lịch sử.

Tồn sổ có thể gồm hàng đã giữ cho đơn và hàng hết hạn chưa hủy. **Còn bán được** chỉ tính lô còn hạn, trừ lượng giữ cho đơn và đề nghị hoàn/hủy chờ duyệt. Xem phản hồi duyệt/từ chối tại Lịch sử của lệnh.

## Khi gặp lỗi

- **Prisma không nhận push/generate:** vào backend và dùng đúng lệnh Prisma local ở trên; không chạy npx Prisma tại gốc dự án.
- **Sau khi đổi schema:** dừng backend, chạy lại db push và generate trong backend, rồi khởi động lại.
- **Failed to fetch:** kiểm tra backend cổng 3000, DB đang chạy và CORS_ORIGIN.
- **Phiên hết hạn:** đăng nhập lại. Phiên có hạn 8 giờ; restart backend hoặc đổi quyền/mật khẩu cũng kết thúc phiên.
- **Cần liên kết người sử dụng:** tài khoản phải gắn hồ sơ đang hoạt động để lập/duyệt chứng từ.
- **Có tồn nhưng không bán được:** kiểm tra đã bàn giao cửa hàng, giá bán > 0, mặt hàng hoạt động, lô còn hạn và lượng chưa giữ cho đơn khác. Tồn cũ chưa gán lô bị loại khỏi lượng chuyển/bán; không tự suy đoán HSD.
- **Dữ liệu mẫu:** seed BBQ cũ chưa đồng bộ lô TP/nhập trực tiếp; chưa dùng để kiểm tra luồng mới.


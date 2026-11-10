# Cập nhật schema: báo thiếu nguyên liệu

## Thay đổi CSDL

Thêm bảng `MaterialShortage`: nguyên liệu, lệnh chế biến, số lượng cần kho chuẩn bị để cấp, lý do, người lập, người xử lý, phản hồi, trạng thái, thời điểm tạo/cập nhật.

Quan hệ: ProductionOrder 1–n MaterialShortage; Material 1–n MaterialShortage; Employee là người lập/người xử lý. Không liên kết lô, không thay MaterialIssue/MaterialIssueLine, không ghi MaterialMovement.

Trạng thái: PENDING → PROCESSING → RESOLVED, hoặc REJECTED; người lập có thể CANCELLED khi báo còn mở. Không xóa báo thiếu đã có lịch sử. Mỗi cặp lệnh–NVL chỉ một báo đang mở, kiểm tra trong transaction có khóa dùng chung.

## Bạn tự chạy trong thư mục backend

```powershell
npx prisma validate --config prisma7.config.ts
npx prisma migrate dev --name material_shortages --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

Sau đó khởi động lại backend. Phải tạo bảng và generate client trước khi chạy code mới; không reset DB. Chưa có migration được tạo/chạy tự động trong đợt này.

## Luồng sử dụng

1. Bếp nhận lệnh → Yêu cầu cấp NVL → chọn nguyên liệu. Không có lô/chỉ có lô hết hạn/hết tồn: mở khung Báo thiếu bên dưới phiếu cấp. Có thể báo cả trường hợp còn lô nhưng không đủ lượng.
2. Nhập **tổng lượng cần kho chuẩn bị để cấp cho đợt này**, không nhập riêng chênh lệch thiếu. Ví dụ kho còn 1 kg, cần cấp 3 kg: báo 3 kg, ghi lý do còn thiếu 2 kg. Quản lý căn cứ tồn thực tế để bổ sung, tránh hiểu sai số báo thiếu là số đặt mua.
3. Quản lý xem Báo thiếu ở danh sách lệnh hoặc chi tiết lệnh, nhập phản hồi và chuyển Đang bổ sung. Hàng về vẫn phải lập và ghi sổ phiếu nhập bình thường.
4. Quản lý chọn Đã sẵn sàng cấp: backend kiểm tra NVL ACTIVE và tổng tồn các lô còn hạn đủ lượng báo. Đây chỉ là xác nhận tại thời điểm xử lý, không giữ riêng hàng.
5. Bếp tải lại/mở lại chi tiết lệnh, lập đề nghị cấp theo lô mới. Báo thiếu không tự tạo phiếu cấp hoặc tự trừ tồn.
6. Không đáp ứng: ghi lý do. Không còn nhu cầu: người lập rút báo. Cần kết thúc/rút báo đang mở trước khi đóng lệnh; không tự hủy lệnh khi thiếu hàng.

Quyền dùng lại: material:request cho bếp; material:approve hoặc production:manage cho quản lý. Không thêm quyền hay vai trò mới.

## Kiểm tra sau migration

- NVL chưa có lô: gửi báo, quản lý nhìn thấy đúng lệnh/người/đơn vị; tồn không đổi.
- Báo lặp cùng NVL/lệnh khi chưa kết thúc: bị chặn.
- Người không nhận lệnh không được báo thay; người không có quyền quản lý không được xử lý.
- Kho chỉ có hàng hết hạn: không được xác nhận sẵn sàng cấp.
- Nhập đủ lô còn hạn, ghi sổ → xác nhận sẵn sàng → bếp đề nghị cấp theo lô.
- Báo đã kết thúc vẫn xem được bằng tùy chọn lịch sử.

Nếu dùng lại script SQL xóa dữ liệu cũ, cần thêm `MaterialShortage` vào danh sách TRUNCATE cùng các bảng liên quan; không dùng script cũ nguyên trạng sau migration.

Đợt cập nhật này chỉ sửa schema/code, chưa chạy migration, generate, build/test hoặc ghi dữ liệu DB.

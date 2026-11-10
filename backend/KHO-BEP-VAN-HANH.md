# Kho → cửa hàng → khách

Mô hình: chế biến trước theo kế hoạch, bán trong lượng cửa hàng đã nhận. Không nấu thêm theo đơn khách. Hiện có một kho thành phẩm và một cửa hàng.

| Người làm | Web / mục | Công việc |
| --- | --- | --- |
| Quản lý kho / trưởng bếp | Kho & Chế biến → Lệnh chế biến | Giao lượng cần làm theo công thức |
| Nhân viên chế biến | Kho & Chế biến → Lệnh chế biến | Nhận lệnh, xin NVL, làm, hoàn dư, báo hao hụt |
| Người có quyền nghiệm thu | Kho & Chế biến → Lệnh chế biến | Nghiệm thu; lượng đạt tăng kho TP |
| Nhân viên kho | Kho & Chế biến → Xuất TP sang cửa hàng | Lập phiếu đề nghị xuất TP để bán, theo ca |
| Quản lý kho | Cùng mục trên | Duyệt khi bàn giao: giảm kho, tăng cửa hàng, không ghi doanh thu |
| Phục vụ / thu ngân | Quản lý nhà hàng → Bàn / Đơn bán | Chọn món sẵn, xác nhận giữ lượng, phục vụ, thu tiền |
| Quản lý nhà hàng | Quản lý nhà hàng → Tồn cửa hàng | Xem hàng nhận, đề nghị hoàn hàng dùng được hoặc hủy/hao hụt |
| Quản lý kho | Xuất TP sang cửa hàng → Hoàn / hao hụt tại cửa hàng | Duyệt hoàn: cửa hàng giảm, kho tăng. Duyệt hủy: chỉ cửa hàng giảm |

## Quy tắc chính

- Phiếu chuyển chờ duyệt giữ lượng kho cho phiếu đó nhưng chưa đổi tồn. Duyệt toàn phiếu hoặc từ chối; phiếu đã xử lý không ghi sổ lần hai.
- Chỉ chọn được lượng cửa hàng còn nhận mới. Thiếu hoàn toàn: báo hết món. Còn 3 khi khách gọi 5: thỏa thuận bán 3 hoặc đổi món; hệ thống không nhận chờ chế biến.
- Đơn nháp chưa giữ hàng. Lưu và xác nhận món diễn ra trong cùng giao dịch; thiếu hàng thì không lưu dở thay đổi. Xác nhận món giữ lượng cho đơn. Thu tiền tạo biến động giảm cửa hàng và thanh toán cùng giao dịch; không trừ kho lần nữa.
- Không theo dõi số lượng đã mang ra. Trước thu tiền đối chiếu với khách, giảm/bỏ phần không dùng và ghi lý do. Không có bước xác nhận phục vụ trung gian.
- Tồn sổ cửa hàng gồm cả lượng đã giữ cho đơn chưa thanh toán. Còn nhận mới = tồn sổ − lượng giữ cho đơn − đề nghị hoàn/hao hụt đang chờ.
- Đề nghị hoàn/hủy chờ duyệt tạm ngừng bán lượng đó; bị từ chối thì giải phóng. Không lấy lượng đang giữ cho đơn khách.
- Thành phẩm chưa theo dõi lô/HSD. Hoàn về kho cần kiểm tra chất lượng ngoài thực tế, không tự coi hàng cuối ngày là còn dùng được.
- Báo cáo kho TP ghi nhận xuất sang cửa hàng; lượng bán dùng cho dự kiến chế biến lấy từ thanh toán, không lấy lượng chuyển nội bộ.

## Schema và chạy lại

Thêm `StoreDispatch`, `StoreDispatchLine`, `StoreAdjustment`, `StoreMovement`; thêm quan hệ vào Product, Employee, SaleLine, ProductMovement. Cần cập nhật ERD theo bốn bảng này.

Dừng backend, tự chạy tại thư mục `backend`:

```powershell
npx prisma db push --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

Chạy lại backend và tải lại các web. Admin: chọn lại mẫu mặc định mới và lưu vai trò đang sử dụng. Vai trò quản lý nhà hàng cần thêm `store:manage`; mẫu đã tùy chỉnh có thể khôi phục mặc định trước khi áp dụng. Thay mẫu không tự đổi vai trò hiện có. Đăng nhập lại sau khi đổi quyền.

Bảng xuất theo đơn / yêu cầu nấu bổ sung cũ được giữ làm lịch sử, không tiếp tục tạo chứng từ mới. Tồn cửa hàng mới bắt đầu bằng 0; phải lập và duyệt phiếu chuyển từ kho. Không tự đổi chứng từ cũ thành hàng cửa hàng. Đơn có phiếu xuất cũ không dùng để thử thanh toán luồng mới.

## Tự kiểm chứng nhanh

1. Kho có 100 phần, cửa hàng 0.
2. Nhân viên lập phiếu 60: kho vẫn 100, cửa hàng vẫn 0.
3. Quản lý duyệt: kho 40, cửa hàng 60; duyệt lại phải bị chặn.
4. Xác nhận đơn 20: tồn sổ cửa hàng 60, còn nhận mới 40.
5. Thu tiền: kho 40, cửa hàng 40. Thu lại phải bị chặn.
6. Yêu cầu 41 khi còn 40: phải bị chặn; không sinh lệnh chế biến.
7. Đề nghị hoàn 5, kho duyệt: kho 45, cửa hàng 35.
8. Đề nghị hủy 2, kho duyệt: kho 45, cửa hàng 33; vẫn xem được lịch sử và báo cáo hao hụt.

Chưa chạy build, test, generate hay cập nhật DB trong đợt triển khai này.
## Phản hồi cấp NVL và nghiệm thu

- Phiếu cấp NVL thêm `MaterialIssue.reviewNote String?`. Từ chối bắt buộc ghi lý do; duyệt có thể ghi chú bàn giao. Người lập xem kết quả, phản hồi, người xử lý và thời gian tại Lệnh → Lịch sử.
- Chờ duyệt hiển thị “Chưa cấp”, từ chối hiển thị “Không cấp”; chỉ phiếu đã duyệt có số đã cấp thực tế.
- Đối chiếu NVL theo lệnh là số hệ thống tính từ cấp, tiêu hao, hoàn/hao hụt; không phải kiểm đếm bếp và không nhập tồn thủ công.
- Người có `production:inspect` được nghiệm thu cả sản lượng mình làm. Admin quyết định cấp quyền này cho ai; vẫn lưu riêng người làm và người nghiệm thu.
- Thông tin & In có bản tổng hợp định mức, cấp NVL/phản hồi, tiêu hao, sản lượng/nghiệm thu, hoàn/hao hụt và số dư. Ghi rõ thời điểm dữ liệu.
- Tự chạy lại hai lệnh Prisma ở trên sau khi dừng backend để thêm cột phản hồi và sinh client; phiếu cũ không có phản hồi sẽ được ghi rõ là chưa lưu.



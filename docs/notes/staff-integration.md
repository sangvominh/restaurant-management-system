# Bàn giao tích hợp staff và Admin Kho

Tài liệu này mô tả dữ liệu hiện có và những điểm nhóm cần nối. Các API `/api/staff` yêu cầu phiên nhân viên và chỉ trả dữ liệu thuộc quyền của nhân viên; chúng chưa phải API cho Admin Kho.

## Phiếu xuất nguyên vật liệu

- Nhân viên gửi `POST /api/staff/production-orders/material-requests` với `items: [{ balanceId, quantity }]`, số lượng là chuỗi theo đơn vị tồn của nguyên liệu. Phiếu tạo trong `material_issues` và `material_issue_details`, trạng thái ban đầu `PENDING`. `staff_audits` có `action = MATERIAL_REQUEST` và `target_id` là ID phiếu.
- Luồng duyệt kho hiện có ghi giảm `material_balances`. Migration `20261104120000_staff_kitchen_stock` có trigger theo dõi việc chuyển phiếu nhân viên sang `APPROVED`: ghi một dòng trong `staff_kitchen_receipts` cho mỗi chi tiết và cộng vào `staff_kitchen_balances` trong cùng giao dịch. Khóa duy nhất trên `issue_detail_id` tránh cộng lại. Phiếu đã duyệt trước khi cài migration không tự được nhập vào tồn bếp.
- Nhóm trưởng cần đối chiếu cơ chế nhận này với luồng cấp nguyên liệu cho lệnh sản xuất của kho. Không xử lý một lần xuất vừa bằng phiếu trên vừa bằng một lần cấp kho riêng, nếu chúng đại diện cùng nguyên liệu.

## Hao hụt nguyên vật liệu

- App staff tạo hao hụt tồn bếp bằng `POST /api/staff/material-waste/kitchen` với `{ lotId, quantity, reason }`. Khi hoàn thành món theo order, thao tác tương đương được ghi trong cùng giao dịch báo hoàn thành. Cả hai ghi `staff_kitchen_waste`: mã phiếu, nhân viên, chi nhánh, lô, số lượng, lý do, thời gian và `order_line_id` nếu phát sinh từ order.
- Hiện tại việc tạo `staff_kitchen_waste` **đã trừ tồn bếp ngay**. Trang nhân viên hiển thị `RECORDED` như nhãn suy ra từ loại bản ghi; bảng này chưa có cột trạng thái gửi/đã xem. **Chưa có API Admin, thông báo hoặc cơ chế giao nhận đến Admin**. Nhóm trưởng cần tạo đầu đọc hoặc sự kiện có xác thực, giới hạn theo chi nhánh, và thống nhất cách theo dõi đã nhận/đã xem. Không trừ tồn lần thứ hai khi đọc hoặc xử lý bản ghi đã ghi nhận.
- Bảng cũ `staff_material_waste` chứa phiếu theo `balance_id` và trạng thái `PENDING`/`APPROVED`/`REJECTED`; không đồng nhất với hao hụt bếp đã trừ ở trên. Cần phân biệt nguồn khi tích hợp. `GET /api/staff/material-waste` chỉ trả phiếu của chính nhân viên trong chi nhánh, bao gồm cả hai nguồn.
- Bản ghi hao hụt từ **lệnh sản xuất** chưa được tạo khi báo hoàn thành; hiện chỉ ghi kèm được từ order hoặc tạo thủ công. Cần bổ sung liên kết lệnh và thao tác ghi trong cùng giao dịch trước khi tuyên bố hỗ trợ luồng đó.

## Báo hoàn thành thành phẩm

- `POST /api/staff/production-orders/:code/finished-goods` nhận `{ quantity }`, lưu `finished_goods_receipts` ở trạng thái `PENDING` và đưa lệnh sang `WAITING_APPROVAL`. Bản ghi này là báo cáo, chưa tăng `finished_goods_balances`.
- Khi quản lý duyệt phiếu nhập theo API kho hiện có, số lượng được chấp nhận mới được ghi vào tồn thành phẩm. Lệnh dùng tồn bếp có dấu trong `staff_kitchen_production_starts`; lượng đã sử dụng theo lô nằm trong `staff_kitchen_production_consumptions`, và chỉ được trừ một lần khi báo hoàn thành. Lệnh được kho cấp trực tiếp trước đó đi theo luồng cũ.
- Kiểm tra tồn khi bắt đầu chưa giữ chỗ. Nếu tồn thay đổi, lúc báo hoàn thành phải kiểm tra lại. Khi nối xử lý duyệt/từ chối và gửi lại, cần giữ tính nguyên tử và tránh trừ NVL hai lần; báo lại với số lượng khác hiện bị từ chối đối với lệnh đã ghi nhận tiêu hao.

## Phiếu hoàn trả và thành phẩm lỗi

- `staff_material_returns` lưu phiếu hoàn trả của nhân viên và ID chi tiết phiếu xuất gốc; hiện phía Admin chưa được nối để xử lý. Không suy ra tồn bếp thực tế chỉ từ số đã xuất trừ số đã trả: nguyên liệu có thể đã được dùng hoặc hao hụt.
- Phiếu thành phẩm lỗi dùng `finished_goods_defects`, kèm audit `FINISHED_DEFECT_REQUEST`. Đối chiếu luồng duyệt kho hiện có và phân quyền khi tích hợp.

## Trước khi dùng chung

Thống nhất với nhóm trưởng hợp đồng API hoặc sự kiện, xác thực Admin, trạng thái, idempotency, giao dịch đồng thời và cách xử lý dữ liệu đã có trước migration. Công thức order hiện là dữ liệu giả lập trong `staff_demo_order_recipes`, chưa nối nguồn BOM chính thức. Dữ liệu demo và các trạng thái lịch sử giả lập không thay thế kiểm thử tích hợp trên dữ liệu thật.

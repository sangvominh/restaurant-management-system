# Bàn giao tích hợp staff và Admin Kho

Tài liệu này mô tả dữ liệu hiện có và những điểm nhóm cần nối. Các API `/api/staff` yêu cầu phiên nhân viên và chỉ trả dữ liệu thuộc quyền của nhân viên; chúng chưa phải API cho Admin Kho.

## Phiếu xuất nguyên vật liệu

- Nhân viên gửi `POST /api/staff/production-orders/material-requests` với `items: [{ balanceId, quantity }]`, số lượng là chuỗi theo đơn vị tồn của nguyên liệu. Phiếu tạo trong `material_issues` và `material_issue_details`, trạng thái ban đầu `PENDING`. `staff_audits` có `action = MATERIAL_REQUEST` và `target_id` là ID phiếu.
- Luồng duyệt kho hiện có ghi giảm `material_balances`. Migration `20261104120000_staff_kitchen_stock` có trigger theo dõi việc chuyển phiếu nhân viên sang `APPROVED`: ghi một dòng trong `staff_kitchen_receipts` cho mỗi chi tiết và cộng vào `staff_kitchen_balances` trong cùng giao dịch. Khóa duy nhất trên `issue_detail_id` tránh cộng lại. Phiếu đã duyệt trước khi cài migration không tự được nhập vào tồn bếp.
- Nhóm trưởng cần đối chiếu cơ chế nhận này với luồng cấp nguyên liệu cho lệnh sản xuất của kho. Không xử lý một lần xuất vừa bằng phiếu trên vừa bằng một lần cấp kho riêng, nếu chúng đại diện cùng nguyên liệu.

## Hao hụt nguyên vật liệu

- App staff tạo phiếu từ tồn bếp qua `POST /api/staff/material-waste/kitchen` hoặc lúc hoàn thành món. Phiếu `staff_kitchen_waste` mới có trạng thái `PENDING`; lượng được giữ ở `staff_kitchen_balances.reserved_waste`, chưa giảm `quantity`. Tồn khả dụng để chế biến và đề nghị trả không bao gồm lượng giữ.
- Phần Admin cần tự xây dựng API, xác thực và kiểm tra quyền chi nhánh. Sau đó import `StaffModule` và gọi `KitchenWasteDecisionService.pending(branchId)` để lấy phiếu, hoặc `decide({ branchId, code, decision, decidedBy, reason })` với `decision` là `APPROVED`/`REJECTED`; từ chối bắt buộc có lý do. Service khóa phiếu, cập nhật tồn và trạng thái trong cùng transaction, lưu người quyết định và thời gian, ngăn xử lý lại. Không cập nhật trạng thái trực tiếp hoặc tự trừ tồn lần hai.
- `GET /api/staff/material-waste` cho nhân viên xem phiếu của mình và lý do từ chối. Bản ghi cũ có `RECORDED`, vì tồn đã được trừ trước migration; không duyệt hoặc trừ lại chúng. Phiếu trong `staff_material_waste` là nguồn cũ riêng, không xử lý bằng service này.
- Phần báo hao hụt từ lệnh sản xuất chưa nằm trong phạm vi thay đổi này. Liên kết nguồn lĩnh và quyết toán dùng sổ phân bổ ở mục hoàn trả.

## Hạn sử dụng và dữ liệu lô

- Staff chỉ gửi đề nghị lĩnh đối với lô đang hoạt động, có hạn và chưa hết hạn; lúc duyệt phiếu nhân viên, kiểm tra lại hạn. Quy ước ngày Việt Nam: lô còn dùng được đến hết ngày ghi trên hạn. Lô sắp hết hạn hiển thị cảnh báo trong ba ngày tính cả ngày hết hạn.
- Lô hết hạn hoặc không ghi hạn vẫn xuất hiện trong tồn bếp và có thể báo hao hụt, nhưng không được tính vào lượng dùng khi chế biến. Lệnh do kho cấp trực tiếp phải có lịch sử lô hợp lệ, còn hạn trước khi staff bắt đầu hoặc báo hoàn thành.
- Phần Admin chịu trách nhiệm bổ sung hoặc xác nhận chức năng cập nhật hạn cho lô thiếu dữ liệu và kiểm tra hạn khi duyệt cấp. Trước đây API kho chưa thấy chức năng cập nhật hạn. Không thay đổi hạn thiếu bằng dữ liệu tự suy đoán.
- Sau khi hoàn tất năm feedback, chuẩn bị dữ liệu mẫu tách biệt và hướng dẫn test đầu-cuối cho staff và điểm nối Admin: lô còn hạn/sắp hết hạn/hết hạn/không hạn, phiếu đang chờ/duyệt/từ chối, dùng và hoàn trả theo phiếu lĩnh, lỗi giữa chừng và cấp bổ sung.

## Báo lỗi trong chế biến

- Staff gửi `POST /api/staff/processing-defects` với loại `ORDER` (dòng món đang chế biến) hoặc `PRODUCTION` (lệnh dùng tồn bếp đang sản xuất), số lượng lỗi, lý do và các lô NVL đã sử dụng thực tế. Mỗi lô được giữ trong `reserved_waste`, gắn với phiếu lỗi thông qua `staff_kitchen_waste.processing_defect_id`.
- Phần Admin tự xác thực và kiểm tra quyền chi nhánh trước khi gọi `ProcessingDefectDecisionService.pending(branchId)` hoặc `decide({branchId,code,decision,decidedBy,reason})`. Xử lý cả phiếu trong một transaction; không duyệt riêng các dòng hao hụt liên kết. Phiếu lỗi và dòng NVL đều cập nhật trạng thái một lần.
- Với món theo order, khi phiếu sự cố chờ duyệt, món chưa thể hoàn thành. Khi duyệt, nếu toàn bộ dòng lỗi thì dòng quay về `QUEUED`; nếu chỉ một phần lỗi, hệ thống tách đúng số phần lỗi thành dòng `QUEUED` và giữ phần còn lại `COOKING`, không đổi tổng số lượng tính tiền. `retry_order_line_id` liên kết phiếu với dòng làm lại. Từ chối giữ trạng thái món hiện tại.
- Phiếu đã gửi không đại diện NVL đã được trừ theo công thức; không báo lại cùng một lượng đã tiêu hao. Lệnh đã cấp trực tiếp từ kho chưa hỗ trợ báo lỗi giữa chừng vì không có sổ NVL bếp để giữ. Luồng kiểm kê thành phẩm đã nhập kho và duyệt xuất của Admin cần tính đến phiếu thành phẩm lỗi đang chờ trước khi trừ hoặc xuất tồn.

## Báo hoàn thành thành phẩm

- `POST /api/staff/production-orders/:code/finished-goods` nhận `{ quantity }`, tạo một dòng `finished_goods_receipts` ở trạng thái `PENDING` cho mỗi đợt và đưa lệnh sang `WAITING_APPROVAL`. Tổng lượng báo trên mọi đợt không được vượt số lượng lệnh; khi phiếu trước được duyệt hoặc từ chối, lệnh quay về `IN_PROGRESS` nếu tổng lượng báo chưa đạt kế hoạch. Phiếu báo cáo chưa tăng `finished_goods_balances`.
- Khi quản lý duyệt từng phiếu nhập theo API kho hiện có, chỉ số lượng được chấp nhận của phiếu đó mới được ghi vào tồn thành phẩm. Lệnh chuyển `COMPLETED` khi tổng lượng báo đạt kế hoạch; nếu chưa, nhân viên có thể tiếp tục và báo đợt kế tiếp. Lệnh dùng tồn bếp ghi tiêu hao theo lô và theo phiếu báo trong `staff_kitchen_production_consumptions`; mỗi đợt trừ lượng NVL theo BOM một lần trong cùng giao dịch tạo phiếu. Lệnh được kho cấp trực tiếp đi theo cùng cơ chế phiếu nhiều đợt nhưng không trừ lại tồn bếp.
- Staff xem lịch sử chế biến chi nhánh tại `GET /api/staff/production-orders/history` (các đợt lệnh sản xuất) và `GET /api/staff/kitchen/history` (món theo order). Staff Bếp xem món không thuộc nhóm Đồ uống; Pha chế xem Đồ uống. Giao diện Bếp KDS gộp hai nguồn và cho lọc theo order, lệnh sản xuất hoặc tất cả.
- Kiểm tra tồn khi bắt đầu chưa giữ chỗ. Nếu tồn đổi trước lần báo, lúc báo kiểm tra lại và rollback toàn bộ đợt nếu không đủ; phần NVL các đợt trước không bị trừ lần hai.

## Phiếu hoàn trả và thành phẩm lỗi

- Phiếu hoàn trả mới lưu tình trạng, xác nhận kiểm tra và giữ tồn bếp tại `reserved_return`. Admin tự xác thực và kiểm tra quyền chi nhánh, sau đó gọi `KitchenReturnDecisionService.pending(branchId)` và `decide({branchId, code, decision, decidedBy, reason})`. Duyệt giảm tồn bếp, tăng lại tồn tại vị trí xuất gốc và ghi `RETURN`; từ chối giải phóng lượng giữ. Phiếu cũ chưa có giữ tồn không được xử lý tự động, cần đối chiếu.
- `staff_kitchen_sources` theo dõi lượng còn lại cho từng dòng lĩnh; `staff_kitchen_source_allocations` lưu phân bổ theo món, lệnh, hao hụt và hoàn trả. Các sự kiện mới phân bổ theo thứ tự nhận; từ chối giải phóng lượng của đúng nguồn. Lô cũ có lịch sử không đủ để xác định nguồn không tự được gán. Phần tồn cũ không xác định được được dùng trước nguồn mới và chưa thể hoàn trả theo phiếu cho đến khi đối chiếu. Không cập nhật các bảng phân bổ trực tiếp ngoài giao dịch kho.
- Phiếu thành phẩm lỗi dùng `finished_goods_defects`, kèm audit `FINISHED_DEFECT_REQUEST`. Đối chiếu luồng duyệt kho hiện có và phân quyền khi tích hợp.

## Trước khi dùng chung

Thống nhất với nhóm trưởng hợp đồng API hoặc sự kiện, xác thực Admin, trạng thái, idempotency, giao dịch đồng thời và cách xử lý dữ liệu đã có trước migration. Công thức order hiện là dữ liệu giả lập trong `staff_demo_order_recipes`, chưa nối nguồn BOM chính thức. Dữ liệu demo và các trạng thái lịch sử giả lập không thay thế kiểm thử tích hợp trên dữ liệu thật.

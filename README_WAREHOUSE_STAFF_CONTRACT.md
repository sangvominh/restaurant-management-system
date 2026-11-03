# Bàn giao App Nhân viên: hao hụt và hoàn trả NVL

Admin Kho đã có bốn API `/warehouse/material-adjustments`: GET danh sách, GET `/:code`, POST `/:code/approve`, POST `/:code/reject`. **Chưa có API nhân viên tạo phiếu hoặc chốt tiêu hao**. Staff cần triển khai riêng; không ghi DB từ frontend.

Một phiếu hiện lưu **một NVL/lô/vị trí**, không phải nhiều dòng.

| Trường tạo phiếu | Nội dung |
| --- | --- |
| `code` | Mã duy nhất, tối đa 50 ký tự; Backend Staff cấp mã |
| `type` | `WASTE` hoặc `RETURN` |
| `source` | `STOCK` hoặc `ISSUED`; RETURN chỉ dùng ISSUED |
| `materialLotId` | UUID lô; từ lô suy ra NVL, không nhập tên tự do |
| `locationId` | UUID vị trí thuộc chi nhánh hợp lệ; không phải kho FINISHED_GOODS |
| `issueDetailId` | UUID **dòng** phiếu xuất đã APPROVED, bắt buộc với ISSUED; STOCK để null |
| `quantity` | Chuỗi số dương, tối đa 3 chữ số thập phân, theo **đơn vị gốc** của NVL |
| `reason` | Lý do không rỗng, tối đa 500 ký tự |

Backend Staff đặt `PENDING`; không cho client gửi trạng thái duyệt, acceptedQuantity, processedAt hay movement. Kiểm tra người gửi/ca/chi nhánh theo phân quyền của Staff. Mô hình hiện chưa lưu riêng requesterId: nếu cần truy vết người lập, thống nhất thay đổi bổ sung với Lead trước tích hợp.

Với ISSUED: dòng xuất phải khớp NVL/lô/chi nhánh, phiếu gốc APPROVED; không suy đoán dòng bằng tên NVL hoặc lotCode. API chi tiết phiếu xuất hiện tại chưa công khai ID từng dòng, nhóm Staff cần thống nhất cách trả ID này từ Backend nguồn trước khi nối form.

## Quyết toán bắt buộc trước duyệt ISSUED

`MaterialUsageSettlement` lưu một bản chốt cho mỗi `issueDetailId`:

- `consumedQuantity`: tổng NVL đã dùng, theo đơn vị gốc, không âm.
- `finalizedAt`: thời điểm server chốt, không ở tương lai.
- `referenceCode`, `recordedBy`: chứng từ và người chốt có thể truy vết.

Đây phải là số liệu tiêu hao **đã kết thúc**, không lấy từ số người dùng tự nhập trên phiếu hoàn trả. Khi có quyết toán hao hụt/hoàn trả, không được tiếp tục sử dụng cùng lượng đã chốt hoặc sửa bản chốt tùy ý. Lead/MRP cần thống nhất thời điểm khóa ca/dòng cấp phát và cơ chế phân bổ khi nhiều hoạt động cùng dùng một dòng. Chưa có nguồn đáng tin cậy thì giữ BLOCKED; không mặc định tiêu hao bằng 0.

`Còn được quyết toán = lượng lĩnh quy đổi gốc − lượng dùng đã chốt − tổng acceptedQuantity của WASTE ISSUED/RETURN đã APPROVED`.

## Admin xử lý

- GET danh sách: `?type=WASTE|RETURN&status=PENDING|APPROVED|REJECTED`, mặc định PENDING, tối đa 100.
- Approve body: `{"acceptedQuantity":"2","qualityStatus":"ACCEPTABLE","note":"Chỉ nhận 2 kg đạt chất lượng"}`. RETURN bắt buộc ACCEPTABLE và còn hạn; thiếu số lượng thực nhận không được duyệt. Nhận ít hơn đề nghị phải có note; phần chênh lệch không tự quyết toán.
- Reject body: `{"reason":"Lý do từ chối"}`.
- STOCK WASTE: giảm kho, movement WASTE. ISSUED WASTE: chỉ ghi nhận, không trừ kho/movement lần hai. RETURN: cộng kho và movement RETURN. Từ chối: không thay đổi kho.
- Phiếu đã xử lý không duyệt lại; conflict trả 409 và cần tải lại. Thiếu migration trả 503.

Migration `20261103160000_material_adjustments` chỉ đã thử trong schema test riêng; chưa chạy DB dùng chung. ProductionOrder chưa nối chứng từ cấp phát và vẫn có logic trừ NVL riêng: **PENDING INTEGRATION với nhóm MRP**, không ghép hai đường trừ tồn khi chưa thống nhất.

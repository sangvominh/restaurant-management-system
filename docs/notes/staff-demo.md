# Demo app nhân viên

Dữ liệu chỉ dùng để trình diễn trong container PostgreSQL riêng `restaurant-staff-demo` (cổng 55439). Cần Docker và dependencies frontend/backend đã cài. Không dùng dữ liệu thật.

1. Từ thư mục gốc chạy `./scripts/staff-demo-setup.sh`.
2. Chạy backend: `cd backend` rồi `DATABASE_URL='postgresql://postgres:staff_demo_only@127.0.0.1:55439/staff_demo' PORT=3001 npm run start`.
3. Chạy frontend: `cd frontend` rồi `npm run dev -- --port 3002`.
4. Mở `http://localhost:3002/staff/login`. Cả ba tài khoản dùng mật khẩu demo `demo-password-2026`:

| Mã nhân viên | Vai trò | Nội dung |
| --- | --- | --- |
| `DEMO-KITCHEN` | Bếp | Món ăn, lệnh sản xuất và phiếu của bếp. |
| `DEMO-BARISTA` | Pha chế | Món uống, lệnh sản xuất và phiếu của pha chế. |
| `DEMO-CASHIER` | Thu ngân | Xem tổng quan, hóa đơn mẫu, trạng thái món và ca; giao diện thanh toán đang hoàn thiện. |

Các tài khoản có ca đang mở lúc khởi tạo. Mỗi tài khoản Bếp/Pha chế có lệnh chưa cấp nguyên liệu, đã cấp chờ bắt đầu, đang làm, chờ duyệt và hoàn thành. Các loại phiếu xuất NVL, hoàn trả, hao hụt, xuất thành phẩm và thành phẩm lỗi có ví dụ chờ duyệt, đã duyệt và từ chối. Xem tổng hợp ca ở mục Thành phẩm. Có lệnh đã cấp và tồn để thử thao tác mới.

Các trạng thái lịch sử và việc cấp nguyên liệu của lệnh mẫu là giả lập, không phải lịch sử giao dịch kho đầy đủ. Duyệt phiếu hoàn trả và hao hụt NVL của nhân viên chưa được nối với Admin Kho. Dữ liệu nguyên liệu vẫn là tồn chung theo chi nhánh; lọc món tạm thời dùng danh mục `Đồ uống`, cần thống nhất danh mục và phân quyền với nhóm. Các API kho chưa có phân quyền đầy đủ.

Chạy setup nhiều lần không đặt lại trạng thái đã thao tác. Dữ liệu container được giữ giữa các lần chạy; nếu kết thúc ca mẫu, hãy bắt đầu ca mới trên app. Để có lại toàn bộ trạng thái ban đầu cần tạo database demo mới sau khi tự lưu dữ liệu cần giữ.

Dữ liệu kho mẫu dùng kg cho thịt bò, rau củ, trà khô và đường; sữa tươi dùng lít. Chạy lại setup sẽ sửa cách gán đơn vị và phân loại cũ của các mã demo trên, giữ nguyên con số tồn và đơn vị đã ghi trong phiếu lịch sử. Công thức trà sữa mẫu dùng 0,1 lít sữa cho mỗi ly. Đây là dữ liệu giả lập, không dùng để chuyển đổi số liệu kho thực tế.

Bộ mẫu bếp bổ sung phiếu cấp `DEMO-CAP-BEP-001` và một order tại Bàn 01 gồm hai phần bò sốt cà chua, một trà sữa lài. Phiếu này trừ kho nguồn và ghi nhận mỗi nguyên liệu vào tồn bếp một lần. Công thức order là dữ liệu giả lập. Lệnh chưa được kho cấp trực tiếp sử dụng tồn bếp; lệnh đã được kho cấp trước đó tiếp tục dùng lượng cấp cũ. Thông báo hao hụt cho Admin chưa được nối. Chạy lại setup giữ nguyên số lượng đã thao tác, không tạo lại phiếu hoặc order mẫu.

Các tình huống thử trên dữ liệu mới:

- Order Bàn 01 có hai dòng bò sốt cà chua, mỗi dòng 6 phần. Ban đầu tồn bếp có 2 kg thịt bò; hoàn thành dòng đầu dùng 1,2 kg, dòng còn lại cần 1,2 kg và thiếu 0,4 kg. Chọn “Yêu cầu xuất NVL” để thử phiếu gợi ý.
- Lệnh `DEMO-BEP-LSX-DU` đủ nguyên liệu theo tồn bếp ban đầu; `DEMO-BEP-LSX-THIEU` cần 3 kg thịt bò trong khi bếp có 2 kg, nên thiếu 1 kg. Kiểm thử riêng từng tình huống vì thao tác trên một case sẽ thay đổi tồn dùng chung.
- Tại popup hoàn thành order, phải chọn “Không có hao hụt” hoặc chọn lô bị hao hụt và nhập số lượng, lý do.

Để đưa database demo về trạng thái ban đầu, chạy `./scripts/staff-demo-reset.sh`. Script lưu một bản sao database demo vào thư mục tạm trước khi xóa và tạo lại; các thao tác test hiện tại sẽ không còn trong database đang dùng. Script chỉ tác động container `restaurant-staff-demo` và database `staff_demo`.

Lưu ý khi test: báo hoàn thành nhiều đợt trong lúc phiếu trước chờ duyệt và hao hụt khi hoàn thành lệnh sản xuất chưa được hỗ trợ. Phiếu hao hụt tại bếp chưa được kết nối với màn hình Admin Kho.

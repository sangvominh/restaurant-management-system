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

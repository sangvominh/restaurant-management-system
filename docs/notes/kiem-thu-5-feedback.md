# Luồng kiểm thử 5 feedback cho staff

Bộ dữ liệu mẫu thuộc chi nhánh `TEST-CN01`. Tài khoản `DEMO-KITCHEN`, mật khẩu `demo-password-2026`. Truy cập `http://localhost:3002/staff/login`. Dữ liệu thay đổi khi thao tác, nên thực hiện theo thứ tự dưới đây. Bộ này tạo mới, không tự reset khi chạy lại script.

## Dữ liệu ban đầu

- **Thịt bò tươi**: lô `LO-101` có 20 kg tại bếp, từ hai phiếu `PX-101` và `PX-102`, mỗi phiếu 10 kg.
- **Ức gà**: lô `LO-102` có 5 kg tại bếp và còn 10 kg ở kho.
- **Rau củ hỗn hợp**: các lô `LO-103A`, `LO-103B`, `LO-103C`, `LO-103D`, mỗi lô 3 kg tại bếp và 2 kg tại kho. Nhãn sắp hết hạn có thể đổi theo ngày.
- Món order `Bò xào rau củ` gồm 12 phần, định mức 1 kg/phần; món `Gà sốt tiêu` gồm 2 phần, định mức 1 kg/phần.
- Lệnh `LSX-101` làm 2 phần, dùng nguyên liệu lỗi và hao hụt; thành phẩm `Gà sốt tiêu` có 5 phần trong kho.

## 1. Kiểm tra hạn sử dụng — FB2

1. Mở **Tồn kho**, tìm `Rau củ hỗn hợp`. Xem bốn lô của nguyên liệu kiểm tra hạn. Lô hết hạn và không hạn có nhãn rõ và không chọn được để đề nghị xuất; lô còn hạn và sắp hết hạn vẫn chọn được.
2. Mở **Tồn bếp** tìm cùng nguyên liệu. Cả bốn lô còn hiển thị; lô hết hạn và không hạn không được tính khi chế biến.
3. Lô hết hạn và không hạn là dữ liệu mô phỏng đã được cấp trước đó, không phải phiếu mới vừa được duyệt.

## 2. Hao hụt — FB1

1. Mở **Nguyên vật liệu → Báo lỗi / hao hụt → Hao hụt nguyên liệu**. Chọn lô `LO-103B`, gửi hao hụt 1 kg với lý do ví dụ “đổ nguyên liệu”.
2. Phiếu hiện **Chờ duyệt**. Tại **Tồn bếp**, lô còn tổng 3 kg, giữ hao hụt 1 kg, khả dụng 2 kg. Không lập được phiếu hao hụt khác vượt lượng khả dụng.
3. Sau khi Admin được nối và duyệt, tồn tổng còn 2 kg, lượng giữ bằng 0, phiếu hiện **Đã duyệt**. Nếu từ chối thay vì duyệt, tồn tổng vẫn 3 kg, lượng giữ về 0, phiếu hiện **Từ chối** kèm lý do.

## 3. Lĩnh trước dùng trước và hoàn trả — FB5 và FB3

1. Trước khi làm món, mở **Hoàn trả nguyên liệu**, tìm `Thịt bò tươi`: `PX-101` và `PX-102` đều còn 10 kg.
2. Mở **Món theo order**, tìm `Bò xào rau củ` tại Bàn 01. Bấm **Bắt đầu**, sau đó **Hoàn thành**, chọn “Không có hao hụt”. Món dùng 12 kg.
3. Quay lại **Hoàn trả nguyên liệu**: `PX-101` không còn lượng để trả; `PX-102` còn 8 kg. Chọn `PX-102`, đề nghị trả 3 kg, chọn tình trạng bao bì và đánh dấu đã kiểm tra. Nhập ghi chú nếu chọn “Khác”.
4. Phiếu **Chờ duyệt**, `PX-102` còn 5 kg có thể trả. Tồn bếp tổng vẫn 8 kg, trong đó 3 kg đang giữ hoàn trả.
5. Khi Admin duyệt, tồn bếp còn 5 kg và kho tăng 3 kg. Nếu từ chối, tồn bếp vẫn 8 kg và `PX-102` trở lại 8 kg có thể trả; xem lý do trên phiếu.

## 4. Lỗi giữa chừng — FB4

1. Trong **Món theo order**, tìm `Gà sốt tiêu`, bấm **Bắt đầu**.
2. Mở **Báo lỗi chế biến**. Chọn món đang làm, nhập 1 phần lỗi, lý do “cháy”; thêm `LO-102` với 4 kg nguyên liệu đã dùng. Gửi phiếu.
3. Phiếu chờ duyệt, 4 kg được giữ riêng; lô còn 1 kg khả dụng. Món chưa thể hoàn thành cho tới khi phiếu được xử lý.
4. Khi Admin duyệt, 4 kg bị trừ đúng một lần; hệ thống tách 1 phần lỗi về trạng thái chờ, có nút **Bắt đầu**, còn 1 phần tiếp tục chế biến. Tổng số phần tính tiền giữ nguyên. Bếp có thể cần đề nghị kho cấp thêm để hoàn thành cả hai phần. Nếu Admin từ chối, lượng giữ được giải phóng và món tiếp tục ở trạng thái đang chế biến.
5. Có thể thử báo lỗi lệnh `LSX-101` sau khi bắt đầu, nhưng lệnh và món lỗi dùng chung lô 5 kg nên cần cấp thêm hoặc thử trước khi dùng hết. Lệnh được kho cấp trực tiếp chưa hỗ trợ luồng lỗi giữa chừng.

## 5. Thành phẩm đã nhập kho — phần còn lại của FB4

1. Mở **Kho thành phẩm → Báo thành phẩm lỗi**, chọn `Gà sốt tiêu` và báo 2 phần. Phiếu chờ duyệt; lượng staff có thể đề nghị xuất hoặc báo lỗi tiếp giảm còn 3 phần.
2. Phần Admin cần nối kiểm tra lượng đang chờ báo lỗi trước khi duyệt xuất. Không kết luận luồng duyệt xuất Admin đã hoàn chỉnh chỉ từ kiểm tra phía staff.

## Phần duyệt Admin

Màn hình Admin chưa nối các mối xử lý mới; bạn có thể kiểm tra đến trạng thái chờ duyệt trên app. Để thử tiếp sau duyệt/từ chối mà chưa có màn hình Admin, người chạy thử có thể dùng công cụ mô phỏng cục bộ từ thư mục `backend`:

```sh
npx tsx scripts/feedback-demo-decision.ts waste list
npx tsx scripts/feedback-demo-decision.ts return list
npx tsx scripts/feedback-demo-decision.ts defect list
npx tsx scripts/feedback-demo-decision.ts waste approve MA_PHIEU
npx tsx scripts/feedback-demo-decision.ts return reject MA_PHIEU "Kiểm tra lại bao bì"
npx tsx scripts/feedback-demo-decision.ts defect approve MA_PHIEU
```

Thay `MA_PHIEU` bằng mã phiếu ở màn hình staff. Các loại hỗ trợ `approve` và `reject`; từ chối bắt buộc có lý do. Công cụ chỉ xử lý phiếu có nguyên liệu mẫu trong database demo cục bộ, không phải màn hình Admin. Phiếu thành phẩm đã nhập kho vẫn dùng luồng Admin hiện có và không hỗ trợ bằng công cụ này.

# Dữ liệu mẫu: chuẩn bị trước, bán hết thì nghỉ

Bộ dữ liệu bám schema Prisma hiện tại, dùng luồng **kho nguyên liệu → cấp bếp → chế biến theo kế hoạch → nghiệm thu → kho thành phẩm → cửa hàng → phục vụ → thanh toán**. Không tạo lệnh nấu từ đơn khách, phiếu xuất bán cũ hoặc yêu cầu chế biến bổ sung theo khách.

Tham khảo mô hình [Franklin Barbecue](https://franklinbbq.com/): giờ phục vụ công bố là 11 giờ đến khi bán hết, thường khoảng 14–15 giờ. Thực đơn, giá VND, định mức, tỷ lệ thu hồi, tên nhà cung cấp và các tình huống dưới đây đều hư cấu để kiểm thử; không phải dữ liệu vận hành hay công thức Franklin.

## Chạy seed

Chạy trong `backend`, với Node.js 24 (phiên bản đã kiểm chứng). Dùng các dependency có sẵn, không cần build backend để chạy seed.

```powershell
cd backend

# Xem số lượng và tồn dự kiến, chưa kết nối DB.
npm run seed:sample -- --date=2026-11-10

# Có thể xuất toàn bộ dữ liệu JSON để xem/import qua công cụ riêng.
npm run seed:sample -- --date=2026-11-10 --export=bbq-service.json
```

Để nạp dữ liệu, đặt `DATABASE_URL` trỏ tới **CSDL test** trong `backend/.env` hoặc biến môi trường của phiên PowerShell. CSDL phải có đầy đủ bảng/cột từ thư mục `prisma` hiện tại, gồm các bảng cửa hàng. Nếu vừa tạo CSDL test trống, có thể đồng bộ schema trước:

```powershell
npx prisma db push --config prisma7.config.ts

# Tự đặt mật khẩu chung cho các tài khoản mẫu.
$env:SAMPLE_DATA_PASSWORD = 'Mat-khau-test-tu-dat-2026!'
npm run seed:sample -- --date=2026-11-10 --scenario=service --apply
```

Kịch bản hết hàng dùng **CSDL test khác hoặc CSDL test mới**:

```powershell
npm run seed:sample -- --date=2026-11-10 --scenario=sold-out --apply
```

Bỏ `--date` sẽ dùng ngày hiện tại tại Việt Nam. Đây là ngày của ảnh chụp mô phỏng, không phải đồng hồ chạy tiến trình bán hàng. `service` chụp lúc 12:40 và `sold-out` lúc 14:00, múi giờ +07:00. Các báo cáo lọc đến thời điểm hiện tại có thể chưa hiển thị giao dịch có giờ mô phỏng ở tương lai; dùng ngày đã qua để đối chiếu trọn ngày.

Seed ghi trong một transaction, không xóa dữ liệu và không ghi đè tài khoản, mật khẩu hay giao dịch đã có. Đơn vị/quyền trùng khóa tự nhiên được dùng lại mà không đổi tên/quyền đang cấp. Chạy lại cùng ngày/scenario khi bộ mẫu còn đầy đủ sẽ bỏ qua. Nếu bộ mẫu bị thiếu hoặc đã có bộ ngày/scenario khác, lệnh dừng; muốn bắt đầu lại hãy dùng CSDL test mới. `NODE_ENV=production` bị chặn. JSON xuất ra chứa placeholder mật khẩu; seed mới tạo hash scrypt đúng định dạng của backend.

## Những gì có trong bộ mẫu

| Nhóm | Số lượng / nội dung |
| --- | --- |
| Món | 14 món, gồm 13 đang bán và sườn bò đặc biệt tạm ngừng |
| Nguyên liệu | 25 loại, đơn vị kg/lít/cây/lon/chai/quả; có một loại ngừng dùng |
| Công thức | 15 BOM: công thức đang dùng, bản v2 nháp, công thức của món ngừng bán |
| Kho | 5 nhà cung cấp, 173 lô, 32 phiếu nhập; có phiếu nháp, lô cận/hết hạn |
| Chế biến | 94 lệnh: đã xong, mới, đã nhận, đang làm; có lần chờ nghiệm thu và báo thiếu NVL |
| Cửa hàng | Bàn giao đã duyệt, chờ, từ chối; hoàn/hủy chờ, đã duyệt và từ chối |
| Bàn | 3 khu, 14 bàn/quầy; có bàn trống, đang dùng, ngừng dùng |
| Nhân sự | 8 vai trò, 9 tài khoản/nhân viên; một tài khoản ngừng hoạt động |
| Bán hàng | `service`: 60 đơn / 56 thanh toán; `sold-out`: 61 đơn / 59 thanh toán |
| Thời gian | 6 ngày bán lịch sử gần nhất, bỏ thứ Hai, cộng ngày mô phỏng được chọn |

Mốc `2026-11-10` có lịch sử 03–08/11/2026; ngày 09/11 thứ Hai không có đơn bán. Ngày mô phỏng được chọn luôn được tạo để có thể test ngay, kể cả khi người chạy chọn thứ Hai.

Thực đơn gồm brisket, sườn heo, heo xé, gà tây bán theo kg; xúc xích theo cây; đậu hầm, coleslaw, salad khoai tây, bánh bắp theo phần; pudding theo ly; nước theo lon/chai. Dưa chua có giá 0 để thử món kèm. Dữ liệu có lượng lẻ 0,125–0,750 kg và đơn nhóm nhiều món.

Thịt được cấp nguyên liệu từ tối hôm trước, ghi sản lượng buổi sáng, nghiệm thu rồi chuyển quầy trước giờ bán. Hao hụt nấu/thu hồi nằm trong định mức nguyên liệu → thành phẩm. Phần thành phẩm không được nghiệm thu không nhập kho và không bị trừ kho lần hai. Một mẻ có muối dư hoàn và muối rơi hủy riêng, đủ đối chiếu nguyên liệu đã cấp. Lệnh đang mở là kế hoạch độc lập: chuẩn bị ngày mai hoặc mẻ hôm nay chờ nghiệm thu.

Đồ uống đi qua BOM soạn hàng 1:1 vì schema hiện tại không có luồng nhập thành phẩm trực tiếp; không mô phỏng việc nấu nước đóng chai.

## `service`: tồn dự kiến lúc 12:40

Tồn sổ cửa hàng gồm cả phần giữ cho đơn chưa thanh toán. **Còn nhận mới = tồn sổ − giữ cho đơn xác nhận − hoàn/hao hụt chờ duyệt**. Nháp chưa giữ hàng.

| Món | Kho TP | Cửa hàng | Giữ đơn | Giữ hoàn/hủy | Còn nhận mới |
| --- | ---: | ---: | ---: | ---: | ---: |
| Brisket (kg) | 2,500 | 0 | 0 | 0 | 0 |
| Sườn heo (kg) | 0 | 0,750 | 0,500 | 0 | 0,250 |
| Heo xé (kg) | 0 | 3,000 | 0,500 | 0 | 2,500 |
| Gà tây (kg) | 1,000 | 1,000 | 0,500 | 0 | 0,500 |
| Xúc xích (cây) | 0 | 6 | 2 | 0 | 4 |
| Đậu hầm (phần) | 0 | 5 | 2 | 1 | 2 |
| Coleslaw (phần) | 0 | 4 | 1 | 1 | 2 |
| Salad khoai tây (phần) | 0 | 3 | 1 | 0 | 2 |
| Dưa chua (phần) | 0 | 10 | 2 | 0 | 8 |
| Coca-Cola (lon) | 18 | 10 | 2 | 2 | 6 |
| Nước suối (chai) | 12 | 15 | 3 | 0 | 12 |
| Bánh bắp (phần) | 0 | 0 | 0 | 0 | 0 |
| Pudding (ly) | 0 | 0 | 0 | 0 | 0 |

Brisket hết **tại quầy**, kho còn 2,5 kg đã nấu sẵn và có phiếu chuyển 1 kg chờ duyệt. Đây là tình huống thiếu hàng tại quầy, khác với hết toàn bộ mẻ. Sau khi duyệt phiếu có thể bán lượng được bàn giao; không sinh lệnh nấu.

Hai món bánh bắp/pudding hết cả kho lẫn quầy nhưng vẫn `ACTIVE`: hết hôm nay khác với ngừng bán thực đơn. Các số trên là phần đóng góp của bộ mẫu; nếu dùng chung DB với dữ liệu nghiệp vụ khác, tồn và báo cáo toàn hệ thống có thể cao hơn.

## Các ca kiểm thử có sẵn

| Ca | Dữ liệu cần mở | Kết quả mong đợi |
| --- | --- | --- |
| Hết món | Bánh bắp / pudding | Không xác nhận thêm; không tạo yêu cầu nấu chờ |
| Không đủ số lượng | Đơn đuôi `THIEU-HANG`, bàn A03 | Nháp 1 kg sườn không giữ hàng; xác nhận bị chặn vì chỉ còn nhận 0,25 kg |
| Chỉ bán phần còn lại | Sườn heo | Sửa nháp còn 0,25 kg rồi xác nhận được; sau đó còn nhận mới = 0 |
| Thu tiền | Đơn đuôi `CHO-THU`, bàn A01 | Đã phục vụ đủ, thu tiền làm giảm cửa hàng; không giảm kho TP lần nữa |
| Chống thu trùng | Chính đơn vừa thanh toán | Thu lại bị chặn, không tạo thêm biến động hoặc payment |
| Phục vụ từng phần | Đơn đuôi `DANG-PHUC-VU`, bàn A02 | Heo xé 0,5 kg đã ra 0,25 kg; nước 3 chai đã ra 1; còn món đợt 2 |
| Giới hạn đổi/hủy | Chính đơn A02 | Không giảm dưới lượng đã phục vụ; phần chưa ra có thể giảm/hủy |
| Lịch sử đổi món | Đơn `CHO-THU` | Có dòng brisket 0 kg, đổi 0,25 kg chưa ra sang 0,5 kg sườn; audit giữ lý do và người sửa |
| Khách rời hàng chờ | Đơn đuôi `HUY-KHACH-ROI` | `CANCELLED`, dòng về 0, có audit; không có thanh toán/xuất bán |
| Giữ hàng khi chờ hủy | Đậu hầm / coleslaw | Mỗi món có 1 phần chờ WASTE; chưa giảm tồn sổ nhưng giảm lượng còn nhận mới |
| Hoàn đồ uống | Coca-Cola | 2 lon chờ hoàn; duyệt giảm cửa hàng 2, tăng kho 2, không có doanh thu |
| Phiếu từ chối | Hoàn sườn / chuyển gà tây | Không có biến động kho cho các phiếu bị từ chối |
| Chuyển hàng sẵn | Phiếu chuyển brisket 1 kg chờ duyệt | Duyệt giảm kho 1, tăng cửa hàng 1; không có doanh thu và không tạo lệnh nấu |
| Hàng chưa nghiệm thu | Lệnh xúc xích đang làm | Lần ghi 10 cây đang PENDING không cộng vào kho TP; chưa được bán |
| Thiếu nguyên liệu ngày mai | Lệnh gà tây đã nhận / báo thiếu 5 kg | Nguyên liệu gà tây khả dụng chỉ còn 0,2 kg; không tự nhận thêm đơn khách |
| Lô hết hạn | Lô sữa `HET-HAN` | Còn 2 lít để thử cảnh báo; không cấp/tiêu hao lô này |
| Lô sát hạn | Lô bắp cải `CAN-HAN` | HSD đúng ngày mô phỏng; cảnh báo theo ngày Việt Nam |
| Hủy tại kho | Lô chuối `HUY-HET-HAN` | Phiếu hủy đã duyệt, lô về 0, có biến động `TRONG_KHO → DA_HUY` |
| Giá lịch sử | Hóa đơn lịch sử / thực đơn hiện tại | Brisket trên hóa đơn cũ 920.000 đ/kg; giá hiện tại 980.000 đ/kg |
| Món miễn phí | Dưa chua trên hóa đơn | Số lượng vẫn theo dõi, thành tiền 0; hóa đơn còn món tính tiền khác |
| Báo cáo | Tháng 11/2026 với ngày mẫu trên | `service`: 56 đơn đã trả, doanh thu 364.195.500 đ; `sold-out`: 59 đơn, 372.473.000 đ |

Các ca là độc lập tại thời điểm seed. Nếu thực hiện nhiều ca liên tiếp, tồn thay đổi tương ứng; không dùng các số ban đầu để đối chiếu sau khi đã thao tác.

## `sold-out`: bán hết lúc 14:00

Kịch bản xử lý các phiếu hoàn/hủy chờ, hoàn tất hai đơn đã nhận, đóng nháp không đủ hàng, chuyển phần đã nấu còn lại từ kho ra quầy rồi bán cho nhóm khách cuối. Tất cả thành phẩm đang bán đều có **kho = quầy = giữ đơn = còn nhận mới = 0**; không còn đơn khách mở. Nguyên liệu và lệnh kế hoạch tương lai vẫn tồn tại; chúng không phải hàng được phép bán hiện tại.

Các lệnh/đồ đang chờ nghiệm thu vẫn chưa phải thành phẩm được phép bán. Mô hình này cần quản lý quyết định lịch vận hành; tồn bằng 0 không tự đóng lệnh bếp hoặc cam kết rằng bếp không còn hàng đang kiểm tra.

## Tài khoản để test phân quyền

Tất cả dùng mật khẩu `SAMPLE_DATA_PASSWORD` đặt lúc seed. Không in hoặc lưu mật khẩu rõ vào JSON.

| Tên đăng nhập | Vai trò / web |
| --- | --- |
| `bbq_admin` | Admin hệ thống, có hồ sơ nhân viên để thử nghiệp vụ |
| `bbq_kho` | Quản lý kho: duyệt, nghiệm thu, báo cáo kho |
| `bbq_nvkho` | Nhân viên kho: nhập nháp, giao nhận, lập phiếu chuyển |
| `bbq_beptruong` | Trưởng bếp: BOM, kế hoạch, nghiệm thu |
| `bbq_bep` | Nhân viên chế biến: nhận lệnh, cấp/hoàn/hao hụt, ghi tiêu hao |
| `bbq_quanly` | Quản lý nhà hàng: bàn, giá, tồn quầy, báo cáo, thu tiền |
| `bbq_phucvu` | Phục vụ: nhận món, gửi, phục vụ, đổi/hủy phần chưa ra |
| `bbq_thungan` | Thu ngân: xem đơn, thu tiền; thử chặn quyền sửa món/kho |
| `bbq_nghiviec` | Tài khoản và nhân viên INACTIVE: đăng nhập bị từ chối |

Quyền lấy trực tiếp từ `src/admin/role-presets.ts` và `permissions.ts`, không tự cấp toàn quyền cho nhân viên thường. Vai trò mẫu có tiền tố `[BBQ mẫu]`; mã nghiệp vụ có tiền tố `BBQ-`. Không thay đổi tài khoản admin được tạo từ `admin:init`.

## Giới hạn schema cần nhớ khi test

- Chưa có bảng ngày/ca bán, chỉ tiêu sản lượng theo ngày, giờ mở cửa, `soldOutAt` hay trạng thái đóng cửa. Ngày bán được thể hiện qua thời điểm chứng từ; seed không thêm cột giả và không làm tính năng tự đóng cửa.
- Chưa có lô thành phẩm/HSD/giữ nóng: không thể truy nguyên chính xác từng kg bán thuộc mẻ nào qua biến động hiện tại. Việc hoàn/hủy thành phẩm cần kiểm tra thực tế, không mặc định giữ món chín qua ngày.
- Một cửa hàng và một kho chung; khu vực/bàn không phải chi nhánh. Quầy nhận hàng không phải chức năng đặt trước có lịch hẹn.
- Không có khách hàng, số thứ tự xếp hàng, đơn đặt trước có lịch nhận hoặc cọc. Các ghi chú “mang về” chỉ mô tả đơn tại quầy; không gán trạng thái đặt trước không có trong schema.
- `Payment` là một-một với đơn và phương thức hiện hỗ trợ `CASH`/`TRANSFER`; không tạo thanh toán tách tiền, hoàn tiền hoặc thẻ giả.

## Kiểm chứng

```powershell
npm run seed:sample:test
npx prisma validate --config prisma7.config.ts

# Tùy chọn: cần PostgreSQL và quyền CREATE SCHEMA.
# Tạo schema QA tách biệt, nhập từng bộ rồi ROLLBACK toàn bộ.
npm run seed:sample:verify-db
```

16 kiểm thử bao phủ trường/khóa ngoại theo schema hiện tại, thứ tự nhập, chứng từ nguồn của biến động, cân đối tồn theo thời gian, HSD nguyên liệu, thanh toán, nguyên liệu dư của lệnh đã đóng, giữ hàng, giá lịch sử và kiểm tra chạy lại. Kiểm chứng PostgreSQL dùng DDL sinh từ schema hiện tại, kiểm tra FK/unique/NOT NULL, decimal/date, dùng lại đơn vị/quyền có sẵn và tồn thực tế. Không cần sửa schema ứng dụng để chạy bộ mẫu.

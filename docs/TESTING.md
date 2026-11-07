# Kiểm thử hệ thống từ đầu

Hướng dẫn này kiểm tra những chức năng thực sự có trong checkout hiện tại. Một trang mở được hoặc một test API đạt không có nghĩa là toàn bộ phân hệ đã hoàn chỉnh.

## 1. Phạm vi và điều kiện nghiệm thu

| Phân hệ | Có thể kiểm tra hiện tại | Chưa thể kết luận hoàn tất |
| --- | --- | --- |
| Admin hệ thống | Đăng nhập, tài khoản/hồ sơ Staff, vai trò/quyền, thương hiệu, nhật ký, báo cáo, backup quản trị | Giới hạn chi nhánh cho từng tài khoản quản lý; phục hồi toàn DB không phải chức năng của backup JSON |
| Admin kho | Tồn NVL, nhập kho, duyệt xuất, lịch sử; API nhà cung cấp/vật tư/điều chỉnh | Không phải mọi API đều đã có màn hình tương ứng trong cổng quản trị |
| Admin nhà hàng | Sản phẩm/BOM; màn hình thành phẩm tại `/warehouse/restaurant` | Sản xuất nhiều mẻ, hao hụt và toàn bộ vòng đời thành phẩm cần nghiệm thu riêng |
| Nhân viên | Đăng nhập, ca, kho NVL, đề nghị cấp, tồn bếp, KDS, hóa đơn đọc; API gọi món/thu tiền | `/staff/tables` và `/staff/orders/new` đang ComingSoon. Trang hóa đơn chưa có thao tác thanh toán. Không thể đi toàn luồng bán hàng chỉ bằng UI |
| App khách | Chưa có project native/mobile riêng | Không có kịch bản app khách để chạy |
| Web khách | Khởi động Next.js và kiểm tra bộ thiết kế | Trang gốc vẫn là template Next.js; HTML/ảnh trong stitch-screens là tài liệu thiết kế, chưa phải luồng đặt món |

Gộp bàn/tách hóa đơn và thanh toán QR/thẻ/ví chưa hỗ trợ. Không ghi “PASS toàn hệ thống” khi các mục này còn nằm trong phạm vi yêu cầu sản phẩm.

## 2. Tách môi trường trước khi test

- DB phát triển: project `restaurant-integrated`, API 3000, PostgreSQL 5433, database `restaurant_dev`. Giữ dữ liệu làm việc.
- Demo dùng test thủ công: project `restaurant-demo`, API 3010, PostgreSQL 5434, database `restaurant_demo`. Có thể dựng lại/xóa.
- Unit/E2E chính: DB nhúng PGlite riêng cho test; không dùng DB phát triển hoặc demo.
- Trong cùng một browser profile, Staff chỉ có một cookie đăng nhập trên localhost. Dùng profile/browser riêng hoặc đăng xuất rồi đăng nhập khi đổi vai trò; đừng chỉ mở tab khác và cho rằng đó là phiên khác.

Các lệnh dưới chạy từ root repository trên PowerShell. Cần Node.js 24, npm, Docker Desktop đã bật Linux engine.

### Chuẩn bị một lần

```powershell
npm ci
if (-not (Test-Path backend/.env)) {
  Copy-Item backend/.env.example backend/.env
}
```

Mở `backend/.env`, đặt JWT_SECRET ngẫu nhiên và thông tin chủ hệ thống. Không ghi đè file `.env` đang dùng. Tạo chuỗi ngẫu nhiên bằng:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Demo dùng mật khẩu riêng, không dùng mật khẩu của DB phát triển:

```powershell
$env:DEMO_PASSWORD = 'mat-khau-test-local-it-nhat-8-ky-tu'
npm run demo:rebuild
Invoke-RestMethod http://localhost:3010/
```

Kỳ vọng: API trả `Hello World!`; job migration exit 0, DB và backend healthy. `demo:rebuild` xóa dữ liệu demo trước khi dựng lại; không xóa volume phát triển.

### Mở các frontend

Dừng terminal frontend cũ nếu nó đang chiếm cổng. Dùng terminal riêng:

```powershell
# Terminal Admin: hệ thống + kho + nhà hàng
$env:NEXT_PUBLIC_API_URL = 'http://localhost:3010'
npm run dev:admin
```

```powershell
# Terminal Staff
$env:API_INTERNAL_URL = 'http://127.0.0.1:3010'
npm run dev:staff
```

```powershell
# Terminal Guest: chỉ kiểm tra khởi động, chưa có nghiệp vụ khách
npm run dev:guest
```

Địa chỉ: Admin `http://localhost:3004/login`; Staff `http://localhost:3003/staff/login`; Guest `http://localhost:3005`.

Nếu đã có `.env.local` ở frontend, kiểm tra nó không trỏ sang API khác. Biến môi trường của terminal ở trên có ưu tiên; phải restart frontend sau khi đổi cấu hình.

### Tài khoản demo

Tất cả dùng mật khẩu bạn đặt ở DEMO_PASSWORD:

| Email | Mã Staff | Nơi đăng nhập |
| --- | --- | --- |
| owner@demo.local | — | Admin, toàn quyền |
| warehouse@demo.local | — | Admin, quyền Kho |
| restaurant@demo.local | — | Admin, quyền Nhà hàng |
| service@demo.local | SERVICE | Staff, phục vụ |
| kitchen@demo.local | KITCHEN | Staff, bếp |
| cashier@demo.local | CASHIER | Staff, thu ngân |
| supervisor@demo.local | SUPERVISOR | Staff, quản lý ca |

Demo v1 có gạo 20 kg ở kho chính, tồn bếp 0, một bàn B01, món cơm 15.000đ và BOM 0,1 kg/phần. Chưa có hóa đơn hoặc tiền thu mẫu.

## 3. Chạy kiểm thử tự động trước

### Build, unit, API/E2E và TypeScript

```powershell
npm run check
```

Lệnh dừng ở nhóm kiểm tra đầu tiên bị lỗi. Phải có exit code 0. Mốc trước đợt rà soát này là 52 unit + 48 E2E đạt; migration dọn demo bổ sung 2 E2E, nên mốc mới là 52 unit + 50 E2E. Các số lượng có thể tăng khi bổ sung test.

Có 18 ca integration legacy đang skip vì thiếu DB/fixture riêng. **Skip không phải PASS.** Không bật tùy tiện TEST_KITCHEN_DATABASE, RUN_WAREHOUSE_DB_E2E hoặc RUN_INTEGRATION_SCHEMA_E2E rồi trỏ vào DB phát triển: một số helper còn đòi fixture cũ hoặc migration không chứa tham chiếu public schema. Chúng cần được chuẩn hóa riêng trước khi tính vào nghiệm thu.

Chỉ chạy kịch bản xuyên suốt bằng API:

```powershell
npm run build --workspace backend
npm exec --workspace backend -- vitest run --config vitest.config.e2e.ts test/foundation.e2e-spec.ts
```

Ba ca trong file này kiểm tra bootstrap/demo, luồng nhập kho → cấp bếp → gọi món → BOM → phục vụ → tiền mặt → báo cáo, và tạo/khóa nhân viên bằng tài khoản chung. Đây là kiểm tra HTTP/Nest/Prisma/DB nhúng, không thay cho kiểm tra frontend hay PostgreSQL Docker thực.

### Browser tự động trên demo Docker

Giữ frontend Admin ở cổng 3004, trỏ API 3010. Trong terminal đã đặt DEMO_PASSWORD:

```powershell
$env:E2E_WEB_URL = 'http://localhost:3004'
$env:E2E_API_URL = 'http://localhost:3010'
$env:E2E_ADMIN_EMAIL = 'owner@demo.local'
$env:E2E_ADMIN_PASSWORD = $env:DEMO_PASSWORD
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm exec --workspace web-admin-system -- playwright test tests/portals.spec.ts
```

Kỳ vọng 3 ca đạt: chủ dùng chung phiên Admin/Kho/Nhà hàng; kho bị chặn khỏi quản trị hệ thống; form tài khoản có hồ sơ Staff. Cần Microsoft Edge có sẵn. Nếu dùng Chromium của Playwright, cài browser bằng `npm exec --workspace web-admin-system -- playwright install chromium`, chạy `Remove-Item Env:PLAYWRIGHT_CHANNEL -ErrorAction SilentlyContinue` rồi chạy lại test.

Test thương hiệu riêng có thể chạy bằng cùng bộ env:

```powershell
npm exec --workspace web-admin-system -- playwright test tests/branding.spec.ts
```

Test này tạo dữ liệu tạm và thay thương hiệu trên **demo**, rồi có bước khôi phục. Nếu test bị ngắt giữa chừng, dựng lại demo trước lần nghiệm thu tiếp theo. Ba test portals là bộ đã được xác minh trước đó; test branding riêng không được ngầm tính là đã PASS.

## 4. Checklist nghiệm thu thủ công

Ghi mã ca, tài khoản, dữ liệu đầu vào, kết quả thực tế, PASS/FAIL/BLOCKED và ảnh/log. Mỗi nhóm nên bắt đầu từ demo mới; các thay đổi thương hiệu/tài khoản sẽ ảnh hưởng nhóm sau nếu dùng chung DB.

### A. Admin và phân quyền

| Mã | Thao tác | Kỳ vọng |
| --- | --- | --- |
| A01 | Owner đăng nhập, mở `/`, `/warehouse/inventory`, `/warehouse/restaurant` | Một phiên dùng được cả ba khu vực |
| A02 | Warehouse đăng nhập `/login`; thử mở `/accounts` | Được vào kho; quản trị hệ thống trả 403 |
| A03 | Warehouse thử BOM/sản phẩm chỉ dành Nhà hàng | Không có quyền thì bị chặn; không chỉ ẩn nút trên UI |
| A04 | Owner tạo tài khoản role Nhân viên, mã NEW, vị trí SERVICE, chi nhánh Demo | Đăng nhập Staff bằng email hoặc NEW và cùng mật khẩu |
| A05 | Khóa NEW trong Admin, thử dùng phiên Staff đã mở | Yêu cầu tiếp theo bị từ chối; phải tải lại trang hoặc thao tác để phát sinh request |
| A06 | Đổi mật khẩu/role của tài khoản test | Phiên cũ bị thu hồi, quyền mới do backend xác nhận |
| A07 | Thử email trùng, mật khẩu quá ngắn, hồ sơ Staff thiếu chi nhánh/vị trí | Báo validation, không tạo bản ghi dở dang |
| A08 | Owner đổi tên nhà hàng rồi tải lại login/kho | Tên được đồng bộ; khôi phục tên sau test |
| A09 | Kiểm tra nhật ký sau tạo/khóa/đổi quyền | Có đúng hành động và người thực hiện; không lộ mật khẩu |

### B. Kho và cấp phát cho bếp — có thể thao tác qua UI

1. Warehouse mở `/warehouse/inventory`: kiểm tra gạo DEMO-NVL01, tồn kho 20 kg.
2. Mở `/warehouse/receipts`, tạo phiếu nhập mã TEST-NK01: chi nhánh DEMO-CN01, NCC DEMO-NCC01, gạo DEMO-NVL01, lô TEST-LO01, kho chính, kg, số lượng 5, đơn giá 25.000, hạn dùng 2099-12-31. Nếu form không có trường tạo lô/hạn dùng, dùng lô DEMO-LO01 hiện có và ghi lại đây là giới hạn UI; test tạo lô mới có trong API/E2E.
3. Tồn kho tổng thành 25 kg. Mở lịch sử, đối chiếu phiếu và biến động +5; refresh không tạo nhập lần hai.
4. Staff đăng nhập KITCHEN, mở `/staff/inventory`, chọn một lô đủ tồn, gửi yêu cầu 1 kg. Ghi lại mã phiếu.
5. Trước khi duyệt, kho chính chưa giảm; tồn bếp vẫn 0. Warehouse mở `/warehouse/material-issues`, xem chi tiết và duyệt đúng phiếu đó.
6. Kho chính còn 24 kg; `/staff/kitchen-inventory` thấy 1 kg. Duyệt lại cùng phiếu không được trừ thêm.
7. Tạo một yêu cầu khác rồi từ chối: phải có lý do, không đổi tồn. Chọn lượng 0/âm/quá tồn hoặc lô quá hạn phải bị chặn phù hợp ở UI và/hoặc API.

Số 20 → 25 → 24 chỉ đúng với demo mới và không có người khác thao tác đồng thời. Không cộng tồn kho chính và tồn bếp rồi gọi đó là cùng một sổ tồn.

### C. Bán hàng → bếp → thu tiền

API đã có kịch bản foundation ở mục 3. Qua UI hiện tại:

- `/staff/tables` và `/staff/orders/new`: đánh dấu **BLOCKED — UI chưa triển khai**, không ghi FAIL backend.
- `/staff/kitchen/orders`: kiểm tra danh sách/trạng thái khi đã có đơn tạo qua API.
- `/staff/invoices`: xem hóa đơn; không có nút thu tiền hoàn chỉnh để nghiệm thu UI.
- Không dùng `/preview/*` hoặc HTML thiết kế để chứng minh nghiệp vụ hoạt động.

Để nghiệm thu API bán hàng trên DB nhúng, dùng lệnh foundation ở trên. Để quan sát luồng trên **demo Docker** bằng Postman/REST client, thực hiện theo bảng dưới (base URL `http://localhost:3010`):

| Bước | Method/path | Nội dung chính / kết quả cần giữ |
| --- | --- | --- |
| 1 | POST `/api/auth/login` | Warehouse hoặc Owner: `{email,password}`; giữ accessToken và gửi Authorization: Bearer ở request quản trị |
| 2 | POST `/api/staff-auth/login` | `{code:"SERVICE",password}`; giữ cookie staff_session. Mọi POST/PATCH Staff gửi `X-Staff-Request: 1` |
| 3 | GET `/api/staff/tables` và `/api/staff/menu` | Lấy tableId và menuItemId, không tự đoán UUID |
| 4 | POST `/api/staff/invoices` | `{tableId,guestName:"Khách test"}`; giữ invoiceId |
| 5 | POST `/api/staff/orders` | `{invoiceId,requestKey:"UUID mới",lines:[{menuItemId,quantity:1}]}`; giữ lines[0].id |
| 6 | POST `/api/staff-auth/login` | Đổi sang KITCHEN bằng cookie jar/context riêng; bếp đã được cấp 1 kg như nhóm B |
| 7 | GET `/api/staff/lines/{id}/material-requirements` | Một phần cơm cần 0,1 kg; available phải đủ |
| 8 | PATCH `/api/staff/lines/{id}` | `{status:"COOKING"}` rồi `{status:"READY"}`; tồn bếp 1 → 0,9 kg |
| 9 | PATCH `/api/staff/lines/{id}` | Đăng nhập lại SERVICE hoặc dùng cookie SERVICE đã giữ, gửi `{status:"SERVED"}` |
| 10 | POST `/api/staff-auth/login` | CASHIER, cookie jar/context riêng |
| 11 | POST `/api/staff/invoices/{invoiceId}/pay` | `{method:"CASH",cashReceived:20000}`; tiền thu 15.000, trả lại 5.000 |
| 12 | GET `/api/admin/reports/revenue?year=2026` | Owner: tổng tăng 15.000, số hóa đơn tăng 1. Đổi year theo năm đang test |

Lặp lại cùng requestKey ở bước 5 phải trả lại đơn cũ, không tạo thêm đơn. Thu tiền lần hai phải bị từ chối. Bếp dùng lô hết hạn/không đủ NVL phải bị chặn và không được tạo tiêu hao dở dang. Không đưa token/mật khẩu vào ảnh chụp hoặc báo cáo lỗi.

### D. Nhà hàng, BOM và thành phẩm

- Restaurant mở `/warehouse/products`, `/warehouse/bom`, `/warehouse/restaurant`; kiểm tra đọc dữ liệu và thao tác đúng quyền.
- Sửa một BOM thử, kiểm tra đơn vị, sản lượng đầu ra, phiên bản và trạng thái. Không sửa BOM của demo cơm khi đang dùng kết quả số lượng nhóm C để đối chiếu.
- Với luồng sản xuất, kiểm tra từng bước: tạo lệnh → giao nhân viên → cấp NVL → bắt đầu → báo thành phẩm → kiểm tra đạt/loại → tồn thành phẩm và lịch sử → duyệt xuất thành phẩm.
- Phải kiểm tra cả duyệt/từ chối, thao tác hai lần, thiếu tồn, số lượng vượt kế hoạch và hai người cùng duyệt.
- **Chưa có bộ nghiệm thu đầy đủ cho nhiều mẻ, thiếu hụt và hao hụt thành phẩm.** Ghi BLOCKED/FAIL đúng thao tác thực tế; không suy ra PASS từ kịch bản cơm bán theo order.

### E. Ca làm, hoàn trả, hao hụt và sự cố

- `/staff/shifts`: bắt đầu ca, không được mở trùng; kết ca có ghi chú, giờ và người thực hiện đúng.
- `/staff/material-returns`, `/staff/material-waste`, `/staff/processing-defects`: kiểm tra đề nghị, trạng thái, nguồn, giới hạn tồn và nhánh duyệt tương ứng.
- Phiếu chờ không được bị tính là đã tác động sổ kho. Duyệt/từ chối phải có dấu vết; retry không ghi biến động hai lần.
- Một số màn duyệt điều chỉnh chưa được nối thành menu đầy đủ; khi cần, đối chiếu API `/warehouse/material-adjustments` với mã phiếu. Không gọi đó là nghiệm thu UI hoàn chỉnh.

### F. Backup, khởi động lại và Guest

- `npm run db:backup`: xuất dump đầy đủ của **DB phát triển**, không phải demo. Chỉ chạy khi đang kiểm tra vận hành DB phát triển; không cần tạo thêm backup cho mỗi lần chạy demo.
- JSON backup trong Admin chỉ gồm dữ liệu quản trị, không thay thế pg_dump. Thử phục hồi JSON chỉ trên demo; phục hồi toàn DB cần DB đích riêng đã xác nhận, không ghi đè môi trường đang dùng.
- `npm run demo:stop` dừng demo, giữ dữ liệu. `demo:rebuild` tạo lại dữ liệu từ đầu; đây không phải phép thử giữ dữ liệu sau restart.
- Guest: xác nhận cổng 3005 mở được; đối chiếu thiết kế tại `frontend/guest-web/stitch-screens` và DESIGN.md. QR/xác nhận bàn/giỏ hàng/trạng thái/hoá đơn khách vẫn BLOCKED về nghiệp vụ chạy thật.

## 5. Kết thúc một vòng test

```powershell
# Dừng các frontend bằng Ctrl+C trong terminal tương ứng.
# Xóa môi trường demo có thể dựng lại:
npm run demo:clean
```

Muốn dùng dữ liệu phát triển trở lại: bỏ các biến API demo trong terminal frontend hoặc mở terminal mới, kiểm tra `.env.local`, rồi chạy frontend trỏ cổng 3000. DB phát triển vẫn ở nguyên volume cũ.

Mẫu kết quả:

| Ca | Commit | Tài khoản | Đầu vào | Kỳ vọng | Thực tế | Trạng thái | Log/ảnh |
| --- | --- | --- | --- | --- | --- | --- | --- |
| B05 | … | warehouse | phiếu …, 1 kg | kho -1, bếp +1 | … | PASS/FAIL/BLOCKED | … |

Một vòng đạt tối thiểu: build/typecheck sạch, test tự động không fail, 3 browser test đạt, nhóm A/B kiểm tra được và API nhóm C đúng số liệu. Các phần chưa triển khai hoặc chưa có test phải giữ nguyên trạng thái BLOCKED; chưa thể nghiệm thu toàn bộ sản phẩm chỉ với các điều kiện tối thiểu này.

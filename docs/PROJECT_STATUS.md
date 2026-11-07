# Đánh giá dự án sau tích hợp — 07/11/2026

Đây là đánh giá trên mã nguồn và các kiểm tra được chạy trong checkout `develop`, không phải chứng nhận hoàn tất nghiệp vụ hay production. Phạm vi dừng ở gom code, thống nhất cách chạy và đánh giá sáu phân hệ.

## 1. Nguồn code và kết quả gom nhánh

- Nền ban đầu: `develop` tại `ea96a11`, cây tracked sạch trước thao tác.
- Incoming System Admin: `origin/feat/system-admin` tại `bdb5c8e`, merge commit `d4e1a53`.
- Incoming Warehouse v2: `origin/feat/warehouse_ver2` tại `c91ed95`, merge commit `f855efa`.
- Quy tắc: merge bằng `-X theirs`; conflict lấy incoming. Những thay đổi không conflict vẫn được Git giữ từ cả hai phía. System Admin có lịch sử không chung gốc nên cần `--allow-unrelated-histories`.
- Đã fetch origin trước merge. Không merge `feat/warehouse_v3`, `feat/staff-app` hay các nhánh ngoài hai nhánh được yêu cầu. Không push lên origin.
- Gộp được Git không có nghĩa là tương thích nghiệp vụ: schema, auth, migration và module từ hai nhánh lệch nhau đáng kể.

## 2. Đánh giá sáu định hướng

| Phân hệ | Đã có trong code | Khoảng trống / vấn đề chính | Nhận định hiện tại |
| --- | --- | --- | --- |
| Admin hệ thống | Dashboard, tài khoản, vai trò/quyền, danh mục quản trị, thiết lập thương hiệu, nhật ký, báo cáo, backup/restore; JWT có kiểm tra trạng thái phiên và khóa tài khoản | Báo cáo cần view dữ liệu thực; tài khoản nhân viên đang là hệ riêng. Quyền system admin chủ động không cho vào portal kho | Là nền quản trị tập trung rõ nhất; có E2E về phân quyền và phiên. Chưa đồng nghĩa có quyền thao tác mọi nghiệp vụ của mọi app |
| Admin kho | Có frontend riêng `warehouse-web` và bản sao tích hợp trong `web-admin-system/warehouse`; backend có nhập/xuất NVL, tồn, BOM, sản xuất, thành phẩm, hao hụt | Frontend riêng chưa gửi JWT. Sau merge mất kết nối một số controller/service cũ: nhà cung cấp, danh mục, vật tư, cảnh báo tồn và điều chỉnh Staff. Nhiều route dùng `integration:pending`. Test tồn/hạn dùng/lọc phiếu không còn khớp | Có nhiều nghiệp vụ nhưng chưa thể coi luồng Kho–Staff hoàn chỉnh. Portal JWT `/warehouse` là điểm vào có auth; hai bản UI dễ lệch tính năng |
| Admin nhà hàng | Frontend riêng có kiểm tra/duyệt phiếu thành phẩm, tồn và lịch sử thành phẩm, phiếu xuất, lỗi/hao hụt; phần được cấp quyền cũng có trong portal tích hợp | Proxy riêng không truyền JWT nên nhận 401. Quyền duyệt nhập sau sản xuất, xử lý lỗi/hao hụt còn khóa; chưa thấy bộ quản trị nhà hàng đầy đủ về bàn/menu/nhân sự tập trung | Hiện tập trung quản lý thành phẩm hơn là toàn bộ vận hành nhà hàng. Cần chốt phạm vi trước khi phát triển thêm |
| App nhân viên | Web Next.js cho phục vụ, bếp, pha chế, thu ngân, quản lý ca; bàn, gọi món, hóa đơn, thanh toán, ca, yêu cầu NVL, sản xuất, hoàn trả/hao hụt/lỗi. Có cookie session, kiểm tra chi nhánh và vai trò | Root đang mở preview thiết kế; nghiệp vụ thật ở `/staff`. DB mới chưa seed nhân viên/menu. Định mức gọi món còn dùng `staff_demo_order_recipes`, chưa thống nhất BOM. Kho chưa đăng ký lại luồng duyệt điều chỉnh Staff. Gộp bàn/tách hóa đơn trả 501 | Code nghiệp vụ đáng kể, không chỉ mock UI; chưa liên thông end-to-end với kho và tài khoản quản trị. Đây là web app, chưa thấy app native riêng |
| App khách | Chưa tìm thấy project mobile/native độc lập trong checkout (Flutter/React Native/Android/iOS) | Chưa có module, auth khách, giỏ hàng/đặt món/thanh toán/trạng thái đơn nối backend phục vụ khách | Chưa có cơ sở đánh giá là đã triển khai. Nếu “app khách” nghĩa là PWA/web theo QR thì cần xác nhận đó có phải cùng sản phẩm với web khách |
| Web khách | `frontend/guest-web` chạy Next.js; có tài nguyên thiết kế màn hình QR/bàn/giỏ hàng/hóa đơn | `app/page.tsx` vẫn là trang khởi tạo Next.js; chưa có route/luồng khách thực hay API nối đơn hàng. Tài nguyên `stitch-screens` là thiết kế, không tính là tính năng chạy | Đang ở mức khung dự án và thiết kế, chưa có nghiệp vụ khách hoạt động |

Bằng chứng chính: `backend/src/app.module.ts`, `backend/src/auth/auth.guard.ts`, `backend/src/warehouse/warehouse.module.ts`, `backend/src/warehouse/warehouse.controller.ts`, `backend/src/staff/staff.controller.ts`, `backend/src/staff/staff.service.ts`, `frontend/restaurant-web/src/app/api/warehouse/[...path]/route.ts`, `frontend/guest-web/app/page.tsx`.

## 3. Những điểm leader cần kiểm soát

### P1 — cần chốt trước khi tuyên bố tích hợp nghiệp vụ

1. **Một API, hai hệ tài khoản**: admin/kho/nhà hàng dùng `accounts` + `roles` + JWT; nhân viên dùng `staff_users` + `staff_sessions` + cookie. Tạo tài khoản nhân viên trong admin chưa tạo được tài khoản đăng nhập Staff. Cần quyết định mapping/migration, không tự gộp mật khẩu hoặc suy diễn vai trò.
2. **Hai bộ giao diện kho/nhà hàng**: `web-admin-system/warehouse` là bản copy, không import UI từ `warehouse-web`; frontend nhà hàng còn độc lập. Cần chọn điểm vào chính và người sở hữu từng màn hình/API, tránh sửa một bản rồi bỏ sót bản kia.
3. **Contract kho bị lùi sau incoming**: `SupplierApi`, `CategoryApi`, `MaterialApi`, `WarehouseReferenceApi`, `SharedMaterialAdjustmentApi` còn file nhưng không được đăng ký/đi dây trong WarehouseModule hiện tại. Test đang phát hiện khác biệt thực tế. Không nên chỉ sửa test để tất cả xanh.
4. **Quyền chưa chốt**: nhiều endpoint sản xuất, nhập thành phẩm, lỗi và hao hụt dùng `integration:pending`; vai trò mặc định không được cấp quyền đó, còn System Admin bị chặn khỏi warehouse. Cần ma trận vai trò × thao tác có người duyệt; chưa tự mở quyền để demo.
5. **Định mức và thành phẩm chưa cùng một contract**: BOM/Product của kho khác MenuItem/công thức demo của gọi món. Staff hỗ trợ nhiều lần báo thành phẩm trên một lệnh, code incoming vẫn thiên về một phiếu cuối. Đã nối kiểu quan hệ để build nhưng chưa sửa thuật toán duyệt/hao hụt/phân bổ cho nhiều mẻ. Không coi luồng này đã được xác nhận.
6. **Migration hai lịch sử**: bản local mới đã chạy được. DB cũ System Admin và DB cũ develop có lịch sử khác nhau; không áp dụng bộ hợp nhất vào DB dùng chung trước khi đối chiếu lịch sử, backup và diễn tập nâng cấp.

### P2 — cần trước khi nghiệm thu

- Báo cáo tổng hợp đọc `v_report_revenue` và `v_report_stock`; script `scripts/report-views-contract.sql` là template với tên bảng giả định, chưa được migration tạo từ hóa đơn/kho thật. Dữ liệu demo không chứng minh báo cáo liên thông.
- Bộ seed mặc định chỉ dựng vai trò và System Admin; thiếu bộ dữ liệu nghiệm thu thống nhất gồm chi nhánh, kho, vật tư, sản phẩm, BOM, menu và nhân viên.
- Phục vụ/thu ngân có thao tác gộp bàn/tách hóa đơn trả `NotImplementedException`. Cần ghi rõ trong phạm vi bàn giao.
- Chưa có chuỗi nghiệm thu khách gọi món → bếp thực hiện → xuất/tiêu hao kho → thu ngân thanh toán → doanh thu tổng hợp.
- Các README cũ có mô tả trước merge; README gốc hiện là nguồn chính cho cách chạy.

## 4. Những sửa chữa giới hạn đã làm để khởi động

- Root lockfile đồng bộ đủ năm frontend workspace và backend; Dockerfile copy đủ manifest workspace để `npm ci` chạy được.
- Backend Docker ở cổng 3000, DB host 5433; frontend local 3001–3005. Frontend Docker cũ chuyển sang profile tùy chọn. CORS gồm các frontend local.
- Dùng Compose project/volume riêng `restaurant-integrated`, không xóa volume cũ.
- Giữ nguyên các migration tạo bảng trùng trong thư mục archive; bộ active dùng lịch sử develop, thêm bảng danh mục System Admin riêng và portal. Không còn tạo trùng bảng khi khởi tạo DB mới.
- Bổ sung lại các model/quan hệ Staff và trường chỉ có trên develop mà merge incoming đã thay thế. Giữ model quản trị mới. Quan hệ lệnh–phiếu thành phẩm dùng dạng danh sách theo migration nhiều mẻ sẵn có.
- Khôi phục auth cookie Staff trong các file `staff-auth.*`, đường dẫn backend `/api/staff-auth`, đăng ký StaffModule và proxy frontend. Route Staff dùng guard cookie riêng; JWT admin vẫn giữ cơ chế cũ. Header chống yêu cầu giả cho mutation Staff được giữ lại.
- Sửa lỗi nullable trong finished-goods/waste để build qua; API mặc định của web-admin-system đổi sang 3000.
- Thêm ca E2E xác nhận login/me/API Staff/logout và cách ly cookie Staff với API quản trị; chỉnh test migration theo hai danh mục tách biệt.

Không sửa rộng các contract kho hoặc tự mở `integration:pending`. Chưa triển khai thêm chức năng của sáu phân hệ.

## 5. Kết quả xác minh

- Backend build: đạt (`npm run build --workspace backend`).
- Compose: image build đạt, migration/seed đạt, `db` và `backend` healthy, `backend-init` exit 0. HTTP API `/` trả 200.
- Đăng nhập System Admin trên container thực: login 200, lấy phiên `/api/auth/me` 200, đã logout phiên kiểm tra. Frontend local đã dừng sau smoke test; backend/DB Docker vẫn đang chạy để tiếp tục kiểm tra.
- TypeScript: cả `warehouse-web`, `restaurant-web`, `staff-app`, `web-admin-system` đạt.
- HTTP frontend local: trang kho 3001, nhà hàng 3002, Staff `/staff/login` 3003, System Admin `/login` 3004 và guest 3005 đều trả 200; proxy Staff `/api/auth/me` trả 401 khi chưa đăng nhập như mong đợi. Đây là kiểm tra khởi động, chưa phải kiểm thử toàn bộ UI. System Admin còn cảnh báo CSS `Unknown at rule: @theme`; guest có cảnh báo module type của Tailwind config.
- E2E hiện có: 43 ca đạt, 9 ca skip do chưa cấu hình DB integration riêng. Kiểm tra migration dùng PostgreSQL nhúng PGlite, không chạm DB dùng chung.
- Ca hồi quy auth Staff mới: 1 ca đạt; xác nhận 401 khi chưa đăng nhập, mutation thiếu header bị 403, cookie dùng được ở API Staff, không dùng được ở API admin, logout thu hồi phiên.
- Unit backend: 38 đạt, 14 lỗi, 9 skip. 14 lỗi gồm PrismaService thiếu DATABASE_URL trong test đơn lẻ (1); supplier/controller/service mất phương thức (2); tồn/cảnh báo/lọc chi nhánh (3); duyệt xuất kiểm tra hạn và processedAt (5); nhập kho/lọc phiếu/ngày (3). Đây là danh sách tồn đọng sau merge, chưa được xử lý ngoài phạm vi startup.

Kết quả trên chưa chứng minh toàn bộ nghiệp vụ thông suốt, giao diện responsive hay tính đúng số liệu kế toán/kho. Đề xuất vòng tiếp theo để leader duyệt: chốt app khách/web khách, điểm vào admin chính, ma trận quyền và hợp đồng dữ liệu trước; rồi chọn một luồng nghiệm thu xuyên suốt để sửa tích hợp.

# Nền tảng dự án

## Ranh giới module

| Nguồn dữ liệu | Chủ sở hữu |
| --- | --- |
| Accounts, roles, login_logs | Auth/Admin: mật khẩu, trạng thái, quyền và thu hồi phiên |
| StaffUser | Hồ sơ làm việc: liên kết 1–1 Account, mã, vị trí và chi nhánh |
| Branch, RestaurantTable | Nhà hàng |
| Material, lot, balance, inventory_movements | Kho |
| Product, Bom, BomDetail | Danh mục sản phẩm và định mức sản xuất |
| MenuItem | Món được bán tại chi nhánh, liên kết BOM; tên/giá bán theo chi nhánh |
| Invoice, StaffOrder, Payment | Bán hàng và thanh toán |
| Reports | Chỉ đọc view từ payment và inventory_movements |

Một role là một nhóm quyền có thể kết hợp quyền nhiều nghiệp vụ. StaffRole là vị trí làm việc để giới hạn thao tác bếp/phục vụ/thu ngân, không phải hệ tài khoản riêng. Hiện mỗi tài khoản có một role hiệu lực; chưa có bảng gán nhiều role. Nhân viên có phạm vi chi nhánh theo hồ sơ. Giới hạn phạm vi chi nhánh cho từng tài khoản quản lý kho/nhà hàng vẫn cần vòng phát triển riêng; hiện các quyền quản trị nghiệp vụ đó có phạm vi toàn hệ thống.

## Ba loại dữ liệu

1. Bootstrap: vai trò mặc định, đơn vị cơ sở, thiết lập tối thiểu, chủ hệ thống đầu tiên. Chạy lại không ghi đè quyền/mật khẩu.
2. Demo v1: một bộ kịch bản duy nhất, chỉ nạp vào DB restaurant_demo trống. Không ngẫu nhiên sinh thêm bản ghi; không tạo hóa đơn/doanh thu giả để làm đẹp dashboard.
3. Test: fixture của từng test, chạy ở DB nhúng hoặc DB test riêng. Không gọi script demo để sửa dữ liệu phát triển.

Khởi động API chỉ áp dụng migration, không seed. Cổng quản trị dùng một phiên JWT cho hệ thống/kho/nhà hàng. Staff dùng JWT trong cookie HttpOnly, cùng Account và login_logs; không còn kho mật khẩu hoặc bảng phiên Staff riêng. Không gộp tài khoản cũ theo tên vì có thể nhầm người.

## Ma trận quyền mặc định mới

| Vai trò | Quyền chính |
| --- | --- |
| Chủ hệ thống | `*`, được kiểm tra vai trò hệ thống ở backend; vào mọi khu quản trị |
| Kho | Nhà cung cấp, vật tư, nhập kho, duyệt xuất NVL, xem tồn, duyệt hao hụt |
| Nhà hàng | Xem/quản lý sản phẩm, BOM, lệnh sản xuất, kiểm tra nhập thành phẩm, duyệt xuất thành phẩm, hao hụt |
| Nhân viên | `staff:access` và nhóm quyền nghiệp vụ nhân viên; thao tác cụ thể còn bị giới hạn bởi vị trí và chi nhánh |
| Khách hàng | Quyền xem menu/đơn của khách; phần ứng dụng khách chưa triển khai hoàn chỉnh |

Không còn endpoint dùng `integration:pending`. Vai trò đã tùy chỉnh không bị bootstrap ghi đè; khi nâng cấp hệ thống cũ, leader cấp bổ sung các quyền mới qua trang Phân quyền nếu cần. Migration thêm `staff:access` cho các role portal employee để chuyển đổi hệ đăng nhập.

## Nâng cấp có dữ liệu

Ba migration mới chạy trong transaction:

- `20261107000000_unified_accounts`: tạo Account cho từng StaffUser cũ, giữ UUID nghiệp vụ, chuyển hash mật khẩu và trạng thái. Email tạm dạng `staff-<uuid>@migration.invalid`; mã Staff cũ vẫn đăng nhập được. Leader cập nhật email thật qua quản trị. Không tự ghép với Account trùng tên. Phiên Staff cũ bị thu hồi một lần; đăng nhập lại.
- `20261107000100_canonical_recipes`: giữ công thức cũ bằng Product/BOM/BomDetail và liên kết MenuItem. Mã chuyển đổi `MENU-<uuid>`, không tự ghép sản phẩm chỉ vì tên giống nhau. Bỏ bảng công thức demo sau khi sao chép.
- `20261107000200_business_reports`: thay view báo cáo bằng payment và ledger kho thật. Các bảng demo báo cáo cũ nếu còn được giữ nguyên trong DB; không còn nguồn runtime nào sử dụng chúng.

Hash scrypt cũ được hỗ trợ để không mất mật khẩu; tài khoản mới/đổi mật khẩu dùng bcrypt. Sao lưu quản trị đọc được cả hai định dạng. `db:backup` dùng pg_dump đầy đủ; phải giữ dump trước khi nâng cấp. Migration cũ đã áp dụng không chỉnh sửa checksum.

## Giới hạn của vòng này

Đã có kiểm thử xuyên suốt nhập NVL → cấp bếp → gọi món → BOM → phục vụ → tiền mặt → báo cáo. Đây chưa phải nghiệm thu toàn bộ sản xuất nhiều mẻ, thành phẩm, hao hụt và mọi trường hợp tính giá. Luồng sản xuất nhiều mẻ vốn có khác biệt giữa Staff và API kiểm tra thành phẩm; cần test và sửa riêng trước khi sử dụng làm quy trình chính thức.

Báo cáo doanh thu dùng Payment thật. Giá trị kho tham chiếu giá nhập gần nhất đã có tại thời điểm biến động; chưa phải phương pháp tính giá vốn kế toán. Dữ liệu kho cũ thiếu giá nhập sẽ có giá trị tham chiếu 0; số lượng vẫn từ ledger. Chưa tự hợp nhất các ledger tồn bếp và kho chính vì sẽ dễ đếm trùng.

Các test integration cũ phụ thuộc fixture DB riêng vẫn được giữ và có điều kiện skip, không tính là đã nghiệm thu. Test nền tảng mới tự dựng DB nhúng và dữ liệu riêng. App khách/web khách, gộp bàn/tách hóa đơn và thanh toán ngoài tiền mặt chưa được bổ sung trong vòng dọn nền tảng.

## Quy trình nhóm

- Một người sở hữu schema/migration và review thay đổi dữ liệu chung.
- Người làm tính năng cập nhật API, nơi gọi, fixture và test cùng một thay đổi.
- Không tạo script seed riêng cho từng frontend hoặc từng người.
- Thêm script vận hành phải bổ sung vào bảng lệnh README với mục đích và tác động dữ liệu.
- Mọi dữ liệu demo mới phải sửa bộ seed-demo và tăng phiên bản kịch bản khi thay đổi ý nghĩa.
- Khi cần phục hồi toàn DB: dừng backend, dùng pg_restore từ dump vào DB đích đã xác nhận, rồi khởi động lại backend. Backup JSON trên giao diện không thay thế dump nghiệp vụ.
## Kết quả kiểm chứng đợt chuẩn hóa

- `npm run check`: build đạt; unit 52 đạt/9 skip; E2E 48 đạt/9 skip; TypeScript của Admin, Staff, Guest đạt. Các ca skip cần DB integration riêng, chưa được tính là hoàn tất.
- E2E mới xác nhận bootstrap không đổi mật khẩu; không seed demo lên DB có dữ liệu; chuyển đổi Staff/công thức cũ; luồng nhập kho → bếp → thanh toán → báo cáo; tạo nhân viên từ quản trị; khóa tài khoản thu hồi cả phiên web và Staff; JWT sai issuer bị từ chối.
- `demo:rebuild` đã chạy hai lần trên project riêng, DB/API healthy. DB phát triển được dump đầy đủ trước khi nâng cấp và đã chạy các migration mới thành công.
- Kiểm tra HTTP thực: chủ cũ login 200, chủ truy cập kho 200, demo login 200, token demo gọi API phát triển trả 401.
- Edge headless: 3 ca đạt cho phiên chung Admin/Kho/Nhà hàng, ranh giới quyền kho và form hồ sơ nhân viên.
- Cấu hình PostCSS của Admin đã dùng cùng plugin với Staff, không còn cảnh báo `Unknown at rule: @theme` trong smoke test. Còn một số cảnh báo deprecated props từ Ant Design và pg; chưa nâng version thư viện trong vòng này.
- Sau khi leader duyệt phạm vi, đã xóa 30 đường dẫn cũ; danh sách chính xác được giữ trong CLEANUP_PENDING.md. DB/volume, backups, `.env`, migration active và tài nguyên Guest được giữ nguyên.

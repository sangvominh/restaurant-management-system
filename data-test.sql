-- DATA TEST TOÀN HỆ THỐNG BBQ
-- Chỉ chạy FILE NÀY trong pgAdmin Query Tool, trên DB đã đồng bộ schema Prisma.
-- Gồm 4 nhóm: danh mục/tài khoản -> BOM -> nhập kho -> toàn bộ nghiệp vụ.
-- Một transaction: thành công toàn bộ hoặc không lưu phần nhập dở.
-- Không xóa/reset DB. Không chạy lại nếu đã nhập nhóm DM03/DM04 thành công.
-- Nếu đã nhập các nhóm riêng trước đó, không cần nhập lại file này.
-- Tài khoản mới: demo.bbq.admin/kho/nvkho/beptruong/bep1/bep2/quanly/
-- phucvu1/phucvu2/thungan. Mật khẩu chung: BbqDemo2026!
-- demo.bbq.nghi là tài khoản ngừng hoạt động.
-- Sửa danh mục ở nhóm 1, định mức ở nhóm 2, lượng nhập ở nhóm 3.
-- Sửa lượng chế biến/bán/chuyển quầy ở vùng A/B/C đầu nhóm 4.
-- Ngày mẫu nhóm 3 lấy ngày Việt Nam hiện tại; nhóm 4 dùng ngày nhập để lập lịch.
-- Không cần chạy file SQL nào khác ngoài file này.
-- Nếu lỗi, chạy ROLLBACK; rồi sửa lỗi và chạy lại toàn bộ file.

BEGIN;


-- #####################################################################
-- NHÓM 1 / 4
-- #####################################################################
-- NHÓM 01: DỮ LIỆU NỀN BBQ HUN KHÓI
-- Chạy toàn bộ file trong Query Tool của pgAdmin, đúng database ứng dụng.
-- Không xóa dữ liệu; trùng khóa tự nhiên thì giữ bản hiện có.
-- Không có BOM, lô, phiếu nhập, tồn, lệnh chế biến, đơn bán hoặc thanh toán.
-- Tài khoản mới dùng mật khẩu: BbqDemo2026!
-- Tài khoản trùng username không bị đặt lại mật khẩu.
-- Nhân sự, NCC, địa chỉ và giá là dữ liệu hư cấu để demo.

-- 1. Quyền và 8 vai trò chuyên biệt, tên có tiền tố DEMO BBQ.
INSERT INTO "Permission" (id,code,name)
SELECT (substr(md5('demo-bbq-permission:'||v.code),1,12)||'4'||substr(md5('demo-bbq-permission:'||v.code),14,3)||'a'||substr(md5('demo-bbq-permission:'||v.code),18,15))::uuid,v.code,v.name
FROM (VALUES
  ('*', 'Toàn quyền hệ thống'),
  ('account:manage', 'Quản lý tài khoản và vai trò'),
  ('employee:manage', 'Quản lý thông tin người sử dụng'),
  ('catalog:manage', 'Quản lý danh mục kho và nhà cung cấp'),
  ('inventory:view', 'Xem tồn kho'),
  ('receipt:create', 'Lập phiếu nhập kho'),
  ('receipt:post', 'Xác nhận nhập kho'),
  ('material:view', 'Xem phiếu cấp/hoàn NVL để giao nhận'),
  ('material:request', 'Đề nghị cấp / hoàn NVL'),
  ('material:approve', 'Duyệt cấp / hoàn NVL'),
  ('bom:manage', 'Quản lý công thức chế biến'),
  ('production:manage', 'Giao và quản lý lệnh chế biến theo kế hoạch'),
  ('production:perform', 'Nhận lệnh và ghi nhận chế biến'),
  ('production:inspect', 'Nghiệm thu thành phẩm, gồm sản lượng tự làm'),
  ('waste:request', 'Báo hao hụt'),
  ('waste:approve', 'Duyệt hao hụt'),
  ('product:manage', 'Quản lý danh mục thành phẩm'),
  ('product:price', 'Quản lý giá bán tại Thiết lập bán hàng'),
  ('dining:manage', 'Quản lý khu vực và sơ đồ bàn'),
  ('sale:view', 'Xem đơn bán'),
  ('sale:create', 'Lập đơn bán'),
  ('export:request', 'Lập phiếu đề nghị xuất TP sang cửa hàng'),
  ('export:approve', 'Duyệt chuyển, hoàn và hao hụt thành phẩm'),
  ('store:manage', 'Quản lý tồn cửa hàng, đề nghị hoàn / hao hụt'),
  ('payment:create', 'Ghi nhận thanh toán'),
  ('report:stock', 'Xem báo cáo kho'),
  ('report:sales', 'Xem báo cáo bán hàng')
) AS v(code,name)
ON CONFLICT (code) DO NOTHING;

INSERT INTO "Role" (id,name,description)
SELECT (substr(md5('demo-bbq-role:'||v.key),1,12)||'4'||substr(md5('demo-bbq-role:'||v.key),14,3)||'a'||substr(md5('demo-bbq-role:'||v.key),18,15))::uuid,'DEMO BBQ - '||v.name,v.description
FROM (VALUES
  ('warehouse-manager', 'Quản lý kho', 'Quản lý danh mục, nhập/cấp/hoàn, hao hụt và duyệt xuất. Có thể giao lệnh, nghiệm thu thay trưởng bếp.'),
  ('warehouse-staff', 'Nhân viên kho', 'Lập phiếu nhập và phiếu chuyển thành phẩm sang cửa hàng; không tự duyệt ghi sổ.'),
  ('head-chef', 'Trưởng bếp', 'Quản lý công thức, lập kế hoạch chế biến, giao lệnh và nghiệm thu theo quyền được cấp.'),
  ('cook', 'Nhân viên chế biến', 'Thực hiện lệnh được giao, cấp/hoàn/báo thiếu và ghi tiêu hao tại web Kho & Chế biến.'),
  ('restaurant-manager', 'Quản lý nhà hàng', 'Điều hành bàn/đơn, tồn cửa hàng, hoàn/hao hụt, giá bán, thu tiền và báo cáo.'),
  ('waiter', 'Nhân viên phục vụ', 'Nhận món trong lượng cửa hàng còn sẵn, giảm/bỏ món có lý do và đối chiếu đơn trước thanh toán.'),
  ('cashier', 'Thu ngân', 'Đối chiếu đơn với khách và thu tiền; không tự xuất kho.'),
  ('system-admin', 'Admin hệ thống', 'Quản trị toàn hệ thống; không phải bước duyệt bắt buộc trong luồng phục vụ.')
) AS v(key,name,description)
ON CONFLICT (name) DO NOTHING;

INSERT INTO "RolePermission" ("roleId","permissionId")
SELECT r.id,p.id
FROM (VALUES
  ('DEMO BBQ - Quản lý kho', 'catalog:manage'),
  ('DEMO BBQ - Quản lý kho', 'inventory:view'),
  ('DEMO BBQ - Quản lý kho', 'receipt:create'),
  ('DEMO BBQ - Quản lý kho', 'receipt:post'),
  ('DEMO BBQ - Quản lý kho', 'material:approve'),
  ('DEMO BBQ - Quản lý kho', 'waste:approve'),
  ('DEMO BBQ - Quản lý kho', 'export:approve'),
  ('DEMO BBQ - Quản lý kho', 'production:manage'),
  ('DEMO BBQ - Quản lý kho', 'production:inspect'),
  ('DEMO BBQ - Quản lý kho', 'bom:manage'),
  ('DEMO BBQ - Quản lý kho', 'report:stock'),
  ('DEMO BBQ - Nhân viên kho', 'inventory:view'),
  ('DEMO BBQ - Nhân viên kho', 'receipt:create'),
  ('DEMO BBQ - Nhân viên kho', 'material:view'),
  ('DEMO BBQ - Nhân viên kho', 'export:request'),
  ('DEMO BBQ - Trưởng bếp', 'bom:manage'),
  ('DEMO BBQ - Trưởng bếp', 'production:manage'),
  ('DEMO BBQ - Trưởng bếp', 'production:inspect'),
  ('DEMO BBQ - Trưởng bếp', 'production:perform'),
  ('DEMO BBQ - Trưởng bếp', 'material:request'),
  ('DEMO BBQ - Trưởng bếp', 'waste:request'),
  ('DEMO BBQ - Trưởng bếp', 'inventory:view'),
  ('DEMO BBQ - Trưởng bếp', 'report:stock'),
  ('DEMO BBQ - Nhân viên chế biến', 'production:perform'),
  ('DEMO BBQ - Nhân viên chế biến', 'material:request'),
  ('DEMO BBQ - Nhân viên chế biến', 'waste:request'),
  ('DEMO BBQ - Quản lý nhà hàng', 'sale:view'),
  ('DEMO BBQ - Quản lý nhà hàng', 'sale:create'),
  ('DEMO BBQ - Quản lý nhà hàng', 'dining:manage'),
  ('DEMO BBQ - Quản lý nhà hàng', 'product:price'),
  ('DEMO BBQ - Quản lý nhà hàng', 'payment:create'),
  ('DEMO BBQ - Quản lý nhà hàng', 'store:manage'),
  ('DEMO BBQ - Quản lý nhà hàng', 'report:sales'),
  ('DEMO BBQ - Nhân viên phục vụ', 'sale:view'),
  ('DEMO BBQ - Nhân viên phục vụ', 'sale:create'),
  ('DEMO BBQ - Thu ngân', 'sale:view'),
  ('DEMO BBQ - Thu ngân', 'payment:create'),
  ('DEMO BBQ - Admin hệ thống', '*')
) AS v(role_name,permission_code)
JOIN "Role" r ON r.name=v.role_name
JOIN "Permission" p ON p.code=v.permission_code
ON CONFLICT ("roleId","permissionId") DO NOTHING;

-- 2. Tài khoản và hồ sơ liên kết 1:1.
CREATE TEMP TABLE demo_bbq_people ON COMMIT DROP AS
SELECT * FROM (VALUES
  ('demo.bbq.admin', 'DEMO BBQ - Admin hệ thống', 'Nguyễn Minh An', 'ACTIVE', 'DM-NV-001', '0908000001', 'admin@bbq.example.invalid'),
  ('demo.bbq.kho', 'DEMO BBQ - Quản lý kho', 'Trần Quốc Huy', 'ACTIVE', 'DM-NV-002', '0908000002', 'kho@bbq.example.invalid'),
  ('demo.bbq.nvkho', 'DEMO BBQ - Nhân viên kho', 'Lê Hoàng Nam', 'ACTIVE', 'DM-NV-003', '0908000003', 'nvkho@bbq.example.invalid'),
  ('demo.bbq.beptruong', 'DEMO BBQ - Trưởng bếp', 'Phạm Minh Quân', 'ACTIVE', 'DM-NV-004', '0908000004', 'beptruong@bbq.example.invalid'),
  ('demo.bbq.bep1', 'DEMO BBQ - Nhân viên chế biến', 'Võ Thành Đạt', 'ACTIVE', 'DM-NV-005', '0908000005', 'bep1@bbq.example.invalid'),
  ('demo.bbq.bep2', 'DEMO BBQ - Nhân viên chế biến', 'Nguyễn Gia Bảo', 'ACTIVE', 'DM-NV-006', '0908000006', 'bep2@bbq.example.invalid'),
  ('demo.bbq.quanly', 'DEMO BBQ - Quản lý nhà hàng', 'Trần Ngọc Mai', 'ACTIVE', 'DM-NV-007', '0908000007', 'quanly@bbq.example.invalid'),
  ('demo.bbq.phucvu1', 'DEMO BBQ - Nhân viên phục vụ', 'Lê Thảo Vy', 'ACTIVE', 'DM-NV-008', '0908000008', 'phucvu1@bbq.example.invalid'),
  ('demo.bbq.phucvu2', 'DEMO BBQ - Nhân viên phục vụ', 'Phạm Tuấn Kiệt', 'ACTIVE', 'DM-NV-009', '0908000009', 'phucvu2@bbq.example.invalid'),
  ('demo.bbq.thungan', 'DEMO BBQ - Thu ngân', 'Đặng Thu Hà', 'ACTIVE', 'DM-NV-010', '0908000010', 'thungan@bbq.example.invalid'),
  ('demo.bbq.nghi', 'DEMO BBQ - Nhân viên phục vụ', 'Bùi Thanh Tâm', 'INACTIVE', 'DM-NV-011', '0908000011', 'nghi@bbq.example.invalid')
) AS v(username,role_name,name,status,code,phone,email);

INSERT INTO "Account" (id,username,"passwordHash",status,"roleId","createdAt")
SELECT (substr(md5('demo-bbq-account:'||v.username),1,12)||'4'||substr(md5('demo-bbq-account:'||v.username),14,3)||'a'||substr(md5('demo-bbq-account:'||v.username),18,15))::uuid,v.username,'scrypt$a59c663119b3a51c28a1bd3a9daec114$04bd9f603c66645815e49d85b6182ddb7fee8b9fa61c49e59291aad95ee807c915a7e530a5bc45a834a8ed0a8332e5687ee85981ec109cc1f181084387760360',v.status,r.id,CURRENT_TIMESTAMP
FROM demo_bbq_people v JOIN "Role" r ON r.name=v.role_name
ON CONFLICT (username) DO NOTHING;

INSERT INTO "Employee" (id,code,name,phone,email,status,"accountId")
SELECT (substr(md5('demo-bbq-employee:'||v.code),1,12)||'4'||substr(md5('demo-bbq-employee:'||v.code),14,3)||'a'||substr(md5('demo-bbq-employee:'||v.code),18,15))::uuid,v.code,v.name,v.phone,v.email,v.status,a.id
FROM demo_bbq_people v JOIN "Account" a ON a.username=v.username
WHERE NOT EXISTS (SELECT 1 FROM "Employee" e WHERE e."accountId"=a.id)
ON CONFLICT DO NOTHING;

-- 3. Đơn vị và nhóm danh mục.
INSERT INTO "Unit" (id,symbol,name)
SELECT (substr(md5('demo-bbq-unit:'||v.symbol),1,12)||'4'||substr(md5('demo-bbq-unit:'||v.symbol),14,3)||'a'||substr(md5('demo-bbq-unit:'||v.symbol),18,15))::uuid,v.symbol,v.name FROM (VALUES
  ('kg', 'Kilôgam'),
  ('l', 'Lít'),
  ('phần', 'Phần'),
  ('cây', 'Cây'),
  ('lon', 'Lon'),
  ('chai', 'Chai'),
  ('quả', 'Quả'),
  ('ly', 'Ly')
) AS v(symbol,name)
ON CONFLICT (symbol) DO NOTHING;

INSERT INTO "Category" (id,"objectType",name)
SELECT (substr(md5('demo-bbq-category:'||v.object_type||':'||v.name),1,12)||'4'||substr(md5('demo-bbq-category:'||v.object_type||':'||v.name),14,3)||'a'||substr(md5('demo-bbq-category:'||v.object_type||':'||v.name),18,15))::uuid,v.object_type,v.name FROM (VALUES
  ('MATERIAL', 'Thịt và đạm tươi'),
  ('MATERIAL', 'Rau củ và trái cây'),
  ('MATERIAL', 'Gia vị và sốt'),
  ('MATERIAL', 'Hàng khô, sữa và nguyên liệu bánh'),
  ('PRODUCT', 'Thịt hun khói'),
  ('PRODUCT', 'Món ăn kèm'),
  ('PRODUCT', 'Tráng miệng'),
  ('PRODUCT', 'Đồ uống')
) AS v(object_type,name)
ON CONFLICT (name,"objectType") DO NOTHING;

-- 4. Nguyên liệu; minStock chỉ là ngưỡng cảnh báo, không phải tồn.
INSERT INTO "Material" (id,code,name,"unitId","categoryId","minStock",status)
SELECT (substr(md5('demo-bbq-material:'||v.code),1,12)||'4'||substr(md5('demo-bbq-material:'||v.code),14,3)||'a'||substr(md5('demo-bbq-material:'||v.code),18,15))::uuid,'DM-NVL-'||v.code,v.name,u.id,c.id,v.minimum,'ACTIVE'
FROM (VALUES
  ('UC-BO', 'Ức bò nguyên tảng', 'kg', 'Thịt và đạm tươi', 15),
  ('SUON-HEO', 'Sườn heo nguyên tấm', 'kg', 'Thịt và đạm tươi', 12),
  ('VAI-HEO', 'Nạc vai heo', 'kg', 'Thịt và đạm tươi', 10),
  ('GA-TAY', 'Ức gà tây', 'kg', 'Thịt và đạm tươi', 6),
  ('XUC-XICH', 'Xúc xích bò heo sống', 'cây', 'Thịt và đạm tươi', 30),
  ('SUON-BO', 'Sườn bò nguyên tảng', 'kg', 'Thịt và đạm tươi', 0),
  ('BAP-CAI', 'Bắp cải trắng', 'kg', 'Rau củ và trái cây', 5),
  ('CA-ROT', 'Cà rốt', 'kg', 'Rau củ và trái cây', 2),
  ('KHOAI-TAY', 'Khoai tây', 'kg', 'Rau củ và trái cây', 5),
  ('HANH-TAY', 'Hành tây', 'kg', 'Rau củ và trái cây', 2),
  ('DUA-LEO', 'Dưa leo', 'kg', 'Rau củ và trái cây', 3),
  ('CHUOI', 'Chuối chín', 'kg', 'Rau củ và trái cây', 2),
  ('TOI', 'Tỏi', 'kg', 'Rau củ và trái cây', 1),
  ('MUOI', 'Muối hạt', 'kg', 'Gia vị và sốt', 2),
  ('TIEU', 'Tiêu đen xay', 'kg', 'Gia vị và sốt', 1),
  ('PAPRIKA', 'Bột paprika', 'kg', 'Gia vị và sốt', 1),
  ('DUONG-NAU', 'Đường nâu', 'kg', 'Gia vị và sốt', 2),
  ('GIAM-TAO', 'Giấm táo', 'l', 'Gia vị và sốt', 2),
  ('SOT-BBQ', 'Sốt BBQ nền', 'kg', 'Gia vị và sốt', 3),
  ('MAYONNAISE', 'Mayonnaise', 'kg', 'Gia vị và sốt', 2),
  ('MU-TAT', 'Mù tạt vàng', 'kg', 'Gia vị và sốt', 1),
  ('DAU-TRANG', 'Đậu trắng khô', 'kg', 'Hàng khô, sữa và nguyên liệu bánh', 3),
  ('BOT-BAP', 'Bột bắp làm bánh', 'kg', 'Hàng khô, sữa và nguyên liệu bánh', 3),
  ('BOT-MI', 'Bột mì đa dụng', 'kg', 'Hàng khô, sữa và nguyên liệu bánh', 2),
  ('SUA', 'Sữa tươi không đường', 'l', 'Hàng khô, sữa và nguyên liệu bánh', 5),
  ('BO', 'Bơ lạt', 'kg', 'Hàng khô, sữa và nguyên liệu bánh', 2),
  ('TRUNG', 'Trứng gà', 'quả', 'Hàng khô, sữa và nguyên liệu bánh', 30),
  ('DUONG', 'Đường trắng', 'kg', 'Hàng khô, sữa và nguyên liệu bánh', 3),
  ('VANI', 'Bột vani', 'kg', 'Hàng khô, sữa và nguyên liệu bánh', 0.1)
) AS v(code,name,unit_symbol,category_name,minimum)
JOIN "Unit" u ON u.symbol=v.unit_symbol
JOIN "Category" c ON c.name=v.category_name AND c."objectType"='MATERIAL'
ON CONFLICT (code) DO NOTHING;

-- 5. Thành phẩm: thịt và món kèm PRODUCED; nước đóng chai/lon PURCHASED.
-- Giá khởi tạo theo cấu hình demo, không tạo bảng giá riêng.
-- Dưa chua bán riêng, không mô phỏng món miễn phí.
INSERT INTO "Product" (id,code,name,"unitId","categoryId","sellingPrice","supplyType",status)
SELECT (substr(md5('demo-bbq-product:'||v.code),1,12)||'4'||substr(md5('demo-bbq-product:'||v.code),14,3)||'a'||substr(md5('demo-bbq-product:'||v.code),18,15))::uuid,'DM-TP-'||v.code,v.name,u.id,c.id,v.price,v.supply_type,v.status
FROM (VALUES
  ('BRISKET', 'Ức bò hun khói (brisket)', 'kg', 'Thịt hun khói', 980000, 'PRODUCED', 'ACTIVE'),
  ('SUON-HEO', 'Sườn heo hun khói', 'kg', 'Thịt hun khói', 620000, 'PRODUCED', 'ACTIVE'),
  ('HEO-XE', 'Heo xé hun khói', 'kg', 'Thịt hun khói', 480000, 'PRODUCED', 'ACTIVE'),
  ('GA-TAY', 'Ức gà tây hun khói', 'kg', 'Thịt hun khói', 650000, 'PRODUCED', 'ACTIVE'),
  ('XUC-XICH', 'Xúc xích hun khói', 'cây', 'Thịt hun khói', 65000, 'PRODUCED', 'ACTIVE'),
  ('SUON-BO', 'Sườn bò hun khói đặc biệt', 'kg', 'Thịt hun khói', 1250000, 'PRODUCED', 'INACTIVE'),
  ('DAU-HAM', 'Đậu hầm sốt BBQ', 'phần', 'Món ăn kèm', 45000, 'PRODUCED', 'ACTIVE'),
  ('COLESLAW', 'Salad bắp cải coleslaw', 'phần', 'Món ăn kèm', 40000, 'PRODUCED', 'ACTIVE'),
  ('SALAD-KHOAI', 'Salad khoai tây', 'phần', 'Món ăn kèm', 45000, 'PRODUCED', 'ACTIVE'),
  ('DUA-CHUA', 'Dưa leo muối chua', 'phần', 'Món ăn kèm', 20000, 'PRODUCED', 'ACTIVE'),
  ('BANH-BAP', 'Bánh bắp nướng', 'phần', 'Món ăn kèm', 35000, 'PRODUCED', 'ACTIVE'),
  ('PUDDING', 'Pudding chuối', 'ly', 'Tráng miệng', 45000, 'PRODUCED', 'ACTIVE'),
  ('COCA', 'Coca-Cola 320 ml', 'lon', 'Đồ uống', 25000, 'PURCHASED', 'ACTIVE'),
  ('COCA-ZERO', 'Coca-Cola Zero 320 ml', 'lon', 'Đồ uống', 25000, 'PURCHASED', 'ACTIVE'),
  ('NUOC-SUOI', 'Nước suối 500 ml', 'chai', 'Đồ uống', 15000, 'PURCHASED', 'ACTIVE'),
  ('TRA-O-LONG', 'Trà ô long đóng chai 455 ml', 'chai', 'Đồ uống', 25000, 'PURCHASED', 'ACTIVE')
) AS v(code,name,unit_symbol,category_name,price,supply_type,status)
JOIN "Unit" u ON u.symbol=v.unit_symbol
JOIN "Category" c ON c.name=v.category_name AND c."objectType"='PRODUCT'
ON CONFLICT (code) DO NOTHING;

-- 6. Nhà cung cấp hư cấu.
INSERT INTO "Supplier" (id,code,name,phone,address,status)
SELECT (substr(md5('demo-bbq-supplier:'||v.code),1,12)||'4'||substr(md5('demo-bbq-supplier:'||v.code),14,3)||'a'||substr(md5('demo-bbq-supplier:'||v.code),18,15))::uuid,'DM-NCC-'||v.code,v.name,v.phone,v.address,'ACTIVE'
FROM (VALUES
  ('THIT-BO', 'Thực phẩm Đồng Cỏ', '02873001001', 'Quận Bình Thạnh, TP.HCM'),
  ('THIT-HEO', 'Thực phẩm An Phú', '02873001002', 'TP. Thủ Đức, TP.HCM'),
  ('GIA-CAM', 'Gia cầm Bình Minh', '02873001003', 'Huyện Bình Chánh, TP.HCM'),
  ('RAU-CU', 'Nông sản Vườn Xanh', '02873001004', 'Huyện Củ Chi, TP.HCM'),
  ('GIA-VI', 'Nguyên liệu bếp Minh An', '02873001005', 'Quận Tân Phú, TP.HCM'),
  ('DO-UONG', 'Phân phối đồ uống Thành Đạt', '02873001006', 'Quận Tân Bình, TP.HCM')
) AS v(code,name,phone,address)
ON CONFLICT (code) DO NOTHING;

-- 7. Ba khu phục vụ, 14 bàn (có một bàn ngừng dùng).
INSERT INTO "DiningArea" (name,columns,rows,color) VALUES
 ('BBQ - Sảnh chính',4,3,'#42688b'),
 ('BBQ - Hiên ngoài',4,2,'#658566'),
 ('BBQ - Phòng nhóm',2,2,'#a77a45')
ON CONFLICT (name) DO NOTHING;

INSERT INTO "DiningTable" (id,name,area,x,y,status)
SELECT (substr(md5('demo-bbq-table:'||v.name),1,12)||'4'||substr(md5('demo-bbq-table:'||v.name),14,3)||'a'||substr(md5('demo-bbq-table:'||v.name),18,15))::uuid,v.name,v.area,v.x,v.y,v.status FROM (VALUES
  ('BBQ-A01', 'BBQ - Sảnh chính', 0, 0, 'ACTIVE'),
  ('BBQ-A02', 'BBQ - Sảnh chính', 1, 0, 'ACTIVE'),
  ('BBQ-A03', 'BBQ - Sảnh chính', 2, 0, 'ACTIVE'),
  ('BBQ-A04', 'BBQ - Sảnh chính', 3, 0, 'ACTIVE'),
  ('BBQ-A05', 'BBQ - Sảnh chính', 0, 1, 'ACTIVE'),
  ('BBQ-A06', 'BBQ - Sảnh chính', 1, 1, 'ACTIVE'),
  ('BBQ-A07', 'BBQ - Sảnh chính', 2, 1, 'ACTIVE'),
  ('BBQ-A08', 'BBQ - Sảnh chính', 3, 1, 'ACTIVE'),
  ('BBQ-B01', 'BBQ - Hiên ngoài', 0, 0, 'ACTIVE'),
  ('BBQ-B02', 'BBQ - Hiên ngoài', 1, 0, 'ACTIVE'),
  ('BBQ-B03', 'BBQ - Hiên ngoài', 2, 0, 'ACTIVE'),
  ('BBQ-B04', 'BBQ - Hiên ngoài', 3, 0, 'INACTIVE'),
  ('BBQ-C01', 'BBQ - Phòng nhóm', 0, 0, 'ACTIVE'),
  ('BBQ-C02', 'BBQ - Phòng nhóm', 1, 0, 'ACTIVE')
) AS v(name,area,x,y,status)
-- Nếu khu vực cùng tên đã bị đổi kích thước, bỏ bàn ngoài phạm vi.
JOIN "DiningArea" a ON a.name=v.area AND v.x<a.columns AND v.y<a.rows
WHERE NOT EXISTS (SELECT 1 FROM "DiningTable" t WHERE t.area=v.area AND t.x=v.x AND t.y=v.y)
ON CONFLICT (name) DO NOTHING;


-- Kết quả để đối chiếu sau khi import (tài khoản cũ giữ nguyên mật khẩu).
SELECT a.username,r.name AS role,e.name AS employee,a.status,
       CASE WHEN e.id IS NULL THEN 'CHƯA LIÊN KẾT' ELSE 'Đã liên kết' END AS profile
FROM "Account" a JOIN "Role" r ON r.id=a."roleId"
LEFT JOIN "Employee" e ON e."accountId"=a.id
WHERE a.username LIKE 'demo.bbq.%'
ORDER BY a.username;


-- #####################################################################
-- NHÓM 2 / 4
-- #####################################################################
-- NHÓM 02: BOM BBQ — CHẠY SAU NHÓM 01.
-- Đúng logic hiện tại: mọi công thức tính cho 1 đơn vị thành phẩm.
-- 11 công thức ACTIVE v1 và 1 BRISKET v2 DRAFT để thử sửa/áp dụng.
-- Không tạo BOM cho đồ uống PURCHASED hoặc sườn bò đang INACTIVE.
-- Định mức là số liệu demo, không phải công thức vận hành đã kiểm chứng.
-- Mức hao hụt do sơ chế/nấu đã nằm trong định mức nguyên liệu đầu vào.
-- Không nhập tồn, không tạo lệnh sản xuất hoặc giao dịch ở nhóm này.

CREATE TEMP TABLE demo_bbq_boms ON COMMIT DROP AS
SELECT * FROM (VALUES
 ('DM-TP-BRISKET', 1, 'ACTIVE'),
 ('DM-TP-SUON-HEO', 1, 'ACTIVE'),
 ('DM-TP-HEO-XE', 1, 'ACTIVE'),
 ('DM-TP-GA-TAY', 1, 'ACTIVE'),
 ('DM-TP-XUC-XICH', 1, 'ACTIVE'),
 ('DM-TP-DAU-HAM', 1, 'ACTIVE'),
 ('DM-TP-COLESLAW', 1, 'ACTIVE'),
 ('DM-TP-SALAD-KHOAI', 1, 'ACTIVE'),
 ('DM-TP-DUA-CHUA', 1, 'ACTIVE'),
 ('DM-TP-BANH-BAP', 1, 'ACTIVE'),
 ('DM-TP-PUDDING', 1, 'ACTIVE'),
 ('DM-TP-BRISKET', 2, 'DRAFT')
) AS v(product_code,version,status);

CREATE TEMP TABLE demo_bbq_bom_lines ON COMMIT DROP AS
SELECT * FROM (VALUES
 ('DM-TP-BRISKET', 1, 'DM-NVL-UC-BO', 1.800),
 ('DM-TP-BRISKET', 1, 'DM-NVL-MUOI', 0.022),
 ('DM-TP-BRISKET', 1, 'DM-NVL-TIEU', 0.018),
 ('DM-TP-BRISKET', 1, 'DM-NVL-PAPRIKA', 0.008),
 ('DM-TP-SUON-HEO', 1, 'DM-NVL-SUON-HEO', 1.500),
 ('DM-TP-SUON-HEO', 1, 'DM-NVL-MUOI', 0.018),
 ('DM-TP-SUON-HEO', 1, 'DM-NVL-TIEU', 0.010),
 ('DM-TP-SUON-HEO', 1, 'DM-NVL-PAPRIKA', 0.012),
 ('DM-TP-SUON-HEO', 1, 'DM-NVL-DUONG-NAU', 0.025),
 ('DM-TP-SUON-HEO', 1, 'DM-NVL-SOT-BBQ', 0.080),
 ('DM-TP-HEO-XE', 1, 'DM-NVL-VAI-HEO', 1.600),
 ('DM-TP-HEO-XE', 1, 'DM-NVL-MUOI', 0.018),
 ('DM-TP-HEO-XE', 1, 'DM-NVL-TIEU', 0.010),
 ('DM-TP-HEO-XE', 1, 'DM-NVL-PAPRIKA', 0.010),
 ('DM-TP-HEO-XE', 1, 'DM-NVL-DUONG-NAU', 0.020),
 ('DM-TP-HEO-XE', 1, 'DM-NVL-SOT-BBQ', 0.100),
 ('DM-TP-GA-TAY', 1, 'DM-NVL-GA-TAY', 1.350),
 ('DM-TP-GA-TAY', 1, 'DM-NVL-MUOI', 0.018),
 ('DM-TP-GA-TAY', 1, 'DM-NVL-TIEU', 0.008),
 ('DM-TP-GA-TAY', 1, 'DM-NVL-PAPRIKA', 0.006),
 ('DM-TP-GA-TAY', 1, 'DM-NVL-BO', 0.030),
 ('DM-TP-XUC-XICH', 1, 'DM-NVL-XUC-XICH', 1.000),
 ('DM-TP-XUC-XICH', 1, 'DM-NVL-SOT-BBQ', 0.010),
 ('DM-TP-DAU-HAM', 1, 'DM-NVL-DAU-TRANG', 0.055),
 ('DM-TP-DAU-HAM', 1, 'DM-NVL-HANH-TAY', 0.020),
 ('DM-TP-DAU-HAM', 1, 'DM-NVL-SOT-BBQ', 0.030),
 ('DM-TP-DAU-HAM', 1, 'DM-NVL-DUONG-NAU', 0.005),
 ('DM-TP-DAU-HAM', 1, 'DM-NVL-MUOI', 0.001),
 ('DM-TP-COLESLAW', 1, 'DM-NVL-BAP-CAI', 0.090),
 ('DM-TP-COLESLAW', 1, 'DM-NVL-CA-ROT', 0.020),
 ('DM-TP-COLESLAW', 1, 'DM-NVL-MAYONNAISE', 0.025),
 ('DM-TP-COLESLAW', 1, 'DM-NVL-GIAM-TAO', 0.005),
 ('DM-TP-COLESLAW', 1, 'DM-NVL-DUONG', 0.003),
 ('DM-TP-COLESLAW', 1, 'DM-NVL-MUOI', 0.001),
 ('DM-TP-SALAD-KHOAI', 1, 'DM-NVL-KHOAI-TAY', 0.150),
 ('DM-TP-SALAD-KHOAI', 1, 'DM-NVL-MAYONNAISE', 0.025),
 ('DM-TP-SALAD-KHOAI', 1, 'DM-NVL-MU-TAT', 0.005),
 ('DM-TP-SALAD-KHOAI', 1, 'DM-NVL-HANH-TAY', 0.010),
 ('DM-TP-SALAD-KHOAI', 1, 'DM-NVL-MUOI', 0.001),
 ('DM-TP-SALAD-KHOAI', 1, 'DM-NVL-TIEU', 0.001),
 ('DM-TP-DUA-CHUA', 1, 'DM-NVL-DUA-LEO', 0.080),
 ('DM-TP-DUA-CHUA', 1, 'DM-NVL-GIAM-TAO', 0.025),
 ('DM-TP-DUA-CHUA', 1, 'DM-NVL-DUONG', 0.008),
 ('DM-TP-DUA-CHUA', 1, 'DM-NVL-MUOI', 0.002),
 ('DM-TP-BANH-BAP', 1, 'DM-NVL-BOT-BAP', 0.035),
 ('DM-TP-BANH-BAP', 1, 'DM-NVL-BOT-MI', 0.020),
 ('DM-TP-BANH-BAP', 1, 'DM-NVL-SUA', 0.030),
 ('DM-TP-BANH-BAP', 1, 'DM-NVL-BO', 0.010),
 ('DM-TP-BANH-BAP', 1, 'DM-NVL-TRUNG', 0.100),
 ('DM-TP-BANH-BAP', 1, 'DM-NVL-DUONG', 0.008),
 ('DM-TP-BANH-BAP', 1, 'DM-NVL-MUOI', 0.001),
 ('DM-TP-PUDDING', 1, 'DM-NVL-CHUOI', 0.050),
 ('DM-TP-PUDDING', 1, 'DM-NVL-SUA', 0.090),
 ('DM-TP-PUDDING', 1, 'DM-NVL-TRUNG', 0.100),
 ('DM-TP-PUDDING', 1, 'DM-NVL-DUONG', 0.015),
 ('DM-TP-PUDDING', 1, 'DM-NVL-BOT-MI', 0.006),
 ('DM-TP-PUDDING', 1, 'DM-NVL-VANI', 0.001),
 ('DM-TP-BRISKET', 2, 'DM-NVL-UC-BO', 1.800),
 ('DM-TP-BRISKET', 2, 'DM-NVL-MUOI', 0.020),
 ('DM-TP-BRISKET', 2, 'DM-NVL-TIEU', 0.020),
 ('DM-TP-BRISKET', 2, 'DM-NVL-PAPRIKA', 0.010)
) AS v(product_code,version,material_code,quantity);

-- Dừng nếu nhóm 01 còn thiếu, không âm thầm tạo công thức mất nguyên liệu.
DO $$
BEGIN
 IF EXISTS (
  SELECT 1 FROM demo_bbq_boms v LEFT JOIN "Product" p ON p.code=v.product_code
  WHERE p.id IS NULL OR p."supplyType"<>'PRODUCED' OR p.status<>'ACTIVE'
 ) THEN RAISE EXCEPTION 'Thiếu thành phẩm nhóm 01 hoặc thành phẩm không còn hoạt động/tự chế biến.'; END IF;
 IF EXISTS (
  SELECT 1 FROM demo_bbq_bom_lines v LEFT JOIN "Material" m ON m.code=v.material_code
  WHERE m.id IS NULL OR m.status<>'ACTIVE'
 ) THEN RAISE EXCEPTION 'Thiếu NVL nhóm 01 hoặc NVL đã ngừng sử dụng.'; END IF;
 IF NOT EXISTS (
  SELECT 1 FROM "Employee" e JOIN "Account" a ON a.id=e."accountId"
  WHERE a.username='demo.bbq.beptruong' AND a.status='ACTIVE' AND e.status='ACTIVE'
 ) THEN RAISE EXCEPTION 'Chưa có hồ sơ hoạt động cho demo.bbq.beptruong; chạy nhóm 01 trước.'; END IF;
 IF EXISTS (
  SELECT 1 FROM demo_bbq_boms v JOIN "Product" p ON p.code=v.product_code
  JOIN "Bom" b ON b."productId"=p.id AND b.version=v.version
  WHERE b.id<>(substr(md5('demo-bbq-bom:'||v.product_code||':'||v.version::text),1,12)||'4'||substr(md5('demo-bbq-bom:'||v.product_code||':'||v.version::text),14,3)||'a'||substr(md5('demo-bbq-bom:'||v.product_code||':'||v.version::text),18,15))::uuid
 ) THEN RAISE EXCEPTION 'Số phiên bản BOM đã được sử dụng bởi công thức khác. Không ghi đè công thức đang có.'; END IF;
END $$;

INSERT INTO "Bom" (id,"productId",version,"outputQuantity","effectiveAt",status,"createdById")
SELECT (substr(md5('demo-bbq-bom:'||v.product_code||':'||v.version::text),1,12)||'4'||substr(md5('demo-bbq-bom:'||v.product_code||':'||v.version::text),14,3)||'a'||substr(md5('demo-bbq-bom:'||v.product_code||':'||v.version::text),18,15))::uuid,
 p.id,v.version,1,TIMESTAMPTZ '2026-01-01 00:00:00+07',v.status,e.id
FROM demo_bbq_boms v JOIN "Product" p ON p.code=v.product_code
JOIN "Account" a ON a.username='demo.bbq.beptruong'
JOIN "Employee" e ON e."accountId"=a.id
ON CONFLICT (id) DO NOTHING;

INSERT INTO "BomLine" (id,"bomId","materialId",quantity)
SELECT (substr(md5('demo-bbq-bom-line:'||v.product_code||':'||v.version::text||':'||v.material_code),1,12)||'4'||substr(md5('demo-bbq-bom-line:'||v.product_code||':'||v.version::text||':'||v.material_code),14,3)||'a'||substr(md5('demo-bbq-bom-line:'||v.product_code||':'||v.version::text||':'||v.material_code),18,15))::uuid,
 b.id,m.id,v.quantity
FROM demo_bbq_bom_lines v
JOIN "Product" p ON p.code=v.product_code
JOIN "Bom" b ON b."productId"=p.id AND b.version=v.version
JOIN "Material" m ON m.code=v.material_code
ON CONFLICT (id) DO NOTHING;


-- Xem danh sách công thức vừa nhập; đơn vị lấy đúng từ danh mục.
SELECT p.code,p.name,b.version,b.status,b."outputQuantity",u.symbol AS output_unit,
       b."effectiveAt",COUNT(l.id) AS material_count
FROM "Bom" b JOIN "Product" p ON p.id=b."productId"
JOIN "Unit" u ON u.id=p."unitId" LEFT JOIN "BomLine" l ON l."bomId"=b.id
WHERE p.code IN (
 'DM-TP-BRISKET','DM-TP-SUON-HEO','DM-TP-HEO-XE','DM-TP-GA-TAY','DM-TP-XUC-XICH',
 'DM-TP-DAU-HAM','DM-TP-COLESLAW','DM-TP-SALAD-KHOAI','DM-TP-DUA-CHUA',
 'DM-TP-BANH-BAP','DM-TP-PUDDING'
)
GROUP BY p.id,p.code,p.name,b.id,b.version,b.status,b."outputQuantity",u.symbol,b."effectiveAt"
ORDER BY p.code,b.version;

-- Ví dụ: 1 kg brisket dùng 1,800 kg ức bò sống và gia vị.
-- Giao lệnh 5 kg brisket sẽ tính 9 kg ức bò sống theo tỉ lệ.
-- Bánh bắp/pudding: 0,100 quả trứng cho 1 đơn vị là định mức phân bổ;
-- chọn mẻ 10,20,... phần/ly để lượng trứng cho mẻ là số nguyên.
-- Chạy lại giữ trạng thái/nội dung BOM đã tồn tại, không đặt lại ACTIVE/DRAFT.


-- #####################################################################
-- NHÓM 3 / 4
-- #####################################################################
-- NHÓM 03: NHẬP KHO THEO LÔ — sau nhóm 01; nhóm 02 không bắt buộc để nhập.
-- 11 phiếu NVL (10 ghi sổ, 1 nháp), 4 phiếu TP nhập mua (3 ghi sổ, 1 nháp).
-- Có lô mới, gần hạn, hết hạn, hai lô cùng mặt hàng để thử FEFO.
-- Chỉ tạo chứng từ nhập + tồn kho tương ứng. Chưa có cấp bếp/chế biến/chuyển quầy/bán.
-- Ngày, hạn, giá là dữ liệu giả định cho demo; không phải hướng dẫn bảo quản.

CREATE TEMP TABLE dm03_context ON COMMIT DROP AS
 SELECT (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::date AS day;
-- Có thể thay biểu thức ngày ở trên bằng DATE 'YYYY-MM-DD' để tự chọn ngày mẫu.
CREATE TEMP TABLE dm03_receipts ON COMMIT DROP AS
SELECT * FROM (VALUES
 ('DM03-NVL-BO', 'DM-NCC-THIT-BO', -1, 'POSTED', 'Nhập nguyên liệu chuẩn bị mẻ BBQ; dữ liệu demo.'),
 ('DM03-NVL-HEO', 'DM-NCC-THIT-HEO', -1, 'POSTED', 'Nhập nguyên liệu chuẩn bị mẻ BBQ; dữ liệu demo.'),
 ('DM03-NVL-GIA-CAM', 'DM-NCC-GIA-CAM', -1, 'POSTED', 'Nhập nguyên liệu chuẩn bị mẻ BBQ; dữ liệu demo.'),
 ('DM03-NVL-RAU', 'DM-NCC-RAU-CU', -1, 'POSTED', 'Nhập nguyên liệu chuẩn bị mẻ BBQ; dữ liệu demo.'),
 ('DM03-NVL-GV', 'DM-NCC-GIA-VI', -1, 'POSTED', 'Nhập nguyên liệu chuẩn bị mẻ BBQ; dữ liệu demo.'),
 ('DM03-NVL-BO-02', 'DM-NCC-THIT-BO', -5, 'POSTED', 'Lô bò nhận trước, hạn gần hơn để thử ưu tiên FEFO.'),
 ('DM03-NVL-RAU-02', 'DM-NCC-RAU-CU', -2, 'POSTED', 'Lô bắp cải hết hạn hôm nay để thử cảnh báo.'),
 ('DM03-NVL-GV-02', 'DM-NCC-GIA-VI', -3, 'POSTED', 'Lô sữa gần hạn để thử FEFO.'),
 ('DM03-NVL-GV-CU', 'DM-NCC-GIA-VI', -10, 'POSTED', 'Lô sữa nhập từ trước, nay hết hạn; giữ nguyên để thử hủy lô.'),
 ('DM03-NVL-RAU-CU', 'DM-NCC-RAU-CU', -6, 'POSTED', 'Lô chuối đã hết hạn; không dùng cho chế biến.'),
 ('DM03-NVL-NHAP', 'DM-NCC-THIT-BO', 0, 'DRAFT', 'Nhân viên kho lập nháp, quản lý chưa ghi sổ; chưa tăng tồn.')
) AS v(code,supplier_code,received_offset,status,note);
CREATE TEMP TABLE dm03_materials ON COMMIT DROP AS
SELECT * FROM (VALUES
 ('DM03-NVL-BO', 'DM-NVL-UC-BO', 40, 320000, 10, 'DM03-LO-UC-BO-01'),
 ('DM03-NVL-BO', 'DM-NVL-SUON-BO', 3, 350000, 10, 'DM03-LO-SUON-BO-01'),
 ('DM03-NVL-HEO', 'DM-NVL-SUON-HEO', 30, 150000, 7, 'DM03-LO-SUON-HEO-01'),
 ('DM03-NVL-HEO', 'DM-NVL-VAI-HEO', 30, 115000, 7, 'DM03-LO-VAI-HEO-01'),
 ('DM03-NVL-HEO', 'DM-NVL-XUC-XICH', 80, 28000, 14, 'DM03-LO-XUC-XICH-01'),
 ('DM03-NVL-GIA-CAM', 'DM-NVL-GA-TAY', 12, 220000, 7, 'DM03-LO-GA-TAY-01'),
 ('DM03-NVL-RAU', 'DM-NVL-BAP-CAI', 12, 25000, 5, 'DM03-LO-BAP-CAI-01'),
 ('DM03-NVL-RAU', 'DM-NVL-CA-ROT', 5, 30000, 7, 'DM03-LO-CA-ROT-01'),
 ('DM03-NVL-RAU', 'DM-NVL-KHOAI-TAY', 15, 35000, 10, 'DM03-LO-KHOAI-TAY-01'),
 ('DM03-NVL-RAU', 'DM-NVL-HANH-TAY', 5, 28000, 10, 'DM03-LO-HANH-TAY-01'),
 ('DM03-NVL-RAU', 'DM-NVL-DUA-LEO', 8, 25000, 5, 'DM03-LO-DUA-LEO-01'),
 ('DM03-NVL-RAU', 'DM-NVL-CHUOI', 5, 22000, 4, 'DM03-LO-CHUOI-01'),
 ('DM03-NVL-RAU', 'DM-NVL-TOI', 2, 60000, 20, 'DM03-LO-TOI-01'),
 ('DM03-NVL-GV', 'DM-NVL-MUOI', 10, 12000, 180, 'DM03-LO-MUOI-01'),
 ('DM03-NVL-GV', 'DM-NVL-TIEU', 3, 180000, 180, 'DM03-LO-TIEU-01'),
 ('DM03-NVL-GV', 'DM-NVL-PAPRIKA', 2, 220000, 180, 'DM03-LO-PAPRIKA-01'),
 ('DM03-NVL-GV', 'DM-NVL-DUONG-NAU', 5, 45000, 180, 'DM03-LO-DUONG-NAU-01'),
 ('DM03-NVL-GV', 'DM-NVL-GIAM-TAO', 5, 65000, 180, 'DM03-LO-GIAM-TAO-01'),
 ('DM03-NVL-GV', 'DM-NVL-SOT-BBQ', 10, 85000, 90, 'DM03-LO-SOT-BBQ-01'),
 ('DM03-NVL-GV', 'DM-NVL-MAYONNAISE', 5, 75000, 90, 'DM03-LO-MAYONNAISE-01'),
 ('DM03-NVL-GV', 'DM-NVL-MU-TAT', 2, 90000, 90, 'DM03-LO-MU-TAT-01'),
 ('DM03-NVL-GV', 'DM-NVL-DAU-TRANG', 10, 65000, 120, 'DM03-LO-DAU-TRANG-01'),
 ('DM03-NVL-GV', 'DM-NVL-BOT-BAP', 8, 45000, 120, 'DM03-LO-BOT-BAP-01'),
 ('DM03-NVL-GV', 'DM-NVL-BOT-MI', 8, 25000, 120, 'DM03-LO-BOT-MI-01'),
 ('DM03-NVL-GV', 'DM-NVL-SUA', 12, 30000, 14, 'DM03-LO-SUA-01'),
 ('DM03-NVL-GV', 'DM-NVL-BO', 4, 180000, 90, 'DM03-LO-BO-01'),
 ('DM03-NVL-GV', 'DM-NVL-TRUNG', 100, 3500, 14, 'DM03-LO-TRUNG-01'),
 ('DM03-NVL-GV', 'DM-NVL-DUONG', 8, 25000, 180, 'DM03-LO-DUONG-01'),
 ('DM03-NVL-GV', 'DM-NVL-VANI', 0.3, 600000, 180, 'DM03-LO-VANI-01'),
 ('DM03-NVL-BO-02', 'DM-NVL-UC-BO', 10, 315000, 2, 'DM03-LO-UC-BO-02'),
 ('DM03-NVL-RAU-02', 'DM-NVL-BAP-CAI', 3, 24000, 0, 'DM03-LO-BAP-CAI-CAN-HAN'),
 ('DM03-NVL-GV-02', 'DM-NVL-SUA', 4, 29000, 1, 'DM03-LO-SUA-CAN-HAN'),
 ('DM03-NVL-GV-CU', 'DM-NVL-SUA', 1, 28000, -1, 'DM03-LO-SUA-HET-HAN'),
 ('DM03-NVL-RAU-CU', 'DM-NVL-CHUOI', 0.5, 20000, -1, 'DM03-LO-CHUOI-HET-HAN'),
 ('DM03-NVL-NHAP', 'DM-NVL-UC-BO', 7.5, 325000, 8, 'DM03-LO-UC-BO-NHAP')
) AS v(receipt_code,material_code,quantity,unit_price,expiry_offset,lot_code);
CREATE TEMP TABLE dm03_product_receipts ON COMMIT DROP AS
SELECT * FROM (VALUES
 ('DM03-TP-CU', -30, 'POSTED', 'Lô đồ uống nhập trước để kiểm tra FEFO.'),
 ('DM03-TP-MOI', -1, 'POSTED', 'Bổ sung đồ uống đóng chai/lon; nhập mua trực tiếp.'),
 ('DM03-TP-HET-HAN', -180, 'POSTED', 'Lô Coca-Cola nhập trước, nay hết hạn; thử hủy lô tại kho.'),
 ('DM03-TP-NHAP', 0, 'DRAFT', 'Nháp nhập nước suối, chưa tăng tồn và chưa tạo lô thành phẩm.')
) AS v(code,received_offset,status,note);
CREATE TEMP TABLE dm03_products ON COMMIT DROP AS
SELECT * FROM (VALUES
 ('DM03-TP-CU', 'DM-TP-COCA', 'DM03-LO-TP-COCA-CU', 96, 11000, -90, 30),
 ('DM03-TP-MOI', 'DM-TP-COCA', 'DM03-LO-TP-COCA-MOI', 24, 11000, -7, 180),
 ('DM03-TP-CU', 'DM-TP-COCA-ZERO', 'DM03-LO-TP-COCA-ZERO-CU', 48, 11500, -90, 30),
 ('DM03-TP-MOI', 'DM-TP-COCA-ZERO', 'DM03-LO-TP-COCA-ZERO-MOI', 24, 11500, -7, 180),
 ('DM03-TP-CU', 'DM-TP-NUOC-SUOI', 'DM03-LO-TP-NUOC-SUOI-CU', 120, 5000, -90, 30),
 ('DM03-TP-MOI', 'DM-TP-NUOC-SUOI', 'DM03-LO-TP-NUOC-SUOI-MOI', 60, 5000, -7, 180),
 ('DM03-TP-CU', 'DM-TP-TRA-O-LONG', 'DM03-LO-TP-TRA-O-LONG-CU', 48, 10500, -90, 30),
 ('DM03-TP-MOI', 'DM-TP-TRA-O-LONG', 'DM03-LO-TP-TRA-O-LONG-MOI', 24, 10500, -7, 180),
 ('DM03-TP-HET-HAN', 'DM-TP-COCA', 'DM03-LO-TP-COCA-HET-HAN', 6, 10000, -300, -1),
 ('DM03-TP-NHAP', 'DM-TP-NUOC-SUOI', 'DM03-LO-TP-NUOC-SUOI-NHAP', 48, 5000, -7, 180)
) AS v(receipt_code,product_code,lot_code,quantity,unit_price,manufactured_offset,expiry_offset);

-- Không ghi chồng nhóm 03 đã nhập, kể cả khi bạn đã sửa/ghi sổ nháp trên web.
DO $$
BEGIN
 IF EXISTS(SELECT 1 FROM "MaterialReceipt" r JOIN dm03_receipts v ON v.code=r.code)
 OR EXISTS(SELECT 1 FROM "ProductReceipt" r JOIN dm03_product_receipts v ON v.code=r.code)
 THEN RAISE EXCEPTION 'Nhóm 03 đã có phiếu trong DB. Không nhập lại để tránh cộng tồn hai lần.'; END IF;
 IF EXISTS(SELECT 1 FROM dm03_materials v LEFT JOIN "Material" m ON m.code=v.material_code WHERE m.id IS NULL OR m.status<>'ACTIVE')
 THEN RAISE EXCEPTION 'Thiếu NVL hoạt động của nhóm 01.'; END IF;
 IF EXISTS(SELECT 1 FROM dm03_products v LEFT JOIN "Product" p ON p.code=v.product_code WHERE p.id IS NULL OR p.status<>'ACTIVE' OR p."supplyType"<>'PURCHASED')
 THEN RAISE EXCEPTION 'Thiếu thành phẩm nhập mua hoạt động của nhóm 01.'; END IF;
 IF EXISTS(SELECT 1 FROM (SELECT supplier_code FROM dm03_receipts UNION SELECT 'DM-NCC-DO-UONG') v LEFT JOIN "Supplier" s ON s.code=v.supplier_code WHERE s.id IS NULL OR s.status<>'ACTIVE')
 THEN RAISE EXCEPTION 'Thiếu nhà cung cấp hoạt động của nhóm 01.'; END IF;
 IF (SELECT COUNT(*) FROM "Employee" e JOIN "Account" a ON a.id=e."accountId" WHERE a.username IN ('demo.bbq.nvkho','demo.bbq.kho') AND a.status='ACTIVE' AND e.status='ACTIVE')<>2
 THEN RAISE EXCEPTION 'Cần tài khoản và hồ sơ hoạt động demo.bbq.nvkho, demo.bbq.kho của nhóm 01.'; END IF;
END $$;

-- A. NVL: nháp có chi tiết/lô nhưng không có biến động tăng tồn.
INSERT INTO "MaterialReceipt" (id,code,"receivedAt",status,note,"supplierId","createdById")
SELECT (substr(md5('dm03-receipt:'||v.code),1,12)||'4'||substr(md5('dm03-receipt:'||v.code),14,3)||'a'||substr(md5('dm03-receipt:'||v.code),18,15))::uuid,v.code,
 CASE WHEN v.status='DRAFT' THEN CURRENT_TIMESTAMP ELSE ((x.day+v.received_offset)+TIME '08:00') AT TIME ZONE 'Asia/Ho_Chi_Minh' END,
 v.status,v.note,s.id,e.id
FROM dm03_receipts v CROSS JOIN dm03_context x
JOIN "Supplier" s ON s.code=v.supplier_code
JOIN "Account" a ON a.username='demo.bbq.nvkho'
JOIN "Employee" e ON e."accountId"=a.id;

INSERT INTO "MaterialLot" (id,code,"materialId","expiryDate")
SELECT (substr(md5('dm03-material-lot:'||v.lot_code),1,12)||'4'||substr(md5('dm03-material-lot:'||v.lot_code),14,3)||'a'||substr(md5('dm03-material-lot:'||v.lot_code),18,15))::uuid,v.lot_code,m.id,x.day+v.expiry_offset
FROM dm03_materials v CROSS JOIN dm03_context x JOIN "Material" m ON m.code=v.material_code;

INSERT INTO "MaterialReceiptLine" (id,"receiptId","lotId",quantity,"unitPrice")
SELECT (substr(md5('dm03-material-line:'||v.lot_code),1,12)||'4'||substr(md5('dm03-material-line:'||v.lot_code),14,3)||'a'||substr(md5('dm03-material-line:'||v.lot_code),18,15))::uuid,r.id,l.id,v.quantity,v.unit_price
FROM dm03_materials v JOIN "MaterialReceipt" r ON r.code=v.receipt_code
JOIN "Material" m ON m.code=v.material_code
JOIN "MaterialLot" l ON l."materialId"=m.id AND l.code=v.lot_code;

INSERT INTO "MaterialMovement" (id,"lotId","receiptLineId",quantity,"fromSource","toSource","postedAt")
SELECT (substr(md5('dm03-material-move:'||v.lot_code),1,12)||'4'||substr(md5('dm03-material-move:'||v.lot_code),14,3)||'a'||substr(md5('dm03-material-move:'||v.lot_code),18,15))::uuid,l."lotId",l.id,l.quantity,'BEN_NGOAI','TRONG_KHO',r."receivedAt"
FROM dm03_materials v JOIN "MaterialReceipt" r ON r.code=v.receipt_code
JOIN "MaterialReceiptLine" l ON l."receiptId"=r.id
JOIN "MaterialLot" lot ON lot.id=l."lotId" AND lot.code=v.lot_code
WHERE r.status='POSTED';

-- B. Đồ uống nhập mua: ghi cả sổ tổng và sổ theo lô WAREHOUSE.
INSERT INTO "ProductReceipt" (id,code,"receivedAt",status,note,"supplierId","createdById","postedById","postedAt")
SELECT (substr(md5('dm03-product-receipt:'||v.code),1,12)||'4'||substr(md5('dm03-product-receipt:'||v.code),14,3)||'a'||substr(md5('dm03-product-receipt:'||v.code),18,15))::uuid,v.code,
 CASE WHEN v.status='DRAFT' THEN CURRENT_TIMESTAMP ELSE ((x.day+v.received_offset)+TIME '09:00') AT TIME ZONE 'Asia/Ho_Chi_Minh' END,
 v.status,v.note,s.id,e.id,
 CASE WHEN v.status='POSTED' THEN manager.id ELSE NULL END,
 CASE WHEN v.status='POSTED' THEN ((x.day+v.received_offset)+TIME '09:00') AT TIME ZONE 'Asia/Ho_Chi_Minh' ELSE NULL END
FROM dm03_product_receipts v CROSS JOIN dm03_context x
JOIN "Supplier" s ON s.code='DM-NCC-DO-UONG'
JOIN "Account" a ON a.username='demo.bbq.nvkho'
JOIN "Employee" e ON e."accountId"=a.id
JOIN "Account" ma ON ma.username='demo.bbq.kho'
JOIN "Employee" manager ON manager."accountId"=ma.id;

INSERT INTO "ProductReceiptLine" (id,"receiptId","productId","lotCode","manufacturedAt","expiryDate",quantity,"unitPrice")
SELECT (substr(md5('dm03-product-line:'||v.lot_code),1,12)||'4'||substr(md5('dm03-product-line:'||v.lot_code),14,3)||'a'||substr(md5('dm03-product-line:'||v.lot_code),18,15))::uuid,r.id,p.id,v.lot_code,x.day+v.manufactured_offset,x.day+v.expiry_offset,v.quantity,v.unit_price
FROM dm03_products v CROSS JOIN dm03_context x
JOIN "ProductReceipt" r ON r.code=v.receipt_code JOIN "Product" p ON p.code=v.product_code;

INSERT INTO "ProductLot" (id,"productId",code,"manufacturedAt","expiryDate","createdAt","receiptLineId")
SELECT (substr(md5('dm03-product-lot:'||v.lot_code),1,12)||'4'||substr(md5('dm03-product-lot:'||v.lot_code),14,3)||'a'||substr(md5('dm03-product-lot:'||v.lot_code),18,15))::uuid,l."productId",l."lotCode",l."manufacturedAt",l."expiryDate",r."postedAt",l.id
FROM dm03_products v JOIN "ProductReceipt" r ON r.code=v.receipt_code
JOIN "ProductReceiptLine" l ON l."receiptId"=r.id AND l."lotCode"=v.lot_code
WHERE r.status='POSTED';

INSERT INTO "ProductMovement" (id,"productId",quantity,"movementType","postedAt","receiptLineId")
SELECT (substr(md5('dm03-product-move:'||v.lot_code),1,12)||'4'||substr(md5('dm03-product-move:'||v.lot_code),14,3)||'a'||substr(md5('dm03-product-move:'||v.lot_code),18,15))::uuid,l."productId",l.quantity,'NHAP_MUA',r."postedAt",l.id
FROM dm03_products v JOIN "ProductReceipt" r ON r.code=v.receipt_code
JOIN "ProductReceiptLine" l ON l."receiptId"=r.id AND l."lotCode"=v.lot_code
WHERE r.status='POSTED';

INSERT INTO "ProductLotMovement" (id,"lotId",location,quantity,"postedAt","receiptLineId")
SELECT (substr(md5('dm03-product-ledger:'||v.lot_code),1,12)||'4'||substr(md5('dm03-product-ledger:'||v.lot_code),14,3)||'a'||substr(md5('dm03-product-ledger:'||v.lot_code),18,15))::uuid,lot.id,'WAREHOUSE',l.quantity,r."postedAt",l.id
FROM dm03_products v JOIN "ProductReceipt" r ON r.code=v.receipt_code
JOIN "ProductReceiptLine" l ON l."receiptId"=r.id AND l."lotCode"=v.lot_code
JOIN "ProductLot" lot ON lot."receiptLineId"=l.id
WHERE r.status='POSTED';


-- Danh sách 15 phiếu để mở đúng phiếu trên web.
SELECT 'NVL' AS kind,code,status,"receivedAt" FROM "MaterialReceipt" WHERE code LIKE 'DM03-%'
UNION ALL
SELECT 'TP nhập mua',code,status,"receivedAt" FROM "ProductReceipt" WHERE code LIKE 'DM03-%'
ORDER BY kind,code;

-- Tồn đồ uống RIÊNG phần đã nhập bởi nhóm 03, tách lượng còn hạn / hết hạn.
SELECT p.code,p.name,u.symbol,
 SUM(m.quantity) AS total,
 SUM(CASE WHEN lot."expiryDate">=(CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::date THEN m.quantity ELSE 0 END) AS unexpired,
 SUM(CASE WHEN lot."expiryDate"<(CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::date THEN m.quantity ELSE 0 END) AS expired
FROM "ProductLot" lot JOIN "Product" p ON p.id=lot."productId"
JOIN "Unit" u ON u.id=p."unitId" JOIN "ProductLotMovement" m ON m."lotId"=lot.id
WHERE lot.code LIKE 'DM03-%' AND m.location='WAREHOUSE' AND m."receiptLineId" IS NOT NULL
GROUP BY p.id,p.code,p.name,u.symbol ORDER BY p.code;
-- Cửa hàng vẫn bằng 0 nếu trước đó chưa có nghiệp vụ khác.
-- Chưa có thịt hun khói/món kèm thành phẩm: phải thực hiện chế biến + nghiệm thu.


-- #####################################################################
-- NHÓM 4 / 4
-- #####################################################################
-- =====================================================================
-- BBQ - PHẦN CÒN LẠI. Chạy SAU sample-01, sample-02, sample-03.
-- Trong file gộp, nhóm 1-3 phía trên đã chuẩn bị dữ liệu đầu vào.
-- Mốc mặc định: ngày nhận NVL 08h -> cấp 10h -> xong 20h -> chuyển 21h -> bán từ 22h.
-- Sau đó có đơn hôm nay. Đây là ảnh chụp nhiều mốc, không phải một ca bán duy nhất.
-- Cách dùng: mở toàn bộ file trong pgAdmin Query Tool, chọn DB ứng dụng, Run.
-- Không cần extension. Không xóa dữ liệu. Không chạy lại nếu đã nhập thành công.
-- Nếu lỗi: không có phần nào được COMMIT; chạy ROLLBACK trước khi sửa và chạy lại.
--
-- CHỖ SỬA TAY:
--  A: dm04_batches: số làm, số đạt, lượng chuyển quầy của từng món.
--  B: dm04_paid_count: số đơn đã trả; dm04_paid_menu: món trong đơn.
--  C: dm04_open_lines: đơn mở/nháp, bàn, món, lượng gọi.
-- Không sửa các khối ghi sổ nếu chỉ muốn đổi dữ liệu demo.
-- Giá lấy từ Product hiện có; riêng brisket trên đơn lịch sử dùng giá 920000.
-- Mọi mốc giờ dùng Asia/Ho_Chi_Minh. Ngày mẻ dựa trên phiếu nhập nhóm 03.
-- HSD là giả định demo, không phải khuyến nghị bảo quản thực phẩm.
--
-- Bao phủ: cấp NVL + phản hồi; sản xuất; nghiệm thu; hoàn/hao hụt NVL;
-- lệnh NEW/RECEIVED/IN_PROGRESS/COMPLETED; báo thiếu; chuyển kho->quầy
-- APPROVED/PENDING/REJECTED; hoàn/hủy quầy; hủy lô kho; đơn trả tiền,
-- đơn đang mở, nháp thiếu hàng, hủy/giảm món; biểu đồ và báo cáo bán hàng.
-- KHÔNG dùng Serving / ProductExport / ReplenishmentRequest cũ.
-- =====================================================================

SELECT pg_advisory_xact_lock(8112027);
SELECT pg_advisory_xact_lock(8112028);

CREATE TEMP TABLE dm04_context ON COMMIT DROP AS
SELECT (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::date AS today,
       ((SELECT MAX("receivedAt") FROM "MaterialReceipt"
         WHERE code LIKE 'DM03-%' AND code<>'DM03-NVL-NHAP' AND status='POSTED')
         AT TIME ZONE 'Asia/Ho_Chi_Minh')::date AS made_day;

-- Hàm ID tạm cho phiên pgAdmin: UUID hợp lệ, cố định theo khóa dữ liệu.
CREATE OR REPLACE FUNCTION pg_temp.dm04_id(k text) RETURNS uuid
LANGUAGE sql IMMUTABLE AS $f$
 SELECT (substr(md5('dm04:'||k),1,12)||'4'||substr(md5('dm04:'||k),14,3)
       ||'a'||substr(md5('dm04:'||k),18,15))::uuid
$f$;
CREATE OR REPLACE FUNCTION pg_temp.dm04_person(login text) RETURNS uuid
LANGUAGE sql STABLE AS $f$
 SELECT e.id FROM "Employee" e JOIN "Account" a ON a.id=e."accountId"
 WHERE a.username='demo.bbq.'||login AND a.status='ACTIVE' AND e.status='ACTIVE'
$f$;

-- A. MẺ ĐÃ HOÀN THÀNH. Mã món là phần sau DM-TP-.
-- qty: đã làm; accepted: đạt nghiệm thu; dispatch_qty: chuyển quầy.
-- Số lượng theo đơn vị Product: kg / cây / phần / ly.
CREATE TEMP TABLE dm04_batches (
 code text, qty numeric(18,3), accepted numeric(18,3),
 dispatch_qty numeric(18,3), worker text
) ON COMMIT DROP;
INSERT INTO dm04_batches VALUES
 ('BRISKET',5,5,4,'bep1'),
 ('SUON-HEO',5,5,4,'bep1'),
 ('HEO-XE',5,5,4,'bep1'),
 ('GA-TAY',2,2,1.5,'bep2'),
 ('XUC-XICH',20,20,15,'bep2'),
 ('DAU-HAM',20,20,18,'bep2'),
 ('COLESLAW',20,19,18,'bep2'), -- 1 phần không đạt; không nhập kho phần đó
 ('SALAD-KHOAI',20,20,18,'bep2'),
 ('DUA-CHUA',20,20,18,'bep2'),
 ('BANH-BAP',20,20,5,'bep2'), -- chuyển 5, các đơn demo bán hết 5 tại quầy
 ('PUDDING',20,20,4,'bep2');  -- chuyển 4, các đơn demo bán hết 4 tại quầy

-- B. ĐƠN ĐÃ THANH TOÁN: 30 đơn, 15 đơn ngày nhập mẻ và 15 đơn hôm nay.
-- Nếu ngày nhập mẻ trùng hôm nay thì tất cả thuộc hôm nay.
CREATE TEMP TABLE dm04_paid_count (count integer) ON COMMIT DROP;
INSERT INTO dm04_paid_count VALUES (30);
-- Ba mẫu đơn luân phiên, bổ sung gà tây/xúc xích/tráng miệng ở khối F.
CREATE TEMP TABLE dm04_paid_menu (
 pattern integer, code text, qty numeric(18,3)
) ON COMMIT DROP;
INSERT INTO dm04_paid_menu VALUES
 (0,'BRISKET',0.2),(0,'COLESLAW',1),(0,'NUOC-SUOI',1),
 (1,'HEO-XE',0.2),(1,'SALAD-KHOAI',1),(1,'COCA',1),
 (2,'SUON-HEO',0.2),(2,'DAU-HAM',1),(2,'COCA-ZERO',1);

-- C. ĐƠN CHƯA THU TIỀN: confirmed=true giữ hàng, false là nháp chưa giữ.
CREATE TEMP TABLE dm04_open_lines (
 sale_key text, table_name text, code text, qty numeric(18,3), confirmed boolean
) ON COMMIT DROP;
INSERT INTO dm04_open_lines VALUES
 ('CHO-THU','BBQ-A01','BRISKET',0.5,true),
 ('CHO-THU','BBQ-A01','COLESLAW',2,true),
 ('CHO-THU','BBQ-A01','NUOC-SUOI',2,true),
 ('GOI-THEM','BBQ-A02','SUON-HEO',0.5,true),
 ('GOI-THEM','BBQ-A02','XUC-XICH',2,true),
 ('GOI-THEM','BBQ-A02','TRA-O-LONG',2,false),
 ('THIEU-HANG','BBQ-A03','BRISKET',10,false), -- cố ý vượt hàng: phải giảm
 ('MANG-DI',NULL,'HEO-XE',0.5,true),
 ('MANG-DI',NULL,'SALAD-KHOAI',1,true);

-- D. ĐIỀU KIỆN ĐẦU VÀO / CHỐNG NHẬP TRÙNG.
DO $$
BEGIN
 IF EXISTS(SELECT 1 FROM "Sale" WHERE code LIKE 'DM04-%')
 OR EXISTS(SELECT 1 FROM "ProductLot" WHERE code LIKE 'DM04-%')
 OR EXISTS(SELECT 1 FROM "ProductionOrder" WHERE id=pg_temp.dm04_id('order:BRISKET'))
 THEN RAISE EXCEPTION 'Phần DM04 đã tồn tại. Không nhập lại; file không đặt lại dữ liệu đã thao tác.'; END IF;
 IF (SELECT made_day FROM dm04_context) IS NULL THEN
 RAISE EXCEPTION 'Chạy nhóm 03 trước: cần phiếu nhập NVL đã ghi sổ.'; END IF;
 IF ((SELECT made_day FROM dm04_context)+TIME '23:30') AT TIME ZONE 'Asia/Ho_Chi_Minh'>CURRENT_TIMESTAMP THEN
 RAISE EXCEPTION 'Ngày nhập mẫu chưa phù hợp để tạo mẻ/lịch sử đến 23h30; sửa mốc thời gian hoặc dùng ngày nhập đã qua.'; END IF;
 IF EXISTS(SELECT 1 FROM dm04_batches v LEFT JOIN "Product" p ON p.code='DM-TP-'||v.code
 WHERE p.id IS NULL OR p.status<>'ACTIVE' OR p."supplyType"<>'PRODUCED')
 THEN RAISE EXCEPTION 'Thiếu món hoạt động của nhóm 01.'; END IF;
 IF EXISTS(SELECT 1 FROM dm04_batches v WHERE NOT EXISTS(
 SELECT 1 FROM "Bom" b JOIN "Product" p ON p.id=b."productId"
 WHERE p.code='DM-TP-'||v.code AND b.status='ACTIVE' AND b."effectiveAt"<=CURRENT_TIMESTAMP AND b."outputQuantity"=1))
 THEN RAISE EXCEPTION 'Chạy nhóm 02 trước: thiếu BOM đang áp dụng, định mức 1 đơn vị.'; END IF;
 IF EXISTS(SELECT 1 FROM (VALUES ('kho'),('nvkho'),('beptruong'),('bep1'),('bep2'),('quanly'),('phucvu1'),('thungan')) v(login)
 WHERE pg_temp.dm04_person(v.login) IS NULL) THEN RAISE EXCEPTION 'Thiếu nhân sự hoạt động nhóm 01.'; END IF;
 IF EXISTS(SELECT 1 FROM dm04_open_lines v LEFT JOIN "DiningTable" t ON t.name=v.table_name
 WHERE v.table_name IS NOT NULL AND (t.id IS NULL OR t.status<>'ACTIVE'))
 THEN RAISE EXCEPTION 'Thiếu bàn hoạt động nhóm 01.'; END IF;
 IF EXISTS(SELECT 1 FROM "Sale" s JOIN "DiningTable" t ON t.id=s."tableId"
 WHERE s.status IN ('DRAFT','CONFIRMED') AND t.name IN (SELECT table_name FROM dm04_open_lines))
 THEN RAISE EXCEPTION 'Bàn A01/A02/A03 đang có đơn khác. Đóng đơn đó hoặc đổi bàn ở khối C.'; END IF;
 IF EXISTS(SELECT 1 FROM dm04_batches WHERE qty<=0 OR accepted<=0 OR accepted>qty OR dispatch_qty<=0 OR dispatch_qty>accepted)
 THEN RAISE EXCEPTION 'Khối A: cần 0 < lượng chuyển <= lượng đạt <= lượng làm.'; END IF;
END $$;

-- E. CHẾ BIẾN. Dùng công thức ACTIVE mới nhất; chọn lô NVL còn hạn có
-- đủ lượng, ưu tiên HSD gần nhất. Mỗi dòng giữ chứng từ nguồn đầy đủ.
DO $$
DECLARE
 v record; bl record; bom_id uuid; product_id uuid; ord uuid; issue uuid;
 run_id uuid; lot_id uuid; issue_line uuid; consumption uuid; tp_lot uuid;
 need numeric; issued numeric; made date; at0 timestamptz; who uuid;
BEGIN
 SELECT made_day INTO made FROM dm04_context;
 at0:=(made+TIME '20:00') AT TIME ZONE 'Asia/Ho_Chi_Minh';
 FOR v IN SELECT * FROM dm04_batches LOOP
  SELECT id INTO STRICT product_id FROM "Product" WHERE code='DM-TP-'||v.code;
  SELECT b.id INTO STRICT bom_id FROM "Bom" b WHERE b."productId"=product_id
   AND b.status='ACTIVE' AND b."effectiveAt"<=at0 AND b."outputQuantity"=1
   ORDER BY b."effectiveAt" DESC,b.version DESC LIMIT 1;
  ord:=pg_temp.dm04_id('order:'||v.code);issue:=pg_temp.dm04_id('issue:'||v.code);
  run_id:=pg_temp.dm04_id('run:'||v.code);who:=pg_temp.dm04_person(v.worker);
  INSERT INTO "ProductionOrder" (id,quantity,status,"assignedAt","dueAt","bomId","assignedById","assignedToId")
   VALUES(ord,v.qty,'COMPLETED',at0-INTERVAL '12 hours',at0+INTERVAL '1 hour',bom_id,pg_temp.dm04_person('beptruong'),who);
  INSERT INTO "MaterialIssue" (id,"productionOrderId","requestedById","requestedAt",status,reason,"reviewedById","approvedAt","reviewNote")
   VALUES(issue,ord,who,at0-INTERVAL '11 hours','APPROVED','Cấp theo công thức cho mẻ BBQ chuẩn bị bán.',
    pg_temp.dm04_person('kho'),at0-INTERVAL '10 hours','Đã đối chiếu số lượng, lô và hạn sử dụng khi bàn giao.');
  INSERT INTO "ProductionRun" (id,"productionOrderId","performedById","recordedAt","actualQuantity","acceptedQuantity",status,"inspectedById","inspectedAt","inspectionNote")
   VALUES(run_id,ord,who,at0,v.qty,v.accepted,'INSPECTED',pg_temp.dm04_person('beptruong'),at0+INTERVAL '10 minutes',
    CASE WHEN v.accepted<v.qty THEN 'Một phần không đạt chất lượng, không nhập kho.' ELSE 'Đạt số lượng và chất lượng theo mẻ demo.' END);
  FOR bl IN SELECT * FROM "BomLine" WHERE "bomId"=bom_id LOOP
   need:=round(bl.quantity*v.qty,3);
   issued:=need+CASE WHEN v.code='BRISKET' AND bl."materialId"=(SELECT id FROM "Material" WHERE code='DM-NVL-MUOI') THEN 0.070 ELSE 0 END;
   SELECT l.id INTO lot_id FROM "MaterialLot" l
    LEFT JOIN "MaterialMovement" m ON m."lotId"=l.id AND m."postedAt"<=at0-INTERVAL '10 hours'
    WHERE l."materialId"=bl."materialId" AND (l."expiryDate" IS NULL OR l."expiryDate">=(SELECT today FROM dm04_context))
    GROUP BY l.id
    HAVING COALESCE(SUM(CASE WHEN m."toSource"='TRONG_KHO' THEN m.quantity ELSE 0 END-
                         CASE WHEN m."fromSource"='TRONG_KHO' THEN m.quantity ELSE 0 END),0)>=issued
    ORDER BY l."expiryDate" NULLS LAST,l.code LIMIT 1;
   IF lot_id IS NULL THEN RAISE EXCEPTION 'Không đủ một lô NVL cho mẻ %, NVL %, lượng %. Kiểm tra nhóm 03 hoặc giảm mẻ ở khối A.',v.code,bl."materialId",issued; END IF;
   issue_line:=pg_temp.dm04_id('issue-line:'||v.code||':'||bl."materialId");
   consumption:=pg_temp.dm04_id('consumption:'||v.code||':'||bl."materialId");
   INSERT INTO "MaterialIssueLine" (id,"issueId","lotId","requestedQuantity","issuedQuantity") VALUES(issue_line,issue,lot_id,issued,issued);
   INSERT INTO "MaterialMovement" (id,"lotId","issueLineId",quantity,"fromSource","toSource","postedAt")
    VALUES(pg_temp.dm04_id('move-issue:'||issue_line),lot_id,issue_line,issued,'TRONG_KHO','DA_CAP',at0-INTERVAL '10 hours');
   INSERT INTO "ConsumptionLine" (id,"runId","issueLineId",quantity) VALUES(consumption,run_id,issue_line,need);
   INSERT INTO "MaterialMovement" (id,"lotId","consumptionLineId",quantity,"fromSource","toSource","postedAt")
    VALUES(pg_temp.dm04_id('move-use:'||consumption),lot_id,consumption,need,'DA_CAP','DA_SU_DUNG',at0);
  END LOOP;
  tp_lot:=pg_temp.dm04_id('tp-lot:'||v.code);
  INSERT INTO "ProductLot" (id,"productId",code,"manufacturedAt","expiryDate","createdAt","runId")
   VALUES(tp_lot,product_id,'DM04-LO-'||v.code,made,(SELECT today+5 FROM dm04_context),at0+INTERVAL '10 minutes',run_id);
  INSERT INTO "ProductMovement" (id,"productId",quantity,"movementType","postedAt","runId")
   VALUES(pg_temp.dm04_id('move-run:'||v.code),product_id,v.accepted,'NHAP_SAN_XUAT',at0+INTERVAL '10 minutes',run_id);
  INSERT INTO "ProductLotMovement" (id,"lotId",location,quantity,"postedAt","runId")
   VALUES(pg_temp.dm04_id('ledger-run:'||v.code),tp_lot,'WAREHOUSE',v.accepted,at0+INTERVAL '10 minutes',run_id);
 END LOOP;
END $$;

-- E1. Mẻ brisket đã cấp dư 0.070 kg muối: hoàn 0.050, hao hụt 0.020.
DO $$
DECLARE l record; at0 timestamptz; doc uuid; ln uuid;
BEGIN
 SELECT il.* INTO STRICT l FROM "MaterialIssueLine" il JOIN "MaterialLot" lot ON lot.id=il."lotId"
 JOIN "Material" m ON m.id=lot."materialId"
 WHERE il."issueId"=pg_temp.dm04_id('issue:BRISKET') AND m.code='DM-NVL-MUOI';
 SELECT (made_day+TIME '20:20') AT TIME ZONE 'Asia/Ho_Chi_Minh' INTO at0 FROM dm04_context;
 doc:=pg_temp.dm04_id('return-salt');ln:=pg_temp.dm04_id('return-salt-line');
 INSERT INTO "MaterialReturn" (id,reason,status,"requestedAt","approvedAt","requestedById","reviewedById")
 VALUES(doc,'Muối dư còn sạch, đóng kín và hoàn kho.','APPROVED',at0,at0+INTERVAL '5 minutes',pg_temp.dm04_person('bep1'),pg_temp.dm04_person('kho'));
 INSERT INTO "MaterialReturnLine" (id,"returnId","issueLineId",quantity) VALUES(ln,doc,l.id,0.050);
 INSERT INTO "MaterialMovement" (id,"lotId","returnLineId",quantity,"fromSource","toSource","postedAt")
 VALUES(pg_temp.dm04_id('move-return-salt'),l."lotId",ln,0.050,'DA_CAP','TRONG_KHO',at0+INTERVAL '5 minutes');
 doc:=pg_temp.dm04_id('waste-salt');ln:=pg_temp.dm04_id('waste-salt-line');
 INSERT INTO "Waste" (id,reason,status,"reportedAt","approvedAt","reportedById","reviewedById")
 VALUES(doc,'Muối rơi vãi khi cân, không thu hồi sử dụng.','APPROVED',at0,at0+INTERVAL '5 minutes',pg_temp.dm04_person('bep1'),pg_temp.dm04_person('kho'));
 INSERT INTO "WasteLine" (id,"wasteId","sourceType","issueLineId",quantity) VALUES(ln,doc,'DA_CAP',l.id,0.020);
 INSERT INTO "MaterialMovement" (id,"lotId","wasteLineId",quantity,"fromSource","toSource","postedAt")
 VALUES(pg_temp.dm04_id('move-waste-salt'),l."lotId",ln,0.020,'DA_CAP','DA_HUY',at0+INTERVAL '5 minutes');
END $$;

-- E2. Lệnh còn mở, cấp NVL PENDING/REJECTED và sản lượng chưa nghiệm thu.
DO $$
DECLARE v record; p uuid; b uuid; ord uuid; who uuid; issue uuid; r uuid;
 bl record; lot uuid; ln uuid; c uuid; need numeric; used numeric;
BEGIN
 FOR v IN SELECT * FROM (VALUES
  ('PLAN','BRISKET',5::numeric,'NEW','bep1'),
  ('RECEIVED','GA-TAY',5::numeric,'RECEIVED','bep2'),
  ('WORKING','XUC-XICH',10::numeric,'IN_PROGRESS','bep1')
 ) t(k,code,qty,status,worker) LOOP
  SELECT id INTO STRICT p FROM "Product" WHERE code='DM-TP-'||v.code;
  SELECT id INTO STRICT b FROM "Bom" WHERE "productId"=p AND status='ACTIVE' AND "effectiveAt"<=CURRENT_TIMESTAMP ORDER BY "effectiveAt" DESC,version DESC LIMIT 1;
  ord:=pg_temp.dm04_id('open-order:'||v.k);who:=pg_temp.dm04_person(v.worker);
  INSERT INTO "ProductionOrder" (id,quantity,status,"assignedAt","dueAt","bomId","assignedById","assignedToId")
  VALUES(ord,v.qty,v.status,CURRENT_TIMESTAMP-INTERVAL '1 hour',CURRENT_TIMESTAMP+INTERVAL '1 day',b,pg_temp.dm04_person('beptruong'),who);
  IF v.k='RECEIVED' THEN
   SELECT id INTO STRICT lot FROM "MaterialLot" WHERE code='DM03-LO-GA-TAY-01';
   INSERT INTO "MaterialIssue" (id,"productionOrderId","requestedById",reason,status,"requestedAt")
   VALUES(pg_temp.dm04_id('issue-pending'),ord,who,'Cấp 2.7 kg cho lần chế biến đầu, phần còn lại chờ bổ sung.','PENDING',CURRENT_TIMESTAMP-INTERVAL '30 minutes');
   INSERT INTO "MaterialIssueLine" (id,"issueId","lotId","requestedQuantity")
   VALUES(pg_temp.dm04_id('issue-pending-line'),pg_temp.dm04_id('issue-pending'),lot,2.7);
   INSERT INTO "MaterialIssue" (id,"productionOrderId","requestedById",reason,status,"requestedAt","approvedAt","reviewedById","reviewNote")
   VALUES(pg_temp.dm04_id('issue-rejected'),ord,who,'Đề nghị cấp toàn bộ nguyên liệu mẻ mới.','REJECTED',CURRENT_TIMESTAMP-INTERVAL '55 minutes',CURRENT_TIMESTAMP-INTERVAL '45 minutes',pg_temp.dm04_person('kho'),'Chia lần cấp theo sức chứa bàn sơ chế; lập lại phiếu 2.7 kg trước.');
   INSERT INTO "MaterialIssueLine" (id,"issueId","lotId","requestedQuantity")
   VALUES(pg_temp.dm04_id('issue-rejected-line'),pg_temp.dm04_id('issue-rejected'),lot,6.75);
   INSERT INTO "MaterialShortage" (id,"productionOrderId","materialId",quantity,reason,status,"requestedAt","updatedAt","requestedById")
   SELECT pg_temp.dm04_id('shortage-pending'),ord,"materialId",15,'Đề nghị dự trữ thêm cho kế hoạch ngày mai, vượt lượng đang có ở kho.','PENDING',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,who FROM "MaterialLot" WHERE id=lot;
  ELSIF v.k='WORKING' THEN
   issue:=pg_temp.dm04_id('working-issue');r:=pg_temp.dm04_id('working-run');
   INSERT INTO "MaterialIssue" (id,"productionOrderId","requestedById",reason,status,"requestedAt","approvedAt","reviewedById","reviewNote")
   VALUES(issue,ord,who,'Cấp cho 10 cây xúc xích.','APPROVED',CURRENT_TIMESTAMP-INTERVAL '50 minutes',CURRENT_TIMESTAMP-INTERVAL '45 minutes',pg_temp.dm04_person('kho'),'Đã cấp đủ theo công thức.');
   INSERT INTO "ProductionRun" (id,"productionOrderId","performedById","actualQuantity",status,"recordedAt")
   VALUES(r,ord,who,5,'PENDING',CURRENT_TIMESTAMP-INTERVAL '20 minutes');
   FOR bl IN SELECT * FROM "BomLine" WHERE "bomId"=b LOOP
    need:=round(bl.quantity*10,3);used:=round(bl.quantity*5,3);
    SELECT l.id INTO lot FROM "MaterialLot" l JOIN "MaterialMovement" mm ON mm."lotId"=l.id
    WHERE l."materialId"=bl."materialId" AND (l."expiryDate" IS NULL OR l."expiryDate">=(SELECT today FROM dm04_context))
    GROUP BY l.id HAVING SUM(CASE WHEN mm."toSource"='TRONG_KHO' THEN mm.quantity ELSE 0 END-CASE WHEN mm."fromSource"='TRONG_KHO' THEN mm.quantity ELSE 0 END)>=need
    ORDER BY l."expiryDate" NULLS LAST LIMIT 1;
    IF lot IS NULL THEN RAISE EXCEPTION 'Thiếu NVL cho lệnh xúc xích đang làm.'; END IF;
    ln:=pg_temp.dm04_id('working-line:'||bl."materialId");c:=pg_temp.dm04_id('working-use:'||bl."materialId");
    INSERT INTO "MaterialIssueLine" (id,"issueId","lotId","requestedQuantity","issuedQuantity") VALUES(ln,issue,lot,need,need);
    INSERT INTO "MaterialMovement" (id,"lotId","issueLineId",quantity,"fromSource","toSource","postedAt") VALUES(pg_temp.dm04_id('working-issue-move:'||ln),lot,ln,need,'TRONG_KHO','DA_CAP',CURRENT_TIMESTAMP-INTERVAL '45 minutes');
    INSERT INTO "ConsumptionLine" (id,"runId","issueLineId",quantity) VALUES(c,r,ln,used);
    INSERT INTO "MaterialMovement" (id,"lotId","consumptionLineId",quantity,"fromSource","toSource","postedAt") VALUES(pg_temp.dm04_id('working-use-move:'||ln),lot,c,used,'DA_CAP','DA_SU_DUNG',CURRENT_TIMESTAMP-INTERVAL '20 minutes');
    IF bl."materialId"=(SELECT id FROM "Material" WHERE code='DM-NVL-SOT-BBQ') THEN
     INSERT INTO "MaterialReturn" (id,reason,status,"requestedById") VALUES(pg_temp.dm04_id('return-pending'),'Sốt dư sau đợt đầu, đề nghị hoàn.','PENDING',who);
     INSERT INTO "MaterialReturnLine" (id,"returnId","issueLineId",quantity) VALUES(pg_temp.dm04_id('return-pending-line'),pg_temp.dm04_id('return-pending'),ln,0.01);
    ELSE
     INSERT INTO "Waste" (id,reason,status,"reportedById") VALUES(pg_temp.dm04_id('waste-pending'),'Một cây bị rách vỏ khi thao tác, chờ quản lý duyệt.','PENDING',who);
     INSERT INTO "WasteLine" (id,"wasteId","sourceType","issueLineId",quantity) VALUES(pg_temp.dm04_id('waste-pending-line'),pg_temp.dm04_id('waste-pending'),'DA_CAP',ln,1);
    END IF;
   END LOOP;
  END IF;
 END LOOP;
END $$;

-- F. CHUYỂN THÀNH PHẨM SANG QUẦY, có phân bổ lô và hai sổ đối ứng.
CREATE TEMP TABLE dm04_transfer (
 code text, qty numeric(18,3), doc_key text, status text, note text
) ON COMMIT DROP;
INSERT INTO dm04_transfer SELECT code,dispatch_qty,'READY','APPROVED','Bàn giao thành phẩm đã nghiệm thu để mở bán.' FROM dm04_batches;
INSERT INTO dm04_transfer VALUES
 ('COCA',40,'DRINKS','APPROVED','Bổ sung nước đóng lon/chai ra quầy.'),
 ('COCA-ZERO',30,'DRINKS','APPROVED','Bổ sung nước đóng lon/chai ra quầy.'),
 ('NUOC-SUOI',50,'DRINKS','APPROVED','Bổ sung nước đóng lon/chai ra quầy.'),
 ('TRA-O-LONG',24,'DRINKS','APPROVED','Bổ sung nước đóng lon/chai ra quầy.'),
 ('BRISKET',0.5,'WAIT','PENDING','Kho còn hàng đã nấu; chờ quản lý bàn giao phần bổ sung ra quầy.'),
 ('GA-TAY',0.2,'NO','REJECTED','Không chuyển thêm vì quầy còn hàng; theo dõi bán trước.');
DO $$
DECLARE v record; alloc record; p uuid; d uuid; dl uuid; left_qty numeric; take_qty numeric; t timestamptz;
BEGIN
 SELECT (made_day+TIME '21:00') AT TIME ZONE 'Asia/Ho_Chi_Minh' INTO t FROM dm04_context;
 FOR v IN SELECT DISTINCT doc_key,status,note FROM dm04_transfer LOOP
  INSERT INTO "StoreDispatch" (id,status,reason,"requestedAt","approvedAt","requestedById","reviewedById")
  VALUES(pg_temp.dm04_id('dispatch:'||v.doc_key),v.status,v.note,t-INTERVAL '10 minutes',
   CASE WHEN v.status='PENDING' THEN NULL ELSE t END,pg_temp.dm04_person('nvkho'),
   CASE WHEN v.status='PENDING' THEN NULL ELSE pg_temp.dm04_person('kho') END);
 END LOOP;
 FOR v IN SELECT * FROM dm04_transfer ORDER BY CASE WHEN status='APPROVED' THEN 0 ELSE 1 END,doc_key,code LOOP
  SELECT id INTO STRICT p FROM "Product" WHERE code='DM-TP-'||v.code;
  d:=pg_temp.dm04_id('dispatch:'||v.doc_key);dl:=pg_temp.dm04_id('dispatch-line:'||v.doc_key||':'||v.code);
  INSERT INTO "StoreDispatchLine" (id,"dispatchId","productId",quantity) VALUES(dl,d,p,v.qty);
  left_qty:=v.qty;
  FOR alloc IN
   SELECT l.id,COALESCE(SUM(CASE WHEN m.location='WAREHOUSE' THEN m.quantity ELSE 0 END),0)
    -COALESCE((SELECT SUM(a.quantity) FROM "StoreDispatchLot" a JOIN "StoreDispatchLine" sl ON sl.id=a."dispatchLineId" JOIN "StoreDispatch" sd ON sd.id=sl."dispatchId" WHERE a."lotId"=l.id AND sd.status='PENDING'),0) AS available
   FROM "ProductLot" l LEFT JOIN "ProductLotMovement" m ON m."lotId"=l.id AND m."postedAt"<=t
   WHERE l."productId"=p AND l."expiryDate">=(SELECT today FROM dm04_context)
   GROUP BY l.id ORDER BY l."expiryDate",l.code
  LOOP
   take_qty:=LEAST(left_qty,GREATEST(0,alloc.available));IF take_qty<=0 THEN CONTINUE; END IF;
   INSERT INTO "StoreDispatchLot" (id,"dispatchLineId","lotId",quantity)
   VALUES(pg_temp.dm04_id('dispatch-lot:'||dl||':'||alloc.id),dl,alloc.id,take_qty);
   IF v.status='APPROVED' THEN
    INSERT INTO "ProductLotMovement" (id,"lotId",location,quantity,"postedAt","dispatchLineId") VALUES
    (pg_temp.dm04_id('dispatch-out:'||dl||':'||alloc.id),alloc.id,'WAREHOUSE',-take_qty,t,dl),
    (pg_temp.dm04_id('dispatch-in:'||dl||':'||alloc.id),alloc.id,'STORE',take_qty,t,dl);
   END IF;
   left_qty:=left_qty-take_qty;EXIT WHEN left_qty=0;
  END LOOP;
  IF left_qty>0 THEN RAISE EXCEPTION 'Không đủ lô TP để chuyển %; kiểm tra nhóm 03 hoặc khối A.',v.code; END IF;
  IF v.status='APPROVED' THEN
   INSERT INTO "ProductMovement" (id,"productId",quantity,"movementType","postedAt","dispatchLineId") VALUES(pg_temp.dm04_id('move-dispatch:'||dl),p,v.qty,'CHUYEN_CUA_HANG',t,dl);
   INSERT INTO "StoreMovement" (id,"productId",quantity,"movementType","postedAt","dispatchLineId") VALUES(pg_temp.dm04_id('store-dispatch:'||dl),p,v.qty,'IN_TRANSFER',t,dl);
  END IF;
 END LOOP;
END $$;

-- G. ĐƠN ĐÃ TRẢ TIỀN, giá dòng được lưu độc lập với giá hiện tại.
CREATE TEMP TABLE dm04_sale_lines (
 sale_id uuid, line_id uuid, product_id uuid, qty numeric(18,3), price numeric(18,2)
) ON COMMIT DROP;
DO $$
DECLARE i integer; n integer; v record; p record; s uuid; ln uuid; at0 timestamptz;
 made date; today date; paid_time timestamptz; price numeric; amount numeric;
 alloc record; left_qty numeric; take_qty numeric;
BEGIN
 SELECT count INTO n FROM dm04_paid_count;
 IF n<1 OR n>200 THEN RAISE EXCEPTION 'Số đơn mẫu phải từ 1 đến 200; thay số lượng thì phải cân đối lại tồn.'; END IF;
 SELECT x.made_day,x.today INTO made,today FROM dm04_context x;
 FOR i IN 1..n LOOP
  IF i<=n/2 THEN paid_time:=((made+TIME '22:00')+i*INTERVAL '4 minutes') AT TIME ZONE 'Asia/Ho_Chi_Minh';
  ELSE paid_time:=(today::timestamp AT TIME ZONE 'Asia/Ho_Chi_Minh')+
   (CURRENT_TIMESTAMP-(today::timestamp AT TIME ZONE 'Asia/Ho_Chi_Minh'))*((i-n/2)::numeric/(n-n/2+1)); END IF;
  s:=pg_temp.dm04_id('paid-sale:'||i);
  INSERT INTO "Sale" (id,code,status,"createdAt","closedAt","createdById","closedById",version)
  VALUES(s,'DM04-PAID-'||lpad(i::text,3,'0'),'COMPLETED',paid_time-INTERVAL '20 minutes',paid_time,pg_temp.dm04_person('phucvu1'),pg_temp.dm04_person('thungan'),2);
  FOR v IN
   SELECT code,qty FROM dm04_paid_menu WHERE pattern=mod(i,3)
   UNION ALL SELECT 'GA-TAY',0.15 WHERE mod(i,5)=0
   UNION ALL SELECT 'XUC-XICH',1 WHERE mod(i,4)=0
   UNION ALL SELECT 'BANH-BAP',1 WHERE mod(i,6)=0
   UNION ALL SELECT 'PUDDING',1 WHERE mod(i,7)=0
   UNION ALL SELECT 'DUA-CHUA',1 WHERE mod(i,8)=0
  LOOP
   SELECT * INTO STRICT p FROM "Product" WHERE code='DM-TP-'||v.code;
   ln:=pg_temp.dm04_id('paid-line:'||i||':'||v.code);
   price:=CASE WHEN v.code='BRISKET' AND i<=n/2 THEN 920000 ELSE p."sellingPrice" END;
   INSERT INTO "SaleLine" (id,"saleId","productId","productName",quantity,"unitPrice","sentAt","sentById",batch,note)
   VALUES(ln,s,p.id,p.name,v.qty,price,paid_time-INTERVAL '15 minutes',pg_temp.dm04_person('phucvu1'),1,'');
   INSERT INTO dm04_sale_lines VALUES(s,ln,p.id,v.qty,price);
   -- Phân bổ FEFO tại quầy; chỉ trừ lúc thanh toán.
   left_qty:=v.qty;
   FOR alloc IN SELECT l.id,SUM(m.quantity) AS available FROM "ProductLot" l
    JOIN "ProductLotMovement" m ON m."lotId"=l.id AND m.location='STORE' AND m."postedAt"<=paid_time
    WHERE l."productId"=p.id AND l."expiryDate">=today GROUP BY l.id ORDER BY l."expiryDate",l.code
   LOOP
    take_qty:=LEAST(left_qty,GREATEST(0,alloc.available));IF take_qty<=0 THEN CONTINUE; END IF;
    INSERT INTO "ProductLotMovement" (id,"lotId",location,quantity,"postedAt","saleLineId")
    VALUES(pg_temp.dm04_id('sold-lot:'||ln||':'||alloc.id),alloc.id,'STORE',-take_qty,paid_time,ln);
    left_qty:=left_qty-take_qty;EXIT WHEN left_qty=0;
   END LOOP;
   IF left_qty>0 THEN RAISE EXCEPTION 'Thiếu tồn quầy cho đơn %, món %. Giảm số đơn/khẩu phần hoặc tăng lượng chuyển ở khối A.',i,v.code; END IF;
   INSERT INTO "StoreMovement" (id,"productId",quantity,"movementType","postedAt","saleLineId")
   VALUES(pg_temp.dm04_id('sold:'||ln),p.id,v.qty,'SALE',paid_time,ln);
  END LOOP;
  SELECT round(SUM(l.qty*l.price),2) INTO amount FROM dm04_sale_lines l WHERE l.sale_id=s;
  INSERT INTO "Payment" (id,"saleId",amount,method,status,"paidAt","receivedById")
  VALUES(pg_temp.dm04_id('payment:'||i),s,amount,CASE WHEN mod(i,2)=0 THEN 'TRANSFER' ELSE 'CASH' END,'PAID',paid_time,pg_temp.dm04_person('thungan'));
 END LOOP;
END $$;

-- H. ĐƠN MỞ + LỊCH SỬ BỎ MÓN. Không tạo thanh toán/biến động cho đơn mở.
DO $$
DECLARE v record; item record; s uuid; t uuid; p record; at0 timestamptz; ln uuid;
BEGIN
 at0:=CURRENT_TIMESTAMP-INTERVAL '30 minutes';
 FOR v IN SELECT sale_key,table_name,bool_or(confirmed) AS confirmed FROM dm04_open_lines GROUP BY sale_key,table_name LOOP
  t:=NULL;IF v.table_name IS NOT NULL THEN SELECT id INTO STRICT t FROM "DiningTable" WHERE name=v.table_name;END IF;
  s:=pg_temp.dm04_id('open-sale:'||v.sale_key);
  INSERT INTO "Sale" (id,code,status,"tableId","createdAt","createdById",version)
  VALUES(s,'DM04-'||v.sale_key,CASE WHEN v.confirmed THEN 'CONFIRMED' ELSE 'DRAFT' END,t,at0,pg_temp.dm04_person('phucvu1'),1);
  FOR item IN SELECT * FROM dm04_open_lines WHERE sale_key=v.sale_key LOOP
   SELECT * INTO STRICT p FROM "Product" WHERE code='DM-TP-'||item.code;
   INSERT INTO "SaleLine" (id,"saleId","productId","productName",quantity,"unitPrice","sentAt","sentById",batch,note)
   VALUES(pg_temp.dm04_id('open-line:'||v.sale_key||':'||item.code),s,p.id,p.name,item.qty,p."sellingPrice",
    CASE WHEN item.confirmed THEN at0+INTERVAL '2 minutes' ELSE NULL END,
    CASE WHEN item.confirmed THEN pg_temp.dm04_person('phucvu1') ELSE NULL END,
    CASE WHEN item.confirmed THEN 1 ELSE NULL END,
    CASE WHEN v.sale_key='THIEU-HANG' THEN 'Khách muốn 10 kg; nháp chưa giữ hàng, cần giảm theo lượng có sẵn.' ELSE '' END);
  END LOOP;
 END LOOP;
 -- Một dòng đã bỏ hoàn toàn trong đơn CHO-THU, còn audit để xem.
 SELECT * INTO STRICT p FROM "Product" WHERE code='DM-TP-GA-TAY';
 ln:=pg_temp.dm04_id('cancelled-line-on-open');s:=pg_temp.dm04_id('open-sale:CHO-THU');
 INSERT INTO "SaleLine" (id,"saleId","productId","productName",quantity,"unitPrice","sentAt","sentById",batch,note)
 VALUES(ln,s,p.id,p.name,0,p."sellingPrice",at0,pg_temp.dm04_person('phucvu1'),1,'Khách bỏ món trước khi sử dụng.');
 INSERT INTO "SaleLineChange" (id,"saleLineId","previousQuantity",quantity,reason,"changedAt","changedById")
 VALUES(pg_temp.dm04_id('cancelled-line-audit'),ln,0.25,0.25,'Khách đổi ý, chưa dùng món.',at0+INTERVAL '5 minutes',pg_temp.dm04_person('phucvu1'));
 -- Một đơn hủy toàn bộ, không có payment hoặc xuất kho.
 s:=pg_temp.dm04_id('cancelled-sale');
 INSERT INTO "Sale" (id,code,status,"createdAt","closedAt","createdById","closedById",version)
 VALUES(s,'DM04-HUY-KHACH-DOI-Y','CANCELLED',at0,at0+INTERVAL '10 minutes',pg_temp.dm04_person('phucvu1'),pg_temp.dm04_person('quanly'),2);
 ln:=pg_temp.dm04_id('cancelled-sale-line');
 INSERT INTO "SaleLine" (id,"saleId","productId","productName",quantity,"unitPrice",note) VALUES(ln,s,p.id,p.name,0,p."sellingPrice",'');
 INSERT INTO "SaleLineChange" (id,"saleLineId","previousQuantity",quantity,reason,"changedAt","changedById")
 VALUES(pg_temp.dm04_id('cancelled-sale-audit'),ln,0.5,0.5,'Khách rời cửa hàng trước khi xác nhận món.',at0+INTERVAL '10 minutes',pg_temp.dm04_person('quanly'));
END $$;

-- I. HOÀN/HỦY CỬA HÀNG: có PENDING / APPROVED / REJECTED.
DO $$
DECLARE v record; p uuid; l uuid; a uuid; avail numeric; t timestamptz;
BEGIN
 t:=CURRENT_TIMESTAMP;
 FOR v IN SELECT * FROM (VALUES
  ('HOAN-NUOC','COCA',2::numeric,'RETURN','APPROVED','Lon còn nguyên, đã nhận hoàn về kho.'),
  ('HUY-COLESLAW','COLESLAW',1::numeric,'WASTE','APPROVED','Món bị đổ tại quầy, không sử dụng lại.'),
  ('HOAN-CHO','NUOC-SUOI',2::numeric,'RETURN','PENDING','Nước đóng chai chưa mở, chờ kho nhận hoàn.'),
  ('HUY-CHO','DAU-HAM',1::numeric,'WASTE','PENDING','Một phần bị đổ, tách riêng chờ duyệt.'),
  ('HOAN-TU-CHOI','SUON-HEO',0.1::numeric,'RETURN','REJECTED','Không nhận hoàn; tiếp tục bảo quản phục vụ tại quầy.')
 ) z(k,code,qty,kind,status,reason) LOOP
  SELECT id INTO STRICT p FROM "Product" WHERE code='DM-TP-'||v.code;
  SELECT lot.id INTO l FROM "ProductLot" lot JOIN "ProductLotMovement" m ON m."lotId"=lot.id AND m.location='STORE'
  WHERE lot."productId"=p AND lot."expiryDate">=(SELECT today FROM dm04_context)
  GROUP BY lot.id HAVING SUM(m.quantity)>=v.qty ORDER BY lot."expiryDate",lot.code LIMIT 1;
  IF l IS NULL THEN RAISE EXCEPTION 'Không đủ lô cửa hàng để mô phỏng %.',v.k;END IF;
  a:=pg_temp.dm04_id('adjust:'||v.k);
  INSERT INTO "StoreAdjustment" (id,"productId","lotId",quantity,kind,status,reason,"requestedAt","approvedAt","requestedById","reviewedById")
  VALUES(a,p,l,v.qty,v.kind,v.status,v.reason,t,
   CASE WHEN v.status='PENDING' THEN NULL ELSE t END,pg_temp.dm04_person('quanly'),
   CASE WHEN v.status='PENDING' THEN NULL ELSE pg_temp.dm04_person('kho') END);
  IF v.status='APPROVED' THEN
   INSERT INTO "StoreMovement" (id,"productId",quantity,"movementType","postedAt","adjustmentId") VALUES(pg_temp.dm04_id('adjust-store:'||a),p,v.qty,v.kind,t,a);
   INSERT INTO "ProductLotMovement" (id,"lotId",location,quantity,"postedAt","adjustmentId") VALUES(pg_temp.dm04_id('adjust-ledger-store:'||a),l,'STORE',-v.qty,t,a);
   IF v.kind='RETURN' THEN
    INSERT INTO "ProductMovement" (id,"productId",quantity,"movementType","postedAt","storeAdjustmentId") VALUES(pg_temp.dm04_id('adjust-warehouse:'||a),p,v.qty,'HOAN_CUA_HANG',t,a);
    INSERT INTO "ProductLotMovement" (id,"lotId",location,quantity,"postedAt","adjustmentId") VALUES(pg_temp.dm04_id('adjust-ledger-warehouse:'||a),l,'WAREHOUSE',v.qty,t,a);
   END IF;
  END IF;
 END LOOP;
END $$;

-- J. HỦY LÔ HẾT HẠN TẠI KHO: giữ lô và chứng từ, không xóa lịch sử.
DO $$
DECLARE l record; w uuid; wl uuid; qty numeric; d uuid;
BEGIN
 SELECT lot.* INTO l FROM "MaterialLot" lot WHERE code='DM03-LO-SUA-HET-HAN';
 IF l.id IS NOT NULL THEN
  SELECT COALESCE(SUM(CASE WHEN m."toSource"='TRONG_KHO' THEN m.quantity ELSE 0 END-CASE WHEN m."fromSource"='TRONG_KHO' THEN m.quantity ELSE 0 END),0) INTO qty FROM "MaterialMovement" m WHERE m."lotId"=l.id;
  IF qty>0 THEN
   w:=pg_temp.dm04_id('expired-milk');wl:=pg_temp.dm04_id('expired-milk-line');
   INSERT INTO "Waste" (id,reason,status,"reportedById","reviewedById","approvedAt") VALUES(w,'Sữa hết hạn; hủy toàn bộ số dư của lô.','APPROVED',pg_temp.dm04_person('nvkho'),pg_temp.dm04_person('kho'),CURRENT_TIMESTAMP);
   INSERT INTO "WasteLine" (id,"wasteId","sourceType","lotId",quantity) VALUES(wl,w,'TRONG_KHO',l.id,qty);
   INSERT INTO "MaterialMovement" (id,"lotId","wasteLineId",quantity,"fromSource","toSource") VALUES(pg_temp.dm04_id('expired-milk-move'),l.id,wl,qty,'TRONG_KHO','DA_HUY');
  END IF;
 END IF;
 SELECT lot.* INTO l FROM "ProductLot" lot WHERE code='DM03-LO-TP-COCA-HET-HAN';
 IF l.id IS NOT NULL THEN
  SELECT COALESCE(SUM(quantity),0) INTO qty FROM "ProductLotMovement" WHERE "lotId"=l.id AND location='WAREHOUSE';
  IF qty>0 THEN
   d:=pg_temp.dm04_id('expired-coke');
   INSERT INTO "ProductLotDisposal" (id,"lotId",quantity,reason,"createdById") VALUES(d,l.id,qty,'Nước đóng lon hết hạn, hủy tại kho.',pg_temp.dm04_person('kho'));
   INSERT INTO "ProductMovement" (id,"productId",quantity,"movementType","lotDisposalId") VALUES(pg_temp.dm04_id('expired-coke-move'),l."productId",qty,'HUY_LO',d);
   INSERT INTO "ProductLotMovement" (id,"lotId",location,quantity,"disposalId") VALUES(pg_temp.dm04_id('expired-coke-ledger'),l.id,'WAREHOUSE',-qty,d);
  END IF;
 END IF;
END $$;

-- K. RÀNG BUỘC CÂN ĐỐI TRƯỚC COMMIT (không sửa/che tồn âm).
DO $$
BEGIN
 IF EXISTS(SELECT 1 FROM "MaterialLot" l JOIN "MaterialMovement" m ON m."lotId"=l.id
 GROUP BY l.id HAVING SUM(CASE WHEN m."toSource"='TRONG_KHO' THEN m.quantity ELSE 0 END-CASE WHEN m."fromSource"='TRONG_KHO' THEN m.quantity ELSE 0 END)<0)
 THEN RAISE EXCEPTION 'NVL âm: điều chỉnh lượng mẻ ở A hoặc nhập thêm NVL.';END IF;
 IF EXISTS(SELECT 1 FROM "ProductLotMovement" GROUP BY "lotId",location HAVING SUM(quantity)<0)
 THEN RAISE EXCEPTION 'Tồn thành phẩm theo lô âm; cân đối lại chuyển/bán/hoàn-hủy.';END IF;
 IF EXISTS(
  SELECT 1 FROM "Product" p
  LEFT JOIN LATERAL (SELECT COALESCE(SUM(quantity),0) q FROM "ProductLotMovement" m JOIN "ProductLot" l ON l.id=m."lotId" WHERE l."productId"=p.id AND m.location='STORE' AND l."expiryDate">=(SELECT today FROM dm04_context)) st ON true
  LEFT JOIN LATERAL (SELECT COALESCE(SUM(sl.quantity),0) q FROM "SaleLine" sl JOIN "Sale" s ON s.id=sl."saleId" WHERE sl."productId"=p.id AND sl."sentAt" IS NOT NULL AND s.status='CONFIRMED') held ON true
  LEFT JOIN LATERAL (SELECT COALESCE(SUM(quantity),0) q FROM "StoreAdjustment" WHERE "productId"=p.id AND status='PENDING') adj ON true
  WHERE p.code LIKE 'DM-TP-%' AND st.q<held.q+adj.q
 ) THEN RAISE EXCEPTION 'Đơn xác nhận/phiếu chờ giữ quá lượng tại quầy. Giảm lượng khối C hoặc tăng lượng chuyển khối A.';END IF;
END $$;

-- =====================================================================
-- KẾT QUẢ: xem tại pgAdmin; đây là truy vấn đọc, có thể chạy lại riêng.
-- =====================================================================
SELECT code,status,"createdAt","closedAt" FROM "Sale" WHERE code LIKE 'DM04-%' ORDER BY code;
SELECT p.code,p.name,o.status,o.quantity,e.name AS worker
FROM "ProductionOrder" o JOIN "Bom" b ON b.id=o."bomId" JOIN "Product" p ON p.id=b."productId"
JOIN "Employee" e ON e.id=o."assignedToId"
WHERE o.id IN (SELECT pg_temp.dm04_id('order:'||s) FROM unnest(ARRAY['BRISKET','SUON-HEO','HEO-XE','GA-TAY','XUC-XICH','DAU-HAM','COLESLAW','SALAD-KHOAI','DUA-CHUA','BANH-BAP','PUDDING']) s)
OR o.id IN (pg_temp.dm04_id('open-order:PLAN'),pg_temp.dm04_id('open-order:RECEIVED'),pg_temp.dm04_id('open-order:WORKING'))
ORDER BY p.code,o.status;
SELECT COUNT(*) AS paid_orders,SUM(p.amount) AS total_paid
FROM "Payment" p JOIN "Sale" s ON s.id=p."saleId" WHERE s.code LIKE 'DM04-PAID-%';

-- CÁCH XEM TRÊN WEB:
-- demo.bbq.bep1/bep2: Lệnh chế biến -> Làm việc / Chờ xử lý / Lịch sử.
-- demo.bbq.kho: phiếu cấp chờ/từ chối, hoàn/hao hụt, nghiệm thu xúc xích,
--              phiếu chuyển brisket đang chờ; hủy lô chuối hết hạn còn lại.
-- demo.bbq.quanly: Tồn cửa hàng -> hết bánh bắp/pudding tại quầy,
--                 xem hoàn/hủy đang chờ và lịch sử đã xử lý.
-- demo.bbq.phucvu1: A01 chờ thu, A02 gọi thêm, A03 nháp thiếu hàng.
-- demo.bbq.thungan: thu tiền A01, không cần ghi số đã phục vụ.
-- Báo cáo: chọn Khoảng ngày từ ngày nhóm 03 đến hôm nay; lọc món/phương thức,
--          bấm biểu đồ hoặc món để tra cứu đơn, xuất CSV.
-- Toàn bộ tài khoản mới nhóm 01 dùng mật khẩu BbqDemo2026!.
-- Ghi chú sửa tay: muốn thêm món, thêm dòng A và bảo đảm có Product + BOM;
-- muốn thêm món vào đơn thì thêm B/C. Tồn và tổng tiền được tính theo dữ liệu.
-- Chạy lại file này không cập nhật dữ liệu đã nhập. Sau COMMIT, hãy sửa qua web
-- hoặc viết UPDATE/INSERT riêng cho thay đổi cụ thể bạn muốn kiểm soát.

-- Chỉ ghi dữ liệu khi tất cả 4 nhóm đã hoàn thành.
COMMIT;


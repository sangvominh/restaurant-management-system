-- Dữ liệu trình diễn riêng: lệnh đã cấp nguyên liệu giả lập.
INSERT INTO materials (code, name, min_stock, unit_id, category_id) SELECT 'DEMO-NVL03', 'Hành tây', 2, unit_id, category_id FROM materials WHERE code='TEST-NVL001' ON CONFLICT (code) DO NOTHING;
INSERT INTO material_lots (material_id, lot_code, expiry_date) SELECT id, 'DEMO-LO-02', '2027-06-30' FROM materials WHERE code='DEMO-NVL03' ON CONFLICT (material_id, lot_code) DO NOTHING;
INSERT INTO material_balances (location_id, material_lot_id, quantity) SELECT w.id, l.id, 10 FROM warehouse_locations w JOIN branches b ON b.id=w.branch_id JOIN material_lots l ON l.lot_code='DEMO-LO-02' WHERE b.code='TEST-CN01' AND w.name='Kho lạnh' ON CONFLICT (location_id, material_lot_id) DO NOTHING;
INSERT INTO products (code, name, category, price, updated_at) VALUES ('DEMO-TP01', 'Bò chế biến mẫu', 'Món mẫu', 50000, now()) ON CONFLICT (code) DO NOTHING;
INSERT INTO boms (code, product_code, version, output_quantity) VALUES ('DEMO-BOM01', 'DEMO-TP01', 1, 1) ON CONFLICT (code) DO NOTHING;
INSERT INTO bom_details (bom_id, material_id, unit_id, quantity) SELECT b.id, m.id, m.unit_id, 0.1 FROM boms b CROSS JOIN materials m WHERE b.code='DEMO-BOM01' AND m.code='TEST-NVL001' ON CONFLICT (bom_id, material_id) DO NOTHING;
INSERT INTO production_orders (code, bom_id, branch_id, production_mode, quantity, status, material_status, assigned_employee_code) SELECT 'LSX-001', bom.id, br.id, 'MAKE_TO_STOCK', 5, 'PENDING', 'ISSUED', 'DEMO-KITCHEN' FROM boms bom CROSS JOIN branches br WHERE bom.code='DEMO-BOM01' AND br.code='TEST-CN01' ON CONFLICT (code) DO NOTHING;
-- Một nguyên liệu khác để thử chọn nhiều loại.
INSERT INTO materials (code, name, min_stock, unit_id, category_id) SELECT 'DEMO-NVL02', 'Cà chua', 2, unit_id, category_id FROM materials WHERE code='TEST-NVL001' ON CONFLICT (code) DO NOTHING;
INSERT INTO material_lots (material_id, lot_code, expiry_date) SELECT id, 'DEMO-CA-01', '2027-06-30' FROM materials WHERE code='DEMO-NVL02' ON CONFLICT (material_id, lot_code) DO NOTHING;
INSERT INTO material_balances (location_id, material_lot_id, quantity) SELECT w.id, l.id, 12 FROM warehouse_locations w JOIN branches b ON b.id=w.branch_id JOIN material_lots l ON l.lot_code='DEMO-CA-01' WHERE b.code='TEST-CN01' AND w.name='Kho lạnh' ON CONFLICT (location_id, material_lot_id) DO NOTHING;
-- Lệnh mẫu riêng để thao tác; không đặt lại lệnh đã có hoặc xoá lịch sử.
INSERT INTO production_orders (code, bom_id, branch_id, production_mode, quantity, status, material_status, assigned_employee_code) SELECT 'LSX-002', bom.id, br.id, 'MAKE_TO_STOCK', 5, 'PENDING', 'ISSUED', 'DEMO-KITCHEN' FROM boms bom CROSS JOIN branches br WHERE bom.code='DEMO-BOM01' AND br.code='TEST-CN01' ON CONFLICT (code) DO NOTHING;
INSERT INTO production_orders (code, bom_id, branch_id, production_mode, quantity, status, material_status, assigned_employee_code) SELECT 'LSX-003', bom.id, br.id, 'MAKE_TO_STOCK', 3, 'COMPLETED', 'ISSUED', 'DEMO-KITCHEN' FROM boms bom CROSS JOIN branches br WHERE bom.code='DEMO-BOM01' AND br.code='TEST-CN01' ON CONFLICT (code) DO NOTHING;
-- Các mã cũ đã dùng trước đây được giữ nguyên nếu tồn tại; dữ liệu mẫu mới dùng mã ngắn.
-- Một ca đã kết thúc để trình diễn lịch sử, không tạo ca đang hoạt động.
INSERT INTO staff_shifts (id, user_id, started_at, ended_at, handover_note) SELECT '10000000-0000-4000-8000-000000000901', id, now() - interval '1 day', now() - interval '16 hours', 'Ca mẫu bàn giao' FROM staff_users WHERE code='DEMO-KITCHEN' ON CONFLICT (id) DO NOTHING;
-- Tồn thành phẩm mẫu để thử đề nghị xuất; không ghi đè tồn đã thay đổi.
INSERT INTO finished_goods_balances (product_code, location_id, quantity) SELECT 'DEMO-TP01', w.id, 8 FROM warehouse_locations w JOIN branches b ON b.id=w.branch_id WHERE b.code='TEST-CN01' AND w.name='Kho lạnh' ON CONFLICT (product_code, location_id) DO NOTHING;
-- Lệnh thực hành mới; trạng thái cấp kho chỉ là dữ liệu mẫu.
INSERT INTO production_orders (code, bom_id, branch_id, production_mode, quantity, status, material_status, assigned_employee_code) SELECT 'LSX-004', bom.id, br.id, 'MAKE_TO_STOCK', 5, 'PENDING', 'ISSUED', 'DEMO-KITCHEN' FROM boms bom CROSS JOIN branches br WHERE bom.code='DEMO-BOM01' AND br.code='TEST-CN01' ON CONFLICT (code) DO NOTHING;

-- Sample data for apps/restaurant-web.
-- Safe to run repeatedly: existing rows with the same codes are left unchanged.
BEGIN;

INSERT INTO branches (code, name)
VALUES ('BR001', 'Chi nhánh Mộc - thử nghiệm')
ON CONFLICT (code) DO NOTHING;

INSERT INTO units (name, conversion_factor)
VALUES ('kg', 1)
ON CONFLICT (name) DO NOTHING;

INSERT INTO categories (code, name, category_type)
VALUES
  ('DM-TEST-THIT', 'Thịt thử nghiệm', 'MATERIAL'),
  ('DM-TEST-GV', 'Gia vị thử nghiệm', 'MATERIAL'),
  ('DM-TEST-GAO', 'Ngũ cốc thử nghiệm', 'MATERIAL')
ON CONFLICT (code) DO NOTHING;

INSERT INTO materials (code, name, min_stock, unit_id, category_id)
SELECT sample.code, sample.name, sample.min_stock, u.id, c.id
FROM (VALUES
  ('TEST-NVL-001', 'Thịt bò', 5::numeric, 'Thịt thử nghiệm'),
  ('TEST-NVL-002', 'Thịt gà', 5::numeric, 'Thịt thử nghiệm'),
  ('TEST-NVL-003', 'Gạo', 10::numeric, 'Ngũ cốc thử nghiệm'),
  ('TEST-NVL-004', 'Mật ong', 2::numeric, 'Gia vị thử nghiệm')
) AS sample(code, name, min_stock, category_name)
CROSS JOIN units u
JOIN categories c ON c.name = sample.category_name AND c.category_type = 'MATERIAL'
WHERE u.name = 'kg'
ON CONFLICT (code) DO NOTHING;

INSERT INTO warehouse_locations (branch_id, name, location_type)
SELECT b.id, sample.name, sample.location_type
FROM branches b
CROSS JOIN (VALUES
  ('Kho nguyên liệu', 'RAW_MATERIAL'),
  ('Kho thành phẩm', 'FINISHED_GOODS')
) AS sample(name, location_type)
WHERE b.code = 'BR001'
ON CONFLICT (branch_id, name) DO NOTHING;

INSERT INTO products (code, name, category, price, unit, description)
VALUES
  ('TEST-MON-001', 'Bò lúc lắc', 'Món chính', 89000, 'phần', 'Món mẫu để kiểm thử tồn kho và công thức.'),
  ('TEST-MON-002', 'Gà nướng mật ong', 'Món chính', 79000, 'phần', 'Món mẫu có định lượng thịt gà và mật ong.'),
  ('TEST-MON-003', 'Cơm bò', 'Cơm', 59000, 'phần', 'Món mẫu dùng để tìm kiếm và lập công thức.')
ON CONFLICT (code) DO NOTHING;

INSERT INTO boms (code, product_code, product_name, output_quantity, status)
VALUES
  ('TEST-BOM-001', 'TEST-MON-001', 'Bò lúc lắc', 1, 'ACTIVE'),
  ('TEST-BOM-002', 'TEST-MON-002', 'Gà nướng mật ong', 1, 'ACTIVE'),
  ('TEST-BOM-003', 'TEST-MON-003', 'Cơm bò', 1, 'ACTIVE')
ON CONFLICT (code) DO NOTHING;

INSERT INTO bom_details (bom_id, material_id, unit_id, quantity)
SELECT b.id, m.id, u.id, sample.quantity
FROM (VALUES
  ('TEST-BOM-001', 'TEST-NVL-001', 0.25::numeric),
  ('TEST-BOM-001', 'TEST-NVL-003', 0.18::numeric),
  ('TEST-BOM-002', 'TEST-NVL-002', 0.30::numeric),
  ('TEST-BOM-002', 'TEST-NVL-003', 0.18::numeric),
  ('TEST-BOM-002', 'TEST-NVL-004', 0.02::numeric),
  ('TEST-BOM-003', 'TEST-NVL-001', 0.15::numeric),
  ('TEST-BOM-003', 'TEST-NVL-003', 0.20::numeric)
) AS sample(bom_code, material_code, quantity)
JOIN boms b ON b.code = sample.bom_code
JOIN materials m ON m.code = sample.material_code
JOIN units u ON u.id = m.unit_id
ON CONFLICT (bom_id, material_id) DO NOTHING;

INSERT INTO material_lots (material_id, lot_code, expiry_date)
SELECT m.id, sample.lot_code, sample.expiry_date::date
FROM (VALUES
  ('TEST-NVL-001', 'TEST-LOT-001', '2027-12-31'),
  ('TEST-NVL-002', 'TEST-LOT-002', '2027-12-31'),
  ('TEST-NVL-003', 'TEST-LOT-003', '2027-12-31'),
  ('TEST-NVL-004', 'TEST-LOT-004', '2027-12-31')
) AS sample(material_code, lot_code, expiry_date)
JOIN materials m ON m.code = sample.material_code
ON CONFLICT (material_id, lot_code) DO NOTHING;

INSERT INTO material_balances (location_id, material_lot_id, quantity)
SELECT l.id, ml.id, sample.quantity
FROM (VALUES
  ('TEST-NVL-001', 'TEST-LOT-001', 30::numeric),
  ('TEST-NVL-002', 'TEST-LOT-002', 24::numeric),
  ('TEST-NVL-003', 'TEST-LOT-003', 50::numeric),
  ('TEST-NVL-004', 'TEST-LOT-004', 8::numeric)
) AS sample(material_code, lot_code, quantity)
JOIN materials m ON m.code = sample.material_code
JOIN material_lots ml ON ml.material_id = m.id AND ml.lot_code = sample.lot_code
JOIN warehouse_locations l ON l.name = 'Kho nguyên liệu'
JOIN branches br ON br.id = l.branch_id AND br.code = 'BR001'
ON CONFLICT (location_id, material_lot_id) DO NOTHING;

INSERT INTO finished_goods_balances (product_code, location_id, quantity)
SELECT sample.product_code, l.id, sample.quantity
FROM (VALUES
  ('TEST-MON-001', 50::numeric),
  ('TEST-MON-002', 16::numeric),
  ('TEST-MON-003', 9::numeric)
) AS sample(product_code, quantity)
JOIN warehouse_locations l ON l.name = 'Kho thành phẩm'
JOIN branches br ON br.id = l.branch_id AND br.code = 'BR001'
ON CONFLICT (product_code, location_id) DO NOTHING;

INSERT INTO production_orders (code, bom_id, branch_id, production_mode, quantity, status, material_status, note)
SELECT sample.code, b.id, br.id, 'IN_HOUSE', sample.quantity, sample.status, sample.material_status, sample.note
FROM (VALUES
  ('TEST-PO-001', 'TEST-BOM-001', 25::numeric, 'WAITING_APPROVAL', 'ISSUED', 'Lệnh mẫu có phiếu chờ duyệt.'),
  ('TEST-PO-002', 'TEST-BOM-002', 16::numeric, 'WAITING_APPROVAL', 'ISSUED', 'Lệnh mẫu để thử từ chối phiếu.'),
  ('TEST-PO-003', 'TEST-BOM-001', 20::numeric, 'COMPLETED', 'ISSUED', 'Lệnh mẫu có hao hụt chờ duyệt.'),
  ('TEST-PO-004', 'TEST-BOM-001', 18::numeric, 'COMPLETED', 'ISSUED', 'Lệnh mẫu có hao hụt đã duyệt.'),
  ('TEST-PO-005', 'TEST-BOM-002', 15::numeric, 'COMPLETED', 'ISSUED', 'Lệnh mẫu có hao hụt bị từ chối.')
) AS sample(code, bom_code, quantity, status, material_status, note)
JOIN boms b ON b.code = sample.bom_code
JOIN branches br ON br.code = 'BR001'
ON CONFLICT (code) DO NOTHING;

INSERT INTO finished_goods_receipts (
  code, production_order_id, reported_quantity, accepted_quantity, rejected_quantity,
  status, note, inspection_note, created_at, approved_at, inspected_at
)
SELECT sample.code, po.id, sample.reported_quantity, sample.accepted_quantity, sample.rejected_quantity,
       sample.status, sample.note, sample.inspection_note, now() - sample.age,
       sample.approved_at, sample.inspected_at
FROM (VALUES
  ('TEST-FGR-001', 'TEST-PO-001', 25::numeric, NULL::numeric, NULL::numeric, 'PENDING', 'Phiếu chờ duyệt, có thể thử duyệt.', NULL::text, interval '1 hour', NULL::timestamptz, NULL::timestamptz),
  ('TEST-FGR-002', 'TEST-PO-002', 16::numeric, NULL::numeric, NULL::numeric, 'PENDING', 'Phiếu chờ xử lý, có thể thử từ chối.', NULL::text, interval '2 hours', NULL::timestamptz, NULL::timestamptz),
  ('TEST-FGR-003', 'TEST-PO-003', 20::numeric, 18::numeric, 2::numeric, 'APPROVED', 'Phiếu đã duyệt, có hao hụt chờ xử lý.', 'Loại 2 phần không đạt.', interval '1 day', now() - interval '23 hours', now() - interval '23 hours'),
  ('TEST-FGR-004', 'TEST-PO-004', 18::numeric, 17::numeric, 1::numeric, 'APPROVED', 'Phiếu đã duyệt, hao hụt đã xử lý.', 'Loại 1 phần không đạt.', interval '2 days', now() - interval '47 hours', now() - interval '47 hours'),
  ('TEST-FGR-005', 'TEST-PO-005', 15::numeric, 12::numeric, 3::numeric, 'APPROVED', 'Phiếu đã duyệt, hao hụt bị từ chối.', 'Loại 3 phần không đạt.', interval '3 days', now() - interval '71 hours', now() - interval '71 hours')
) AS sample(code, order_code, reported_quantity, accepted_quantity, rejected_quantity, status, note, inspection_note, age, approved_at, inspected_at)
JOIN production_orders po ON po.code = sample.order_code
ON CONFLICT (code) DO NOTHING;

-- A separate rejected receipt needs its own production order because each order has one receipt.
INSERT INTO production_orders (code, bom_id, branch_id, production_mode, quantity, status, material_status, note)
SELECT 'TEST-PO-006', b.id, br.id, 'IN_HOUSE', 25, 'IN_PROGRESS', 'ISSUED', 'Lệnh có phiếu mẫu đã bị từ chối.'
FROM boms b
JOIN branches br ON br.code = 'BR001'
WHERE b.code = 'TEST-BOM-001'
ON CONFLICT (code) DO NOTHING;

INSERT INTO finished_goods_receipts (
  code, production_order_id, reported_quantity, status, note, inspection_note, created_at, inspected_at
)
SELECT 'TEST-FGR-006', po.id, 25, 'REJECTED', 'Phiếu mẫu đã bị từ chối để kiểm tra bộ lọc.',
       'Số liệu báo cáo cần kiểm tra lại.', now() - interval '4 days', now() - interval '95 hours'
FROM production_orders po
WHERE po.code = 'TEST-PO-006'
ON CONFLICT (code) DO NOTHING;

INSERT INTO finished_goods_movements (
  receipt_id, product_code, location_id, quantity_before, quantity_change, quantity_after, created_at
)
SELECT r.id, sample.product_code, l.id, sample.quantity_before, sample.quantity_change,
       sample.quantity_before + sample.quantity_change, now() - sample.age
FROM (VALUES
  ('TEST-FGR-003', 'TEST-MON-001', 15::numeric, 18::numeric, interval '1 day'),
  ('TEST-FGR-004', 'TEST-MON-001', 33::numeric, 17::numeric, interval '2 days'),
  ('TEST-FGR-005', 'TEST-MON-002', 4::numeric, 12::numeric, interval '3 days')
) AS sample(receipt_code, product_code, quantity_before, quantity_change, age)
JOIN finished_goods_receipts r ON r.code = sample.receipt_code
JOIN warehouse_locations l ON l.name = 'Kho thành phẩm'
JOIN branches br ON br.id = l.branch_id AND br.code = 'BR001'
ON CONFLICT (receipt_id) DO NOTHING;

INSERT INTO waste_requests (code, receipt_id, quantity, reason, status, decision_note, created_at, processed_at)
SELECT sample.code, r.id, sample.quantity, sample.reason, sample.status, sample.decision_note,
       now() - sample.age, sample.processed_at
FROM (VALUES
  ('TEST-WASTE-001', 'TEST-FGR-003', 2::numeric, 'Món bị lỗi trong quá trình chế biến.', 'PENDING', NULL::text, interval '22 hours', NULL::timestamptz),
  ('TEST-WASTE-002', 'TEST-FGR-004', 1::numeric, 'Thành phẩm không đạt tiêu chuẩn.', 'APPROVED', NULL::text, interval '46 hours', now() - interval '45 hours'),
  ('TEST-WASTE-003', 'TEST-FGR-005', 3::numeric, 'Món bị cháy, cần ghi nhận hao hụt.', 'REJECTED', 'Thiếu biên bản xác nhận.', interval '70 hours', now() - interval '69 hours')
) AS sample(code, receipt_code, quantity, reason, status, decision_note, age, processed_at)
JOIN finished_goods_receipts r ON r.code = sample.receipt_code
ON CONFLICT (code) DO NOTHING;

INSERT INTO materials (code, name, min_stock, unit_id, category_id)
SELECT sample.code, sample.name, sample.min_stock, u.id, c.id
FROM (VALUES
  ('TEST-NVL-005', 'Cá lóc', 4::numeric, 'Thịt thử nghiệm'),
  ('TEST-NVL-006', 'Rau thơm', 2::numeric, 'Gia vị thử nghiệm'),
  ('TEST-NVL-007', 'Bánh phở', 6::numeric, 'Ngũ cốc thử nghiệm'),
  ('TEST-NVL-008', 'Thịt heo', 5::numeric, 'Thịt thử nghiệm'),
  ('TEST-NVL-009', 'Bột mì', 4::numeric, 'Ngũ cốc thử nghiệm'),
  ('TEST-NVL-010', 'Trứng gà', 3::numeric, 'Gia vị thử nghiệm'),
  ('TEST-NVL-011', 'Sườn non', 4::numeric, 'Thịt thử nghiệm'),
  ('TEST-NVL-012', 'Cà chua', 3::numeric, 'Gia vị thử nghiệm')
) AS sample(code, name, min_stock, category_name)
CROSS JOIN units u
JOIN categories c ON c.name = sample.category_name AND c.category_type = 'MATERIAL'
WHERE u.name = 'kg'
ON CONFLICT (code) DO NOTHING;

INSERT INTO material_lots (material_id, lot_code, expiry_date)
SELECT m.id, sample.lot_code, sample.expiry_date::date
FROM (VALUES
  ('TEST-NVL-005', 'TEST-LOT-005', '2027-12-31'),
  ('TEST-NVL-006', 'TEST-LOT-006', '2027-12-31'),
  ('TEST-NVL-007', 'TEST-LOT-007', '2027-12-31'),
  ('TEST-NVL-008', 'TEST-LOT-008', '2027-12-31'),
  ('TEST-NVL-009', 'TEST-LOT-009', '2027-12-31'),
  ('TEST-NVL-010', 'TEST-LOT-010', '2027-12-31'),
  ('TEST-NVL-011', 'TEST-LOT-011', '2027-12-31'),
  ('TEST-NVL-012', 'TEST-LOT-012', '2027-12-31')
) AS sample(material_code, lot_code, expiry_date)
JOIN materials m ON m.code = sample.material_code
ON CONFLICT (material_id, lot_code) DO NOTHING;

INSERT INTO material_balances (location_id, material_lot_id, quantity)
SELECT l.id, ml.id, sample.quantity
FROM (VALUES
  ('TEST-NVL-005', 'TEST-LOT-005', 18::numeric),
  ('TEST-NVL-006', 'TEST-LOT-006', 10::numeric),
  ('TEST-NVL-007', 'TEST-LOT-007', 22::numeric),
  ('TEST-NVL-008', 'TEST-LOT-008', 20::numeric),
  ('TEST-NVL-009', 'TEST-LOT-009', 15::numeric),
  ('TEST-NVL-010', 'TEST-LOT-010', 12::numeric),
  ('TEST-NVL-011', 'TEST-LOT-011', 14::numeric),
  ('TEST-NVL-012', 'TEST-LOT-012', 9::numeric)
) AS sample(material_code, lot_code, quantity)
JOIN materials m ON m.code = sample.material_code
JOIN material_lots ml ON ml.material_id = m.id AND ml.lot_code = sample.lot_code
JOIN warehouse_locations l ON l.name = 'Kho nguyên liệu'
JOIN branches br ON br.id = l.branch_id AND br.code = 'BR001'
ON CONFLICT (location_id, material_lot_id) DO NOTHING;

INSERT INTO products (code, name, category, price, unit, description)
VALUES
  ('TEST-MON-004', 'Phở bò tái', 'Phở', 75000, 'phần', 'Phở bò dùng để thử xem chi tiết và sửa tên món.'),
  ('TEST-MON-005', 'Bún chả Hà Nội', 'Bún', 69000, 'phần', 'Món có định mức thịt heo và rau thơm.'),
  ('TEST-MON-006', 'Gỏi cuốn tôm', 'Khai vị', 45000, 'phần', 'Món khai vị để thử tìm kiếm theo tên.'),
  ('TEST-MON-007', 'Cơm gà xối mỡ', 'Cơm', 65000, 'phần', 'Món có phiếu hao hụt đang chờ duyệt.'),
  ('TEST-MON-008', 'Canh chua cá', 'Canh', 55000, 'phần', 'Món có version cũ đã ngừng và version mới đang áp dụng.'),
  ('TEST-MON-009', 'Chả cá Lã Vọng', 'Món chính', 99000, 'phần', 'Món chưa có lệnh đang chạy, dùng để thử ngừng áp dụng.'),
  ('TEST-MON-010', 'Bánh flan', 'Tráng miệng', 25000, 'phần', 'Món đã nhập kho đủ số, không phát sinh hủy.'),
  ('TEST-MON-011', 'Salad bò', 'Khai vị', 72000, 'phần', 'Món có phiếu nghiệm thu bị từ chối.'),
  ('TEST-MON-012', 'Sườn nướng mật ong', 'Món chính', 89000, 'phần', 'Món có phiếu hủy đã bị từ chối.')
ON CONFLICT (code) DO NOTHING;

INSERT INTO boms (code, product_code, product_name, version, output_quantity, status)
VALUES
  ('TEST-BOM-004', 'TEST-MON-004', 'Phở bò tái', 1, 1, 'ACTIVE'),
  ('TEST-BOM-005', 'TEST-MON-005', 'Bún chả Hà Nội', 1, 1, 'ACTIVE'),
  ('TEST-BOM-006', 'TEST-MON-006', 'Gỏi cuốn tôm', 1, 4, 'ACTIVE'),
  ('TEST-BOM-007', 'TEST-MON-007', 'Cơm gà xối mỡ', 1, 1, 'ACTIVE'),
  ('TEST-BOM-008', 'TEST-MON-008', 'Canh chua cá', 1, 1, 'INACTIVE'),
  ('TEST-BOM-008-V2', 'TEST-MON-008', 'Canh chua cá', 2, 1, 'ACTIVE'),
  ('TEST-BOM-009', 'TEST-MON-009', 'Chả cá Lã Vọng', 1, 1, 'ACTIVE'),
  ('TEST-BOM-010', 'TEST-MON-010', 'Bánh flan', 1, 6, 'ACTIVE'),
  ('TEST-BOM-011', 'TEST-MON-011', 'Salad bò', 1, 1, 'ACTIVE'),
  ('TEST-BOM-012', 'TEST-MON-012', 'Sườn nướng mật ong', 1, 1, 'ACTIVE')
ON CONFLICT (code) DO NOTHING;

INSERT INTO bom_details (bom_id, material_id, unit_id, quantity)
SELECT b.id, m.id, u.id, sample.quantity
FROM (VALUES
  ('TEST-BOM-004', 'TEST-NVL-001', 0.12::numeric),
  ('TEST-BOM-004', 'TEST-NVL-007', 0.15::numeric),
  ('TEST-BOM-004', 'TEST-NVL-006', 0.03::numeric),
  ('TEST-BOM-005', 'TEST-NVL-008', 0.18::numeric),
  ('TEST-BOM-005', 'TEST-NVL-006', 0.04::numeric),
  ('TEST-BOM-006', 'TEST-NVL-008', 0.20::numeric),
  ('TEST-BOM-006', 'TEST-NVL-006', 0.08::numeric),
  ('TEST-BOM-007', 'TEST-NVL-002', 0.22::numeric),
  ('TEST-BOM-007', 'TEST-NVL-003', 0.18::numeric),
  ('TEST-BOM-008', 'TEST-NVL-005', 0.25::numeric),
  ('TEST-BOM-008', 'TEST-NVL-012', 0.08::numeric),
  ('TEST-BOM-008-V2', 'TEST-NVL-005', 0.22::numeric),
  ('TEST-BOM-008-V2', 'TEST-NVL-012', 0.10::numeric),
  ('TEST-BOM-008-V2', 'TEST-NVL-006', 0.04::numeric),
  ('TEST-BOM-009', 'TEST-NVL-005', 0.28::numeric),
  ('TEST-BOM-009', 'TEST-NVL-004', 0.02::numeric),
  ('TEST-BOM-010', 'TEST-NVL-010', 0.30::numeric),
  ('TEST-BOM-010', 'TEST-NVL-009', 0.10::numeric),
  ('TEST-BOM-011', 'TEST-NVL-001', 0.10::numeric),
  ('TEST-BOM-011', 'TEST-NVL-006', 0.05::numeric),
  ('TEST-BOM-012', 'TEST-NVL-011', 0.24::numeric),
  ('TEST-BOM-012', 'TEST-NVL-004', 0.02::numeric)
) AS sample(bom_code, material_code, quantity)
JOIN boms b ON b.code = sample.bom_code
JOIN materials m ON m.code = sample.material_code
JOIN units u ON u.id = m.unit_id
ON CONFLICT (bom_id, material_id) DO NOTHING;

INSERT INTO finished_goods_balances (product_code, location_id, quantity)
SELECT sample.product_code, l.id, sample.quantity
FROM (VALUES
  ('TEST-MON-004', 32::numeric),
  ('TEST-MON-005', 21::numeric),
  ('TEST-MON-006', 40::numeric),
  ('TEST-MON-007', 11::numeric),
  ('TEST-MON-008', 14::numeric),
  ('TEST-MON-009', 6::numeric),
  ('TEST-MON-010', 24::numeric),
  ('TEST-MON-011', 0::numeric),
  ('TEST-MON-012', 8::numeric)
) AS sample(product_code, quantity)
JOIN warehouse_locations l ON l.name = 'Kho thành phẩm'
JOIN branches br ON br.id = l.branch_id AND br.code = 'BR001'
ON CONFLICT (product_code, location_id) DO NOTHING;

INSERT INTO production_orders (code, bom_id, branch_id, production_mode, quantity, status, material_status, note)
SELECT sample.code, b.id, br.id, 'IN_HOUSE', sample.quantity, sample.status, sample.material_status, sample.note
FROM (VALUES
  ('TEST-PO-007', 'TEST-BOM-004', 30::numeric, 'WAITING_APPROVAL', 'ISSUED', 'Phở bò chờ duyệt nhập kho.'),
  ('TEST-PO-008', 'TEST-BOM-005', 20::numeric, 'WAITING_APPROVAL', 'ISSUED', 'Bún chả chờ duyệt, có thể thử từ chối.'),
  ('TEST-PO-009', 'TEST-BOM-007', 12::numeric, 'COMPLETED', 'ISSUED', 'Cơm gà đã duyệt, hao hụt chờ xử lý.'),
  ('TEST-PO-010', 'TEST-BOM-006', 16::numeric, 'COMPLETED', 'ISSUED', 'Gỏi cuốn đã duyệt, hao hụt đã ghi nhận.'),
  ('TEST-PO-011', 'TEST-BOM-011', 10::numeric, 'IN_PROGRESS', 'ISSUED', 'Salad bò có phiếu bị từ chối.'),
  ('TEST-PO-012', 'TEST-BOM-012', 14::numeric, 'COMPLETED', 'ISSUED', 'Sườn nướng có phiếu hủy bị từ chối.'),
  ('TEST-PO-013', 'TEST-BOM-010', 18::numeric, 'COMPLETED', 'ISSUED', 'Bánh flan nhập đủ, không hao hụt.'),
  ('TEST-PO-014', 'TEST-BOM-008-V2', 10::numeric, 'COMPLETED', 'ISSUED', 'Canh chua version 2 đã nhập kho.'),
  ('TEST-PO-015', 'TEST-BOM-009', 8::numeric, 'COMPLETED', 'ISSUED', 'Chả cá đã hoàn thành, có thể ngừng áp dụng công thức.')
) AS sample(code, bom_code, quantity, status, material_status, note)
JOIN boms b ON b.code = sample.bom_code
JOIN branches br ON br.code = 'BR001'
ON CONFLICT (code) DO NOTHING;

INSERT INTO finished_goods_receipts (
  code, production_order_id, reported_quantity, accepted_quantity, rejected_quantity,
  status, note, inspection_note, created_at, approved_at, inspected_at
)
SELECT sample.code, po.id, sample.reported_quantity, sample.accepted_quantity, sample.rejected_quantity,
       sample.status, sample.note, sample.inspection_note, now() - sample.age,
       sample.approved_at, sample.inspected_at
FROM (VALUES
  ('TEST-FGR-007', 'TEST-PO-007', 30::numeric, NULL::numeric, NULL::numeric, 'PENDING', 'Phiếu phở bò chờ duyệt.', NULL::text, interval '30 minutes', NULL::timestamptz, NULL::timestamptz),
  ('TEST-FGR-008', 'TEST-PO-008', 20::numeric, NULL::numeric, NULL::numeric, 'PENDING', 'Phiếu bún chả chờ xử lý.', NULL::text, interval '40 minutes', NULL::timestamptz, NULL::timestamptz),
  ('TEST-FGR-009', 'TEST-PO-009', 12::numeric, 10::numeric, 2::numeric, 'APPROVED', 'Cơm gà lệch 2 phần.', 'Hai phần cơm khô.', interval '5 hours', now() - interval '4 hours', now() - interval '4 hours'),
  ('TEST-FGR-010', 'TEST-PO-010', 16::numeric, 15::numeric, 1::numeric, 'APPROVED', 'Gỏi cuốn lệch 1 phần.', 'Một cuốn rách bánh tráng.', interval '8 hours', now() - interval '7 hours', now() - interval '7 hours'),
  ('TEST-FGR-012', 'TEST-PO-012', 14::numeric, 11::numeric, 3::numeric, 'APPROVED', 'Sườn nướng lệch 3 phần.', 'Ba phần cháy cạnh.', interval '2 days', now() - interval '40 hours', now() - interval '40 hours'),
  ('TEST-FGR-013', 'TEST-PO-013', 18::numeric, 18::numeric, 0::numeric, 'APPROVED', 'Bánh flan đủ số.', NULL::text, interval '6 hours', now() - interval '5 hours', now() - interval '5 hours'),
  ('TEST-FGR-014', 'TEST-PO-014', 10::numeric, 10::numeric, 0::numeric, 'APPROVED', 'Canh chua đủ số.', 'Version 2 đạt cảm quan.', interval '9 hours', now() - interval '8 hours', now() - interval '8 hours'),
  ('TEST-FGR-015', 'TEST-PO-015', 8::numeric, 8::numeric, 0::numeric, 'APPROVED', 'Chả cá đủ số.', NULL::text, interval '12 hours', now() - interval '11 hours', now() - interval '11 hours')
) AS sample(code, order_code, reported_quantity, accepted_quantity, rejected_quantity, status, note, inspection_note, age, approved_at, inspected_at)
JOIN production_orders po ON po.code = sample.order_code
ON CONFLICT (code) DO NOTHING;

INSERT INTO finished_goods_receipts (
  code, production_order_id, reported_quantity, status, note, inspection_note, created_at, inspected_at
)
SELECT 'TEST-FGR-011', po.id, 10, 'REJECTED', 'Salad bò báo cáo chưa khớp lệnh.',
       'Thiếu ảnh nghiệm thu.', now() - interval '1 day', now() - interval '20 hours'
FROM production_orders po
WHERE po.code = 'TEST-PO-011'
ON CONFLICT (code) DO NOTHING;

INSERT INTO finished_goods_movements (
  receipt_id, product_code, location_id, quantity_before, quantity_change, quantity_after, created_at
)
SELECT r.id, sample.product_code, l.id, sample.quantity_before, sample.quantity_change,
       sample.quantity_before + sample.quantity_change, r.approved_at
FROM (VALUES
  ('TEST-FGR-009', 'TEST-MON-007', 1::numeric, 10::numeric),
  ('TEST-FGR-010', 'TEST-MON-006', 25::numeric, 15::numeric),
  ('TEST-FGR-012', 'TEST-MON-012', 0::numeric, 11::numeric),
  ('TEST-FGR-013', 'TEST-MON-010', 6::numeric, 18::numeric),
  ('TEST-FGR-014', 'TEST-MON-008', 4::numeric, 10::numeric),
  ('TEST-FGR-015', 'TEST-MON-009', 0::numeric, 8::numeric)
) AS sample(receipt_code, product_code, quantity_before, quantity_change)
JOIN finished_goods_receipts r ON r.code = sample.receipt_code
JOIN warehouse_locations l ON l.name = 'Kho thành phẩm'
JOIN branches br ON br.id = l.branch_id AND br.code = 'BR001'
ON CONFLICT (receipt_id) DO NOTHING;

INSERT INTO waste_requests (code, receipt_id, quantity, reason, status, decision_note, created_at, processed_at)
SELECT sample.code, r.id, sample.quantity, sample.reason, sample.status, sample.decision_note,
       now() - sample.age, sample.processed_at
FROM (VALUES
  ('TEST-WASTE-004', 'TEST-FGR-009', 2::numeric, 'Cơm gà bị khô, không xuất được.', 'PENDING', NULL::text, interval '4 hours', NULL::timestamptz),
  ('TEST-WASTE-005', 'TEST-FGR-010', 1::numeric, 'Gỏi cuốn rách vỏ.', 'APPROVED', 'Đã đối chiếu ảnh ca chiều.', interval '7 hours', now() - interval '6 hours'),
  ('TEST-WASTE-006', 'TEST-FGR-012', 3::numeric, 'Sườn cháy không phục vụ được.', 'REJECTED', 'Bếp xác nhận vẫn bán được món kèm.', interval '39 hours', now() - interval '30 hours')
) AS sample(code, receipt_code, quantity, reason, status, decision_note, age, processed_at)
JOIN finished_goods_receipts r ON r.code = sample.receipt_code
ON CONFLICT (code) DO NOTHING;

COMMIT;

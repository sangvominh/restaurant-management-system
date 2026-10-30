
-- 1. Chi nhánh thử nghiệm
INSERT INTO branches (code, name)
VALUES ('TEST-CN01', 'Chi nhánh thử nghiệm')
ON CONFLICT (code) DO NOTHING;

-- 2. Đơn vị tính
INSERT INTO units (name, conversion_factor)
VALUES ('kg', 1)
ON CONFLICT (name) DO NOTHING;

-- 3. Phân loại nguyên vật liệu
INSERT INTO categories (code, name, category_type)
VALUES ('DM-SEED-MEAT', 'Thịt', 'MATERIAL')
ON CONFLICT (name, category_type) DO NOTHING;

-- 4. Nguyên vật liệu
INSERT INTO materials (
  code, name, min_stock, unit_id, category_id
)
SELECT
  'TEST-NVL001',
  'Thịt bò',
  5,
  u.id,
  c.id
FROM units u
CROSS JOIN categories c
WHERE u.name = 'kg'
  AND c.name = 'Thịt'
  AND c.category_type = 'MATERIAL'
ON CONFLICT (code) DO NOTHING;

-- 5. Vị trí kho
INSERT INTO warehouse_locations (
  branch_id, name, location_type
)
SELECT id, 'Kho lạnh', 'COLD'
FROM branches
WHERE code = 'TEST-CN01'
ON CONFLICT (branch_id, name) DO NOTHING;

-- 6. Lô nguyên vật liệu
INSERT INTO material_lots (
  material_id, lot_code, expiry_date
)
SELECT id, 'TEST-LO001', '2027-01-30'
FROM materials
WHERE code = 'TEST-NVL001'
ON CONFLICT (material_id, lot_code) DO NOTHING;

-- 7. Số lượng tồn kho
INSERT INTO material_balances (
  location_id, material_lot_id, quantity
)
SELECT wl.id, ml.id, 20
FROM warehouse_locations wl
JOIN branches b ON b.id = wl.branch_id
CROSS JOIN material_lots ml
JOIN materials m ON m.id = ml.material_id
WHERE b.code = 'TEST-CN01'
  AND wl.name = 'Kho lạnh'
  AND m.code = 'TEST-NVL001'
  AND ml.lot_code = 'TEST-LO001'
ON CONFLICT (location_id, material_lot_id)
DO NOTHING;

-- Dữ liệu thực hành cho tồn bếp và món theo order; chỉ chạy trên database demo.
-- Tạo một phiếu cấp mẫu duy nhất, trừ kho nguồn và cộng tồn bếp trong cùng giao dịch.
DO $$
DECLARE
  branch_uuid uuid;
  actor_uuid uuid;
  issue_uuid uuid;
  row_item record;
  current_quantity numeric(18,3);
BEGIN
  SELECT id INTO STRICT branch_uuid FROM branches WHERE code = 'TEST-CN01';
  SELECT id INTO STRICT actor_uuid FROM staff_users WHERE code = 'DEMO-KITCHEN' AND branch_id = branch_uuid;
  IF EXISTS (SELECT 1 FROM material_issues WHERE issue_code = 'DEMO-CAP-BEP-001') THEN
    RETURN;
  END IF;
  INSERT INTO material_issues(issue_code, branch_id, status, note)
    VALUES ('DEMO-CAP-BEP-001', branch_uuid, 'PENDING', 'Dữ liệu mẫu: cấp nguyên liệu cho bếp')
    RETURNING id INTO issue_uuid;
  INSERT INTO staff_audits(id, actor_id, action, target_id, detail)
    VALUES (gen_random_uuid(), actor_uuid, 'MATERIAL_REQUEST', issue_uuid::text, 'DEMO-CAP-BEP-001');
  FOR row_item IN
    SELECT v.code, v.quantity, m.id AS material_id, m.unit_id, l.id AS lot_id,
           mb.id AS balance_id, mb.location_id
    FROM (VALUES ('TEST-NVL001',2::numeric), ('DEMO-NVL02',2), ('DEMO-NVL03',2),
                 ('DEMO-TRA',2), ('DEMO-SUA',2), ('DEMO-DUONG',2)) v(code,quantity)
    JOIN materials m ON m.code = v.code
    JOIN material_lots l ON l.material_id = m.id AND l.status = 'ACTIVE'
    JOIN material_balances mb ON mb.material_lot_id = l.id
    JOIN warehouse_locations w ON w.id = mb.location_id
    WHERE w.branch_id = branch_uuid AND w.name = 'Kho lạnh'
    ORDER BY v.code, l.expiry_date NULLS LAST, l.id
  LOOP
    -- Mỗi mã demo hiện có một lô tại kho lạnh. Không cấp hai lần nếu bổ sung lô khác.
    IF EXISTS (SELECT 1 FROM material_issue_details WHERE issue_id = issue_uuid AND material_id = row_item.material_id) THEN
      CONTINUE;
    END IF;
    SELECT quantity INTO current_quantity FROM material_balances WHERE id = row_item.balance_id FOR UPDATE;
    IF current_quantity < row_item.quantity THEN
      RAISE EXCEPTION 'Không đủ tồn demo để cấp cho bếp: %', row_item.code;
    END IF;
    INSERT INTO material_issue_details(issue_id, material_id, material_lot_id, location_id, unit_id, quantity)
      VALUES (issue_uuid, row_item.material_id, row_item.lot_id, row_item.location_id, row_item.unit_id, row_item.quantity);
    UPDATE material_balances SET quantity = quantity - row_item.quantity WHERE id = row_item.balance_id;
    INSERT INTO inventory_movements(material_lot_id, location_id, movement_type, quantity_before, quantity_change, quantity_after)
      VALUES (row_item.lot_id, row_item.location_id, 'ISSUE', current_quantity, -row_item.quantity, current_quantity - row_item.quantity);
  END LOOP;
  IF (SELECT count(*) FROM material_issue_details WHERE issue_id = issue_uuid) <> 6 THEN
    RAISE EXCEPTION 'Thiếu nguyên liệu hoặc lô demo để cấp cho bếp';
  END IF;
  UPDATE material_issues SET status = 'APPROVED' WHERE id = issue_uuid;
END $$;

-- Order mới để thử hai món và trạng thái hoàn thành theo từng dòng.
INSERT INTO invoices (id, branch_id, table_id, guest_name, status)
SELECT '40000000-0000-4000-8000-000000000021'::uuid, b.id, t.id, 'Khách demo bếp', 'OPEN'
FROM branches b JOIN restaurant_tables t ON t.branch_id = b.id AND t.code = 'B01'
WHERE b.code = 'TEST-CN01' ON CONFLICT (id) DO NOTHING;
INSERT INTO staff_orders (id, invoice_id, created_by_id, request_key)
SELECT '40000000-0000-4000-8000-000000000031'::uuid, i.id, u.id, '40000000-0000-4000-8000-000000000031'
FROM invoices i JOIN staff_users u ON u.code = 'DEMO-CASHIER' AND u.branch_id = i.branch_id
WHERE i.id = '40000000-0000-4000-8000-000000000021'::uuid ON CONFLICT (id) DO NOTHING;
INSERT INTO order_lines (id, order_id, menu_item_id, name, unit_price, quantity, status)
SELECT v.id::uuid, o.id, m.id, m.name, m.price, v.quantity, 'QUEUED'
FROM (VALUES ('40000000-0000-4000-8000-000000000041','30000000-0000-4000-8000-000000000011',2),
             ('40000000-0000-4000-8000-000000000042','30000000-0000-4000-8000-000000000012',1)) v(id,menu_id,quantity)
JOIN staff_orders o ON o.id = '40000000-0000-4000-8000-000000000031'::uuid
JOIN menu_items m ON m.id = v.menu_id::uuid
ON CONFLICT (id) DO NOTHING;
-- Hai dòng cùng món: làm dòng đầu sẽ khiến dòng sau thiếu thịt bò trên bộ dữ liệu mới.
INSERT INTO order_lines (id, order_id, menu_item_id, name, unit_price, quantity, status)
SELECT v.id::uuid, o.id, m.id, m.name, m.price, 6, 'QUEUED'
FROM (VALUES ('40000000-0000-4000-8000-000000000043'),('40000000-0000-4000-8000-000000000044')) v(id)
JOIN staff_orders o ON o.id = '40000000-0000-4000-8000-000000000031'::uuid
JOIN menu_items m ON m.id = '30000000-0000-4000-8000-000000000011'::uuid
ON CONFLICT (id) DO NOTHING;
-- Lệnh mới lấy NVL từ bếp: một lệnh đủ và một lệnh thiếu theo công thức.
INSERT INTO production_orders(code,bom_id,branch_id,production_mode,quantity,status,material_status,assigned_employee_code,note)
SELECT v.code,bom.id,b.id,'MAKE_TO_STOCK',v.quantity,'PENDING','UNCHECKED','DEMO-KITCHEN','Dữ liệu mẫu: thử tồn bếp và yêu cầu xuất'
FROM (VALUES ('DEMO-BEP-LSX-DU',1::numeric),('DEMO-BEP-LSX-THIEU',15::numeric)) v(code,quantity)
JOIN boms bom ON bom.code='BOM-002' JOIN branches b ON b.code='TEST-CN01'
ON CONFLICT (code) DO NOTHING;

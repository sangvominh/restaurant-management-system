-- Sổ tồn bếp dành riêng cho ứng dụng nhân viên.
CREATE TABLE staff_kitchen_balances (
  branch_id uuid NOT NULL REFERENCES branches(id),
  material_lot_id uuid NOT NULL REFERENCES material_lots(id),
  quantity numeric(18,3) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  PRIMARY KEY (branch_id, material_lot_id)
);
CREATE TABLE staff_kitchen_receipts (
  issue_detail_id uuid PRIMARY KEY REFERENCES material_issue_details(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  material_lot_id uuid NOT NULL REFERENCES material_lots(id),
  quantity numeric(18,3) NOT NULL CHECK (quantity > 0),
  created_at timestamptz(3) NOT NULL DEFAULT now()
);

-- Chỉ phiếu do nhân viên tạo mới được ghi vào tồn bếp. Trigger chạy trong
-- cùng giao dịch duyệt kho, nên lỗi hoặc rollback sẽ không tạo tồn ảo.
CREATE FUNCTION staff_receive_approved_material_issue() RETURNS trigger AS $$
DECLARE item record; inserted_count integer;
BEGIN
  IF NEW.status <> 'APPROVED' OR OLD.status = 'APPROVED' OR NOT EXISTS (
    SELECT 1 FROM staff_audits a WHERE a.action = 'MATERIAL_REQUEST' AND a.target_id = NEW.id::text
  ) THEN RETURN NEW; END IF;
  FOR item IN
    SELECT d.id, d.material_lot_id,
      CASE WHEN d.unit_id = m.unit_id THEN d.quantity
        WHEN u.base_unit_id = m.unit_id THEN d.quantity * u.conversion_factor
        ELSE NULL END AS quantity
    FROM material_issue_details d JOIN materials m ON m.id = d.material_id
    JOIN units u ON u.id = d.unit_id WHERE d.issue_id = NEW.id
  LOOP
    IF item.quantity IS NULL OR item.quantity <= 0 OR item.quantity <> round(item.quantity, 3) THEN
      RAISE EXCEPTION 'Số lượng hoặc đơn vị cấp cho bếp không hợp lệ';
    END IF;
    INSERT INTO staff_kitchen_receipts(issue_detail_id, branch_id, material_lot_id, quantity)
      VALUES (item.id, NEW.branch_id, item.material_lot_id, item.quantity)
      ON CONFLICT (issue_detail_id) DO NOTHING;
    GET DIAGNOSTICS inserted_count = ROW_COUNT;
    IF inserted_count = 1 THEN
      INSERT INTO staff_kitchen_balances(branch_id, material_lot_id, quantity)
        VALUES (NEW.branch_id, item.material_lot_id, item.quantity)
        ON CONFLICT (branch_id, material_lot_id) DO UPDATE
          SET quantity = staff_kitchen_balances.quantity + EXCLUDED.quantity;
    END IF;
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER staff_receive_material_issue AFTER UPDATE OF status ON material_issues
  FOR EACH ROW EXECUTE FUNCTION staff_receive_approved_material_issue();

-- Công thức thử nghiệm được gắn bằng ID, không suy luận theo tên nguyên liệu.
CREATE TABLE staff_demo_order_recipes (
  menu_item_id uuid NOT NULL REFERENCES menu_items(id),
  material_id uuid NOT NULL REFERENCES materials(id),
  quantity numeric(18,3) NOT NULL CHECK (quantity > 0),
  PRIMARY KEY (menu_item_id, material_id)
);
CREATE TABLE staff_kitchen_order_consumptions (
  order_line_id uuid NOT NULL REFERENCES order_lines(id),
  material_lot_id uuid NOT NULL REFERENCES material_lots(id),
  quantity numeric(18,3) NOT NULL CHECK (quantity > 0),
  PRIMARY KEY (order_line_id, material_lot_id)
);
CREATE TABLE staff_kitchen_waste (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  actor_id uuid NOT NULL REFERENCES staff_users(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  material_lot_id uuid NOT NULL REFERENCES material_lots(id),
  order_line_id uuid REFERENCES order_lines(id),
  quantity numeric(18,3) NOT NULL CHECK (quantity > 0),
  reason text NOT NULL,
  created_at timestamptz(3) NOT NULL DEFAULT now()
);

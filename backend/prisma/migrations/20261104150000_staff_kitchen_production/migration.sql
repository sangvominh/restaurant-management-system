-- Lệnh do nhân viên thực hiện bằng tồn bếp; lệnh cũ được kho cấp trực tiếp không nằm trong bảng này.
CREATE TABLE staff_kitchen_production_starts (
  production_order_id uuid PRIMARY KEY REFERENCES production_orders(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  reported_quantity numeric(18,3),
  created_at timestamptz(3) NOT NULL DEFAULT now()
);
CREATE TABLE staff_kitchen_production_consumptions (
  production_order_id uuid NOT NULL REFERENCES production_orders(id),
  material_lot_id uuid NOT NULL REFERENCES material_lots(id),
  quantity numeric(18,3) NOT NULL CHECK (quantity > 0),
  PRIMARY KEY (production_order_id, material_lot_id)
);

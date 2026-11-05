ALTER TABLE staff_kitchen_balances ADD COLUMN reserved_return numeric(18,3) NOT NULL DEFAULT 0;
ALTER TABLE staff_kitchen_balances ADD CONSTRAINT staff_kitchen_balances_reservations_check CHECK (reserved_return >= 0 AND reserved_waste + reserved_return <= quantity);
ALTER TABLE staff_material_returns ADD COLUMN stock_reserved boolean NOT NULL DEFAULT false;
ALTER TABLE staff_material_returns ADD COLUMN condition text;
ALTER TABLE staff_material_returns ADD COLUMN condition_confirmed boolean NOT NULL DEFAULT false;
ALTER TABLE staff_material_returns ADD COLUMN decision_note text;
ALTER TABLE staff_material_returns ADD COLUMN decided_by text;
ALTER TABLE staff_material_returns ADD COLUMN processed_at timestamptz(3);

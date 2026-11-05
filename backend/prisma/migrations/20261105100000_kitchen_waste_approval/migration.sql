-- Existing records were already deducted at creation; do not treat them as pending.
ALTER TABLE staff_kitchen_balances ADD COLUMN reserved_waste numeric(18,3) NOT NULL DEFAULT 0;
ALTER TABLE staff_kitchen_balances ADD CONSTRAINT staff_kitchen_balances_waste_reservation_check CHECK (reserved_waste >= 0 AND reserved_waste <= quantity);
ALTER TABLE staff_kitchen_waste ADD COLUMN status text NOT NULL DEFAULT 'RECORDED';
ALTER TABLE staff_kitchen_waste ADD COLUMN decision_note text;
ALTER TABLE staff_kitchen_waste ADD COLUMN decided_by text;
ALTER TABLE staff_kitchen_waste ADD COLUMN processed_at timestamptz(3);
ALTER TABLE staff_kitchen_waste ADD CONSTRAINT staff_kitchen_waste_status_check CHECK (status IN ('RECORDED', 'PENDING', 'APPROVED', 'REJECTED'));
CREATE INDEX staff_kitchen_waste_branch_status_idx ON staff_kitchen_waste(branch_id, status, created_at);

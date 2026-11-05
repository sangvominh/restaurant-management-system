CREATE TABLE staff_processing_defects (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), code text NOT NULL UNIQUE,
 actor_id uuid NOT NULL REFERENCES staff_users(id), branch_id uuid NOT NULL REFERENCES branches(id),
 order_line_id uuid REFERENCES order_lines(id), production_order_id uuid REFERENCES production_orders(id),
 quantity numeric(18,3) NOT NULL CHECK(quantity > 0), reason text NOT NULL,
 status text NOT NULL DEFAULT 'PENDING' CHECK(status IN ('PENDING','APPROVED','REJECTED')),
 decision_note text, decided_by text, created_at timestamptz(3) NOT NULL DEFAULT now(), processed_at timestamptz(3),
 CHECK ((order_line_id IS NOT NULL)::int + (production_order_id IS NOT NULL)::int = 1)
);
ALTER TABLE staff_kitchen_waste ADD COLUMN processing_defect_id uuid REFERENCES staff_processing_defects(id);
CREATE INDEX staff_processing_defect_status_idx ON staff_processing_defects(branch_id,status,created_at);

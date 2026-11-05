-- Allow a production order to have one finished-goods receipt per reported batch.
DROP INDEX IF EXISTS "finished_goods_receipts_production_order_id_key";
CREATE INDEX IF NOT EXISTS "finished_goods_receipts_production_order_id_idx"
  ON "finished_goods_receipts"("production_order_id", "created_at");

-- Tie kitchen material consumption to the batch that caused it. Existing rows
-- belong to the one legacy receipt for their production order, when present.
ALTER TABLE staff_kitchen_production_consumptions
  ADD COLUMN finished_goods_receipt_id uuid;
UPDATE staff_kitchen_production_consumptions c
SET finished_goods_receipt_id = r.id
FROM finished_goods_receipts r
WHERE r.production_order_id = c.production_order_id;
ALTER TABLE staff_kitchen_production_consumptions
  DROP CONSTRAINT staff_kitchen_production_consumptions_pkey,
  ADD CONSTRAINT staff_kitchen_production_consumptions_receipt_id_fkey
    FOREIGN KEY (finished_goods_receipt_id) REFERENCES finished_goods_receipts(id) ON DELETE RESTRICT;
CREATE UNIQUE INDEX staff_kitchen_production_consumptions_receipt_lot_key
  ON staff_kitchen_production_consumptions(finished_goods_receipt_id, material_lot_id)
  WHERE finished_goods_receipt_id IS NOT NULL;

-- Give each production batch a distinct source-allocation key.
CREATE OR REPLACE FUNCTION staff_allocate_production_consumption() RETURNS trigger AS $$
DECLARE
 branch uuid;
 event_key text;
BEGIN
 SELECT branch_id INTO branch FROM staff_kitchen_production_starts WHERE production_order_id=NEW.production_order_id;
 event_key := COALESCE(NEW.finished_goods_receipt_id, NEW.production_order_id)::text || ':' || NEW.material_lot_id::text;
 PERFORM staff_allocate_kitchen_source(branch,NEW.material_lot_id,NEW.quantity,'PRODUCTION',event_key);
 RETURN NEW;
END $$ LANGUAGE plpgsql;

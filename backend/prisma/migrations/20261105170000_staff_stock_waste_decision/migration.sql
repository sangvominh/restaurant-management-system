-- Additive metadata for processing the original Staff stock-waste document.
ALTER TABLE "staff_material_waste"
  ADD COLUMN "decision_note" TEXT,
  ADD COLUMN "processed_at" TIMESTAMPTZ(3),
  ADD COLUMN "movement_id" UUID;
CREATE UNIQUE INDEX "staff_material_waste_movement_id_key" ON "staff_material_waste"("movement_id");
ALTER TABLE "staff_material_waste"
  ADD CONSTRAINT "staff_material_waste_movement_id_fkey"
  FOREIGN KEY ("movement_id") REFERENCES "inventory_movements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

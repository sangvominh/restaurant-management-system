-- Trace the RETURN movement from the original Staff return document.
ALTER TABLE "staff_material_returns" ADD COLUMN "movement_id" UUID;
CREATE UNIQUE INDEX "staff_material_returns_movement_id_key" ON "staff_material_returns"("movement_id");
ALTER TABLE "staff_material_returns" ADD CONSTRAINT "staff_material_returns_movement_id_fkey"
  FOREIGN KEY ("movement_id") REFERENCES "inventory_movements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

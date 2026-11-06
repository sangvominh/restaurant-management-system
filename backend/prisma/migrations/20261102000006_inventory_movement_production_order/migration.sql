-- Link inventory issues to the production order that consumed the materials.
ALTER TABLE "inventory_movements"
ADD COLUMN "production_order_id" UUID;

CREATE INDEX "inventory_movements_production_order_id_idx"
ON "inventory_movements"("production_order_id");

ALTER TABLE "inventory_movements"
ADD CONSTRAINT "inventory_movements_production_order_id_fkey"
FOREIGN KEY ("production_order_id") REFERENCES "production_orders"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

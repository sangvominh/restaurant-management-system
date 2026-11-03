-- Additive only: no existing rows or columns are rewritten.
CREATE TABLE "material_adjustments" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(), "code" VARCHAR(50) NOT NULL,
  "type" VARCHAR(10) NOT NULL, "source" VARCHAR(10) NOT NULL,
  "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  "material_lot_id" UUID NOT NULL, "location_id" UUID NOT NULL, "issue_detail_id" UUID,
  "quantity" DECIMAL(18,3) NOT NULL, "accepted_quantity" DECIMAL(18,3),
  "quality_status" VARCHAR(20), "reason" VARCHAR(500) NOT NULL, "decision_note" VARCHAR(500),
  "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "processed_at" TIMESTAMPTZ(3),
  CONSTRAINT "material_adjustments_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "material_adjustments_type_source_check" CHECK (("type"='WASTE' AND "source" IN ('STOCK','ISSUED')) OR ("type"='RETURN' AND "source"='ISSUED')),
  CONSTRAINT "material_adjustments_status_check" CHECK ("status" IN ('PENDING','APPROVED','REJECTED')),
  CONSTRAINT "material_adjustments_quantity_check" CHECK ("quantity">0 AND ("accepted_quantity" IS NULL OR ("accepted_quantity">0 AND "accepted_quantity"<="quantity"))),
  CONSTRAINT "material_adjustments_approved_quantity_check" CHECK ("status"<>'APPROVED' OR "accepted_quantity" IS NOT NULL),
  CONSTRAINT "material_adjustments_source_check" CHECK (("source"='ISSUED' AND "issue_detail_id" IS NOT NULL) OR ("source"='STOCK' AND "issue_detail_id" IS NULL)),
  CONSTRAINT "material_adjustments_material_lot_id_fkey" FOREIGN KEY ("material_lot_id") REFERENCES "material_lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "material_adjustments_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "warehouse_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "material_adjustments_issue_detail_id_fkey" FOREIGN KEY ("issue_detail_id") REFERENCES "material_issue_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "material_adjustments_code_key" ON "material_adjustments"("code");
CREATE INDEX "material_adjustments_type_status_created_at_idx" ON "material_adjustments"("type","status","created_at");
CREATE INDEX "material_adjustments_issue_detail_id_status_idx" ON "material_adjustments"("issue_detail_id","status");
CREATE TABLE "material_usage_settlements" (
  "issue_detail_id" UUID NOT NULL, "consumed_quantity" DECIMAL(18,3) NOT NULL,
  "finalized_at" TIMESTAMPTZ(3) NOT NULL, "reference_code" VARCHAR(100) NOT NULL, "recorded_by" VARCHAR(100) NOT NULL,
  CONSTRAINT "material_usage_settlements_pkey" PRIMARY KEY ("issue_detail_id"),
  CONSTRAINT "material_usage_settlements_consumed_check" CHECK ("consumed_quantity">=0),
  CONSTRAINT "material_usage_settlements_issue_detail_id_fkey" FOREIGN KEY ("issue_detail_id") REFERENCES "material_issue_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE "material_adjustment_movements" (
  "adjustment_id" UUID NOT NULL, "movement_id" UUID NOT NULL,
  CONSTRAINT "material_adjustment_movements_pkey" PRIMARY KEY ("adjustment_id"),
  CONSTRAINT "material_adjustment_movements_adjustment_id_fkey" FOREIGN KEY ("adjustment_id") REFERENCES "material_adjustments"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "material_adjustment_movements_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "inventory_movements"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "material_adjustment_movements_movement_id_key" ON "material_adjustment_movements"("movement_id");

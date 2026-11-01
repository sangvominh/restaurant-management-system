CREATE TABLE "finished_goods_defects" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "code" VARCHAR(60) NOT NULL,
  "branch_id" UUID NOT NULL,
  "product_code" VARCHAR(50) NOT NULL,
  "quantity" DECIMAL(18,3) NOT NULL,
  "reason" TEXT NOT NULL,
  "deduct_from_stock" BOOLEAN NOT NULL DEFAULT false,
  "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  "decision_note" TEXT,
  "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "processed_at" TIMESTAMPTZ(3),
  CONSTRAINT "finished_goods_defects_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "finished_goods_movements" ADD COLUMN "defect_id" UUID;
CREATE UNIQUE INDEX "finished_goods_defects_code_key" ON "finished_goods_defects"("code");
CREATE INDEX "finished_goods_defects_status_created_at_idx" ON "finished_goods_defects"("status", "created_at");
CREATE INDEX "finished_goods_defects_branch_id_product_code_idx" ON "finished_goods_defects"("branch_id", "product_code");
CREATE INDEX "finished_goods_movements_defect_id_idx" ON "finished_goods_movements"("defect_id");
ALTER TABLE "finished_goods_defects" ADD CONSTRAINT "finished_goods_defects_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "finished_goods_defects" ADD CONSTRAINT "finished_goods_defects_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "products"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "finished_goods_movements" ADD CONSTRAINT "finished_goods_movements_defect_id_fkey" FOREIGN KEY ("defect_id") REFERENCES "finished_goods_defects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

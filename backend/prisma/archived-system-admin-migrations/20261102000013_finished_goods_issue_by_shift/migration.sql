CREATE TABLE "finished_goods_issues" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "code" VARCHAR(50) NOT NULL,
  "branch_id" UUID NOT NULL,
  "shift_code" VARCHAR(50) NOT NULL,
  "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  "note" TEXT,
  "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "approved_at" TIMESTAMPTZ(3),
  "rejected_at" TIMESTAMPTZ(3),
  CONSTRAINT "finished_goods_issues_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "finished_goods_issue_details" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "issue_id" UUID NOT NULL,
  "product_code" VARCHAR(50) NOT NULL,
  "requested_quantity" DECIMAL(18,3) NOT NULL,
  "approved_quantity" DECIMAL(18,3),
  CONSTRAINT "finished_goods_issue_details_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "finished_goods_movements" ALTER COLUMN "receipt_id" DROP NOT NULL;
ALTER TABLE "finished_goods_movements" ADD COLUMN "issue_detail_id" UUID;
CREATE UNIQUE INDEX "finished_goods_issues_code_key" ON "finished_goods_issues"("code");
CREATE INDEX "finished_goods_issues_branch_id_shift_code_status_idx" ON "finished_goods_issues"("branch_id", "shift_code", "status");
CREATE INDEX "finished_goods_issues_status_created_at_idx" ON "finished_goods_issues"("status", "created_at");
CREATE UNIQUE INDEX "finished_goods_issue_details_issue_id_product_code_key" ON "finished_goods_issue_details"("issue_id", "product_code");
CREATE INDEX "finished_goods_issue_details_product_code_idx" ON "finished_goods_issue_details"("product_code");
CREATE INDEX "finished_goods_movements_issue_detail_id_idx" ON "finished_goods_movements"("issue_detail_id");
ALTER TABLE "finished_goods_issues" ADD CONSTRAINT "finished_goods_issues_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "finished_goods_issue_details" ADD CONSTRAINT "finished_goods_issue_details_issue_id_fkey" FOREIGN KEY ("issue_id") REFERENCES "finished_goods_issues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "finished_goods_issue_details" ADD CONSTRAINT "finished_goods_issue_details_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "products"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "finished_goods_movements" ADD CONSTRAINT "finished_goods_movements_issue_detail_id_fkey" FOREIGN KEY ("issue_detail_id") REFERENCES "finished_goods_issue_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

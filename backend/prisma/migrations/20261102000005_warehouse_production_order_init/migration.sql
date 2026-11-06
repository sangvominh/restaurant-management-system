-- CreateTable
CREATE TABLE "production_orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(50) NOT NULL,
    "bom_id" UUID NOT NULL,
    "branch_id" UUID NOT NULL,
    "production_mode" VARCHAR(30) NOT NULL,
    "quantity" DECIMAL(18,3) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'NEW',
    "material_status" VARCHAR(20) NOT NULL DEFAULT 'UNCHECKED',
    "note" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bomDetailId" UUID,

    CONSTRAINT "production_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "production_orders_code_key" ON "production_orders"("code");

-- CreateIndex
CREATE INDEX "production_orders_branch_id_status_idx" ON "production_orders"("branch_id", "status");

-- CreateIndex
CREATE INDEX "production_orders_bom_id_idx" ON "production_orders"("bom_id");

-- AddForeignKey
ALTER TABLE "production_orders" ADD CONSTRAINT "production_orders_bom_id_fkey" FOREIGN KEY ("bom_id") REFERENCES "boms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_orders" ADD CONSTRAINT "production_orders_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_orders" ADD CONSTRAINT "production_orders_bomDetailId_fkey" FOREIGN KEY ("bomDetailId") REFERENCES "bom_details"("id") ON DELETE SET NULL ON UPDATE CASCADE;

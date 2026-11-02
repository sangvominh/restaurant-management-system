-- CreateTable
CREATE TABLE "finished_goods_receipts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(50) NOT NULL,
    "production_order_id" UUID NOT NULL,
    "reported_quantity" DECIMAL(18,3) NOT NULL,
    "accepted_quantity" DECIMAL(18,3),
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "note" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_at" TIMESTAMPTZ(3),

    CONSTRAINT "finished_goods_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "finished_goods_receipts_code_key" ON "finished_goods_receipts"("code");

-- CreateIndex
CREATE UNIQUE INDEX "finished_goods_receipts_production_order_id_key" ON "finished_goods_receipts"("production_order_id");

-- CreateIndex
CREATE INDEX "finished_goods_receipts_status_created_at_idx" ON "finished_goods_receipts"("status", "created_at");

-- AddForeignKey
ALTER TABLE "finished_goods_receipts" ADD CONSTRAINT "finished_goods_receipts_production_order_id_fkey" FOREIGN KEY ("production_order_id") REFERENCES "production_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

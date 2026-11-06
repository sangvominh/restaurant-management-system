-- AlterTable
ALTER TABLE "finished_goods_receipts" ADD COLUMN     "inspected_at" TIMESTAMPTZ(3),
ADD COLUMN     "inspection_note" TEXT,
ADD COLUMN     "rejected_quantity" DECIMAL(18,3);

-- CreateTable
CREATE TABLE "finished_goods_balances" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_code" VARCHAR(50) NOT NULL,
    "location_id" UUID NOT NULL,
    "quantity" DECIMAL(18,3) NOT NULL DEFAULT 0,

    CONSTRAINT "finished_goods_balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finished_goods_movements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "receipt_id" UUID NOT NULL,
    "product_code" VARCHAR(50) NOT NULL,
    "location_id" UUID NOT NULL,
    "quantity_before" DECIMAL(18,3) NOT NULL,
    "quantity_change" DECIMAL(18,3) NOT NULL,
    "quantity_after" DECIMAL(18,3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "finished_goods_movements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "finished_goods_balances_product_code_location_id_key" ON "finished_goods_balances"("product_code", "location_id");

-- CreateIndex
CREATE UNIQUE INDEX "finished_goods_movements_receipt_id_key" ON "finished_goods_movements"("receipt_id");

-- AddForeignKey
ALTER TABLE "finished_goods_balances" ADD CONSTRAINT "finished_goods_balances_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "warehouse_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_goods_movements" ADD CONSTRAINT "finished_goods_movements_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "finished_goods_receipts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_goods_movements" ADD CONSTRAINT "finished_goods_movements_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "warehouse_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

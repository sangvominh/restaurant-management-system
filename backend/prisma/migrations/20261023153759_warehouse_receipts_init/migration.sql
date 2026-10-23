-- CreateTable
CREATE TABLE "suppliers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(30) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(20),
    "email" VARCHAR(150),
    "address" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goods_receipts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "receipt_code" VARCHAR(50) NOT NULL,
    "supplier_id" UUID NOT NULL,
    "branch_id" UUID NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    "note" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posted_at" TIMESTAMPTZ(3),

    CONSTRAINT "goods_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goods_receipt_details" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "receipt_id" UUID NOT NULL,
    "material_id" UUID NOT NULL,
    "material_lot_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,
    "quantity" DECIMAL(18,3) NOT NULL,
    "unit_price" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "goods_receipt_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_movements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "receipt_detail_id" UUID,
    "material_lot_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "movement_type" VARCHAR(30) NOT NULL,
    "quantity_before" DECIMAL(18,3) NOT NULL,
    "quantity_change" DECIMAL(18,3) NOT NULL,
    "quantity_after" DECIMAL(18,3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_movements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_code_key" ON "suppliers"("code");

-- CreateIndex
CREATE UNIQUE INDEX "goods_receipts_receipt_code_key" ON "goods_receipts"("receipt_code");

-- CreateIndex
CREATE INDEX "goods_receipts_branch_id_created_at_idx" ON "goods_receipts"("branch_id", "created_at");

-- CreateIndex
CREATE INDEX "goods_receipt_details_receipt_id_idx" ON "goods_receipt_details"("receipt_id");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_movements_receipt_detail_id_key" ON "inventory_movements"("receipt_detail_id");

-- CreateIndex
CREATE INDEX "inventory_movements_material_lot_id_location_id_idx" ON "inventory_movements"("material_lot_id", "location_id");

-- AddForeignKey
ALTER TABLE "goods_receipts" ADD CONSTRAINT "goods_receipts_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_receipts" ADD CONSTRAINT "goods_receipts_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_receipt_details" ADD CONSTRAINT "goods_receipt_details_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "goods_receipts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_receipt_details" ADD CONSTRAINT "goods_receipt_details_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_receipt_details" ADD CONSTRAINT "goods_receipt_details_material_lot_id_fkey" FOREIGN KEY ("material_lot_id") REFERENCES "material_lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_receipt_details" ADD CONSTRAINT "goods_receipt_details_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "warehouse_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_receipt_details" ADD CONSTRAINT "goods_receipt_details_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_receipt_detail_id_fkey" FOREIGN KEY ("receipt_detail_id") REFERENCES "goods_receipt_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_material_lot_id_fkey" FOREIGN KEY ("material_lot_id") REFERENCES "material_lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "warehouse_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

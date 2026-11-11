ALTER TABLE "MaterialReceiptLine" ALTER COLUMN "lotId" DROP NOT NULL;
ALTER TABLE "MaterialReceiptLine" ADD COLUMN "productId" UUID;
ALTER TABLE "MaterialReceiptLine" ADD CONSTRAINT "MaterialReceiptLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "MaterialReceiptLine" ADD CONSTRAINT "MaterialReceiptLine_target_check" CHECK (("lotId" IS NOT NULL AND "productId" IS NULL) OR ("lotId" IS NULL AND "productId" IS NOT NULL));
CREATE INDEX "MaterialReceiptLine_productId_idx" ON "MaterialReceiptLine"("productId");
ALTER TABLE "ProductMovement" ADD COLUMN "receiptLineId" UUID;
CREATE UNIQUE INDEX "ProductMovement_receiptLineId_key" ON "ProductMovement"("receiptLineId");
ALTER TABLE "ProductMovement" ADD CONSTRAINT "ProductMovement_receiptLineId_fkey" FOREIGN KEY ("receiptLineId") REFERENCES "MaterialReceiptLine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

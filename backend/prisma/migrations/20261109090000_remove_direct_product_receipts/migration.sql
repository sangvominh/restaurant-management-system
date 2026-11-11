BEGIN;
-- Không xóa hoặc chuyển chứng từ đã nhập TP thành một nghiệp vụ khác.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM "MaterialReceiptLine" WHERE "productId" IS NOT NULL)
     OR EXISTS (SELECT 1 FROM "ProductMovement" WHERE "receiptLineId" IS NOT NULL OR "movementType" = 'NHAP_MUA') THEN
    RAISE EXCEPTION 'Con phieu nhap truc tiep thanh pham. Can xu ly du lieu nay truoc khi bo luong nhap TP; migration khong tu xoa chung tu.';
  END IF;
END $$;
ALTER TABLE "MaterialReceiptLine" DROP CONSTRAINT "MaterialReceiptLine_target_check";
ALTER TABLE "MaterialReceiptLine" DROP COLUMN "productId";
ALTER TABLE "MaterialReceiptLine" ALTER COLUMN "lotId" SET NOT NULL;
ALTER TABLE "ProductMovement" DROP COLUMN "receiptLineId";
ALTER TABLE "Product" DROP COLUMN "supplyType";
COMMIT;

CREATE TABLE "DiningTable" (
  "id" UUID NOT NULL, "name" TEXT NOT NULL, "area" TEXT NOT NULL DEFAULT '',
  "status" TEXT NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "DiningTable_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "DiningTable_name_key" ON "DiningTable"("name");
ALTER TABLE "Sale" ADD COLUMN "tableId" UUID, ADD COLUMN "version" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "DiningTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE UNIQUE INDEX "Sale_active_table_key" ON "Sale"("tableId") WHERE "status" IN ('DRAFT','CONFIRMED');
ALTER TABLE "SaleLine" ADD COLUMN "note" TEXT NOT NULL DEFAULT '', ADD COLUMN "sentAt" TIMESTAMPTZ(3), ADD COLUMN "batch" INTEGER;
UPDATE "SaleLine" SET "sentAt" = s."createdAt", "batch" = 1 FROM "Sale" s WHERE s."id" = "SaleLine"."saleId" AND s."status" <> 'DRAFT';

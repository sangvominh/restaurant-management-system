-- CreateTable
CREATE TABLE "waste_requests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(60) NOT NULL,
    "receipt_id" UUID NOT NULL,
    "quantity" DECIMAL(18,3) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "decision_note" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMPTZ(3),

    CONSTRAINT "waste_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waste_requests_code_key" ON "waste_requests"("code");

-- CreateIndex
CREATE UNIQUE INDEX "waste_requests_receipt_id_key" ON "waste_requests"("receipt_id");

-- CreateIndex
CREATE INDEX "waste_requests_status_created_at_idx" ON "waste_requests"("status", "created_at");

-- AddForeignKey
ALTER TABLE "waste_requests" ADD CONSTRAINT "waste_requests_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "finished_goods_receipts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

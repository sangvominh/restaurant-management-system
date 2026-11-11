-- CreateTable
CREATE TABLE "MaterialShortage" (
    "id" UUID NOT NULL,
    "quantity" DECIMAL(18,3) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "requestedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "reviewNote" TEXT,
    "productionOrderId" UUID NOT NULL,
    "materialId" UUID NOT NULL,
    "requestedById" UUID NOT NULL,
    "reviewedById" UUID,

    CONSTRAINT "MaterialShortage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MaterialShortage_productionOrderId_materialId_status_idx" ON "MaterialShortage"("productionOrderId", "materialId", "status");

-- CreateIndex
CREATE INDEX "MaterialShortage_materialId_idx" ON "MaterialShortage"("materialId");

-- CreateIndex
CREATE INDEX "MaterialShortage_requestedById_idx" ON "MaterialShortage"("requestedById");

-- CreateIndex
CREATE INDEX "MaterialShortage_reviewedById_idx" ON "MaterialShortage"("reviewedById");

-- CreateIndex
CREATE INDEX "MaterialShortage_status_requestedAt_idx" ON "MaterialShortage"("status", "requestedAt");

-- AddForeignKey
ALTER TABLE "MaterialShortage" ADD CONSTRAINT "MaterialShortage_productionOrderId_fkey" FOREIGN KEY ("productionOrderId") REFERENCES "ProductionOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialShortage" ADD CONSTRAINT "MaterialShortage_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialShortage" ADD CONSTRAINT "MaterialShortage_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialShortage" ADD CONSTRAINT "MaterialShortage_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

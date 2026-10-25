-- CreateTable
CREATE TABLE "material_issues" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "issue_code" VARCHAR(50) NOT NULL,
    "branch_id" UUID NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "note" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "material_issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_issue_details" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "issue_id" UUID NOT NULL,
    "material_id" UUID NOT NULL,
    "material_lot_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,
    "quantity" DECIMAL(18,3) NOT NULL,

    CONSTRAINT "material_issue_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "material_issues_issue_code_key" ON "material_issues"("issue_code");

-- AddForeignKey
ALTER TABLE "material_issues" ADD CONSTRAINT "material_issues_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_issue_details" ADD CONSTRAINT "material_issue_details_issue_id_fkey" FOREIGN KEY ("issue_id") REFERENCES "material_issues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_issue_details" ADD CONSTRAINT "material_issue_details_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_issue_details" ADD CONSTRAINT "material_issue_details_material_lot_id_fkey" FOREIGN KEY ("material_lot_id") REFERENCES "material_lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_issue_details" ADD CONSTRAINT "material_issue_details_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "warehouse_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_issue_details" ADD CONSTRAINT "material_issue_details_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

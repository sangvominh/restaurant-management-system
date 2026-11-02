CREATE TABLE "staff_material_waste" (
 "id" UUID NOT NULL, "code" TEXT NOT NULL, "actor_id" UUID NOT NULL, "branch_id" UUID NOT NULL, "balance_id" UUID NOT NULL,
 "quantity" DECIMAL(18,3) NOT NULL, "reason" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT "staff_material_waste_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "staff_material_waste_code_key" ON "staff_material_waste"("code");
CREATE INDEX "staff_material_waste_actor_id_branch_id_idx" ON "staff_material_waste"("actor_id", "branch_id");

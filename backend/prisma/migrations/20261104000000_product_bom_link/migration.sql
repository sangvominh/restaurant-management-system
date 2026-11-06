-- The menu catalog may already exist in installations predating the tracked migrations.
-- Create it only when absent so existing restaurant product data is preserved.
CREATE TABLE IF NOT EXISTS "products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "price" DECIMAL(18,2) NOT NULL,
    "unit" VARCHAR(50) NOT NULL DEFAULT 'phần',
    "image_url" TEXT,
    "description" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "products_code_key" ON "products"("code");
CREATE INDEX IF NOT EXISTS "products_category_status_idx" ON "products"("category", "status");

-- Preserve old BOMs when upgrading a database that did not yet have a product catalog.
INSERT INTO "products" ("code", "name", "category", "price", "unit")
SELECT DISTINCT b."product_code", b."product_code", 'Món ăn', 0, 'phần'
FROM "boms" b
WHERE NOT EXISTS (
    SELECT 1 FROM "products" p WHERE p."code" = b."product_code"
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'boms_product_code_fkey'
    ) THEN
        ALTER TABLE "boms"
        ADD CONSTRAINT "boms_product_code_fkey"
        FOREIGN KEY ("product_code") REFERENCES "products"("code")
        ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

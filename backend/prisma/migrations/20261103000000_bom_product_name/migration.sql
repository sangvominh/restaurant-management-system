-- Optional display name for restaurant menu items; legacy warehouse BOM rows remain valid.
ALTER TABLE "boms" ADD COLUMN "product_name" VARCHAR(150);

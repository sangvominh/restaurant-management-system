-- Historical decisions remain NULL: their actual decision time was not stored.
ALTER TABLE "material_issues" ADD COLUMN "processed_at" TIMESTAMPTZ(3);

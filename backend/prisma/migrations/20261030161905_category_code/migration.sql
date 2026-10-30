
-- 1. Thêm cột code
ALTER TABLE "categories"
ADD COLUMN "code" VARCHAR(20);

-- 2. Gán mã cho danh mục cũ
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY name, id) AS rn
  FROM "categories"
)
UPDATE "categories" c
SET "code" = 'DM' || LPAD(n.rn::text, 3, '0')
FROM numbered n
WHERE c.id = n.id;

-- 3. Bắt buộc có mã
ALTER TABLE "categories"
ALTER COLUMN "code" SET NOT NULL;

-- 4. Không cho trùng mã
CREATE UNIQUE INDEX "categories_code_key"
ON "categories"("code");

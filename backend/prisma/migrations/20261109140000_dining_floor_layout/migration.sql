CREATE TABLE "DiningArea" ("name" TEXT NOT NULL PRIMARY KEY);
UPDATE "DiningTable" SET "area" = 'Chung' WHERE trim("area") = '';
INSERT INTO "DiningArea" ("name") SELECT DISTINCT "area" FROM "DiningTable";
INSERT INTO "DiningArea" ("name") VALUES ('Chung') ON CONFLICT DO NOTHING;
ALTER TABLE "DiningTable" ALTER COLUMN "area" SET DEFAULT 'Chung';
ALTER TABLE "DiningTable" ADD COLUMN "x" INTEGER NOT NULL DEFAULT 0, ADD COLUMN "y" INTEGER NOT NULL DEFAULT 0;
WITH ranked AS (SELECT id, row_number() OVER (PARTITION BY area ORDER BY name) - 1 AS pos FROM "DiningTable")
UPDATE "DiningTable" t SET x = (r.pos % 8)::integer, y = (r.pos / 8)::integer FROM ranked r WHERE t.id = r.id;
ALTER TABLE "DiningTable" ADD CONSTRAINT "DiningTable_area_fkey" FOREIGN KEY ("area") REFERENCES "DiningArea"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

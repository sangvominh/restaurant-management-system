-- Preserve System Admin data and existing migration history before adding warehouse tables.
ALTER TABLE "categories" RENAME TO "system_admin_categories";
ALTER INDEX "categories_pkey" RENAME TO "system_admin_categories_pkey";
ALTER INDEX "categories_type_name_key" RENAME TO "system_admin_categories_type_name_key";
ALTER SEQUENCE "categories_id_seq" RENAME TO "system_admin_categories_id_seq";
ALTER TABLE "roles" ADD COLUMN "portal" VARCHAR(20) NOT NULL DEFAULT 'warehouse';
UPDATE "roles" SET "portal" = CASE WHEN "is_system" THEN 'system'
 WHEN "name" IN ('Nhân viên', 'Thu ngân') THEN 'employee'
 WHEN "name" = 'Khách hàng' THEN 'customer' ELSE 'warehouse' END;
ALTER TABLE "roles" ADD CONSTRAINT "roles_portal_check" CHECK ("portal" IN ('system','warehouse','employee','customer'));
UPDATE "accounts" SET "session_version" = "session_version" + 1;
UPDATE "login_logs" SET "logout_at" = CURRENT_TIMESTAMP WHERE "logout_at" IS NULL;

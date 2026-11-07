-- AlterTable
ALTER TABLE "production_orders" ADD COLUMN     "assigned_at" TIMESTAMPTZ(3),
ADD COLUMN     "assigned_employee_code" VARCHAR(50);

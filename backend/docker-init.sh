#!/bin/sh
set -eu
npm run db:migrate
npm run db:seed
export PGHOST=db PGPORT=5432 PGUSER=restaurant PGPASSWORD=local_dev_only PGDATABASE=restaurant_dev
psql -v ON_ERROR_STOP=1 -f prisma/seed-inventory.sql
psql -v ON_ERROR_STOP=1 -c "UPDATE staff_users SET branch_id=(SELECT id FROM branches WHERE code='TEST-CN01') WHERE code IN ('DEMO-KITCHEN','DEMO-BARISTA','DEMO-CASHIER','DEMO-SUPERVISOR');"
for file in staff-demo-production.sql staff-demo-cases.sql staff-demo-menu.sql staff-demo-roles.sql staff-demo-kitchen.sql; do
  psql -v ON_ERROR_STOP=1 -f "prisma/$file"
done

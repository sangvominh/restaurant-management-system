#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
if docker container inspect restaurant-staff-demo >/dev/null 2>&1; then
  docker start restaurant-staff-demo >/dev/null
else
  docker run -d --name restaurant-staff-demo -e POSTGRES_PASSWORD=staff_demo_only -e POSTGRES_DB=staff_demo -p 127.0.0.1:55439:5432 postgres:17.11 >/dev/null
fi
until docker exec restaurant-staff-demo pg_isready -U postgres -d staff_demo >/dev/null 2>&1; do sleep 1; done
export DATABASE_URL='postgresql://postgres:staff_demo_only@127.0.0.1:55439/staff_demo'
(cd backend && npm run prisma:generate && npm run db:migrate && DEMO_SEED=true DEMO_STAFF_PASSWORD='demo-password-2026' npm run db:seed)
docker exec -i restaurant-staff-demo psql -v ON_ERROR_STOP=1 -U postgres -d staff_demo < backend/prisma/seed-inventory.sql
docker exec restaurant-staff-demo psql -v ON_ERROR_STOP=1 -U postgres -d staff_demo -c "UPDATE staff_users SET branch_id=(SELECT id FROM branches WHERE code='TEST-CN01') WHERE code IN ('DEMO-KITCHEN','DEMO-BARISTA','DEMO-CASHIER','DEMO-SUPERVISOR');" >/dev/null
docker exec -i restaurant-staff-demo psql -v ON_ERROR_STOP=1 -U postgres -d staff_demo < backend/prisma/staff-demo-production.sql
docker exec -i restaurant-staff-demo psql -v ON_ERROR_STOP=1 -U postgres -d staff_demo < backend/prisma/staff-demo-cases.sql
docker exec -i restaurant-staff-demo psql -v ON_ERROR_STOP=1 -U postgres -d staff_demo < backend/prisma/staff-demo-menu.sql
docker exec -i restaurant-staff-demo psql -v ON_ERROR_STOP=1 -U postgres -d staff_demo < backend/prisma/staff-demo-roles.sql
docker exec -i restaurant-staff-demo psql -v ON_ERROR_STOP=1 -U postgres -d staff_demo < backend/prisma/staff-demo-kitchen.sql
printf '\nDatabase demo sẵn sàng. Xem docs/notes/staff-demo.md để chạy ứng dụng.\n'

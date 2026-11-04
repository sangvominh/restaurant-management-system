#!/bin/sh
# Khởi tạo dữ liệu demo trong database Compose hiện tại, không dùng cho dữ liệu thật.
set -eu
cd "$(dirname "$0")/.."
db_address=$(docker compose port db 5432)
db_port=${db_address##*:}
case "$db_port" in
  ''|*[!0-9]*) echo "Không tìm thấy cổng PostgreSQL Compose; hãy chạy docker compose up -d db." >&2; exit 1 ;;
esac
(
  cd backend
  export DATABASE_URL="postgresql://restaurant:local_dev_only@127.0.0.1:$db_port/restaurant_dev?schema=public"
  npm run db:migrate
  DEMO_SEED=true DEMO_STAFF_PASSWORD=demo-password-2026 npm run db:seed
)
psql_db() {
  docker compose exec -T db psql -v ON_ERROR_STOP=1 -U restaurant -d restaurant_dev "$@"
}
psql_db < backend/prisma/seed-inventory.sql
psql_db -c "UPDATE staff_users SET branch_id=(SELECT id FROM branches WHERE code='TEST-CN01') WHERE code IN ('DEMO-KITCHEN','DEMO-BARISTA','DEMO-CASHIER','DEMO-SUPERVISOR');"
for file in staff-demo-production.sql staff-demo-cases.sql staff-demo-menu.sql staff-demo-roles.sql staff-demo-kitchen.sql; do
  psql_db < "backend/prisma/$file"
done

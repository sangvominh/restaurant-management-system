#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
if ! docker container inspect restaurant-staff-demo >/dev/null 2>&1; then
  exec ./scripts/staff-demo-setup.sh
fi
docker start restaurant-staff-demo >/dev/null
until docker exec restaurant-staff-demo pg_isready -U postgres -d postgres >/dev/null 2>&1; do sleep 1; done
backup="${TMPDIR:-/tmp}/restaurant-staff-demo-$(date +%Y%m%d-%H%M%S).dump"
if docker exec restaurant-staff-demo psql -U postgres -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='staff_demo'" | grep -q 1; then
  docker exec restaurant-staff-demo pg_dump -U postgres -Fc staff_demo > "$backup"
  printf 'Đã lưu bản sao dữ liệu demo tại %s\n' "$backup"
  docker exec restaurant-staff-demo psql -v ON_ERROR_STOP=1 -U postgres -d postgres -c 'DROP DATABASE staff_demo WITH (FORCE)'
fi
docker exec restaurant-staff-demo psql -v ON_ERROR_STOP=1 -U postgres -d postgres -c 'CREATE DATABASE staff_demo'
exec ./scripts/staff-demo-setup.sh

#!/usr/bin/env bash
# Sao lưu TOÀN BỘ cơ sở dữ liệu PostgreSQL (mọi bảng, kể cả của các nhóm khác) ra tệp .sql.
# Chạy từ thư mục gốc dự án khi container postgres đang chạy:  bash scripts/db-backup.sh
set -euo pipefail
CONTAINER="${DB_CONTAINER:-restaurant_postgres}"
DB_USER="${DB_USER:-admin}"
DB_NAME="${DB_NAME:-restaurant_db}"
mkdir -p backups
OUT="backups/${DB_NAME}-$(date +%Y%m%d-%H%M%S).sql"
docker exec "$CONTAINER" pg_dump -U "$DB_USER" --clean --if-exists "$DB_NAME" > "$OUT"
echo "Đã sao lưu: $OUT"

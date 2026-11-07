#!/usr/bin/env bash
# Phục hồi cơ sở dữ liệu từ tệp .sql tạo bởi db-backup.sh:  bash scripts/db-restore.sh backups/xxx.sql
# Cảnh báo: ghi đè dữ liệu hiện tại. Nên dừng backend trước khi chạy.
set -euo pipefail
FILE="${1:?Cách dùng: bash scripts/db-restore.sh <tệp.sql>}"
CONTAINER="${DB_CONTAINER:-restaurant_postgres}"
DB_USER="${DB_USER:-admin}"
DB_NAME="${DB_NAME:-restaurant_db}"
read -r -p "Dữ liệu hiện tại sẽ bị ghi đè bởi $FILE. Gõ YES để tiếp tục: " ans
[ "$ans" = "YES" ] || { echo "Đã hủy."; exit 1; }
docker exec -i "$CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1 < "$FILE"
echo "Đã phục hồi từ $FILE"

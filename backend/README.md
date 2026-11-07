# Backend

Dùng [README gốc](../README.md) cho cách chạy backend/DB Docker, bootstrap, demo, backup và kiểm tra. Dùng [chuẩn nền tảng](../docs/FOUNDATION.md) cho tài khoản, nguồn dữ liệu và ranh giới module.

Không chạy script seed riêng hoặc reset DB dùng chung. `backend/scripts/docker-init.mjs` chỉ chạy migration; dữ liệu được tạo bằng lệnh bootstrap/demo rõ ràng từ root.

# Backend

Cách chạy hiện tại nằm trong [README root](../README.md).

Backend là package độc lập. Nếu chạy local: vào `backend`, chạy `npm ci`, `npm run build`, rồi `npm run start:dev`. Docker cũng chỉ dùng thư mục backend để cài/build; không cần frontend.

Lệnh trong backend/package.json:

- npm run build: Prisma generate rồi Nest build.
- npm run start:dev: chạy Nest watch nếu chủ động chọn chạy backend local.
- npm run db:migrate: Prisma migrate deploy; bạn tự chạy khi có migration mới.
- npm run db:seed: tạo tài khoản chủ, vai trò và dữ liệu nền; không tự chạy khi bật API.
- npm test: unit test.
- npm run test:e2e: build và chạy API E2E.

Không còn backend-init hay script docker-init. Docker chỉ khởi động node dist/main.js.

Prisma dùng `prisma.config.ts` mặc định. Giữ schema, migration và seed nền đang dùng; bỏ SQL mẫu lỗi thời và model ledger Ingredient/StockBatch cũ. Migration dọn ledger sẽ dừng nếu các bảng cũ còn bản ghi, tránh mất dữ liệu. Các bảng `staff_kitchen_*` vẫn được dùng qua SQL trực tiếp hoặc trigger DB, kể cả model có `@@ignore`.

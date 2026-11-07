# Tài liệu dự án

Đọc theo thứ tự:

1. [README gốc](../README.md): dự án hiện ở đâu, đã thay đổi gì, cách chạy.
2. [TESTING.md](TESTING.md): tài khoản demo, lệnh test, checklist và phần còn thiếu.
3. [FOUNDATION.md](FOUNDATION.md): quy tắc dữ liệu, tài khoản, quyền và ranh giới module để giao việc.

RESOURCE_AUDIT.md và CLEANUP_PENDING.md là nhật ký dọn dẹp, không cần đọc để bắt đầu. PROJECT_STATUS.md là báo cáo lịch sử trước chuẩn hóa.

## Website handbook

Phần dưới chỉ dành cho người chỉnh website tài liệu, không phải lệnh chạy ứng dụng nhà hàng.

```sh
cd docs
npm ci
npm run dev
```

Chạy `npm run build` trong `docs` trước khi push.

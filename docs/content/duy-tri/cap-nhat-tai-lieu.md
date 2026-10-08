---
id: BASE-6
specStatus: Nền tảng
codeStatus: Không biểu thị tiến độ code
owner: Nhóm dự án
reviewed: '2026-10-08'
summary: Cập nhật tài liệu
---

# Cập nhật tài liệu

Sửa nguồn trong `docs/content/`. Website và `PROJECT_HANDBOOK.md` được sinh từ nguồn này.

Mỗi tính năng chỉ cần mục tiêu, luồng chính và cách kiểm tra. Bổ sung API, dữ liệu và ngoại lệ khi đã thống nhất trong quá trình làm. Quy tắc dùng chung viết một lần rồi dẫn liên kết.

Trang mới dùng metadata như các trang hiện có và được thêm vào `docs/navigation.json` với `path`, `title`, `group`. Thêm `handbookOrder` nếu cần đưa vào bản tổng hợp.

Chạy trong thư mục `docs/`:

```sh
npm ci
npm run dev
# Kiểm tra và sinh bản tổng hợp trước khi push:
npm run build
```

[Cấu hình xuất bản website](/duy-tri/xuat-ban).

---
id: FEATURE-MAP
specStatus: Bản đồ phạm vi
codeStatus: Chưa xác minh triển khai
owner: Nhóm dự án
reviewed: '2026-09-29'
summary: Điểm tra cứu tính năng và các tham chiếu chung.
---

# Bản đồ tính năng

<DocMeta />

Hiện có mô tả luồng chung; chưa có đặc tả chi tiết đã duyệt cho từng tính năng. Khi làm sâu một tính năng, tạo trang riêng theo mẫu và cập nhật liên kết ở đây.

| Nhóm tính năng | Đọc nghiệp vụ | Phụ thuộc cần biết |
|---|---|---|
| Tài khoản & quản trị | [Vai trò và quyền](/architecture/permissions) | Trạng thái tài khoản, dữ liệu gốc |
| Đặt bàn & phiên | [Luồng nghiệp vụ, mục 6.2](/features/workflows) | Bàn, khung giờ, QR, quyền phiên |
| Gọi món & bếp | [Luồng nghiệp vụ, mục 6.3](/features/workflows) | Phiên, menu, hủy món, trạng thái bếp |
| Thanh toán & thành viên | [Luồng nghiệp vụ, mục 6.4](/features/workflows) | Chính sách tiền, callback, tích điểm |
| Kho & sản xuất | [Luồng nghiệp vụ, mục 6.5–6.7](/features/workflows) | BOM, phiếu, transaction, quy đổi |
| Báo cáo & Big Data | [Dữ liệu và KPI](/features/analytics) | Nguồn, thời điểm dữ liệu, công thức KPI |

## Trước khi code

- Tra [quyết định còn mở](/decisions/open) liên quan tính năng.
- Mã trạng thái và API hiện tại còn là đề xuất: [trạng thái](/reference/states), [API](/reference/api).
- Không tự nối POS với trừ kho khi D01 chưa được chốt.

## Khi một trang dài lên

Bắt đầu bằng `features/ordering/index.md`. Chỉ tách `rules.md`, `api.md`, `ui.md` khi có nội dung thực tế đủ lớn. Trang `index.md` luôn giữ tóm tắt và đường dẫn đọc tiếp.

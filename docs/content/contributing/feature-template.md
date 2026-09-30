---
id: TEMPLATE-FEATURE
specStatus: Mẫu viết tài liệu
codeStatus: Không áp dụng
owner: Nhóm dự án
reviewed: '2026-09-29'
summary: Mẫu thống nhất để bắt đầu đặc tả một tính năng.
---

# Mẫu đặc tả tính năng

<DocMeta />

Sao chép mẫu dưới vào trang tính năng mới. Điền thông tin thực tế; mục chưa biết ghi rõ “Mở”, không tự tạo quyết định.

````md
---
id: FEAT-TEN-TINH-NANG
specStatus: Nháp
codeStatus: Chưa triển khai
owner: Tên người phụ trách
reviewed: 'YYYY-MM-DD'
summary: Một câu mô tả mục tiêu tính năng.
---

# Tên tính năng

<DocMeta />

Tóm tắt: ai cần làm gì và kết quả mong muốn.

## Phạm vi

- Trong phạm vi:
- Ngoài phạm vi:
- Liên quan môn/module nào:

## Người dùng và quyền

Ai xem, tạo, sửa, xác nhận, hủy? Dẫn đến quy tắc quyền chung.

## Luồng chính

1. Điều kiện bắt đầu.
2. Dữ liệu nhập và hành động.
3. Backend kiểm tra/xử lý.
4. Kết quả và dữ liệu lưu.

## Quy tắc và trạng thái

| Mã | Quy tắc | Hiệu lực | Căn cứ |
|---|---|---|---|
| RULE-01 | ... | Mở / đề xuất / đã chốt | ... |

## Ngoại lệ

Thiếu dữ liệu, trái quyền, sai trạng thái, retry và thao tác đồng thời.

## Dữ liệu và API

Dẫn đến hợp đồng chính. Chỉ mô tả phần riêng của tính năng, không chép lại toàn bộ schema.

## Giao diện

Màn hình, trường nhập, trạng thái trống/đang tải/lỗi/thành công.

## Tiêu chí nghiệm thu

- Given ... When ... Then ...
- Trường hợp biên và minh chứng cần có.

## Còn mở

Mã quyết định, người cần chốt, phần triển khai bị ảnh hưởng.

## Đọc liên quan

Liên kết đến trang cha, API, dữ liệu, quyền, quyết định và test.
````

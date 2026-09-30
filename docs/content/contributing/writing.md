---
id: GUIDE-WRITING
specStatus: Quy ước áp dụng cho cổng tài liệu
codeStatus: Không áp dụng
owner: Nhóm dự án
reviewed: '2026-09-29'
summary: Cách thêm và sửa tài liệu để giữ một nguồn đúng và không có trang lạc mục lục.
---

# Viết và cập nhật tài liệu

<DocMeta />

## Một nguồn đúng

Chỉnh nội dung trong `docs/content/`. Không sửa trực tiếp `PROJECT_HANDBOOK.md`: file đó được sinh bằng `npm run export`. Không sửa HTML đã build. Bản cũ nằm trong `docs/archive/` và không được xuất bản.

| Cần viết gì? | Đặt ở đâu? |
|---|---|
| Giới thiệu, phạm vi, bắt đầu | `content/start/` |
| Một tính năng cụ thể | `content/features/<ten-tinh-nang>/` |
| Quy tắc kỹ thuật dùng chung | `content/architecture/` hoặc `content/reference/` |
| Quyết định và lý do | `content/decisions/` |
| Yêu cầu, minh chứng môn học | `content/courses/` |
| Hướng dẫn cho người viết | `content/contributing/` |

## Thêm một trang

1. Dùng [mẫu tính năng](/contributing/feature-template); bắt đầu bằng một trang, không tạo thư mục rỗng hàng loạt.
2. Điền mã `id` duy nhất, người phụ trách, ngày rà soát, tóm tắt, trạng thái đặc tả và code.
3. Thêm trang vào `docs/navigation.json`: `path`, `title`, `group`. Chỉ các chương thuộc bản tổng hợp mới có `handbookOrder`.
4. Cập nhật liên kết từ [bản đồ tính năng](/features/) hoặc trang cha thích hợp.
5. Chạy `npm run build` trong `docs/`. Build kiểm tra metadata, mục lục, đường dẫn và liên kết trang.
6. Review rồi merge/push lên `main`; Cloudflare cập nhật khi đã kết nối Git.

## Giữ trang ngắn và dễ đọc

- Đầu trang: một đoạn tóm tắt và mục tiêu. Mỗi trang trả lời một câu hỏi chính.
- Luồng dùng sơ đồ hoặc danh sách bước; trạng thái và so sánh dùng bảng.
- Chi tiết ít dùng có thể đặt trong `<details><summary>Chi tiết</summary>…</details>`.
- Quy tắc dùng chung chỉ viết một lần; các trang khác dẫn đến nguồn.
- Mục tiêu đề xuất: đọc phần chính trong vài phút. Tách trang theo nhu cầu tra cứu thực tế, không theo số dòng cứng.

## Đổi yêu cầu

Sửa trang nguồn → ghi quyết định nếu ảnh hưởng nhiều module → cập nhật API/data/test liên quan → rà soát → xuất bản. Không chỉ viết thêm ghi chú mới rồi để quy tắc cũ vẫn có vẻ hiệu lực.

`reviewed` là ngày con người rà soát nội dung; “Cập nhật từ Git” là thời điểm commit. Hai thông tin không thay thế nhau.

## Chạy trên máy

Từ thư mục repo:

```sh
cd docs
npm ci
npm run dev
```

Lưu Markdown sẽ cập nhật bản xem trước. Kiểm tra bản xuất bản bằng `npm run build`, sau đó `npm run preview`. Cổng terminal in ra là địa chỉ cần mở.

## Phạm vi công khai

Chỉ `content/` và tài nguyên trong `content/public/` được build thành website. Chưa tải PDF nguồn lên website. Không đặt thông tin đăng nhập, dữ liệu người dùng thật hoặc báo cáo riêng tư trong phần nguồn công khai.

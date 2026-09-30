---
id: PLAN-AI-CONTEXT
specStatus: Thiết kế để làm bước sau
codeStatus: Chưa xây bộ sinh ngữ cảnh
owner: Nhóm dự án
reviewed: '2026-09-29'
summary: Cách chuẩn bị ngữ cảnh AI ngắn nhưng không làm lệch đặc tả.
---

# Ngữ cảnh cho AI: kế hoạch

<DocMeta />

Chưa tạo bản tối ưu token ở bước này. Các trang hiện có mã và mục lục thống nhất để phục vụ việc sinh ngữ cảnh sau đó.

## Ba tầng đọc

| Tầng | Nội dung | Khi đọc |
|---|---|---|
| Core | Mục tiêu, ranh giới ba môn, công nghệ đã chốt, bất biến và điểm mở quan trọng | Bắt đầu tác vụ |
| Index | Mã tài liệu, mô tả ngắn, đường dẫn và quan hệ | Chọn ngữ cảnh |
| Task pack | Chỉ các phần liên quan tính năng được giao | Khi triển khai cụ thể |

## Ví dụ tác vụ gọi món

Core → đặc tả gọi món → phiên phục vụ → quyền liên quan → API/trạng thái → test. Không đọc lại toàn bộ báo cáo môn hoặc pipeline phân tích nếu không liên quan.

## Quy tắc để bản ngắn không sai

- Giữ phủ định, điều kiện, ngoại lệ và nhãn đã chốt/chưa chốt.
- Gắn mã nguồn tài liệu và commit; bản sinh phải biết mình dựa trên phiên bản nào.
- Mục tiêu ngân sách token được đặt theo tác vụ rồi đo bằng tokenizer phù hợp; không khẳng định số từ là số token.
- Không cập nhật bản AI độc lập với nguồn. Thay đổi nguồn phải đánh dấu gói tóm tắt cần rà soát hoặc sinh lại.
- Khi nội dung không đủ, AI phải đọc trang gốc theo mục lục; không suy đoán từ tóm tắt.

---
id: "HDB-14"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Bắt đầu code"
---

# 14. Hướng dẫn bắt đầu code cho người nhận bàn giao

<DocMeta />

## 14.1 Những việc có thể bắt đầu ngay

1. Đọc mục 0 và danh sách quyết định mở; kiểm tra repo thực tế vì hiện trạng có thể thay đổi sau ngày tài liệu.
2. Đề xuất cấu trúc module NestJS theo mục 8; chọn và ghi rõ package manager/ORM/phiên bản runtime trước khi nhóm cài đặt.
3. Tạo skeleton backend, cấu hình môi trường mẫu không có secret, kết nối CSDL, migration và health endpoint.
4. Triển khai auth, tài khoản, vai trò và kiểm tra permission; chuẩn bị ba tài khoản MRP và các vai trò SE cần thiết.
5. Chốt OpenAPI cho một module trước; frontend dùng mock theo đúng DTO rồi nối API.
6. Làm danh mục nguyên liệu, đơn vị, nhà cung cấp, bàn và menu; tránh đưa chính sách trừ kho còn mở vào CRUD.
7. Xây dịch vụ tồn kho và luồng phiếu MRP độc lập; giữ tích hợp POS ở ranh giới đã nêu.
8. Chuẩn bị data contract và tập dữ liệu nhỏ đối soát cho Big Data, chưa cần chờ giao diện hoàn chỉnh.

## 14.2 Cấu trúc thư mục đề xuất

```text
backend/
  src/modules/        # các module nghiệp vụ mục 8
  src/common/         # validation, errors, guards, logging
  database/           # migrations và seed theo ORM được chọn
  test/               # kiểm thử tích hợp/nghiệp vụ
frontend/
  admin-web/          # khu Admin và khu quản lý riêng
  customer-web/       # khách tại bàn
  staff-app/          # ứng dụng nhân viên
  member-app/         # ứng dụng thành viên
analytics/
  contracts/          # schema input/output
  jobs/               # xử lý và phân tích
  data-generator/     # dữ liệu thử nghiệm tái lập
  experiments/        # cấu hình và kết quả đo
docs/
  PROJECT_HANDBOOK.md # tài liệu này
```

Cấu trúc này chưa được tạo ngoài tài liệu. Có thể điều chỉnh số ứng dụng/monorepo sau khi nhóm chốt cách đóng gói; không cần tạo bốn frontend chỉ để giữ tên thư mục nếu có phương án dùng chung phù hợp.

## 14.3 Quy ước làm việc đề xuất

- Mỗi tính năng có người phụ trách, DTO, trạng thái, quyền, tiêu chí hoàn thành và minh chứng.
- Schema thay đổi qua migration có review; không mỗi máy tự sửa DB rồi gửi ảnh.
- Không commit mật khẩu hoặc dữ liệu cá nhân thật vào seed.
- API/DTO thay đổi phải cập nhật OpenAPI và báo các module phụ thuộc.
- Lệnh setup/run/test phải được ghi vào README khi skeleton tồn tại. Hiện chưa có lệnh được kiểm chứng; không coi bất kỳ lệnh cài đặt tưởng tượng nào là đã chạy thành công.
- Tách hoàn thành code, kiểm thử và hoàn thành báo cáo; một task UI có màn hình chưa đồng nghĩa nghiệp vụ đã chạy đúng.

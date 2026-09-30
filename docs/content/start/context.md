---
id: "HDB-01"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Bối cảnh dự án"
---

# 1. Bối cảnh và mục tiêu chung

<DocMeta />

## 1.1 Một sản phẩm, ba góc đánh giá

**[CHỐT] Cùng một nhóm 5 người xây dựng một hệ thống quản lý nhà hàng chung cho ba môn:** Software Engineering (SE), Hệ thống thông tin doanh nghiệp (HTTTDN) và Nhập môn dữ liệu lớn (Big Data).

Không chia thành ba nhóm độc lập. Phần mềm và dữ liệu được dùng chung khi hợp lý; hồ sơ báo cáo, minh chứng và tiêu chí đánh giá vẫn theo từng môn.

| Môn | Trách nhiệm trong sản phẩm | Kết quả cần nhìn thấy |
|---|---|---|
| SE | Vận hành phục vụ khách và trải nghiệm sử dụng | Đặt bàn, phiên phục vụ, gọi món, bếp xử lý, thanh toán, thành viên |
| HTTTDN | Toàn bộ cấu hình/quản trị và nghiệp vụ MRP | Admin, tài khoản, danh mục, kho, công thức, sản xuất, duyệt phiếu, báo cáo kho |
| Big Data | Xử lý/phân tích dữ liệu từ SE và HTTTDN | KPI có cơ sở, kết quả phân tích có diễn giải, thực nghiệm và dữ liệu phục vụ dashboard |

**[CHỐT] Backend ứng dụng dùng NestJS.** Các đoạn FastAPI trong kế hoạch cũ là thông tin không còn phù hợp với quyết định backend này. Công cụ xử lý Big Data là lựa chọn riêng, chưa chốt; không suy ra mọi tác vụ phân tích phải viết bằng NestJS.

## 1.2 Bài toán thực tế

Nhà hàng cần kết nối hoạt động ở bàn, bếp, thu ngân và kho. Khi khách gọi món, bộ phận bếp cần nhận đúng yêu cầu; phục vụ biết món đã xong; thu ngân tính đúng hóa đơn; quản lý theo dõi nguồn nguyên liệu và thành phẩm. Dữ liệu bán hàng và kho tiếp tục được phân tích để hiểu doanh thu, sức bán, thời điểm đông khách và nhu cầu nguyên liệu.

Mục tiêu sản phẩm là một chuỗi nghiệp vụ có dữ liệu nhất quán, thay vì các màn hình chỉ hiển thị dữ liệu rời rạc.

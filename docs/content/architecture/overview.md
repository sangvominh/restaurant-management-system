---
id: "HDB-08"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Kiến trúc hệ thống"
---

# 8. Kiến trúc triển khai đề xuất

<DocMeta />

## 8.1 Công nghệ

| Thành phần | Lựa chọn | Mức độ |
|---|---|---|
| Backend ứng dụng | NestJS | CHỐT |
| CSDL nghiệp vụ | PostgreSQL | KẾ HOẠCH |
| Web | React | KẾ HOẠCH |
| Mobile | React Native | KẾ HOẠCH |
| Giao tiếp | REST cho command/query; WebSocket cho cập nhật tức thời | KẾ HOẠCH |
| Xác thực | JWT cho tài khoản; quyền phiên riêng cho khách vãng lai | JWT theo kế hoạch; thiết kế phiên khách là ĐỀ XUẤT |
| Big Data | Chọn sau dựa trên quy trình và thực nghiệm; có thể đánh giá Spark SQL/PySpark | MỞ |
| ORM, quản lý package, UI library, triển khai | Chưa chọn | MỞ |

## 8.2 Cách tổ chức

**[ĐỀ XUẤT] Bắt đầu với backend NestJS chia module trong một ứng dụng**, dùng transaction CSDL cho các nghiệp vụ liên quan. Chưa có yêu cầu buộc dùng microservices. Tách job phân tích khỏi đường xử lý request vận hành.

Luồng kết nối:

```text
Web Admin / Web khách / App nhân viên / App thành viên
                  | REST + WebSocket
                  v
              NestJS API
     Auth | Catalog | Dining | Orders | Billing
          Inventory | Production | Reporting
                  |
                  v
          PostgreSQL nghiệp vụ
                  |
          export/snapshot có schema
                  v
        Xử lý dữ liệu / phân tích Big Data
                  |
           kết quả KPI có phiên bản
                  v
      API đọc kết quả → Dashboard quản trị/vận hành
```

Đây là kiến trúc đề xuất, chưa chốt việc dùng chung database vật lý hay kho kết quả riêng. Big Data không được trực tiếp quyết định thanh toán hoặc thay đổi tồn kho trong phạm vi hiện tại.

## 8.3 Module backend và quyền sở hữu dữ liệu

| Module | Sở hữu |
|---|---|
| Auth / Users | Tài khoản, vai trò, phiên truy cập |
| Catalog / Restaurant | Khu vực, bàn, menu, giá, mã QR |
| Reservations / Sessions | Đặt bàn, check-in, phiên phục vụ |
| Orders / Kitchen | Order, dòng món, trạng thái bếp |
| Billing / Payments | Hóa đơn, ưu đãi áp dụng, kết quả thanh toán |
| Membership | Hồ sơ thành viên, sổ điểm |
| Inventory | Hàng kho, đơn vị, nhà cung cấp, phiếu, movement, tồn |
| Production | BOM, phiên bản công thức, lệnh sản xuất |
| Reporting / Analytics gateway | Báo cáo nghiệp vụ và đọc kết quả phân tích |
| Audit | Dấu vết các thao tác cần truy xuất |

Module khác không cập nhật trực tiếp bảng tồn, thanh toán hoặc điểm. Gọi service sở hữu nghiệp vụ để giữ transaction và kiểm tra quyền/trạng thái.

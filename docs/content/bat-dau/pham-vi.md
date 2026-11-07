---
title: Phạm vi hiện tại
description: Các giao diện đang có và giới hạn triển khai của dự án.
---

# Phạm vi hiện tại

| Giao diện | Nội dung hiện có | Giới hạn |
| --- | --- | --- |
| Admin server | Tài khoản, vai trò, quyền, danh mục quản trị, cấu hình, nhật ký, báo cáo và backup | Backup JSON chỉ chứa dữ liệu quản trị |
| Kho | Tồn nguyên liệu, nhập kho, duyệt xuất và lịch sử biến động | Cần kiểm tra quyền và chi nhánh trên từng luồng |
| Bán hàng | Sản phẩm, BOM, thành phẩm và màn hình vận hành đã có | Chưa có đầy đủ luồng quản lý bán hàng; `/operations` còn cố định `BR001` và điều hướng cũ |
| Nhân sự | Khung giao diện dành cho chủ hệ thống | Chưa có hồ sơ nhân sự đầy đủ, chấm công hoặc tính lương |
| Staff | Ca làm, yêu cầu cấp nguyên liệu, tồn bếp, chế biến, thành phẩm và xem hóa đơn | Sơ đồ bàn, gọi món và thanh toán trên giao diện chưa hoàn thiện |
| Guest | Template Next.js và tài nguyên thiết kế | Chưa có luồng khách hàng gọi API nghiệp vụ |

Backend đã có API hóa đơn, đơn món và thanh toán; việc API có sẵn không có nghĩa các màn hình tương ứng đã hoàn thiện. Các trang `/preview` của Staff chỉ dùng dữ liệu mẫu trên giao diện.

Danh sách này phản ánh thư mục ứng dụng đang có trong repository. Tài nguyên thiết kế và các yêu cầu môn học không được tính là chức năng đã triển khai.

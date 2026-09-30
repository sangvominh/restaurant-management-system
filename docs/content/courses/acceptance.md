---
id: "HDB-15"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Kiểm thử & demo"
---

# 15. Kiểm thử, dữ liệu demo và tiêu chí hoàn thành

<DocMeta />

## 15.1 Kiểm thử ưu tiên theo rủi ro

| Tình huống | Kết quả mong đợi |
|---|---|
| Nhân viên gọi API quản trị/duyệt kho trái quyền | Bị chặn, dữ liệu không đổi |
| Khách truy cập phiên khác | Không xem/sửa dữ liệu của bàn khác |
| Hai người đặt cùng bàn cùng giờ | Chỉ giao dịch phù hợp quy tắc được chấp nhận |
| Retry tạo order do mạng chậm | Chỉ có một order cho một khóa yêu cầu |
| Bếp bắt đầu đồng thời với khách hủy | Chỉ một chuyển trạng thái hợp lệ thành công |
| Gọi thêm sau khi phiên đóng | Bị từ chối |
| Duyệt phiếu hai lần / hai người duyệt | Chỉ một bộ movement và một lần trừ |
| Hai phiếu tranh cùng tồn cuối | Không âm tồn; giao dịch không đủ bị rollback |
| Một dòng trong phiếu nhiều dòng bị thiếu | Không trừ một phần các dòng khác |
| Công thức g, tồn kg | Kết quả quy đổi và lượng trừ chính xác |
| Hoàn tất sản xuất hai lần | Cộng thành phẩm một lần, không trừ lại nguyên liệu |
| Hủy phiếu chưa duyệt | Không thay đổi tồn |
| Retry callback thanh toán | Không ghi tiền, đóng phiên hoặc cộng điểm lần hai |
| Mất kết nối WebSocket rồi nối lại | UI khôi phục đúng trạng thái từ API |
| KPI trên dữ liệu kiểm chứng | Khớp đáp án và đối soát nguồn |
| Chạy lại pipeline trên cùng input | Không nhân đôi kết quả hoặc sai tổng |

## 15.2 Dữ liệu demo

Kế hoạch HTTTDN đề xuất tối thiểu ba role MRP, nhà cung cấp, 10 nguyên liệu, 5 thành phẩm, BOM và 10–20 giao dịch nhiều trạng thái. Đây là bộ demo nhóm đặt ra, không phải quy mô đủ cho thí nghiệm Big Data.

**[ĐỀ XUẤT]** Bổ sung bàn/khu vực, món bán, khách thành viên, một phiên đang phục vụ, một phiên đã thanh toán, một đặt bàn bị hủy và các trường hợp thiếu nguyên liệu. Seed phải chạy lại được và biết rõ số dư ban đầu đến từ chứng từ nào.

## 15.3 Kịch bản demo xuyên suốt

1. Admin đăng nhập, quản lý tài khoản/danh mục và cho thấy khu vực riêng.
2. Quản lý nhập nguyên liệu, tạo công thức và lệnh sản xuất.
3. Nhân viên đề nghị xuất; quản lý duyệt; nhân viên hoàn tất; kiểm tra tồn.
4. Khách check-in/gọi món; bếp và phục vụ cập nhật; khách thấy trạng thái.
5. Thu ngân tính tiền, thanh toán; phiên đóng và điểm cập nhật.
6. Mở báo cáo kho và dashboard phân tích, chỉ rõ nguồn và thời điểm dữ liệu.
7. Chạy trường hợp duyệt lặp/thiếu tồn; cho thấy hệ thống vẫn nhất quán.

Cho đến khi chốt POS–MRP, bước phục vụ và bước sản xuất được demo như hai luồng có ranh giới rõ; không tuyên bố đã tự động liên thông trừ kho.

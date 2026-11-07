---
title: Luồng nghiệp vụ
description: Luồng nhập kho, cấp bếp, chế biến, thành phẩm và thanh toán trong code hiện tại.
---

# Luồng nghiệp vụ

Các bước dưới đây mô tả cách backend xử lý dữ liệu. Mức hoàn thiện của từng giao diện được ghi riêng ở [Phạm vi hiện tại](/bat-dau/pham-vi).

## Nhập nguyên liệu và cấp bếp

1. Kho lập phiếu nhập theo chi nhánh, nhà cung cấp, nguyên liệu, lô, hạn sử dụng, số lượng và đơn vị.
2. Staff đề nghị lĩnh từ tồn phù hợp; phiếu bắt đầu ở `PENDING`.
3. Khi kho duyệt, tồn kho chính giảm. Trigger ghi nhận lần nhận theo chi tiết phiếu và cộng tồn bếp trong cùng giao dịch, tránh cộng lại khi xử lý lặp.
4. Tồn bếp được theo dõi theo chi nhánh và lô; sổ nguồn lĩnh lưu lượng còn lại để phân bổ và hoàn trả.

Lô còn hiệu lực đến hết ngày hết hạn theo giờ Việt Nam. Lô hết hạn hoặc chưa có hạn vẫn có thể xuất hiện để đối chiếu, nhưng không được tính vào nguyên liệu dùng chế biến. Không tự suy đoán hạn còn thiếu.

## Đơn món và hóa đơn

1. Nhân viên tạo hóa đơn gắn với bàn và nhãn nhận diện khách; khách vãng lai không bắt buộc có tài khoản.
2. Gọi món tạo đơn và dòng món theo menu của chi nhánh. Tạo đơn chưa trừ nguyên liệu.
3. Dòng món chuyển `QUEUED → COOKING → READY → SERVED`. Trước khi bắt đầu, backend kiểm tra định lượng BOM và tồn khả dụng tại bếp.
4. Khi báo `READY`, backend kiểm tra lại và trừ nguyên liệu theo BOM, đơn vị quy đổi và lô hợp lệ trong cùng giao dịch. Nếu thiếu nguyên liệu, giao dịch không hoàn thành.
5. Thu ngân ghi nhận thanh toán hóa đơn. Thanh toán không trừ nguyên liệu lần nữa; báo cáo doanh thu đọc giao dịch đã thanh toán.

## Sản xuất và thành phẩm

Lệnh sản xuất liên kết BOM và số lượng kế hoạch. Staff kiểm tra nguyên liệu, bắt đầu và báo số lượng hoàn thành. Phiếu báo thành phẩm ở `PENDING` chưa làm tăng tồn thành phẩm; chỉ lượng được duyệt mới nhập tồn.

Backend có cơ chế báo theo nhiều đợt, nhưng luồng kiểm tra và duyệt phía quản lý vẫn cần đối chiếu khi nghiệm thu. Không coi cả luồng đã hoàn thiện chỉ vì Staff gửi được phiếu.

Lệnh dùng tồn bếp ghi tiêu hao theo phiếu báo. Lệnh được cấp nguyên liệu trực tiếp từ kho không trừ lại cùng lượng đó ở tồn bếp.

## Hao hụt, sự cố và hoàn trả

- Hao hụt và hoàn trả mới giữ lượng chờ xử lý ở `reserved_waste` hoặc `reserved_return`. Lượng giữ không được tính vào tồn khả dụng.
- Duyệt hao hụt mới giảm tồn; từ chối giải phóng lượng giữ. Sự cố chế biến và các dòng nguyên liệu liên quan được quyết định trong cùng giao dịch.
- Duyệt hoàn trả giảm tồn bếp và tăng lại tồn ở vị trí xuất gốc, ghi biến động `RETURN`.
- `staff_kitchen_sources` và `staff_kitchen_source_allocations` theo dõi lượng thuộc từng nguồn lĩnh. Dữ liệu cũ không đủ nguồn không được tự gán vào phiếu mới.

Các service quyết định nằm trong module Staff và được backend quản lý gọi sau khi kiểm tra quyền. Không cập nhật trạng thái hoặc số dư trực tiếp để bỏ qua nghiệp vụ.

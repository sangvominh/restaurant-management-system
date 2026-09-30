---
id: "HDB-09"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Mô hình dữ liệu"
---

# 9. Mô hình dữ liệu định hướng

<DocMeta />

Đây là **[ĐỀ XUẤT] mô hình logic**, không phải SQL đã duyệt. Trường liệt kê là tối thiểu để thảo luận; cần migration, khóa ngoại, unique/check/index sau khi chốt.

| Nhóm / Bảng | Trường hoặc quan hệ chính |
|---|---|
| users, roles, user_roles | id, tên đăng nhập/email, password_hash, status; quyền theo role |
| customer_profiles | user_id, tên/thông tin liên hệ cần thiết; không bắt khách vãng lai có account |
| areas, dining_tables | area_id, table_code, capacity, active |
| reservations | customer_id, table_id, start_at, end_at, party_size, status |
| dining_sessions | table_id, reservation_id nullable, opened_at, closed_at, status |
| guest_session_access | session_id, định danh/credential băm, hạn dùng; cơ chế cấp còn mở |
| menu_categories, menu_items | tên, category_id, giá, trạng thái bán; không lưu lượng kho trực tiếp ở menu |
| orders, order_items | session_id, người tạo; menu_item_id, quantity, unit_price_snapshot, note, status |
| invoices, invoice_lines | session_id; dòng tiền được chốt, subtotal, discount, tax, fees, total, status |
| payments | invoice_id, method, amount, status, provider_reference/idempotency_key |
| promotions, promotion_redemptions | điều kiện và lần áp dụng; chi tiết chính sách còn mở |
| loyalty_entries | customer_id, delta_points, source_type, source_id, created_at |
| suppliers | mã, tên, liên hệ, trạng thái |
| units, item_unit_conversions | đơn vị cơ sở và hệ số quy đổi theo hàng khi cần |
| inventory_items | mã, tên, loại RAW/SEMI_FINISHED/FINISHED, base_unit_id, active |
| menu_inventory_mappings | quan hệ món bán–sản phẩm/công thức; chính sách tiêu hao còn mở |
| bom_versions, bom_lines | output_item_id, output_quantity, version; component_item_id, quantity, unit_id |
| production_orders | bom_version_id, target_quantity, assignee_id, status, material_status |
| stock_documents, stock_document_lines | type, status, supplier/production reference, người lập/duyệt; item, lượng, đơn vị |
| stock_movements | item_id, signed_quantity_base, source_document/line, reason, posted_at |
| stock_balances | item_id, quantity_base; cập nhật cùng transaction với movement |
| audit_logs | actor, action, entity, entity_id, timestamp, thông tin thay đổi cần thiết |
| analytics_runs, analytics_results | run_id, cửa sổ dữ liệu, phiên bản định nghĩa KPI, trạng thái, kết quả |

## 9.1 Quan hệ cần thống nhất

- Một bàn có nhiều phiên trong lịch sử; mỗi phiên có nhiều order; mỗi order có nhiều dòng.
- **[ĐỀ XUẤT cơ sở]** Một phiên có một hóa đơn đang hiệu lực; tách/gộp hóa đơn là mở rộng cần chốt.
- Một hóa đơn có thể có nhiều lần thử thanh toán; không đồng nghĩa hỗ trợ chia tiền trong phạm vi cơ sở.
- Một sản phẩm có nhiều phiên bản BOM; lệnh sản xuất giữ phiên bản hoặc bản chụp định lượng.
- Một chứng từ có nhiều dòng; mỗi dòng ghi sổ sinh movement có khóa chống lặp.
- Tồn kho và lượng bán là hai đại lượng khác nhau; không lấy số order thay cho số lượng món.

## 9.2 Quy tắc kiểu dữ liệu và ràng buộc

- Tiền dùng kiểu decimal hoặc số nguyên theo đơn vị tiền đã thống nhất; không dùng số thực nhị phân để tính hóa đơn.
- Lượng nguyên liệu dùng decimal; quantity phải dương ở dòng phiếu, dấu tăng/giảm thuộc movement.
- Lưu thời điểm nhất quán, đề xuất UTC; hiển thị/tổng hợp ngày kinh doanh theo `Asia/Ho_Chi_Minh`.
- Quy đổi kg↔g theo cùng đại lượng; quy đổi chai↔ml phụ thuộc sản phẩm/quy cách. Không dùng một hệ số toàn cục cho mọi loại chai.
- Không xóa cứng dữ liệu gốc đã được giao dịch tham chiếu; ngừng hoạt động hoặc chặn xóa có lý do. Yêu cầu “xóa” trên UI cần xử lý phù hợp lịch sử.
- Unique trên mã nghiệp vụ, reference thanh toán và khóa ghi sổ; index theo quan hệ và truy vấn thực tế.
- Migration là nguồn tạo CSDL có kiểm soát; cung cấp thêm script SQL/dữ liệu demo để đáp ứng HTTTDN.

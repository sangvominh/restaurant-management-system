-- HỢP ĐỒNG DỮ LIỆU CHO "BÁO CÁO TỔNG HỢP" (web admin)
-- Báo cáo chỉ đọc 2 view dưới đây. Khi nhóm hóa đơn và nhóm kho có bảng thật, chỉ cần tạo lại 2 view
-- trỏ vào bảng của họ, KHÔNG phải sửa code báo cáo.
--
-- Bước chuyển từ dữ liệu mẫu sang dữ liệu thật:
--   1. Trong trang Báo cáo bấm "Xóa dữ liệu mẫu".
--   2. Sửa tên bảng/cột cho khớp rồi chạy file này.
-- Đây là TEMPLATE, không tự chạy khi migrate/khởi động.
-- Mỗi dòng revenue phải là 1 hóa đơn đã thanh toán, không nhân bản do join chi tiết.
-- Stock chỉ chứa giao dịch đã tác động kho; không cộng cả đề nghị xuất và lần chế biến
-- cho cùng một lượng NVL. Tồn đầu cần đủ lịch sử/số dư chuyển đổi.

-- Doanh thu: mỗi dòng là một hóa đơn đã thanh toán.
--   paid_at : thời điểm thanh toán (timestamptz)
--   amount  : tổng tiền cuối cùng khách trả (sau khuyến mãi, đã gồm VAT)
CREATE OR REPLACE VIEW public.v_report_revenue AS
SELECT h.paid_at, h.total_amount AS amount
FROM hoa_don h                      -- <- đổi thành tên bảng hóa đơn thật
WHERE h.status = 'paid';            -- <- đổi điều kiện "đã thanh toán" cho đúng
COMMENT ON VIEW public.v_report_revenue IS 'Nguồn hóa đơn nghiệp vụ';

-- Nhập - xuất - tồn: mỗi dòng là một lần biến động của một NVL.
--   movement_type: 'import' (nhập), 'export' (xuất), 'waste' (hao hụt/hư hỏng)
--   quantity     : số lượng theo đơn vị cơ sở của NVL (luôn dương)
--   value        : thành tiền = quantity * đơn giá (dùng để cộng giữa các NVL khác đơn vị)
--   material_id  : int, uuid hoặc text; API chuẩn hóa về chuỗi.
--   unit_cost    : giá tại thời điểm giao dịch theo phương pháp tính giá đã thống nhất.
CREATE OR REPLACE VIEW public.v_report_stock AS
SELECT t.occurred_at, t.material_id::text AS material_id, m.name AS material_name, m.unit,
       t.movement_type, t.quantity, t.quantity * t.unit_cost AS value
FROM giao_dich_kho t                -- <- đổi thành bảng giao dịch kho thật
JOIN nguyen_vat_lieu m ON m.id = t.material_id;   -- <- đổi thành bảng NVL thật
COMMENT ON VIEW public.v_report_stock IS 'Nguồn giao dịch kho nghiệp vụ';

/**
 * Dữ liệu mẫu để xem/demo báo cáo khi nhóm kho và nhóm hóa đơn chưa có bảng thật.
 * Chỉ tạo các bảng demo_* và 2 view hợp đồng (public.v_report_revenue, public.v_report_stock).
 * Khi có bảng thật: xóa demo rồi nối hai view theo scripts/report-views-contract.sql.
 */
export const DEMO_INSTALL: string[] = [
  `DROP VIEW IF EXISTS public.v_report_revenue`,
  `DROP VIEW IF EXISTS public.v_report_stock`,
  `DROP TABLE IF EXISTS public.demo_stock_movements`,
  `DROP TABLE IF EXISTS public.demo_invoices`,
  `DROP TABLE IF EXISTS public.demo_materials`,

  `CREATE TABLE public.demo_materials (
     id int PRIMARY KEY,
     name varchar(100) NOT NULL,
     unit varchar(20) NOT NULL,
     unit_cost numeric(12,2) NOT NULL
   )`,
  `CREATE TABLE public.demo_invoices (
     id serial PRIMARY KEY,
     paid_at timestamptz NOT NULL,
     amount numeric(14,2) NOT NULL
   )`,
  `CREATE TABLE public.demo_stock_movements (
     id serial PRIMARY KEY,
     material_id int NOT NULL REFERENCES public.demo_materials(id),
     movement_type varchar(10) NOT NULL CHECK (movement_type IN ('import','export','waste')),
     quantity numeric(14,3) NOT NULL,
     occurred_at timestamptz NOT NULL
   )`,

  `INSERT INTO public.demo_materials (id, name, unit, unit_cost) VALUES
     (1, 'Thịt bò', 'kg', 250000),
     (2, 'Bánh phở', 'kg', 20000),
     (3, 'Hành lá', 'kg', 40000),
     (4, 'Dầu ăn', 'lít', 45000),
     (5, 'Gạo', 'kg', 18000),
     (6, 'Trứng gà', 'quả', 3500)`,

  // Hóa đơn: mỗi ngày 4-12 hóa đơn từ 01/01/2025 đến hôm nay.
  `INSERT INTO public.demo_invoices (paid_at, amount)
   SELECT (d + interval '10 hours' + random() * interval '11 hours') AT TIME ZONE 'Asia/Ho_Chi_Minh',
          round((80000 + random() * 420000) / 1000) * 1000
   FROM generate_series('2025-01-01'::timestamp, current_date::timestamp, interval '1 day') AS d,
        LATERAL generate_series(1, 4 + floor(random() * 9)::int) AS n`,

  // Tồn đầu: mỗi NVL nhập một lượng lớn ngày 31/12/2024 để tồn không bị âm.
  `INSERT INTO public.demo_stock_movements (material_id, movement_type, quantity, occurred_at)
   SELECT id, 'import', CASE WHEN id = 6 THEN 1500 ELSE 150 END,
          '2024-12-31 08:00'::timestamp AT TIME ZONE 'Asia/Ho_Chi_Minh'
   FROM public.demo_materials`,
  // Nhập kho mỗi tuần.
  `INSERT INTO public.demo_stock_movements (material_id, movement_type, quantity, occurred_at)
   SELECT m.id, 'import',
          round(((CASE WHEN m.id = 6 THEN 290 ELSE 30 END) * (0.8 + random() * 0.7))::numeric, 1),
          (d + interval '8 hours') AT TIME ZONE 'Asia/Ho_Chi_Minh'
   FROM public.demo_materials m,
        generate_series('2025-01-01'::timestamp, current_date::timestamp, interval '7 days') AS d`,
  // Xuất kho mỗi ngày.
  `INSERT INTO public.demo_stock_movements (material_id, movement_type, quantity, occurred_at)
   SELECT m.id, 'export',
          round(((CASE WHEN m.id = 6 THEN 45 ELSE 4.5 END) * (0.6 + random() * 0.8))::numeric, 1),
          (d + interval '15 hours') AT TIME ZONE 'Asia/Ho_Chi_Minh'
   FROM public.demo_materials m,
        generate_series('2025-01-01'::timestamp, current_date::timestamp, interval '1 day') AS d`,
  // Hao hụt, hư hỏng khoảng 10 ngày một lần.
  `INSERT INTO public.demo_stock_movements (material_id, movement_type, quantity, occurred_at)
   SELECT m.id, 'waste',
          round(((CASE WHEN m.id = 6 THEN 8 ELSE 0.8 END) * (0.5 + random()))::numeric, 1),
          (d + interval '17 hours') AT TIME ZONE 'Asia/Ho_Chi_Minh'
   FROM public.demo_materials m,
        generate_series('2025-01-05'::timestamp, current_date::timestamp, interval '10 days') AS d`,

  `CREATE VIEW public.v_report_revenue AS
     SELECT paid_at, amount FROM public.demo_invoices`,
  `CREATE VIEW public.v_report_stock AS
     SELECT s.occurred_at, s.material_id, m.name AS material_name, m.unit,
            s.movement_type, s.quantity, (s.quantity * m.unit_cost) AS value
     FROM public.demo_stock_movements s JOIN public.demo_materials m ON m.id = s.material_id`,
  `COMMENT ON VIEW public.v_report_revenue IS 'system-admin-demo-v1'`,
  `COMMENT ON VIEW public.v_report_stock IS 'system-admin-demo-v1'`,
  `COMMENT ON TABLE public.demo_materials IS 'system-admin-demo-v1'`,
  `COMMENT ON TABLE public.demo_invoices IS 'system-admin-demo-v1'`,
  `COMMENT ON TABLE public.demo_stock_movements IS 'system-admin-demo-v1'`,
];

export const DEMO_REMOVE: string[] = [
  `DROP VIEW IF EXISTS public.v_report_revenue`,
  `DROP VIEW IF EXISTS public.v_report_stock`,
  `DROP TABLE IF EXISTS public.demo_stock_movements`,
  `DROP TABLE IF EXISTS public.demo_invoices`,
  `DROP TABLE IF EXISTS public.demo_materials`,
];

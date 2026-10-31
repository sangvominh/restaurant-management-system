-- Chuyển một lần từ quyền ủy quyền cũ sang System Admin độc quyền.
-- Chỉ thay mặc định cũ khi tên VÀ toàn bộ tập quyền còn đúng bản cũ.
-- Vai trò đã tùy chỉnh giữ các quyền nghiệp vụ, không bị reset theo tên.
BEGIN;
SELECT pg_advisory_xact_lock(17112026);

WITH defaults(name, old_permissions, new_permissions) AS (VALUES
  ('Quản lý kho',
    ARRAY['inventory:view','inventory:import','inventory:approve-export','bom:manage','supplier:manage','product:manage','report:view']::text[],
    ARRAY['supplier:manage','material:manage','inventory:import','inventory:approve-export','inventory:view']::text[]),
  ('Quản lý nhà hàng',
    ARRAY['dashboard:view','inventory:view','report:view']::text[],
    ARRAY['product:view','bom:manage','finished-goods:approve-export']::text[]),
  ('Nhân viên', ARRAY['production:request','inventory:view']::text[],
    ARRAY['shift:view','inventory:view','inventory:request-export','production:create','finished-goods:request-export']::text[]),
  ('Thu ngân', ARRAY['report:view']::text[],
    ARRAY['shift:view','inventory:view','inventory:request-export','production:create','finished-goods:request-export']::text[])
)
UPDATE roles r SET permissions = d.new_permissions
FROM defaults d
WHERE NOT r.is_system AND r.name = d.name
  AND r.permissions @> d.old_permissions AND r.permissions <@ d.old_permissions;

-- Quyền cũ gộp sản xuất/đề nghị được tách; product:manage trở thành quyền xem theo đặc tả.
-- Mọi quyền quản trị và wildcard bị loại khỏi vai trò thường.
UPDATE roles r SET permissions = ARRAY(
  SELECT DISTINCT mapped.permission
  FROM unnest(COALESCE(r.permissions, ARRAY[]::text[])) AS old(permission)
  CROSS JOIN LATERAL unnest(CASE old.permission
    WHEN 'product:manage' THEN ARRAY['product:view']::text[]
    WHEN 'production:request' THEN ARRAY['inventory:request-export','production:create','finished-goods:request-export']::text[]
    ELSE ARRAY[old.permission] END) AS mapped(permission)
  WHERE mapped.permission = ANY(ARRAY[
    'supplier:manage','material:manage','inventory:import','inventory:approve-export','inventory:view',
    'product:view','bom:manage','finished-goods:approve-export','shift:view',
    'inventory:request-export','production:create','finished-goods:request-export',
    'menu:view','order:create','order:view'
  ]::text[])
  ORDER BY mapped.permission
) WHERE NOT r.is_system;

-- Bổ sung vai trò mặc định còn thiếu, không ghi đè cấu hình đã có.
INSERT INTO roles (name, description, permissions) VALUES
  ('Quản lý kho', 'Quản lý kho', ARRAY['supplier:manage','material:manage','inventory:import','inventory:approve-export','inventory:view']),
  ('Quản lý nhà hàng', 'Quản lý nhà hàng', ARRAY['product:view','bom:manage','finished-goods:approve-export']),
  ('Nhân viên', 'Nhân viên', ARRAY['shift:view','inventory:view','inventory:request-export','production:create','finished-goods:request-export']),
  ('Khách hàng', 'Khách hàng', ARRAY['menu:view','order:create','order:view'])
ON CONFLICT (name) DO NOTHING;

-- Quyền đã đổi: phiên cũ phải đăng nhập lại, không dùng quyền lưu từ trước.
UPDATE accounts SET session_version = session_version + 1;
UPDATE login_logs SET logout_at = CURRENT_TIMESTAMP WHERE logout_at IS NULL;
COMMIT;

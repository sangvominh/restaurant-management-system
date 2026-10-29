/**
 * Danh mục quyền của toàn hệ thống.
 * Các nhóm kho / nhân viên của đồng đội dùng lại đúng các khóa này trong @RequirePermissions(...).
 * Khóa đặc biệt '*' (toàn quyền) chỉ gán cho vai trò hệ thống Admin, không nằm trong danh mục chọn được.
 */
export const PERMISSIONS = [
  { key: 'dashboard:view', label: 'Xem tổng quan hệ thống', group: 'Quản trị' },
  { key: 'account:manage', label: 'Quản lý tài khoản', group: 'Quản trị' },
  { key: 'role:manage', label: 'Quản lý vai trò & phân quyền', group: 'Quản trị' },
  { key: 'category:manage', label: 'Quản lý danh mục chung', group: 'Quản trị' },
  { key: 'setting:manage', label: 'Cấu hình hệ thống', group: 'Quản trị' },
  { key: 'audit:view', label: 'Xem nhật ký hệ thống', group: 'Quản trị' },
  { key: 'backup:manage', label: 'Sao lưu & phục hồi dữ liệu', group: 'Quản trị' },
  { key: 'supplier:manage', label: 'Quản lý nhà cung cấp', group: 'Danh mục MRP' },
  { key: 'product:manage', label: 'Quản lý sản phẩm', group: 'Danh mục MRP' },
  { key: 'inventory:view', label: 'Xem tồn kho', group: 'Kho' },
  { key: 'inventory:import', label: 'Nhập kho nguyên vật liệu', group: 'Kho' },
  { key: 'inventory:approve-export', label: 'Duyệt xuất kho', group: 'Kho' },
  { key: 'bom:manage', label: 'Quản lý công thức (BOM)', group: 'Kho' },
  { key: 'production:request', label: 'Yêu cầu sản xuất / đề nghị xuất', group: 'Nhân viên' },
  { key: 'report:view', label: 'Xem báo cáo thống kê', group: 'Báo cáo' },
] as const;

export const ALL_PERMISSION_KEYS: string[] = PERMISSIONS.map((p) => p.key);
export const WILDCARD = '*';

/** Quyền mặc định khi khởi tạo dữ liệu mẫu (theo tên vai trò). */
export const DEFAULT_ROLE_PERMISSIONS: Record<string, string[]> = {
  'Quản trị viên (Admin)': [WILDCARD],
  'Quản lý nhà hàng': ['dashboard:view', 'inventory:view', 'report:view'],
  'Quản lý kho': [
    'inventory:view',
    'inventory:import',
    'inventory:approve-export',
    'bom:manage',
    'supplier:manage',
    'product:manage',
    'report:view',
  ],
  'Thu ngân': ['report:view'],
  'Nhân viên': ['production:request', 'inventory:view'],
};

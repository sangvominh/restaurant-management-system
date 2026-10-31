/** Chỉ quyền nghiệp vụ xuất hiện trong checkbox của vai trò thường. */
export const PERMISSIONS = [
  {
    key: 'supplier:manage',
    label: 'Quản lý nhà cung cấp (thêm, sửa, xóa)',
    group: 'Kho',
  },
  {
    key: 'material:manage',
    label: 'Quản lý nguyên vật liệu (tạo, cập nhật)',
    group: 'Kho',
  },
  {
    key: 'inventory:import',
    label: 'Tạo phiếu nhập nguyên vật liệu',
    group: 'Kho',
  },
  {
    key: 'inventory:approve-export',
    label: 'Duyệt / từ chối xuất nguyên vật liệu',
    group: 'Kho',
  },
  {
    key: 'inventory:view',
    label: 'Xem tồn nguyên vật liệu và cảnh báo sắp hết',
    group: 'Kho',
  },
  {
    key: 'product:view',
    label: 'Xem, tìm kiếm, lọc và sắp xếp sản phẩm / thành phẩm',
    group: 'Nhà hàng',
  },
  { key: 'bom:manage', label: 'Cấu hình công thức BOM', group: 'Nhà hàng' },
  {
    key: 'finished-goods:approve-export',
    label: 'Duyệt / từ chối xuất thành phẩm',
    group: 'Nhà hàng',
  },
  {
    key: 'shift:view',
    label: 'Xem thông tin ca làm hiện tại',
    group: 'Nhân viên',
  },
  {
    key: 'inventory:request-export',
    label: 'Lập đề nghị xuất nguyên vật liệu',
    group: 'Nhân viên',
  },
  {
    key: 'production:create',
    label: 'Tạo thành phẩm theo công thức và ghi nhận số lượng',
    group: 'Nhân viên',
  },
  {
    key: 'finished-goods:request-export',
    label: 'Lập đề nghị xuất thành phẩm để bán',
    group: 'Nhân viên',
  },
  {
    key: 'menu:view',
    label: 'Xem thực đơn, giá và hình ảnh',
    group: 'Khách hàng',
  },
  {
    key: 'order:create',
    label: 'Chọn món, giỏ hàng, đặt món và thanh toán',
    group: 'Khách hàng',
  },
  {
    key: 'order:view',
    label: 'Theo dõi trạng thái đơn hàng của mình',
    group: 'Khách hàng',
  },
] as const;

export const ALL_PERMISSION_KEYS: string[] = PERMISSIONS.map((p) => p.key);
export const WILDCARD = '*';

/** Các quyền cũ giữ tên để bảo vệ API, không được cấp qua checkbox. */
export const SYSTEM_PERMISSION_KEYS = [
  'dashboard:view',
  'account:manage',
  'role:manage',
  'category:manage',
  'setting:manage',
  'audit:view',
  'backup:manage',
  'report:view',
] as const;

export const EMPLOYEE_PERMISSIONS = [
  'shift:view',
  'inventory:view',
  'inventory:request-export',
  'production:create',
  'finished-goods:request-export',
];

/** Mặc định theo bảng phân công; Admin có thể tick/bỏ tick mọi quyền nghiệp vụ. */
export const DEFAULT_ROLE_PERMISSIONS: Record<string, string[]> = {
  'Quản trị viên (Admin)': [WILDCARD],
  'Quản lý kho': [
    'supplier:manage',
    'material:manage',
    'inventory:import',
    'inventory:approve-export',
    'inventory:view',
  ],
  'Quản lý nhà hàng': [
    'product:view',
    'bom:manage',
    'finished-goods:approve-export',
  ],
  'Nhân viên': EMPLOYEE_PERMISSIONS,
  'Khách hàng': ['menu:view', 'order:create', 'order:view'],
};

/** Chuyển backup v1 cũ; không khôi phục quyền quản trị cho vai trò thường. */
export function normalizeBusinessPermissions(permissions: string[]): string[] {
  return [
    ...new Set(
      permissions.flatMap((permission) => {
        if (permission === 'product:manage') return ['product:view'];
        if (permission === 'production:request')
          return [
            'inventory:request-export',
            'production:create',
            'finished-goods:request-export',
          ];
        return ALL_PERMISSION_KEYS.includes(permission) ? [permission] : [];
      }),
    ),
  ];
}

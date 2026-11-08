import type { AuthUser } from './api';

export type PortalPage = { path: string; label: string; permissions: string[] };
export const portal: { title: string; pages: PortalPage[] } = {
  title: 'Quản lý Kho',
  pages: [
    { path: '/inventory', label: 'Tồn kho nguyên vật liệu', permissions: ['inventory:view'] },
    { path: '/receipts', label: 'Nhập nguyên vật liệu', permissions: ['inventory:import'] },
    { path: '/material-issues', label: 'Duyệt xuất nguyên vật liệu', permissions: ['inventory:approve-export'] },
    { path: '/transactions', label: 'Lịch sử nguyên vật liệu', permissions: ['inventory:view'] },
    { path: '/inventory-report', label: 'Báo cáo nhập xuất tồn', permissions: ['inventory:view'] },
    { path: '/production-capacity', label: 'Khả năng sản xuất', permissions: ['inventory:view'] },
  ]
};
export function canEnterPortal(user: AuthUser): boolean {
  if (user.isSystemAdmin && user.permissions.includes('*')) return true;
  return user.portal === 'warehouse' && portal.pages.some(page => page.permissions.some(permission => user.permissions.includes(permission)));
}

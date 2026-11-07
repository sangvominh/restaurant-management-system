import type { AuthUser } from './api';

export type PortalPage = { path: string; label: string; permissions: string[] };
export const portal: { title: string; pages: PortalPage[] } = {
  title: 'Quản lý Bán hàng',
  pages: [
    { path: '/operations', label: 'Quản lý thành phẩm', permissions: ['product:view'] },
    { path: '/products', label: 'Sản phẩm / Thành phẩm', permissions: ['product:view'] },
    { path: '/bom', label: 'Công thức BOM', permissions: ['bom:manage'] },
    { path: '/finished-goods', label: 'Tồn thành phẩm', permissions: ['product:view'] },
    { path: '/finished-issues', label: 'Duyệt xuất thành phẩm', permissions: ['finished-goods:approve-export'] },
  ]
};
export function canEnterPortal(user: AuthUser): boolean {
  if (user.isSystemAdmin && user.permissions.includes('*')) return true;
  return user.portal === 'warehouse' && portal.pages.some(page => page.permissions.some(permission => user.permissions.includes(permission)));
}

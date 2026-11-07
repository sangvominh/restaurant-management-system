'use client';
import { createContext, useContext } from 'react';
import type { AuthUser } from '@/app/lib/api';
export const WarehouseUser = createContext<AuthUser | null>(null);
export function useWarehouseUser() { return useContext(WarehouseUser); }
export function allowed(user: AuthUser | null, ...permissions: string[]) {
  return !!user && !user.isSystemAdmin && user.portal === 'warehouse' && permissions.some(p => user.permissions.includes(p));
}
export const WAREHOUSE_PAGES = [
  { path: '/warehouse/inventory', label: 'Tồn kho nguyên vật liệu', permissions: ['inventory:view'] },
  { path: '/warehouse/receipts', label: 'Nhập nguyên vật liệu', permissions: ['inventory:import'] },
  { path: '/warehouse/material-issues', label: 'Duyệt xuất nguyên vật liệu', permissions: ['inventory:approve-export'] },
  { path: '/warehouse/products', label: 'Sản phẩm / Thành phẩm', permissions: ['product:view'] },
  { path: '/warehouse/bom', label: 'Công thức BOM', permissions: ['bom:manage'] },
  { path: '/warehouse/finished-goods', label: 'Tồn thành phẩm', permissions: ['product:view'] },
  { path: '/warehouse/finished-issues', label: 'Duyệt xuất thành phẩm', permissions: ['finished-goods:approve-export'] },
  { path: '/warehouse/transactions', label: 'Lịch sử nguyên vật liệu', permissions: ['inventory:view'] },
];

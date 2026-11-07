'use client';
import { createContext, useContext } from 'react';
import type { AuthUser } from '@/lib/api';
export const WarehouseUser = createContext<AuthUser | null>(null);
export function useWarehouseUser() { return useContext(WarehouseUser); }
export function allowed(user: AuthUser | null, ...permissions: string[]) {
  return !!user && ((user.isSystemAdmin && user.permissions.includes('*')) || (user.portal === 'warehouse' && permissions.some(p => user.permissions.includes(p))));
}

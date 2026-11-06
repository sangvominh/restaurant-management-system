import {
  apiFetch as fetchWithSession,
  clearSession as clearScopedSession,
  getToken as getScopedToken,
  saveSession as saveScopedSession,
  type AuthUser,
} from '@/app/lib/api';

export { isSystemAdmin, readError, type AuthUser } from '@/app/lib/api';

// Điểm nối cho login riêng do nhóm Warehouse phụ trách; không đọc phiên System Admin.
export const getToken = () => getScopedToken('warehouse');
export const clearSession = () => clearScopedSession('warehouse');
export const saveSession = (token: string, user: AuthUser) => saveScopedSession(token, user, 'warehouse');
export const apiFetch = (path: string, init: RequestInit = {}) => fetchWithSession(path, init, 'warehouse');

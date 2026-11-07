import type { AuthUser } from './api';

export type PortalPage = { path: string; label: string; permissions: string[] };
export const portal: { title: string; pages: PortalPage[] } = {
  title: 'Admin server',
  pages: []
};
export function canEnterPortal(user: AuthUser): boolean {
  if (user.isSystemAdmin && user.permissions.includes('*')) return true;
  return false;
}

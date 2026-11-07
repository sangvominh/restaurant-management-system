import type { Account, Role, StaffUser } from '../generated/prisma/client.js';

export function accountResponse(account: Account & { role: Role; staffProfile?: StaffUser | null }) {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    username: account.username,
    phone: account.phone,
    role: account.role.name,
    status: account.status,
    createdAt: account.createdAt,
    staffProfile: account.staffProfile ?? null,
  };
}

import type { Account, Role } from '../generated/prisma/client.js';

export function accountResponse(account: Account & { role: Role }) {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    username: account.username,
    phone: account.phone,
    role: account.role.name,
    status: account.status,
    createdAt: account.createdAt,
  };
}

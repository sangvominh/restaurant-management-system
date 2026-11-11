import { afterEach, describe, expect, it, vi } from 'vitest';
import { scryptSync } from 'node:crypto';
import { AdminAuthService } from './admin-auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

const password = 'QA-password';
const salt = 'a'.repeat(32);
const passwordHash = `scrypt$${salt}$${scryptSync(password, salt, 64).toString('hex')}`;
function setup(codes: string[]) {
  const account = { id: 'qa', username: 'qa', status: 'ACTIVE', passwordHash, roleId: 'role', employee: { status: 'ACTIVE', name: 'QA' }, role: { name: 'QA', permissions: codes.map(code => ({ permission: { code } })) } };
  const findUnique = vi.fn().mockImplementation(async () => account);
  return { account, svc: new AdminAuthService({ account: { findUnique } } as unknown as PrismaService) };
}
afterEach(() => vi.restoreAllMocks());
describe('Đăng nhập, quyền vào từng web và hiệu lực phiên', () => {
  it.each([['material:request', 'sales'], ['sale:create', 'warehouse']] as const)('quyền %s không được vào web %s', async (right, web) => {
    const { svc } = setup([right]); await expect(svc.login({ username: 'qa', password }, false, web)).rejects.toThrow('chưa được cấp quyền');
  });
  it('quyền kho không được vào Admin server', async () => { const { svc } = setup(['inventory:view']); await expect(svc.login({ username: 'qa', password })).rejects.toThrow('System Admin'); });
  it('sai mật khẩu không tạo phiên', async () => { const { svc } = setup(['*']); await expect(svc.login({ username: 'qa', password: 'wrong' })).rejects.toThrow('không đúng'); });
  it.each(['account', 'employee', 'password', 'role', 'permissions'])('phiên mất hiệu lực khi thay đổi %s', async change => {
    const { svc, account } = setup(['*']); const { token } = await svc.login({ username: 'qa', password });
    if (change === 'account') account.status = 'INACTIVE';
    if (change === 'employee') account.employee.status = 'INACTIVE';
    if (change === 'password') account.passwordHash = 'changed';
    if (change === 'role') account.roleId = 'other';
    if (change === 'permissions') account.role.permissions = [];
    await expect(svc.authenticate(token)).rejects.toThrow('đã thay đổi');
  });
  it('đăng xuất vô hiệu phiên ngay', async () => { const { svc } = setup(['*']); const { token } = await svc.login({ username: 'qa', password }); await expect(svc.authenticate(token)).resolves.toMatchObject({ permissions: ['*'] }); svc.logout(token); await expect(svc.authenticate(token)).rejects.toThrow('hết hạn'); });
  it('phiên hết hạn sau 8 giờ dù người dùng tiếp tục sử dụng', async () => {
    const now = Date.now(); const clock = vi.spyOn(Date, 'now').mockReturnValue(now); const { svc } = setup(['*']); const { token } = await svc.login({ username: 'qa', password });
    clock.mockReturnValue(now + 8 * 3600 * 1000); await expect(svc.authenticate(token)).rejects.toThrow('hết hạn');
  });
});

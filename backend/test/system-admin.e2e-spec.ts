import 'reflect-metadata';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';
import { Test } from '@nestjs/testing';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import request from 'supertest';

// Test bản ESM đã biên dịch bằng tsc, bao gồm decorator metadata như khi chạy thật.
type Database = InstanceType<
  typeof import('../dist/prisma/prisma.service.js').PrismaService
>;
let app: NestExpressApplication;
let pg: PGlite;
let server: PGLiteSocketServer;
let db: Database;
let adminId: number, staffId: number, managerId: number;
let passwordHash: string;
const password = 'TestAdmin@123';
const adminEmail = 'admin@example.com';

const api = () => request(app.getHttpServer());
async function login(email = adminEmail, secret = password) {
  const response = await api()
    .post('/api/auth/login')
    .send({ email, password: secret })
    .expect(200);
  expect(response.body.user).not.toHaveProperty('passwordHash');
  return response.body.accessToken as string;
}

beforeAll(async () => {
  pg = await PGlite.create();
  for (const migration of [
    '20261030000000_develop_baseline',
    '20261030000100_system_admin',
    '20261031000000_role_permission_policy',
  ]) {
    await pg.exec(
      await readFile(
        new URL(
          `../prisma/migrations/${migration}/migration.sql`,
          import.meta.url,
        ),
        'utf8',
      ),
    );
  }
  server = new PGLiteSocketServer({
    db: pg,
    port: 0,
    host: '127.0.0.1',
    maxConnections: 10,
  });
  await Promise.race([
    server.start(),
    new Promise<never>((_, reject) => {
      server.addEventListener(
        'error',
        (event) => reject((event as CustomEvent).detail),
        { once: true },
      );
    }),
  ]);
  process.env.DATABASE_URL = `postgresql://postgres:postgres@${server.getServerConn()}/postgres`;
  process.env.JWT_SECRET =
    'isolated-system-admin-test-secret-do-not-use-in-production';
  const [{ AppModule }, { PrismaService }, { configureApp }] =
    await Promise.all([
      import('../dist/app.module.js'),
      import('../dist/prisma/prisma.service.js'),
      import('../dist/app.setup.js'),
    ]);
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = module.createNestApplication<NestExpressApplication>({ logger: false });
  configureApp(app);
  await app.init();
  db = app.get(PrismaService);
  passwordHash = await bcrypt.hash(password, 10);
}, 30000);

beforeEach(async () => {
  await pg.exec(`DROP VIEW IF EXISTS public.v_report_revenue; DROP VIEW IF EXISTS public.v_report_stock;
    DROP TABLE IF EXISTS demo_stock_movements, demo_invoices, demo_materials;
    TRUNCATE accounts, roles, login_logs, audit_logs, categories, system_settings RESTART IDENTITY CASCADE;`);
  const admin = await db.role.create({
    data: { name: 'Quản trị viên (Admin)', permissions: ['*'], isSystem: true },
  });
  const staff = await db.role.create({
    data: { name: 'Nhân viên', permissions: ['inventory:view'] },
  });
  const manager = await db.role.create({
    data: { name: 'Ủy quyền', permissions: ['account:manage'] },
  });
  adminId = (
    await db.account.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        roleId: admin.id,
        passwordHash,
      },
    })
  ).id;
  staffId = (
    await db.account.create({
      data: {
        name: 'Staff',
        email: 'staff@example.com',
        roleId: staff.id,
        passwordHash,
      },
    })
  ).id;
  managerId = (
    await db.account.create({
      data: {
        name: 'Manager',
        email: 'manager@example.com',
        roleId: manager.id,
        passwordHash,
      },
    })
  ).id;
});

afterAll(async () => {
  if (app) await app.close();
  if (server) await server.stop();
  if (pg) await pg.close();
});

describe('migration quyền từ dữ liệu phiên bản trước', () => {
  const migrate = async () =>
    pg.exec(
      await readFile(
        new URL(
          '../prisma/migrations/20261031000000_role_permission_policy/migration.sql',
          import.meta.url,
        ),
        'utf8',
      ),
    );

  it('chuyển mặc định cũ đúng phân công, giữ ID/mật khẩu và đóng phiên cũ', async () => {
    await db.role.create({
      data: {
        name: 'Quản lý kho',
        permissions: [
          'inventory:view',
          'inventory:import',
          'inventory:approve-export',
          'bom:manage',
          'supplier:manage',
          'product:manage',
          'report:view',
        ],
      },
    });
    await db.role.create({
      data: {
        name: 'Quản lý nhà hàng',
        permissions: ['dashboard:view', 'inventory:view', 'report:view'],
      },
    });
    await db.role.update({
      where: { name: 'Nhân viên' },
      data: { permissions: ['production:request', 'inventory:view'] },
    });
    const admin = await login();
    await migrate();
    const roles = await db.role.findMany();
    expect(
      roles.find((role) => role.name === 'Quản lý kho')!.permissions.sort(),
    ).toEqual(
      [
        'supplier:manage',
        'material:manage',
        'inventory:import',
        'inventory:approve-export',
        'inventory:view',
      ].sort(),
    );
    expect(
      roles
        .find((role) => role.name === 'Quản lý nhà hàng')!
        .permissions.sort(),
    ).toEqual(
      ['product:view', 'bom:manage', 'finished-goods:approve-export'].sort(),
    );
    expect(
      roles.find((role) => role.name === 'Nhân viên')!.permissions.sort(),
    ).toEqual(
      [
        'shift:view',
        'inventory:view',
        'inventory:request-export',
        'production:create',
        'finished-goods:request-export',
      ].sort(),
    );
    expect(
      roles.find((role) => role.name === 'Khách hàng')!.permissions,
    ).toEqual(['menu:view', 'order:create', 'order:view']);
    const account = await db.account.findUniqueOrThrow({
      where: { id: adminId },
    });
    expect(account.passwordHash).toBe(passwordHash);
    await api().get('/api/auth/me').auth(admin, { type: 'bearer' }).expect(401);
    await login();
  });

  it('không reset vai trò đã tùy chỉnh, chuyển khóa cũ và loại đặc quyền quản trị của vai trò thường', async () => {
    const role = await db.role.create({
      data: {
        name: 'Quản lý kho',
        permissions: ['supplier:manage', 'product:manage', 'account:manage'],
      },
    });
    const custom = await db.role.create({
      data: {
        name: 'Tùy chỉnh',
        permissions: [
          'production:request',
          'role:manage',
          'backup:manage',
          'report:view',
          '*',
        ],
      },
    });
    await migrate();
    expect(
      (await db.role.findUniqueOrThrow({ where: { id: role.id } })).permissions,
    ).toEqual(['product:view', 'supplier:manage']);
    expect(
      (await db.role.findUniqueOrThrow({ where: { id: custom.id } }))
        .permissions,
    ).toEqual([
      'finished-goods:request-export',
      'inventory:request-export',
      'production:create',
    ]);
    await db.role.update({
      where: { id: role.id },
      data: { permissions: ['supplier:manage'] },
    });
    await migrate();
    expect(
      (await db.role.findUniqueOrThrow({ where: { id: role.id } })).permissions,
    ).toEqual(['supplier:manage']);
  });
});

describe('tài khoản và phân quyền qua HTTP + Prisma/PostgreSQL', () => {
  it('seed tạo Admin đầu tiên và chạy lại không đổi mật khẩu đã có', async () => {
    const { seedSystemAdmin } = await import('../dist/prisma/seed-admin.js');
    await pg.exec(
      'TRUNCATE accounts, roles, login_logs, audit_logs, categories, system_settings RESTART IDENTITY CASCADE',
    );
    const email = 'bootstrap@example.com';
    await seedSystemAdmin(db, { email, password });
    const initial = await db.account.findUniqueOrThrow({
      where: { email },
      include: { role: true },
    });
    expect(initial.role.permissions).toContain('*');
    const defaults = await db.role.findMany({ where: { isSystem: false } });
    expect(defaults.map((role) => role.name).sort()).toEqual(
      ['Quản lý kho', 'Quản lý nhà hàng', 'Nhân viên', 'Khách hàng'].sort(),
    );
    expect(
      defaults.find((role) => role.name === 'Quản lý kho')?.permissions,
    ).toEqual([
      'supplier:manage',
      'material:manage',
      'inventory:import',
      'inventory:approve-export',
      'inventory:view',
    ]);
    expect(
      defaults.find((role) => role.name === 'Quản lý nhà hàng')?.permissions,
    ).toEqual(['product:view', 'bom:manage', 'finished-goods:approve-export']);
    const custom = defaults.find((role) => role.name === 'Quản lý kho')!;
    await db.role.update({
      where: { id: custom.id },
      data: { permissions: ['supplier:manage'] },
    });
    await seedSystemAdmin(db, { email, password: 'Different@123' });
    const after = await db.account.findUniqueOrThrow({ where: { email } });
    expect(after.passwordHash).toBe(initial.passwordHash);
    expect(
      (await db.role.findUniqueOrThrow({ where: { id: custom.id } }))
        .permissions,
    ).toEqual(['supplier:manage']);
  });

  it('giữ health check công khai, chặn API quản trị khi chưa đăng nhập', async () => {
    await api().get('/').expect(200).expect('Hello World!');
    await api().get('/api/admin/accounts').expect(401);
    const staffToken = await login('staff@example.com');
    await api()
      .get('/api/admin/accounts')
      .auth(staffToken, { type: 'bearer' })
      .expect(403);
  });

  it('CRUD tài khoản giữ API cũ và không lộ mật khẩu băm', async () => {
    const token = await login();
    const created = await api()
      .post('/api/admin/accounts')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'New staff',
        email: 'New@Example.com',
        role: 'Nhân viên',
        password,
        username: 'newstaff',
        phone: '0901234567',
      })
      .expect(201);
    expect(created.body.email).toBe('new@example.com');
    expect(created.body.role).toBe('Nhân viên');
    expect(created.body).not.toHaveProperty('passwordHash');
    expect(created.body).not.toHaveProperty('sessionVersion');
    const saved = await db.account.findUniqueOrThrow({
      where: { id: created.body.id },
    });
    expect(await bcrypt.compare(password, saved.passwordHash!)).toBe(true);
    await api()
      .put(`/api/admin/accounts/${saved.id}`)
      .auth(token, { type: 'bearer' })
      .send({ name: 'Changed' })
      .expect(200);
    const list = await api()
      .get('/api/admin/accounts')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(JSON.stringify(list.body)).not.toContain('passwordHash');
    await api()
      .delete(`/api/admin/accounts/${saved.id}`)
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(await db.account.findUnique({ where: { id: saved.id } })).toBeNull();
  });

  it('chặn email trùng và gán vai trò không tồn tại', async () => {
    const token = await login();
    await api()
      .post('/api/admin/accounts')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'Dup',
        email: 'ADMIN@example.com',
        role: 'Nhân viên',
        password,
      })
      .expect(409);
    await api()
      .post('/api/admin/accounts')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'Bad',
        email: 'bad@example.com',
        role: 'Không tồn tại',
        password,
      })
      .expect(400);
  });

  it('không chấp nhận mật khẩu Unicode dài hơn giới hạn 72 byte của bcrypt', async () => {
    const token = await login();
    await api()
      .post('/api/admin/accounts')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'Unicode',
        email: 'unicode@example.com',
        role: 'Nhân viên',
        password: '😀'.repeat(20),
      })
      .expect(400);
  });

  it('chặn tự nâng quyền và đặt lại mật khẩu Admin qua account:manage', async () => {
    const token = await login('manager@example.com');
    await api()
      .put(`/api/admin/accounts/${managerId}`)
      .auth(token, { type: 'bearer' })
      .send({ role: 'Quản trị viên (Admin)' })
      .expect(403);
    await api()
      .put(`/api/admin/accounts/${adminId}`)
      .auth(token, { type: 'bearer' })
      .send({ password: 'Hacked@123' })
      .expect(403);
    await api()
      .post('/api/admin/accounts')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'Escalate',
        email: 'e@example.com',
        role: 'Quản trị viên (Admin)',
        password,
      })
      .expect(403);
    await api()
      .patch(`/api/admin/accounts/${adminId}/toggle-status`)
      .auth(token, { type: 'bearer' })
      .expect(403);
  });

  it('không cho vai trò thường vào bất kỳ API System Admin dù dữ liệu cũ chứa quyền quản trị', async () => {
    await db.role.update({
      where: { name: 'Ủy quyền' },
      data: {
        permissions: [
          'dashboard:view',
          'account:manage',
          'role:manage',
          'category:manage',
          'setting:manage',
          'audit:view',
          'backup:manage',
          'report:view',
        ],
      },
    });
    const token = await login('manager@example.com');
    for (const path of [
      'accounts',
      'roles',
      'roles/defaults',
      'permissions',
      'categories',
      'settings',
      'dashboard',
      'audit-logs',
      'login-logs',
      'backup/export',
      'reports/status',
      'reports/revenue',
      'reports/stock',
      'reports/stock/materials?key=1',
    ])
      await api()
        .get(`/api/admin/${path}`)
        .auth(token, { type: 'bearer' })
        .expect(403);
    for (const path of [
      'accounts',
      'roles',
      'categories',
      'backup/restore',
      'reports/demo-data',
    ])
      await api()
        .post(`/api/admin/${path}`)
        .auth(token, { type: 'bearer' })
        .send({})
        .expect(403);
    await api().get('/api/auth/me').auth(token, { type: 'bearer' }).expect(200);
    await api()
      .post('/api/admin/roles')
      .auth(token, { type: 'bearer' })
      .send({ name: 'Escalate', permissions: ['backup:manage'] })
      .expect(403);
    await api()
      .put(`/api/admin/accounts/${managerId}`)
      .auth(token, { type: 'bearer' })
      .send({ role: 'Nhân viên' })
      .expect(403);
  });

  it('wildcard trong vai trò thường hoặc cờ Admin giả trong JWT không mở được khu vực System Admin', async () => {
    await db.role.update({
      where: { name: 'Ủy quyền' },
      data: { permissions: ['*'] },
    });
    const token = await login('manager@example.com');
    const me = await api()
      .get('/api/auth/me')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(me.body.isSystemAdmin).toBe(false);
    await api()
      .get('/api/admin/accounts')
      .auth(token, { type: 'bearer' })
      .expect(403);
    const forged = await app.get(JwtService).signAsync({
      sub: managerId,
      sid: me.body.sessionId,
      ver: 0,
      isSystemAdmin: true,
      permissions: ['*'],
    });
    await api()
      .get('/api/admin/roles')
      .auth(forged, { type: 'bearer' })
      .expect(403);
  });

  it('checkbox chỉ chứa quyền nghiệp vụ, không có quản trị, quyền sản phẩm CRUD hay quyền xuất gộp', async () => {
    const token = await login();
    const catalog = await api()
      .get('/api/admin/permissions')
      .auth(token, { type: 'bearer' })
      .expect(200);
    const keys = catalog.body.map((item: { key: string }) => item.key);
    expect(keys).toHaveLength(15);
    for (const required of [
      'material:manage',
      'product:view',
      'inventory:approve-export',
      'finished-goods:approve-export',
      'shift:view',
      'inventory:request-export',
      'production:create',
      'finished-goods:request-export',
      'menu:view',
      'order:create',
      'order:view',
    ])
      expect(keys).toContain(required);
    for (const forbidden of [
      '*',
      'account:manage',
      'role:manage',
      'report:view',
      'backup:manage',
      'setting:manage',
      'dashboard:view',
      'audit:view',
      'category:manage',
      'product:manage',
      'production:request',
    ])
      expect(keys).not.toContain(forbidden);
    const presets = await api()
      .get('/api/admin/roles/defaults')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(
      presets.body.find(
        (role: { name: string }) => role.name === 'Quản lý nhà hàng',
      ).permissions,
    ).toEqual(['product:view', 'bom:manage', 'finished-goods:approve-export']);
  });

  it('Admin không thể cấp quyền quản trị, wildcard hay cờ hệ thống bằng request tạo/sửa vai trò', async () => {
    const token = await login();
    const staff = await db.role.findUniqueOrThrow({
      where: { name: 'Nhân viên' },
    });
    for (const permissions of [
      ['*'],
      ['account:manage'],
      ['role:manage'],
      ['report:view'],
      ['backup:manage'],
      ['category:manage'],
      ['setting:manage'],
      ['dashboard:view'],
      ['audit:view'],
      ['product:manage'],
      ['production:request'],
      ['unknown:permission'],
    ]) {
      await api()
        .post('/api/admin/roles')
        .auth(token, { type: 'bearer' })
        .send({ name: 'Invalid', permissions })
        .expect(400);
      await api()
        .put(`/api/admin/roles/${staff.id}`)
        .auth(token, { type: 'bearer' })
        .send({ permissions })
        .expect(400);
    }
    await api()
      .post('/api/admin/roles')
      .auth(token, { type: 'bearer' })
      .send({ name: 'Fake system', permissions: [], isSystem: true })
      .expect(400);
  });

  it('tick/bỏ tick lưu đúng quyền, gán tài khoản và thu hồi mọi phiên cũ khi quyền đổi', async () => {
    const admin = await login();
    const role = await api()
      .post('/api/admin/roles')
      .auth(admin, { type: 'bearer' })
      .send({
        name: 'Kho tùy chỉnh',
        permissions: ['supplier:manage', 'inventory:view'],
      })
      .expect(201);
    await api()
      .put(`/api/admin/accounts/${staffId}`)
      .auth(admin, { type: 'bearer' })
      .send({ role: role.body.name })
      .expect(200);
    const first = await login('staff@example.com');
    const second = await login('staff@example.com');
    const initial = await api()
      .get('/api/auth/me')
      .auth(first, { type: 'bearer' })
      .expect(200);
    expect(initial.body).toMatchObject({
      isSystemAdmin: false,
      permissions: ['supplier:manage', 'inventory:view'],
    });
    // Không khóa quyền theo tên vai trò: Admin có thể thêm BOM, bỏ nhà cung cấp theo lựa chọn.
    await api()
      .put(`/api/admin/roles/${role.body.id}`)
      .auth(admin, { type: 'bearer' })
      .send({ permissions: ['bom:manage', 'inventory:view'] })
      .expect(200);
    for (const old of [first, second])
      await api().get('/api/auth/me').auth(old, { type: 'bearer' }).expect(401);
    const fresh = await login('staff@example.com');
    const me = await api()
      .get('/api/auth/me')
      .auth(fresh, { type: 'bearer' })
      .expect(200);
    expect(me.body.permissions).toEqual(['bom:manage', 'inventory:view']);
    const saved = await api()
      .get('/api/admin/roles')
      .auth(admin, { type: 'bearer' })
      .expect(200);
    expect(
      saved.body.find((item: { id: number }) => item.id === role.body.id)
        .permissions,
    ).toEqual(['bom:manage', 'inventory:view']);
    await api()
      .get('/api/admin/accounts')
      .auth(fresh, { type: 'bearer' })
      .expect(403);
    await api()
      .put(`/api/admin/roles/${role.body.id}`)
      .auth(admin, { type: 'bearer' })
      .send({ permissions: [] })
      .expect(200);
    const empty = await login('staff@example.com');
    const emptyMe = await api()
      .get('/api/auth/me')
      .auth(empty, { type: 'bearer' })
      .expect(200);
    expect(emptyMe.body.permissions).toEqual([]);
  });

  it('bảo vệ Admin cuối cùng và vai trò hệ thống', async () => {
    const token = await login();
    const fake = await db.role.create({
      data: { name: 'Wildcard không phải Admin', permissions: ['*'] },
    });
    await api()
      .put(`/api/admin/accounts/${adminId}`)
      .auth(token, { type: 'bearer' })
      .send({ role: fake.name })
      .expect(400);
    await api()
      .put(`/api/admin/accounts/${adminId}`)
      .auth(token, { type: 'bearer' })
      .send({ role: 'Nhân viên' })
      .expect(400);
    await api()
      .patch(`/api/admin/accounts/${adminId}/toggle-status`)
      .auth(token, { type: 'bearer' })
      .expect(400);
    await api()
      .delete(`/api/admin/accounts/${adminId}`)
      .auth(token, { type: 'bearer' })
      .expect(400);
    const role = await db.role.findUniqueOrThrow({
      where: { name: 'Quản trị viên (Admin)' },
    });
    await api()
      .put(`/api/admin/roles/${role.id}`)
      .auth(token, { type: 'bearer' })
      .send({ permissions: [] })
      .expect(400);
  });

  it('đổi tên vai trò giữ nguyên liên kết tài khoản, chặn xóa vai trò đang dùng', async () => {
    const token = await login();
    const role = await db.role.findUniqueOrThrow({
      where: { name: 'Nhân viên' },
    });
    await api()
      .put(`/api/admin/roles/${role.id}`)
      .auth(token, { type: 'bearer' })
      .send({ name: 'Bếp' })
      .expect(200);
    const rows = await api()
      .get('/api/admin/accounts')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(rows.body.find((a: { id: number }) => a.id === staffId).role).toBe(
      'Bếp',
    );
    await api()
      .delete(`/api/admin/roles/${role.id}`)
      .auth(token, { type: 'bearer' })
      .expect(400);
  });

  it('khóa rồi mở khóa không làm token cũ sống lại', async () => {
    const admin = await login(),
      staff = await login('staff@example.com');
    for (let i = 0; i < 2; i++) {
      await api()
        .patch(`/api/admin/accounts/${staffId}/toggle-status`)
        .auth(admin, { type: 'bearer' })
        .expect(200);
      await api()
        .get('/api/auth/me')
        .auth(staff, { type: 'bearer' })
        .expect(401);
    }
    await login('staff@example.com');
  });

  it('đặt lại và tự đổi mật khẩu thu hồi mọi phiên cũ', async () => {
    const admin = await login(),
      first = await login('staff@example.com'),
      second = await login('staff@example.com');
    await api()
      .put(`/api/admin/accounts/${staffId}`)
      .auth(admin, { type: 'bearer' })
      .send({ password: 'Changed@123' })
      .expect(200);
    for (const token of [first, second])
      await api()
        .get('/api/auth/me')
        .auth(token, { type: 'bearer' })
        .expect(401);
    const fresh = await login('staff@example.com', 'Changed@123');
    await api()
      .post('/api/auth/change-password')
      .auth(fresh, { type: 'bearer' })
      .send({ oldPassword: 'Changed@123', newPassword: 'Another@123' })
      .expect(200);
    await api().get('/api/auth/me').auth(fresh, { type: 'bearer' }).expect(401);
    await login('staff@example.com', 'Another@123');
  });

  it('đăng xuất và phiên không tồn tại đều bị từ chối', async () => {
    const token = await login();
    await api()
      .post('/api/auth/logout')
      .auth(token, { type: 'bearer' })
      .expect(200);
    await api().get('/api/auth/me').auth(token, { type: 'bearer' }).expect(401);
    const forged = await app
      .get(JwtService)
      .signAsync({ sub: adminId, sid: 99999, ver: 0 });
    await api()
      .get('/api/auth/me')
      .auth(forged, { type: 'bearer' })
      .expect(401);
  });

  it('ghi nhật ký thật và lọc được theo đối tượng', async () => {
    const token = await login();
    await api()
      .put(`/api/admin/accounts/${staffId}`)
      .auth(token, { type: 'bearer' })
      .send({ name: 'Updated' })
      .expect(200);
    const logs = await api()
      .get('/api/admin/audit-logs?entity=account')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(logs.body.items[0]).toMatchObject({
      action: 'account.update',
      accountId: adminId,
    });
    expect(logs.body.items[0].loginLogId).toBeTypeOf('number');
  });
});

describe('sao lưu/phục hồi quản trị', () => {
  it('backup v1 cũ được chuyển quyền nghiệp vụ và không đưa quyền quản trị trở lại vai trò thường', async () => {
    const token = await login();
    const exported = await api()
      .get('/api/admin/backup/export')
      .auth(token, { type: 'bearer' })
      .expect(200);
    const manager = exported.body.data.roles.find(
      (role: { name: string }) => role.name === 'Ủy quyền',
    );
    manager.permissions = [
      'account:manage',
      'role:manage',
      'backup:manage',
      'report:view',
      'product:manage',
      'production:request',
    ];
    const preview = await api()
      .post('/api/admin/backup/restore?dryRun=true')
      .auth(token, { type: 'bearer' })
      .send(exported.body)
      .expect(200);
    expect(
      preview.body.warnings.some((warning: string) =>
        warning.includes('quyền quản trị'),
      ),
    ).toBe(true);
    await api()
      .post('/api/admin/backup/restore')
      .auth(token, { type: 'bearer' })
      .send(exported.body)
      .expect(200);
    const managerToken = await login('manager@example.com');
    const me = await api()
      .get('/api/auth/me')
      .auth(managerToken, { type: 'bearer' })
      .expect(200);
    expect(me.body.permissions.sort()).toEqual(
      [
        'product:view',
        'inventory:request-export',
        'production:create',
        'finished-goods:request-export',
      ].sort(),
    );
    await api()
      .get('/api/admin/accounts')
      .auth(managerToken, { type: 'bearer' })
      .expect(403);
    await login();
  });
  it('giữ nguyên chi nhánh và khóa tài khoản tạo sau bản sao lưu', async () => {
    const token = await login();
    const backup = await api()
      .get('/api/admin/backup/export')
      .auth(token, { type: 'bearer' })
      .expect(200);
    const code = `BR-${Date.now()}`;
    const branch = await db.branch.create({
      data: { code, name: 'Chi nhánh dùng chung' },
    });
    const staffRole = await db.role.findUniqueOrThrow({
      where: { name: 'Nhân viên' },
    });
    const extra = await db.account.create({
      data: {
        name: 'Later',
        email: 'later@example.com',
        roleId: staffRole.id,
        passwordHash,
      },
    });
    await api()
      .post('/api/admin/backup/restore')
      .auth(token, { type: 'bearer' })
      .send(backup.body)
      .expect(200);
    expect(
      (await db.account.findUniqueOrThrow({ where: { id: extra.id } })).status,
    ).toBe('locked');
    expect(
      (await db.branch.findUniqueOrThrow({ where: { id: branch.id } })).code,
    ).toBe(code);
  });

  it('đọc định dạng v1, giữ lịch sử và thu hồi tất cả phiên khi phục hồi', async () => {
    const token = await login(),
      staff = await login('staff@example.com');
    const exported = await api()
      .get('/api/admin/backup/export')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(exported.body.version).toBe(1);
    expect(exported.body.data.accounts[0].role).toBe('Quản trị viên (Admin)');
    await api()
      .post('/api/admin/backup/restore?dryRun=true')
      .auth(token, { type: 'bearer' })
      .send(exported.body)
      .expect(200);
    await api().get('/api/auth/me').auth(token, { type: 'bearer' }).expect(200);
    const logsBefore = await db.loginLog.count();
    await api()
      .post('/api/admin/backup/restore')
      .auth(token, { type: 'bearer' })
      .send(exported.body)
      .expect(200);
    expect(await db.loginLog.count()).toBe(logsBefore);
    for (const t of [token, staff])
      await api().get('/api/auth/me').auth(t, { type: 'bearer' }).expect(401);
    await login();
    expect(await db.auditLog.count()).toBeGreaterThan(0);
  });

  it('người được cấp backup:manage không được nâng quyền qua phục hồi', async () => {
    await db.role.update({
      where: { name: 'Ủy quyền' },
      data: { permissions: ['backup:manage'] },
    });
    const token = await login('manager@example.com');
    const admin = await login();
    const backup = await api()
      .get('/api/admin/backup/export')
      .auth(admin, { type: 'bearer' })
      .expect(200);
    await api()
      .get('/api/admin/backup/export')
      .auth(token, { type: 'bearer' })
      .expect(403);
    await api()
      .post('/api/admin/backup/restore')
      .auth(token, { type: 'bearer' })
      .send(backup.body)
      .expect(403);
  });
});

describe('hợp đồng dữ liệu báo cáo', () => {
  it('trả ready:false khi nhóm chưa kết nối nguồn dữ liệu', async () => {
    const token = await login();
    for (const path of ['revenue', 'stock']) {
      const res = await api()
        .get(`/api/admin/reports/${path}?period=month&year=2026`)
        .auth(token, { type: 'bearer' })
        .expect(200);
      expect(res.body).toMatchObject({ ready: false, rows: [], totals: null });
    }
  });

  it('tính doanh thu tháng/quý/năm theo ngày Việt Nam', async () => {
    await pg.exec(`CREATE VIEW public.v_report_revenue AS SELECT * FROM (VALUES
      ('2025-12-31T17:05:00Z'::timestamptz, 100::numeric),
      ('2026-03-31T17:05:00Z'::timestamptz, 300::numeric),
      ('2026-12-31T17:05:00Z'::timestamptz, 900::numeric)
    ) AS r(paid_at,amount)`);
    const token = await login();
    for (const period of ['month', 'quarter', 'year']) {
      const res = await api()
        .get(`/api/admin/reports/revenue?period=${period}&year=2026`)
        .auth(token, { type: 'bearer' })
        .expect(200);
      expect(res.body.totals).toMatchObject({
        total: 400,
        invoices: 2,
        average: 200,
      });
      expect(res.body.demo).toBe(false);
      if (period === 'month') {
        expect(res.body.rows[0].total).toBe(100);
        expect(res.body.rows[3].total).toBe(300);
      }
    }
  });

  it('tính tồn đầu/cuối, hao hụt và số lượng từng NVL', async () => {
    await pg.exec(`CREATE VIEW public.v_report_stock AS SELECT * FROM (VALUES
      ('2025-12-30'::timestamptz,1,'Gạo','kg','import',10::numeric,1000::numeric),
      ('2026-01-10'::timestamptz,1,'Gạo','kg','import',5::numeric,500::numeric),
      ('2026-01-11'::timestamptz,1,'Gạo','kg','export',2::numeric,200::numeric),
      ('2026-01-12'::timestamptz,1,'Gạo','kg','waste',1::numeric,100::numeric)
    ) AS s(occurred_at,material_id,material_name,unit,movement_type,quantity,value)`);
    const token = await login();
    const summary = await api()
      .get('/api/admin/reports/stock?period=month&year=2026')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(summary.body.rows[0]).toMatchObject({
      opening: 1000,
      imported: 500,
      exported: 200,
      wasted: 100,
      closing: 1200,
    });
    const details = await api()
      .get('/api/admin/reports/stock/materials?period=month&year=2026&key=1')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(details.body[0]).toMatchObject({
      name: 'Gạo',
      opening: 10,
      imported: 5,
      exported: 2,
      wasted: 1,
      closing: 12,
    });
  });

  it('nhận ID nguyên vật liệu UUID từ các module dùng chung', async () => {
    const id = '00000000-0000-0000-0000-000000000001';
    await pg.exec(`CREATE VIEW public.v_report_stock AS SELECT '2026-01-10'::timestamptz AS occurred_at,
      '${id}'::uuid AS material_id, 'Gạo'::text AS material_name, 'kg'::text AS unit,
      'import'::text AS movement_type, 5::numeric AS quantity, 500::numeric AS value`);
    const token = await login();
    const res = await api()
      .get('/api/admin/reports/stock/materials?period=month&year=2026&key=1')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(res.body[0]).toMatchObject({ materialId: id, closing: 5 });
  });

  it('nạp/xóa demo trong transaction, không ghi đè khi một nguồn đã là dữ liệu thật', async () => {
    const token = await login();
    await api()
      .post('/api/admin/reports/demo-data')
      .auth(token, { type: 'bearer' })
      .expect(200);
    const status = await api()
      .get('/api/admin/reports/status')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(status.body).toMatchObject({
      revenueReady: true,
      stockReady: true,
      demo: true,
    });
    await pg.exec(`COMMENT ON VIEW public.v_report_stock IS NULL`);
    await api()
      .post('/api/admin/reports/demo-data')
      .auth(token, { type: 'bearer' })
      .expect(409);
    await api()
      .delete('/api/admin/reports/demo-data')
      .auth(token, { type: 'bearer' })
      .expect(409);
    await pg.exec(
      `COMMENT ON VIEW public.v_report_stock IS 'system-admin-demo-v1'`,
    );
    await api()
      .delete('/api/admin/reports/demo-data')
      .auth(token, { type: 'bearer' })
      .expect(200);
    const absent = await api()
      .get('/api/admin/reports/status')
      .auth(token, { type: 'bearer' })
      .expect(200);
    expect(absent.body).toMatchObject({
      revenueReady: false,
      stockReady: false,
    });
  });

  it('từ chối kỳ báo cáo và key không hợp lệ trước khi truy vấn', async () => {
    const token = await login();
    await api()
      .get('/api/admin/reports/revenue?period=invalid')
      .auth(token, { type: 'bearer' })
      .expect(400);
    await api()
      .get('/api/admin/reports/stock/materials?period=quarter&year=2026&key=5')
      .auth(token, { type: 'bearer' })
      .expect(400);
  });
});

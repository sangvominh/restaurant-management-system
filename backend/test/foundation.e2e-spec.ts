import 'reflect-metadata';
import { readFile, readdir } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import type { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';

let pg: PGlite, server: PGLiteSocketServer, app: NestExpressApplication;
let db: InstanceType<
  typeof import('../dist/prisma/prisma.service.js').PrismaService
>;
const password = 'Foundation-test-2026';
const api = () => request(app.getHttpServer());
async function login(email: string) {
  return (
    await api().post('/api/auth/login').send({ email, password }).expect(200)
  ).body.accessToken;
}
async function staff(code: string) {
  return (
    await api()
      .post('/api/staff-auth/login')
      .set('X-Staff-Request', '1')
      .send({ code, password })
      .expect(201)
  ).headers['set-cookie'];
}

beforeAll(async () => {
  pg = await PGlite.create();
  for (const name of (
    await readdir(new URL('../prisma/migrations/', import.meta.url))
  )
    .filter((x) => /^\d/.test(x))
    .sort())
    await pg.exec(
      await readFile(
        new URL(`../prisma/migrations/${name}/migration.sql`, import.meta.url),
        'utf8',
      ),
    );
  server = new PGLiteSocketServer({ db: pg, port: 0, host: '127.0.0.1' });
  await server.start();
  process.env.DATABASE_URL = `postgresql://postgres:postgres@${server.getServerConn()}/postgres`;
  process.env.JWT_SECRET = 'isolated-foundation-test-secret';
  const { AppModule } = await import('../dist/app.module.js');
  const { PrismaService } = await import('../dist/prisma/prisma.service.js');
  const { configureApp } = await import('../dist/app.setup.js');
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = module.createNestApplication<NestExpressApplication>({ logger: false });
  configureApp(app);
  await app.init();
  db = app.get(PrismaService);
  const { seedDemo } = await import('../dist/prisma/seed-demo.js');
  await seedDemo(db, password);
}, 60000);

afterAll(async () => {
  await app?.close();
  await server?.stop();
  await pg?.close();
});

it('bootstrap chạy lại giữ tài khoản/quyền và demo không ghi đè DB có dữ liệu', async () => {
  const { seedSystemAdmin } = await import('../dist/prisma/seed-admin.js');
  const { seedDemo } = await import('../dist/prisma/seed-demo.js');
  const before = await db.account.findUniqueOrThrow({
    where: { email: 'owner@demo.local' },
  });
  await seedSystemAdmin(db, {
    email: before.email,
    password: 'Another-password-2026',
  });
  expect(
    (await db.account.findUniqueOrThrow({ where: { id: before.id } }))
      .passwordHash,
  ).toBe(before.passwordHash);
  expect(await db.account.count()).toBe(7);
  expect(await db.staffUser.count()).toBe(4);
  await expect(seedDemo(db, password)).rejects.toThrow('DB trống');
  expect(await db.account.count()).toBe(7);
});

it('nhập kho → cấp bếp → gọi món → dùng BOM → phục vụ → thanh toán → báo cáo thật', async () => {
  const warehouse = await login('warehouse@demo.local');
  const owner = await login('owner@demo.local');
  const kitchen = await staff('KITCHEN'),
    service = await staff('SERVICE'),
    cashier = await staff('CASHIER');
  const branch = await db.branch.findUniqueOrThrow({
    where: { code: 'DEMO-CN01' },
  });
  const menu = await db.menuItem.findFirstOrThrow();
  const table = await db.restaurantTable.findFirstOrThrow();
  await api()
    .post('/warehouse/receipts')
    .auth(warehouse, { type: 'bearer' })
    .send({
      receiptCode: 'TEST-NK02',
      branchCode: branch.code,
      supplierCode: 'DEMO-NCC01',
      details: [
        {
          materialCode: 'DEMO-NVL01',
          lotCode: 'TEST-LO02',
          expiryDate: '2099-12-31',
          locationName: 'Kho chính',
          unitName: 'kg',
          quantity: '5',
          unitPrice: '25000',
        },
      ],
    })
    .expect(201);
  const balance = await db.materialBalance.findFirstOrThrow({
    where: { materialLot: { lotCode: 'TEST-LO02' } },
  });
  const issue = await api()
    .post('/api/staff/production-orders/material-requests')
    .set('Cookie', kitchen)
    .set('X-Staff-Request', '1')
    .send({ balanceId: balance.id, quantity: '1' })
    .expect(201);
  await api()
    .post(`/warehouse/material-issues/${issue.body.code}/approve`)
    .auth(warehouse, { type: 'bearer' })
    .send({})
    .expect(200);
  const invoice = await api()
    .post('/api/staff/invoices')
    .set('Cookie', service)
    .set('X-Staff-Request', '1')
    .send({ tableId: table.id, guestName: 'Khách kiểm thử' })
    .expect(201);
  const order = await api()
    .post('/api/staff/orders')
    .set('Cookie', service)
    .set('X-Staff-Request', '1')
    .send({
      invoiceId: invoice.body.id,
      requestKey: randomUUID(),
      lines: [{ menuItemId: menu.id, quantity: 1 }],
    })
    .expect(201);
  const line = order.body.lines[0].id;
  for (const [status, cookie] of [
    ['COOKING', kitchen],
    ['READY', kitchen],
    ['SERVED', service],
  ] as const)
    await api()
      .patch(`/api/staff/lines/${line}`)
      .set('Cookie', cookie)
      .set('X-Staff-Request', '1')
      .send({ status })
      .expect(200);
  const kitchenStock = await db.$queryRaw<
    { quantity: string }[]
  >`SELECT quantity::text AS quantity FROM staff_kitchen_balances WHERE material_lot_id=${balance.materialLotId}::uuid`;
  expect(Number(kitchenStock[0].quantity)).toBe(0.9);
  await api()
    .post(`/api/staff/invoices/${invoice.body.id}/pay`)
    .set('Cookie', cashier)
    .set('X-Staff-Request', '1')
    .send({ method: 'CASH', cashReceived: 20000 })
    .expect(201);
  const report = await api()
    .get(`/api/admin/reports/revenue?year=${new Date().getFullYear()}`)
    .auth(owner, { type: 'bearer' })
    .expect(200);
  expect(report.body.totals.total).toBe(15000);
  expect(report.body.totals.invoices).toBe(1);
  expect(
    (
      await db.materialBalance.findUniqueOrThrow({ where: { id: balance.id } })
    ).quantity.toString(),
  ).toBe('4');
});

it('tài khoản tạo từ admin dùng được Staff và khóa tài khoản thu hồi cả hai cách đăng nhập', async () => {
  const owner = await login('owner@demo.local');
  const branch = await db.branch.findFirstOrThrow();
  const created = await api()
    .post('/api/admin/accounts')
    .auth(owner, { type: 'bearer' })
    .send({
      name: 'Nhân viên mới',
      email: 'new@demo.local',
      role: 'Nhân viên',
      password,
      staffProfile: { code: 'NEW', branchId: branch.id, role: 'SERVICE' },
    })
    .expect(201);
  const cookie = await staff('NEW');
  const token = await login('new@demo.local');
  const jwt = app.get(JwtService);
  const { sub, sid, ver } = jwt.decode(token);
  const otherEnvironment = await jwt.signAsync({ sub, sid, ver }, { issuer: 'another-environment' });
  await api().get('/api/auth/me').auth(otherEnvironment, { type: 'bearer' }).expect(401);
  await api().get('/api/staff/tables').set('Cookie', cookie).expect(200);
  await api()
    .patch(`/api/admin/accounts/${created.body.id}/toggle-status`)
    .auth(owner, { type: 'bearer' })
    .expect(200);
  await api().get('/api/staff/tables').set('Cookie', cookie).expect(401);
  await api().get('/api/auth/me').auth(token, { type: 'bearer' }).expect(401);
});

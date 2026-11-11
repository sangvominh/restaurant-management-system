import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { AdminAuthService } from '../src/admin/admin-auth.service.js';
import { vi } from 'vitest';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it.each([
    '/api/admin/accounts', '/api/admin/roles', '/api/warehouse/receipts',
    '/api/warehouse/product-receipts', '/api/warehouse/production/orders',
    '/api/warehouse/store/stock', '/api/restaurant/sales', '/api/restaurant/reports/sales',
  ])('GET %s không đăng nhập phải trả 401', async path => { await request(app.getHttpServer()).get(path).expect(401); });

  it.each([
    '/api/warehouse/receipts/00000000-0000-4000-8000-000000000001/post',
    '/api/warehouse/product-receipts/00000000-0000-4000-8000-000000000001/post',
    '/api/warehouse/store/adjustments',
  ])('POST %s quyền chỉ xem không được ghi dữ liệu', async path => {
    vi.spyOn(app.get(AdminAuthService), 'authenticate').mockResolvedValue({ id: 'qa', username: 'qa', name: 'QA', roleName: 'Chỉ xem', permissions: ['inventory:view'] });
    await request(app.getHttpServer()).post(path).set('Authorization', 'Bearer ' + 'a'.repeat(64)).send({}).expect(403);
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(async () => {
    await app?.close();
  });
});

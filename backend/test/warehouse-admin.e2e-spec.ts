import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { randomUUID } from 'node:crypto';
import { Prisma } from '../src/generated/prisma/client.js';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

// Database writes run only when explicitly enabled against restaurant_dev.
const runDatabaseE2e =
  process.env.RUN_WAREHOUSE_DB_E2E === '1' &&
  process.env.DATABASE_URL?.includes('/restaurant_dev');

(runDatabaseE2e ? describe : describe.skip)(
  'Warehouse Admin API with PostgreSQL',
  () => {
    let app: INestApplication<App>;
    let prisma: PrismaService;
    let branch: { id: string; code: string };
    let unit: { id: string; name: string };
    let location: { id: string; name: string };

    const suffix = randomUUID().replaceAll('-', '').slice(0, 10).toUpperCase();
    const supplierCode = `NCCE2E${suffix}`;
    const unusedSupplierCode = `NCCX2E${suffix}`;
    const categoryCode = `DME2E${suffix}`;
    const materialCode = `NVLE2E${suffix}`;
    const lotCode = `LOTE2E${suffix}`;
    const expiredLotCode = `LEXP${suffix}`;
    const receiptCode = `PNE2E${suffix}`;
    const issueCode = `XNVLE2E${suffix}`;
    const rejectedIssueCode = `XNVLR${suffix}`;
    const testMaterialName = `NVL test ${suffix}`;
    const testCategoryName = `DM test ${suffix}`;
    const testSupplierName = `NCC test ${suffix}`;

    const supplierIds: string[] = [];
    const categoryIds: string[] = [];
    const materialIds: string[] = [];
    const receiptIds: string[] = [];
    const issueIds: string[] = [];
    const lotIds: string[] = [];

    beforeAll(async () => {
      if (!process.env.DATABASE_URL?.includes('/restaurant_dev')) {
        throw new Error(
          'Warehouse DB e2e tests may run only against restaurant_dev',
        );
      }

      const module = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = module.createNestApplication();
      await app.init();
      prisma = app.get(PrismaService);

      const existingBranch = await prisma.branch.findFirst({
        where: { isActive: true },
        select: { id: true, code: true },
      });
      const existingUnit = await prisma.unit.findFirst({
        where: { status: 'ACTIVE', baseUnitId: null },
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      });

      if (!existingBranch || !existingUnit) {
        throw new Error('restaurant_dev needs an active branch and base unit');
      }

      branch = existingBranch;
      unit = existingUnit;

      const existingLocation = await prisma.warehouseLocation.findFirst({
        where: { branchId: branch.id },
        select: { id: true, name: true },
      });

      if (!existingLocation) {
        throw new Error('restaurant_dev needs a warehouse location');
      }

      location = existingLocation;
    });

    afterAll(async () => {
      if (prisma) {
        await prisma.$transaction(async (tx) => {
          if (lotIds.length > 0) {
            await tx.inventoryMovement.deleteMany({
              where: { materialLotId: { in: lotIds } },
            });
          }
          if (issueIds.length > 0) {
            await tx.materialIssueDetail.deleteMany({
              where: { issueId: { in: issueIds } },
            });
            await tx.materialIssue.deleteMany({
              where: { id: { in: issueIds } },
            });
          }
          if (receiptIds.length > 0) {
            await tx.goodsReceiptDetail.deleteMany({
              where: { receiptId: { in: receiptIds } },
            });
            await tx.goodsReceipt.deleteMany({
              where: { id: { in: receiptIds } },
            });
          }
          if (lotIds.length > 0) {
            await tx.materialBalance.deleteMany({
              where: { materialLotId: { in: lotIds } },
            });
            await tx.materialLot.deleteMany({ where: { id: { in: lotIds } } });
          }
          if (materialIds.length > 0) {
            await tx.material.deleteMany({
              where: { id: { in: materialIds } },
            });
          }
          if (categoryIds.length > 0) {
            await tx.category.deleteMany({
              where: { id: { in: categoryIds } },
            });
          }
          if (supplierIds.length > 0) {
            await tx.supplier.deleteMany({
              where: { id: { in: supplierIds } },
            });
          }
        });
      }

      await app?.close();
    });

    it('covers supplier, material catalog, receipt, issue approval and stock alerts', async () => {
      const createdSupplier = await request(app.getHttpServer())
        .post('/warehouse/suppliers')
        .send({
          code: supplierCode,
          name: testSupplierName,
          phone: '0900000000',
          email: `e2e-${suffix.toLowerCase()}@example.com`,
          address: 'Địa chỉ kiểm thử',
        })
        .expect(201);
      supplierIds.push(createdSupplier.body.data.id);

      await request(app.getHttpServer())
        .post('/warehouse/suppliers')
        .send({ code: supplierCode, name: testSupplierName })
        .expect(409);

      const unusedSupplier = await request(app.getHttpServer())
        .post('/warehouse/suppliers')
        .send({ code: unusedSupplierCode, name: `${testSupplierName} unused` })
        .expect(201);
      supplierIds.push(unusedSupplier.body.data.id);

      const supplierSearch = await request(app.getHttpServer())
        .get('/warehouse/suppliers')
        .query({ search: supplierCode })
        .expect(200);
      expect(supplierSearch.body.data).toHaveLength(1);

      await request(app.getHttpServer())
        .get(`/warehouse/suppliers/${supplierCode}`)
        .expect(200);

      await request(app.getHttpServer())
        .patch(`/warehouse/suppliers/${supplierCode}`)
        .send({ name: `${testSupplierName} updated`, phone: null })
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/warehouse/suppliers/${unusedSupplierCode}`)
        .expect(200);
      supplierIds.splice(supplierIds.indexOf(unusedSupplier.body.data.id), 1);

      const createdCategory = await request(app.getHttpServer())
        .post('/warehouse/categories')
        .send({
          code: categoryCode,
          name: testCategoryName,
          categoryType: 'MATERIAL',
        })
        .expect(201);
      categoryIds.push(createdCategory.body.data.id);

      await request(app.getHttpServer())
        .get('/warehouse/categories')
        .expect(200);
      await request(app.getHttpServer()).get('/warehouse/units').expect(200);

      await request(app.getHttpServer())
        .patch(`/warehouse/categories/${categoryCode}`)
        .send({ name: `${testCategoryName} updated`, status: 'ACTIVE' })
        .expect(200);

      const createdMaterial = await request(app.getHttpServer())
        .post('/warehouse/materials')
        .send({
          code: materialCode,
          name: testMaterialName,
          categoryName: `${testCategoryName} updated`,
          categoryType: 'MATERIAL',
          unitName: unit.name,
          minStock: '4',
        })
        .expect(201);
      materialIds.push(
        (await prisma.material.findUnique({ where: { code: materialCode } }))!
          .id,
      );
      expect(createdMaterial.body.data.code).toBe(materialCode);

      await request(app.getHttpServer())
        .get('/warehouse/materials')
        .query({ search: materialCode })
        .expect(200);
      await request(app.getHttpServer())
        .get(`/warehouse/materials/${materialCode}`)
        .expect(200);
      await request(app.getHttpServer())
        .patch(`/warehouse/materials/${materialCode}`)
        .send({ minStock: '4.5' })
        .expect(200);

      const receiptBody = {
        receiptCode,
        supplierCode,
        branchCode: branch.code,
        details: [
          {
            materialCode,
            lotCode,
            expiryDate: '2099-12-31',
            locationName: location.name,
            unitName: unit.name,
            quantity: '5',
            unitPrice: '100.00',
          },
        ],
      };

      const createdReceipt = await request(app.getHttpServer())
        .post('/warehouse/receipts')
        .send(receiptBody)
        .expect(201);
      receiptIds.push(createdReceipt.body.data.receiptId);

      await request(app.getHttpServer())
        .post('/warehouse/receipts')
        .send(receiptBody)
        .expect(409);

      const lot = await prisma.materialLot.findUnique({
        where: {
          materialId_lotCode: {
            materialId: materialIds[0],
            lotCode,
          },
        },
      });
      expect(lot).not.toBeNull();
      lotIds.push(lot!.id);

      const today = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Ho_Chi_Minh',
      }).format(new Date());
      await request(app.getHttpServer())
        .get('/warehouse/receipts')
        .query({
          supplierCode,
          branchCode: branch.code,
          from: today,
          to: today,
        })
        .expect(200);
      await request(app.getHttpServer())
        .get(`/warehouse/receipts/${receiptCode}`)
        .expect(200);

      const balance = await prisma.materialBalance.findUnique({
        where: {
          locationId_materialLotId: {
            locationId: location.id,
            materialLotId: lot!.id,
          },
        },
      });
      expect(balance?.quantity.toString()).toBe('5');

      const movements = await request(app.getHttpServer())
        .get('/warehouse/inventory-movements')
        .expect(200);
      expect(
        movements.body.data.some(
          (row: { materialCode: string; lotCode: string }) =>
            row.materialCode === materialCode && row.lotCode === lotCode,
        ),
      ).toBe(true);

      const expiredLot = await prisma.materialLot.create({
        data: {
          materialId: materialIds[0],
          lotCode: expiredLotCode,
          expiryDate: new Date('2020-01-01T00:00:00.000Z'),
          status: 'ACTIVE',
        },
      });
      lotIds.push(expiredLot.id);
      await prisma.materialBalance.create({
        data: {
          materialLotId: expiredLot.id,
          locationId: location.id,
          quantity: new Prisma.Decimal('10'),
        },
      });

      const beforeIssue = await request(app.getHttpServer())
        .get('/warehouse/inventory')
        .query({ branchCode: branch.code })
        .expect(200);
      const beforeIssueItem = beforeIssue.body.data.find(
        (row: { code: string }) => row.code === materialCode,
      );
      expect(beforeIssueItem).toMatchObject({
        totalStock: 15,
        availableStock: 5,
        stockStatus: 'AVAILABLE',
      });

      const failedReceiptCode = `PNF${suffix}`;
      await request(app.getHttpServer())
        .post('/warehouse/receipts')
        .send({
          ...receiptBody,
          receiptCode: failedReceiptCode,
          details: [
            { ...receiptBody.details[0], materialCode: 'NVL-NOT-FOUND' },
          ],
        })
        .expect(400);
      expect(
        await prisma.goodsReceipt.findUnique({
          where: { receiptCode: failedReceiptCode },
        }),
      ).toBeNull();

      const createdIssue = await prisma.materialIssue.create({
        data: { issueCode, branchId: branch.id, status: 'PENDING' },
      });
      issueIds.push(createdIssue.id);
      await prisma.materialIssueDetail.create({
        data: {
          issueId: createdIssue.id,
          materialId: materialIds[0],
          materialLotId: lot!.id,
          locationId: location.id,
          unitId: unit.id,
          quantity: new Prisma.Decimal('2'),
        },
      });

      await request(app.getHttpServer())
        .get('/warehouse/material-issues')
        .query({ status: 'PENDING' })
        .expect(200);
      await request(app.getHttpServer())
        .get(`/warehouse/material-issues/${issueCode}`)
        .expect(200);
      const approvalResponses = await Promise.all([
        request(app.getHttpServer()).post(
          `/warehouse/material-issues/${issueCode}/approve`,
        ),
        request(app.getHttpServer()).post(
          `/warehouse/material-issues/${issueCode}/approve`,
        ),
      ]);
      expect(
        approvalResponses.map((response) => response.status).sort(),
      ).toEqual([200, 409]);

      const afterIssue = await prisma.materialBalance.findUnique({
        where: {
          locationId_materialLotId: {
            locationId: location.id,
            materialLotId: lot!.id,
          },
        },
      });
      expect(afterIssue?.quantity.toString()).toBe('3');

      const inventory = await request(app.getHttpServer())
        .get('/warehouse/inventory')
        .query({ branchCode: branch.code })
        .expect(200);
      const item = inventory.body.data.find(
        (row: { code: string }) => row.code === materialCode,
      );
      expect(item).toMatchObject({
        totalStock: 13,
        availableStock: 3,
        stockStatus: 'LOW_STOCK',
      });

      const alerts = await request(app.getHttpServer())
        .get('/warehouse/inventory/alerts')
        .query({ branchCode: branch.code })
        .expect(200);
      expect(
        alerts.body.data.some(
          (row: { code: string }) => row.code === materialCode,
        ),
      ).toBe(true);
      await request(app.getHttpServer())
        .get(`/warehouse/inventory/${materialCode}`)
        .query({ branchCode: branch.code })
        .expect(200);

      const rejectedIssue = await prisma.materialIssue.create({
        data: {
          issueCode: rejectedIssueCode,
          branchId: branch.id,
          status: 'PENDING',
        },
      });
      issueIds.push(rejectedIssue.id);
      await request(app.getHttpServer())
        .post(`/warehouse/material-issues/${rejectedIssueCode}/reject`)
        .send({ reason: '   ' })
        .expect(400);
      await request(app.getHttpServer())
        .post(`/warehouse/material-issues/${rejectedIssueCode}/reject`)
        .send({ reason: 'Từ chối kiểm thử' })
        .expect(200);
      expect(
        (
          await prisma.materialIssue.findUnique({
            where: { issueCode: rejectedIssueCode },
          })
        )?.status,
      ).toBe('REJECTED');

      await request(app.getHttpServer())
        .delete(`/warehouse/suppliers/${supplierCode}`)
        .expect(409);
    });
  },
);

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { createWarehouseTestDatabase } from './warehouse-test-database.js';

const enabled =
  process.env.RUN_WAREHOUSE_DB_E2E === '1' &&
  Boolean(process.env.WAREHOUSE_TEST_DATABASE_URL);

(enabled ? describe : describe.skip)(
  'Adjustment approval/rejection HTTP + PostgreSQL',
  () => {
    let app: INestApplication<App>;
    let database: Awaited<ReturnType<typeof createWarehouseTestDatabase>>;
    let prisma: typeof database.prisma;
    let materialLotId: string;
    let materialId: string;
    let unitId: string;
    let locationId: string;
    let branchId: string;

    beforeAll(async () => {
      database = await createWarehouseTestDatabase();
      prisma = database.prisma;
      const module = await Test.createTestingModule({ imports: [AppModule] })
        .overrideProvider(PrismaService)
        .useValue(prisma)
        .compile();
      app = module.createNestApplication();
      await app.init();
      const unit = await prisma.unit.findUniqueOrThrow({
        where: { name: 'kg' },
      });
      const branch = await prisma.branch.findUniqueOrThrow({
        where: { code: 'E2E-BR' },
      });
      const location = await prisma.warehouseLocation.findFirstOrThrow({
        where: { branchId: branch.id },
      });
      unitId = unit.id;
      branchId = branch.id;
      locationId = location.id;
      const category = await prisma.category.create({
        data: {
          code: 'DM-ADJ',
          name: 'Adjustment test',
          categoryType: 'MATERIAL',
        },
      });
      const material = await prisma.material.create({
        data: {
          code: 'NVL-ADJ',
          name: 'Adjustment test',
          unitId,
          categoryId: category.id,
        },
      });
      materialId = material.id;
      const lot = await prisma.materialLot.create({
        data: {
          lotCode: 'LOT-ADJ',
          materialId,
          expiryDate: new Date('2099-12-31T00:00:00Z'),
        },
      });
      materialLotId = lot.id;
      await prisma.materialBalance.create({
        data: { materialLotId, locationId, quantity: '20' },
      });
    }, 30000);

    afterAll(async () => {
      try {
        await app?.close();
      } finally {
        await database?.close();
      }
    });

    // Staff documents/usage are fixtures, not calls to a new Staff endpoint.
    async function source(
      code: string,
      quantity = '10',
      consumedQuantity = '4',
    ) {
      const issue = await prisma.materialIssue.create({
        data: {
          issueCode: code,
          branchId,
          status: 'APPROVED',
          details: {
            create: { materialId, materialLotId, locationId, unitId, quantity },
          },
        },
        include: { details: true },
      });
      const issueDetailId = issue.details[0].id;
      await prisma.materialUsageSettlement.create({
        data: {
          issueDetailId,
          consumedQuantity,
          referenceCode: `USAGE-${code}`,
          recordedBy: 'test-staff',
          finalizedAt: new Date('2020-01-01T00:00:00Z'),
        },
      });
      return issueDetailId;
    }

    async function adjustment(
      code: string,
      type = 'WASTE',
      issueDetailId?: string,
      quantity = '3',
    ) {
      return prisma.materialAdjustment.create({
        data: {
          code,
          type,
          source: issueDetailId ? 'ISSUED' : 'STOCK',
          materialLotId,
          locationId,
          issueDetailId,
          quantity,
          reason: 'Integration test',
        },
      });
    }

    const approve = (code: string, acceptedQuantity = '3') =>
      request(app.getHttpServer())
        .post(`/warehouse/material-adjustments/${code}/approve`)
        .send({ acceptedQuantity, qualityStatus: 'ACCEPTABLE' });
    const ledger = async () => ({
      balance: (
        await prisma.materialBalance.findUniqueOrThrow({
          where: { locationId_materialLotId: { locationId, materialLotId } },
        })
      ).quantity.toString(),
      movements: await prisma.inventoryMovement.count(),
      links: await prisma.materialAdjustmentMovement.count(),
    });

    it('returns 400 for over-settlement after previous waste/return, without writing stock', async () => {
      const line = await source('OVER'); // 10 - 4 consumed - 5 already settled = 1 remaining.
      for (const [code, type, accepted] of [
        ['OLD-WASTE', 'WASTE', '3'],
        ['OLD-RETURN', 'RETURN', '2'],
      ]) {
        const row = await adjustment(code, type, line, accepted);
        await prisma.materialAdjustment.update({
          where: { id: row.id },
          data: { status: 'APPROVED', acceptedQuantity: accepted },
        });
      }
      for (const type of ['WASTE', 'RETURN']) {
        const code = `OVER-${type}`;
        await adjustment(code, type, line);
        const before = await ledger();
        const response = await approve(code).expect(400);
        expect(response.body.message).toContain('vượt lượng đã lĩnh');
        expect(await ledger()).toEqual(before);
        expect(
          (
            await prisma.materialAdjustment.findUniqueOrThrow({
              where: { code },
            })
          ).status,
        ).toBe('PENDING');
      }
    });

    it('processes STOCK WASTE, ISSUED WASTE and RETURN with the correct stock effects', async () => {
      await adjustment('STOCK');
      await approve('STOCK').expect(200);
      expect(await ledger()).toEqual({ balance: '17', movements: 1, links: 1 });
      const line = await source('ISSUED');
      await adjustment('ISSUED-WASTE', 'WASTE', line);
      await approve('ISSUED-WASTE').expect(200);
      expect(await ledger()).toEqual({ balance: '17', movements: 1, links: 1 });
      await adjustment('RETURN', 'RETURN', line);
      await approve('RETURN').expect(200);
      expect(await ledger()).toEqual({ balance: '20', movements: 2, links: 2 });
      const before = await ledger();
      await approve('RETURN').expect(409);
      expect(await ledger()).toEqual(before);
    });

    it('blocks missing consumption, poor quality and missing reject reasons', async () => {
      const line = await source('QUALITY');
      await adjustment('QUALITY', 'RETURN', line);
      const before = await ledger();
      await request(app.getHttpServer())
        .post('/warehouse/material-adjustments/QUALITY/approve')
        .send({ acceptedQuantity: '3', qualityStatus: 'UNACCEPTABLE' })
        .expect(400);
      await prisma.materialUsageSettlement.delete({
        where: { issueDetailId: line },
      });
      const blocked = await approve('QUALITY').expect(409);
      expect(blocked.body.message).toContain('BLOCKED');
      await request(app.getHttpServer())
        .post('/warehouse/material-adjustments/QUALITY/reject')
        .send({ reason: '  ' })
        .expect(400);
      await request(app.getHttpServer())
        .post('/warehouse/material-adjustments/QUALITY/reject')
        .send({ reason: 'Không đạt chất lượng' })
        .expect(200);
      expect(await ledger()).toEqual(before);
      await request(app.getHttpServer())
        .post('/warehouse/material-adjustments/QUALITY/reject')
        .send({ reason: 'Lặp lại' })
        .expect(409);
    });

    it('prevents concurrent requests from settling more than one issued line contains', async () => {
      const line = await source('CONCURRENT', '3', '0');
      await adjustment('CONCURRENT-A', 'WASTE', line);
      await adjustment('CONCURRENT-B', 'RETURN', line);
      const before = await ledger();
      const responses = await Promise.all([
        approve('CONCURRENT-A'),
        approve('CONCURRENT-B'),
      ]);
      const statuses = responses.map((response) => response.status).sort();
      expect(statuses[0]).toBe(200);
      // A later snapshot sees excess quantity (400); overlapping snapshots conflict (409).
      expect([400, 409]).toContain(statuses[1]);
      const rows = await prisma.materialAdjustment.findMany({
        where: { issueDetailId: line },
      });
      const approved = rows.filter((row) => row.status === 'APPROVED');
      expect(approved).toHaveLength(1);
      expect(approved[0].acceptedQuantity?.toString()).toBe('3');
      const returned = approved[0].type === 'RETURN';
      expect(await ledger()).toEqual({
        balance: String(Number(before.balance) + (returned ? 3 : 0)),
        movements: before.movements + (returned ? 1 : 0),
        links: before.links + (returned ? 1 : 0),
      });
    });
  },
);

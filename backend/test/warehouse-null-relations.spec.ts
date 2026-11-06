import { BomApi } from '../src/warehouse/api/bom.api.js';
import { FinishedGoodsApi } from '../src/warehouse/api/finished-goods.api.js';
import { WasteApi } from '../src/warehouse/api/waste.api.js';
import { Prisma } from '../src/generated/prisma/client.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';

describe('Warehouse nullable relation regressions', () => {
  it('lists a BOM without Product without inventing category or price', async () => {
    const db = { bom: { findMany: vi.fn().mockResolvedValue([{
      code: 'BOM1', productCode: 'TP1', productName: null, product: null,
      version: 1, outputQuantity: new Prisma.Decimal(1), status: 'ACTIVE',
      createdAt: new Date(), details: [],
    }]) } };
    const result = await new BomApi(db as unknown as PrismaService).getBoms();
    expect(result.data[0]).toMatchObject({
      productName: 'TP1', category: null, description: null, price: null,
    });
  });

  it('reads an issue movement without a receipt and loads its issue relation', async () => {
    const db = { finishedGoodsMovement: { findMany: vi.fn().mockResolvedValue([{
      receipt: null, issueDetail: { issue: { code: 'XTP1', shiftCode: 'CA1' } },
      productCode: 'TP1', location: { name: 'Kho', branch: { code: 'CN1' } },
      quantityBefore: new Prisma.Decimal(5), quantityChange: new Prisma.Decimal(-1),
      quantityAfter: new Prisma.Decimal(4), createdAt: new Date(),
    }]) } };
    const result = await new FinishedGoodsApi(db as unknown as PrismaService).getFinishedGoodsMovements();
    expect(db.finishedGoodsMovement.findMany).toHaveBeenCalledWith(expect.objectContaining({
      include: expect.objectContaining({ issueDetail: { include: { issue: true } } }),
    }));
    expect(result.data[0]).toMatchObject({
      issueCode: 'XTP1', shiftCode: 'CA1', receiptCode: null, receiptStatus: null,
      productName: 'TP1', inspectionNote: null, approvedAt: null,
    });
  });

  it('keeps the BOM product name when a receipt has no Product relation', async () => {
    const db = { finishedGoodsMovement: { findMany: vi.fn().mockResolvedValue([{
      receipt: { code: 'NTP1', status: 'APPROVED', inspectionNote: null,
        approvedAt: null, productionOrder: { code: 'YC1',
          bom: { product: null, productName: 'Bánh mì' } } },
      issueDetail: null, productCode: 'TP1',
      location: { name: 'Kho', branch: { code: 'CN1' } },
      quantityBefore: new Prisma.Decimal(0), quantityChange: new Prisma.Decimal(1),
      quantityAfter: new Prisma.Decimal(1), createdAt: new Date(),
    }]) } };
    const result = await new FinishedGoodsApi(db as unknown as PrismaService).getFinishedGoodsMovements();
    expect(result.data[0]).toMatchObject({ productName: 'Bánh mì', issueCode: null, receiptCode: 'NTP1' });
  });

  it('lists waste with an unlinked Product using the recorded BOM name', async () => {
    const db = { wasteRequest: { findMany: vi.fn().mockResolvedValue([{
      code: 'H1', receipt: { code: 'NTP1', productionOrder: { code: 'YC1',
        branch: { code: 'CN1' }, bom: { product: null, productName: 'Bánh mì', productCode: 'TP1' } } },
      quantity: new Prisma.Decimal(1), reason: 'Lỗi', status: 'PENDING',
      decisionNote: null, processedAt: null, createdAt: new Date(),
    }]) } };
    const result = await new WasteApi(db as unknown as PrismaService).getRequests();
    expect(result.data[0].productName).toBe('Bánh mì');
  });
});

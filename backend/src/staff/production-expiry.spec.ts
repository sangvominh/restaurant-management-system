import { BadRequestException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { StaffProductionController } from './production.controller.js';
import type { PrismaService } from '../prisma/prisma.service.js';
import type { FinishedGoodsApi } from '../warehouse/api/finished-goods.api.js';
import type { StaffRequest } from '../auth/staff-auth.guard.js';

const req = { staff: { branchId:'branch', code:'staff' } } as StaffRequest;
describe('warehouse-issued production lot expiry', () => {
 it.each([null, new Date('2000-01-01T00:00:00Z')])('rejects reporting if an issued lot is missing or past its expiry', async expiryDate => {
  const db = { productionOrder:{findFirst:vi.fn().mockResolvedValue({id:'order'})}, $queryRaw:vi.fn().mockResolvedValue([]), inventoryMovement:{findMany:vi.fn().mockResolvedValue([{materialLot:{status:'ACTIVE',expiryDate}}])} };
  const finished = { reportOutput:vi.fn() };
  const controller = new StaffProductionController(db as unknown as PrismaService, finished as unknown as FinishedGoodsApi);
  await expect(controller.report(req,'order',{quantity:'1'})).rejects.toBeInstanceOf(BadRequestException);
  expect(finished.reportOutput).not.toHaveBeenCalled();
 });
 it('does not allow unknown lot history to bypass the expiry check', async () => {
  const db = { productionOrder:{findFirst:vi.fn().mockResolvedValue({id:'order'})}, $queryRaw:vi.fn().mockResolvedValue([]), inventoryMovement:{findMany:vi.fn().mockResolvedValue([])} };
  const controller = new StaffProductionController(db as unknown as PrismaService, {reportOutput:vi.fn()} as unknown as FinishedGoodsApi);
  await expect(controller.report(req,'order',{quantity:'1'})).rejects.toThrow('Không có dữ liệu lô');
 });
});

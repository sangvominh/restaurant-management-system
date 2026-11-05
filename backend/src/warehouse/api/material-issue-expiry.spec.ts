import { BadRequestException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { MaterialIssueApi } from './material-issue.api.js';
import type { PrismaService } from '../../prisma/prisma.service.js';

describe('material issue approval expiry validation', () => {
  it.each([null, new Date('2000-01-01T00:00:00Z')])('rejects an unusable lot before approving a staff issue (%s)', async expiryDate => {
    const updateMany = vi.fn();
    const tx = {
      materialIssue: { findUnique: vi.fn().mockResolvedValue({ id: 'issue', status: 'PENDING', branch: { isActive: true }, details: [{ materialLot: { expiryDate } }] }), updateMany },
      staffAudit: { findFirst: vi.fn().mockResolvedValue({ id: 'audit' }) },
    };
    const db = { $transaction: (callback: (client: typeof tx) => unknown) => callback(tx) };
    const api = new MaterialIssueApi(db as unknown as PrismaService);
    await expect(api.approveIssue('PX-1')).rejects.toBeInstanceOf(BadRequestException);
    expect(updateMany).not.toHaveBeenCalled();
  });
});

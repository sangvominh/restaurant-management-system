import { ServiceUnavailableException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { HealthController } from './health.controller.js';
import { PrismaService } from './prisma/prisma.service.js';

describe('HealthController', () => {
  it('returns ok when database responds', async () => {
    const db = { $queryRaw: vi.fn().mockResolvedValue([{ '?column?': 1 }]) } as unknown as PrismaService;
    const controller = new HealthController(db);
    const result = await controller.check();
    expect(result.status).toBe('ok');
    expect(result.database).toBe('up');
    expect(typeof result.timestamp).toBe('string');
  });

  it('throws 503 when database check fails', async () => {
    const db = { $queryRaw: vi.fn().mockRejectedValue(new Error('DB down')) } as unknown as PrismaService;
    const controller = new HealthController(db);
    await expect(controller.check()).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});

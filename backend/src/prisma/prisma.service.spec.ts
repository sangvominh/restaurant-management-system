import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service.js';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    vi.stubEnv('DATABASE_URL', 'postgresql://test:test@127.0.0.1:1/test');
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => { await service.$disconnect(); vi.unstubAllEnvs(); });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

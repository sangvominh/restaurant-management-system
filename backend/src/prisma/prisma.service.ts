import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Prisma } from '../generated/prisma/client.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString)
      throw new Error('Thiếu DATABASE_URL; xem backend/.env.example');
    super({
      adapter: new PrismaPg({
        connectionString,
        connectionTimeoutMillis: 5000,
      }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Tuần tự hóa các thay đổi tài khoản/vai trò/phục hồi, kể cả giữa nhiều instance.
  adminTransaction<T>(work: (tx: Prisma.TransactionClient) => Promise<T>) {
    return this.$transaction(
      async (tx) => {
        await tx.$queryRaw`SELECT pg_advisory_xact_lock(17112026)::text`;
        return work(tx);
      },
      { timeout: 15000 },
    );
  }
}

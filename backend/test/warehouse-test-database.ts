import { Client } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { randomUUID } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';

// Use an existing dedicated test database; never create/reset a database or use restaurant_dev.
export async function createWarehouseTestDatabase() {
  const value = process.env.WAREHOUSE_TEST_DATABASE_URL;
  if (!value)
    throw new Error(
      'Set WAREHOUSE_TEST_DATABASE_URL to an existing test database',
    );
  const url = new URL(value);
  if (
    !['localhost', '127.0.0.1'].includes(url.hostname) ||
    !/^\/restaurant_(staff_demo|[a-z0-9_]*test)$/.test(url.pathname)
  ) {
    throw new Error(
      'Warehouse E2E requires an existing local test database; restaurant_dev is forbidden',
    );
  }
  const schema = `warehouse_e2e_${process.pid}_${randomUUID().replaceAll('-', '')}`;
  const sql = new Client({ connectionString: value });
  await sql.connect();
  try {
    await sql.query('BEGIN');
    await sql.query(`CREATE SCHEMA "${schema}"`);
    await sql.query(`SET LOCAL search_path TO "${schema}"`);
    const directory = new URL('../prisma/migrations/', import.meta.url);
    for (const name of (await readdir(directory)).sort()) {
      if (name === 'migration_lock.toml') continue;
      const migration = await readFile(
        new URL(`${name}/migration.sql`, directory),
        'utf8',
      );
      if (/\b(?:CREATE|ALTER|DROP) DATABASE\b|\bpublic\./i.test(migration))
        throw new Error('Migration is not schema isolated');
      await sql.query(migration);
    }
    await sql.query('COMMIT');
  } catch (error) {
    await sql.query('ROLLBACK');
    await sql.end();
    throw error;
  }
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: value }, { schema }),
  });
  const branch = await prisma.branch.create({
    data: { code: 'E2E-BR', name: 'Test branch' },
  });
  await prisma.unit.create({ data: { name: 'kg' } });
  await prisma.warehouseLocation.create({
    data: {
      branchId: branch.id,
      name: 'Test location',
      locationType: 'RAW_MATERIAL',
    },
  });
  return {
    prisma,
    async close() {
      await prisma.$disconnect();
      if (!/^warehouse_e2e_\d+_[a-f0-9]+$/.test(schema))
        throw new Error('Unsafe test schema cleanup');
      const database = (await sql.query('SELECT current_database() AS name'))
        .rows[0].name;
      if (`/${database}` !== url.pathname)
        throw new Error('Test database changed');
      await sql.query(`DROP SCHEMA "${schema}" CASCADE`);
      await sql.end();
    },
  };
}

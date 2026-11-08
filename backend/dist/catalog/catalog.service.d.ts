import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
export type CatalogKind = 'units' | 'categories' | 'materials' | 'suppliers' | 'products';
export declare function kind(value: string): CatalogKind;
export declare class CatalogService {
    private readonly db;
    constructor(db: PrismaService);
    list(type: CatalogKind): Prisma.PrismaPromise<{
        symbol: string;
        id: string;
        name: string;
    }[]> | Prisma.PrismaPromise<{
        id: string;
        name: string;
        objectType: string;
    }[]> | Prisma.PrismaPromise<({
        unit: {
            symbol: string;
            id: string;
            name: string;
        };
        category: {
            id: string;
            name: string;
            objectType: string;
        };
    } & {
        id: string;
        status: string;
        name: string;
        code: string;
        minStock: import("@prisma/client-runtime-utils").Decimal;
        unitId: string;
        categoryId: string;
    })[]> | Prisma.PrismaPromise<{
        id: string;
        status: string;
        name: string;
        code: string;
        phone: string | null;
        address: string | null;
    }[]> | Prisma.PrismaPromise<({
        unit: {
            symbol: string;
            id: string;
            name: string;
        };
        category: {
            id: string;
            name: string;
            objectType: string;
        };
    } & {
        id: string;
        status: string;
        name: string;
        code: string;
        unitId: string;
        categoryId: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    save(type: CatalogKind, input: unknown, itemId?: string): Promise<{
        symbol: string;
        id: string;
        name: string;
    } | {
        id: string;
        name: string;
        objectType: string;
    } | {
        id: string;
        status: string;
        name: string;
        code: string;
        phone: string | null;
        address: string | null;
    } | {
        id: string;
        status: string;
        name: string;
        code: string;
        minStock: import("@prisma/client-runtime-utils").Decimal;
        unitId: string;
        categoryId: string;
    } | {
        id: string;
        status: string;
        name: string;
        code: string;
        unitId: string;
        categoryId: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    remove(type: CatalogKind, itemId: string): Promise<{
        message: string;
    }>;
}

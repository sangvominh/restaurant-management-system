import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
export declare class StockInsightsService {
    private readonly db;
    constructor(db: PrismaService);
    read(kind: string): Promise<{
        asOf: string;
        rows: {
            id: string;
            code: string;
            name: string;
            status: string;
            unit: string;
            category: string;
            stock: import("@prisma/client-runtime-utils").Decimal;
            usable: import("@prisma/client-runtime-utils").Decimal;
            expired: import("@prisma/client-runtime-utils").Decimal;
            expiring: import("@prisma/client-runtime-utils").Decimal;
            minimum: import("@prisma/client-runtime-utils").Decimal;
            shortage: import("@prisma/client-runtime-utils").Decimal;
            lots: {
                expired: boolean;
                soon: boolean;
                id: string;
                code: string;
                materialId: string;
                expiryDate: Date | null;
                quantity: Prisma.Decimal;
            }[];
        }[];
    } | {
        asOf: string;
        rows: {
            id: string;
            code: string;
            name: string;
            status: string;
            unit: string;
            category: string;
            stock: import("@prisma/client-runtime-utils").Decimal;
            demand: import("@prisma/client-runtime-utils").Decimal;
            pending: import("@prisma/client-runtime-utils").Decimal;
            shortage: import("@prisma/client-runtime-utils").Decimal;
            surplus: import("@prisma/client-runtime-utils").Decimal;
            orders: {
                code: string;
                remaining: import("@prisma/client-runtime-utils").Decimal;
                pending: import("@prisma/client-runtime-utils").Decimal;
            }[];
        }[];
    }>;
}

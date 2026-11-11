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
                daysRemaining: number | null;
                expired: boolean;
                soon: boolean;
                cancellations: {
                    id: string;
                    documentId: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    at: Date | null;
                    reason: string;
                    by: string;
                }[];
                id: string;
                code: string;
                materialId: string;
                expiryDate: string | null;
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
            supplyType: string;
            usable: import("@prisma/client-runtime-utils").Decimal;
            expired: import("@prisma/client-runtime-utils").Decimal;
            expiring: import("@prisma/client-runtime-utils").Decimal;
            untracked: import("@prisma/client-runtime-utils").Decimal;
            stock: import("@prisma/client-runtime-utils").Decimal;
            storeStock: import("@prisma/client-runtime-utils").Decimal;
            totalStock: import("@prisma/client-runtime-utils").Decimal;
            pending: import("@prisma/client-runtime-utils").Decimal;
            demand: import("@prisma/client-runtime-utils").Decimal;
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

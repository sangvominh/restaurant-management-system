import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
export declare class WarehouseReportService {
    private readonly db;
    constructor(db: PrismaService);
    read(start: string, end: string, horizonText?: string): Promise<{
        asOf: string;
        period: {
            start: string;
            end: string;
            observedDays: number;
            previousStart: string;
            previousEnd: string;
            horizon: number;
        };
        summary: {
            receiptCount: number;
            receiptValue: import("@prisma/client-runtime-utils").Decimal;
            runCount: number;
            wasteDocuments: number;
            openOrderCount: number;
            overdueOrders: number;
            openShortages: number;
            purchaseItems: number;
            productionItems: number;
            expiredItems: number;
        };
        materials: {
            stock: import("@prisma/client-runtime-utils").Decimal;
            usable: import("@prisma/client-runtime-utils").Decimal;
            expired: import("@prisma/client-runtime-utils").Decimal;
            expiring: {
                code: string;
                expiry: string | null;
                quantity: Prisma.Decimal;
            }[];
            minimum: import("@prisma/client-runtime-utils").Decimal;
            openNeed: import("@prisma/client-runtime-utils").Decimal;
            proposedNeed: import("@prisma/client-runtime-utils").Decimal;
            suggestedPurchase: import("@prisma/client-runtime-utils").Decimal;
            consumed: import("@prisma/client-runtime-utils").Decimal;
            coverageDays: import("@prisma/client-runtime-utils").Decimal | null;
            opening: import("@prisma/client-runtime-utils").Decimal;
            incoming: import("@prisma/client-runtime-utils").Decimal;
            outgoing: import("@prisma/client-runtime-utils").Decimal;
            closing: import("@prisma/client-runtime-utils").Decimal;
            previousOut: import("@prisma/client-runtime-utils").Decimal;
            outChange: import("@prisma/client-runtime-utils").Decimal | null;
            trend: {
                date: string;
                incoming: Prisma.Decimal;
                outgoing: Prisma.Decimal;
            }[];
            breakdown: {
                label: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
            }[];
            id: string;
            code: string;
            name: string;
            unit: string;
            status: string;
            category: string;
        }[];
        products: {
            stock: import("@prisma/client-runtime-utils").Decimal;
            exported: import("@prisma/client-runtime-utils").Decimal;
            demand: import("@prisma/client-runtime-utils").Decimal;
            inProduction: import("@prisma/client-runtime-utils").Decimal;
            awaitingInspection: import("@prisma/client-runtime-utils").Decimal;
            forecast: import("@prisma/client-runtime-utils").Decimal;
            suggested: import("@prisma/client-runtime-utils").Decimal;
            hasBom: boolean;
            actual: import("@prisma/client-runtime-utils").Decimal;
            accepted: import("@prisma/client-runtime-utils").Decimal;
            rejected: import("@prisma/client-runtime-utils").Decimal;
            yieldPercent: import("@prisma/client-runtime-utils").Decimal | null;
            runCount: number;
            opening: import("@prisma/client-runtime-utils").Decimal;
            incoming: import("@prisma/client-runtime-utils").Decimal;
            outgoing: import("@prisma/client-runtime-utils").Decimal;
            closing: import("@prisma/client-runtime-utils").Decimal;
            previousOut: import("@prisma/client-runtime-utils").Decimal;
            outChange: import("@prisma/client-runtime-utils").Decimal | null;
            trend: {
                date: string;
                incoming: Prisma.Decimal;
                outgoing: Prisma.Decimal;
            }[];
            breakdown: {
                label: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
            }[];
            id: string;
            code: string;
            name: string;
            unit: string;
            status: string;
            category: string;
        }[];
        formulas: {
            id: string;
            bomId: string;
            version: number;
            product: string;
            material: string;
            unit: string;
            expected: import("@prisma/client-runtime-utils").Decimal;
            actual: import("@prisma/client-runtime-utils").Decimal;
            delta: import("@prisma/client-runtime-utils").Decimal;
            deltaPercent: import("@prisma/client-runtime-utils").Decimal | null;
            runCount: number;
            orderIds: string[];
        }[];
        wastes: {
            id: string;
            documentId: string;
            name: string;
            unit: string;
            lot: string | null;
            source: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            at: Date | null;
            reason: string;
            by: string;
        }[];
    }>;
}

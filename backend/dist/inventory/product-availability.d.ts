import { Prisma } from '../generated/prisma/client.js';
export declare function productAvailability(tx: Prisma.TransactionClient, productId: string): Promise<{
    stock: import("@prisma/client-runtime-utils").Decimal;
    available: import("@prisma/client-runtime-utils").Decimal;
    held: import("@prisma/client-runtime-utils").Decimal;
    reserved: import("@prisma/client-runtime-utils").Decimal;
    shortage: import("@prisma/client-runtime-utils").Decimal;
    expired: import("@prisma/client-runtime-utils").Decimal;
    untracked: import("@prisma/client-runtime-utils").Decimal;
    allocations: {
        lineId: string;
        ready: import("@prisma/client-runtime-utils").Decimal;
        missing: import("@prisma/client-runtime-utils").Decimal;
        lots: {
            lotId: string;
            code: string;
            expiryDate: Date;
            quantity: Prisma.Decimal;
        }[];
        exported: import("@prisma/client-runtime-utils").Decimal;
        pending: import("@prisma/client-runtime-utils").Decimal;
    }[];
    lots: {
        available: import("@prisma/client-runtime-utils").Decimal;
        seenInStore: boolean;
        warehouse: import("@prisma/client-runtime-utils").Decimal;
        store: import("@prisma/client-runtime-utils").Decimal;
        warehouseHeld: import("@prisma/client-runtime-utils").Decimal;
        storeHeld: import("@prisma/client-runtime-utils").Decimal;
        daysRemaining: number;
        expired: boolean;
        soon: boolean;
        warehouseAvailable: import("@prisma/client-runtime-utils").Decimal;
        storeAvailable: import("@prisma/client-runtime-utils").Decimal;
        disposals: ({
            createdBy: {
                name: string;
            };
        } & {
            id: string;
            createdById: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            lotId: string;
            reason: string;
            postedAt: Date;
        })[];
        id: string;
        code: string;
        createdAt: Date;
        expiryDate: Date;
        productId: string;
        receiptLineId: string | null;
        manufacturedAt: Date;
        runId: string | null;
    }[];
}>;

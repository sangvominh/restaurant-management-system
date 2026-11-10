import { Prisma } from '../generated/prisma/client.js';
export declare function productAvailability(tx: Prisma.TransactionClient, productId: string): Promise<{
    stock: import("@prisma/client-runtime-utils").Decimal;
    available: import("@prisma/client-runtime-utils").Decimal;
    held: import("@prisma/client-runtime-utils").Decimal;
    allocations: {
        lineId: string;
        ready: import("@prisma/client-runtime-utils").Decimal;
        missing: import("@prisma/client-runtime-utils").Decimal;
        exported: import("@prisma/client-runtime-utils").Decimal;
        pending: import("@prisma/client-runtime-utils").Decimal;
    }[];
}>;

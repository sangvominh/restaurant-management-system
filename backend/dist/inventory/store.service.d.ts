import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class StoreService {
    private readonly db;
    constructor(db: PrismaService);
    list(): Prisma.PrismaPromise<({
        lines: ({
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            lotAllocations: ({
                lot: {
                    id: string;
                    code: string;
                    createdAt: Date;
                    expiryDate: Date;
                    productId: string;
                    receiptLineId: string | null;
                    manufacturedAt: Date;
                    runId: string | null;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                lotId: string;
                dispatchLineId: string;
            })[];
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            dispatchId: string;
        })[];
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        status: string;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string;
        requestedById: string;
        reviewedById: string | null;
    })[]>;
    stock(): Promise<{
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
        warehouse: import("@prisma/client-runtime-utils").Decimal;
        warehouseAvailable: import("@prisma/client-runtime-utils").Decimal;
        warehouseExpired: import("@prisma/client-runtime-utils").Decimal;
        warehouseUntracked: import("@prisma/client-runtime-utils").Decimal;
        unit: {
            symbol: string;
            id: string;
            name: string;
        };
        id: string;
        name: string;
        code: string;
        status: string;
        unitId: string;
        categoryId: string;
        supplyType: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    create(input: unknown, user: AdminUser): Promise<{
        lines: ({
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            lotAllocations: ({
                lot: {
                    id: string;
                    code: string;
                    createdAt: Date;
                    expiryDate: Date;
                    productId: string;
                    receiptLineId: string | null;
                    manufacturedAt: Date;
                    runId: string | null;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                lotId: string;
                dispatchLineId: string;
            })[];
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            dispatchId: string;
        })[];
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        status: string;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string;
        requestedById: string;
        reviewedById: string | null;
    }>;
    review(key: string, approve: boolean, user: AdminUser): Promise<{
        lines: ({
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            lotAllocations: ({
                lot: {
                    id: string;
                    code: string;
                    createdAt: Date;
                    expiryDate: Date;
                    productId: string;
                    receiptLineId: string | null;
                    manufacturedAt: Date;
                    runId: string | null;
                };
            } & {
                id: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                lotId: string;
                dispatchLineId: string;
            })[];
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            dispatchId: string;
        })[];
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        status: string;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string;
        requestedById: string;
        reviewedById: string | null;
    }>;
    adjustments(): Prisma.PrismaPromise<({
        product: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            code: string;
            status: string;
            unitId: string;
            categoryId: string;
            supplyType: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
        lot: {
            id: string;
            code: string;
            createdAt: Date;
            expiryDate: Date;
            productId: string;
            receiptLineId: string | null;
            manufacturedAt: Date;
            runId: string | null;
        } | null;
    } & {
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        lotId: string | null;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string;
        requestedById: string;
        reviewedById: string | null;
        productId: string;
        kind: string;
    })[]>;
    adjust(input: unknown, user: AdminUser): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        lotId: string | null;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string;
        requestedById: string;
        reviewedById: string | null;
        productId: string;
        kind: string;
    }>;
    reviewAdjustment(key: string, approve: boolean, user: AdminUser): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        lotId: string | null;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string;
        requestedById: string;
        reviewedById: string | null;
        productId: string;
        kind: string;
    }>;
}

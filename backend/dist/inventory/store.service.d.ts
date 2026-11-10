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
                status: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
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
        reason: string;
        requestedAt: Date;
        approvedAt: Date | null;
        requestedById: string;
        reviewedById: string | null;
    })[]>;
    stock(): Promise<{
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
        warehouse: import("@prisma/client-runtime-utils").Decimal;
        warehouseAvailable: import("@prisma/client-runtime-utils").Decimal;
        unit: {
            symbol: string;
            id: string;
            name: string;
        };
        id: string;
        name: string;
        status: string;
        code: string;
        unitId: string;
        categoryId: string;
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
                status: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
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
        reason: string;
        requestedAt: Date;
        approvedAt: Date | null;
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
                status: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
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
        reason: string;
        requestedAt: Date;
        approvedAt: Date | null;
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
            status: string;
            code: string;
            unitId: string;
            categoryId: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        status: string;
        productId: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        kind: string;
        reason: string;
        requestedAt: Date;
        approvedAt: Date | null;
        requestedById: string;
        reviewedById: string | null;
    })[]>;
    adjust(input: unknown, user: AdminUser): Promise<{
        id: string;
        status: string;
        productId: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        kind: string;
        reason: string;
        requestedAt: Date;
        approvedAt: Date | null;
        requestedById: string;
        reviewedById: string | null;
    }>;
    reviewAdjustment(key: string, approve: boolean, user: AdminUser): Promise<{
        id: string;
        status: string;
        productId: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        kind: string;
        reason: string;
        requestedAt: Date;
        approvedAt: Date | null;
        requestedById: string;
        reviewedById: string | null;
    }>;
}

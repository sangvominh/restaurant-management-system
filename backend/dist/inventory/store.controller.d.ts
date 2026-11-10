import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { StoreService } from './store.service.js';
type R = Request & {
    catalogUser: AdminUser;
};
export declare class StoreController {
    private readonly service;
    constructor(service: StoreService);
    private allow;
    dispatches(r: R): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
    stock(r: R): Promise<{
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
    list(r: R): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
    create(b: unknown, r: R): Promise<{
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
    review(id: string, action: string, r: R): Promise<{
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
export {};

import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class ShortageService {
    private readonly db;
    constructor(db: PrismaService);
    list(user: AdminUser): Prisma.PrismaPromise<({
        material: {
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
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        productionOrder: {
            bom: {
                product: {
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
                status: string;
                version: number;
                effectiveAt: Date;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                productId: string;
                createdById: string;
            };
        } & {
            id: string;
            status: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
            assignedAt: Date;
            dueAt: Date | null;
            assignedById: string;
            assignedToId: string;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        updatedAt: Date;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        materialId: string;
        reason: string;
        requestedAt: Date;
        requestedById: string;
        reviewedById: string | null;
        productionOrderId: string;
        reviewNote: string | null;
    })[]>;
    save(input: unknown, user: AdminUser, reportId?: string): Promise<{
        material: {
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
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        productionOrder: {
            bom: {
                product: {
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
                status: string;
                version: number;
                effectiveAt: Date;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                productId: string;
                createdById: string;
            };
        } & {
            id: string;
            status: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
            assignedAt: Date;
            dueAt: Date | null;
            assignedById: string;
            assignedToId: string;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        updatedAt: Date;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        materialId: string;
        reason: string;
        requestedAt: Date;
        requestedById: string;
        reviewedById: string | null;
        productionOrderId: string;
        reviewNote: string | null;
    }>;
}

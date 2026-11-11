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
            code: string;
            status: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    name: string;
                    code: string;
                    status: string;
                    unitId: string;
                    categoryId: string;
                    supplyType: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                status: string;
                createdById: string;
                productId: string;
                version: number;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
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
        materialId: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        requestedAt: Date;
        reason: string;
        reviewNote: string | null;
        productionOrderId: string;
        requestedById: string;
        reviewedById: string | null;
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
            code: string;
            status: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    name: string;
                    code: string;
                    status: string;
                    unitId: string;
                    categoryId: string;
                    supplyType: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                status: string;
                createdById: string;
                productId: string;
                version: number;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
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
        materialId: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        requestedAt: Date;
        reason: string;
        reviewNote: string | null;
        productionOrderId: string;
        requestedById: string;
        reviewedById: string | null;
    }>;
}

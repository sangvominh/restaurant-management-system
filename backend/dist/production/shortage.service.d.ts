import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class ShortageService {
    private readonly db;
    constructor(db: PrismaService);
    list(user: AdminUser): Prisma.PrismaPromise<({
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    status: string;
                    code: string;
                    name: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                status: string;
                version: number;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
                productId: string;
                createdById: string;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            assignedAt: Date;
            dueAt: Date | null;
            bomId: string;
            assignedById: string;
            assignedToId: string;
        };
        material: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            status: string;
            code: string;
            name: string;
            unitId: string;
            categoryId: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        reason: string;
        status: string;
        requestedAt: Date;
        updatedAt: Date;
        reviewNote: string | null;
        productionOrderId: string;
        materialId: string;
        requestedById: string;
        reviewedById: string | null;
    })[]>;
    save(input: unknown, user: AdminUser, reportId?: string): Promise<{
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    status: string;
                    code: string;
                    name: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                status: string;
                version: number;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
                productId: string;
                createdById: string;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            assignedAt: Date;
            dueAt: Date | null;
            bomId: string;
            assignedById: string;
            assignedToId: string;
        };
        material: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            status: string;
            code: string;
            name: string;
            unitId: string;
            categoryId: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        reason: string;
        status: string;
        requestedAt: Date;
        updatedAt: Date;
        reviewNote: string | null;
        productionOrderId: string;
        materialId: string;
        requestedById: string;
        reviewedById: string | null;
    }>;
}

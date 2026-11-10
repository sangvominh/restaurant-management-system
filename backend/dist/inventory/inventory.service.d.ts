import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class InventoryService {
    private readonly db;
    constructor(db: PrismaService);
    list(): Prisma.PrismaPromise<({
        supplier: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            address: string | null;
        };
        createdBy: {
            id: string;
            name: string;
            accountId: string | null;
        };
        lines: ({
            lot: {
                material: {
                    unit: {
                        symbol: string;
                        id: string;
                        name: string;
                    };
                } & {
                    id: string;
                    status: string;
                    name: string;
                    code: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                code: string;
                materialId: string;
                expiryDate: Date | null;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            lotId: string;
            receiptId: string;
        })[];
    } & {
        id: string;
        status: string;
        code: string;
        createdById: string;
        receivedAt: Date;
        note: string | null;
        supplierId: string;
    })[]>;
    references(): Promise<{
        suppliers: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            address: string | null;
        }[];
        materials: ({
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            status: string;
            name: string;
            code: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        })[];
    }>;
    private editable;
    save(input: unknown, user: AdminUser, receiptId?: string): Promise<{
        supplier: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            address: string | null;
        };
        createdBy: {
            id: string;
            name: string;
            accountId: string | null;
        };
        lines: ({
            lot: {
                material: {
                    unit: {
                        symbol: string;
                        id: string;
                        name: string;
                    };
                } & {
                    id: string;
                    status: string;
                    name: string;
                    code: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                code: string;
                materialId: string;
                expiryDate: Date | null;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            lotId: string;
            receiptId: string;
        })[];
    } & {
        id: string;
        status: string;
        code: string;
        createdById: string;
        receivedAt: Date;
        note: string | null;
        supplierId: string;
    }>;
    post(receiptId: string): Promise<{
        supplier: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            address: string | null;
        };
        createdBy: {
            id: string;
            name: string;
            accountId: string | null;
        };
        lines: ({
            lot: {
                material: {
                    unit: {
                        symbol: string;
                        id: string;
                        name: string;
                    };
                } & {
                    id: string;
                    status: string;
                    name: string;
                    code: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                code: string;
                materialId: string;
                expiryDate: Date | null;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            lotId: string;
            receiptId: string;
        })[];
    } & {
        id: string;
        status: string;
        code: string;
        createdById: string;
        receivedAt: Date;
        note: string | null;
        supplierId: string;
    }>;
    remove(receiptId: string, user: AdminUser): Promise<{
        message: string;
    }>;
    stock(): Prisma.PrismaPromise<unknown>;
    setMinimum(materialId: string, input: unknown): Promise<{
        id: string;
        minStock: import("@prisma/client-runtime-utils").Decimal;
    }>;
    discardLot(lotId: string, input: unknown, user: AdminUser): Promise<{
        lines: {
            id: string;
            productId: string | null;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string | null;
            lotId: string | null;
            sourceType: string;
            issueLineId: string | null;
            wasteId: string;
        }[];
    } & {
        id: string;
        status: string;
        reason: string;
        reportedAt: Date;
        approvedAt: Date | null;
        reportedById: string;
        reviewedById: string | null;
    }>;
    lots(materialId: string): Promise<unknown>;
}

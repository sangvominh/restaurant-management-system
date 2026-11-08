import { PrismaService } from '../prisma/prisma.service.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class SalesService {
    private readonly db;
    constructor(db: PrismaService);
    products(): Promise<{
        stock: import("@prisma/client-runtime-utils").Decimal;
        unit: {
            symbol: string;
            id: string;
            name: string;
        };
        category: {
            id: string;
            name: string;
            objectType: string;
        };
        id: string;
        status: string;
        name: string;
        code: string;
        unitId: string;
        categoryId: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    list(): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            product: {
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
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
            productName: string;
            productId: string;
        })[];
        exports: ({
            lines: {
                id: string;
                saleLineId: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
            }[];
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
            reason: string | null;
            saleId: string;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        createdById: string;
    }[]>;
    save(input: unknown, user: AdminUser, existingId?: string): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            product: {
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
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
            productName: string;
            productId: string;
        })[];
        exports: ({
            lines: {
                id: string;
                saleLineId: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
            }[];
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
            reason: string | null;
            saleId: string;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        createdById: string;
    }>;
    action(saleId: string, action: 'confirm' | 'cancel' | 'pay', input: unknown): Promise<{
        total: import("@prisma/client-runtime-utils").Decimal;
        payment: {
            id: string;
            status: string;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string;
            paidAt: Date | null;
        } | null;
        createdBy: {
            id: string;
            name: string;
        };
        lines: ({
            product: {
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
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
            productName: string;
            productId: string;
        })[];
        exports: ({
            lines: {
                id: string;
                saleLineId: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
            }[];
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
            reason: string | null;
            saleId: string;
            requestedById: string;
            reviewedById: string | null;
        })[];
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        createdById: string;
    }>;
}

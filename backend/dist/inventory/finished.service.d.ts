import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class FinishedService {
    private readonly db;
    constructor(db: PrismaService);
    list(): Prisma.PrismaPromise<({
        sale: {
            id: string;
            status: string;
            code: string;
            createdAt: Date;
            createdById: string;
        };
        requestedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        lines: ({
            saleLine: {
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
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                saleId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                productName: string;
                productId: string;
            };
        } & {
            id: string;
            requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
            exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
            exportId: string;
            saleLineId: string;
        })[];
        reviewedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        } | null;
    } & {
        id: string;
        requestedAt: Date;
        approvedAt: Date | null;
        status: string;
        reason: string | null;
        saleId: string;
        requestedById: string;
        reviewedById: string | null;
    })[]>;
    sales(): Prisma.PrismaPromise<({
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
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
            exportLines: ({
                export: {
                    id: string;
                    requestedAt: Date;
                    approvedAt: Date | null;
                    status: string;
                    reason: string | null;
                    saleId: string;
                    requestedById: string;
                    reviewedById: string | null;
                };
            } & {
                id: string;
                requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                exportId: string;
                saleLineId: string;
            })[];
        } & {
            id: string;
            saleId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            productName: string;
            productId: string;
        })[];
    } & {
        id: string;
        status: string;
        code: string;
        createdAt: Date;
        createdById: string;
    })[]>;
    create(input: unknown, user: AdminUser): Promise<{
        sale: {
            id: string;
            status: string;
            code: string;
            createdAt: Date;
            createdById: string;
        };
        requestedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        lines: ({
            saleLine: {
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
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                saleId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                productName: string;
                productId: string;
            };
        } & {
            id: string;
            requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
            exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
            exportId: string;
            saleLineId: string;
        })[];
        reviewedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        } | null;
    } & {
        id: string;
        requestedAt: Date;
        approvedAt: Date | null;
        status: string;
        reason: string | null;
        saleId: string;
        requestedById: string;
        reviewedById: string | null;
    }>;
    review(exportId: string, approve: boolean, user: AdminUser): Promise<{
        sale: {
            id: string;
            status: string;
            code: string;
            createdAt: Date;
            createdById: string;
        };
        requestedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        lines: ({
            saleLine: {
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
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                saleId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                productName: string;
                productId: string;
            };
        } & {
            id: string;
            requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
            exportedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
            exportId: string;
            saleLineId: string;
        })[];
        reviewedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        } | null;
    } & {
        id: string;
        requestedAt: Date;
        approvedAt: Date | null;
        status: string;
        reason: string | null;
        saleId: string;
        requestedById: string;
        reviewedById: string | null;
    }>;
    report(kind: string, start?: string, end?: string): Promise<{
        id: string;
        code: string;
        name: string;
        unit: string;
        opening: import("@prisma/client-runtime-utils").Decimal;
        incoming: import("@prisma/client-runtime-utils").Decimal;
        outgoing: import("@prisma/client-runtime-utils").Decimal;
        closing: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
}

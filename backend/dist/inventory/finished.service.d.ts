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
            createdAt: Date;
            code: string;
            version: number;
            createdById: string;
            closedAt: Date | null;
            closedById: string | null;
            tableId: string | null;
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
                    unitId: string;
                    categoryId: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                productId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                sentById: string | null;
                sentAt: Date | null;
                batch: number | null;
                productName: string;
                saleId: string;
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
        requestedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
    } & {
        id: string;
        status: string;
        reason: string | null;
        approvedAt: Date | null;
        reviewedById: string | null;
        saleId: string;
        requestedAt: Date;
        requestedById: string;
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
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            exportLines: ({
                export: {
                    id: string;
                    status: string;
                    reason: string | null;
                    approvedAt: Date | null;
                    reviewedById: string | null;
                    saleId: string;
                    requestedAt: Date;
                    requestedById: string;
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
            productId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        })[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        code: string;
        version: number;
        createdById: string;
        closedAt: Date | null;
        closedById: string | null;
        tableId: string | null;
    })[]>;
    create(input: unknown, user: AdminUser): Promise<{
        sale: {
            id: string;
            status: string;
            createdAt: Date;
            code: string;
            version: number;
            createdById: string;
            closedAt: Date | null;
            closedById: string | null;
            tableId: string | null;
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
                    unitId: string;
                    categoryId: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                productId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                sentById: string | null;
                sentAt: Date | null;
                batch: number | null;
                productName: string;
                saleId: string;
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
        requestedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
    } & {
        id: string;
        status: string;
        reason: string | null;
        approvedAt: Date | null;
        reviewedById: string | null;
        saleId: string;
        requestedAt: Date;
        requestedById: string;
    }>;
    review(exportId: string, approve: boolean, user: AdminUser): Promise<{
        sale: {
            id: string;
            status: string;
            createdAt: Date;
            code: string;
            version: number;
            createdById: string;
            closedAt: Date | null;
            closedById: string | null;
            tableId: string | null;
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
                    unitId: string;
                    categoryId: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                productId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                note: string;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                sentById: string | null;
                sentAt: Date | null;
                batch: number | null;
                productName: string;
                saleId: string;
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
        requestedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
    } & {
        id: string;
        status: string;
        reason: string | null;
        approvedAt: Date | null;
        reviewedById: string | null;
        saleId: string;
        requestedAt: Date;
        requestedById: string;
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

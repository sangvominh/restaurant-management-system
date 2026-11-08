import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { FinishedService } from './finished.service.js';
type R = Request & {
    catalogUser: AdminUser;
};
export declare class FinishedController {
    private readonly service;
    constructor(service: FinishedService);
    private allow;
    list(r: R): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
    sales(r: R): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
    create(b: unknown, r: R): Promise<{
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
    approve(id: string, r: R): Promise<{
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
    reject(id: string, r: R): Promise<{
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
    stock(r: R): Promise<{
        id: string;
        code: string;
        name: string;
        unit: string;
        opening: import("@prisma/client-runtime-utils").Decimal;
        incoming: import("@prisma/client-runtime-utils").Decimal;
        outgoing: import("@prisma/client-runtime-utils").Decimal;
        closing: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    report(kind: string, start: string, end: string, r: R): Promise<{
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
export {};

import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { FinishedService } from './finished.service.js';
import { WarehouseReportService } from './warehouse-report.service.js';
type R = Request & {
    catalogUser: AdminUser;
};
export declare class FinishedController {
    private readonly service;
    private readonly reports;
    constructor(service: FinishedService, reports: WarehouseReportService);
    private allow;
    list(r: R): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
    create(b: unknown, r: R): Promise<{
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
    approve(id: string, r: R): Promise<{
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
    reject(id: string, r: R): Promise<{
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
    analytics(start: string, end: string, horizon: string, r: R): Promise<{
        asOf: string;
        period: {
            start: string;
            end: string;
            observedDays: number;
            previousStart: string;
            previousEnd: string;
            horizon: number;
        };
        summary: {
            receiptCount: number;
            receiptValue: import("@prisma/client-runtime-utils").Decimal;
            runCount: number;
            wasteDocuments: number;
            openOrderCount: number;
            overdueOrders: number;
            openShortages: number;
            purchaseItems: number;
            productionItems: number;
            expiredItems: number;
        };
        materials: {
            stock: import("@prisma/client-runtime-utils").Decimal;
            usable: import("@prisma/client-runtime-utils").Decimal;
            expired: import("@prisma/client-runtime-utils").Decimal;
            expiring: {
                code: string;
                expiry: string | null;
                quantity: import("../generated/prisma/internal/prismaNamespace.js").Decimal;
            }[];
            minimum: import("@prisma/client-runtime-utils").Decimal;
            openNeed: import("@prisma/client-runtime-utils").Decimal;
            proposedNeed: import("@prisma/client-runtime-utils").Decimal;
            suggestedPurchase: import("@prisma/client-runtime-utils").Decimal;
            consumed: import("@prisma/client-runtime-utils").Decimal;
            coverageDays: import("@prisma/client-runtime-utils").Decimal | null;
            opening: import("@prisma/client-runtime-utils").Decimal;
            incoming: import("@prisma/client-runtime-utils").Decimal;
            outgoing: import("@prisma/client-runtime-utils").Decimal;
            closing: import("@prisma/client-runtime-utils").Decimal;
            previousOut: import("@prisma/client-runtime-utils").Decimal;
            outChange: import("@prisma/client-runtime-utils").Decimal | null;
            trend: {
                date: string;
                incoming: import("../generated/prisma/internal/prismaNamespace.js").Decimal;
                outgoing: import("../generated/prisma/internal/prismaNamespace.js").Decimal;
            }[];
            breakdown: {
                label: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
            }[];
            id: string;
            code: string;
            name: string;
            unit: string;
            status: string;
            category: string;
        }[];
        products: {
            stock: import("@prisma/client-runtime-utils").Decimal;
            exported: import("@prisma/client-runtime-utils").Decimal;
            demand: import("@prisma/client-runtime-utils").Decimal;
            inProduction: import("@prisma/client-runtime-utils").Decimal;
            awaitingInspection: import("@prisma/client-runtime-utils").Decimal;
            forecast: import("@prisma/client-runtime-utils").Decimal;
            suggested: import("@prisma/client-runtime-utils").Decimal;
            hasBom: boolean;
            actual: import("@prisma/client-runtime-utils").Decimal;
            accepted: import("@prisma/client-runtime-utils").Decimal;
            rejected: import("@prisma/client-runtime-utils").Decimal;
            yieldPercent: import("@prisma/client-runtime-utils").Decimal | null;
            runCount: number;
            opening: import("@prisma/client-runtime-utils").Decimal;
            incoming: import("@prisma/client-runtime-utils").Decimal;
            outgoing: import("@prisma/client-runtime-utils").Decimal;
            closing: import("@prisma/client-runtime-utils").Decimal;
            previousOut: import("@prisma/client-runtime-utils").Decimal;
            outChange: import("@prisma/client-runtime-utils").Decimal | null;
            trend: {
                date: string;
                incoming: import("../generated/prisma/internal/prismaNamespace.js").Decimal;
                outgoing: import("../generated/prisma/internal/prismaNamespace.js").Decimal;
            }[];
            breakdown: {
                label: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
            }[];
            id: string;
            code: string;
            name: string;
            unit: string;
            status: string;
            category: string;
        }[];
        formulas: {
            id: string;
            bomId: string;
            version: number;
            product: string;
            material: string;
            unit: string;
            expected: import("@prisma/client-runtime-utils").Decimal;
            actual: import("@prisma/client-runtime-utils").Decimal;
            delta: import("@prisma/client-runtime-utils").Decimal;
            deltaPercent: import("@prisma/client-runtime-utils").Decimal | null;
            runCount: number;
            orderIds: string[];
        }[];
        wastes: {
            id: string;
            documentId: string;
            name: string;
            unit: string;
            lot: string | null;
            source: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            at: Date | null;
            reason: string;
            by: string;
        }[];
    }>;
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

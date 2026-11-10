import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { StoreService } from './store.service.js';
import { FinishedService } from './finished.service.js';
import { WarehouseReportService } from './warehouse-report.service.js';
type R = Request & {
    catalogUser: AdminUser;
};
export declare class FinishedController {
    private readonly service;
    private readonly reports;
    private readonly store;
    constructor(service: FinishedService, reports: WarehouseReportService, store: StoreService);
    private allow;
    list(r: R): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
    sales(r: R): Promise<{
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
    create(b: unknown, r: R): Promise<{
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
    }>;
    approve(id: string, r: R): Promise<{
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
    }>;
    reject(id: string, r: R): Promise<{
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
            storeStock: import("@prisma/client-runtime-utils").Decimal;
            totalStock: import("@prisma/client-runtime-utils").Decimal;
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

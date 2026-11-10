import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { InventoryService } from './inventory.service.js';
import { StockInsightsService } from './stock-insights.service.js';
type AuthRequest = Request & {
    catalogUser: AdminUser;
};
export declare class InventoryController {
    private readonly service;
    private readonly insights;
    constructor(service: InventoryService, insights: StockInsightsService);
    private allow;
    references(req: AuthRequest): Promise<{
        suppliers: {
            id: string;
            name: string;
            status: string;
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
            name: string;
            status: string;
            code: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        })[];
    }>;
    list(req: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        supplier: {
            id: string;
            name: string;
            status: string;
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
                    name: string;
                    status: string;
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
        note: string | null;
        receivedAt: Date;
        supplierId: string;
    })[]>;
    create(b: unknown, req: AuthRequest): Promise<{
        supplier: {
            id: string;
            name: string;
            status: string;
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
                    name: string;
                    status: string;
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
        note: string | null;
        receivedAt: Date;
        supplierId: string;
    }>;
    update(id: string, b: unknown, req: AuthRequest): Promise<{
        supplier: {
            id: string;
            name: string;
            status: string;
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
                    name: string;
                    status: string;
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
        note: string | null;
        receivedAt: Date;
        supplierId: string;
    }>;
    remove(id: string, req: AuthRequest): Promise<{
        message: string;
    }>;
    post(id: string, req: AuthRequest): Promise<{
        supplier: {
            id: string;
            name: string;
            status: string;
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
                    name: string;
                    status: string;
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
        note: string | null;
        receivedAt: Date;
        supplierId: string;
    }>;
    stock(req: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<unknown>;
    discard(id: string, b: unknown, req: AuthRequest): Promise<{
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
        approvedAt: Date | null;
        reviewedById: string | null;
        reportedAt: Date;
        reportedById: string;
    }>;
    minimum(id: string, b: unknown, req: AuthRequest): Promise<{
        id: string;
        minStock: import("@prisma/client-runtime-utils").Decimal;
    }>;
    insightsList(kind: string, req: AuthRequest): Promise<{
        asOf: string;
        rows: {
            id: string;
            code: string;
            name: string;
            status: string;
            unit: string;
            category: string;
            stock: import("@prisma/client-runtime-utils").Decimal;
            usable: import("@prisma/client-runtime-utils").Decimal;
            expired: import("@prisma/client-runtime-utils").Decimal;
            expiring: import("@prisma/client-runtime-utils").Decimal;
            minimum: import("@prisma/client-runtime-utils").Decimal;
            shortage: import("@prisma/client-runtime-utils").Decimal;
            lots: {
                daysRemaining: number | null;
                expired: boolean;
                soon: boolean;
                cancellations: {
                    id: string;
                    documentId: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    at: Date | null;
                    reason: string;
                    by: string;
                }[];
                id: string;
                code: string;
                materialId: string;
                expiryDate: string | null;
                quantity: import("../generated/prisma/internal/prismaNamespace.js").Decimal;
            }[];
        }[];
    } | {
        asOf: string;
        rows: {
            id: string;
            code: string;
            name: string;
            status: string;
            unit: string;
            category: string;
            stock: import("@prisma/client-runtime-utils").Decimal;
            storeStock: import("@prisma/client-runtime-utils").Decimal;
            totalStock: import("@prisma/client-runtime-utils").Decimal;
            pending: import("@prisma/client-runtime-utils").Decimal;
            demand: import("@prisma/client-runtime-utils").Decimal;
            shortage: import("@prisma/client-runtime-utils").Decimal;
            surplus: import("@prisma/client-runtime-utils").Decimal;
            orders: {
                code: string;
                remaining: import("@prisma/client-runtime-utils").Decimal;
                pending: import("@prisma/client-runtime-utils").Decimal;
            }[];
        }[];
    }>;
    lots(id: string, req: AuthRequest): Promise<unknown>;
}
export {};

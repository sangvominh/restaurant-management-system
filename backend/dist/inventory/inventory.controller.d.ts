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
            code: string;
            name: string;
            status: string;
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
            code: string;
            name: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            unitId: string;
            categoryId: string;
        })[];
    }>;
    list(req: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        supplier: {
            id: string;
            code: string;
            name: string;
            status: string;
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
                    code: string;
                    name: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    status: string;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                code: string;
                expiryDate: Date | null;
                materialId: string;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            receiptId: string;
            lotId: string;
        })[];
    } & {
        id: string;
        code: string;
        status: string;
        createdById: string;
        receivedAt: Date;
        note: string | null;
        supplierId: string;
    })[]>;
    create(b: unknown, req: AuthRequest): Promise<{
        supplier: {
            id: string;
            code: string;
            name: string;
            status: string;
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
                    code: string;
                    name: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    status: string;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                code: string;
                expiryDate: Date | null;
                materialId: string;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            receiptId: string;
            lotId: string;
        })[];
    } & {
        id: string;
        code: string;
        status: string;
        createdById: string;
        receivedAt: Date;
        note: string | null;
        supplierId: string;
    }>;
    update(id: string, b: unknown, req: AuthRequest): Promise<{
        supplier: {
            id: string;
            code: string;
            name: string;
            status: string;
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
                    code: string;
                    name: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    status: string;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                code: string;
                expiryDate: Date | null;
                materialId: string;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            receiptId: string;
            lotId: string;
        })[];
    } & {
        id: string;
        code: string;
        status: string;
        createdById: string;
        receivedAt: Date;
        note: string | null;
        supplierId: string;
    }>;
    remove(id: string, req: AuthRequest): Promise<{
        message: string;
    }>;
    post(id: string, req: AuthRequest): Promise<{
        supplier: {
            id: string;
            code: string;
            name: string;
            status: string;
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
                    code: string;
                    name: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    status: string;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                code: string;
                expiryDate: Date | null;
                materialId: string;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            receiptId: string;
            lotId: string;
        })[];
    } & {
        id: string;
        code: string;
        status: string;
        createdById: string;
        receivedAt: Date;
        note: string | null;
        supplierId: string;
    }>;
    stock(req: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<unknown>;
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
                expired: boolean;
                soon: boolean;
                id: string;
                code: string;
                materialId: string;
                expiryDate: Date | null;
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
            demand: import("@prisma/client-runtime-utils").Decimal;
            pending: import("@prisma/client-runtime-utils").Decimal;
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

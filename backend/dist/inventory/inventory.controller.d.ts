import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { InventoryService } from './inventory.service.js';
type AuthRequest = Request & {
    catalogUser: AdminUser;
};
export declare class InventoryController {
    private readonly service;
    constructor(service: InventoryService);
    private allow;
    references(req: AuthRequest): Promise<{
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
    list(req: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
                expiryDate: Date | null;
                materialId: string;
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
        receivedAt: Date;
        note: string | null;
        supplierId: string;
        createdById: string;
    })[]>;
    create(b: unknown, req: AuthRequest): Promise<{
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
                expiryDate: Date | null;
                materialId: string;
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
        receivedAt: Date;
        note: string | null;
        supplierId: string;
        createdById: string;
    }>;
    update(id: string, b: unknown, req: AuthRequest): Promise<{
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
                expiryDate: Date | null;
                materialId: string;
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
        receivedAt: Date;
        note: string | null;
        supplierId: string;
        createdById: string;
    }>;
    remove(id: string, req: AuthRequest): Promise<{
        message: string;
    }>;
    post(id: string, req: AuthRequest): Promise<{
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
                expiryDate: Date | null;
                materialId: string;
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
        receivedAt: Date;
        note: string | null;
        supplierId: string;
        createdById: string;
    }>;
    stock(req: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<unknown>;
    lots(id: string, req: AuthRequest): Promise<unknown>;
}
export {};

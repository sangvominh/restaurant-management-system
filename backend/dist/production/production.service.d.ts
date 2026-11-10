import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class ProductionService {
    private readonly db;
    constructor(db: PrismaService);
    references(): Promise<{
        products: ({
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
        })[];
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
        employees: {
            id: string;
            name: string;
            code: string;
        }[];
    }>;
    boms(): Prisma.PrismaPromise<({
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
        createdBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        lines: ({
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
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
            materialId: string;
        })[];
    } & {
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    })[]>;
    saveBom(input: unknown, user: AdminUser, existingId?: string): Promise<{
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
        createdBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        lines: ({
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
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
            materialId: string;
        })[];
    } & {
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    }>;
    bomAction(id: string, action: 'activate' | 'delete'): Promise<{
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    }>;
    orders(user: AdminUser): Prisma.PrismaPromise<({
        bom: {
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
            createdBy: {
                id: string;
                status: string;
                name: string;
                code: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            lines: ({
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
                quantity: import("@prisma/client-runtime-utils").Decimal;
                bomId: string;
                materialId: string;
            })[];
        } & {
            id: string;
            status: string;
            version: number;
            effectiveAt: Date;
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            createdById: string;
        };
        assignedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
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
        quantity: import("@prisma/client-runtime-utils").Decimal;
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    })[]>;
    rejectReplenishment(id: string, input: unknown): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        note: string;
        requestedAt: Date;
        requestedById: string;
        saleLineId: string;
        productionOrderId: string | null;
    }>;
    replenishments(): Promise<({
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
            sale: {
                table: {
                    id: string;
                    status: string;
                    name: string;
                    area: string;
                    x: number;
                    y: number;
                } | null;
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
        requestedBy: {
            name: string;
        };
    } & {
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        note: string;
        requestedAt: Date;
        requestedById: string;
        saleLineId: string;
        productionOrderId: string | null;
    })[]>;
    createOrder(input: unknown, user: AdminUser): Promise<{
        bom: {
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
            createdBy: {
                id: string;
                status: string;
                name: string;
                code: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            lines: ({
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
                quantity: import("@prisma/client-runtime-utils").Decimal;
                bomId: string;
                materialId: string;
            })[];
        } & {
            id: string;
            status: string;
            version: number;
            effectiveAt: Date;
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            createdById: string;
        };
        assignedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
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
        quantity: import("@prisma/client-runtime-utils").Decimal;
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    }>;
    orderAction(id: string, action: 'receive' | 'cancel', user: AdminUser): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    }>;
}

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
            name: string;
            code: string;
            status: string;
            unitId: string;
            categoryId: string;
            supplyType: string;
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
            name: string;
            code: string;
            status: string;
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
            name: string;
            code: string;
            status: string;
            unitId: string;
            categoryId: string;
            supplyType: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        createdBy: {
            id: string;
            name: string;
            code: string;
            status: string;
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
                name: string;
                code: string;
                status: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
        } & {
            id: string;
            materialId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
        })[];
    } & {
        id: string;
        status: string;
        createdById: string;
        productId: string;
        version: number;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
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
            name: string;
            code: string;
            status: string;
            unitId: string;
            categoryId: string;
            supplyType: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        createdBy: {
            id: string;
            name: string;
            code: string;
            status: string;
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
                name: string;
                code: string;
                status: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
        } & {
            id: string;
            materialId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            bomId: string;
        })[];
    } & {
        id: string;
        status: string;
        createdById: string;
        productId: string;
        version: number;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
    }>;
    bomAction(id: string, action: 'activate' | 'delete'): Promise<{
        id: string;
        status: string;
        createdById: string;
        productId: string;
        version: number;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
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
                name: string;
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            createdBy: {
                id: string;
                name: string;
                code: string;
                status: string;
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
                    name: string;
                    code: string;
                    status: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                materialId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                bomId: string;
            })[];
        } & {
            id: string;
            status: string;
            createdById: string;
            productId: string;
            version: number;
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            effectiveAt: Date;
        };
        replenishments: ({
            saleLine: {
                sale: {
                    table: {
                        id: string;
                        name: string;
                        status: string;
                        area: string;
                        x: number;
                        y: number;
                    } | null;
                } & {
                    id: string;
                    code: string;
                    status: string;
                    createdAt: Date;
                    createdById: string;
                    version: number;
                    closedAt: Date | null;
                    closedById: string | null;
                    tableId: string | null;
                };
            } & {
                id: string;
                note: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                productId: string;
                sentById: string | null;
                sentAt: Date | null;
                batch: number | null;
                productName: string;
                saleId: string;
            };
        } & {
            id: string;
            status: string;
            note: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            requestedAt: Date;
            productionOrderId: string | null;
            requestedById: string;
            saleLineId: string;
        })[];
        assignedBy: {
            id: string;
            name: string;
            code: string;
            status: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
            id: string;
            name: string;
            code: string;
            status: string;
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
                name: string;
                code: string;
                status: string;
                unitId: string;
                categoryId: string;
                supplyType: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            };
            createdBy: {
                id: string;
                name: string;
                code: string;
                status: string;
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
                    name: string;
                    code: string;
                    status: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
                };
            } & {
                id: string;
                materialId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                bomId: string;
            })[];
        } & {
            id: string;
            status: string;
            createdById: string;
            productId: string;
            version: number;
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            effectiveAt: Date;
        };
        replenishments: ({
            saleLine: {
                sale: {
                    table: {
                        id: string;
                        name: string;
                        status: string;
                        area: string;
                        x: number;
                        y: number;
                    } | null;
                } & {
                    id: string;
                    code: string;
                    status: string;
                    createdAt: Date;
                    createdById: string;
                    version: number;
                    closedAt: Date | null;
                    closedById: string | null;
                    tableId: string | null;
                };
            } & {
                id: string;
                note: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                productId: string;
                sentById: string | null;
                sentAt: Date | null;
                batch: number | null;
                productName: string;
                saleId: string;
            };
        } & {
            id: string;
            status: string;
            note: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            requestedAt: Date;
            productionOrderId: string | null;
            requestedById: string;
            saleLineId: string;
        })[];
        assignedBy: {
            id: string;
            name: string;
            code: string;
            status: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
            id: string;
            name: string;
            code: string;
            status: string;
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

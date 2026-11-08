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
            code: string;
            name: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            unitId: string;
            categoryId: string;
        })[];
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
            status: string;
            unitId: string;
            categoryId: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
        })[];
        employees: {
            id: string;
            code: string;
            name: string;
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
            code: string;
            name: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            unitId: string;
            categoryId: string;
        };
        createdBy: {
            id: string;
            code: string;
            name: string;
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
                code: string;
                name: string;
                status: string;
                unitId: string;
                categoryId: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
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
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
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
            code: string;
            name: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            unitId: string;
            categoryId: string;
        };
        createdBy: {
            id: string;
            code: string;
            name: string;
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
                code: string;
                name: string;
                status: string;
                unitId: string;
                categoryId: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
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
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
        productId: string;
        createdById: string;
    }>;
    bomAction(id: string, action: 'activate' | 'delete'): Promise<{
        id: string;
        status: string;
        version: number;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
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
                code: string;
                name: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                status: string;
                unitId: string;
                categoryId: string;
            };
            createdBy: {
                id: string;
                code: string;
                name: string;
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
                    code: string;
                    name: string;
                    status: string;
                    unitId: string;
                    categoryId: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
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
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            effectiveAt: Date;
            productId: string;
            createdById: string;
        };
        assignedBy: {
            id: string;
            code: string;
            name: string;
            status: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
            id: string;
            code: string;
            name: string;
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
                code: string;
                name: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                status: string;
                unitId: string;
                categoryId: string;
            };
            createdBy: {
                id: string;
                code: string;
                name: string;
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
                    code: string;
                    name: string;
                    status: string;
                    unitId: string;
                    categoryId: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
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
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            effectiveAt: Date;
            productId: string;
            createdById: string;
        };
        assignedBy: {
            id: string;
            code: string;
            name: string;
            status: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
            id: string;
            code: string;
            name: string;
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

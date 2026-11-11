import { PrismaService } from '../prisma/prisma.service.js';
export type CatalogKind = 'units' | 'categories' | 'materials' | 'suppliers' | 'products';
export declare function kind(value: string): CatalogKind;
export declare class CatalogService {
    private readonly db;
    constructor(db: PrismaService);
    presentation(type: CatalogKind): Promise<({
        canDelete: boolean;
        canEdit: boolean;
        symbol: string;
        id: string;
        name: string;
    } | {
        canDelete: boolean;
        canEdit: boolean;
        id: string;
        name: string;
        objectType: string;
    } | {
        canDelete: boolean;
        canEdit: boolean;
        unit: {
            symbol: string;
            id: string;
            name: string;
        };
        category: {
            id: string;
            name: string;
            objectType: string;
        };
        id: string;
        name: string;
        code: string;
        status: string;
        minStock: import("@prisma/client-runtime-utils").Decimal;
        unitId: string;
        categoryId: string;
    } | {
        canDelete: boolean;
        canEdit: boolean;
        id: string;
        name: string;
        code: string;
        status: string;
        phone: string | null;
        address: string | null;
    } | {
        canDelete: boolean;
        canEdit: boolean;
        currentBom: {
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
        unit: {
            symbol: string;
            id: string;
            name: string;
        };
        category: {
            id: string;
            name: string;
            objectType: string;
        };
        id: string;
        name: string;
        code: string;
        status: string;
        unitId: string;
        categoryId: string;
        supplyType: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    list(type: CatalogKind): Promise<{
        symbol: string;
        id: string;
        name: string;
    }[] | {
        id: string;
        name: string;
        objectType: string;
    }[] | ({
        unit: {
            symbol: string;
            id: string;
            name: string;
        };
        category: {
            id: string;
            name: string;
            objectType: string;
        };
    } & {
        id: string;
        name: string;
        code: string;
        status: string;
        minStock: import("@prisma/client-runtime-utils").Decimal;
        unitId: string;
        categoryId: string;
    })[] | {
        id: string;
        name: string;
        code: string;
        status: string;
        phone: string | null;
        address: string | null;
    }[] | {
        currentBom: {
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
        unit: {
            symbol: string;
            id: string;
            name: string;
        };
        category: {
            id: string;
            name: string;
            objectType: string;
        };
        id: string;
        name: string;
        code: string;
        status: string;
        unitId: string;
        categoryId: string;
        supplyType: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    save(type: CatalogKind, input: unknown, itemId?: string): Promise<{
        symbol: string;
        id: string;
        name: string;
    } | {
        id: string;
        name: string;
        objectType: string;
    } | {
        id: string;
        name: string;
        code: string;
        status: string;
        phone: string | null;
        address: string | null;
    } | {
        id: string;
        name: string;
        code: string;
        status: string;
        minStock: import("@prisma/client-runtime-utils").Decimal;
        unitId: string;
        categoryId: string;
    } | {
        id: string;
        name: string;
        code: string;
        status: string;
        unitId: string;
        categoryId: string;
        supplyType: string;
        sellingPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    remove(type: CatalogKind, itemId: string): Promise<{
        message: string;
    }>;
}

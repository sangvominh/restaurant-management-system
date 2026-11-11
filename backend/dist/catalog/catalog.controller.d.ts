import type { Request } from 'express';
import { AdminAuthService, type AdminUser } from '../admin/admin-auth.service.js';
import { CatalogService } from './catalog.service.js';
type CatalogRequest = Request & {
    catalogUser: AdminUser;
    catalogToken: string;
};
export declare class WarehouseAuthController {
    private readonly auth;
    constructor(auth: AdminAuthService);
    login(b: unknown): Promise<{
        token: string;
        user: {
            id: string;
            username: string;
            name: string;
            roleName: string;
            permissions: string[];
        };
    }>;
    me(req: CatalogRequest): AdminUser;
    logout(req: CatalogRequest): {
        message: string;
    };
}
export declare class CatalogController {
    private readonly service;
    constructor(service: CatalogService);
    private allow;
    list(value: string, req: CatalogRequest): Promise<({
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
    create(value: string, b: unknown, req: CatalogRequest): Promise<{
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
    update(value: string, id: string, b: unknown, req: CatalogRequest): Promise<{
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
    remove(value: string, id: string, req: CatalogRequest): Promise<{
        message: string;
    }>;
}
export {};

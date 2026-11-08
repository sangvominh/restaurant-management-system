import { AdminService } from './admin.service.js';
import type { AdminUser } from './admin-auth.service.js';
export declare class AdminController {
    private readonly service;
    constructor(service: AdminService);
    accounts(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        username: string;
        status: string;
        createdAt: Date;
        roleId: string;
        role: {
            id: string;
            name: string;
        };
        employee: {
            id: string;
            name: string;
            code: string;
        } | null;
    }[]>;
    createAccount(b: unknown): Promise<{
        id: string;
        username: string;
        status: string;
        createdAt: Date;
        roleId: string;
        role: {
            id: string;
            name: string;
        };
        employee: {
            id: string;
            name: string;
            code: string;
        } | null;
    }>;
    updateAccount(id: string, b: unknown, user: AdminUser): Promise<{
        id: string;
        username: string;
        status: string;
        createdAt: Date;
        roleId: string;
        role: {
            id: string;
            name: string;
        };
        employee: {
            id: string;
            name: string;
            code: string;
        } | null;
    }>;
    deleteAccount(id: string, user: AdminUser): Promise<{
        message: string;
    }>;
    roles(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        permissions: ({
            permission: {
                id: string;
                name: string;
                code: string;
            };
        } & {
            roleId: string;
            permissionId: string;
        })[];
        _count: {
            accounts: number;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
    })[]>;
    createRole(b: unknown): Promise<{
        permissions: ({
            permission: {
                id: string;
                name: string;
                code: string;
            };
        } & {
            roleId: string;
            permissionId: string;
        })[];
        _count: {
            accounts: number;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
    }>;
    updateRole(id: string, b: unknown): Promise<{
        permissions: ({
            permission: {
                id: string;
                name: string;
                code: string;
            };
        } & {
            roleId: string;
            permissionId: string;
        })[];
        _count: {
            accounts: number;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
    }>;
    deleteRole(id: string): Promise<{
        message: string;
    }>;
    permissions(): {
        code: string;
        name: string;
        group: string;
    }[];
    employees(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        status: string;
        name: string;
        code: string;
        phone: string | null;
        email: string | null;
        accountId: string | null;
    }[]>;
    createEmployee(b: unknown): Promise<{
        id: string;
        status: string;
        name: string;
        code: string;
        phone: string | null;
        email: string | null;
        accountId: string | null;
    }>;
    updateEmployee(id: string, b: unknown, user: AdminUser): Promise<{
        id: string;
        status: string;
        name: string;
        code: string;
        phone: string | null;
        email: string | null;
        accountId: string | null;
    }>;
    deleteEmployee(id: string): Promise<{
        message: string;
    }>;
}

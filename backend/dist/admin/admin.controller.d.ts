import { RoleTemplateService } from './role-template.service.js';
import { AdminService } from './admin.service.js';
import type { AdminUser } from './admin-auth.service.js';
export declare class AdminController {
    private readonly service;
    private readonly templates;
    constructor(service: AdminService, templates: RoleTemplateService);
    accounts(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        role: {
            id: string;
            name: string;
        };
        employee: {
            id: string;
            name: string;
            code: string;
        } | null;
        id: string;
        username: string;
        status: string;
        createdAt: Date;
        roleId: string;
    }[]>;
    createAccount(b: unknown): Promise<{
        role: {
            id: string;
            name: string;
        };
        employee: {
            id: string;
            name: string;
            code: string;
        } | null;
        id: string;
        username: string;
        status: string;
        createdAt: Date;
        roleId: string;
    }>;
    updateAccount(id: string, b: unknown, user: AdminUser): Promise<{
        role: {
            id: string;
            name: string;
        };
        employee: {
            id: string;
            name: string;
            code: string;
        } | null;
        id: string;
        username: string;
        status: string;
        createdAt: Date;
        roleId: string;
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
    presets(): Promise<{
        permissions: string[];
        customized: boolean;
        id: string;
        name: string;
        workspace: string;
        description: string;
        updatedAt?: Date | undefined;
    }[]>;
    savePreset(id: string, b: unknown): Promise<{
        customized: boolean;
        id: string;
        name: string;
        workspace: string;
        description: string;
        permissions: string[];
        updatedAt: Date;
    }>;
    resetPreset(id: string): Promise<{
        message: string;
    }>;
    permissions(): {
        code: string;
        name: string;
        group: string;
    }[];
    employees(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        name: string;
        status: string;
        code: string;
        phone: string | null;
        email: string | null;
        accountId: string | null;
    }[]>;
    createEmployee(b: unknown): Promise<{
        id: string;
        name: string;
        status: string;
        code: string;
        phone: string | null;
        email: string | null;
        accountId: string | null;
    }>;
    updateEmployee(id: string, b: unknown, user: AdminUser): Promise<{
        id: string;
        name: string;
        status: string;
        code: string;
        phone: string | null;
        email: string | null;
        accountId: string | null;
    }>;
    deleteEmployee(id: string): Promise<{
        message: string;
    }>;
}

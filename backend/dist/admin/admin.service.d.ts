import { PrismaService } from '../prisma/prisma.service.js';
export declare class AdminService {
    private readonly db;
    constructor(db: PrismaService);
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
    employees(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        status: string;
        name: string;
        code: string;
        phone: string | null;
        email: string | null;
        accountId: string | null;
    }[]>;
    permissions(): {
        code: string;
        name: string;
        group: string;
    }[];
    saveAccount(input: unknown, accountId?: string, actorId?: string): Promise<{
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
    deleteAccount(accountId: string, actorId?: string): Promise<{
        message: string;
    }>;
    saveRole(input: unknown, roleId?: string): Promise<{
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
    deleteRole(roleId: string): Promise<{
        message: string;
    }>;
    saveEmployee(input: unknown, employeeId?: string, actorId?: string): Promise<{
        id: string;
        status: string;
        name: string;
        code: string;
        phone: string | null;
        email: string | null;
        accountId: string | null;
    }>;
    deleteEmployee(employeeId: string): Promise<{
        message: string;
    }>;
}

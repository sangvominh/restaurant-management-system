import { PrismaService } from '../prisma/prisma.service.js';
export interface AdminUser {
    id: string;
    username: string;
    name: string;
    roleName: string;
    permissions: string[];
}
export declare class AdminAuthService {
    private readonly db;
    private readonly sessions;
    constructor(db: PrismaService);
    login(body: unknown, adminOnly?: boolean, audience?: 'warehouse' | 'sales'): Promise<{
        token: string;
        user: {
            id: string;
            username: string;
            name: string;
            roleName: string;
            permissions: string[];
        };
    }>;
    authenticate(token: string, adminOnly?: boolean): Promise<AdminUser>;
    logout(token: string): {
        message: string;
    };
}

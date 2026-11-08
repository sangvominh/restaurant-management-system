import { PrismaService } from '../prisma/prisma.service.js';
export interface AdminUser {
    id: string;
    username: string;
    name: string;
}
export declare class AdminAuthService {
    private readonly db;
    private readonly sessions;
    constructor(db: PrismaService);
    login(body: unknown): Promise<{
        token: string;
        user: {
            id: string;
            username: string;
            name: string;
        };
    }>;
    authenticate(token: string): Promise<AdminUser>;
    logout(token: string): {
        message: string;
    };
}

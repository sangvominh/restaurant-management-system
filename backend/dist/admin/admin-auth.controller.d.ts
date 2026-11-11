import { AdminAuthService, type AdminUser } from './admin-auth.service.js';
export declare class AdminAuthController {
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
    me(user: AdminUser): AdminUser;
    logout(token: string): {
        message: string;
    };
}

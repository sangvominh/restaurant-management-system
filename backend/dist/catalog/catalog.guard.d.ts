import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AdminAuthService } from '../admin/admin-auth.service.js';
export declare class CatalogGuard implements CanActivate {
    private readonly auth;
    constructor(auth: AdminAuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

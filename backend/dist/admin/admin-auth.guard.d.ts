import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service.js';
export declare class AdminAuthGuard implements CanActivate {
    private readonly auth;
    constructor(auth: AdminAuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const CurrentAdmin: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const AdminToken: (...dataOrPipes: unknown[]) => ParameterDecorator;

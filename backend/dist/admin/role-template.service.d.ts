import { PrismaService } from '../prisma/prisma.service.js';
export declare class RoleTemplateService {
    private readonly db;
    constructor(db: PrismaService);
    list(): Promise<{
        permissions: string[];
        customized: boolean;
        id: string;
        name: string;
        workspace: string;
        description: string;
        updatedAt?: Date | undefined;
    }[]>;
    private key;
    save(id: string, input: unknown): Promise<{
        customized: boolean;
        id: string;
        name: string;
        workspace: string;
        description: string;
        permissions: string[];
        updatedAt: Date;
    }>;
    reset(id: string): Promise<{
        message: string;
    }>;
}

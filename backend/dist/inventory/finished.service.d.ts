import { PrismaService } from '../prisma/prisma.service.js';
export declare class FinishedService {
    private readonly db;
    constructor(db: PrismaService);
    report(kind: string, start?: string, end?: string): Promise<{
        id: string;
        code: string;
        name: string;
        unit: string;
        opening: import("@prisma/client-runtime-utils").Decimal;
        incoming: import("@prisma/client-runtime-utils").Decimal;
        outgoing: import("@prisma/client-runtime-utils").Decimal;
        closing: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
}

import { PrismaService } from '../prisma/prisma.service.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class ExecutionService {
    private readonly db;
    constructor(db: PrismaService);
    detail(id: string, user: AdminUser): Promise<{
        order: {
            bom: {
                product: {
                    unit: {
                        symbol: string;
                        id: string;
                        name: string;
                    };
                } & {
                    id: string;
                    status: string;
                    name: string;
                    code: string;
                    unitId: string;
                    categoryId: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                };
                lines: {
                    id: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    materialId: string;
                    bomId: string;
                }[];
            } & {
                id: string;
                status: string;
                createdById: string;
                productId: string;
                version: number;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
            };
            assignedTo: {
                id: string;
                status: string;
                name: string;
                code: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            materialIssues: ({
                lines: ({
                    wasteLines: ({
                        waste: {
                            id: string;
                            status: string;
                            approvedAt: Date | null;
                            reason: string;
                            reviewedById: string | null;
                            reportedAt: Date;
                            reportedById: string;
                        };
                    } & {
                        id: string;
                        note: string | null;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        lotId: string | null;
                        issueLineId: string | null;
                        productId: string | null;
                        sourceType: string;
                        wasteId: string;
                    })[];
                    lot: {
                        material: {
                            unit: {
                                symbol: string;
                                id: string;
                                name: string;
                            };
                        } & {
                            id: string;
                            status: string;
                            name: string;
                            code: string;
                            minStock: import("@prisma/client-runtime-utils").Decimal;
                            unitId: string;
                            categoryId: string;
                        };
                    } & {
                        id: string;
                        code: string;
                        expiryDate: Date | null;
                        materialId: string;
                    };
                    consumptions: {
                        id: string;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        issueLineId: string;
                        runId: string;
                    }[];
                    returnLines: ({
                        return: {
                            id: string;
                            status: string;
                            requestedAt: Date;
                            approvedAt: Date | null;
                            reason: string;
                            requestedById: string;
                            reviewedById: string | null;
                        };
                    } & {
                        id: string;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        issueLineId: string;
                        returnId: string;
                    })[];
                } & {
                    id: string;
                    lotId: string;
                    requestedQuantity: import("@prisma/client-runtime-utils").Decimal;
                    issuedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                    issueId: string;
                })[];
                requestedBy: {
                    id: string;
                    status: string;
                    name: string;
                    code: string;
                    phone: string | null;
                    email: string | null;
                    accountId: string | null;
                };
            } & {
                id: string;
                status: string;
                requestedAt: Date;
                approvedAt: Date | null;
                reason: string | null;
                requestedById: string;
                reviewedById: string | null;
                productionOrderId: string;
            })[];
            runs: ({
                consumptions: {
                    id: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    issueLineId: string;
                    runId: string;
                }[];
            } & {
                id: string;
                status: string;
                productionOrderId: string;
                recordedAt: Date;
                actualQuantity: import("@prisma/client-runtime-utils").Decimal;
                acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                inspectedAt: Date | null;
                inspectionNote: string | null;
                performedById: string;
                inspectedById: string | null;
            })[];
        } & {
            id: string;
            status: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            assignedAt: Date;
            dueAt: Date | null;
            bomId: string;
            assignedById: string;
            assignedToId: string;
        };
        lots: {
            stock: import("@prisma/client-runtime-utils").Decimal;
            material: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                status: string;
                name: string;
                code: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
            id: string;
            code: string;
            expiryDate: Date | null;
            materialId: string;
        }[];
        balances: {
            id: string;
            remaining: import("@prisma/client-runtime-utils").Decimal;
        }[];
    }>;
    act(id: string, input: unknown, user: AdminUser): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        assignedAt: Date;
        dueAt: Date | null;
        bomId: string;
        assignedById: string;
        assignedToId: string;
    } | {
        id: string;
        status: string;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string;
        requestedById: string;
        reviewedById: string | null;
    } | {
        id: string;
        status: string;
        approvedAt: Date | null;
        reason: string;
        reviewedById: string | null;
        reportedAt: Date;
        reportedById: string;
    } | {
        id: string;
        status: string;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string | null;
        requestedById: string;
        reviewedById: string | null;
        productionOrderId: string;
    } | {
        id: string;
        status: string;
        productionOrderId: string;
        recordedAt: Date;
        actualQuantity: import("@prisma/client-runtime-utils").Decimal;
        acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
        inspectedAt: Date | null;
        inspectionNote: string | null;
        performedById: string;
        inspectedById: string | null;
    }>;
}

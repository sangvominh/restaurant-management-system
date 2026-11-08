import { PrismaService } from '../prisma/prisma.service.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class ExecutionService {
    private readonly db;
    constructor(db: PrismaService);
    detail(id: string, user: AdminUser): Promise<{
        order: {
            bom: {
                lines: {
                    id: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    bomId: string;
                    materialId: string;
                }[];
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
            } & {
                id: string;
                status: string;
                version: number;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
                productId: string;
                createdById: string;
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
                    consumptions: {
                        id: string;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        issueLineId: string;
                        runId: string;
                    }[];
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
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        productId: string | null;
                        lotId: string | null;
                        issueLineId: string | null;
                        sourceType: string;
                        note: string | null;
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
                productionOrderId: string;
                requestedById: string;
                reviewedById: string | null;
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
                recordedAt: Date;
                productionOrderId: string;
                actualQuantity: import("@prisma/client-runtime-utils").Decimal;
                acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                inspectedAt: Date | null;
                inspectionNote: string | null;
                performedById: string;
                inspectedById: string | null;
            })[];
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            assignedAt: Date;
            dueAt: Date | null;
            status: string;
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
        reason: string;
        requestedById: string;
        reviewedById: string | null;
    } | {
        id: string;
        status: string;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string | null;
        productionOrderId: string;
        requestedById: string;
        reviewedById: string | null;
    } | {
        id: string;
        status: string;
        recordedAt: Date;
        productionOrderId: string;
        actualQuantity: import("@prisma/client-runtime-utils").Decimal;
        acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
        inspectedAt: Date | null;
        inspectionNote: string | null;
        performedById: string;
        inspectedById: string | null;
    } | {
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        assignedAt: Date;
        dueAt: Date | null;
        status: string;
        bomId: string;
        assignedById: string;
        assignedToId: string;
    }>;
}

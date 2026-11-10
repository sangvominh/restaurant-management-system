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
                lines: ({
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
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    bomId: string;
                    materialId: string;
                })[];
            } & {
                id: string;
                status: string;
                version: number;
                effectiveAt: Date;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
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
                    wasteLines: ({
                        waste: {
                            id: string;
                            status: string;
                            reason: string;
                            reportedAt: Date;
                            approvedAt: Date | null;
                            reportedById: string;
                            reviewedById: string | null;
                        };
                    } & {
                        id: string;
                        productId: string | null;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        note: string | null;
                        lotId: string | null;
                        sourceType: string;
                        issueLineId: string | null;
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
                        materialId: string;
                        expiryDate: Date | null;
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
                            reason: string;
                            approvedAt: Date | null;
                            reviewedById: string | null;
                            requestedAt: Date;
                            requestedById: string;
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
                reason: string | null;
                approvedAt: Date | null;
                reviewedById: string | null;
                requestedAt: Date;
                requestedById: string;
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
            bomId: string;
            assignedAt: Date;
            dueAt: Date | null;
            assignedById: string;
            assignedToId: string;
        };
        lots: {
            daysRemaining: number | null;
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
            materialId: string;
            expiryDate: Date | null;
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
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    } | {
        id: string;
        status: string;
        reason: string;
        approvedAt: Date | null;
        reviewedById: string | null;
        requestedAt: Date;
        requestedById: string;
    } | {
        id: string;
        status: string;
        reason: string;
        reportedAt: Date;
        approvedAt: Date | null;
        reportedById: string;
        reviewedById: string | null;
    } | {
        id: string;
        status: string;
        reason: string | null;
        approvedAt: Date | null;
        reviewedById: string | null;
        requestedAt: Date;
        requestedById: string;
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

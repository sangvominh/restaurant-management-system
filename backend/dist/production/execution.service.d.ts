import { PrismaService } from '../prisma/prisma.service.js';
import type { AdminUser } from '../admin/admin-auth.service.js';
export declare class ExecutionService {
    private readonly db;
    constructor(db: PrismaService);
    detail(id: string, user: AdminUser): Promise<{
        asOf: string;
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
                    name: string;
                    status: string;
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
                        name: string;
                        status: string;
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
            replenishments: ({
                saleLine: {
                    sale: {
                        table: {
                            id: string;
                            name: string;
                            status: string;
                            area: string;
                            x: number;
                            y: number;
                        } | null;
                    } & {
                        id: string;
                        status: string;
                        createdAt: Date;
                        code: string;
                        version: number;
                        createdById: string;
                        closedAt: Date | null;
                        closedById: string | null;
                        tableId: string | null;
                    };
                } & {
                    id: string;
                    productId: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    unitPrice: import("@prisma/client-runtime-utils").Decimal;
                    sentById: string | null;
                    note: string;
                    sentAt: Date | null;
                    batch: number | null;
                    productName: string;
                    saleId: string;
                };
            } & {
                id: string;
                status: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                saleLineId: string;
                note: string;
                requestedAt: Date;
                requestedById: string;
                productionOrderId: string | null;
            })[];
            assignedBy: {
                id: string;
                name: string;
                status: string;
                code: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            assignedTo: {
                id: string;
                name: string;
                status: string;
                code: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            materialIssues: ({
                lines: ({
                    wasteLines: ({
                        waste: {
                            reviewedBy: {
                                name: string;
                            } | null;
                            reportedBy: {
                                name: string;
                            };
                        } & {
                            id: string;
                            status: string;
                            reason: string;
                            approvedAt: Date | null;
                            reviewedById: string | null;
                            reportedAt: Date;
                            reportedById: string;
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
                            name: string;
                            status: string;
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
                        runId: string;
                        issueLineId: string;
                    }[];
                    returnLines: ({
                        return: {
                            requestedBy: {
                                name: string;
                            };
                            reviewedBy: {
                                name: string;
                            } | null;
                        } & {
                            id: string;
                            status: string;
                            reason: string;
                            requestedAt: Date;
                            approvedAt: Date | null;
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
                    name: string;
                };
                reviewedBy: {
                    name: string;
                } | null;
            } & {
                id: string;
                status: string;
                reason: string | null;
                requestedAt: Date;
                approvedAt: Date | null;
                requestedById: string;
                reviewedById: string | null;
                productionOrderId: string;
                reviewNote: string | null;
            })[];
            runs: ({
                performedBy: {
                    name: string;
                    accountId: string | null;
                };
                consumptions: {
                    id: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    runId: string;
                    issueLineId: string;
                }[];
                inspectedBy: {
                    name: string;
                } | null;
            } & {
                id: string;
                status: string;
                recordedAt: Date;
                actualQuantity: import("@prisma/client-runtime-utils").Decimal;
                acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
                inspectedAt: Date | null;
                inspectionNote: string | null;
                productionOrderId: string;
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
                name: string;
                status: string;
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
            consumed: import("@prisma/client-runtime-utils").Decimal;
            returned: import("@prisma/client-runtime-utils").Decimal;
            wasted: import("@prisma/client-runtime-utils").Decimal;
            pending: import("@prisma/client-runtime-utils").Decimal;
            unsettled: import("@prisma/client-runtime-utils").Decimal;
            remaining: import("@prisma/client-runtime-utils").Decimal;
        }[];
    }>;
    act(id: string, input: unknown, user: AdminUser): Promise<{
        id: string;
        status: string;
        recordedAt: Date;
        actualQuantity: import("@prisma/client-runtime-utils").Decimal;
        acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
        inspectedAt: Date | null;
        inspectionNote: string | null;
        productionOrderId: string;
        performedById: string;
        inspectedById: string | null;
    } | {
        id: string;
        status: string;
        reason: string;
        requestedAt: Date;
        approvedAt: Date | null;
        requestedById: string;
        reviewedById: string | null;
    } | {
        id: string;
        status: string;
        reason: string;
        approvedAt: Date | null;
        reviewedById: string | null;
        reportedAt: Date;
        reportedById: string;
    } | {
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
        reason: string | null;
        requestedAt: Date;
        approvedAt: Date | null;
        requestedById: string;
        reviewedById: string | null;
        productionOrderId: string;
        reviewNote: string | null;
    }>;
}

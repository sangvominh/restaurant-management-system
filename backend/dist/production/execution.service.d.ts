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
                    code: string;
                    status: string;
                    unitId: string;
                    categoryId: string;
                    supplyType: string;
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
                        code: string;
                        status: string;
                        minStock: import("@prisma/client-runtime-utils").Decimal;
                        unitId: string;
                        categoryId: string;
                    };
                } & {
                    id: string;
                    materialId: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    bomId: string;
                })[];
            } & {
                id: string;
                status: string;
                createdById: string;
                productId: string;
                version: number;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
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
                        code: string;
                        status: string;
                        createdAt: Date;
                        createdById: string;
                        version: number;
                        closedAt: Date | null;
                        closedById: string | null;
                        tableId: string | null;
                    };
                } & {
                    id: string;
                    note: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    unitPrice: import("@prisma/client-runtime-utils").Decimal;
                    productId: string;
                    sentById: string | null;
                    sentAt: Date | null;
                    batch: number | null;
                    productName: string;
                    saleId: string;
                };
            } & {
                id: string;
                status: string;
                note: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
                requestedAt: Date;
                productionOrderId: string | null;
                requestedById: string;
                saleLineId: string;
            })[];
            assignedBy: {
                id: string;
                name: string;
                code: string;
                status: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            assignedTo: {
                id: string;
                name: string;
                code: string;
                status: string;
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
                        sourceType: string;
                        wasteId: string;
                        productId: string | null;
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
                            code: string;
                            status: string;
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
                            requestedBy: {
                                name: string;
                            };
                            reviewedBy: {
                                name: string;
                            } | null;
                        } & {
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
                        returnId: string;
                        issueLineId: string;
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
                requestedAt: Date;
                approvedAt: Date | null;
                reason: string | null;
                reviewNote: string | null;
                productionOrderId: string;
                requestedById: string;
                reviewedById: string | null;
            })[];
            runs: ({
                productLot: {
                    id: string;
                    code: string;
                    createdAt: Date;
                    expiryDate: Date;
                    productId: string;
                    receiptLineId: string | null;
                    manufacturedAt: Date;
                    runId: string | null;
                } | null;
                performedBy: {
                    name: string;
                    accountId: string | null;
                };
                consumptions: {
                    id: string;
                    quantity: import("@prisma/client-runtime-utils").Decimal;
                    issueLineId: string;
                    runId: string;
                }[];
                inspectedBy: {
                    name: string;
                } | null;
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
                name: string;
                code: string;
                status: string;
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
        productionOrderId: string;
        recordedAt: Date;
        actualQuantity: import("@prisma/client-runtime-utils").Decimal;
        acceptedQuantity: import("@prisma/client-runtime-utils").Decimal | null;
        inspectedAt: Date | null;
        inspectionNote: string | null;
        performedById: string;
        inspectedById: string | null;
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
        quantity: import("@prisma/client-runtime-utils").Decimal;
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    } | {
        id: string;
        status: string;
        requestedAt: Date;
        approvedAt: Date | null;
        reason: string | null;
        reviewNote: string | null;
        productionOrderId: string;
        requestedById: string;
        reviewedById: string | null;
    }>;
}

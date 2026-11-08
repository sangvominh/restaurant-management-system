import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { ProductionService } from './production.service.js';
import { ExecutionService } from './execution.service.js';
type AuthRequest = Request & {
    catalogUser: AdminUser;
};
export declare class ProductionController {
    private readonly service;
    private readonly execution;
    constructor(service: ProductionService, execution: ExecutionService);
    private allow;
    references(r: AuthRequest): Promise<{
        products: ({
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
        })[];
        materials: ({
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
        })[];
        employees: {
            id: string;
            name: string;
            code: string;
        }[];
    }>;
    boms(r: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
        createdBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
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
            materialId: string;
            bomId: string;
        })[];
    } & {
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    })[]>;
    createBom(b: unknown, r: AuthRequest): Promise<{
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
        createdBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
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
            materialId: string;
            bomId: string;
        })[];
    } & {
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    }>;
    updateBom(id: string, b: unknown, r: AuthRequest): Promise<{
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
        createdBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
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
            materialId: string;
            bomId: string;
        })[];
    } & {
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    }>;
    deleteBom(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    }>;
    activate(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        version: number;
        effectiveAt: Date;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        productId: string;
        createdById: string;
    }>;
    orders(r: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
            createdBy: {
                id: string;
                status: string;
                name: string;
                code: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
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
                materialId: string;
                bomId: string;
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
        assignedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
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
    } & {
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        assignedAt: Date;
        dueAt: Date | null;
        bomId: string;
        assignedById: string;
        assignedToId: string;
    })[]>;
    detail(id: string, r: AuthRequest): Promise<{
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
                            approvedAt: Date | null;
                            reason: string;
                            reviewedById: string | null;
                            reportedAt: Date;
                            reportedById: string;
                        };
                    } & {
                        id: string;
                        productId: string | null;
                        note: string | null;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        lotId: string | null;
                        issueLineId: string | null;
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
    execute(id: string, b: unknown, r: AuthRequest): Promise<{
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
    createOrder(b: unknown, r: AuthRequest): Promise<{
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
            createdBy: {
                id: string;
                status: string;
                name: string;
                code: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
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
                materialId: string;
                bomId: string;
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
        assignedBy: {
            id: string;
            status: string;
            name: string;
            code: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
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
    } & {
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        assignedAt: Date;
        dueAt: Date | null;
        bomId: string;
        assignedById: string;
        assignedToId: string;
    }>;
    receive(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        assignedAt: Date;
        dueAt: Date | null;
        bomId: string;
        assignedById: string;
        assignedToId: string;
    }>;
    cancel(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        assignedAt: Date;
        dueAt: Date | null;
        bomId: string;
        assignedById: string;
        assignedToId: string;
    }>;
}
export {};

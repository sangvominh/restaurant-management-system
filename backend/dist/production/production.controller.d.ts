import type { Request } from 'express';
import type { AdminUser } from '../admin/admin-auth.service.js';
import { ProductionService } from './production.service.js';
import { ExecutionService } from './execution.service.js';
import { ShortageService } from './shortage.service.js';
type AuthRequest = Request & {
    catalogUser: AdminUser;
};
export declare class ProductionController {
    private readonly service;
    private readonly execution;
    private readonly shortages;
    constructor(service: ProductionService, execution: ExecutionService, shortages: ShortageService);
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
            code: string;
            name: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
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
            code: string;
            name: string;
            unitId: string;
            categoryId: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
        })[];
        employees: {
            id: string;
            code: string;
            name: string;
        }[];
    }>;
    shortageList(r: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    status: string;
                    code: string;
                    name: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
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
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            assignedAt: Date;
            dueAt: Date | null;
            bomId: string;
            assignedById: string;
            assignedToId: string;
        };
        material: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            status: string;
            code: string;
            name: string;
            unitId: string;
            categoryId: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        reason: string;
        status: string;
        requestedAt: Date;
        updatedAt: Date;
        reviewNote: string | null;
        productionOrderId: string;
        materialId: string;
        requestedById: string;
        reviewedById: string | null;
    })[]>;
    reportShortage(b: unknown, r: AuthRequest): Promise<{
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    status: string;
                    code: string;
                    name: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
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
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            assignedAt: Date;
            dueAt: Date | null;
            bomId: string;
            assignedById: string;
            assignedToId: string;
        };
        material: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            status: string;
            code: string;
            name: string;
            unitId: string;
            categoryId: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        reason: string;
        status: string;
        requestedAt: Date;
        updatedAt: Date;
        reviewNote: string | null;
        productionOrderId: string;
        materialId: string;
        requestedById: string;
        reviewedById: string | null;
    }>;
    reviewShortage(id: string, b: unknown, r: AuthRequest): Promise<{
        productionOrder: {
            bom: {
                product: {
                    id: string;
                    status: string;
                    code: string;
                    name: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
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
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            assignedAt: Date;
            dueAt: Date | null;
            bomId: string;
            assignedById: string;
            assignedToId: string;
        };
        material: {
            unit: {
                symbol: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            status: string;
            code: string;
            name: string;
            unitId: string;
            categoryId: string;
            minStock: import("@prisma/client-runtime-utils").Decimal;
        };
        requestedBy: {
            name: string;
        };
        reviewedBy: {
            name: string;
        } | null;
    } & {
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        reason: string;
        status: string;
        requestedAt: Date;
        updatedAt: Date;
        reviewNote: string | null;
        productionOrderId: string;
        materialId: string;
        requestedById: string;
        reviewedById: string | null;
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
            code: string;
            name: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        createdBy: {
            id: string;
            status: string;
            code: string;
            name: string;
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
                code: string;
                name: string;
                unitId: string;
                categoryId: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
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
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
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
            code: string;
            name: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        createdBy: {
            id: string;
            status: string;
            code: string;
            name: string;
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
                code: string;
                name: string;
                unitId: string;
                categoryId: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
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
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
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
            code: string;
            name: string;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            unitId: string;
            categoryId: string;
        };
        createdBy: {
            id: string;
            status: string;
            code: string;
            name: string;
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
                code: string;
                name: string;
                unitId: string;
                categoryId: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
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
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
        productId: string;
        createdById: string;
    }>;
    deleteBom(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        version: number;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
        productId: string;
        createdById: string;
    }>;
    activate(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        version: number;
        outputQuantity: import("@prisma/client-runtime-utils").Decimal;
        effectiveAt: Date;
        productId: string;
        createdById: string;
    }>;
    rejectReplenishment(id: string, b: unknown, r: AuthRequest): Promise<{
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        requestedAt: Date;
        productionOrderId: string | null;
        requestedById: string;
        note: string;
        saleLineId: string;
    }>;
    replenishments(r: AuthRequest): Promise<({
        requestedBy: {
            name: string;
        };
        saleLine: {
            product: {
                unit: {
                    symbol: string;
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                status: string;
                code: string;
                name: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
            sale: {
                table: {
                    id: string;
                    status: string;
                    name: string;
                    area: string;
                    x: number;
                    y: number;
                } | null;
            } & {
                id: string;
                status: string;
                code: string;
                version: number;
                createdById: string;
                createdAt: Date;
                closedAt: Date | null;
                closedById: string | null;
                tableId: string | null;
            };
        } & {
            id: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        };
    } & {
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        requestedAt: Date;
        productionOrderId: string | null;
        requestedById: string;
        note: string;
        saleLineId: string;
    })[]>;
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
                code: string;
                name: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
            createdBy: {
                id: string;
                status: string;
                code: string;
                name: string;
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
                    code: string;
                    name: string;
                    unitId: string;
                    categoryId: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
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
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            effectiveAt: Date;
            productId: string;
            createdById: string;
        };
        assignedBy: {
            id: string;
            status: string;
            code: string;
            name: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
            id: string;
            status: string;
            code: string;
            name: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
    } & {
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        status: string;
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
                    code: string;
                    name: string;
                    sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                    unitId: string;
                    categoryId: string;
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
                        code: string;
                        name: string;
                        unitId: string;
                        categoryId: string;
                        minStock: import("@prisma/client-runtime-utils").Decimal;
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
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                effectiveAt: Date;
                productId: string;
                createdById: string;
            };
            assignedTo: {
                id: string;
                status: string;
                code: string;
                name: string;
                phone: string | null;
                email: string | null;
                accountId: string | null;
            };
            materialIssues: ({
                requestedBy: {
                    id: string;
                    status: string;
                    code: string;
                    name: string;
                    phone: string | null;
                    email: string | null;
                    accountId: string | null;
                };
                lines: ({
                    wasteLines: ({
                        waste: {
                            id: string;
                            reason: string;
                            status: string;
                            reviewedById: string | null;
                            approvedAt: Date | null;
                            reportedAt: Date;
                            reportedById: string;
                        };
                    } & {
                        id: string;
                        quantity: import("@prisma/client-runtime-utils").Decimal;
                        productId: string | null;
                        lotId: string | null;
                        issueLineId: string | null;
                        note: string | null;
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
                            code: string;
                            name: string;
                            unitId: string;
                            categoryId: string;
                            minStock: import("@prisma/client-runtime-utils").Decimal;
                        };
                    } & {
                        id: string;
                        materialId: string;
                        code: string;
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
                            reason: string;
                            status: string;
                            requestedAt: Date;
                            requestedById: string;
                            reviewedById: string | null;
                            approvedAt: Date | null;
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
            } & {
                id: string;
                reason: string | null;
                status: string;
                requestedAt: Date;
                productionOrderId: string;
                requestedById: string;
                reviewedById: string | null;
                approvedAt: Date | null;
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
            quantity: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            assignedAt: Date;
            dueAt: Date | null;
            bomId: string;
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
                code: string;
                name: string;
                unitId: string;
                categoryId: string;
                minStock: import("@prisma/client-runtime-utils").Decimal;
            };
            id: string;
            materialId: string;
            code: string;
            expiryDate: Date | null;
        }[];
        balances: {
            id: string;
            remaining: import("@prisma/client-runtime-utils").Decimal;
        }[];
    }>;
    execute(id: string, b: unknown, r: AuthRequest): Promise<{
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        assignedAt: Date;
        dueAt: Date | null;
        bomId: string;
        assignedById: string;
        assignedToId: string;
    } | {
        id: string;
        reason: string;
        status: string;
        requestedAt: Date;
        requestedById: string;
        reviewedById: string | null;
        approvedAt: Date | null;
    } | {
        id: string;
        reason: string;
        status: string;
        reviewedById: string | null;
        approvedAt: Date | null;
        reportedAt: Date;
        reportedById: string;
    } | {
        id: string;
        reason: string | null;
        status: string;
        requestedAt: Date;
        productionOrderId: string;
        requestedById: string;
        reviewedById: string | null;
        approvedAt: Date | null;
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
                code: string;
                name: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                unitId: string;
                categoryId: string;
            };
            createdBy: {
                id: string;
                status: string;
                code: string;
                name: string;
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
                    code: string;
                    name: string;
                    unitId: string;
                    categoryId: string;
                    minStock: import("@prisma/client-runtime-utils").Decimal;
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
            outputQuantity: import("@prisma/client-runtime-utils").Decimal;
            effectiveAt: Date;
            productId: string;
            createdById: string;
        };
        assignedBy: {
            id: string;
            status: string;
            code: string;
            name: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
        assignedTo: {
            id: string;
            status: string;
            code: string;
            name: string;
            phone: string | null;
            email: string | null;
            accountId: string | null;
        };
    } & {
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        assignedAt: Date;
        dueAt: Date | null;
        bomId: string;
        assignedById: string;
        assignedToId: string;
    }>;
    receive(id: string, r: AuthRequest): Promise<{
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        assignedAt: Date;
        dueAt: Date | null;
        bomId: string;
        assignedById: string;
        assignedToId: string;
    }>;
    cancel(id: string, r: AuthRequest): Promise<{
        id: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        assignedAt: Date;
        dueAt: Date | null;
        bomId: string;
        assignedById: string;
        assignedToId: string;
    }>;
}
export {};

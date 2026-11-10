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
    shortageList(r: AuthRequest): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
        productionOrder: {
            bom: {
                product: {
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
                effectiveAt: Date;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                productId: string;
                createdById: string;
            };
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
        reviewedBy: {
            name: string;
        } | null;
        requestedBy: {
            name: string;
        };
    } & {
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        materialId: string;
        reason: string;
        reviewedById: string | null;
        requestedAt: Date;
        requestedById: string;
        productionOrderId: string;
        updatedAt: Date;
        reviewNote: string | null;
    })[]>;
    reportShortage(b: unknown, r: AuthRequest): Promise<{
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
        productionOrder: {
            bom: {
                product: {
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
                effectiveAt: Date;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                productId: string;
                createdById: string;
            };
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
        reviewedBy: {
            name: string;
        } | null;
        requestedBy: {
            name: string;
        };
    } & {
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        materialId: string;
        reason: string;
        reviewedById: string | null;
        requestedAt: Date;
        requestedById: string;
        productionOrderId: string;
        updatedAt: Date;
        reviewNote: string | null;
    }>;
    reviewShortage(id: string, b: unknown, r: AuthRequest): Promise<{
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
        productionOrder: {
            bom: {
                product: {
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
                effectiveAt: Date;
                outputQuantity: import("@prisma/client-runtime-utils").Decimal;
                productId: string;
                createdById: string;
            };
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
        reviewedBy: {
            name: string;
        } | null;
        requestedBy: {
            name: string;
        };
    } & {
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        materialId: string;
        reason: string;
        reviewedById: string | null;
        requestedAt: Date;
        requestedById: string;
        productionOrderId: string;
        updatedAt: Date;
        reviewNote: string | null;
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
    rejectReplenishment(id: string, b: unknown, r: AuthRequest): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        note: string;
        requestedAt: Date;
        requestedById: string;
        saleLineId: string;
        productionOrderId: string | null;
    }>;
    replenishments(r: AuthRequest): Promise<({
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
                name: string;
                code: string;
                unitId: string;
                categoryId: string;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
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
            note: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            sentById: string | null;
            sentAt: Date | null;
            batch: number | null;
            productName: string;
            saleId: string;
        };
        requestedBy: {
            name: string;
        };
    } & {
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        note: string;
        requestedAt: Date;
        requestedById: string;
        saleLineId: string;
        productionOrderId: string | null;
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
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
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
    execute(id: string, b: unknown, r: AuthRequest): Promise<{
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
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    }>;
    receive(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    }>;
    cancel(id: string, r: AuthRequest): Promise<{
        id: string;
        status: string;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        bomId: string;
        assignedAt: Date;
        dueAt: Date | null;
        assignedById: string;
        assignedToId: string;
    }>;
}
export {};
